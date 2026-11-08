// Lernapp, Teil 10: Eigene Karten. Selbst schreiben, aus einer Liste einfügen (zum Beispiel Quizlet-Export) und mit Foto versehen.
// Die Karten liegen in S.mine[Fach] und erscheinen als Thema "Meine Karten" im jeweiligen Fach.
(() => {
  'use strict';
  const LA = window.LA;
  const { h, svg, S, save, go, tileIco, head, backBtn, view, DECKS, SUBJECTS } = LA;
  const ui = LA.ui;
  S.mine = S.mine && typeof S.mine === 'object' ? S.mine : {};
  const cards = subj => (S.mine[subj] = S.mine[subj] || []);
  const deckId = subj => 'mine-' + subj;

  // Das Stoffpaket zu einem Fach anlegen oder nachführen (es zeigt direkt auf die gespeicherte Liste).
  function ensure(subj) {
    const list = cards(subj); let d = DECKS.find(x => x.id === deckId(subj));
    if (!list.length) { if (d) DECKS.splice(DECKS.indexOf(d), 1); return; }
    if (!d) { d = { id: deckId(subj), subject: subj, group: 'Meine Karten', title: 'Meine Karten', icon: '✍️', labels: ['Antwort'], noModes: ['pairs'], mine: true, cards: list }; DECKS.push(d); }
    d.cards = list;
  }
  Object.keys(S.mine).forEach(ensure);

  // Foto verkleinern, damit der Speicher nicht voll läuft
  const shrink = (file, max) => new Promise((ok, fail) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); ok(c.toDataURL('image/jpeg', .7));
    };
    img.onerror = () => { URL.revokeObjectURL(url); fail(new Error('Bild')); }; img.src = url;
  });

  // Liste einlesen: pro Zeile Frage und Antwort, getrennt durch Tab, Strichpunkt, = oder |
  const parse = text => text.split(/\r?\n/).map(l => {
    const m = l.split(/\t|;|\s=\s|\|/).map(x => x.trim()); return m.length >= 2 && m[0] && m[1] ? [m[0], m.slice(1).join(' ')] : null;
  }).filter(Boolean);

  function remove(subj, i) {
    cards(subj).splice(i, 1);
    const old = S.cards[deckId(subj)] || {}, next = {};
    for (const k of Object.keys(old)) { const n = +k; if (n < i) next[n] = old[k]; else if (n > i) next[n - 1] = old[k]; }
    S.cards[deckId(subj)] = next; ensure(subj); save();
  }

  function editor(subj) {
    const sub = SUBJECTS.find(s => s.id === subj), msg = h('p', { class: 'bk-msg', role: 'status' }), listEl = h('div', { class: 'list' });
    const q = h('input', { type: 'text', autocomplete: 'off', maxlength: 200, 'aria-label': 'Frage' }), a = h('input', { type: 'text', autocomplete: 'off', maxlength: 200, 'aria-label': 'Antwort' });
    const pic = h('input', { type: 'file', accept: 'image/*', hidden: true }), picBtn = h('button', { class: 'cta ghost', type: 'button', onclick: () => pic.click() }, '📷 Foto dazu (optional)');
    let img = null;
    pic.addEventListener('change', async () => {
      const f = pic.files[0]; pic.value = ''; if (!f) return;
      try { img = await shrink(f, 520); if (img.length > 140000) img = await shrink(f, 320); picBtn.textContent = '📷 Foto ausgewählt (tippen zum Ersetzen)'; } catch (e) { msg.textContent = 'Das Bild konnte nicht gelesen werden.'; }
    });
    const draw = () => {
      const l = cards(subj);
      listEl.replaceChildren(...l.map((c, i) => {
        let sure = false;
        const del = h('button', { class: 'linkbtn', type: 'button', onclick: () => { if (!sure) { sure = true; del.textContent = 'Wirklich? Nochmal tippen'; del.classList.add('danger'); return; } remove(subj, i); draw(); } }, 'Löschen');
        return h('div', { class: 'card witem mineitem' }, h('div', { class: 'grow' }, h('strong', null, (c[2] && c[2].img ? '🖼️ ' : '') + c[0]), h('span', null, c[1])), del);
      }));
      if (!l.length) listEl.append(h('p', { class: 'empty' }, 'Noch keine eigenen Karten in ' + sub.title + '.'));
    };
    const add = () => {
      const qq = q.value.trim(), aa = a.value.trim();
      if (!qq || !aa) { msg.textContent = 'Schreibe Frage und Antwort.'; return; }
      const used = cards(subj).filter(c => c[2] && c[2].img).length;
      if (img && used >= 30) { msg.textContent = 'Mehr als 30 Karten mit Foto passen nicht in den Speicher.'; return; }
      cards(subj).push(img ? [qq, aa, { img }] : [qq, aa]); ensure(subj); save();
      q.value = a.value = ''; img = null; picBtn.textContent = '📷 Foto dazu (optional)'; msg.textContent = 'Karte gespeichert.'; draw(); q.focus();
    };
    [q, a].forEach(el => el.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }));
    const bulk = h('textarea', { rows: 5, placeholder: 'Pro Zeile eine Karte: Frage, dann Tab oder Strichpunkt, dann Antwort', 'aria-label': 'Liste einfügen' });
    const imp = () => {
      const rows = parse(bulk.value); if (!rows.length) { msg.textContent = 'Keine Karten gefunden. Pro Zeile: Frage ; Antwort'; return; }
      rows.forEach(r => cards(subj).push(r)); ensure(subj); save(); bulk.value = ''; msg.textContent = rows.length + ' Karten eingefügt.'; draw();
    };
    view.append(h('div', { class: 'topline' }, backBtn(() => go(() => overview(), 'learn'))),
      h('header', { class: 'shd', style: '--c:' + sub.color }, tileIco(sub.icon, 'lg'), h('div', { class: 'grow' }, h('h1', null, 'Meine Karten'), h('p', { class: 'lead' }, sub.title))),
      h('section', { class: 'card' }, h('h3', null, 'Neue Karte'),
        h('div', { class: 'fields' }, h('label', { class: 'field' }, h('span', null, 'Frage oder Begriff'), q), h('label', { class: 'field' }, h('span', null, 'Antwort'), a)),
        pic, h('div', { style: 'display:grid;gap:10px;margin-top:12px' }, picBtn, h('button', { class: 'cta', type: 'button', onclick: add }, 'Karte hinzufügen'))),
      msg,
      h('section', { class: 'card' }, h('h3', null, 'Liste einfügen'), h('p', { class: 'lead' }, 'Zum Beispiel aus Quizlet oder einer Tabelle kopieren. Pro Zeile eine Karte.'), bulk,
        h('button', { class: 'cta ghost', type: 'button', style: 'margin-top:12px', onclick: imp }, 'Einfügen')),
      head('Deine Karten'), listEl);
    draw();
  }

  // Übersicht: Fach wählen
  function overview() {
    view.append(h('div', { class: 'topline' }, backBtn(() => go(() => ui.practice(), 'practice'))), h('h1', { class: 'ttl' }, 'Meine Karten'),
      h('p', { class: 'lead' }, 'Schreib eigene Karten zu allem, was im Unterricht dran war. Sie erscheinen im Fach als Thema "Meine Karten".'),
      h('div', { class: 'list' }, SUBJECTS.map(s => h('button', { class: 'deck', type: 'button', style: '--c:' + s.color, onclick: () => go(() => editor(s.id), 'learn') },
        tileIco(s.icon), h('span', { class: 'grow' }, s.title, h('small', null, cards(s.id).length ? cards(s.id).length + ' eigene Karten' : 'noch keine')), svg('chevron', 'chev')))));
  }
  LA.mineRow = subj => h('button', { class: 'deck', type: 'button', onclick: () => go(() => editor(subj), 'learn') },
    tileIco('✍️'), h('span', { class: 'grow' }, 'Eigene Karten schreiben', h('small', null, cards(subj).length ? cards(subj).length + ' Karten von dir' : 'Foto, Liste einfügen oder tippen')), svg('chevron', 'chev'));
  LA.mineAll = () => h('div', { class: 'list' }, h('button', { class: 'deck', type: 'button', onclick: () => go(overview, 'learn') },
    tileIco('✍️'), h('span', { class: 'grow' }, 'Meine Karten', h('small', null, 'Eigene Karten schreiben oder einfügen')), svg('chevron', 'chev')));
})();
