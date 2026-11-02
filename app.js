// Lernapp: ein gleicher Lernablauf für jeden Stoff (decks/*.js).
(() => {
  'use strict';
  const DECKS = window.DECKS || [];
  const SUBJECTS = window.SUBJECTS || [];
  const view = document.getElementById('view');
  let timer = null;

  // ---------- Speicher ----------
  let S = { xp: 0, last: '', streak: 0, cards: {}, best: {}, opts: {} };
  try { Object.assign(S, JSON.parse(localStorage.getItem('lernapp') || '{}')); } catch (e) { /* leer starten */ }
  const save = () => { try { localStorage.setItem('lernapp', JSON.stringify(S)); } catch (e) { /* ignorieren */ } };

  // ---------- Helfer ----------
  function h(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    for (const k in attrs || {}) {
      const v = attrs[k];
      if (k === 'class') e.className = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) e.setAttribute(k, v === true ? '' : v);
    }
    for (const c of kids.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
    return e;
  }
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const dayStr = t => new Date(t).toISOString().slice(0, 10);
  const buzz = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) { /* egal */ } };

  // ---------- Stoff ----------
  // "Falsche Antworten" ist ein gefilterter Blick (d.filter) auf ein Stoffpaket (d.base).
  const base = d => d.base || d;
  const cardsOf = d => d.cards.map((r, i) => {
    const w = r.length > 2 && typeof r[r.length - 1] === 'object' ? r[r.length - 1].w : null;
    return { i, q: r[0], a: r.slice(1, w ? -1 : undefined), w };
  }).filter(c => !d.filter || d.filter(c));
  const decksOf = sub => DECKS.filter(d => d.subject === sub.id);
  const wrongDeck = (d, sub) => Object.assign({}, d, {
    base: d, filter: c => !!st(d, c).wrong, title: 'Falsche Antworten · ' + d.title,
    back: () => go(() => wrongScreen(sub))
  });
  const wrongCount = sub => decksOf(sub).reduce((n, d) => n + cardsOf(wrongDeck(d, sub)).length, 0);
  const goBack = d => d.back ? d.back() : go(() => subjectScreen(SUBJECTS.find(s => s.id === d.subject)));
  const st = (d, c) => ((S.cards[d.id] = S.cards[d.id] || {})[c.i] = (S.cards[d.id] || {})[c.i] || { box: 0, seen: 0, right: 0 });
  const opt = d => (S.opts[d.id] = S.opts[d.id] || { skip: d.labels.length > 1 ? 1 : 0 });
  const prompt = (d, c) => opt(d).skip ? c.q + '  ·  ' + c.a.slice(0, opt(d).skip).join(' / ') : c.q;
  const ans = (d, c) => c.a.slice(opt(d).skip);
  const labels = d => d.labels.slice(opt(d).skip);
  const ansText = (d, c) => ans(d, c).join(' – ');
  const mastered = d => cardsOf(base(d)).filter(c => st(d, c).box >= 3).length;

  // ---------- Fortschritt ----------
  const streakNow = () => (S.last === dayStr(Date.now()) || S.last === dayStr(Date.now() - 864e5)) ? S.streak : 0;
  function bump() {
    const t = dayStr(Date.now());
    if (S.last !== t) { S.streak = S.last === dayStr(Date.now() - 864e5) ? S.streak + 1 : 1; S.last = t; }
  }
  function rate(d, c, ok) {
    bump();
    const s = st(d, c);
    s.seen++;
    s.wrong = !ok;
    if (ok) { s.right++; s.box = Math.min(4, s.box + 1); S.xp += 10; } else { s.box = 0; S.xp += 2; }
    save();
  }
  // Schwache Karten kommen häufiger dran.
  function pick(d, n) {
    const pool = cardsOf(d).map(c => ({ c, w: 5 - st(d, c).box + (st(d, c).seen ? 0 : 1) }));
    const out = [];
    while (out.length < n && pool.length) {
      let r = Math.random() * pool.reduce((s, p) => s + p.w, 0), k = 0;
      for (; k < pool.length - 1; k++) { r -= pool[k].w; if (r <= 0) break; }
      out.push(pool.splice(k, 1)[0].c);
    }
    return out;
  }

  // ---------- Antworten prüfen ----------
  const norm = s => s.toLowerCase().trim().replace(/[‘’`´]/g, "'").replace(/\s+/g, ' ');
  const variants = s => s.split('/').map(norm);
  const fieldOk = (input, solution) => variants(solution).includes(norm(input));

  // Passt ein Auswahltext zur richtigen Antwort (inkl. erlaubter Varianten)?
  const matches = (d, c, t) => { const r = ans(d, c), p = t.split(' – '); return p.length === r.length && p.every((x, k) => variants(r[k]).includes(norm(x))); };

  // Falsche Antwortmöglichkeiten: bei mehreren Formen auch vertauschte Formen.
  function options(d, c) {
    const right = ans(d, c), correct = right.join(' – ');
    // Eigene Falsch-Antworten der Karte oder Antwort-Pool des Stoffpakets (z. B. Zeitformen)
    if (c.w) return shuffle([right.map(x => x.split('/')[0]).join(' – '), ...c.w.slice(0, 3)]);
    const pool = base(d).pool;
    if (pool) return shuffle([correct, ...shuffle(pool.filter(p => !matches(d, c, p))).slice(0, 3)]);
    // Eine Falsch-Antwort darf nie auch richtig sein (z. B. "got – got" bei got/gotten).
    const isRight = t => t.split(' – ').every((p, k) => right[k] != null && variants(right[k]).includes(norm(p)));
    const wrong = [];
    if (right.length > 1) {
      const first = x => x.split('/')[0];
      const cand = [
        right.map(() => first(right[0])),
        right.map((_, i) => first(right[Math.min(i + 1, right.length - 1)])),
        right.slice().reverse().map(first)
      ].map(x => x.join(' – '));
      shuffle(cand).forEach(t => { if (!isRight(t) && !wrong.includes(t) && wrong.length < 2) wrong.push(t); });
    }
    for (const o of shuffle(cardsOf(base(d)))) {
      const t = ansText(d, o);
      if (wrong.length >= 3) break;
      if (o.i !== c.i && !isRight(t) && !wrong.includes(t)) wrong.push(t);
    }
    return shuffle([correct, ...wrong]);
  }

  // ---------- Navigation ----------
  function go(fn) { clearInterval(timer); view.replaceChildren(); fn(); window.scrollTo(0, 0); }
  const topBar = (onClose, i, n) => h('div', { class: 'top' },
    h('button', { class: 'x', 'aria-label': 'Zurück', onclick: onClose }, '✕'),
    n ? h('div', { class: 'bar' }, h('i', { style: 'width:' + Math.round(i / n * 100) + '%' })) : null);

  // ---------- Startseite ----------
  function home() {
    const lvl = Math.floor(S.xp / 100) + 1;
    view.append(
      h('div', { class: 'hello' }, h('h1', null, 'Hallo Lana! 👋'), h('p', { class: 'muted' }, 'Was lernen wir heute?')),
      h('div', { class: 'stats' },
        h('span', { class: 'chip' }, '🔥 ' + streakNow() + ' Tage'),
        h('span', { class: 'chip' }, '⭐ ' + S.xp + ' XP'),
        h('span', { class: 'chip' }, '🏆 Level ' + lvl)),
      h('div', { class: 'level' }, h('i', { style: 'width:' + (S.xp % 100) + '%' })),
      h('div', { class: 'subjects' }, SUBJECTS.map(sub => {
        const ds = decksOf(sub), w = wrongCount(sub);
        const sub2 = ds.length ? ds.length + (ds.length === 1 ? ' Thema' : ' Themen') : 'Kommt bald';
        return h('button', { class: 'subj' + (ds.length ? '' : ' soon'), style: '--c:' + sub.color, onclick: () => go(() => subjectScreen(sub)) },
          w ? h('span', { class: 'badge', title: 'Falsche Antworten' }, w) : null,
          h('span', { class: 'ico' }, sub.icon), h('strong', null, sub.title), h('small', null, sub2));
      })));
  }

  // ---------- Fach ----------
  function subjectScreen(sub) {
    const ds = decksOf(sub), w = wrongCount(sub);
    view.append(
      topBar(() => go(home)),
      h('h1', null, sub.icon + ' ' + sub.title),
      h('p', { class: 'muted' }, ds.length ? 'Such dir ein Thema aus' : 'Hier kommt bald Stoff rein 🌱'),
      h('div', { class: 'stack' },
        ds.flatMap((d, k) => {
          const m = mastered(d), n = d.cards.length;
          const head = d.group && d.group !== (ds[k - 1] || {}).group ? h('h3', { class: 'grp' }, d.group) : null;
          return [head, h('button', { class: 'btn deck', onclick: () => go(() => deckScreen(d)) },
            h('span', { class: 'ico' }, d.icon),
            h('span', { class: 'grow' }, d.title,
              h('small', null, m + ' von ' + n + ' sicher gelernt'),
              h('div', { class: 'bar' }, h('i', { style: 'width:' + Math.round(m / n * 100) + '%' }))))];
        }),
        h('button', { class: 'btn deck', onclick: () => go(() => wrongScreen(sub)) },
          h('span', { class: 'ico' }, '❌'),
          h('span', { class: 'grow' }, 'Falsche Antworten', h('small', null, w ? w + ' zum Nochmal-Üben' : 'Noch keine, super!')))));
  }

  // ---------- Falsche Antworten ----------
  function wrongScreen(sub) {
    const groups = decksOf(sub).map(d => ({ wd: wrongDeck(d, sub) })).map(g => ({ ...g, list: cardsOf(g.wd) })).filter(g => g.list.length);
    view.append(
      topBar(() => go(() => subjectScreen(sub))),
      h('h1', null, '❌ Falsche Antworten'),
      h('p', { class: 'muted' }, groups.length ? 'Das hattest du zuletzt falsch. Richtig beantwortet, verschwindet es hier.' : 'Nichts falsch, alles im grünen Bereich 🎉'),
      ...groups.map(g => h('section', { class: 'wgroup' },
        h('h3', null, base(g.wd).title, h('span', { class: 'muted' }, '  ·  ' + g.list.length)),
        h('div', { class: 'wlist' }, g.list.map(c => h('div', { class: 'witem' },
          h('strong', null, c.q), h('span', null, c.a.join(' – '))))),
        h('button', { class: 'btn primary', onclick: () => go(() => deckScreen(g.wd)) }, 'Diese ' + g.list.length + ' üben'))));
  }

  // ---------- Stoff-Seite mit Lernarten ----------
  function deckScreen(d) {
    const o = opt(d);
    const modes = [
      ['🃏', 'Karteikarten', 'Umdrehen und selbst bewerten', 'flash'],
      ['🎯', 'Multiple Choice', 'Die richtige Antwort antippen', 'mc'],
      ['⌨️', 'Selber schreiben', 'Tippe die Lösung ein', 'type'],
      ['🧩', 'Paare finden', 'Finde, was zusammengehört', 'pairs'],
      ['⏱️', 'Zeitspiel', '60 Sekunden, so viele wie möglich', 'timed']
    ];
    view.append(
      topBar(() => goBack(d)),
      h('h1', null, d.filter ? '❌ ' + base(d).title : d.icon + ' ' + d.title),
      h('p', { class: 'muted' }, d.filter ? cardsOf(d).length + ' Karten zum Wiederholen' : mastered(d) + ' von ' + d.cards.length + ' sicher gelernt'),
      d.labels.length > 1 ? h('label', { class: 'toggle' },
        h('input', { type: 'checkbox', checked: o.skip > 0, onchange: e => { o.skip = e.target.checked ? 1 : 0; save(); } }),
        h('span', null, 'Erste Form vorgeben', h('small', { class: 'muted', style: 'display:block' }, d.labels[0] + ' steht schon da, du musst den Rest wissen'))) : '',
      base(d).info && !d.filter ? h('button', { class: 'btn primary', style: 'margin-bottom:12px', onclick: () => go(() => infoScreen(d)) }, '📖 Erklärung: so funktioniert diese Zeit') : '',
      h('div', { class: 'stack' }, modes.filter(m => !(base(d).noModes || []).includes(m[3])).map(([ic, t, sub, key]) =>
        h('button', { class: 'btn', onclick: () => go(() => start(d, key)) }, ic + '  ' + t, h('small', null, sub)))));
  }

  // ---------- Erklärung zu einem Thema ----------
  function infoScreen(d) {
    const i = d.info;
    const list = (title, items) => items && items.length
      ? h('section', { class: 'info' }, h('h3', null, title), h('ul', null, items.map(t => h('li', null, t)))) : '';
    view.append(
      topBar(() => go(() => deckScreen(d))),
      h('h1', null, d.icon + ' ' + d.title),
      h('p', { class: 'muted' }, i.kurz || ''),
      list('So bildest du sie', i.form),
      list('Wann benutzt du sie?', i.use),
      i.signals ? h('section', { class: 'info' }, h('h3', null, 'Signalwörter'), h('p', { class: 'sig' }, i.signals)) : '',
      i.examples ? h('section', { class: 'info' }, h('h3', null, 'Beispiele'),
        ...i.examples.map(([en, de]) => h('div', { class: 'ex' }, h('strong', null, en), h('span', { class: 'muted' }, de)))) : '',
      i.tip ? h('div', { class: 'tip' }, '💡 ' + i.tip) : '',
      h('button', { class: 'btn primary', style: 'margin-top:16px', onclick: () => go(() => deckScreen(d)) }, 'Jetzt üben →'));
  }

  function start(d, key) {
    if (!cardsOf(d).length) return goBack(d);
    if (key === 'pairs') return pairs(d);
    if (key === 'timed') return timed(d);
    const queue = pick(d, 10);
    if (!queue.length) return goBack(d);
    let i = 0, right = 0;
    const next = () => {
      if (i >= queue.length) return go(() => finish(d, right, queue.length, key));
      go(() => ({ flash, mc, type }[key])(d, queue[i], queue.length, i, ok => { if (ok) right++; i++; next(); }));
    };
    next();
  }

  // ---------- Modus: Karteikarten ----------
  function flash(d, c, n, i, done) {
    const card = h('div', { class: 'flash', role: 'button', tabindex: 0 },
      h('div', { class: 'big' }, prompt(d, c)), h('div', { class: 'hint' }, 'Antippen zum Umdrehen'));
    const flip = () => {
      card.replaceChildren(h('div', { class: 'hint' }, prompt(d, c)),
        ...ans(d, c).flatMap((a, k) => [h('div', { class: 'lab' }, labels(d)[k] || ''), h('div', { class: 'val' }, a)]));
      card.onclick = null;
      view.append(h('div', { class: 'grid2' },
        h('button', { class: 'btn bad', onclick: () => { rate(d, c, false); done(false); } }, 'Nochmal 😅'),
        h('button', { class: 'btn good', onclick: () => { rate(d, c, true); done(true); } }, 'Gewusst 😎')));
    };
    card.onclick = flip;
    card.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') flip(); };
    view.append(topBar(() => go(() => deckScreen(d)), i, n), card);
  }

  // ---------- Modus: Multiple Choice ----------
  function mc(d, c, n, i, done) {
        const btns = options(d, c).map(t => h('button', { class: 'btn opt center', onclick: () => pickIt(t, btns.find(b => b.textContent === t)) }, t));
    const holder = h('div', { class: 'stack' }, btns);
    function pickIt(t, el) {
      const ok = matches(d, c, t);
      btns.forEach(b => { b.disabled = true; if (matches(d, c, b.textContent)) b.classList.add('right'); });
      if (!ok) { el.classList.add('wrong'); buzz(60); }
      rate(d, c, ok);
      view.append(h('button', { class: 'btn primary', style: 'margin-top:14px', onclick: () => done(ok) }, 'Weiter →'));
    }
    view.append(topBar(() => go(() => deckScreen(d)), i, n),
      h('div', { class: 'question' }, h('div', { class: 'big' }, prompt(d, c)), h('div', { class: 'muted' }, labels(d).join(' – '))), holder);
  }

  // ---------- Modus: Selber schreiben ----------
  function type(d, c, n, i, done) {
    const sol = ans(d, c);
    const inputs = sol.map(() => h('input', { type: 'text', autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false' }));
    const fields = h('div', { class: 'fields' }, sol.map((s, k) =>
      h('div', null, h('label', null, labels(d)[k] || 'Antwort'), inputs[k])));
    let checked = false;
    const action = h('button', { class: 'btn primary', onclick: check }, 'Prüfen');
    function check() {
      if (checked) return done(allOk);
      checked = true;
      const res = inputs.map((inp, k) => fieldOk(inp.value, sol[k]));
      allOk = res.every(Boolean);
      inputs.forEach((inp, k) => {
        inp.readOnly = true;
        inp.classList.add(res[k] ? 'ok' : 'no');
        if (!res[k]) inp.parentNode.append(h('div', { class: 'sol' }, '✔ ' + sol[k].split('/').join('  oder  ')));
      });
      if (!allOk) buzz(60);
      rate(d, c, allOk);
      fields.before(h('div', { class: 'msg ' + (allOk ? 'ok' : 'no') }, allOk ? 'Richtig! 🎉' : 'Fast! Schau dir die Lösung an 👀'));
      action.textContent = 'Weiter →';
      action.focus();
    }
    let allOk = false;
    inputs.forEach((inp, k) => inp.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      if (k < inputs.length - 1) inputs[k + 1].focus(); else check();
    }));
    view.append(topBar(() => go(() => deckScreen(d)), i, n),
      h('div', { class: 'question' }, h('div', { class: 'big' }, prompt(d, c))), fields, action);
    inputs[0].focus();
  }

  // ---------- Modus: Paare finden ----------
  function pairs(d) {
    const set = pick(d, 6);
    const tiles = shuffle(set.flatMap(c => [{ id: c.i, t: prompt(d, c) }, { id: c.i, t: ansText(d, c), a: true }]));
    let sel = null, moves = 0, left = set.length, lock = false;
    const els = tiles.map(t => h('button', { class: 'tile', onclick: () => tap(t, el(t)) }, t.t));
    const el = t => els[tiles.indexOf(t)];
    const info = h('div', { class: 'muted', style: 'text-align:center;margin-bottom:12px' }, 'Tippe zwei, die zusammengehören');
    function tap(t, e) {
      if (lock || e === sel) return;
      if (!sel) { sel = { t, e }; e.classList.add('sel'); return; }
      moves++;
      const first = sel; sel = null;
      if (first.t.id === t.id && first.t.a !== t.a) {
        [first.e, e].forEach(x => { x.classList.remove('sel'); x.classList.add('done'); });
        if (--left === 0) setTimeout(() => { bump(); S.xp += 30; save(); go(() => finish(d, set.length, moves, 'pairs')); }, 300);
      } else {
        lock = true; buzz(40);
        [first.e, e].forEach(x => { x.classList.remove('sel'); x.classList.add('nope'); });
        setTimeout(() => { [first.e, e].forEach(x => x.classList.remove('nope')); lock = false; }, 450);
      }
    }
    view.append(topBar(() => go(() => deckScreen(d))), info, h('div', { class: 'tiles' }, els));
  }

  // ---------- Modus: Zeitspiel ----------
  function timed(d) {
    let time = 60, score = 0, combo = 0, c = null, locked = false;
    const clock = h('div', { class: 'timer' }), pts = h('div', { class: 'chip' }), comboEl = h('div', { class: 'combo' });
    const body = h('div');
    const tick = () => { clock.textContent = '⏱ ' + time; clock.classList.toggle('low', time <= 10); pts.textContent = '⭐ ' + score; };
    function nextQ() {
      locked = false;
      const pool = pick(d, 1);
      c = pool[0];
            const btns = options(d, c).map(t => h('button', { class: 'btn opt center', onclick: () => answer(t, btns.find(b => b.textContent === t)) }, t));
      function answer(t, e) {
        if (locked) return;
        locked = true;
        const ok = matches(d, c, t);
        rate(d, c, ok);
        btns.forEach(b => { b.disabled = true; if (matches(d, c, b.textContent)) b.classList.add('right'); });
        if (ok) { combo++; score += 1 + (combo >= 3 ? 1 : 0); } else { combo = 0; e.classList.add('wrong'); buzz(60); }
        comboEl.textContent = combo >= 3 ? '🔥 Serie x' + combo : '';
        tick();
        setTimeout(() => { if (time > 0) nextQ(); }, ok ? 350 : 900);
      }
      body.replaceChildren(h('div', { class: 'question' }, h('div', { class: 'big' }, prompt(d, c)), h('div', { class: 'muted' }, labels(d).join(' – '))), h('div', { class: 'stack' }, btns));
    }
    view.append(h('div', { class: 'top' }, h('button', { class: 'x', 'aria-label': 'Zurück', onclick: () => go(() => deckScreen(d)) }, '✕'), clock, h('span', { class: 'grow' }), pts), comboEl, body);
    tick(); nextQ();
    timer = setInterval(() => {
      time--; tick();
      if (time <= 0) {
        clearInterval(timer);
        const isBest = score > (S.best[d.id] || 0);
        if (isBest) S.best[d.id] = score;
        S.xp += score * 2; save();
        go(() => finish(d, score, 0, 'timed', isBest));
      }
    }, 1000);
  }

  // ---------- Ergebnis ----------
  function finish(d, right, total, key, isBest) {
    let emoji, title, score;
    if (key === 'timed') {
      emoji = right >= 15 ? '🚀' : right >= 8 ? '🎉' : '💪';
      title = isBest ? 'Neuer Rekord!' : 'Zeit ist um!';
      score = right + ' Punkte';
    } else if (key === 'pairs') {
      emoji = '🧩'; title = 'Alle Paare gefunden!'; score = total + ' Züge';
    } else {
      const p = right / total;
      emoji = p === 1 ? '🏆' : p >= .7 ? '🎉' : p >= .4 ? '👍' : '💪';
      title = p === 1 ? 'Perfekt!' : p >= .7 ? 'Stark!' : 'Weiter so!';
      score = right + ' von ' + total;
    }
    view.append(h('div', { class: 'result' },
      h('div', { class: 'emoji' }, emoji), h('h2', null, title), h('div', { class: 'score' }, score),
      h('p', { class: 'muted' }, '⭐ ' + S.xp + ' XP  ·  🔥 ' + streakNow() + ' Tage  ·  ' + mastered(d) + '/' + base(d).cards.length + ' sicher'
        + (key === 'timed' ? '  ·  Rekord ' + (S.best[d.id] || 0) : '')),
      h('div', { class: 'stack', style: 'margin-top:20px' },
        h('button', { class: 'btn primary', onclick: () => go(() => start(d, key)) }, 'Nochmal'),
        h('button', { class: 'btn ghost', onclick: () => go(() => deckScreen(d)) }, 'Andere Lernart'),
        h('button', { class: 'btn ghost', onclick: () => go(home) }, 'Startseite'))));
  }

  go(home);
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => { /* offline-Modus optional */ });
  }
})();
