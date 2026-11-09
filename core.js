// Lernapp, Teil 1: Daten, Fortschritt, Antworten prüfen. Keine Oberfläche.
// Die Oberfläche steht in ui.js, die Lernarten in play.js. Gemeinsamer Zugriff über window.LA.
(() => {
  'use strict';
  const LA = window.LA = { ui: {}, timer: null, version: 34 }; // gleiche Nummer wie in sw.js
  const DECKS = window.DECKS || [];
  const SUBJECTS = window.SUBJECTS || [];
  const view = document.getElementById('view');

  // ---------- Speicher ----------
  const fresh = () => ({ xp: 0, last: '', streak: 0, cards: {}, best: {}, opts: {}, recent: [], fixed: 0, layout: 'grid', theme: 'light', got: {}, stats: { rounds: 0, perfect: 0, early: 0, late: 0 }, day: null, week: null, maxStreak: 0, freeze: 0, mine: {}, open: {}, fs: 'normal' });
  const S = fresh();
  let loadFailure = false;
  try {
    const raw = localStorage.getItem('lernapp');
    if (raw) { const data = window.LASchema.state(JSON.parse(raw)); if (!data) throw new Error('Ungültiger Speicherstand'); Object.assign(S, data); }
  } catch (e) { loadFailure = true; }
  function storageNotice(message) {
    let el = document.getElementById('storage-warning');
    if (!el) { el = document.createElement('div'); el.id = 'storage-warning'; el.className = 'storage-warning'; el.setAttribute('role', 'alert'); document.body.prepend(el); }
    el.replaceChildren(document.createTextNode(message));
    const btn = document.createElement('button'); btn.type = 'button'; btn.textContent = 'Sicherung / Wiederherstellung';
    btn.onclick = () => LA.ui.profile && LA.go(LA.ui.profile, 'profile'); el.append(btn);
  }
  if (loadFailure) storageNotice('Dein gespeicherter Stand konnte nicht geladen werden. Er wird nicht überschrieben. Bitte eine Sicherung einlesen.');
  // Bestehende Nutzerin (vor der Namensfrage): Name Lana übernehmen. Neue Nutzer werden beim Start nach ihrem Namen gefragt.
  if (!S.name && (S.xp > 0 || S.last || (S.tests || []).length)) S.name = 'Lana';
  const applyTheme = () => { document.documentElement.dataset.theme = S.theme || 'light'; document.documentElement.dataset.fs = S.fs || 'normal'; };
  applyTheme();
  // Lernplan nach Datum: Tag als Zahl (lokale Zeit) und Abstände je Lernbox (Tage bis zur nächsten Wiederholung).
  const dnum = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5);
  const INTERVALS = [0, 1, 2, 4, 8];
  // "Sicher" heißt: Box 3 oder höher UND an mindestens 2 verschiedenen Tagen richtig beantwortet.
  const sure = s => !!s && s.box >= 3 && (s.nd || 0) >= 2;
  // Einmalig: Karten, die vorher schon als sicher galten, bleiben sicher.
  // Einmalig: Karten, die schon vor dem Lernplan geübt wurden, haben noch kein Datum. Sie werden über die nächsten Tage verteilt (höhere Box = später),
  // damit nicht alle auf einmal "fällig" sind.
  if (!S.srs2) {
    const spread = [[0, 1], [0, 2], [1, 4], [2, 7], [4, 12]]; let n = 0;
    for (const o of Object.values(S.cards || {})) for (const s of Object.values(o)) if (s && s.seen > 0 && s.due == null) { const [a, b] = spread[Math.min(4, s.box || 0)]; s.due = dnum() + a + (n++ * 7) % (b - a + 1); }
    S.srs2 = 1;
  }
  if (!S.srs) { for (const o of Object.values(S.cards || {})) for (const s of Object.values(o)) if (s && s.box >= 3 && s.nd == null) s.nd = 2; S.srs = 1; }
  const save = () => {
    if (loadFailure) return false;
    try { localStorage.setItem('lernapp', JSON.stringify(S)); document.getElementById('storage-warning')?.remove(); return true; }
    catch (e) { storageNotice('Nicht auf diesem Gerät gespeichert. Lass die App geöffnet und sichere deinen aktuellen Stand als Datei.'); return false; }
  };
  // Zurücksetzen löscht nur den Lernfortschritt. Darstellung, Testtermine und Notizen bleiben.
  const reset = () => { const keep = { name: S.name, theme: S.theme || 'light', tests: S.tests, notes: S.notes, seeded: S.seeded, mine: S.mine, topics: S.topics, hiddenSubjects: S.hiddenSubjects, hiddenDecks: S.hiddenDecks, minutes: S.minutes, fs: S.fs }; for (const k of Object.keys(S)) delete S[k]; Object.assign(S, fresh(), keep); save(); };

  // Stand aus einer Sicherung einsetzen (die Daten wurden vorher in backup.js geprüft).
  const restore = d => {
    const valid = window.LASchema.state(d); if (!valid) return false;
    const next = Object.assign(fresh(), valid);
    try { localStorage.setItem('lernapp', JSON.stringify(next)); }
    catch (e) { storageNotice('Die Sicherung passt nicht in den Gerätespeicher. Der bisherige Stand bleibt erhalten.'); return false; }
    for (const k of Object.keys(S)) delete S[k]; Object.assign(S, next); loadFailure = false;
    document.getElementById('storage-warning')?.remove(); return true;
  };

  // ---------- Helfer ----------
  function h(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    for (const k in attrs || {}) {
      const v = attrs[k];
      if (k === 'class') e.className = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) e.setAttribute(k, v === true ? '' : v);
    }
    for (const c of kids.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
    return e;
  }
  // Kleine Strich-Icons (24x24). Pfade sind feste Texte aus diesem Code.
  const ICONS = {
    search: 'M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15M16 16l5 5',
    close: 'M6 6l12 12M18 6L6 18', back: 'M15 5l-7 7 7 7', chevron: 'M9 5l7 7-7 7',
    home: 'M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z',
    target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
    user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20a8 8 0 0 1 16 0',
    grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z', list: 'M4 6h16M4 12h16M4 18h16',
    calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4', note: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h6',
    check: 'M5 12.5l4.5 4.5L19 7.5', book: 'M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM8 4v13'
  };
  const svg = (name, cls) => {
    const NS = 'http://www.w3.org/2000/svg';
    const s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('class', 'ico ' + (cls || ''));
    s.setAttribute('aria-hidden', 'true');
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', ICONS[name]); s.append(p);
    return s;
  };
  // Fortschrittsring als SVG. pct = 0 bis 100. Die Füllung läuft per CSS-Übergang ein.
  function ring(pct, o) {
    o = o || {};
    const NS = 'http://www.w3.org/2000/svg', size = o.size || 56, sw = o.stroke || 6, r = (size - sw) / 2, circ = 2 * Math.PI * r;
    const s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 ' + size + ' ' + size); s.setAttribute('class', 'ring');
    s.style.width = size + 'px'; s.style.height = size + 'px';
    const circle = cls => {
      const e = document.createElementNS(NS, 'circle');
      e.setAttribute('cx', size / 2); e.setAttribute('cy', size / 2); e.setAttribute('r', r);
      e.setAttribute('fill', 'none'); e.setAttribute('stroke-width', sw); e.setAttribute('class', cls); return e;
    };
    const bg = circle('ring-bg'), fg = circle('ring-fg');
    fg.setAttribute('stroke-linecap', 'round'); fg.setAttribute('stroke-dasharray', circ); fg.setAttribute('stroke-dashoffset', circ);
    fg.setAttribute('transform', 'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')');
    if (o.color) fg.style.stroke = o.color;
    s.append(bg, fg);
    requestAnimationFrame(() => requestAnimationFrame(() => fg.setAttribute('stroke-dashoffset', circ * (1 - Math.max(0, Math.min(100, pct)) / 100))));
    return s;
  }
  // Kleine Bausteine, die mehrere Seiten brauchen
  const bar = pct => h('div', { class: 'bar' }, h('i', { style: 'width:' + pct + '%' }));
  const backBtn = fn => h('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Zurück', onclick: fn }, svg('back'));
  const tileIco = (icon, cls) => h('span', { class: 'tile-ico ' + (cls || '') }, icon);
  const head = (title, right) => h('div', { class: 'sechead' }, h('h2', null, title), right || '');
  const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const dayStr = t => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const buzz = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) { /* egal */ } };

  // ---------- Stoff ----------
  // "Falsche Antworten" ist ein gefilterter Blick (d.filter) auf ein Stoffpaket (d.base).
  const base = d => d.base || d;
  const cardKey = r => {
    const m = r[r.length - 1];
    if (m && typeof m === 'object' && m.id) return m.id;
    // Content identity, independent of ordering. Changed answers intentionally require relearning.
    return 'c:' + JSON.stringify(r.filter(x => typeof x === 'string'));
  };
  const migrateCards = d => {
    const records = S.cards[d.id]; if (!records) return;
    const keys = (S.cardKeys || {})[d.id] || d.cards.map(cardKey);
    for (const k of Object.keys(records)) if (/^\d+$/.test(k) && keys[+k]) { if (!records[keys[+k]]) records[keys[+k]] = records[k]; delete records[k]; }
    S.cardKeys = S.cardKeys || {}; S.cardKeys[d.id] = d.cards.map(cardKey);
  };
  DECKS.forEach(migrateCards);
  const activeDecks = () => DECKS.filter(d => !(S.hiddenSubjects || []).includes(d.subject) && !(S.hiddenDecks || []).includes(d.id));
  const cardsOf = d => d.cards.map((r, i) => {
    // Letztes Feld kann ein Zusatz-Objekt sein: { w: [falsche Antworten], e: 'Erklärung' }
    const m = r.length > 2 && r[r.length - 1] && typeof r[r.length - 1] === 'object' ? r[r.length - 1] : null;
    return { i, key: cardKey(r), q: r[0], a: r.slice(1, m ? -1 : undefined), w: m ? m.w || null : null, e: m ? m.e : undefined, img: m ? m.img : undefined };
  }).filter(c => !d.filter || d.filter(c));
  const decksOf = sub => activeDecks().filter(d => d.subject === sub.id);
  const subjectOf = d => SUBJECTS.find(s => s.id === base(d).subject);
  const st = (d, c) => { const id = base(d).id, key = c.key || String(c.i); const records = S.cards[id] = S.cards[id] || {}; return records[key] = records[key] || { box: 0, seen: 0, right: 0 }; };
  const wrongDeck = (d, sub) => Object.assign({}, d, {
    base: d, filter: c => !!st(d, c).wrong, title: 'Falsche Antworten · ' + d.title,
    back: () => LA.go(() => LA.ui.wrong(sub), 'learn')
  });
  const wrongCount = sub => decksOf(sub).reduce((n, d) => n + cardsOf(wrongDeck(d, sub)).length, 0);
  const goBack = d => d.back ? d.back() : LA.go(() => LA.ui.subject(subjectOf(d)), 'learn');
  const opt = d => (S.opts[d.id] = S.opts[d.id] || { skip: d.defaultSkip != null ? d.defaultSkip : d.labels.length > 1 ? 1 : 0 });
  const prompt = (d, c) => opt(d).skip ? c.q + '  ·  ' + c.a.slice(0, opt(d).skip).join(' / ') : c.q;
  const ans = (d, c) => c.a.slice(opt(d).skip);
  const labels = (d, c) => c && c.a.length > 1 && (c.q.match(/___/g) || []).length === c.a.length
    ? c.a.map((_, k) => 'Lücke ' + (k + 1)).slice(opt(d).skip) : d.labels.slice(opt(d).skip);
  const ansText = (d, c) => ans(d, c).join(' – ');
  const mastered = d => cardsOf(base(d)).filter(c => sure(st(d, c))).length;
  const deckPct = d => { const n = base(d).cards.length; return n ? Math.round(mastered(d) / n * 100) : 0; };
  // Zahlen pro Fach: sicher gelernt, gesamt, schon geübt
  const subjectStats = sub => {
    let m = 0, t = 0, seen = 0;
    const ds = decksOf(sub);
    for (const d of ds) { t += d.cards.length; m += mastered(d); seen += cardsOf(d).filter(c => st(d, c).seen > 0).length; }
    return { m, t, seen, decks: ds.length, pct: t ? Math.round(m / t * 100) : 0 };
  };
  // Ränge: ab welchem Level welcher Titel gilt. Jedes Level braucht etwas mehr XP als das davor.
  const RANKS = [[1, 'Frischling'], [3, 'Lernfuchs'], [5, 'Wissensjägerin'], [8, 'Karteikarten-Profi'], [12, 'Denkerin'], [16, 'Expertin'], [20, 'Meisterin'], [25, 'Mastermind'], [30, 'Matura-Legende']];
  const needFor = l => 100 + 25 * (l - 1);
  const levelInfo = (xp = S.xp) => {
    let lvl = 1;
    while (xp >= needFor(lvl)) { xp -= needFor(lvl); lvl++; }
    return { lvl, into: xp, need: needFor(lvl), title: RANKS.filter(r => r[0] <= lvl).pop()[1] };
  };
  // Alle XP laufen hier durch, damit ein Levelaufstieg gemeldet wird.
  function addXp(n) {
    const before = levelInfo().lvl;
    S.xp += n;
    const now = levelInfo();
    if (now.lvl > before && LA.toast) LA.toast('🆙', 'Level ' + now.lvl + ' erreicht!', now.title);
  }

  // ---------- Fortschritt ----------
  // Abstand in Tagen zwischen dem letzten Lerntag und heute. Ein verpasster Tag (Abstand 2) wird vom Serien-Schutz aufgefangen.
  const gapDays = () => S.last ? Math.round((Date.parse(dayStr(Date.now())) - Date.parse(S.last)) / 864e5) : 99;
  const streakNow = () => { const g = gapDays(); return g <= 1 || (g === 2 && (S.freeze || 0) > 0) ? S.streak : 0; };
  function bump() {
    const t = dayStr(Date.now());
    if (S.last !== t) {
      const g = gapDays();
      if (g === 1) S.streak++;
      else if (g === 2 && (S.freeze || 0) > 0) { S.freeze--; S.streak++; if (LA.toast) LA.toast('🧊', 'Serien-Schutz benutzt', 'Dein gestern verpasster Tag zählt trotzdem.'); }
      else S.streak = 1;
      S.last = t;
      if (S.streak > 0 && S.streak % 7 === 0 && (S.freeze || 0) < 2) { S.freeze = (S.freeze || 0) + 1; if (LA.toast) LA.toast('🧊', 'Serien-Schutz verdient', 'Er rettet dir einen verpassten Tag.'); }
    }
    S.maxStreak = Math.max(S.maxStreak || 0, S.streak);
  }
  // soft = Raten ist möglich (Richtig/Falsch): richtig zählt nur halb und schiebt die Karte nicht weiter.
  function rate(d, c, ok, soft, method = 'recognition') {
    bump();
    const s = st(d, c), was = s.wrong;
    s.seen++;
    s.wrong = !ok;
    const today = dnum();
    if (ok) {
      s.right++;
      if (!soft) {
        if (s.lastAdvance !== today) { s.box = Math.min(4, s.box + 1); s.lastAdvance = today; }
        if (s.lastOk !== today) { s.lastOk = today; s.nd = (s.nd || 0) + 1; }
        s.due = today + INTERVALS[s.box];
        const kind = method === 'recall' ? 'recall' : 'recognition'; s[kind] = (s[kind] || 0) + 1;
      }
      addXp(soft ? 5 : 10); if (was) S.fixed = (S.fixed || 0) + 1;
    } else { s.box = Math.max(0, s.box - 1); s.due = today; s.lastAdvance = today; addXp(2); }
    save();
    if (LA.onRate) LA.onRate(d, c, ok, !!was);
  }
  const touch = d => { const id = base(d).id; S.recent = [id, ...(S.recent || []).filter(x => x !== id)].slice(0, 6); save(); };
  // Fällig: schon gesehen und der Wiederholungstag ist erreicht (eine falsche Antwort setzt ihn auf heute).
  const isDue = s => !!s && s.seen > 0 && (s.due || 0) <= dnum();
  // Schwache Karten kommen häufiger dran.
  function pick(d, n) {
    const pool = cardsOf(d).map(c => ({ c, w: 5 - st(d, c).box + (st(d, c).seen ? 0 : 1) + (isDue(st(d, c)) ? 2 : 0) }));
    const out = [];
    while (out.length < n && pool.length) {
      let r = Math.random() * pool.reduce((s, p) => s + p.w, 0), k = 0;
      for (; k < pool.length - 1; k++) { r -= pool[k].w; if (r <= 0) break; }
      out.push(pool.splice(k, 1)[0].c);
    }
    return out;
  }

  // ---------- Antworten prüfen ----------
  // Einstellungen des Stoffpakets, das gerade geübt wird (wird in play.js beim Start gesetzt):
  // looseAccents = Akzente beim Tippen egal (Spanisch), mathInput = "/" ist ein Bruchstrich, Komma = Punkt.
  const cfg = { looseAccents: false, mathInput: false };
  const splitVar = s => cfg.mathInput ? [s] : s.split('/');
  const norm = s => {
    let t = s.toLowerCase().trim().replace(/[‘’`´]/g, "'").replace(/\s+/g, ' ');
    if (cfg.looseAccents) t = t.replace(/[¿¡?!.,;:]/g, '').replace(/\s+/g, ' ').trim().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ñ/g, 'n');
    if (cfg.mathInput) t = t.replace(/\s+/g, '').replace(/,/g, '.').replace(/−/g, '-');
    return t;
  };
  const variants = s => splitVar(s).map(norm);
  const fieldOk = (input, solution) => variants(solution).includes(norm(input)) || norm(solution) === norm(input);

  // Passt ein Auswahltext zur richtigen Antwort? Erlaubt sind jede einzelne Variante und die ganze Schreibweise (z. B. "got/gotten").
  const matches = (d, c, t) => { const r = ans(d, c), p = t.split(' – '); return p.length === r.length && p.every((x, k) => variants(r[k]).includes(norm(x)) || norm(x) === norm(r[k])); };

  // Auswahl-Antworten: eine richtige und drei falsche.
  function options(d, c) {
    // shortOptions: In Multiple Choice nur die erste Schreibweise zeigen (z. B. bei "get on with/get along with")
    const short = !!base(d).shortOptions, show = x => short ? splitVar(x)[0] : x;
    const right = ans(d, c), correct = right.map(show).join(' – ');
    // Eigene Falsch-Antworten der Karte oder Antwort-Pool des Stoffpakets (z. B. Zeitformen)
    if (c.w) return shuffle([right.map(x => splitVar(x)[0]).join(' – '), ...c.w.slice(0, 3)]);
    const pool = base(d).pool;
    if (pool) return shuffle([correct, ...shuffle(pool.filter(p => !matches(d, c, p))).slice(0, 3)]);
    // Eine Falsch-Antwort darf nie auch richtig sein (z. B. "got – got" bei got/gotten).
    const isRight = t => t.split(' – ').every((p, k) => right[k] != null && variants(right[k]).includes(norm(p)));
    const wrong = [];
    if (right.length > 1) {
      const first = x => splitVar(x)[0];
      const cand = [
        right.map(() => first(right[0])),
        right.map((_, i) => first(right[Math.min(i + 1, right.length - 1)])),
        right.slice().reverse().map(first)
      ].map(x => x.join(' – '));
      shuffle(cand).forEach(t => { if (!isRight(t) && !wrong.includes(t) && wrong.length < 2) wrong.push(t); });
    }
    for (const o of shuffle(cardsOf(base(d)))) {
      const t = ans(d, o).map(show).join(' – ');
      if (wrong.length >= 3) break;
      if (o.i !== c.i && !isRight(t) && !wrong.includes(t)) wrong.push(t);
    }
    return shuffle([correct, ...wrong]);
  }

  // ---------- Beispielsätze und Erklärungen ----------
  // Beispielsatz mit ___ aus decks/sentences.js (window.SENT), gesucht ist die erste Antwort der Karte.
  const sentence = (d, c) => ((window.SENT || {})[base(d).id] || {})[c.a[0]] || null;
  const filled = (d, c) => { const s = sentence(d, c); return s ? s.replace('___', splitVar(c.a[0])[0]) : null; };
  // Erklärung zu einer Karte. Gibt es nichts Passendes, bleibt die Liste leer.
  function explainLines(d, c) {
    const b = base(d), out = [], ex = (window.EXPL || {})[b.id] || {}, own = ex[c.q] || ex[c.a[0]] || c.e;   // erst nach Frage, dann nach Antwort suchen
    if (own) out.push(own);
    const tense = !own && DECKS.find(x => x.title === c.a[0] && x.info && x.info.kurz);   // "Zeitform erkennen": Antwort ist der Name einer Zeitform
    if (tense) out.push(tense.info.kurz + (tense.info.signals ? ' Signalwörter: ' + tense.info.signals : ''));
    const f = filled(d, c); if (f) out.push('Beispiel: ' + f);
    if (!own && c.q.includes('___')) {   // Jede Lücke erhält ihre eigene Antwort, Varianten bleiben pro Feld.
      const tag = (c.q.match(/\[([^\]]+)\]\s*$/) || [])[1];
      const q = c.q.replace(/\s*\[[^\]]+\]\s*$/, '').replace(/___\s*\([^)]*\)/g, '___');
      let slot = 0;
      out.push('Ganzer Satz: ' + q.replace(/___/g, () => splitVar(c.a[slot++] || '___')[0]));
      const rule = (tag && DECKS.find(x => x.title === tag && x.info && x.info.kurz)) || (b.info && b.info.kurz ? b : null);
      if (rule) out.push('Regel: ' + rule.info.kurz + (rule.info.tip ? ' Merke: ' + rule.info.tip : ''));
    }
    if (!own && c.a.length === 3 && (b.labels || []).includes('Past Participle')) out.push(verbPattern(c.a));
    if (!out.length && b.info && b.info.tip) out.push('Merke: ' + b.info.tip);
    return out;
  }
  // Muster der unregelmäßigen Verben (Infinitive, Past Simple, Past Participle)
  function verbPattern(a) {
    const f = x => x.split('/')[0], i = f(a[0]), p = f(a[1]), n = f(a[2]);
    const both = /\//.test(a[1] + a[2]) ? ' Beide Schreibweisen (britisch und amerikanisch) sind richtig.' : '';
    if (i === p && p === n) return 'Alle drei Formen sind gleich (' + i + '). Du musst dir nur eine Form merken.' + both;
    if (i === n) return 'Infinitive und Past Participle sind gleich (' + i + ' – ' + p + ' – ' + n + '). Nur das Past Simple ist anders.' + both;
    if (p === n && /(ought|aught)$/.test(p)) return 'Gruppe -ought / -aught: Past Simple und Past Participle sind gleich (' + p + '), egal wie der Infinitiv aussieht.' + both;
    if (p === n) return 'Past Simple und Past Participle sind gleich (' + p + '). Du musst dir nur zwei Formen merken: ' + i + ' und ' + p + '.' + both;
    const m = i.match(/^(.*?)i([^aeiou]*)$/);
    if (m && p === m[1] + 'a' + m[2] && n === m[1] + 'u' + m[2]) return 'Muster i – a – u: ' + i + ' – ' + p + ' – ' + n + ' (wie sing – sang – sung, drink – drank – drunk).' + both;
    if (/ew$/.test(p) && /wn$/.test(n)) return 'Muster -ew / -wn: ' + i + ' – ' + p + ' – ' + n + ' (wie know – knew – known, grow – grew – grown).' + both;
    if (n === p + 'n' || n === p + 'en') return 'Das Past Participle ist das Past Simple plus -n bzw. -en (' + p + ' → ' + n + ').' + both;
    return 'Diese drei Formen sind unregelmäßig und müssen gelernt werden (' + i + ' – ' + p + ' – ' + n + ').' + both;
  }

  // ---------- Navigation ----------
  // tab: 'learn' | 'plan' | 'practice' | 'notes' | 'profile' zeigt die Tab-Leiste, ohne tab ist sie versteckt (Lernen läuft).
  function go(fn, tab) {
    clearInterval(LA.timer);
    LA.sessionExit = null;
    view.replaceChildren();
    document.body.dataset.tab = tab || '';
    fn();
    if (LA.ui.markTab) LA.ui.markTab(tab);
    window.scrollTo(0, 0);
  }

  // Vorlesen mit der Sprachausgabe des Geräts (nur für Englisch und Spanisch).
  const speakLang = d => { const b = base(d); if (b.speak) return b.speak; if (b.subject === 'spanisch') return 'es-ES'; if (b.subject === 'englisch' && /^(en-unit|en-family|en-relationship|irregular|en-sa-peer)/.test(b.id)) return 'en-GB'; return null; };
  const speak = (text, lang) => { try { const u = new SpeechSynthesisUtterance(text); u.lang = lang; u.rate = .9; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) { /* kein Vorlesen möglich */ } };
  Object.assign(LA, { dayStr, cardKey, migrateCards, activeDecks, storageNotice, dnum, sure, isDue, speak, speakLang, INTERVALS, sentence, filled, explainLines, restore, RANKS, addXp, bar, backBtn, tileIco, head, newId, DECKS, SUBJECTS, S, save, reset, applyTheme, h, svg, ring, shuffle, buzz, base, cardsOf, decksOf, subjectOf, st, wrongDeck, wrongCount,
    goBack, opt, prompt, ans, labels, ansText, mastered, deckPct, subjectStats, levelInfo, streakNow, bump, rate, touch, pick, cfg,
    splitVar, norm, variants, fieldOk, matches, options, view, go });
})();
