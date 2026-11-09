// auto_generated: false
// Local course selection, search and portable topic packages. No server required.
(() => {
  'use strict';
  const L = window.LA, { h, S, go, view, ui, DECKS, SUBJECTS, backBtn } = L;
  const visible = s => !(S.hiddenSubjects || []).includes(s.id);
  const btn = (text, fn) => h('button', { type: 'button', class: 'cta ghost', onclick: fn }, text);
  function selection() {
    view.append(backBtn(() => go(ui.home, 'learn')), h('h1', null, 'Mein Lernstoff'), h('p', { class: 'lead' }, 'Wähle Fächer und Themen. Ausblenden erhält deinen Fortschritt und deine Termine.'));
    for (const s of SUBJECTS) {
      const section = h('section', { class: 'card' });
      const choose = (key, id, title) => h('label', { class: 'chk' }, h('input', { type: 'checkbox', checked: !(S[key] || []).includes(id), onchange: e => {
        S[key] = (S[key] || []).filter(x => x !== id); if (!e.target.checked) S[key].push(id); L.save();
      } }), h('span', null, title));
      section.append(choose('hiddenSubjects', s.id, s.icon + ' ' + s.title));
      section.append(h('details', null, h('summary', null, 'Themen auswählen'), ...DECKS.filter(d => d.subject === s.id).map(d => choose('hiddenDecks', d.id, d.title))));
      view.append(section);
    }
    const file = h('input', { type: 'file', accept: '.json,application/json', hidden: true });
    const msg = h('p', { role: 'status' }), preview = h('div');
    file.onchange = async () => {
      const f = file.files[0]; if (!f) return;
      try {
        if (f.size > 20e6) throw new Error('Das Paket ist größer als 20 MB.');
        const p = JSON.parse(await f.text());
        if (p.app !== 'lernapp-topic' || p.version !== 1 || !window.LASchema.safe(p) || !window.LASchema.topic(p.topic) || !SUBJECTS.some(s => s.id === p.topic.subject)) throw new Error('Kein gültiges Themenpaket.');
        const t = p.topic;
        preview.replaceChildren(h('p', null, t.title + ' · ' + t.cards.length + ' Karten. Wird als neues eigenes Thema hinzugefügt.'), btn('Thema hinzufügen', () => {
          const imported = JSON.parse(JSON.stringify({ id: t.id, title: t.title, subject: t.subject, cards: t.cards, ...(t.reading ? { reading: t.reading } : {}) })); imported.id = 'own-' + L.newId();
          imported.cards = imported.cards.map(r => { const meta = typeof r[r.length - 1] === 'object' ? r.pop() : {}; return [...r, { ...meta, id: L.newId() }]; });
          S.topics = S.topics || []; S.topics.push(imported); L.syncTopics();
          msg.textContent = L.save() ? 'Thema hinzugefügt.' : 'Thema nur in dieser Sitzung verfügbar. Bitte sichern.'; preview.replaceChildren();
        }));
      } catch (e) { msg.textContent = e.message; preview.replaceChildren(); }
      file.value = '';
    };
    view.append(h('section', { class: 'card' }, h('h2', null, 'Themenpaket einlesen'), h('p', null, 'Karten und Lesetext teilen, ohne persönliche Lernstände weiterzugeben.'), btn('Datei auswählen', () => file.click()), file, msg, preview));
  }
  function search() {
    const results = h('div', { class: 'list' }), input = h('input', { type: 'search', placeholder: 'Thema, Begriff oder Antwort', 'aria-label': 'Lernstoff durchsuchen' });
    const draw = () => {
      const q = input.value.trim().toLocaleLowerCase('de');
      if (!q) { results.replaceChildren(h('p', null, 'Suche in deinen ausgewählten Fächern, Karten und Lesetexten.')); return; }
      const found = [];
      for (const d of L.activeDecks()) {
        const r = (window.READ || {})[d.id];
        const matches = L.cardsOf(d).filter(c => (c.q + ' ' + c.a.join(' ')).toLocaleLowerCase('de').includes(q));
        if (d.title.toLocaleLowerCase('de').includes(q) || matches.length || r && JSON.stringify(r).toLocaleLowerCase('de').includes(q)) {
          found.push(h('button', { class: 'deck', type: 'button', onclick: () => go(() => ui.deck(d)) }, h('span', null, h('strong', null, d.title), h('small', null, matches.length ? matches.length + ' passende Karten · ' + matches[0].q : 'Passendes Thema oder Lesetext'))));
        }
      }
      results.replaceChildren(...(found.length ? found : [h('p', null, 'Keine Treffer. Weitere Fächer kannst du unter „Mein Lernstoff“ auswählen.')]));
    };
    input.addEventListener('input', draw);
    view.append(backBtn(() => go(ui.home, 'learn')), h('h1', null, 'Suche'), h('label', { class: 'field' }, 'Suchbegriff', input), results); draw(); input.focus();
  }
  function evidence(d) {
    const cs = L.cardsOf(d), seen = cs.filter(c => L.st(d, c).seen > 0).length;
    const recognized = cs.filter(c => L.st(d, c).recognition > 0).length;
    const recalled = cs.filter(c => L.st(d, c).recall > 0).length;
    const open = (window.OPEN || []).filter(o => (o.decks || []).includes(d.id));
    const done = open.filter(o => (S.open || {})[o.id]?.max).length;
    return h('section', { class: 'card' }, h('h3', null, 'Dein Lernstand'), h('p', null, seen + '/' + cs.length + ' gesehen · ' + recognized + ' wiedererkannt · ' + recalled + ' selbst abgerufen'),
      h('small', null, 'Selbst abgerufen: eingetippt oder bei Karteikarten selbst als gewusst bewertet. Ältere Antworten ohne Lernart zählen nur als gesehen.'),
      open.length ? h('p', null, done + '/' + open.length + ' offene Aufgaben bearbeitet (Selbstbewertung)') : '');
  }
  L.visibleSubjects = () => SUBJECTS.filter(visible);
  Object.assign(ui, { selection, search, evidence });
})();
