// auto_generated: false
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { app } = require('./harness.cjs');
const multi = L => L.DECKS.filter(d => d.subject === 'englisch').flatMap(d => L.cardsOf(d).filter(c => (c.q.match(/___/g) || []).length > 1).map(c => ({ d, c })));

test('all five English multi-gap cards require every answer in order', () => {
  const { L } = app(); const cards = multi(L); assert.equal(cards.length, 5);
  for (const { d, c } of cards) {
    assert.equal(c.a.length, (c.q.match(/___/g) || []).length, c.q);
    const right = L.ans(d, c).map(a => L.splitVar(a)[0]);
    assert.equal(L.matches(d, c, right.join(' – ')), true, c.q);
    for (const part of right) assert.equal(L.matches(d, c, part), false, c.q);
    assert.equal(L.matches(d, c, [...right].reverse().join(' – ')), false, c.q);
    assert.equal(L.options(d, c).filter(x => L.matches(d, c, x)).length, 1, c.q);
    assert.deepEqual(Array.from(L.labels(d, c)), ['Lücke 1', 'Lücke 2']);
    const explanation = L.explainLines(d, c).find(x => x.startsWith('Ganzer Satz:'));
    if (explanation) { assert.ok(!explanation.includes('___')); right.forEach(x => assert.ok(explanation.includes(x))); }
  }
  const { d, c } = cards.find(({ c }) => c.q.startsWith('I ___'));
  assert.equal(L.matches(d, c, 'tried – did not want'), true);
  assert.equal(L.matches(d, c, 'tried – didn’t want'), true);
});

for (const mode of ['type', 'gap']) for (const valid of [true, false]) {
  test(`${mode}: ${valid ? 'both correct' : 'one missing'} is graded once, for every affected card`, () => {
    const { L, view } = app();
    for (const { d, c } of multi(L)) {
      L.go(() => (mode === 'type' ? L.kit.type : L.modes.gap)(d, c, 1, 0, () => {}));
      const inputs = view.querySelectorAll('input'); assert.equal(inputs.length, 2, c.q);
      inputs[0].value = L.splitVar(c.a[0])[0]; inputs[1].value = valid ? L.splitVar(c.a[1])[0] : '';
      const button = view.querySelectorAll('button').find(b => b.textContent === 'Prüfen');
      button.click(); button.click();
      assert.equal(L.st(d, c).seen, 1); assert.equal(L.st(d, c).right, valid ? 1 : 0);
      assert.equal(view.querySelector('.dock').classList.contains(valid ? 'good' : 'bad'), true);
      if (mode === 'gap') { assert.equal(view.querySelectorAll('.blank').length, 2); assert.ok(view.querySelector('.cz').textContent.includes(' ')); }
    }
  });
}

for (const complete of [true, false]) test(`exam grades ${complete ? 'both answers' : 'one missing answer'} using separate fields`, () => {
  const { L, view } = app(); const pair = multi(L)[0];
  L.testDecks = () => [{ ...pair.d, cards: [pair.d.cards[pair.c.i]] }];
  L.exam({ title: 'Gap regression', subj: 'englisch', decks: [pair.d.id] });
  view.querySelectorAll('button').find(b => b.textContent === 'Probetest beginnen').click();
  const inputs = view.querySelectorAll('input'); assert.equal(inputs.length, 2);
  pair.c.a.forEach((a, k) => { inputs[k].value = k === 1 && !complete ? '' : L.splitVar(a)[0]; inputs[k].fire('input'); });
  view.querySelectorAll('button').find(b => b.textContent === 'Abgeben').click();
  assert.equal(L.S.examHistory.at(-1).points, complete ? 1 : 0);
});
