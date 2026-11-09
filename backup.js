// Lernapp, Teil 7: Sicherung. Den ganzen Stand als Datei speichern und auf einem anderen Handy wieder einlesen.
(() => {
  'use strict';
  const LA = window.LA;
  const { h, S, save, tileIco } = LA;
  const ui = LA.ui;
  const clean = d => window.LASchema.state(d);

  const stamp = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const ago = t => { if (!t) return 'noch nie gesichert'; const n = Math.floor((Date.now() - t) / 864e5); return n <= 0 ? 'heute gesichert' : n === 1 ? 'gestern gesichert' : 'vor ' + n + ' Tagen gesichert'; };

  async function exportFile(msg) {
    const now = Date.now();
    const name = 'lernapp-' + (S.name || 'stand').toLowerCase().replace(/[^a-z0-9äöüß-]+/g, '-') + '-' + stamp() + '.json';
    const file = new File([JSON.stringify({ app: 'lernapp', version: 2, saved: new Date().toISOString(), data: { ...S, lastBackup: now } }, null, 1)], name, { type: 'application/json' });
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Lernapp Sicherung' });
        S.lastBackup = now; save(); msg('Sicherung übergeben. Prüfe, dass die Datei am gewählten Ort liegt.'); return true;
      }
    } catch (e) { if (e && e.name === 'AbortError') { msg('Sicherung abgebrochen.'); return false; } }
    const url = URL.createObjectURL(file), a = h('a', { href: url, download: name });
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 30000);
    // A browser download is not proof that the user saved the file.
    msg('Download gestartet. Bestätige unten erst, wenn die Datei gespeichert ist.'); return 'download';
  }

  function readFile(f, msg, ask) {
    const r = new FileReader();
    r.onerror = () => msg('Die Datei konnte nicht gelesen werden.');
    r.onload = () => {
      let p; try { p = JSON.parse(r.result); } catch (e) { msg('Das ist keine Lernapp-Sicherung.'); return; }
      const d = p && p.app === 'lernapp' && [1, 2].includes(p.version) ? clean(p.data) : null;
      if (!d) { msg('Das ist keine Lernapp-Sicherung.'); return; }
      ask(d, p.saved);
    };
    if (f.size > 30e6) { msg('Diese Sicherung ist größer als 30 MB. Sie wurde nicht eingelesen.'); return; }
    r.readAsText(f);
  }

  LA.backup = { clean, exportFile, readFile };
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
          h('button', { class: 'cta', type: 'button', onclick: () => { if (LA.restore(d)) location.reload(); else msg('Nicht wiederhergestellt. Dein bisheriger Stand wurde nicht ersetzt.'); } }, 'Ersetzen')));
    }
    return h('section', { class: 'card backup' },
      h('div', { class: 'bk-head' }, tileIco('💾'), h('span', { class: 'grow' }, h('strong', null, 'Sicherung'), status)),
      h('p', { class: 'lead' }, 'Speichere deinen Stand als Datei. Auf einem neuen Handy liest du ihn wieder ein.'),
      h('div', { class: 'bk-row' },
        h('button', { class: 'cta', type: 'button', onclick: () => exportFile(msg).then(result => { status.textContent = ago(S.lastBackup); if (result === 'download') confirm.replaceChildren(h('button', { class: 'cta', type: 'button', onclick: () => { S.lastBackup = Date.now(); save(); status.textContent = ago(S.lastBackup); confirm.replaceChildren(); msg('Als gesichert bestätigt.'); } }, 'Datei ist gespeichert')); }) }, 'Sichern'),
        h('button', { class: 'cta ghost', type: 'button', onclick: () => pick.click() }, 'Einlesen')),
      pick, note, confirm);
  };
})();
