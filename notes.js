// Lernapp, Teil 5: Notizen. Eigene Zettel pro Fach, werden beim Tippen automatisch gespeichert.
(() => {
  'use strict';
  const LA = window.LA;
  const { h, svg, S, save, go, backBtn, newId, SUBJECTS } = LA;
  const ui = LA.ui;
  const notes = () => (S.notes = S.notes || []);
  const subjOf = id => SUBJECTS.find(s => s.id === id);
  const stamp = t => { const d = new Date(t); return d.getDate() + '.' + (d.getMonth() + 1) + '.'; };

  // Liste. filter = Fach-Id oder leer für alle.
  function list(filter) {
    const all = notes().slice().sort((a, b) => b.t - a.t), shown = filter ? all.filter(n => n.subj === filter) : all;
    const used = SUBJECTS.filter(s => all.some(n => n.subj === s.id));
    const chip = (id, label) => h('button', { type: 'button', class: 'chipb' + ((filter || '') === id ? ' on' : ''), onclick: () => go(() => list(id), 'notes') }, label);
    const card = n => {
      const s = subjOf(n.subj);
      return h('button', { class: 'notecard', type: 'button', style: '--c:' + (s ? s.color : 'var(--pri)'), onclick: () => go(() => edit(n, filter), 'notes') },
        h('strong', null, n.title || 'Ohne Titel'), n.text ? h('span', { class: 'snip' }, n.text) : '',
        h('small', null, (s ? s.title + ' · ' : '') + stamp(n.t)));
    };
    LA.view.append(
      h('div', { class: 'topline' }, backBtn(() => go(() => ui.home(), 'learn'))),
      h('h1', { class: 'ttl' }, 'Notizen'), h('p', { class: 'lead' }, 'Eigene Zettel zu jedem Fach. Alles wird automatisch gespeichert.'),
      used.length > 1 || filter ? h('div', { class: 'chips scroll' }, chip('', 'Alle'), ...used.map(s => chip(s.id, s.icon + ' ' + s.title))) : '',
      shown.length ? h('div', { class: 'notes' }, shown.map(card)) : h('p', { class: 'empty' }, filter ? 'Noch keine Notiz in diesem Fach.' : 'Noch keine Notizen. Schreib dir auf, was du dir merken willst.'),
      h('button', { class: 'fab', type: 'button', onclick: () => go(() => edit(null, filter)) }, '+ Neue Notiz'));
  }

  // Einzelne Notiz. Eine neue Notiz wird erst gespeichert, wenn etwas drinsteht.
  function edit(old, filter) {
    const n = old || { id: newId(), subj: filter || '', title: '', text: '', t: Date.now() };
    const store = () => {
      if (!notes().includes(n) && (n.title.trim() || n.text.trim())) notes().push(n);
      n.t = Date.now(); save();
    };
    const title = h('input', { type: 'text', placeholder: 'Titel', value: n.title, maxlength: 80, oninput: e => { n.title = e.target.value; store(); } });
    const text = h('textarea', { rows: 12, placeholder: 'Deine Notiz …', oninput: e => { n.text = e.target.value; store(); } });
    text.value = n.text;
    const chips = h('div', { class: 'chips scroll' });
    const draw = () => chips.replaceChildren(...[{ id: '', title: 'Allgemein', icon: '📌' }, ...SUBJECTS].map(s => h('button', { type: 'button', class: 'chipb' + (n.subj === s.id ? ' on' : ''),
      style: s.color ? '--c:' + s.color : '', onclick: () => { n.subj = s.id; store(); draw(); } }, s.icon + ' ' + s.title)));
    draw();
    let sure = false;
    const del = h('button', { class: 'linkbtn', type: 'button', onclick: () => {
      if (!sure) { sure = true; del.textContent = 'Wirklich löschen? Nochmal tippen'; del.classList.add('danger'); return; }
      S.notes = notes().filter(x => x !== n); save(); go(() => list(filter), 'notes');
    } }, 'Notiz löschen');
    LA.view.append(
      h('div', { class: 'topline' }, backBtn(() => go(() => list(filter), 'notes'))),
      h('div', { class: 'fields' }, h('label', { class: 'field' }, h('span', null, 'Titel'), title), h('div', { class: 'field' }, h('span', null, 'Fach'), chips),
        h('label', { class: 'field' }, h('span', null, 'Text'), text)),
      old ? del : '');
  }

  ui.notes = list;
})();
