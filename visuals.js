// auto_generated: false
// Accessible, original SVG diagram and worked maths example; bundled for offline use.
(() => {
  'use strict';
  const L = window.LA, { h } = L;
  const svgEl = (tag, attrs, text) => { const el = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, v); if (text) el.textContent = text; return el; };
  function volcano() {
    const svg = svgEl('svg', { viewBox: '0 0 360 270', role: 'img', 'aria-label': 'Vulkan im Schnitt: Magmakammer unten, Schlot nach oben, Krater an der Spitze, Lava am Hang.' });
    svg.append(svgEl('path', { d: 'M20 195 L160 55 L180 70 L200 55 L340 195 Z', fill: '#8b8299' }),
      svgEl('ellipse', { cx: 180, cy: 225, rx: 50, ry: 23, fill: '#e65c31' }),
      svgEl('path', { d: 'M180 225 L180 72 M194 69 L245 120', fill: 'none', stroke: '#e65c31', 'stroke-width': 14 }));
    for (const [label, x, y, path] of [['Krater', 20, 35, 'M75 35 L168 64'], ['Lava', 275, 85, 'M275 90 L240 116'], ['Schlot', 250, 165, 'M248 160 L188 160'], ['Magmakammer', 12, 263, 'M118 251 L150 235']]) {
      svg.append(svgEl('path', { d: path, stroke: 'currentColor', fill: 'none' }), svgEl('text', { x, y, fill: 'currentColor', 'font-size': 15 }, label));
    }
    return h('section', { class: 'card visual' }, h('h3', null, 'Ein Vulkan im Schnitt'), svg,
      h('p', null, 'Magma sammelt sich unter der Erdoberfläche. Es kann durch einen Schlot aufsteigen. Tritt es an die Oberfläche, nennt man es Lava.'),
      h('details', null, h('summary', null, 'Warum entstehen Vulkane an Subduktionszonen?'), h('p', null, 'Die abtauchende Platte setzt Wasser frei. Dadurch kann Gestein im darüberliegenden Mantel leichter teilweise schmelzen. Das entstehende Magma steigt auf.')),
      h('a', { href: 'https://www.usgs.gov/special-topics/subduction-zone-science/science/introduction-subduction-zones-amazing-events', target: '_blank', rel: 'noopener noreferrer' }, 'Fachlicher Hintergrund: USGS'));
  }
  function fractions() {
    let step = 0;
    const lines = ['1/2 + 1/3: Die Nenner sind verschieden.', 'Gemeinsamer Nenner: 6. Erweitere 1/2 mit 3 und 1/3 mit 2.', '3/6 + 2/6 = (3 + 2)/6 = 5/6. Nur die Zähler werden addiert.', 'Probe: 1/2 = 0,5 und 1/3 ≈ 0,333. Zusammen ≈ 0,833 = 5/6.'];
    const body = h('div'), next = h('button', { class: 'cta ghost', type: 'button', onclick: () => { step = Math.min(step + 1, lines.length - 1); draw(); } }, 'Nächster Schritt');
    function draw() { body.replaceChildren(...lines.slice(0, step + 1).map(t => h('p', { class: 'math-step' }, t))); next.disabled = step === lines.length - 1; }
    draw();
    return h('section', { class: 'card visual' }, h('h3', null, 'Brüche Schritt für Schritt'), body, next,
      h('details', null, h('summary', null, 'Jetzt du: 1/4 + 1/2 = ?'), h('p', null, '1/4 + 2/4 = 3/4.')));
  }
  L.visual = d => L.base(d).id === 'geo-vulkane' ? volcano() : L.base(d).id === 'ma-brueche' ? fractions() : '';
})();
