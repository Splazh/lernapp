// auto_generated: false
process.env.TZ = 'Europe/Vienna';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { app, root } = require('./harness.cjs');
const fresh = extra => ({ xp: 0, cards: {}, name: 'Test', ...extra });
const sample = () => ({ id: 'demo', subject: 'englisch', labels: ['Antwort'], cards: [['One', 'eins'], ['Two', 'zwei']] });

test('all production scripts boot, routes render and current state passes validation', () => {
  const a = app({ state: fresh() });
  for (const route of ['home', 'practice', 'profile', 'plan', 'notes', 'selection', 'search']) { a.L.go(a.L.ui[route], 'learn'); assert.ok(a.view.children.length, route); }
  for (const s of a.L.SUBJECTS) a.L.go(() => a.L.ui.subject(s), 'learn');
  for (const d of a.L.DECKS) { a.L.go(() => a.L.ui.deck(d)); if (a.L.hasRead(d)) a.L.go(() => a.L.ui.read(d)); }
  assert.ok(a.ctx.LASchema.state(JSON.parse(JSON.stringify(a.L.S))));
});
test('four correct answers on one day advance once; later days advance independently', () => {
  const a = app({ all: false }), d = sample(), c = a.L.cardsOf(d)[0];
  for (let i = 0; i < 4; i++) a.L.rate(d, c, true, false, 'recall');
  assert.equal(a.L.st(d, c).box, 1); assert.equal(a.L.st(d, c).due - a.L.dnum(), 1); assert.equal(a.L.st(d, c).nd, 1);
  a.advance(86400000); a.L.rate(d, c, true); assert.equal(a.L.st(d, c).box, 2);
  a.advance(86400000); a.L.rate(d, c, true); assert.equal(a.L.sure(a.L.st(d, c)), true);
});
test('wrong answers remain due today and cannot regain multiple levels that day', () => {
  const a = app({ all: false }), d = sample(), c = a.L.cardsOf(d)[0];
  a.L.rate(d, c, true); a.L.rate(d, c, false); a.L.rate(d, c, true);
  assert.equal(a.L.st(d, c).box, 0); assert.equal(a.L.isDue(a.L.st(d, c)), true);
});
test('recognition, recall and guessing are counted separately', () => {
  const a = app({ all: false }), d = sample(), c = a.L.cardsOf(d)[0];
  a.L.rate(d, c, true, true); assert.equal(a.L.st(d, c).box, 0);
  a.L.rate(d, c, true); a.L.rate(d, c, true, false, 'recall');
  assert.equal(a.L.st(d, c).recognition, 1); assert.equal(a.L.st(d, c).recall, 1);
});
test('streak uses local midnight including DST transitions', () => {
  const a = app({ all: false, date: '2026-10-24T22:30:00Z' });
  a.L.bump(); assert.equal(a.L.S.last, '2026-10-25');
  a.advance(25 * 3600000); a.L.bump(); assert.equal(a.L.S.last, '2026-10-26'); assert.equal(a.L.S.streak, 2);
});
test('streak freeze preserves one missed day exactly once', () => {
  const a = app({ all: false, state: fresh({ last: '2026-11-07', streak: 5, freeze: 1 }) });
  a.L.bump(); a.L.bump(); assert.equal(a.L.S.streak, 6); assert.equal(a.L.S.freeze, 0);
});
test('stable card progress survives reorder, insertion and metadata changes', () => {
  const a = app({ all: false }), d = sample();
  a.L.rate(d, a.L.cardsOf(d)[0], true);
  d.cards.reverse(); d.cards.unshift(['Three', 'drei']); d.cards[2].push({ e: 'Example' });
  assert.equal(a.L.st(d, a.L.cardsOf(d)[2]).seen, 1); assert.equal(a.L.st(d, a.L.cardsOf(d)[0]).seen, 0);
});
test('legacy numeric progress migrates without dropping records', () => {
  const a = app({ all: false, state: fresh({ cards: { demo: { 0: { box: 2, seen: 3, right: 2 } } } }) }), d = sample();
  a.L.migrateCards(d); assert.equal(a.L.st(d, a.L.cardsOf(d)[0]).seen, 3); assert.equal(a.L.S.cards.demo[0], undefined);
});
test('storage failure is visible, returns false and does not overwrite old data', () => {
  const a = app({ state: fresh(), all: false }); const before = a.stored(); a.fail(true); a.L.S.xp = 10;
  assert.equal(a.L.save(), false); assert.equal(a.stored(), before); assert.match(a.body.textContent, /Nicht auf diesem Gerät gespeichert/);
  a.fail(false); assert.equal(a.L.save(), true); assert.equal(a.body.querySelector('#storage-warning'), null);
});
test('corrupted local state is preserved rather than silently overwritten', () => {
  const a = app({ state: '{broken' }); assert.equal(a.stored(), '{broken'); assert.equal(a.L.save(), false); assert.match(a.body.textContent, /nicht überschrieben/);
});
test('restore is validated and transactional on quota failure', () => {
  const a = app({ state: fresh(), all: false }); const before = a.stored(); a.fail(true);
  assert.equal(a.L.restore(fresh({ xp: 30 })), false); assert.equal(a.L.S.xp, 0); assert.equal(a.stored(), before);
  a.fail(false); assert.equal(a.L.restore(fresh({ xp: 30 })), true); assert.equal(a.L.S.xp, 30);
});
test('backup rejects malformed nested cards, topics, notes and unsafe keys', () => {
  const { ctx } = app({ all: false });
  for (const extra of [{ cards: { d: null } }, { cards: { d: { 0: { box: 99, seen: 2, right: 1 } } } }, { topics: [{ id: 'x', cards: null }] }, { notes: [{ title: 'bad' }] }, { xp: 1e100 }]) assert.equal(ctx.LASchema.state(fresh(extra)), null);
  assert.equal(ctx.LASchema.state(JSON.parse('{"xp":0,"cards":{},"__proto__":{}}')), null);
});
test('cancelled share does not update backup timestamp', async () => {
  const a = app({ state: fresh() });
  a.ctx.navigator.canShare = () => true; a.ctx.navigator.share = async () => { throw { name: 'AbortError' }; };
  assert.equal(await a.L.backup.exportFile(() => {}), false); assert.equal(a.L.S.lastBackup, undefined);
});
test('successful share marks backup; ordinary download requires confirmation', async () => {
  const a = app({ state: fresh() });
  assert.equal(await a.L.backup.exportFile(() => {}), 'download'); assert.equal(a.L.S.lastBackup, undefined);
  a.ctx.navigator.canShare = () => true; a.ctx.navigator.share = async () => {};
  assert.equal(await a.L.backup.exportFile(() => {}), true); assert.ok(a.L.S.lastBackup);
});
test('backup round-trip retains topics, images, notes, selections and results', () => {
  const a = app({ state: fresh({ topics: [{ id: 'own-demo', title: 'Topic', subject: 'mathe', cards: [['Q', 'A', { id: 'card-id', img: 'data:image/jpeg;base64,AA==' }]] }], hiddenDecks: ['ma-brueche'], notes: [{ id: 'n', subj: 'mathe', title: 'N', text: 'Text', t: 1 }] }) });
  const data = JSON.parse(JSON.stringify(a.L.S)); const b = app({ all: false }); assert.equal(b.L.restore(data), true); assert.deepEqual(JSON.parse(JSON.stringify(b.L.S.topics)), data.topics);
});
test('personal course migrations no longer change custom test dates or topics', () => {
  const t = { id: 'custom', subj: 'geografie', title: 'Mein Test', date: '2026-11-27', decks: ['geo-karten'] };
  const a = app({ state: fresh({ tests: [t], seeded: true }) }); assert.deepEqual(JSON.parse(JSON.stringify(a.L.S.tests[0])), t);
});
test('all subjects hidden has an actionable empty state; no crash', () => {
  const a = app({ state: fresh() }); a.L.S.hiddenSubjects = a.L.SUBJECTS.map(s => s.id); a.L.go(a.L.ui.home, 'learn');
  assert.equal(a.L.activeDecks().length, 0); assert.match(a.view.textContent, /Lernstoff auswählen/); assert.equal(a.L.journey.plan().length, 0);
});
test('search includes own cards and excludes hidden topics', () => {
  const a = app({ state: fresh({ topics: [{ id: 'own', title: 'Custom', subject: 'mathe', cards: [['UniqueNeedle', 'Answer']] }] }) });
  a.L.go(a.L.ui.search, 'learn'); const input = a.view.querySelector('input'); input.value = 'uniqueneedle'; input.fire('input'); assert.match(a.view.textContent, /Custom/);
  a.L.S.hiddenDecks = ['own']; input.fire('input'); assert.match(a.view.textContent, /Keine Treffer/);
});
test('explanations are available outside the wrong-answer filter', () => {
  const a = app({ state: fresh() }), d = a.L.DECKS.find(d => d.id === 'ma-brueche'), c = a.L.cardsOf(d)[0];
  assert.ok(a.L.kit.explainBox(d, c)); assert.match(a.L.kit.explainBox(d, c).textContent, /Warum/);
});
test('legacy own cards appear as an editable topic with learning progress', () => {
  const a = app({ state: fresh({ mine: { mathe: [['Q', 'A']] }, cards: { 'mine-mathe': { 0: { box: 1, seen: 2, right: 2 } } } }) });
  assert.equal(a.L.S.topics[0].cards[0][0], 'Q'); const d = a.L.DECKS.find(x => x.id === 'mine-mathe'); assert.equal(a.L.st(d, a.L.cardsOf(d)[0]).seen, 2);
  a.L.editTopic(a.L.S.topics[0]); assert.match(a.view.textContent, /Thema bearbeiten/);
});
test('editor changes a card, resets its progress and preserves unaffected cards', () => {
  const a = app({ state: fresh({ topics: [{ id: 'own', subject: 'mathe', title: 'Custom', cards: [['Q', 'A'], ['Other', 'Value']] }] }) });
  const t = a.L.S.topics[0], d = a.L.DECKS.find(d => d.id === 'own'); a.L.rate(d, a.L.cardsOf(d)[0], true); a.L.rate(d, a.L.cardsOf(d)[1], true);
  a.L.editTopic(t); a.button('Bearbeiten').click(); const fields = a.view.querySelectorAll('textarea'); fields[2].value = 'Changed'; fields[3].value = 'New'; a.button('Änderungen speichern').click();
  assert.equal(t.cards[0][0], 'Changed'); assert.equal(a.L.st(d, a.L.cardsOf(d)[0]).seen, 0); assert.equal(a.L.st(d, a.L.cardsOf(d)[1]).seen, 1);
});
test('mixed exam includes open, typed, reading and listening tasks where linked', () => {
  const a = app({ state: fresh() }), tasks = a.L.examBuild({ subj: 'englisch', decks: ['en-family-vocab'] });
  for (const kind of ['type', 'open', 'reading', 'listening']) assert.ok(tasks.some(t => t.kind === kind), kind);
  assert.ok(a.L.examBuild({ subj: 'mathe', decks: ['ma-brueche'] }).every(t => !['listening', 'reading'].includes(t.kind)));
});
test('exam timeout submits once and unanswered work scores zero', () => {
  const a = app({ state: fresh() }), t = { id: 't', title: 'Math', subj: 'mathe', date: '2026-11-10', decks: ['ma-brueche'] };
  a.L.exam(t); a.button('Probetest beginnen').click(); a.advance(3600000); a.tick();
  assert.match(a.view.textContent, /Übungsnote 5/); assert.equal(a.L.S.examHistory.length, 1); assert.equal(a.L.S.examHistory[0].points, 0); a.tick(); assert.equal(a.L.S.examHistory.length, 1);
});
test('guided session advances from explanation to cards and resumes after reload', () => {
  const a = app({ state: fresh() }); a.L.S.hiddenSubjects = a.L.SUBJECTS.filter(s => s.id !== 'mathe').map(s => s.id); a.L.S.minutes = 5;
  a.L.journey.start(); assert.equal(a.L.S.journey.items.length, 4); assert.ok(['read', 'understand'].includes(a.L.S.journey.stage));
  const b = app({ state: JSON.parse(a.stored()) }); assert.deepEqual(JSON.parse(JSON.stringify(b.L.S.journey.items)), JSON.parse(JSON.stringify(a.L.S.journey.items)));
});
test('all script assets are included in offline cache and release versions agree', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8'), sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  for (const [, file] of html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css|webmanifest|svg|png))"/g)) { assert.ok(fs.existsSync(path.join(root, file)), file); assert.ok(sw.includes("'" + file + "'"), file); }
  const core = fs.readFileSync(path.join(root, 'core.js'), 'utf8'); assert.equal(core.match(/version: (\d+)/)[1], sw.match(/lernapp-v(\d+)/)[1]);
});

test('one complete guided recall round persists result and its next due date', () => {
  const a = app({ state: fresh() }), d = a.L.DECKS.find(d => d.id === 'ma-brueche'), c = a.L.cardsOf(d)[0];
  a.L.S.journey = { items: [{ deck: d.id, key: c.key }], index: 0, correct: 0, stage: 'cards', date: a.L.dayStr(Date.now()) };
  a.L.journey.resume(); a.view.querySelector('input').value = c.a[0]; a.button('Prüfen').click(); a.button('Weiter').click();
  assert.equal(a.L.S.journey.stage, 'done'); assert.equal(a.L.S.journey.correct, 1); assert.match(a.view.textContent, /geschafft/);
  assert.equal(a.L.st(d, c).recall, 1); assert.ok(a.ctx.LASchema.state(JSON.parse(a.stored())));
});
test('editor reorder and transfer preserve card progress', () => {
  const a = app({ state: fresh({ topics: [{ id: 'own-a', title: 'A', subject: 'mathe', cards: [['Q', 'A'], ['Other', 'Value']] }, { id: 'own-b', title: 'B', subject: 'mathe', cards: [] }] }) });
  const t = a.L.S.topics[0], d = a.L.DECKS.find(d => d.id === t.id), c = a.L.cardsOf(d)[0]; a.L.rate(d, c, true);
  a.L.editTopic(t); a.button('↓ Nach unten').click(); assert.equal(t.cards[1][0], 'Q'); assert.equal(a.L.st(d, a.L.cardsOf(d)[1]).seen, 1);
  a.button('↑ Nach oben').click(); a.button('Verschieben').click();
  const to = a.L.DECKS.find(d => d.id === 'own-b'); assert.equal(to.cards[0][0], 'Q'); assert.equal(a.L.st(to, a.L.cardsOf(to)[0]).seen, 1);
});
test('duplicate legacy own cards keep independent identities and progress', () => {
  const a = app({ state: fresh({ mine: { mathe: [['Q', 'A'], ['Q', 'A']] }, cards: { 'mine-mathe': { 0: { box: 1, seen: 2, right: 2 }, 1: { box: 0, seen: 1, right: 0 } } } }) });
  const d = a.L.DECKS.find(d => d.id === 'mine-mathe'), cards = a.L.cardsOf(d);
  assert.notEqual(cards[0].key, cards[1].key); assert.equal(a.L.st(d, cards[0]).seen, 2); assert.equal(a.L.st(d, cards[1]).seen, 1);
});
test('topic package preview imports with fresh identities and no private extension fields', async () => {
  const a = app({ state: fresh() }); a.L.go(a.L.ui.selection, 'learn');
  const input = a.view.querySelectorAll('input').find(e => e.getAttribute('type') === 'file');
  input.files = [{ size: 200, text: async () => JSON.stringify({ app: 'lernapp-topic', version: 1, topic: { id: 'own-demo', title: 'Shared', subject: 'mathe', cards: [['Q', 'A']], privateNotes: 'not part of topic' } }) }];
  await input.onchange(); a.button('Thema hinzufügen').click();
  const t = a.L.S.topics.at(-1); assert.equal(t.title, 'Shared'); assert.notEqual(t.id, 'own-demo'); assert.equal(t.privateNotes, undefined); assert.ok(a.ctx.LASchema.state(JSON.parse(a.stored())));
});
test('open exam submissions are self-assessed after all questions, with finite saved stats', () => {
  const a = app({ state: fresh() }), t = { id: 't', title: 'English', subj: 'englisch', date: '2026-11-11', decks: ['en-family-vocab'] };
  a.L.exam(t); a.button('Probetest beginnen').click();
  let limit = 50;
  while (!a.view.textContent.includes('Offene Antworten bewerten') && limit-- > 0) {
    const options = a.view.querySelectorAll('button').filter(e => e.classList.contains('opt'));
    if (options.length) options[0].click();
    const ta = a.view.querySelector('textarea'); if (ta) { ta.value = 'My own answer'; ta.fire('input'); }
    const next = a.view.querySelectorAll('button').find(e => ['Weiter (auch ohne Antwort)', 'Abgeben'].includes(e.textContent)); assert.ok(next); next.click();
  }
  assert.ok(limit > 0); assert.equal(a.L.S.examHistory, undefined);
  const checkbox = a.view.querySelector('input'); checkbox.checked = true; checkbox.fire('change'); a.button('Bewertung abschließen').click();
  assert.match(a.view.textContent, /Übungsnote/); assert.equal(a.L.S.examHistory.length, 1); assert.ok(a.ctx.LASchema.state(JSON.parse(a.stored())));
});
test('legacy null statistics normalize and new answer counters stay numeric', () => {
  const a = app({ state: fresh({ stats: { early: null, late: null } }), date: '2026-11-09T05:00:00Z' }), d = a.L.DECKS[0];
  a.L.rate(d, a.L.cardsOf(d)[0], true); assert.equal(a.L.S.stats.early, 1); assert.ok(a.ctx.LASchema.state(JSON.parse(a.stored())));
});
test('normal answer comparisons keep math decimal and language variants working', () => {
  const a = app({ all: false }); a.L.cfg.mathInput = true; assert.equal(a.L.fieldOk('0,5', '0.5'), true); assert.equal(a.L.fieldOk('1/2', '1/3'), false);
  a.L.cfg.mathInput = false; assert.equal(a.L.fieldOk('gotten', 'got/gotten'), true);
});
