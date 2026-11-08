// Lernapp, Teil 8: Lernplan. Heute fällig, Heute für den Test, Boss-Runde, Probetest, Kalendereintrag, Konfetti.
// Gemischte Runden ziehen Karten aus mehreren Themen. Der Lernstand läuft über LA.rate, wie in jeder anderen Runde.
(() => {
  'use strict';
  const LA = window.LA;
  const { h, svg, S, save, go, tileIco, head, cardsOf, base, shuffle, view, DECKS } = LA;
  const K = LA.kit, ui = LA.ui;

  // ---------- Konfetti (nicht bei reduzierter Bewegung) ----------
  LA.confetti = () => {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cols = ['#6D4CFF', '#FF7AB8', '#FFD166', '#3EE0C1', '#FF8A5C'], box = h('div', { class: 'confetti', 'aria-hidden': 'true' });
    for (let i = 0; i < 46; i++) box.append(h('i', { style: 'left:' + Math.random() * 100 + '%;background:' + cols[i % 5] + ';animation-delay:' + Math.random() * .5 + 's;animation-duration:' + (1.5 + Math.random() * 1.2) + 's' }));
    document.body.append(box); setTimeout(() => box.remove(), 3500);
  };

  // ---------- Karten sammeln ----------
  const peek = it => ((S.cards[it.d.id] || {})[it.c.i]);   // nur lesen, legt nichts an
  const itemsOf = decks => decks.flatMap(d => cardsOf(base(d)).map(c => ({ d: base(d), c })));
  const dueItems = decks => itemsOf(decks).filter(it => LA.isDue(peek(it)));
  // Wichtigkeit: fällig, schwach (niedrige Box) und noch nie gesehen kommen zuerst, mit etwas Zufall.
  const score = it => { const s = peek(it) || { box: 0, seen: 0 }; return (LA.isDue(s) ? 3 : 0) + (4 - s.box) + (s.seen ? 0 : 1) + Math.random() * 1.5; };
  const best = (items, n) => shuffle(items.map(it => ({ it, k: score(it) })).sort((a, b) => b.k - a.k).slice(0, n).map(x => x.it));
  const weakest = (items, n) => shuffle(items).map(it => ({ it, b: (peek(it) || { box: 0 }).box })).sort((a, b) => a.b - b.b).slice(0, n).map(x => x.it);
  const tomorrow = items => items.filter(it => { const s = peek(it); return s && s.seen > 0 && (s.due || 0) <= LA.dnum() + 1; }).length;
  const setCfg = d => { LA.cfg.looseAccents = !!d.looseAccents; LA.cfg.mathInput = !!d.mathInput; };
  const stat = (v, l) => h('div', { class: 'stat' }, h('strong', null, v), h('span', null, l));

  // ---------- Gemischte Runde (Karte für Karte mit Rückmeldung, optional mit Leben) ----------
  function run(o) {
    const items = o.items, n = items.length;
    let i = 0, right = 0, lives = o.lives || 0;
    const exit = () => go(o.back, o.tab);
    const hearts = () => h('div', { class: 'lives', 'aria-label': lives + ' von ' + o.lives + ' Leben' }, '❤️'.repeat(lives) + '🖤'.repeat(o.lives - lives));
    const next = () => {
      if (i >= n || (o.lives && lives <= 0)) return go(() => done());
      const it = items[i];
      go(() => {
        LA.sessionExit = exit; setCfg(it.d);
        const typed = o.typing && Math.random() < .3 && LA.ans(it.d, it.c).length === 1 && LA.ans(it.d, it.c)[0].length <= 18;
        (typed ? K.type : K.mc)(it.d, it.c, n, i, ok => { if (ok) right++; else if (o.lives) lives--; i++; next(); });
        if (o.lives) view.children[0].after(hearts());
      });
    };
    function done() {
      const won = !o.lives || lives > 0, pct = Math.round(right / n * 100);
      if (LA.onRound) LA.onRound('mc', right, n, items[0].d);
      LA.addXp(o.lives ? (won ? 30 : 5) : 10); save();
      if (pct === 100 || (o.lives && won)) LA.confetti();
      const tm = tomorrow(items);
      view.append(h('div', { class: 'result' },
        h('div', { class: 'ringwrap' }, LA.ring(pct, { size: 168, stroke: 14 }), h('div', { class: 'ringtxt' }, pct + ' %')),
        h('h2', null, o.lives ? (won ? 'Boss besiegt!' : 'Alle Leben weg') : pct === 100 ? 'Perfekt!' : pct >= 70 ? 'Stark!' : 'Guter Anfang'),
        h('p', { class: 'lead' }, right + ' von ' + n + ' richtig' + (o.lives && !won ? ' (nach ' + i + ' Fragen)' : '')),
        h('div', { class: 'stats3' }, stat('+' + (o.lives ? (won ? 30 : 5) : 10) + ' Bonus', 'XP'), stat(LA.streakNow(), 'Tage Serie'), stat(tm, 'morgen fällig')),
        tm ? h('p', { class: 'lead nextrev' }, '🔁 Morgen wiederholen wir ' + tm + (tm === 1 ? ' Karte' : ' Karten') + ' davon.') : '',
        h('div', { class: 'stackbtn' },
          h('button', { class: 'cta', type: 'button', onclick: () => o.again() }, 'Nochmal'),
          h('button', { class: 'cta ghost', type: 'button', onclick: exit }, 'Zurück'))));
    }
    next();
  }

  // ---------- Probetest (ohne Rückmeldung, mit Zeit, Note am Ende) ----------
  const SCALES = { geografie: [50, 65, 80, 90], englisch: [60, 70, 80, 90] };   // Grenzen für Genügend, Befriedigend, Gut, Sehr gut
  const grade = (pct, t) => pct >= t[3] ? { n: 1, t: 'Sehr gut' } : pct >= t[2] ? { n: 2, t: 'Gut' } : pct >= t[1] ? { n: 3, t: 'Befriedigend' } : pct >= t[0] ? { n: 4, t: 'Genügend' } : { n: 5, t: 'Nicht genügend' };
  function probe(o) {
    const items = o.items, n = items.length, answers = [];
    let i = 0, left = o.minutes * 60, tid = 0;
    const exit = () => { clearInterval(tid); go(o.back, o.tab); };
    const clock = h('span', { class: 'timer' });
    const tick = () => { clock.textContent = Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0'); clock.classList.toggle('low', left <= 60); };
    function show() {
      if (i >= n) return end();
      const it = items[i], L = 'ABCD';
      go(() => {
        LA.sessionExit = exit; setCfg(it.d);
        const opts = LA.options(it.d, it.c).map((t, k) => h('button', { class: 'opt', type: 'button', onclick: () => { answers[i] = { it, ok: LA.matches(it.d, it.c, t) }; i++; show(); } },
          h('span', { class: 'ltr' }, L[k]), h('span', { class: 'txt' }, t)));
        view.append(h('div', { class: 'probe' }),
          h('div', { class: 'qtop' }, h('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Probetest abbrechen', onclick: exit }, svg('close')),
            h('div', { class: 'track' }, h('i', { style: 'width:' + Math.round(i / n * 100) + '%' })), clock, h('span', { class: 'count' }, (i + 1) + '/' + n)),
          K.qcard(it.d, it.c), h('div', { class: 'opts' }, opts));
        tick();
      });
    }
    function end() {
      clearInterval(tid);
      const rated = answers.filter(Boolean);
      rated.forEach(a => LA.rate(a.it.d, a.it.c, a.ok));
      const right = rated.filter(a => a.ok).length, pct = Math.round(right / n * 100), g = grade(pct, o.scale);
      LA.addXp(20); save();
      if (g.n <= 2) LA.confetti();
      const wrong = items.map((it, k) => ({ it, a: answers[k] })).filter(x => !x.a || !x.a.ok);
      go(() => view.append(h('div', { class: 'result' },
        h('div', { class: 'ringwrap' }, LA.ring(pct, { size: 168, stroke: 14 }), h('div', { class: 'ringtxt' }, pct + ' %')),
        h('h2', null, 'Note ' + g.n + ': ' + g.t), h('p', { class: 'lead' }, right + ' von ' + n + ' richtig. Das ist eine Schätzung nach der Notenskala des Kurses.'),
        wrong.length ? h('section', { class: 'card wgroup' }, h('h3', null, 'Das solltest du nochmal ansehen', h('span', null, wrong.length)),
          h('div', { class: 'wlist' }, wrong.map(x => h('div', { class: 'witem' }, h('strong', null, x.it.c.q), h('span', null, (x.a ? '' : 'nicht beantwortet · ') + LA.ans(x.it.d, x.it.c).join(' – ')))))) : '',
        h('div', { class: 'stackbtn' }, h('button', { class: 'cta', type: 'button', onclick: () => o.again() }, 'Nochmal'), h('button', { class: 'cta ghost', type: 'button', onclick: exit }, 'Zurück')))));
    }
    tid = setInterval(() => {
      if (!view.querySelector('.probe')) { clearInterval(tid); return; }
      left--; tick(); if (left <= 0) end();
    }, 1000);
    show();
  }

  // ---------- Einstiege ----------
  const few = () => LA.toast && LA.toast('🙈', 'Zu wenige Karten', 'Wähle zuerst Themen für den Test aus.');
  const testItems = t => itemsOf(LA.testDecks(t));
  const back = t => () => ui.test(t);
  function trainTest(t) {
    const all = testItems(t); if (all.length < 3) return few();
    run({ items: best(all, 15), typing: true, back: back(t), tab: 'plan', again: () => trainTest(t) });
  }
  function probeTest(t) {
    const all = testItems(t); if (all.length < 5) return few();
    const items = shuffle(all).slice(0, 20), sub = LA.subjectOf(items[0].d);
    probe({ items, minutes: Math.max(5, Math.ceil(items.length * .75)), scale: SCALES[sub && sub.id] || [50, 65, 80, 90], back: back(t), tab: 'plan', again: () => probeTest(t) });
  }
  function boss(t) {
    const all = testItems(t); if (all.length < 5) return few();
    run({ items: weakest(all, 10), lives: 3, back: back(t), tab: 'plan', again: () => boss(t) });
  }
  function dueSession() {
    const items = best(dueItems(DECKS), 15); if (!items.length) return;
    run({ items, typing: true, back: () => ui.home(), tab: 'learn', again: dueSession });
  }

  // Karte auf der Testseite: drei Wege, gezielt für den Test zu üben
  const testCard = t => {
    const n = testItems(t).length, q = Math.min(20, n);
    const row = (ico, title, sub, fn) => h('button', { class: 'deck', type: 'button', onclick: fn }, tileIco(ico), h('span', { class: 'grow' }, title, h('small', null, sub)), svg('chevron', 'chev'));
    return h('div', { class: 'list' },
      row('🎯', 'Heute für den Test üben', 'Die 15 wichtigsten Karten aus allen Testthemen', () => trainTest(t)),
      row('📝', 'Probetest', q + ' Fragen, ' + Math.max(5, Math.ceil(q * .75)) + ' Minuten, Note am Ende', () => probeTest(t)),
      row('👹', 'Boss-Runde', '10 schwächste Karten, 3 Leben', () => boss(t)));
  };

  // ---------- Kalendereintrag (.ics) ----------
  const esc = s => String(s || '').replace(/\\/g, '\\\\').replace(/([;,])/g, '\\$1').replace(/\r?\n/g, '\\n');
  async function ics(t) {
    const d = t.date.replace(/-/g, ''), e = new Date(Date.parse(t.date + 'T00:00:00Z') + 864e5).toISOString().slice(0, 10).replace(/-/g, '');
    const text = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Lernapp//DE', 'BEGIN:VEVENT', 'UID:' + t.id + '@lernapp', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]|\.\d+/g, ''),
      'DTSTART;VALUE=DATE:' + d, 'DTEND;VALUE=DATE:' + e, 'SUMMARY:' + esc(t.title), 'DESCRIPTION:' + esc(t.stoff), 'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY',
      'DESCRIPTION:' + esc('Morgen: ' + t.title), 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const file = new File([text], 'test-' + d + '.ics', { type: 'text/calendar' });
    try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: t.title }); return; } } catch (err) { if (err && err.name === 'AbortError') return; }
    const a = h('a', { href: URL.createObjectURL(file), download: file.name }); document.body.append(a); a.click(); a.remove();
  }

  // ---------- Startseite: Heute fällig ----------
  ui.dueCard = () => {
    const n = dueItems(DECKS).length; if (!n) return '';
    return h('button', { class: 'nexttest', type: 'button', style: '--c:var(--pri)', onclick: dueSession },
      h('span', { class: 'dateblock' }, h('b', null, n > 99 ? '99+' : n), h('small', null, 'fällig')),
      h('span', { class: 'grow' }, h('strong', null, 'Heute fällig'), h('small', null, n + (n === 1 ? ' Karte wartet' : ' Karten warten') + ' auf Wiederholung')), svg('chevron', 'chev'));
  };

  LA.study = { dueSession, trainTest, probeTest, boss, testCard, ics, dueItems, grade, SCALES };
})();
