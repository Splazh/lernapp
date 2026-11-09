// Lernapp, Teil 12: Lesen. Zu jedem Thema ein Lesetext zum Einlesen (wie im Buch), mit Leitfragen und einem Lückentext aus dem Text.
// Die Texte stehen in decks/lesen-geo.js (window.READ). Begriffe in [[doppelten Klammern]] werden fett gezeigt und für den Lückentext benutzt.
(() => {
  'use strict';
  const LA = window.LA;
  const { h, svg, S, save, go, tileIco, head, backBtn, view, base, shuffle, subjectOf } = LA;
  const ui = LA.ui;
  const get = d => (window.READ || {})[base(d).id];
  const isRead = d => !!(S.read || {})[base(d).id];
  const mark = d => { S.read = S.read || {}; if (!S.read[base(d).id]) { S.read[base(d).id] = Date.now(); save(); } };

  // Text mit [[Begriff]] in Fettschrift umwandeln
  const rich = t => t.split(/\[\[(.+?)\]\]/).map((x, i) => i % 2 ? h('strong', { class: 'kw' }, x) : x);
  const plain = t => t.replace(/\[\[(.+?)\]\]/g, '$1');
  const clozeSents = r => r.sections.flatMap(s => s.p).flatMap(p => p.split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ\[])/)).filter(s => (s.match(/\[\[/g) || []).length === 1);
  const terms = r => [...new Set(r.sections.flatMap(s => s.p).flatMap(p => [...p.matchAll(/\[\[(.+?)\]\]/g)].map(m => m[1])))];

  function read(d, onDone) {
    const r = get(d), b = base(d), sub = subjectOf(d), tl = terms(r);
    view.append(
      h('div', { class: 'topline' }, backBtn(() => go(() => ui.deck(d)))),
      h('header', { class: 'shd', style: '--c:' + sub.color }, tileIco(b.icon, 'lg'), h('div', { class: 'grow' }, h('h1', null, b.title), h('p', { class: 'lead' }, 'Zum Einlesen, dann üben'))),
      h('section', { class: 'card readlead' }, h('p', null, r.lead)),
      LA.visual ? LA.visual(d) : '',
      ...r.sections.map(s => h('section', { class: 'card readsec' }, h('h2', null, s.h), s.p.map(p => h('p', null, rich(p))))),
      h('section', { class: 'card info' }, h('h3', null, 'Schlüsselbegriffe'), h('div', { class: 'keys' }, tl.map(t => h('span', { class: 'chip' }, t)))),
      r.check && r.check.length ? h('section', { class: 'card info' }, h('h3', null, 'Hast du es verstanden?'), h('p', { class: 'lead' }, 'Beantworte die Fragen im Kopf, dann tippe zum Aufdecken.'),
        r.check.map(([q, a]) => h('details', { class: 'chkq', onclick: () => mark(d) }, h('summary', null, q), h('p', null, a)))) : '',
      h('div', { class: 'stackbtn', style: 'margin:18px 0 120px' },
        tl.length >= 4 && clozeSents(r).length >= 4 ? h('button', { class: 'cta ghost', type: 'button', onclick: () => { mark(d); go(() => cloze(d)); } }, 'Lückentext aus diesem Text') : ''));
    view.append(h('div', { class: 'dock plain' }, h('button', { class: 'cta', type: 'button', onclick: () => { mark(d); if (onDone) onDone(); else go(() => ui.deck(d)); } }, onDone ? 'Weiter: Verständnis prüfen' : 'Jetzt mit Karten üben')));
  }

  // Lückentext aus dem Lesetext: Sätze mit genau einem Begriff, Wortkasten mit zwei Extra-Wörtern
  function cloze(d) {
    const r = get(d), b = base(d);
    const picked = shuffle(clozeSents(r)).slice(0, 6);
    if (picked.length < 4) return go(() => read(d));
    const right = picked.map(s => s.match(/\[\[(.+?)\]\]/)[1]);
    const extra = shuffle(terms(r).filter(t => !right.includes(t))).slice(0, 2);
    const chips = shuffle([...right, ...extra]).map((t, i) => ({ id: i, t }));
    const placed = picked.map(() => null);
    let sel = null, checked = false;
    const body = h('div'), dockEl = h('div');
    const free = () => chips.filter(c => !placed.includes(c.id));
    function draw() {
      body.replaceChildren(
        h('p', { class: 'pairhint' }, 'Tippe ein Wort an und dann die Lücke. Zwei Wörter sind zu viel.'),
        h('div', { class: 'bank' }, free().map(c => h('button', { class: 'chipw' + (sel === c.id ? ' sel' : ''), type: 'button', disabled: checked, onclick: () => { sel = sel === c.id ? null : c.id; draw(); } }, c.t))),
        h('div', { class: 'gaps' }, picked.map((s, k) => {
          const [a, bb] = s.replace(/\[\[(.+?)\]\]/, '___').split('___'), ch = chips.find(x => x.id === placed[k]), ok = checked && ch && ch.t === right[k];
          return h('p', { class: 'gapline' }, plain(a), h('button', { class: 'slot' + (ch ? ' full' : '') + (checked ? (ok ? ' ok' : ' no') : ''), type: 'button', disabled: checked, 'aria-label': 'Lücke ' + (k + 1),
            onclick: () => { if (sel != null) { placed[k] = sel; sel = null; } else placed[k] = null; draw(); } }, ch ? ch.t : '___'), plain(bb || ''),
          checked && !ok ? h('em', { class: 'sol' }, ' ' + right[k]) : '');
        })));
      const full = placed.every(x => x != null);
      dockEl.replaceChildren(checked ? h('button', { class: 'cta', type: 'button', onclick: () => go(() => read(d)) }, 'Zurück zum Text')
        : h('button', { class: 'cta', type: 'button', disabled: !full, onclick: check }, full ? 'Prüfen' : 'Fülle alle Lücken'));
    }
    function check() {
      checked = true;
      const n = picked.filter((s, k) => { const ch = chips.find(x => x.id === placed[k]); return ch && ch.t === right[k]; }).length;
      LA.bump(); LA.addXp(n * 4); save();
      if (n === picked.length && LA.confetti) LA.confetti();
      LA.toast && LA.toast(n === picked.length ? '🌟' : '✅', n + ' von ' + picked.length + ' richtig', '+' + n * 4 + ' XP');
      draw();
    }
    view.append(h('div', { class: 'topline' }, backBtn(() => go(() => read(d)))), h('h1', { class: 'ttl' }, 'Lückentext'), h('p', { class: 'lead' }, b.title),
      body, h('div', { class: 'dock plain' }, dockEl));
    draw();
  }

  // Zeile im Themen-Blatt
  LA.readRow = d => get(d) ? h('button', { class: 'row-link readrow' + (isRead(d) ? '' : ' new'), type: 'button', onclick: () => go(() => read(d)) }, tileIco('📚'),
    h('span', { class: 'grow' }, 'Zuerst lesen', h('small', null, isRead(d) ? 'Gelesen ✓ · nochmal ansehen' : 'Das Thema im Zusammenhang verstehen, bevor du übst')), svg('chevron', 'chev')) : '';
  LA.hasRead = d => !!get(d);
  LA.isRead = isRead;
  Object.assign(ui, { read });
})();
