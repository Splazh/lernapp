// Lernapp, Teil 2: die Lernarten (Karteikarten, Auswahl, Schreiben, Paare, Zeitspiel) und das Ergebnis.
(() => {
  'use strict';
  const LA = window.LA;
  const { h, svg, S, save, go, base, cardsOf, pick, rate, bump, prompt, ans, labels, ansText, options, matches, fieldOk,
    splitVar, shuffle, buzz, cfg, streakNow, mastered, touch, view } = LA;
  let xp0 = 0;

  // ---------- Gemeinsame Bausteine ----------
  const leave = d => () => go(() => LA.ui.deck(d));
  // In einer gemischten Runde (study.js) führt das Kreuz zurück dorthin, wo die Runde gestartet wurde.
  const top = (d, i, n) => h('div', { class: 'qtop' },
    h('button', { class: 'iconbtn', 'aria-label': 'Beenden', onclick: () => (LA.sessionExit || leave(d))() }, svg('close')),
    h('div', { class: 'track' }, h('i', { style: 'width:' + (n ? Math.round(i / n * 100) : 0) + '%' })),
    n ? h('span', { class: 'count' }, (i + 1) + '/' + n) : '');
  let cur = null;   // Karte, die gerade gezeigt wird (fürs Vorlesen)
  const qcard = (d, c) => { cur = { d, c }; return h('div', { class: 'qcard' }, c.img ? h('img', { class: 'qimg', src: c.img, alt: 'Bild zur Frage' }) : '', h('div', { class: 'q' }, prompt(d, c)),
    labels(d).length ? h('div', { class: 'ql' }, labels(d).join(' – ')) : ''); };
  // Vorlese-Knopf für Englisch und Spanisch (liest die Antwort in der Fremdsprache)
  const speakBtn = (d, c) => { const lang = LA.speakLang(d); return lang ? h('button', { class: 'speakbtn', type: 'button', 'aria-label': 'Antwort vorlesen', onclick: e => { e.stopPropagation(); LA.speak(ans(d, c).map(a => splitVar(a)[0]).join('. '), lang); } }, '🔊') : ''; };
  // Untere Leiste: Rückmeldung nach einer Antwort mit "Weiter".
  function dock(ok, title, sub, next, label) {
    const old = view.querySelector('.dock'); if (old) old.remove();
    view.append(h('div', { class: 'dock ' + (ok ? 'good' : 'bad'), role: 'status' },
      h('div', { class: 'fb' }, h('strong', null, title), sub ? h('span', null, sub) : ''), cur ? speakBtn(cur.d, cur.c) : '',
      h('button', { class: 'cta', onclick: next }, label || 'Weiter')));
  }
  const plainDock = (...kids) => {
    const old = view.querySelector('.dock'); if (old) old.remove();
    const el = h('div', { class: 'dock plain' }, kids); view.append(el); return el;
  };

  // Erklärung nach einer falschen Antwort. Nur beim Wiederholen unter "Falsche Antworten" (d.filter), nie in normalen Runden.
  function explainBox(d, c) {
    if (!d.filter) return '';
    const l = LA.explainLines(d, c);
    return l.length ? h('div', { class: 'explain' }, h('strong', null, 'Erklärung'), l.map(t => h('p', null, t))) : '';
  }

  // ---------- Start einer Runde ----------
  function start(d, key) {
    cfg.looseAccents = !!base(d).looseAccents;
    cfg.mathInput = !!base(d).mathInput;
    if (!cardsOf(d).length) return LA.goBack(d);
    LA.opt(d).mode = key; touch(d); xp0 = S.xp;
    // go() räumt den alten Bildschirm weg, sonst hängt das Spiel unter dem Themen-Blatt.
    if (LA.rounds && LA.rounds[key]) return LA.rounds[key](d);
    if (key === 'pairs') return go(() => pairs(d));
    if (key === 'timed') return go(() => timed(d));
    if (key === 'order') return LA.orderStart(d);
    const queue = pick(d, 10);
    if (!queue.length) return LA.goBack(d);
    let i = 0, right = 0;
    const next = () => {
      if (i >= queue.length) return go(() => finish(d, right, queue.length, key));
      go(() => ({ flash, mc, type, ...LA.modes }[key])(d, queue[i], queue.length, i, ok => { if (ok) right++; i++; next(); }));
    };
    next();
  }

  // ---------- Karteikarten ----------
  function flash(d, c, n, i, done) {
    const front = h('div', { class: 'face front' }, h('div', { class: 'q' }, prompt(d, c)), h('div', { class: 'hint' }, 'Tippen zum Umdrehen'));
    const back = h('div', { class: 'face back' }, h('div', { class: 'hint' }, prompt(d, c)),
      ans(d, c).flatMap((a, k) => [h('div', { class: 'lab' }, labels(d)[k] || ''), h('div', { class: 'val' }, a)]));
    const card = h('button', { class: 'flip', type: 'button' }, front, back);
    card.addEventListener('click', () => {
      if (card.classList.contains('turned')) return;
      card.classList.add('turned');
      plainDock(speakBtn(d, c),
        h('button', { class: 'cta ghost bad', onclick: () => { rate(d, c, false); done(false); } }, 'Nochmal'),
        h('button', { class: 'cta good', onclick: () => { rate(d, c, true); done(true); } }, 'Gewusst'));
    });
    view.append(top(d, i, n), card);
  }

  // ---------- Auswahl (Multiple Choice) ----------
  function choices(d, c, onPick) {
    const L = 'ABCD';
    const btns = options(d, c).map((t, k) => h('button', { class: 'opt' }, h('span', { class: 'ltr' }, L[k]), h('span', { class: 'txt' }, t)));
    const txt = b => b.querySelector('.txt').textContent;
    btns.forEach(b => b.addEventListener('click', () => {
      const ok = matches(d, c, txt(b));
      btns.forEach(x => { x.disabled = true; if (matches(d, c, txt(x))) x.classList.add('right'); });
      if (!ok) { b.classList.add('wrong'); buzz(60); }
      rate(d, c, ok);
      onPick(ok, txt(btns.find(x => matches(d, c, txt(x)))));
    }));
    return h('div', { class: 'opts' }, btns);
  }
  function mc(d, c, n, i, done) {
    view.append(top(d, i, n), qcard(d, c), choices(d, c, (ok, right) => {
      if (!ok) { const x = explainBox(d, c); if (x) view.append(x); }
      dock(ok, ok ? 'Richtig!' : 'Nicht ganz', ok ? '+10 XP' : 'Richtig ist: ' + right, () => done(ok));
    }));
  }

  // ---------- Selber schreiben ----------
  function type(d, c, n, i, done) {
    const sol = ans(d, c);
    const inputs = sol.map(() => h('input', { type: 'text', autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false', enterkeyhint: 'done' }));
    const fields = h('div', { class: 'fields' }, sol.map((s, k) => h('label', { class: 'field' }, h('span', null, labels(d)[k] || 'Antwort'), inputs[k])));
    let allOk = false;
    function check() {
      const res = inputs.map((inp, k) => fieldOk(inp.value, sol[k]));
      allOk = res.every(Boolean);
      inputs.forEach((inp, k) => {
        inp.readOnly = true;
        inp.parentNode.classList.add(res[k] ? 'ok' : 'no');
        if (!res[k]) inp.parentNode.append(h('em', { class: 'sol' }, splitVar(sol[k]).join('  oder  ')));
      });
      if (!allOk) { buzz(60); const x = explainBox(d, c); if (x) view.append(x); }
      rate(d, c, allOk);
      dock(allOk, allOk ? 'Richtig!' : 'Fast', allOk ? '+10 XP' : 'Die Lösung steht unter dem Feld.', () => done(allOk));
    }
    inputs.forEach((inp, k) => inp.addEventListener('keydown', e => {
      if (e.key !== 'Enter' || inp.readOnly) return;
      if (k < inputs.length - 1) inputs[k + 1].focus(); else check();
    }));
    view.append(top(d, i, n), qcard(d, c), fields);
    plainDock(h('button', { class: 'cta', onclick: check }, 'Prüfen'));
    inputs[0].focus();
  }

  // ---------- Paare finden ----------
  function pairs(d) {
    const set = pick(d, 6);
    const tiles = shuffle(set.flatMap(c => [{ id: c.i, t: prompt(d, c) }, { id: c.i, t: ansText(d, c), a: true }]));
    let sel = null, moves = 0, left = set.length, lock = false;
    const els = tiles.map(t => h('button', { class: 'tile', type: 'button', onclick: () => tap(t, els[tiles.indexOf(t)]) }, h('span', null, t.t)));
    const bar = h('i', { style: 'width:0%' });
    function tap(t, e) {
      if (lock || e === sel) return;
      if (!sel) { sel = { t, e }; e.classList.add('sel'); buzz(15); return; }
      moves++;
      const first = sel; sel = null;
      if (first.t.id === t.id && first.t.a !== t.a) {
        [first.e, e].forEach(x => { x.classList.remove('sel'); x.classList.add('done'); });
        left--; bar.style.width = Math.round((set.length - left) / set.length * 100) + '%';
        if (left === 0) setTimeout(() => { bump(); LA.addXp(30); save(); go(() => finish(d, set.length, moves, 'pairs')); }, 350);
      } else {
        lock = true; buzz(40);
        [first.e, e].forEach(x => { x.classList.remove('sel'); x.classList.add('nope'); });
        setTimeout(() => { [first.e, e].forEach(x => x.classList.remove('nope')); lock = false; }, 450);
      }
    }
    view.append(
      h('div', { class: 'qtop' }, h('button', { class: 'iconbtn', 'aria-label': 'Beenden', onclick: leave(d) }, svg('close')), h('div', { class: 'track' }, bar)),
      h('p', { class: 'pairhint' }, 'Tippe zwei Kacheln an, die zusammengehören.'), h('div', { class: 'tiles' }, els));
  }

  // ---------- Zeitspiel ----------
  function timed(d) {
    let time = 60, score = 0, combo = 0, c = null, locked = false;
    const bar = h('i', { style: 'width:100%' }), clock = h('span', { class: 'timer' }), pts = h('span', { class: 'chip' }), comboEl = h('div', { class: 'combo' });
    const body = h('div');
    const tick = () => { clock.textContent = time + ' s'; clock.classList.toggle('low', time <= 10); pts.textContent = score + ' Punkte' + (S.best[d.id] ? ' · Rekord ' + S.best[d.id] : ''); bar.style.width = Math.round(time / 60 * 100) + '%'; };
    function nextQ() {
      locked = false; c = pick(d, 1)[0];
      const opts = choices(d, c, ok => {
        if (locked) return; locked = true;
        if (ok) { combo++; score += 1 + (combo >= 3 ? 1 : 0); } else combo = 0;
        comboEl.textContent = combo >= 3 ? 'Serie x' + combo : '';
        tick();
        setTimeout(() => { if (time > 0) nextQ(); }, ok ? 350 : 900);
      });
      // choices() trägt die Antwort selbst ein. Doppelklicks sperrt "locked" nur für die Punkte, die Buttons sind danach disabled.
      body.replaceChildren(qcard(d, c), opts);
    }
    view.append(h('div', { class: 'qtop' }, h('button', { class: 'iconbtn', 'aria-label': 'Beenden', onclick: leave(d) }, svg('close')),
      h('div', { class: 'track' }, bar), clock), h('div', { class: 'row between' }, pts, comboEl), body);
    tick(); nextQ();
    LA.timer = setInterval(() => {
      time--; tick();
      if (time <= 0) {
        clearInterval(LA.timer);
        const isBest = score > (S.best[d.id] || 0);
        if (isBest) S.best[d.id] = score;
        LA.addXp(score * 2); save();
        go(() => finish(d, score, 0, 'timed', isBest));
      }
    }, 1000);
  }

  // ---------- Ergebnis ----------
  function finish(d, right, total, key, isBest) {
    if (LA.onRound) LA.onRound(key, right, total, d);
    let pct, center, title, sub;
    if (key === 'timed') {
      const best = S.best[d.id] || right;
      pct = best ? Math.min(100, Math.round(right / best * 100)) : 0; center = right + ' Pkt.';
      title = isBest ? 'Neuer Rekord!' : 'Zeit ist um'; sub = 'Dein Rekord: ' + best + ' Punkte';
    } else if (key === 'pairs') {
      pct = 100; center = total + ' Züge'; title = 'Alle Paare gefunden'; sub = 'Weniger Züge sind besser.';
    } else {
      pct = Math.round(right / total * 100); center = pct + ' %';
      title = pct === 100 ? 'Perfekt!' : pct >= 70 ? 'Stark!' : pct >= 40 ? 'Guter Anfang' : 'Weiter üben lohnt sich';
      sub = right + ' von ' + total + ' richtig';
    }
    const gained = S.xp - xp0;
    if (pct === 100 && key !== 'timed' && LA.confetti) LA.confetti();
    const tomorrow = key === 'timed' || key === 'pairs' ? 0 : cardsOf(base(d)).filter(c => { const s = LA.st(d, c); return s.seen > 0 && (s.due || 0) <= LA.dnum() + 1; }).length;
    const stat = (v, l) => h('div', { class: 'stat' }, h('strong', null, v), h('span', null, l));
    view.append(h('div', { class: 'result' },
      h('div', { class: 'ringwrap' }, LA.ring(pct, { size: 168, stroke: 14 }), h('div', { class: 'ringtxt' }, center)),
      h('h2', null, title), h('p', { class: 'lead' }, sub),
      h('div', { class: 'stats3' }, stat('+' + gained, 'XP'), stat(streakNow(), 'Tage Serie'), stat(mastered(d) + '/' + base(d).cards.length, 'sicher')),
      tomorrow ? h('p', { class: 'lead nextrev' }, '🔁 Morgen wiederholen wir ' + tomorrow + (tomorrow === 1 ? ' Karte' : ' Karten') + ' aus diesem Thema.') : '',
      h('div', { class: 'stackbtn' },
        h('button', { class: 'cta', onclick: () => start(d, key) }, 'Nochmal'),
        h('button', { class: 'cta ghost', onclick: leave(d) }, 'Andere Lernart'),
        h('button', { class: 'cta ghost', onclick: () => LA.goBack(d) }, 'Zurück zum Fach'))));
  }

  LA.start = start;
  LA.kit = { top, qcard, dock, plainDock, leave, finish, explainBox, mc, type, flash, speakBtn };
})();
