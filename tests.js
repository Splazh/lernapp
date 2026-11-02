// Lernapp, Teil 4: Testtermine. Test eintragen (Fach, Datum, Stoff, Themen aus der App) und gezielt dafür lernen.
(() => {
  'use strict';
  const LA = window.LA;
  const { h, svg, S, save, go, bar, backBtn, tileIco, head, newId, DECKS, SUBJECTS, subjectOf, decksOf, mastered } = LA;
  const ui = LA.ui;

  // Beim ersten Start: die drei bekannten Termine, damit Lana nicht bei null anfängt.
  if (!S.seeded) {
    S.seeded = true;
    if (!S.tests) {
      S.tests = [
        { id: newId(), subj: 'englisch', title: '1st Check-Up', date: '2026-11-04', stoff: 'Wortschatz Unit 1 und 2 (English in Context 5), Present und Past Simple/Continuous, unregelmäßige Verben.',
          decks: ['en-family-vocab', 'en-relationship-verbs', 't-present-simple', 't-present-progressive', 't-past-simple', 't-past-progressive', 't-present-vergleich', 't-past-vergleich', 't-stative-verbs', 'irregular-verbs'] },
        { id: newId(), subj: 'englisch', title: 'Englisch Test', date: '2026-11-11', stoff: '', decks: [] },
        { id: newId(), subj: 'geografie', title: 'Geografie Test', date: '2026-11-27', stoff: '', decks: [] }
      ];
    }
    save();
  }
  const tests = () => (S.tests = S.tests || []);

  // ---------- Datum ----------
  const MONTHS = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const parse = s => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1); };
  const today = () => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); };
  const daysLeft = t => Math.round((parse(t.date) - today()) / 864e5);
  const when = t => { const n = daysLeft(t); return n === 0 ? 'Heute' : n === 1 ? 'Morgen' : n > 1 ? 'in ' + n + ' Tagen' : n === -1 ? 'Gestern' : 'vor ' + -n + ' Tagen'; };
  const niceDate = t => { const d = parse(t.date); return WEEKDAYS[d.getDay()] + ', ' + d.getDate() + '. ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(); };

  // ---------- Bereitschaft ----------
  const decksOfTest = t => (t.decks || []).map(id => DECKS.find(d => d.id === id)).filter(Boolean);
  const readiness = t => {
    const ds = decksOfTest(t), total = ds.reduce((n, d) => n + d.cards.length, 0), ok = ds.reduce((n, d) => n + mastered(d), 0);
    return { total, ok, pct: total ? Math.round(ok / total * 100) : 0, has: ds.length > 0 };
  };
  const sorted = list => list.slice().sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = () => sorted(tests().filter(t => daysLeft(t) >= 0));

  // ---------- Startseite: nächster Test ----------
  ui.nextTest = () => {
    const t = upcoming()[0];
    if (!t) return '';
    const sub = SUBJECTS.find(s => s.id === t.subj) || SUBJECTS[0], r = readiness(t);
    return h('button', { class: 'nexttest', type: 'button', style: '--c:' + sub.color, onclick: () => go(() => ui.test(t), 'plan') },
      h('span', { class: 'dateblock' }, h('b', null, parse(t.date).getDate()), h('small', null, MONTHS[parse(t.date).getMonth()])),
      h('span', { class: 'grow' }, h('strong', null, t.title), h('small', null, sub.title + ' · ' + when(t) + (r.has ? ' · ' + r.pct + ' % bereit' : '')), r.has ? bar(r.pct) : ''),
      svg('chevron', 'chev'));
  };

  // ---------- Liste ----------
  function plan() {
    const up = upcoming(), past = sorted(tests().filter(t => daysLeft(t) < 0)).reverse();
    const row = t => {
      const sub = SUBJECTS.find(s => s.id === t.subj) || SUBJECTS[0], r = readiness(t), d = parse(t.date), n = daysLeft(t);
      return h('button', { class: 'deck test' + (n >= 0 && n <= 2 ? ' soon' : ''), type: 'button', style: '--c:' + sub.color, onclick: () => go(() => ui.test(t), 'plan') },
        h('span', { class: 'dateblock' }, h('b', null, d.getDate()), h('small', null, MONTHS[d.getMonth()])),
        h('span', { class: 'grow' }, t.title, h('small', null, sub.title + ' · ' + when(t) + (r.has ? ' · ' + r.pct + ' % bereit' : ' · noch kein Stoff verknüpft')), r.has ? bar(r.pct) : ''),
        svg('chevron', 'chev'));
    };
    view().append(
      h('h1', { class: 'ttl' }, 'Testtermine'), h('p', { class: 'lead' }, 'Trag Tests samt Stoff ein und lerne gezielt dafür.'),
      up.length ? h('div', { class: 'list' }, up.map(row)) : h('p', { class: 'empty' }, 'Keine Tests anstehend. Tipp unten auf "Test eintragen".'),
      past.length ? head('Vergangen') : '', past.length ? h('div', { class: 'list dim' }, past.map(row)) : '',
      h('div', { class: 'dock plain' }, h('button', { class: 'cta', type: 'button', onclick: () => go(() => form(null), 'plan') }, 'Test eintragen')));
  }
  const view = () => LA.view;

  // ---------- Einzelner Test ----------
  function test(t) {
    const sub = SUBJECTS.find(s => s.id === t.subj) || SUBJECTS[0], r = readiness(t), n = daysLeft(t), ds = decksOfTest(t);
    const via = d => Object.assign({}, d, { back: () => go(() => test(t), 'plan') });
    const byWeak = ds.slice().sort((a, b) => LA.deckPct(a) - LA.deckPct(b));
    const weakest = byWeak.find(d => LA.deckPct(d) < 100) || byWeak[0];
    const left = r.total - r.ok, perDay = n > 0 ? Math.ceil(left / n) : left;
    const deckRow = d => h('button', { class: 'deck', type: 'button', style: '--c:' + subjectOf(d).color, onclick: () => go(() => ui.deck(via(d))) },
      tileIco(d.icon), h('span', { class: 'grow' }, d.title, h('small', null, mastered(d) + ' von ' + d.cards.length + ' sicher'), bar(LA.deckPct(d))), svg('chevron', 'chev'));
    let sure = false;
    const del = h('button', { class: 'linkbtn', type: 'button', onclick: () => {
      if (!sure) { sure = true; del.textContent = 'Wirklich löschen? Nochmal tippen'; del.classList.add('danger'); return; }
      S.tests = tests().filter(x => x.id !== t.id); save(); go(plan, 'plan');
    } }, 'Test löschen');
    view().append(
      h('div', { class: 'topline' }, backBtn(() => go(plan, 'plan'))),
      h('header', { class: 'shd', style: '--c:' + sub.color }, tileIco(sub.icon, 'lg'),
        h('div', { class: 'grow' }, h('h1', null, t.title), h('p', { class: 'lead' }, sub.title + ' · ' + niceDate(t))),
        r.has ? LA.ring(r.pct, { size: 58, stroke: 7, color: sub.color }) : ''),
      h('section', { class: 'card countdown', style: '--c:' + sub.color },
        h('div', { class: 'big' }, n >= 0 ? (n === 0 ? 'Heute' : n) : '–'), h('div', { class: 'grow' }, h('strong', null, n >= 0 ? (n === 0 ? 'Test ist heute. Viel Erfolg!' : n === 1 ? 'Tag bis zum Test' : 'Tage bis zum Test') : 'Dieser Test war ' + when(t).toLowerCase()),
          h('small', null, r.has ? (left > 0 && n > 0 ? 'Noch ' + left + ' Karten sicher lernen, das sind etwa ' + perDay + ' pro Tag.' : left > 0 ? 'Noch ' + left + ' Karten nicht sicher.' : 'Alles sicher gelernt. Stark!') : 'Verknüpfe unten Themen aus der App.'))),
      t.stoff ? h('section', { class: 'card info' }, h('h3', null, 'Stoff'), h('p', { class: 'stoff' }, t.stoff)) : '',
      ds.length ? head('Themen für den Test') : '', ds.length ? h('div', { class: 'list' }, byWeak.map(deckRow)) : '',
      h('button', { class: 'linkbtn', type: 'button', onclick: () => go(() => form(t), 'plan') }, ds.length ? 'Stoff und Themen ändern' : 'Stoff und Themen eintragen'),
      del,
      ds.length ? h('div', { class: 'dock plain' }, h('button', { class: 'cta', type: 'button', onclick: () => go(() => ui.deck(via(weakest))) },
        'Schwächstes Thema üben')) : '');
  }

  // ---------- Eintragen und ändern ----------
  function form(old) {
    const f = old ? { ...old, decks: (old.decks || []).slice() } : { id: newId(), subj: (SUBJECTS[0] || {}).id, title: '', date: '', stoff: '', decks: [] };
    const err = h('p', { class: 'formerr', role: 'alert' });
    const title = h('input', { type: 'text', placeholder: 'z. B. 1st Check-Up', value: f.title, maxlength: 60, oninput: e => { f.title = e.target.value; } });
    const date = h('input', { type: 'date', value: f.date, oninput: e => { f.date = e.target.value; } });
    const stoff = h('textarea', { rows: 4, placeholder: 'Was kommt dran? z. B. Unit 1 und 2, Present Simple', oninput: e => { f.stoff = e.target.value; } });
    stoff.value = f.stoff;
    const chips = h('div', { class: 'chips' }), picks = h('div', { class: 'list' });
    const drawChips = () => chips.replaceChildren(...SUBJECTS.map(s => h('button', { type: 'button', class: 'chipb' + (f.subj === s.id ? ' on' : ''), style: '--c:' + s.color,
      onclick: () => { f.subj = s.id; drawChips(); drawPicks(); } }, s.icon + ' ' + s.title)));
    const drawPicks = () => {
      const ds = decksOf(SUBJECTS.find(s => s.id === f.subj) || {});
      picks.replaceChildren(...(ds.length ? ds : []).map(d => {
        const on = f.decks.includes(d.id);
        return h('button', { type: 'button', class: 'pickrow' + (on ? ' on' : ''), 'aria-pressed': String(on), onclick: e => {
          const i = f.decks.indexOf(d.id); if (i < 0) f.decks.push(d.id); else f.decks.splice(i, 1);
          const b = e.currentTarget; b.classList.toggle('on', i < 0); b.setAttribute('aria-pressed', String(i < 0));
        } }, tileIco(d.icon), h('span', { class: 'grow' }, d.title, h('small', null, d.cards.length + ' Karten')), h('i', { class: 'tick' }, svg('check')));
      }));
      if (!ds.length) picks.append(h('p', { class: 'empty' }, 'Zu diesem Fach gibt es noch keine Themen. Schreib den Stoff oben ins Textfeld.'));
    };
    drawChips(); drawPicks();
    const field = (label, el) => h('label', { class: 'field' }, h('span', null, label), el);
    view().append(
      h('div', { class: 'topline' }, backBtn(() => go(() => old ? test(old) : plan(), 'plan'))),
      h('h1', { class: 'ttl' }, old ? 'Test ändern' : 'Neuer Test'),
      h('div', { class: 'fields', style: 'margin-top:16px' },
        field('Name', title), h('div', { class: 'field' }, h('span', null, 'Fach'), chips), field('Datum', date), field('Stoff (Text)', stoff)),
      head('Themen aus der App'), h('p', { class: 'lead', style: 'margin:-6px 0 12px' }, 'Tippe an, was zum Test gehört. Dafür kannst du dann gezielt üben.'), picks,
      err,
      h('div', { class: 'dock plain' }, h('button', { class: 'cta', type: 'button', onclick: () => {
        f.title = f.title.trim();
        if (!f.title) { err.textContent = 'Gib dem Test einen Namen.'; title.focus(); return; }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(f.date)) { err.textContent = 'Wähle ein Datum.'; return; }
        if (old) Object.assign(old, f); else tests().push(f);
        save(); go(() => test(old || f), 'plan');
      } }, 'Speichern')));
  }

  Object.assign(ui, { plan, test, testForm: form });
})();
