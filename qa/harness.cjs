// auto_generated: false
// Minimal in-memory DOM for deterministic logic/integration tests, not a rendering engine.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
class Element {
  constructor(tag, text = '') { this.tagName = tag.toUpperCase(); this.nodeType = tag === '#text' ? 3 : 1; this.children = []; this.attributes = {}; this.dataset = {}; this.style = {}; this.listeners = {}; this._text = text; this._value = undefined; }
  get className() { return this.attributes.class || ''; } set className(v) { this.attributes.class = v; }
  get id() { return this.attributes.id; } set id(v) { this.attributes.id = v; }
  get parentNode() { return this.parent; }
  get classList() { const e = this; return { contains: c => e.className.split(' ').includes(c), add: c => { if (!e.classList.contains(c)) e.className += ' ' + c; }, remove: c => { e.className = e.className.split(' ').filter(x => x !== c).join(' '); }, toggle: (c, on) => { on = on === undefined ? !e.classList.contains(c) : on; on ? e.classList.add(c) : e.classList.remove(c); return on; } }; }
  get value() { if (this._value !== undefined) return this._value; if (this.tagName === 'SELECT') return (this.children.find(x => x.selected) || this.children[0])?.value || ''; return ''; }
  set value(v) { this._value = String(v); }
  setAttribute(k, v) { this.attributes[k] = String(v); if (k.startsWith('data-')) this.dataset[k.slice(5)] = String(v); if (['value', 'checked', 'selected', 'disabled'].includes(k)) this[k] = k === 'value' ? String(v) : true; }
  getAttribute(k) { return this.attributes[k]; }
  get textContent() { return this._text + this.children.map(x => x.textContent).join(''); }
  set textContent(v) { this.children = []; this._text = String(v); }
  append(...kids) { kids.forEach(k => { if (!(k instanceof Element)) k = new Element('#text', String(k)); if (k.parent) k.remove(); k.parent = this; this.children.push(k); }); }
  prepend(k) { k.parent = this; this.children.unshift(k); }
  replaceChildren(...kids) { this.children.forEach(c => { c.parent = null; }); this.children = []; this._text = ''; this.append(...kids); }
  remove() { if (this.parent) this.parent.children = this.parent.children.filter(c => c !== this); this.parent = null; }
  after(k) { const p = this.parent; if (p) { k.parent = p; p.children.splice(p.children.indexOf(this) + 1, 0, k); } }
  matches(q) { if (q.startsWith('.')) return this.classList.contains(q.slice(1)); if (q.startsWith('#')) return this.id === q.slice(1); return this.tagName.toLowerCase() === q.toLowerCase(); }
  querySelectorAll(q) { return this.children.flatMap(c => [...(c.matches(q) ? [c] : []), ...c.querySelectorAll(q)]); }
  querySelector(q) { return this.querySelectorAll(q)[0] || null; }
  addEventListener(k, fn) { (this.listeners[k] ||= []).push(fn); }
  fire(k) { const e = { target: this, currentTarget: this, preventDefault() {}, stopPropagation() {} }; this['on' + k]?.(e); (this.listeners[k] || []).forEach(fn => fn(e)); }
  click() { if (!this.disabled) this.fire('click'); }
  focus() { this.focused = true; }
}
function app({ state, all = true, storageError = false, date = '2026-11-09T11:00:00Z' } = {}) {
  const body = new Element('body'), view = new Element('main'), tabs = new Element('nav'); view.id = 'view'; tabs.id = 'tabs'; body.append(view, tabs);
  const document = { body, documentElement: new Element('html'), createElement: tag => new Element(tag), createTextNode: t => new Element('#text', String(t)), createElementNS: (_, tag) => new Element(tag), getElementById: id => body.querySelector('#' + id), addEventListener() {} };
  let now = new Date(date).getTime(), stored = state === undefined ? null : typeof state === 'string' ? state : JSON.stringify(state), fail = storageError;
  const NativeDate = Date;
  class Clock extends NativeDate { constructor(...args) { super(...(args.length ? args : [now])); } static now() { return now; } }
  let serial = 0; const intervals = new Map();
  const ctx = { console, document, navigator: {}, location: { protocol: 'http:', href: 'http://localhost/', reload() { ctx.reloaded = true; } }, Date: Clock,
    localStorage: { getItem: () => stored, setItem: (_, value) => { if (fail) throw new Error('QuotaExceededError'); stored = value; } },
    setInterval: fn => { intervals.set(++serial, fn); return serial; }, clearInterval: id => intervals.delete(id), setTimeout: () => ++serial, clearTimeout() {}, requestAnimationFrame: fn => fn(),
    URL: { createObjectURL: () => 'blob:test', revokeObjectURL() {} }, Blob, File, scrollTo() {}, matchMedia: () => ({ matches: true }), speechSynthesis: { cancel() {}, speak() {} }, SpeechSynthesisUtterance: class { constructor(t) { this.text = t; } }
  };
  ctx.window = ctx; vm.createContext(ctx);
  const run = file => vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });
  const files = [...fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
  if (all) files.forEach(run); else ['schema.js', 'core.js'].forEach(run);
  return { ctx, L: ctx.LA, view, body, run, stored: () => stored, fail: v => { fail = v; }, advance: ms => { now += ms; }, tick: () => [...intervals.values()].forEach(fn => fn()), timers: intervals,
    button: text => { const b = body.querySelectorAll('button').find(b => b.textContent === text); if (!b) throw new Error('Button fehlt: ' + text + '\n' + body.textContent); return b; } };
}
module.exports = { app, Element, root };
