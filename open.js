// Lernapp, Teil 9: Offene Fragen mit Selbstbewertung. Du schreibst deine Antwort, vergleichst mit der Musterlösung und hakst die Punkte ab, die du hattest.
(() => {
  'use strict';
  const LA = window.LA;
  const { h, svg, S, save, go, tileIco, head, backBtn, view, SUBJECTS } = LA;
  const ui = LA.ui;
  const tasks = subj => (window.OPEN || []).filter(o => !subj || o.subject === subj);
  const rec = id => (S.open = S.open || {})[id];

  const row = (o, onclick) => {
    const r = rec(o.id);
    return h('button', { class: 'deck', type: 'button', onclick },
      tileIco('✍️'), h('span', { class: 'grow' }, o.title, h('small', null, r && r.max ? 'Zuletzt ' + r.pts + ' von ' + r.max + ' BE' : o.be + ' BE · noch nicht gelöst')), svg('chevron', 'chev'));
  };

  // Liste der Aufgaben eines Fachs
  function list(subj) {
    const sub = SUBJECTS.find(s => s.id === subj) || {}, ts = tasks(subj);
    view.append(h('div', { class: 'topline' }, backBtn(() => go(() => ui.subject(sub), 'learn'))),
      h('h1', { class: 'ttl' }, 'Offene Fragen'),
      h('p', { class: 'lead' }, 'Wie im Test: Schreibe deine Antwort in ein paar Sätzen, vergleiche dann mit der Musterlösung und hake ab, was du hattest.'),
      h('div', { class: 'list' }, ts.map(o => row(o, () => go(() => task(o))))));
  }

  // Eine Aufgabe: Antwort schreiben, Musterlösung zeigen, selbst bewerten
  function task(o, onDone) {
    const r = rec(o.id) || {}, ta = h('textarea', { rows: 7, placeholder: 'Deine Antwort in wenigen Sätzen ...', 'aria-label': 'Deine Antwort' });
    ta.value = r.draft || '';
    ta.addEventListener('input', () => { S.open = S.open || {}; S.open[o.id] = Object.assign(S.open[o.id] || {}, { draft: ta.value }); save(); });
    ta.addEventListener('blur', save);
    const after = h('div');
    const check = () => {
      save(); ta.readOnly = true;
      const boxes = o.punkte.map(p => h('input', { type: 'checkbox' }));
      const total = h('strong', null, '0 von ' + o.be + ' BE');
      boxes.forEach(b => b.addEventListener('change', () => { total.textContent = boxes.filter(x => x.checked).length + ' von ' + o.be + ' BE'; }));
      const done = h('button', { class: 'cta', type: 'button', onclick: () => {
        const pts = boxes.filter(x => x.checked).length;
        S.open[o.id] = { pts, max: o.be, date: Date.now(), draft: ta.value };
        LA.bump(); LA.addXp(pts * 3); save();
        if (pts === o.be && LA.confetti) LA.confetti();
        LA.toast && LA.toast(pts === o.be ? '🌟' : '✅', pts + ' von ' + o.be + ' BE', '+' + pts * 3 + ' XP');
        if (onDone) onDone(); else go(() => list(o.subject));
      } }, 'Fertig');
      after.replaceChildren(
        h('section', { class: 'card info' }, h('h3', null, 'Musterlösung'), h('p', null, o.muster)),
        h('section', { class: 'card info' }, h('h3', null, 'Was hattest du? Jeder Punkt ist 1 BE.'),
          h('div', { class: 'checks' }, o.punkte.map((p, k) => h('label', { class: 'chk' }, boxes[k], h('span', null, p)))), total),
        h('div', { class: 'dock plain' }, done));
    };
    view.append(h('div', { class: 'topline' }, backBtn(() => go(() => list(o.subject)))),
      h('h1', { class: 'ttl' }, o.title), h('p', { class: 'lead' }, o.be + ' BE'),
      h('section', { class: 'card info' }, h('p', null, o.q)),
      h('label', { class: 'field' }, h('span', null, 'Deine Antwort'), ta),
      h('button', { class: 'cta', type: 'button', style: 'margin-top:14px', onclick: e => { e.currentTarget.remove(); check(); } }, 'Musterlösung zeigen'), after);
  }

  // Zeile im Fach und im Üben-Tab
  LA.openRow = subj => {
    const ts = tasks(subj); if (!ts.length) return '';
    const sub = SUBJECTS.find(s => s.id === subj), done = ts.filter(o => rec(o.id) && rec(o.id).max).length;
    return h('button', { class: 'deck', type: 'button', onclick: () => go(() => list(subj), 'learn') },
      tileIco('✍️'), h('span', { class: 'grow' }, 'Offene Fragen', h('small', null, done + ' von ' + ts.length + ' geübt · wie im Test, mit Musterlösung')), svg('chevron', 'chev'));
  };
  LA.openTask = task;
  LA.openSubjects = () => SUBJECTS.filter(s => tasks(s.id).length);
})();
