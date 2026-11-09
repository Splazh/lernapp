// auto_generated: false
// Versioned, dependency-free validation shared by startup and backup import.
(() => {
  'use strict';
  const obj = x => !!x && typeof x === 'object' && !Array.isArray(x);
  const str = x => typeof x === 'string';
  const id = x => str(x) && /^[a-zA-Z0-9_-]{1,100}$/.test(x) && !['__proto__', 'constructor', 'prototype'].includes(x);
  const num = x => Number.isSafeInteger(x) && x >= 0 && x <= Number.MAX_SAFE_INTEGER;
  const strings = x => Array.isArray(x) && x.every(str);
  const safe = (x, depth = 0) => depth <= 20 && (x === null || str(x) || typeof x === 'boolean' || typeof x === 'number' && Number.isFinite(x) ||
    Array.isArray(x) && x.length <= 50000 && x.every(v => safe(v, depth + 1)) || obj(x) && Object.entries(x).every(([k, v]) => !['__proto__', 'prototype', 'constructor'].includes(k) && safe(v, depth + 1)));
  const card = r => Array.isArray(r) && r.length >= 2 && str(r[1]) && str(r[0]) && r[0].length <= 2000 && r.slice(1).every((v, i, a) => str(v) || i === a.length - 1 && obj(v) &&
    (!('id' in v) || id(v.id)) && (!('w' in v) || strings(v.w)) && (!('e' in v) || str(v.e)) && (!('img' in v) || str(v.img) && /^data:image\/(jpeg|png|webp);base64,/.test(v.img)));
  const reading = r => obj(r) && str(r.lead) && Array.isArray(r.sections) && r.sections.every(s => obj(s) && str(s.h) && strings(s.p)) &&
    (!r.check || Array.isArray(r.check) && r.check.every(p => Array.isArray(p) && p.length === 2 && p.every(str)));
  const topic = t => obj(t) && id(t.id) && ['englisch', 'deutsch', 'mathe', 'spanisch', 'geografie', 'ethik', 'informatik'].includes(t.subject) && str(t.title) && Array.isArray(t.cards) && t.cards.every(card) && (!t.reading || reading(t.reading));
  function state(d) {
    if (!obj(d) || !safe(d) || !num(d.xp) || d.xp > 1e7 || !obj(d.cards)) return null;
    const numeric = ['streak', 'fixed', 'maxStreak', 'freeze', 'lastBackup', 'hintSnooze'];
    if (numeric.some(k => k in d && !num(d[k]))) return null;
    if (['name', 'last'].some(k => k in d && !str(d[k]))) return null;
    if (d.theme && !['light', 'dark', 'auto'].includes(d.theme) || d.fs && !['normal', 'large', 'xl'].includes(d.fs)) return null;
    if (Object.values(d.cards).some(deck => !obj(deck) || Object.values(deck).some(c => !obj(c) || !num(c.box) || c.box > 4 || !num(c.seen) || !num(c.right) ||
      ['nd', 'due', 'lastOk', 'lastAdvance', 'recall', 'recognition'].some(k => k in c && !num(c[k]))))) return null;
    if (d.tests && (!Array.isArray(d.tests) || d.tests.some(t => !obj(t) || !str(t.id) || !str(t.title) || !str(t.subj) || !/^\d{4}-\d{2}-\d{2}$/.test(t.date) || !strings(t.decks || []) || !strings(t.skip || [])))) return null;
    if (d.notes && (!Array.isArray(d.notes) || d.notes.some(n => !obj(n) || !str(n.id) || !str(n.title) || !str(n.text) || !str(n.subj) || !num(n.t)))) return null;
    for (const k of ['best', 'opts', 'got', 'stats', 'mine', 'open', 'read', 'cardKeys', 'journey']) if (k in d && !obj(d[k])) return null;
    if (d.mine && Object.values(d.mine).some(a => !Array.isArray(a) || !a.every(card))) return null;
    if (d.topics && (!Array.isArray(d.topics) || !d.topics.every(topic) || new Set(d.topics.map(t => t.id)).size !== d.topics.length)) return null;
    if (d.topics && d.topics.some(t => (window.DECKS || []).some(deck => !deck.mine && deck.id === t.id))) return null;
    for (const k of ['recent', 'hiddenSubjects', 'hiddenDecks']) if (k in d && !strings(d[k])) return null;
    if (d.open && Object.values(d.open).some(r => !obj(r) || ['pts', 'max', 'date'].some(k => k in r && !num(r[k])) || 'draft' in r && !str(r.draft))) return null;
    if (d.opts && Object.values(d.opts).some(o => !obj(o) || 'skip' in o && (!num(o.skip) || o.skip > 10))) return null;
    if (d.read && Object.values(d.read).some(v => !num(v))) return null;
    if (d.cardKeys && Object.values(d.cardKeys).some(v => !strings(v))) return null;
    if (d.minutes && ![5, 10, 15, 20].includes(d.minutes)) return null;
    if (d.journey && Object.keys(d.journey).length && (!Array.isArray(d.journey.items) || d.journey.items.some(x => !obj(x) || !id(x.deck) || !str(x.key)) || !num(d.journey.index) || !num(d.journey.correct) || !['read', 'understand', 'cards', 'done'].includes(d.journey.stage))) return null;
    if (d.examHistory && (!Array.isArray(d.examHistory) || d.examHistory.some(x => !obj(x) || !str(x.title) || !['date', 'points', 'max', 'pct'].every(k => num(x[k]))))) return null;
    for (const k of ['day', 'week']) if (d[k] != null) {
      const x = d[k], daily = k === 'day';
      if (!obj(x) || !str(x[daily ? 'd' : 'w']) || !strings(x.subj) || !['right', 'rounds'].every(n => num(x[n]))) return null;
      if (daily && (!['ans', 'perfect', 'fixed'].every(n => num(x[n])) || !obj(x.modes) || !obj(x.claimed))) return null;
      if (!daily && !strings(x.days)) return null;
    }
    for (const k of ['best', 'got']) if (d[k] && Object.values(d[k]).some(v => !num(v))) return null;
    // Version 32 could serialize uninitialized statistics as null. Normalize these counters.
    const normalized = JSON.parse(JSON.stringify(d));
    if (normalized.stats) for (const k of ['rounds', 'perfect', 'early', 'late']) if (!num(normalized.stats[k])) normalized.stats[k] = 0;
    // Preserve compatible extension fields; reject unsafe/non-JSON values above.
    return normalized;
  }
  window.LASchema = { state, card, topic, reading, safe, version: 2 };
})();
