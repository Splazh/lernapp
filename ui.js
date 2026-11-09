// Lernapp, Teil 3: Oberfläche (Tabs, Startseite, Fächer, Themen-Blatt, Üben, Erfolge, Profil).
(() => {
  'use strict';
  const LA = window.LA;
  const { h, svg, S, save, go, bar, backBtn, tileIco, head, base, cardsOf, decksOf, subjectOf, wrongDeck, wrongCount, mastered, deckPct, subjectStats,
    levelInfo, streakNow, view, DECKS, SUBJECTS } = LA;
  const ui = LA.ui;
  const nm = () => S.name || 'Lana';

  // ---------- Tab-Leiste ----------
  const TABS = [['learn', 'Lernen', 'home'], ['plan', 'Termine', 'calendar'], ['practice', 'Üben', 'target'], ['notes', 'Notizen', 'note'], ['profile', 'Profil', 'user']];
  const nav = document.getElementById('tabs');
  const openTab = id => go(() => ({ learn: home, plan: () => ui.plan(), practice, notes: () => ui.notes(), profile })[id](), id);
  TABS.forEach(([id, label, icon]) => nav.append(h('button', { class: 'tab', type: 'button', 'data-tab': id, onclick: () => openTab(id) }, svg(icon), h('span', null, label))));
  ui.markTab = tab => nav.querySelectorAll('.tab').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));

  // ---------- Kleine Bausteine ----------
  const avatar = cls => h('div', { class: 'avatar ' + (cls || ''), 'aria-hidden': 'true' }, nm()[0].toUpperCase());
  const answersTotal = () => {
    let seen = 0, right = 0, ok = 0;
    for (const o of Object.values(S.cards || {})) for (const c of Object.values(o)) { seen += c.seen; right += c.right; if (LA.sure(c)) ok++; }
    return { seen, right, ok };
  };
  const startDeck = d => go(() => ui.deck(d));
  const pickDeck = () => LA.activeDecks().find(x => x.id === (S.recent || [])[0]) || LA.activeDecks().find(x => x.id === 'en-family-vocab') || LA.activeDecks()[0];

  // ---------- Lernen: Startseite ----------
  function home() {
    const d = pickDeck();
    if (!d) { view.append(h('h1', null, 'Dein Lernstoff'), h('p', null, 'Wähle Themen aus oder erstelle eigene Karten.'), h('button', { class: 'cta', type: 'button', onclick: () => go(ui.selection, 'learn') }, 'Lernstoff auswählen'), LA.mineAll()); return; }
    const sub = subjectOf(d), recent = !!(S.recent || []).length, lv = levelInfo();
    const hero = h('section', { class: 'hero' },
      h('div', { class: 'hero-txt' },
        h('span', { class: 'hero-kick' }, recent ? 'Zuletzt geübt' : 'Dein Einstieg'),
        h('h2', null, d.title), h('p', null, sub.title + ' · ' + deckPct(d) + ' % sicher'),
        h('button', { class: 'cta light', type: 'button', onclick: () => startDeck(d) }, recent ? 'Weiter' : 'Los geht\'s')),
      h('div', { class: 'hero-ring' }, LA.ring(deckPct(d), { size: 92, stroke: 9 }), h('b', null, deckPct(d) + '%')));
    const stat = (cls, ico, v, l) => h('div', { class: 'mini ' + cls }, h('strong', null, v), h('small', null, l));
    const wrap = h('div', { class: 'subjects ' + (S.layout === 'list' ? 'as-list' : 'as-grid') });
    const fill = () => {
      wrap.className = 'subjects ' + (S.layout === 'list' ? 'as-list' : 'as-grid');
      wrap.replaceChildren(...LA.visibleSubjects().map(subj => {
        const t = subjectStats(subj), w = wrongCount(subj);
        return h('button', { class: 'subj' + (t.decks ? '' : ' soon'), type: 'button', style: '--c:' + subj.color, onclick: () => go(() => ui.subject(subj), 'learn') },
          w ? h('span', { class: 'badge', title: 'Falsche Antworten' }, w) : '',
          tileIco(subj.icon), h('span', { class: 'grow' }, h('strong', null, subj.title), h('small', null, t.decks ? t.m + ' von ' + t.t + ' gelernt' : 'Kommt bald'), bar(t.pct)),
          S.layout === 'list' ? LA.ring(t.pct, { size: 42, stroke: 6, color: subj.color }) : '');
      }));
    };
    const toggle = h('div', { class: 'seg' },
      ['grid', 'list'].map(k => h('button', { type: 'button', 'aria-label': k === 'grid' ? 'Kacheln' : 'Liste', class: S.layout === k ? 'on' : '',
        onclick: e => { S.layout = k; save(); toggle.querySelectorAll('button').forEach(b => b.classList.remove('on')); e.currentTarget.classList.add('on'); fill(); } }, svg(k))));
    view.append(
      h('header', { class: 'hd' }, h('div', null, h('p', { class: 'hi' }, 'Hallo ' + nm() + ','), h('h1', null, 'Dein Raum zum Lernen.')), avatar()),
      h('div', { class: 'home-tools' }, h('button', { class: 'search-launch', type: 'button', onclick: () => go(ui.search, 'learn') }, svg('search'), h('span', null, 'Themen und Karten suchen')), h('button', { class: 'library-launch', type: 'button', onclick: () => go(ui.selection, 'learn') }, 'Mein Lernstoff')),
      ui.journeyCard(), hero, ui.nextTest ? ui.nextTest() : '', ui.dueCard ? ui.dueCard() : '', ui.backupHint ? ui.backupHint() : '',
      h('div', { class: 'minis' }, stat('m1', '🔥', streakNow(), 'Tage Serie'), stat('m2', '⭐', S.xp, 'XP'),
        stat('m3', '🏆', 'Level ' + lv.lvl, lv.into + ' / ' + lv.need + ' XP')),
      head('Deine Fächer', toggle), wrap, ui.questCard ? ui.questCard() : '');
    fill();
  }

  const noteCount = sub => (S.notes || []).filter(n => n.subj === sub.id).length;

  // ---------- Fach ----------
  function subject(sub) {
    const ds = decksOf(sub), w = wrongCount(sub), t = subjectStats(sub);
    const rows = ds.flatMap((d, k) => {
      const gh = d.group && d.group !== (ds[k - 1] || {}).group ? h('h3', { class: 'grp' }, d.group) : null;
      return [gh, h('button', { class: 'deck', type: 'button', onclick: () => startDeck(d) },
        tileIco(d.icon), h('span', { class: 'grow' }, d.title, h('small', null, mastered(d) + ' von ' + d.cards.length + ' sicher gelernt' + (LA.hasRead && LA.hasRead(d) ? ' · 📚 mit Lesetext' : '')), bar(deckPct(d))), svg('chevron', 'chev'))];
    });
    view.append(
      h('div', { class: 'topline' }, backBtn(() => go(home, 'learn'))),
      h('header', { class: 'shd', style: '--c:' + sub.color }, tileIco(sub.icon, 'lg'),
        h('div', { class: 'grow' }, h('h1', null, sub.title), h('p', { class: 'lead' }, ds.length ? ds.length + ' Themen · ' + t.pct + ' % gelernt' : 'Hier kommt bald Stoff rein.')),
        LA.ring(t.pct, { size: 58, stroke: 7, color: sub.color })),
      h('div', { class: 'list', style: '--c:' + sub.color }, rows,
        h('button', { class: 'deck', type: 'button', onclick: () => go(() => ui.notes(sub.id), 'notes') },
          tileIco('📝'), h('span', { class: 'grow' }, 'Notizen', h('small', null, noteCount(sub) ? noteCount(sub) + ' zu ' + sub.title : 'Eigene Notizen zu ' + sub.title)), svg('chevron', 'chev')),
        LA.openRow ? LA.openRow(sub.id) : '', LA.mineRow ? LA.mineRow(sub.id) : '',
        h('button', { class: 'deck warn' + (w ? ' has' : ''), type: 'button', onclick: () => go(() => ui.wrong(sub), 'learn') },
          tileIco('❌'), h('span', { class: 'grow' }, 'Falsche Antworten', h('small', null, w ? w + ' zum Nochmal-Üben' : 'Noch keine, stark!')), svg('chevron', 'chev'))));
  }

  // ---------- Falsche Antworten ----------
  function wrong(sub) {
    const groups = decksOf(sub).map(d => ({ wd: wrongDeck(d, sub) })).map(g => ({ ...g, list: cardsOf(g.wd) })).filter(g => g.list.length);
    view.append(
      h('div', { class: 'topline' }, backBtn(() => go(() => ui.subject(sub), 'learn'))),
      h('h1', { class: 'ttl' }, 'Falsche Antworten'),
      h('p', { class: 'lead' }, groups.length ? sub.title + ': Das hattest du zuletzt falsch. Wenn du es richtig beantwortest, verschwindet es hier.' : 'Nichts falsch. Alles im grünen Bereich.'),
      ...groups.map(g => h('section', { class: 'card wgroup' },
        h('h3', null, base(g.wd).title, h('span', null, g.list.length)),
        h('div', { class: 'wlist' }, g.list.map(c => h('div', { class: 'witem' }, h('strong', null, c.q), h('span', null, c.a.join(' – '))))),
        h('button', { class: 'cta', type: 'button', onclick: () => go(() => ui.deck(g.wd)) }, 'Diese ' + g.list.length + ' üben'))));
  }

  // ---------- Themen-Blatt: Lernart wählen ----------
  const MODES = [
    { key: 'flash', ico: '🃏', t: 'Karteikarten', d: 'Umdrehen und selbst bewerten.' },
    { key: 'mc', ico: '🎯', t: 'Multiple Choice', d: 'Die richtige Antwort antippen.' },
    { key: 'type', ico: '⌨️', t: 'Selber schreiben', d: 'Tippe die Lösung ein.' },
    { key: 'pairs', ico: '🧩', t: 'Paare finden', d: 'Finde, was zusammengehört.' },
    { key: 'timed', ico: '⏱️', t: 'Zeitspiel', d: '60 Sekunden, so viele wie möglich.' },
    { key: 'tf', ico: '⚖️', t: 'Richtig oder falsch', d: 'Stimmt die Aussage? Tippe Richtig oder Falsch.' },
    { key: 'gap', ico: '✏️', t: 'Lücken füllen', d: 'Ergänze das fehlende Wort oder die fehlenden Buchstaben.', ok: d => !LA.base(d).mathInput && cardsOf(LA.base(d)).filter(c => LA.ans(d, c).join(' ').length <= 32).length >= cardsOf(LA.base(d)).length * .6 },
    { key: 'bank', ico: '🏦', t: 'Wortbank', d: 'Ziehe Wörter aus dem Kasten in die Lücken. Zwei sind zu viel.', ok: d => !!LA.hasBank && LA.hasBank(d) },
    { key: 'order', ico: '🔀', t: 'Reihenfolge', d: 'Bringe Wörter oder Schritte in die richtige Reihenfolge.', ok: d => !!LA.hasOrder && LA.hasOrder(d) }
  ];
  function deck(d) {
    const o = LA.opt(d), b = base(d), sub = subjectOf(d);
    const modes = MODES.filter(m => !(b.noModes || []).includes(m.key) && (!m.ok || m.ok(d)));
    let mode = modes.some(m => m.key === o.mode) ? o.mode : modes[0].key;
    const desc = h('p', { class: 'modedesc' }), btns = [];
    const sel = k => { mode = k; btns.forEach(x => x.el.classList.toggle('on', x.k === k)); desc.textContent = modes.find(m => m.key === k).d; };
    const grid = h('div', { class: 'modes' }, modes.map(m => {
      const el = h('button', { class: 'mode', type: 'button', onclick: () => sel(m.key) }, h('span', { class: 'mi' }, m.ico), h('span', null, m.t));
      btns.push({ k: m.key, el }); return el;
    }));
    const pct = d.filter ? 0 : deckPct(d);
    view.append(
      h('div', { class: 'topline' }, backBtn(() => LA.goBack(d))),
      h('header', { class: 'shd', style: '--c:' + sub.color }, tileIco(b.icon, 'lg'),
        h('div', { class: 'grow' }, h('h1', null, d.filter ? 'Falsche Antworten' : b.title),
          h('p', { class: 'lead' }, d.filter ? cardsOf(d).length + ' Karten zum Wiederholen' : pct + ' % sicher · ' + b.cards.length + ' Karten'))),
      ui.evidence(d), LA.visual(d),
      b.mine ? h('button', { class: 'cta ghost', type: 'button', onclick: () => LA.editTopic(S.topics.find(t => t.id === b.id)) }, 'Dieses Thema bearbeiten') : '',
      h('section', { class: 'sheet' },
        LA.readRow && !d.filter ? LA.readRow(d) : '',
        b.info && !d.filter ? h('button', { class: 'row-link', type: 'button', onclick: () => go(() => info(d)) }, tileIco('📖'),
          h('span', { class: 'grow' }, 'Erklärung lesen', h('small', null, 'So funktioniert dieses Thema')), svg('chevron', 'chev')) : '',
        d.labels.length > 1 ? h('label', { class: 'switch' }, h('span', { class: 'grow' }, 'Erste Form vorgeben', h('small', null, d.labels[0] + ' steht schon da, du ergänzt den Rest.')),
          h('input', { type: 'checkbox', checked: o.skip > 0, onchange: e => { o.skip = e.target.checked ? 1 : 0; save(); } }), h('i', { class: 'knob' })) : '',
        h('h3', { class: 'minihead' }, 'Lernart'), grid, desc));
    sel(mode);
    view.append(h('div', { class: 'dock plain' }, h('button', { class: 'cta', type: 'button', onclick: () => LA.start(d, mode) }, 'Starten')));
  }

  // ---------- Erklärseite ----------
  function info(d) {
    const i = d.info, b = base(d), sub = subjectOf(d);
    const list = (title, items) => items && items.length ? h('section', { class: 'card info' }, h('h3', null, title), h('ul', null, items.map(t => h('li', null, t)))) : '';
    view.append(
      h('div', { class: 'topline' }, backBtn(() => go(() => deck(d)))),
      h('header', { class: 'shd', style: '--c:' + sub.color }, tileIco(b.icon, 'lg'), h('div', { class: 'grow' }, h('h1', null, b.title), h('p', { class: 'lead' }, i.kurz || ''))),
      list('So geht es', i.form), list('Wann und wozu', i.use),
      i.signals ? h('section', { class: 'card info' }, h('h3', null, 'Signalwörter'), h('p', { class: 'sig' }, i.signals)) : '',
      i.examples ? h('section', { class: 'card info' }, h('h3', null, 'Beispiele'),
        ...i.examples.map(([en, de]) => h('div', { class: 'ex' }, h('strong', null, en), h('span', null, de)))) : '',
      i.tip ? h('div', { class: 'tip' }, h('b', null, 'Merke: '), i.tip) : '',
      h('div', { class: 'dock plain' }, h('button', { class: 'cta', type: 'button', onclick: () => go(() => deck(d)) }, 'Jetzt üben')));
  }

  // ---------- Üben ----------
  function practice() {
    const rows = SUBJECTS.map(s => ({ s, w: wrongCount(s) })).filter(x => x.w);
    const total = rows.reduce((n, x) => n + x.w, 0);
    const recent = (S.recent || []).map(id => LA.activeDecks().find(x => x.id === id)).filter(Boolean);
    const weak = LA.activeDecks().filter(d => cardsOf(d).some(c => LA.st(d, c).seen > 0) && deckPct(d) < 80).sort((a, b) => deckPct(a) - deckPct(b)).slice(0, 3);
    const deckRow = d => h('button', { class: 'deck', type: 'button', style: '--c:' + subjectOf(d).color, onclick: () => startDeck(d) },
      tileIco(d.icon), h('span', { class: 'grow' }, d.title, h('small', null, subjectOf(d).title + ' · ' + deckPct(d) + ' % sicher'), bar(deckPct(d))), svg('chevron', 'chev'));
    view.append(
      h('h1', { class: 'ttl' }, 'Üben'), h('p', { class: 'lead' }, 'Wiederhole, was noch nicht sitzt.'),
      h('section', { class: 'card fixcard' }, h('div', { class: 'big' }, total), h('div', { class: 'grow' }, h('strong', null, 'Falsche Antworten'),
        h('small', null, total ? 'in ' + rows.length + (rows.length === 1 ? ' Fach' : ' Fächern') + ' zum Nochmal-Üben' : 'Keine offen. Gut gemacht.'))),
      ...(total ? [h('div', { class: 'list' }, rows.map(x => h('button', { class: 'deck warn has', type: 'button', onclick: () => go(() => ui.wrong(x.s), 'learn') },
        tileIco(x.s.icon), h('span', { class: 'grow' }, x.s.title, h('small', null, x.w + ' Karten')), svg('chevron', 'chev'))))] : []),
      LA.openSubjects && LA.openSubjects().length ? head('Offene Fragen') : '', LA.openSubjects && LA.openSubjects().length ? h('div', { class: 'list' }, LA.openSubjects().map(s => LA.openRow(s.id))) : '',
      LA.mineAll ? LA.mineAll() : '',
      weak.length ? head('Hier lohnt sich Üben') : '', weak.length ? h('div', { class: 'list' }, weak.map(deckRow)) : '',
      head('Zuletzt geübt'),
      recent.length ? h('div', { class: 'list' }, recent.map(deckRow)) : h('p', { class: 'empty' }, 'Noch nichts geübt. Such dir im Tab Lernen ein Thema aus.'));
  }

  // ---------- Profil ----------
  function donut(items) {
    const NS = 'http://www.w3.org/2000/svg', size = 220, sw = 24, r = (size - sw) / 2, circ = 2 * Math.PI * r, n = items.length, seg = circ / n - 8;
    const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '0 0 ' + size + ' ' + size); s.setAttribute('class', 'donut');
    items.forEach((it, k) => {
      const mk = (len, cls, color) => {
        const c = document.createElementNS(NS, 'circle');
        c.setAttribute('cx', size / 2); c.setAttribute('cy', size / 2); c.setAttribute('r', r); c.setAttribute('fill', 'none'); c.setAttribute('stroke-width', sw);
        c.setAttribute('stroke-dasharray', len + ' ' + circ); c.setAttribute('transform', 'rotate(' + (-90 + k * 360 / n) + ' ' + size / 2 + ' ' + size / 2 + ')');
        c.setAttribute('class', cls); if (color) c.style.stroke = color; return c;
      };
      s.append(mk(seg, 'ring-bg'));
      if (it.pct > 0) s.append(mk(Math.max(3, seg * it.pct / 100), 'don-fg', it.color));
    });
    return s;
  }
  // Jede Person hat auf ihrem Handy ihren eigenen Stand. Geteilt wird nur der Link.
  function shareApp() {
    const url = location.href.split('#')[0].replace(/index\.html$/, '');
    const text = 'Probier die Lernapp aus: Karteikarten, Spiele und Ziele für alle Fächer.';
    if (navigator.share) navigator.share({ title: 'Lernapp', text, url }).catch(() => { /* abgebrochen */ });
    else if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => LA.toast('🔗', 'Link kopiert', url));
  }
  let sure = false;
  function profile() {
    const t = answersTotal(), lv = levelInfo(), items = SUBJECTS.map(s => ({ s, st: subjectStats(s) }));
    const all = items.reduce((a, x) => ({ m: a.m + x.st.m, t: a.t + x.st.t }), { m: 0, t: 0 });
    const allPct = all.t ? Math.round(all.m / all.t * 100) : 0, acc = t.seen ? Math.round(t.right / t.seen * 100) : 0;
    const stat = (v, l) => h('div', { class: 'stat' }, h('strong', null, v), h('span', null, l));
    const resetBtn = h('button', { class: 'linkbtn', type: 'button', onclick: () => {
      if (!sure) { sure = true; resetBtn.textContent = 'Wirklich alles löschen? Nochmal tippen'; resetBtn.classList.add('danger'); return; }
      sure = false; LA.reset(); go(profile, 'profile');
    } }, 'Fortschritt zurücksetzen');
    view.append(
      h('header', { class: 'pro' }, avatar('xl'), h('h1', null, nm()), h('span', { class: 'chip' }, 'Level ' + lv.lvl + ' · ' + lv.title)),
      h('section', { class: 'card' }, h('div', { class: 'donutwrap' }, donut(items.map(x => ({ color: x.s.color, pct: x.st.pct }))),
        h('div', { class: 'ringtxt' }, h('b', null, allPct + '%'), h('small', null, 'sicher gelernt'))),
        h('div', { class: 'legend' }, items.map(x => h('div', { class: 'lg', style: '--c:' + x.s.color }, h('i', null), h('span', null, x.s.title), h('b', null, x.st.decks ? x.st.pct + ' %' : '–'))))),
      h('label', { class: 'field', style: 'margin-top:16px' }, h('span', null, 'Dein Name'),
        h('input', { type: 'text', value: nm(), maxlength: 24, autocomplete: 'off', onchange: e => { const v = e.target.value.trim(); if (v) { S.name = v; save(); go(profile, 'profile'); } else e.target.value = nm(); } })),
      h('button', { class: 'deck', type: 'button', style: 'margin-top:16px', onclick: () => go(() => ui.awards('profile'), 'profile') },
        tileIco('🏆'), h('span', { class: 'grow' }, 'Erfolge', h('small', null, 'Abzeichen und Level')), svg('chevron', 'chev')),
      h('div', { class: 'stats3 four' }, stat(streakNow(), 'Tage Serie'), stat(t.ok, 'Karten sicher'), stat(t.seen, 'Antworten'), stat(acc + ' %', 'Trefferquote')),
      h('div', { class: 'themeseg', role: 'group', 'aria-label': 'Darstellung' }, [['light', 'Hell'], ['dark', 'Dunkel'], ['auto', 'Auto']].map(([k, l]) =>
        h('button', { type: 'button', class: (S.theme || 'light') === k ? 'on' : '', onclick: e => {
          S.theme = k; save(); LA.applyTheme();
          e.currentTarget.parentNode.querySelectorAll('button').forEach(b => b.classList.remove('on')); e.currentTarget.classList.add('on');
        } }, l))),
      h('div', { class: 'themeseg', role: 'group', 'aria-label': 'Schriftgröße' }, [['normal', 'Normal'], ['large', 'Groß'], ['xl', 'Sehr groß']].map(([k, l]) =>
        h('button', { type: 'button', class: (S.fs || 'normal') === k ? 'on' : '', onclick: e => {
          S.fs = k; save(); LA.applyTheme();
          e.currentTarget.parentNode.querySelectorAll('button').forEach(b => b.classList.remove('on')); e.currentTarget.classList.add('on');
        } }, l))),
      h('button', { class: 'deck', type: 'button', style: 'margin-top:16px', onclick: shareApp }, tileIco('💌'), h('span', { class: 'grow' }, 'App weitergeben', h('small', null, 'Link an eine Freundin schicken')), svg('chevron', 'chev')),
      h('button', { class: 'cta ghost', type: 'button', onclick: () => go(ui.selection, 'profile') }, 'Mein Lernstoff'),
      ui.examHistoryCard ? ui.examHistoryCard() : '',
      ui.backupCard ? ui.backupCard() : '',
      resetBtn, h('p', { class: 'ver' }, 'Version ' + LA.version));
  }

  // ---------- Willkommen (erster Start) ----------
  function welcome() {
    const input = h('input', { type: 'text', placeholder: 'Dein Vorname', maxlength: 24, autocomplete: 'given-name', 'aria-label': 'Dein Name' });
    const err = h('p', { class: 'formerr', role: 'alert' });
    const form = h('form', { class: 'welcome', onsubmit: e => {
      e.preventDefault();
      const v = input.value.trim();
      if (!v) { err.textContent = 'Wie soll ich dich nennen?'; input.focus(); return; }
      S.name = v; S.seeded = true; save(); go(home, 'learn');
    } }, h('img', { class: 'wlogo', src: 'icon.svg', alt: '', width: 96, height: 96 }), h('h1', null, 'Willkommen!'),
      h('p', { class: 'lead' }, 'Lernen mit Karteikarten, Spielen und Tagesaufgaben. Alle Fächer an einem Ort. Wie heißt du?'),
      h('label', { class: 'field' }, h('span', null, 'Name'), input), err, h('button', { class: 'cta', type: 'submit' }, "Los geht's"));
    view.append(form);
  }

  Object.assign(ui, { welcome, home, subject, wrong, deck, info, practice, profile });
  if (S.name) go(home, 'learn'); else go(welcome);
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (!reloaded) { reloaded = true; location.reload(); } });
    navigator.serviceWorker.register('sw.js').then(reg => {
      const offer = () => {
        if (!reg.waiting || document.getElementById('app-update')) return;
        const el = h('div', { id: 'app-update', class: 'update-notice', role: 'status' }, 'Neue Version verfügbar. ',
          h('button', { type: 'button', onclick: () => { if (!document.body.dataset.tab) { LA.toast('📚', 'Nach der Runde aktualisieren', 'Kehre zuerst zur Startseite zurück.'); return; } if (save()) reg.waiting?.postMessage({ type: 'ACTIVATE_UPDATE' }); } }, 'Speichern und aktualisieren'));
        document.body.append(el);
      };
      offer(); reg.addEventListener('updatefound', () => reg.installing?.addEventListener('statechange', offer));
      document.addEventListener('visibilitychange', () => { if (!document.hidden) reg.update().catch(() => {}); });
    }).catch(() => {});
  }
})();
