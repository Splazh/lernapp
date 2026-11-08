// Lernapp, Teil 11: Wortbank (Lückensätze mit Wortkasten, zwei Wörter sind zu viel wie beim Banked gap fill) und Sicherungs-Erinnerung.
(() => {
  'use strict';
  const LA = window.LA;
  const { h, S, go, view, cardsOf, base, shuffle, splitVar, fieldOk, ans, tileIco, svg } = LA;
  const K = LA.kit, ui = LA.ui;
  LA.rounds = LA.rounds || {};
  const gap = c => c.q.includes('___') && c.a.length === 1;
  const clean = q => q.replace(/\s*\[[^\]]+\]\s*$/, '');
  LA.hasBank = d => cardsOf(base(d)).filter(gap).length >= 6;

  LA.rounds.bank = d => {
    const picked = LA.pick(d, 60).filter(gap).slice(0, 6);
    if (picked.length < 4) return LA.goBack(d);
    const first = c => splitVar(ans(d, c)[0])[0];
    const right = picked.map(first);
    const extra = shuffle(cardsOf(base(d)).filter(gap).map(first).filter(t => !right.includes(t))).filter((t, i, a) => a.indexOf(t) === i).slice(0, 2);
    const chips = shuffle([...right, ...extra]).map((t, i) => ({ id: i, t }));
    const placed = picked.map(() => null);   // Chip-ID je Lücke
    let sel = null, checked = false;
    const body = h('div'), dockEl = h('div');
    const free = () => chips.filter(c => !placed.includes(c.id));
    function draw() {
      body.replaceChildren(
        h('p', { class: 'pairhint' }, 'Tippe ein Wort an und dann die Lücke. Zwei Wörter sind zu viel.'),
        h('div', { class: 'bank' }, free().map(c => h('button', { class: 'chipw' + (sel === c.id ? ' sel' : ''), type: 'button', disabled: checked, onclick: () => { sel = sel === c.id ? null : c.id; draw(); } }, c.t))),
        h('div', { class: 'gaps' }, picked.map((c, k) => {
          const [a, b] = clean(c.q).split('___'), ch = chips.find(x => x.id === placed[k]);
          const ok = checked && ch && fieldOk(ch.t, ans(d, c)[0]);
          return h('p', { class: 'gapline' }, a, h('button', { class: 'slot' + (ch ? ' full' : '') + (checked ? (ok ? ' ok' : ' no') : ''), type: 'button', disabled: checked, 'aria-label': 'Lücke ' + (k + 1),
            onclick: () => { if (sel != null) { placed[k] = sel; sel = null; } else placed[k] = null; draw(); } }, ch ? ch.t : '___'), b || '',
          checked && !ok ? h('em', { class: 'sol' }, ' ' + splitVar(ans(d, c)[0]).join(' oder ')) : '');
        })));
      const full = placed.every(x => x != null);
      dockEl.replaceChildren(checked ? h('button', { class: 'cta', type: 'button', onclick: fin }, 'Weiter') : h('button', { class: 'cta', type: 'button', disabled: !full, onclick: check }, full ? 'Prüfen' : 'Fülle alle Lücken'));
    }
    function check() {
      checked = true; let n = 0;
      picked.forEach((c, k) => { const ch = chips.find(x => x.id === placed[k]), ok = !!ch && fieldOk(ch.t, ans(d, c)[0]); if (ok) n++; LA.rate(d, c, ok); });
      LA.bank = n; draw();
    }
    function fin() { go(() => K.finish(d, LA.bank, picked.length, 'bank')); }
    view.append(h('div', { class: 'qtop' }, h('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Beenden', onclick: K.leave(d) }, svg('close')), h('div', { class: 'track' }, h('i', { style: 'width:100%' }))), body, h('div', { class: 'dock plain' }, dockEl));
    draw();
  };

  // Hinweis auf der Startseite, wenn die letzte Sicherung lange her ist (nur wenn schon etwas gelernt wurde)
  ui.backupHint = () => {
    const days = S.lastBackup ? Math.floor((Date.now() - S.lastBackup) / 864e5) : 99;
    if (S.xp < 150 || days < 7 || (S.hintSnooze && Date.now() - S.hintSnooze < 3 * 864e5)) return '';
    return h('button', { class: 'nexttest', type: 'button', style: '--c:#FFD166', onclick: () => { S.hintSnooze = Date.now(); LA.save(); go(() => ui.profile(), 'profile'); } },
      h('span', { class: 'dateblock' }, h('b', null, '💾')),
      h('span', { class: 'grow' }, h('strong', null, 'Sicherung fällig'), h('small', null, S.lastBackup ? 'Zuletzt vor ' + days + ' Tagen. Tippe zum Sichern.' : 'Noch nie gesichert. Tippe zum Sichern.')), svg('chevron', 'chev'));
  };
})();
