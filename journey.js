// auto_generated: false
// A resumable, bounded session: understand, explain, recall, repeat on a later day.
(() => {
  'use strict';
  const L = window.LA, { h, S, go, ui, view } = L;
  const pending = () => S.journey && Array.isArray(S.journey.items) && S.journey.stage !== 'done';
  function plan() {
    const test = L.nextTestObj?.(), priority = test ? L.testDecks(test).map(d => d.id) : [];
    const pool = L.activeDecks().flatMap(d => L.cardsOf(d).map(c => ({ d, c, score: (priority.includes(d.id) ? 5 : 0) + (L.isDue(L.st(d, c)) ? 4 : 0) + 4 - L.st(d, c).box })));
    const count = Math.max(4, Math.floor((S.minutes || 10) * .8));
    return L.shuffle(pool).sort((a, b) => b.score - a.score).slice(0, count).map(x => ({ deck: x.d.id, key: x.c.key }));
  }
  const resolve = item => { const d = L.DECKS.find(d => d.id === item.deck); return d && { d, c: L.cardsOf(d).find(c => c.key === item.key) }; };
  function start() {
    if (!pending()) {
      const items = plan();
      if (!items.length) return go(ui.selection, 'learn');
      S.journey = { items, index: 0, correct: 0, stage: 'read', date: L.dayStr(Date.now()) }; L.save();
    }
    resume();
  }
  function advance(stage) { S.journey.stage = stage; L.save(); resume(); }
  function resume() {
    const j = S.journey, first = j.items.map(resolve).find(x => x?.c);
    if (!first) { j.stage = 'done'; L.save(); return go(ui.home, 'learn'); }
    if (j.stage === 'read') {
      if (L.hasRead(first.d)) return go(() => ui.read(first.d, () => advance('understand')));
      if (first.d.info) return go(() => {
        view.append(L.backBtn(() => go(ui.home, 'learn')), h('h1', null, 'Erst verstehen'), h('h2', null, first.d.title),
          h('p', null, first.d.info.kurz || ''), ...(first.d.info.form || []).map(t => h('p', { class: 'card' }, t)),
          h('button', { class: 'cta', type: 'button', onclick: () => advance('understand') }, 'Weiter: selbst erklären'));
      });
      advance('understand'); return;
    }
    if (j.stage === 'understand') {
      const open = (window.OPEN || []).find(o => (o.decks || []).includes(first.d.id));
      if (open) return go(() => L.openTask(open, () => advance('cards')));
      const pair = ((window.READ || {})[first.d.id]?.check || [])[0] || [first.c.q, first.c.a.join(' – ')];
      return go(() => {
        const answer = h('textarea', { rows: 4, 'aria-label': 'Deine Erklärung', oninput: e => { j.draft = e.target.value; L.save(); } }); answer.value = j.draft || '';
        view.append(L.backBtn(() => go(ui.home, 'learn')), h('h1', null, 'Ohne Nachschauen erklären'), h('p', null, pair[0]), answer,
          h('details', { class: 'card' }, h('summary', null, 'Mit der Lösung vergleichen'), h('p', null, pair[1])),
          h('p', { class: 'lead' }, 'Vergleiche deinen Gedanken mit der Lösung. Diese Selbstprüfung gibt keine automatische Richtigwertung.'),
          h('button', { class: 'cta', type: 'button', onclick: () => advance('cards') }, 'Weiter: Wissen abrufen'));
      });
    }
    if (j.stage === 'cards') {
      if (j.index >= j.items.length) return advance('done');
      const item = resolve(j.items[j.index]);
      if (!item?.c) { j.index++; L.save(); return resume(); }
      return go(() => {
        L.sessionExit = () => go(ui.home, 'learn');
        L.cfg.mathInput = !!item.d.mathInput; L.cfg.looseAccents = !!item.d.looseAccents;
        const typed = L.ans(item.d, item.c).length === 1 && L.ans(item.d, item.c)[0].length <= 80;
        (typed ? L.kit.type : L.kit.flash)(item.d, item.c, j.items.length, j.index, ok => { j.correct += ok ? 1 : 0; j.index++; L.save(); resume(); });
      });
    }
    go(() => view.append(h('h1', null, 'Deine Lernrunde ist geschafft'), h('p', null, j.correct + ' von ' + j.items.length + ' Karten richtig beantwortet.'),
      h('p', { class: 'lead' }, 'Deine Antworten bestimmen die nächsten Wiederholungstage. Unter „Heute wiederholen“ findest du fällige Karten. Du kannst jetzt eine Pause machen.'),
      h('button', { class: 'cta', type: 'button', onclick: () => go(ui.home, 'learn') }, 'Zur Startseite')));
  }
  ui.journeyCard = () => {
    const choose = h('select', { 'aria-label': 'Zeit für eine Lernrunde', onchange: e => { S.minutes = +e.target.value; L.save(); } }, ...[5, 10, 15, 20].map(n => h('option', { value: n, selected: n === (S.minutes || 10) }, n + ' Minuten')));
    return h('section', { class: 'card journey' }, h('h2', null, 'Dein nächster Lernschritt'), h('p', null, 'Verstehen → selbst erklären → üben → später wiederholen'),
      h('label', { class: 'field' }, 'Ungefähre Dauer einer neuen Runde', choose), h('button', { class: 'cta', type: 'button', onclick: start }, pending() ? 'Lernrunde fortsetzen' : 'Geführte Lernrunde starten'));
  };
  L.journey = { plan, start, resume };
})();
