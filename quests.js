// Lernapp, Teil 6: Spielerisches. Tagesaufgaben, Wochenziele, Abzeichen mit XP-Belohnung, Ränge, Meldungen.
(() => {
  'use strict';
  const LA = window.LA;
  const { h, svg, S, save, go, bar, backBtn, tileIco, head, DECKS, SUBJECTS, deckPct, subjectStats, levelInfo, streakNow, addXp, base } = LA;
  const ui = LA.ui;

  // ---------- Meldungen (oben eingeblendet) ----------
  const box = h('div', { id: 'toast', role: 'status', 'aria-live': 'polite' });
  document.body.append(box);
  const queue = []; let busy = false;
  function pump() {
    if (busy || !queue.length) return;
    busy = true;
    const [ico, title, sub] = queue.shift();
    const el = h('div', { class: 'toastc' }, h('span', { class: 'tico' }, ico), h('span', { class: 'grow' }, h('strong', null, title), sub ? h('small', null, sub) : ''));
    box.replaceChildren(el); LA.buzz(30);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => { el.remove(); busy = false; pump(); }, 300); }, 2600);
  }
  LA.toast = (ico, title, sub) => { queue.push([ico, title, sub]); pump(); };

  // ---------- Zähler für heute und diese Woche ----------
  const ld = t => { const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const monday = () => { const d = new Date(); d.setDate(d.getDate() - (d.getDay() + 6) % 7); return ld(d); };
  function day() {
    const k = ld(Date.now());
    if (!S.day || S.day.d !== k) S.day = { d: k, ans: 0, right: 0, rounds: 0, perfect: 0, fixed: 0, modes: {}, subj: [], claimed: {}, bonus: false };
    return S.day;
  }
  function week() {
    const k = monday();
    if (!S.week || S.week.w !== k) S.week = { w: k, days: [], right: 0, rounds: 0, subj: [], claimed: {} };
    return S.week;
  }
  const stats = () => (S.stats = S.stats || { rounds: 0, perfect: 0, early: 0, late: 0 });
  const add = (arr, v) => { if (!arr.includes(v)) arr.push(v); };

  LA.onRate = (d, c, ok, wasWrong) => {
    const D = day(), W = week(), sj = base(d).subject, hr = new Date().getHours();
    D.ans++; if (ok) { D.right++; W.right++; if (wasWrong) D.fixed++; }
    add(D.subj, sj); add(W.subj, sj); add(W.days, D.d);
    if (hr < 8) stats().early++; if (hr >= 22) stats().late++;
    save(); LA.checkAwards();
  };
  LA.onRound = (key, right, total, d) => {
    const D = day(), W = week(), perfect = key !== 'timed' && key !== 'pairs' && total >= 5 && right === total;
    D.rounds++; W.rounds++; D.modes[key] = true; stats().rounds++;
    if (perfect) { D.perfect++; stats().perfect++; }
    addXp(5 + (perfect ? 20 : 0)); save(); LA.checkAwards();
  };

  // ---------- Tagesaufgaben ----------
  const QUESTS = [
    { id: 'a15', g: 'vol', ico: '🃏', t: '15 Karten beantworten', goal: 15, xp: 20, v: D => D.ans },
    { id: 'a30', g: 'vol', ico: '📚', t: '30 Karten beantworten', goal: 30, xp: 40, v: D => D.ans },
    { id: 'r20', g: 'vol', ico: '✅', t: '20 richtige Antworten', goal: 20, xp: 35, v: D => D.right },
    { id: 'rd2', g: 'rd', ico: '🔁', t: '2 Runden abschließen', goal: 2, xp: 25, v: D => D.rounds },
    { id: 'tm', g: 'mode', ico: '⏱️', t: 'Das Zeitspiel spielen', goal: 1, xp: 25, v: D => D.modes.timed ? 1 : 0 },
    { id: 'pr', g: 'mode', ico: '🧩', t: 'Paare finden spielen', goal: 1, xp: 20, v: D => D.modes.pairs ? 1 : 0 },
    { id: 'ty', g: 'mode', ico: '⌨️', t: 'Eine Runde "Selber schreiben"', goal: 1, xp: 30, v: D => D.modes.type ? 1 : 0 },
    { id: 'mc', g: 'mode', ico: '🎯', t: 'Eine Runde Multiple Choice', goal: 1, xp: 20, v: D => D.modes.mc ? 1 : 0 },
    { id: 'fl', g: 'mode', ico: '🗂️', t: 'Eine Runde Karteikarten', goal: 1, xp: 20, v: D => D.modes.flash ? 1 : 0 },
    { id: 'pf', g: 'pf', ico: '💯', t: 'Eine Runde ohne Fehler', goal: 1, xp: 40, v: D => D.perfect },
    { id: 'fx', g: 'fx', ico: '🩹', t: '5 falsche Antworten ausbessern', goal: 5, xp: 40, v: D => D.fixed },
    { id: 'sb', g: 'sb', ico: '🌍', t: '2 verschiedene Fächer üben', goal: 2, xp: 30, v: D => D.subj.length }
  ];
  const daily = () => {
    let seed = +ld(Date.now()).replace(/-/g, '') || 1;
    const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
    const pool = QUESTS.slice(), out = [], groups = new Set();
    while (pool.length && out.length < 3) {
      const q = pool.splice(rnd() * pool.length | 0, 1)[0];
      if (!groups.has(q.g)) { groups.add(q.g); out.push(q); }
    }
    return out;
  };
  const WEEKLY = [
    { id: 'wd', ico: '📅', t: 'An 5 Tagen lernen', goal: 5, xp: 100, v: W => W.days.length },
    { id: 'wr', ico: '🏹', t: '200 richtige Antworten', goal: 200, xp: 120, v: W => W.right },
    { id: 'wrd', ico: '🔁', t: '12 Runden abschließen', goal: 12, xp: 80, v: W => W.rounds },
    { id: 'ws', ico: '🌍', t: '3 verschiedene Fächer üben', goal: 3, xp: 100, v: W => W.subj.length }
  ];
  const BONUS = 30;

  // ---------- Abzeichen ----------
  const tot = () => {
    let seen = 0, right = 0, ok = 0;
    for (const o of Object.values(S.cards || {})) for (const c of Object.values(o)) { seen += c.seen; right += c.right; if (LA.sure(c)) ok++; }
    return { seen, right, ok };
  };
  const deckById = id => DECKS.find(d => d.id === id);
  const full = () => DECKS.filter(d => d.cards.length && deckPct(d) === 100).length;
  const best = () => Math.max(0, ...Object.values(S.best || {}));
  const streak = () => Math.max(S.maxStreak || 0, streakNow());
  const testsReady = () => (S.tests || []).filter(t => { const ds = (t.decks || []).map(deckById).filter(Boolean), n = ds.reduce((a, d) => a + d.cards.length, 0); return n && ds.reduce((a, d) => a + LA.mastered(d), 0) / n >= .8; }).length;
  const verbs = () => { const d = deckById('irregular-verbs'); return d ? deckPct(d) : 0; };
  const ACH = [
    // [id, Symbol, Name, Beschreibung, Wert, Ziel, XP, Gruppe]
    ['first', '🌱', 'Erster Schritt', 'Beantworte deine erste Karte', () => tot().seen, 1, 10, 'Karten'],
    ['seen100', '📇', 'Fleißbiene', '100 Karten beantworten', () => tot().seen, 100, 30, 'Karten'],
    ['seen500', '🐝', 'Karten-Fan', '500 Karten beantworten', () => tot().seen, 500, 60, 'Karten'],
    ['seen1500', '🚀', 'Karten-Rakete', '1.500 Karten beantworten', () => tot().seen, 1500, 150, 'Karten'],
    ['right250', '🎯', 'Treffsicher', '250 richtige Antworten', () => tot().right, 250, 50, 'Karten'],
    ['ok10', '🧠', 'Es sitzt', '10 Karten sicher gelernt', () => tot().ok, 10, 20, 'Karten'],
    ['ok25', '🧠', 'Karten-Meisterin', '25 Karten sicher gelernt', () => tot().ok, 25, 30, 'Karten'],
    ['ok100', '🎓', 'Wissensdurst', '100 Karten sicher gelernt', () => tot().ok, 100, 80, 'Karten'],
    ['ok300', '🏛️', 'Wandelndes Lexikon', '300 Karten sicher gelernt', () => tot().ok, 300, 200, 'Karten'],
    ['st3', '🔥', 'Dranbleiberin', '3 Tage in Folge lernen', streak, 3, 20, 'Serie'],
    ['st7', '🏅', 'Wochenprofi', '7 Tage in Folge lernen', streak, 7, 60, 'Serie'],
    ['st14', '🥈', 'Zwei Wochen am Stück', '14 Tage in Folge lernen', streak, 14, 120, 'Serie'],
    ['st30', '🥇', 'Eisern', '30 Tage in Folge lernen', streak, 30, 300, 'Serie'],
    ['early', '🌅', 'Frühaufsteherin', '10 Antworten vor 8 Uhr', () => stats().early, 10, 30, 'Serie'],
    ['late', '🦉', 'Nachteule', '10 Antworten nach 22 Uhr', () => stats().late, 10, 30, 'Serie'],
    ['xp500', '💎', 'Power-Lernerin', '500 XP sammeln', () => S.xp, 500, 30, 'Level'],
    ['xp2000', '🔷', 'XP-Magnet', '2.000 XP sammeln', () => S.xp, 2000, 80, 'Level'],
    ['xp5000', '👑', 'XP-Königin', '5.000 XP sammeln', () => S.xp, 5000, 200, 'Level'],
    ['lv5', '⭐', 'Level 5', 'Erreiche Level 5', () => levelInfo().lvl, 5, 40, 'Level'],
    ['lv10', '🌟', 'Level 10', 'Erreiche Level 10', () => levelInfo().lvl, 10, 100, 'Level'],
    ['lv20', '💫', 'Level 20', 'Erreiche Level 20', () => levelInfo().lvl, 20, 250, 'Level'],
    ['rd10', '🔁', 'Dabei', '10 Runden abschließen', () => stats().rounds, 10, 30, 'Spiele'],
    ['rd50', '🎮', 'Dauerläuferin', '50 Runden abschließen', () => stats().rounds, 50, 100, 'Spiele'],
    ['rd150', '🕹️', 'Spielprofi', '150 Runden abschließen', () => stats().rounds, 150, 250, 'Spiele'],
    ['pf1', '💯', 'Fehlerlos', 'Eine Runde ohne Fehler (ab 5 Karten)', () => stats().perfect, 1, 20, 'Spiele'],
    ['pf10', '🏆', 'Perfektionistin', '10 Runden ohne Fehler', () => stats().perfect, 10, 120, 'Spiele'],
    ['tm10', '⚡', 'Rekordjägerin', '10 Punkte im Zeitspiel', best, 10, 20, 'Spiele'],
    ['tm20', '🔥', 'Blitzhirn', '20 Punkte im Zeitspiel', best, 20, 60, 'Spiele'],
    ['tm30', '🌪️', 'Tempo-Königin', '30 Punkte im Zeitspiel', best, 30, 120, 'Spiele'],
    ['fix10', '🩹', 'Fehlerjägerin', '10 Fehler ausgebessert', () => S.fixed || 0, 10, 30, 'Fehler'],
    ['fix50', '🛠️', 'Fehler-Flüsterin', '50 Fehler ausgebessert', () => S.fixed || 0, 50, 100, 'Fehler'],
    ['deck1', '✅', 'Thema geschafft', 'Ein Thema zu 100 % sicher', full, 1, 50, 'Themen'],
    ['deck5', '🎖️', 'Fünf Themen', 'Fünf Themen zu 100 % sicher', full, 5, 150, 'Themen'],
    ['deck12', '🏰', 'Themen-Sammlerin', 'Zwölf Themen zu 100 % sicher', full, 12, 300, 'Themen'],
    ['subj7', '🌍', 'Allrounderin', 'In allen Fächern geübt', () => SUBJECTS.filter(s => subjectStats(s).seen > 0).length, SUBJECTS.length, 100, 'Themen'],
    ['verb50', '🔤', 'Verben-Profi', 'Irregular Verbs zu 50 % sicher', verbs, 50, 60, 'Themen'],
    ['verb100', '📜', 'Verben-Meisterin', 'Irregular Verbs zu 100 % sicher', verbs, 100, 150, 'Themen'],
    ['note1', '📝', 'Notizzettel', 'Schreibe deine erste Notiz', () => (S.notes || []).length, 1, 15, 'Organisation'],
    ['note5', '🗒️', 'Zettelwirtschaft', 'Schreibe fünf Notizen', () => (S.notes || []).length, 5, 40, 'Organisation'],
    ['test1', '📅', 'Gut geplant', 'Trage einen Test mit Themen ein', () => (S.tests || []).filter(t => !t.seed && (t.decks || []).length).length, 1, 20, 'Organisation'],
    ['ready', '🎯', 'Bereit für den Test', 'Ein Test zu 80 % bereit', testsReady, 1, 80, 'Organisation']
  ];
  S.got = S.got || {};
  LA.checkAwards = () => {
    for (let pass = 0; pass < 4; pass++) {
      let any = false;
      for (const [id, ico, name, , val, goal, xp] of ACH) {
        if (!S.got[id] && val() >= goal) { S.got[id] = Date.now(); addXp(xp); LA.toast(ico, 'Neues Abzeichen: ' + name, '+' + xp + ' XP'); any = true; }
      }
      if (!any) break;
    }
    save();
  };

  // ---------- Startseite: Tagesaufgaben-Kachel ----------
  ui.questCard = () => {
    const D = day(), qs = daily(), done = qs.filter(q => q.v(D) >= q.goal).length, open = qs.filter(q => D.claimed[q.id]).length;
    return h('button', { class: 'questcard', type: 'button', onclick: () => go(() => ui.awards('learn'), 'learn') },
      h('span', { class: 'qc-ico' }, '🎯'),
      h('span', { class: 'grow' }, h('strong', null, 'Tagesaufgaben'), h('small', null, done === 3 ? (open === 3 ? 'Alles erledigt. Bis morgen!' : 'Fertig! XP abholen') : done + ' von 3 geschafft · bis zu ' + qs.reduce((a, q) => a + q.xp, 0) + ' XP'),
        h('span', { class: 'dots' }, qs.map(q => h('i', { class: q.v(D) >= q.goal ? 'on' : '' })))),
      svg('chevron', 'chev'));
  };

  // ---------- Erfolge-Seite ----------
  function awards(from) {
    from = from || 'profile';
    LA.checkAwards();
    const wrap = h('div');
    const draw = () => {
      const D = day(), W = week(), lv = levelInfo(), qs = daily();
      const claim = (store, q, v) => {
        if (store.claimed[q.id] || v < q.goal) return;
        store.claimed[q.id] = true; addXp(q.xp); LA.toast('🎁', '+' + q.xp + ' XP eingelöst', q.t); LA.checkAwards(); save(); draw();
      };
      const row = (store, q, v) => {
        const done = v >= q.goal, got = !!store.claimed[q.id];
        return h('div', { class: 'quest' + (got ? ' got' : done ? ' ready' : '') },
          h('span', { class: 'qico' }, got ? '✅' : q.ico),
          h('span', { class: 'grow' }, h('strong', null, q.t), bar(Math.min(100, Math.round(v / q.goal * 100))), h('small', null, Math.min(v, q.goal) + ' / ' + q.goal)),
          got ? h('span', { class: 'xpchip dim' }, '+' + q.xp) : done ? h('button', { class: 'claim', type: 'button', onclick: () => claim(store, q, v) }, '+' + q.xp + ' XP') : h('span', { class: 'xpchip' }, '+' + q.xp));
      };
      const allClaimed = qs.every(q => D.claimed[q.id]);
      const nextRank = LA.RANKS.find(r => r[0] > lv.lvl);
      const bonus = h('div', { class: 'quest bonus' + (D.bonus ? ' got' : allClaimed ? ' ready' : '') },
        h('span', { class: 'qico' }, D.bonus ? '✅' : '🎁'), h('span', { class: 'grow' }, h('strong', null, 'Tagesbonus'), h('small', null, 'Alle drei Tagesaufgaben einlösen')),
        D.bonus ? h('span', { class: 'xpchip dim' }, '+' + BONUS) : allClaimed ? h('button', { class: 'claim', type: 'button', onclick: () => { D.bonus = true; addXp(BONUS); LA.toast('🎁', 'Tagesbonus +' + BONUS + ' XP', 'Stark, drei von drei!'); LA.checkAwards(); save(); draw(); } }, '+' + BONUS + ' XP') : h('span', { class: 'xpchip' }, '+' + BONUS));
      const groups = [...new Set(ACH.map(a => a[7]))];
      const gotN = ACH.filter(a => S.got[a[0]]).length;
      wrap.replaceChildren(
        h('section', { class: 'card lvlcard' },
          h('div', { class: 'ringwrap sm' }, LA.ring(Math.round(lv.into / lv.need * 100), { size: 104, stroke: 10 }), h('div', { class: 'ringtxt' }, lv.lvl)),
          h('div', { class: 'grow' }, h('strong', null, 'Level ' + lv.lvl + ' · ' + lv.title), h('small', null, (lv.need - lv.into) + ' XP bis Level ' + (lv.lvl + 1)),
            h('small', null, nextRank ? 'Nächster Rang: ' + nextRank[1] + ' (Level ' + nextRank[0] + ')' : 'Höchster Rang erreicht'))),
        h('div', { class: 'ranks' }, LA.RANKS.map(r => h('span', { class: 'rank' + (lv.lvl >= r[0] ? ' on' : '') }, r[1], h('small', null, 'ab Level ' + r[0])))),
        head('Tagesaufgaben', h('span', { class: 'chip' }, 'heute')), h('div', { class: 'quests' }, qs.map(q => row(D, q, q.v(D))), bonus),
        head('Wochenziele', h('span', { class: 'chip' }, 'diese Woche')), h('div', { class: 'quests' }, WEEKLY.map(q => row(W, q, q.v(W)))),
        head('Abzeichen', h('span', { class: 'chip' }, gotN + ' von ' + ACH.length)),
        ...groups.map(g => h('section', { class: 'agroup' }, h('h3', { class: 'grp' }, g),
          h('div', { class: 'badges' }, ACH.filter(a => a[7] === g).map(([id, ico, name, desc, val, goal, xp]) => {
            const got = !!S.got[id], v = Math.min(val(), goal);
            return h('div', { class: 'badgec' + (got ? ' got' : '') }, h('span', { class: 'bico' }, got ? ico : '🔒'), h('strong', null, name), h('small', null, desc),
              bar(Math.min(100, Math.round(v / goal * 100))), h('em', null, got ? 'Erreicht · +' + xp + ' XP' : v + ' / ' + goal + ' · +' + xp + ' XP'));
          })))));
    };
    LA.view.append(h('div', { class: 'topline' }, backBtn(() => go(() => from === 'learn' ? ui.home() : ui.profile(), from))), h('h1', { class: 'ttl' }, 'Erfolge'),
      h('p', { class: 'lead' }, 'Löse Aufgaben ein, sammle XP und steig im Rang auf.'), wrap);
    draw();
  }

  ui.awards = awards;
  LA.checkAwards();
})();
