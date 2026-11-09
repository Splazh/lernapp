// auto_generated: false
// Own topics with stable card identities, editing, ordering and portable export.
(() => {
  'use strict';
  const L = window.LA, { h, S, go, view, ui, SUBJECTS, DECKS, backBtn } = L;
  S.topics = S.topics || [];
  if (!S.topicsMigrated) {
    for (const [subject, cards] of Object.entries(S.mine || {})) if (cards.length) {
      const id = 'mine-' + subject;
      if (!S.topics.some(t => t.id === id)) S.topics.push({ id, subject, title: 'Meine Karten', cards });
    }
    S.topicsMigrated = true; S.mine = {}; L.save();
  }
  const sync = () => {
    for (let i = DECKS.length - 1; i >= 0; i--) if (DECKS[i].mine) DECKS.splice(i, 1);
    window.READ = window.READ || {};
    for (const t of S.topics) {
      t.cards.forEach((r, i) => {
        const oldKey = L.cardKey(r), meta = typeof r[r.length - 1] === 'object' ? r[r.length - 1] : null;
        if (!meta?.id) {
          const next = { ...(meta || {}), id: L.newId() }; if (meta) r[r.length - 1] = next; else r.push(next);
          const records = S.cards[t.id];
          if (records) { const record = records[String(i)] || records[oldKey]; if (record) records[next.id] = record; delete records[String(i)]; delete records[oldKey]; }
        }
      });
      const d = { ...t, mine: true, group: 'Eigene Themen', icon: '✍️', labels: ['Antwort'], noModes: ['pairs'] };
      DECKS.push(d); L.migrateCards(d);
      if (t.reading) window.READ[t.id] = t.reading; else delete window.READ[t.id];
    }
  };
  sync(); L.save();
  const button = (text, fn, cls = 'cta ghost') => h('button', { type: 'button', class: cls, onclick: fn }, text);
  const field = (label, input) => h('label', { class: 'field' }, h('span', null, label), input);
  const parse = text => text.split(/\r?\n/).map(l => l.split(/\t|;|\s=\s|\|/).map(s => s.trim())).filter(r => r.length >= 2 && r[0] && r[1]).map(r => [r[0], r.slice(1).join(' '), { id: L.newId() }]);
  const shrink = file => new Promise((resolve, reject) => {
    const image = new Image(), url = URL.createObjectURL(file);
    image.onload = () => {
      const k = Math.min(1, 520 / Math.max(image.width, image.height)), canvas = document.createElement('canvas');
      canvas.width = Math.round(image.width * k); canvas.height = Math.round(image.height * k);
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height); URL.revokeObjectURL(url); resolve(canvas.toDataURL('image/jpeg', .65));
    };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Das Bild konnte nicht gelesen werden.')); }; image.src = url;
  });
  function exportTopic(t) {
    const url = URL.createObjectURL(new Blob([JSON.stringify({ app: 'lernapp-topic', version: 1, topic: t }, null, 2)], { type: 'application/json' }));
    const a = h('a', { href: url, download: 'lernthema.json' }); document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  function editor(t) {
    let editing = -1, image = null;
    const q = h('textarea', { rows: 2, maxlength: 2000 }), a = h('textarea', { rows: 2, maxlength: 2000 });
    const title = h('input', { type: 'text', value: t.title, maxlength: 80 });
    const lead = h('textarea', { rows: 2 }), text = h('textarea', { rows: 8 });
    lead.value = t.reading?.lead || ''; text.value = (t.reading?.sections || []).map(s => s.h + '\n' + s.p.join('\n')).join('\n\n');
    const list = h('div'), msg = h('p', { role: 'status' }), photo = h('input', { type: 'file', accept: 'image/*', hidden: true });
    const imgStatus = h('small');
    const persist = success => { sync(); msg.textContent = L.save() ? success : 'Nur in dieser Sitzung gespeichert. Bitte sichere deinen Stand als Datei.'; };
    const clear = () => { editing = -1; q.value = a.value = ''; image = null; imgStatus.textContent = ''; add.textContent = 'Karte hinzufügen'; };
    const add = button('Karte hinzufügen', () => {
      if (!q.value.trim() || !a.value.trim()) { msg.textContent = 'Bitte Frage und Antwort ausfüllen.'; return; }
      const old = t.cards[editing], oldKey = old && L.cardKey(old);
      const meta = old && typeof old[old.length - 1] === 'object' ? old[old.length - 1] : {};
      const row = [q.value.trim(), a.value.trim(), { ...meta, id: meta.id || L.newId() }];
      if (image) row[2].img = image; else delete row[2].img;
      if (editing >= 0) { t.cards[editing] = row; if (S.cards[t.id]) delete S.cards[t.id][oldKey]; }
      else t.cards.push(row);
      clear(); persist('Karte gespeichert. Bei geänderten Karten beginnt der Lernstand neu.'); draw();
    }, 'cta');
    photo.onchange = async () => { const f = photo.files[0]; photo.value = ''; if (!f) return; try { image = await shrink(f); imgStatus.textContent = 'Foto ausgewählt'; } catch (e) { msg.textContent = e.message; } };
    function draw() {
      list.replaceChildren(...t.cards.map((r, i) => {
        const target = h('select', { 'aria-label': 'Zielthema für Karte' }, ...S.topics.filter(x => x.id !== t.id).map(x => h('option', { value: x.id }, x.title)));
        let confirm = false;
        const del = button('Löschen', () => { if (!confirm) { confirm = true; del.textContent = 'Löschen bestätigen'; return; } const key = L.cardKey(r); t.cards.splice(i, 1); if (S.cards[t.id]) delete S.cards[t.id][key]; clear(); persist('Karte gelöscht.'); draw(); }, 'linkbtn');
        const move = delta => { [t.cards[i], t.cards[i + delta]] = [t.cards[i + delta], t.cards[i]]; clear(); persist('Reihenfolge gespeichert.'); draw(); };
        return h('section', { class: 'card' }, h('strong', null, r[0]), h('p', null, r[1]), h('div', { class: 'editor-actions' },
          button('Bearbeiten', () => { editing = i; q.value = r[0]; a.value = r[1]; image = r[2]?.img || null; imgStatus.textContent = image ? 'Foto vorhanden' : ''; add.textContent = 'Änderungen speichern'; q.focus(); }),
          i ? button('↑ Nach oben', () => move(-1)) : '', i < t.cards.length - 1 ? button('↓ Nach unten', () => move(1)) : '', del),
          S.topics.length > 1 ? h('div', { class: 'editor-actions' }, target, button('Verschieben', () => {
            const to = S.topics.find(x => x.id === target.value); if (!to) return;
            const key = L.cardKey(r), record = (S.cards[t.id] || {})[key];
            to.cards.push(r); t.cards.splice(i, 1);
            if (record) { S.cards[to.id] = S.cards[to.id] || {}; S.cards[to.id][key] = record; delete S.cards[t.id][key]; }
            clear(); persist('Karte verschoben; Lernstand erhalten.'); draw();
          })) : '');
      }));
    }
    const bulk = h('textarea', { rows: 5, placeholder: 'Frage;Antwort' });
    view.append(backBtn(() => go(() => overview(t.subject), 'practice')), h('h1', null, 'Thema bearbeiten'),
      h('section', { class: 'card' }, field('Name des Themas', title), field('Einleitung zum Lesetext', lead), field('Lesetext: Absätze durch Leerzeilen, erste Zeile jeweils Überschrift; Begriffe mit [[...]] markieren', text),
        button('Thema und Lesetext speichern', () => {
          if (!title.value.trim()) { msg.textContent = 'Bitte einen Namen eingeben.'; return; }
          t.title = title.value.trim();
          if (text.value.trim()) t.reading = { lead: lead.value.trim(), sections: text.value.trim().split(/\n\s*\n/).map(p => { const lines = p.split('\n'); return { h: lines.length > 1 ? lines.shift() : 'Zum Verstehen', p: lines }; }), check: t.reading?.check || [] };
          else delete t.reading;
          persist('Thema gespeichert.');
        }), button('Themenpaket exportieren', () => exportTopic(t))),
      h('section', { class: 'card' }, h('h2', null, 'Karte'), field('Frage', q), field('Antwort', a), photo,
        h('div', { class: 'editor-actions' }, button('Foto auswählen', () => photo.click()), button('Foto entfernen', () => { image = null; imgStatus.textContent = 'Kein Foto'; }), imgStatus, add, button('Abbrechen', clear))), msg,
      h('section', { class: 'card' }, field('Liste einfügen (Tab, ; oder | als Trennzeichen)', bulk), button('Karten einfügen', () => {
        const rows = parse(bulk.value); if (!rows.length) { msg.textContent = 'Keine Karten erkannt.'; return; }
        t.cards.push(...rows); bulk.value = ''; persist(rows.length + ' Karten hinzugefügt.'); draw();
      })), list); draw();
  }
  function overview(subject) {
    const select = h('select', { 'aria-label': 'Fach für neues Thema' }, ...SUBJECTS.map(s => h('option', { value: s.id, selected: s.id === subject }, s.title)));
    const name = h('input', { type: 'text', placeholder: 'Name deines neuen Themas', maxlength: 80 });
    view.append(backBtn(() => go(ui.practice, 'practice')), h('h1', null, 'Eigene Themen'),
      h('section', { class: 'card' }, field('Fach', select), field('Thema', name), button('Thema erstellen', () => {
        if (!name.value.trim()) { name.focus(); return; }
        const t = { id: 'own-' + L.newId(), subject: select.value, title: name.value.trim(), cards: [] }; S.topics.push(t); sync(); L.save(); go(() => editor(t));
      })), ...S.topics.filter(t => !subject || t.subject === subject).map(t => button(t.title + ' · ' + t.cards.length + ' Karten', () => go(() => editor(t)))));
  }
  L.syncTopics = sync; L.editTopic = t => go(() => editor(t)); L.exportTopic = exportTopic;
  L.mineRow = subject => button('Eigene Themen bearbeiten', () => go(() => overview(subject), 'practice'));
  L.mineAll = () => button('Eigene Themen erstellen und bearbeiten', () => go(() => overview(), 'practice'));
})();
