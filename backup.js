// Lernapp, Teil 7: Sicherung. Den ganzen Stand als Datei speichern und auf einem anderen Handy wieder einlesen.
(() => {
  'use strict';
  const LA = window.LA;
  const { h, S, save, tileIco } = LA;
  const ui = LA.ui;
  const KEYS = ['xp', 'last', 'streak', 'cards', 'best', 'opts', 'recent', 'fixed', 'layout', 'theme', 'got', 'stats', 'day', 'week', 'maxStreak', 'name', 'tests', 'notes', 'seeded', 'lastBackup', 'freeze', 'mine', 'open', 'fs', 'srs', 'srs2', 'read'];
  const isObj = v => v && typeof v === 'object' && !Array.isArray(v);

  // Nur bekannte Felder mit passendem Typ übernehmen. Alles andere wird verworfen.
  function clean(d) {
    if (!isObj(d) || typeof d.xp !== 'number' || !isFinite(d.xp) || d.xp < 0 || !isObj(d.cards)) return null;
    const out = {};
    for (const k of KEYS) if (k in d) out[k] = d[k];
    for (const k of ['cards', 'best', 'opts', 'got', 'stats', 'mine', 'open', 'read']) if (k in out && !isObj(out[k])) delete out[k];
    for (const k of ['recent', 'tests', 'notes']) if (k in out && !Array.isArray(out[k])) delete out[k];
    for (const k of ['name', 'theme', 'layout', 'last']) if (k in out && typeof out[k] !== 'string') delete out[k];
    if (out.name) out.name = out.name.slice(0, 24);
    return out;
  }

  const stamp = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const ago = t => { if (!t) return 'noch nie gesichert'; const n = Math.floor((Date.now() - t) / 864e5); return n <= 0 ? 'heute gesichert' : n === 1 ? 'gestern gesichert' : 'vor ' + n + ' Tagen gesichert'; };

  async function exportFile(msg) {
    S.lastBackup = Date.now(); save();
    const name = 'lernapp-' + (S.name || 'stand').toLowerCase().replace(/[^a-z0-9äöüß-]+/g, '-') + '-' + stamp() + '.json';
    const file = new File([JSON.stringify({ app: 'lernapp', version: 1, saved: new Date().toISOString(), data: S }, null, 1)], name, { type: 'application/json' });
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: 'Lernapp Sicherung' }); msg('Sicherung bereit. Speichere sie in Dateien oder schick sie dir selbst.'); return; }
    } catch (e) { if (e && e.name === 'AbortError') { msg(''); return; } }
    const a = h('a', { href: URL.createObjectURL(file), download: name });
    document.body.append(a); a.click(); a.remove();
    msg('Sicherung heruntergeladen: ' + name);
  }

  function readFile(f, msg, ask) {
    const r = new FileReader();
    r.onerror = () => msg('Die Datei konnte nicht gelesen werden.');
    r.onload = () => {
      let p; try { p = JSON.parse(r.result); } catch (e) { msg('Das ist keine Lernapp-Sicherung.'); return; }
      const d = p && p.app === 'lernapp' ? clean(p.data) : null;
      if (!d) { msg('Das ist keine Lernapp-Sicherung.'); return; }
      ask(d, p.saved);
    };
    r.readAsText(f.slice(0, 5e6));
  }

  ui.backupCard = () => {
    const note = h('p', { class: 'bk-msg', role: 'status' }), confirm = h('div', { class: 'bk-confirm' });
    const msg = t => { note.textContent = t; };
    const pick = h('input', { type: 'file', accept: '.json,application/json', hidden: true, onchange: e => { const f = e.target.files[0]; e.target.value = ''; if (f) readFile(f, msg, ask); } });
    const status = h('small', null, ago(S.lastBackup));
    function ask(d, saved) {
      const lv = LA.levelInfo(d.xp), when = saved ? new Date(saved).toLocaleDateString('de-AT') : '';
      confirm.replaceChildren(
        h('p', null, h('strong', null, 'Sicherung von ' + (d.name || 'unbekannt')), h('br'), 'Level ' + lv.lvl + ' · ' + d.xp + ' XP' + (when ? ' · gespeichert am ' + when : '')),
        h('p', { class: 'lead' }, 'Dein jetziger Stand auf diesem Handy wird dabei ersetzt.'),
        h('div', { class: 'bk-row' },
          h('button', { class: 'cta ghost', type: 'button', onclick: () => { confirm.replaceChildren(); msg(''); } }, 'Abbrechen'),
          h('button', { class: 'cta', type: 'button', onclick: () => { LA.restore(d); location.reload(); } }, 'Ersetzen')));
    }
    return h('section', { class: 'card backup' },
      h('div', { class: 'bk-head' }, tileIco('💾'), h('span', { class: 'grow' }, h('strong', null, 'Sicherung'), status)),
      h('p', { class: 'lead' }, 'Speichere deinen Stand als Datei. Auf einem neuen Handy liest du ihn wieder ein.'),
      h('div', { class: 'bk-row' },
        h('button', { class: 'cta', type: 'button', onclick: () => exportFile(msg).then(() => { status.textContent = ago(S.lastBackup); }) }, 'Sichern'),
        h('button', { class: 'cta ghost', type: 'button', onclick: () => pick.click() }, 'Einlesen')),
      pick, note, confirm);
  };
})();
