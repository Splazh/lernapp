// Lernapp, Teil 2b: weitere Lernarten. Richtig oder Falsch, Lücken füllen, Reihenfolge herstellen.
(() => {
  'use strict';
  const LA = window.LA;
  const { h, svg, S, save, go, base, cardsOf, rate, prompt, ans, labels, options, matches, fieldOk, splitVar, shuffle, buzz, view } = LA;
  const K = LA.kit;
  const rand = a => a[Math.random() * a.length | 0];
  const modes = LA.modes = {};

  // ---------- Richtig oder Falsch ----------
  // Die Aussage "Frage = Antwort" stimmt oder nicht. Raten bringt weniger: richtig zählt halb (kein Sprung in den Lernboxen).
  modes.tf = (d, c, n, i, done) => {
    const opts = options(d, c), good = opts.find(t => matches(d, c, t)), bads = opts.filter(t => !matches(d, c, t));
    const truth = !bads.length || Math.random() < .5, shown = truth ? good : rand(bads);
    const yes = h('button', { class: 'tfbtn yes', type: 'button' }, 'Richtig'), no = h('button', { class: 'tfbtn no', type: 'button' }, 'Falsch');
    const pick = v => {
      const ok = v === truth;
      [yes, no].forEach(b => { b.disabled = true; });
      (v ? yes : no).classList.add(ok ? 'right' : 'wrong');
      if (!ok) { buzz(60); (truth ? yes : no).classList.add('right'); }
      rate(d, c, ok, true);
      if (!ok) { const x = K.explainBox(d, c); if (x) view.append(x); }
      K.dock(ok, ok ? 'Richtig!' : 'Falsch', ok ? '+5 XP' : (truth ? 'Das stimmt so: ' : 'Richtig wäre: ') + good, () => done(ok));
    };
    yes.addEventListener('click', () => pick(true)); no.addEventListener('click', () => pick(false));
    view.append(K.top(d, i, n),
      h('div', { class: 'qcard tf' }, h('div', { class: 'q' }, prompt(d, c)), h('div', { class: 'eq' }, 'ist'), h('div', { class: 'q alt' }, shown)),
      h('p', { class: 'pairhint', style: 'text-align:center' }, 'Stimmt das?'), h('div', { class: 'tfrow' }, yes, no));
  };

  // ---------- Lücken ----------
  // Mit Beispielsatz: das Wort im Satz einsetzen. Ohne Satz: Wort mit fehlenden Buchstaben ergänzen.
  const isLetter = ch => /\p{L}/u.test(ch);
  function pattern(s) {
    const ch = [...s], cand = [];
    ch.forEach((x, k) => { if (isLetter(x) && k > 0 && isLetter(ch[k - 1])) cand.push(k); });  // Wortanfänge bleiben stehen
    const hide = new Set(shuffle(cand).slice(0, Math.max(1, Math.round(cand.length * .55))));
    return ch.map((x, k) => hide.has(k) ? '_' : x).join('').split(' ').map(w => [...w].join(' ')).join('    ');
  }
  modes.gap = (d, c, n, i, done) => {
    const sol = ans(d, c), sent = LA.sentence(d, c), cloze = !!sent && sol.length === 1;
    const inputs = sol.map(() => h('input', { type: 'text', autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false', enterkeyhint: 'done' }));
    let blank = null, card;
    if (cloze) {
      const [a, b] = sent.split('___');
      blank = h('span', { class: 'blank' }, '_____');
      card = h('div', { class: 'qcard cloze' }, h('div', { class: 'cz' }, a, blank, b), h('div', { class: 'ql' }, 'Gesucht: ' + prompt(d, c)));
    } else {
      card = h('div', { class: 'qcard' }, h('div', { class: 'q' }, prompt(d, c)),
        sol.map((s, k) => h('div', { class: 'pat' }, labels(d)[k] ? h('small', null, labels(d)[k]) : '', h('span', null, pattern(splitVar(s)[0])))));
    }
    const fields = h('div', { class: 'fields' }, sol.map((s, k) => h('label', { class: 'field' }, h('span', null, cloze ? 'Das fehlende Wort' : (labels(d)[k] || 'Ganzes Wort')), inputs[k])));
    function check() {
      const res = inputs.map((inp, k) => fieldOk(inp.value, sol[k])), allOk = res.every(Boolean);
      inputs.forEach((inp, k) => {
        inp.readOnly = true; inp.parentNode.classList.add(res[k] ? 'ok' : 'no');
        if (!res[k]) inp.parentNode.append(h('em', { class: 'sol' }, splitVar(sol[k]).join('  oder  ')));
      });
      if (blank) { blank.textContent = splitVar(sol[0])[0]; blank.classList.add(allOk ? 'ok' : 'no'); }
      if (!allOk) { buzz(60); const x = K.explainBox(d, c); if (x) view.append(x); }
      rate(d, c, allOk);
      K.dock(allOk, allOk ? 'Richtig!' : 'Fast', allOk ? '+10 XP' : 'Die Lösung steht unter dem Feld.', () => done(allOk));
    }
    inputs.forEach((inp, k) => inp.addEventListener('keydown', e => {
      if (e.key !== 'Enter' || inp.readOnly) return;
      if (k < inputs.length - 1) inputs[k + 1].focus(); else check();
    }));
    view.append(K.top(d, i, n), card, fields);
    K.plainDock(h('button', { class: 'cta', onclick: check }, 'Prüfen'));
    inputs[0].focus();
  };

  // ---------- Reihenfolge ----------
  // Aufgaben: Sätze aus den Beispielsätzen der Karten (Wörter ordnen) und feste Reihenfolgen aus ORDERS (Schritte, Schichten).
  LA.orderTasks = d => {
    const b = base(d);
    const sents = shuffle(cardsOf(d).filter(c => LA.filled(d, c))).slice(0, 8).map(c => ({ c, title: 'Bringe die Wörter in die richtige Reihenfolge.', hint: 'Gemeint ist: ' + prompt(d, c), seq: false, items: LA.filled(d, c).split(/\s+/) }));
    const fixed = d.filter ? [] : shuffle((window.ORDERS || {})[b.id] || []).slice(0, 3).map(o => ({ c: null, title: o.t, hint: '', seq: true, items: o.items, e: o.e }));
    return shuffle([...fixed, ...sents]).slice(0, 8);
  };
  LA.hasOrder = d => LA.orderTasks(d).length > 0;

  function orderTask(d, t, n, i, done) {
    const want = t.items;
    let bank = shuffle(want.map((x, k) => ({ x, k })));
    if (want.length > 1 && bank.every((b, k) => b.x === want[k])) bank.reverse();
    let placed = [];
    const area = h('div', { class: 'ordarea' + (t.seq ? ' seq' : '') }), pool = h('div', { class: 'ordbank' });
    let locked = false, go1 = null;
    const draw = () => {
      area.replaceChildren(...(placed.length ? placed.map((p, k) => h('button', { type: 'button', class: 'ochip placed', onclick: () => { if (locked) return; placed.splice(k, 1); bank.push(p); draw(); } }, t.seq ? (k + 1) + '. ' + p.x : p.x))
        : [h('span', { class: 'ordph' }, 'Tippe die Wörter in der richtigen Reihenfolge an')]));
      pool.replaceChildren(...bank.map(p => h('button', { type: 'button', class: 'ochip', onclick: () => { if (locked) return; bank.splice(bank.indexOf(p), 1); placed.push(p); draw(); } }, p.x)));
      if (go1) go1.disabled = bank.length > 0;
    };
    function check() {
      locked = true;
      const ok = placed.every((p, k) => p.x === want[k]);
      area.classList.add(ok ? 'ok' : 'no'); if (!ok) buzz(60);
      if (t.c) rate(d, t.c, ok); else { LA.bump(); if (ok) LA.addXp(10); save(); }
      if (!ok) { const x = t.c ? K.explainBox(d, t.c) : ''; if (x) view.append(x); }
      K.dock(ok, ok ? 'Richtig!' : 'Nicht ganz', ok ? '+10 XP' : 'Richtig: ' + want.join(t.seq ? '  →  ' : ' '), () => done(ok));
    }
    go1 = h('button', { class: 'cta', type: 'button', onclick: check }, 'Prüfen');
    view.append(K.top(d, i, n), h('div', { class: 'qcard' }, h('div', { class: 'q ordq' }, t.title), t.hint ? h('div', { class: 'ql' }, t.hint) : ''), area, pool);
    K.plainDock(go1);
    draw();
  }
  LA.orderStart = d => {
    const tasks = LA.orderTasks(d);
    if (!tasks.length) return LA.goBack(d);
    let i = 0, right = 0;
    const next = () => {
      if (i >= tasks.length) return go(() => K.finish(d, right, tasks.length, 'order'));
      go(() => orderTask(d, tasks[i], tasks.length, i, ok => { if (ok) right++; i++; next(); }));
    };
    next();
  };
})();
