// auto_generated: false
// Mixed practice exam: no feedback until submission; open responses assessed explicitly by the learner.
(() => {
  'use strict';
  const L = window.LA, { h, S, ui, view, go } = L;
  function build(t) {
    const decks = L.testDecks(t), ids = decks.map(d => d.id);
    const cards = L.shuffle(decks.flatMap(d => L.cardsOf(d).map(c => ({ d, c })))).slice(0, 10).map((it, i) => {
      const typed = i % 2 === 0 && L.ans(it.d, it.c).every(a => a.length <= 80);
      L.cfg.mathInput = !!it.d.mathInput; L.cfg.looseAccents = !!it.d.looseAccents;
      return { kind: typed ? 'type' : 'choice', q: L.prompt(it.d, it.c), it, max: 1, options: typed ? null : L.options(it.d, it.c), answer: L.ansText(it.d, it.c) };
    });
    const open = L.shuffle((window.OPEN || []).filter(o => o.subject === t.subj && (o.decks || []).some(id => ids.includes(id)))).slice(0, 2).map(o => ({ kind: 'open', q: o.q, o, max: o.be }));
    const reading = decks.flatMap(d => ((window.READ || {})[d.id]?.check || []).slice(0, 1).map(([q, answer]) => ({ kind: 'open', q, max: 1, o: { id: 'read-' + d.id, be: 1, punkte: ['Meine Antwort enthält den Kerngedanken der Musterlösung.'], muster: answer }, text: (window.READ[d.id].sections || []).flatMap(s => s.p).join('\n\n').replace(/\[\[|\]\]/g, '') }))).slice(0, 2);
    const practice = (window.PRACTICE || []).filter(p => p.subject === t.subj && p.decks.some(id => ids.includes(id))).flatMap(p => p.questions.map(q => ({ kind: p.kind, q: q.q, options: q.options, answer: q.options[q.answer], text: p.text, max: 1 })));
    return [...cards, ...open, ...reading, ...practice];
  }
  function exam(t) {
    const tasks = build(t);
    if (!tasks.length) { L.toast('📚', 'Noch keine Aufgaben', 'Verknüpfe zuerst Themen mit diesem Test.'); return; }
    const mins = Math.max(10, tasks.reduce((n, x) => n + (x.kind === 'open' ? 4 : 1), 0));
    go(() => view.append(L.backBtn(() => go(() => ui.test(t), 'plan')), h('h1', null, 'Gemischter Probetest'),
      h('p', null, tasks.length + ' Aufgaben · ' + mins + ' Minuten. Auswahl, eigene Antworten und verfügbare Textaufgaben aus deinen Testthemen.'),
      h('p', { class: 'lead' }, 'Offene Antworten bewertest du nach der Abgabe anhand einer Checkliste. Die Übungsnote ist keine Vorhersage deiner Schulnote. Hörtexte werden mit der Gerätestimme gesprochen.'),
      h('button', { class: 'cta', type: 'button', onclick: () => start(t, tasks, mins) }, 'Probetest beginnen')));
  }
  function start(t, tasks, minutes) {
    let i = 0, submitted = false, finalized = false;
    const deadline = Date.now() + minutes * 60000, answers = tasks.map(() => ({ value: '', points: 0 }));
    const exit = () => { if (window.speechSynthesis) speechSynthesis.cancel(); go(() => ui.test(t), 'plan'); };
    function show() {
      if (submitted) return;
      if (i >= tasks.length || Date.now() >= deadline) return submit();
      const task = tasks[i], response = answers[i];
      go(() => {
        const clock = h('span', { class: 'timer', role: 'timer' });
        const tick = () => { const sec = Math.max(0, Math.ceil((deadline - Date.now()) / 1000)); clock.textContent = Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0'); if (!sec) submit(); };
        view.append(h('div', { class: 'topline' }, L.backBtn(exit), clock), h('h1', null, 'Aufgabe ' + (i + 1) + ' / ' + tasks.length), h('p', { class: 'lead' }, task.max + ' Punkte'));
        if (task.kind === 'listening') {
          if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) view.append(h('button', { class: 'cta ghost', type: 'button', onclick: () => L.speak(task.text, 'en-GB') }, 'Hörtext abspielen (Gerätestimme)'));
          else { response.readInstead = true; view.append(h('p', null, 'Keine Sprachausgabe verfügbar. Diese Aufgabe zählt als Leseübung.'), h('p', { class: 'reading-passage' }, task.text)); }
          view.append(h('details', { ontoggle: e => { if (e.currentTarget.open) response.readInstead = true; } }, h('summary', null, 'Audio nicht verständlich? Als Leseübung bearbeiten'), h('p', null, task.text)));
        } else if (task.text) view.append(h('p', { class: 'reading-passage' }, task.text));
        view.append(h('h2', null, task.q));
        if (task.options) {
          const choices = h('div', { class: 'opts' });
          const draw = () => choices.replaceChildren(...task.options.map(value => h('button', { class: 'opt' + (response.value === value ? ' selected' : ''), type: 'button', 'aria-pressed': String(response.value === value), onclick: () => { response.value = value; draw(); } }, value)));
          draw(); view.append(choices);
        } else if (task.it && L.ans(task.it.d, task.it.c).length > 1) {
          const values = response.value.split(' – '), labels = L.labels(task.it.d, task.it.c);
          const inputs = L.ans(task.it.d, task.it.c).map((_, k) => {
            const input = h('input', { type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', oninput: () => { response.value = inputs.map(x => x.value).join(' – '); } });
            input.value = values[k] || ''; return input;
          });
          view.append(h('div', { class: 'fields' }, inputs.map((input, k) => h('label', { class: 'field' }, h('span', null, labels[k] || 'Antwort ' + (k + 1)), input))));
        } else {
          const input = h('textarea', { rows: task.kind === 'open' ? 6 : 2, 'aria-label': 'Deine Antwort', oninput: e => { response.value = e.target.value; } }); input.value = response.value; view.append(input);
        }
        view.append(h('div', { class: 'editor-actions' }, i ? h('button', { class: 'cta ghost', type: 'button', onclick: () => { i--; show(); } }, 'Vorherige Aufgabe') : '',
          h('button', { class: 'cta', type: 'button', onclick: () => { if (window.speechSynthesis) speechSynthesis.cancel(); i++; show(); } }, i === tasks.length - 1 ? 'Abgeben' : 'Weiter (auch ohne Antwort)')));
        tick(); if (!submitted) L.timer = setInterval(tick, 1000);
      });
    }
    function submit() {
      if (submitted) return; submitted = true; clearInterval(L.timer); if (window.speechSynthesis) speechSynthesis.cancel();
      tasks.forEach((task, k) => {
        if (task.kind === 'open') return;
        const value = answers[k].value;
        if (task.it) {
          L.cfg.mathInput = !!task.it.d.mathInput; L.cfg.looseAccents = !!task.it.d.looseAccents;
          answers[k].points = value && L.matches(task.it.d, task.it.c, value) ? 1 : 0;
        } else answers[k].points = value === task.answer ? 1 : 0;
      });
      const open = tasks.map((task, k) => ({ task, k })).filter(x => x.task.kind === 'open');
      if (!open.length) return finish();
      go(() => {
        view.append(h('h1', null, 'Offene Antworten bewerten'), h('p', null, 'Vergleiche deine abgegebene Antwort mit der Musterlösung. Markiere nur Punkte, die du selbst genannt hast.'));
        for (const { task, k } of open) {
          const chosen = new Set();
          view.append(h('section', { class: 'card' }, h('h2', null, task.q), h('p', null, 'Deine Antwort: ' + (answers[k].value || '(nicht beantwortet)')), h('p', null, 'Musterlösung: ' + task.o.muster),
            ...task.o.punkte.map((p, n) => h('label', { class: 'chk' }, h('input', { type: 'checkbox', disabled: !answers[k].value.trim(), onchange: e => { if (e.target.checked) chosen.add(n); else chosen.delete(n); answers[k].points = Math.min(task.max, chosen.size); } }), h('span', null, p)))));
        }
        view.append(h('button', { class: 'cta', type: 'button', onclick: finish }, 'Bewertung abschließen'));
      });
    }
    function finish() {
      if (finalized) return; finalized = true;
      const points = answers.reduce((n, a) => n + a.points, 0), max = tasks.reduce((n, x) => n + x.max, 0), pct = Math.round(points / max * 100);
      const grade = L.study.grade(pct, L.study.SCALES[t.subj] || [50, 65, 80, 90]);
      tasks.forEach((task, k) => {
        if (task.it) L.rate(task.it.d, task.it.c, !!answers[k].points, false, task.kind === 'type' ? 'recall' : 'recognition');
        if (task.kind === 'open') { S.open = S.open || {}; S.open[task.o.id] = { pts: answers[k].points, max: task.max, date: Date.now(), draft: answers[k].value }; }
      });
      S.examHistory = [...(S.examHistory || []), { date: Date.now(), title: t.title, points, max, pct }].slice(-20); L.save();
      go(() => {
        view.append(h('h1', null, 'Übungsnote ' + grade.n + ': ' + grade.t), h('p', null, points + ' / ' + max + ' Punkte · ' + pct + ' %'), h('p', { class: 'lead' }, 'Enthält Selbstbewertungen. Keine Prognose der Schulnote; Aufgaben und Gewichtung können von deiner Prüfung abweichen.'));
        tasks.forEach((task, k) => view.append(h('details', { class: 'card' }, h('summary', null, (k + 1) + '. ' + answers[k].points + '/' + task.max + ' Punkte · ' + task.q),
          h('p', null, 'Deine Antwort: ' + (answers[k].value || '(leer)')), h('p', null, 'Lösung: ' + (task.o?.muster || task.answer)), answers[k].readInstead ? h('p', null, 'Als Leseübung bearbeitet.') : '', task.kind === 'listening' ? h('p', null, task.text) : '')));
        view.append(h('button', { class: 'cta', type: 'button', onclick: exit }, 'Zurück zum Test'));
      });
    }
    show();
  }
  ui.examHistoryCard = () => h('section', { class: 'card' }, h('h3', null, 'Letzte Probetests'),
    ...(S.examHistory || []).slice().reverse().slice(0, 5).map(x => h('p', null, new Date(x.date).toLocaleDateString('de-AT') + ' · ' + x.title + ': ' + x.points + '/' + x.max + ' Punkte')),
    !(S.examHistory || []).length ? h('p', null, 'Nach deinem ersten Probetest erscheint hier dein Ergebnis.') : '', h('small', null, 'Mit Selbstbewertung; verschiedene Aufgaben sind nur eingeschränkt vergleichbar.'));
  L.exam = exam; L.examBuild = build;
})();
