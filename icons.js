/* =========================================================================
   icons.js — hand-authored minimalist line-art icon set.
   No external icon library, no CDN, no hosted photos: every icon here is
   built at load time from small parametric helpers (bursts, stars, dot
   clusters) so the shapes stay consistent without hand-plotting dozens of
   bezier curves. All icons share a 24x24 viewBox and use currentColor so
   they inherit color from CSS.
   ========================================================================= */

(function () {
  "use strict";

  // ---- geometry helpers ----------------------------------------------
  function deg2rad(d) { return (d * Math.PI) / 180; }

  function pt(cx, cy, angleDeg, r) {
    const a = deg2rad(angleDeg);
    return [cx + r * Math.sin(a), cy - r * Math.cos(a)];
  }

  // radial "burst" of short lines — used for lion mane, whale spout, etc.
  function burst(cx, cy, count, rInner, rOuter, startDeg, sweepDeg, sw) {
    sw = sw || 1.4;
    let out = "";
    const step = sweepDeg / (count - 1 || 1);
    for (let i = 0; i < count; i++) {
      const a = startDeg + step * i;
      const [x1, y1] = pt(cx, cy, a, rInner);
      const [x2, y2] = pt(cx, cy, a, rOuter);
      out += `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke-width="${sw}"/>`;
    }
    return out;
  }

  // five/n-point star outline path
  function starPath(cx, cy, rOuter, rInner, points) {
    points = points || 5;
    let d = "";
    const step = 360 / (points * 2);
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? rOuter : rInner;
      const [x, y] = pt(cx, cy, step * i - 90 + step / 2, r);
      d += (i === 0 ? "M" : "L") + x.toFixed(2) + "," + y.toFixed(2) + " ";
    }
    return d + "Z";
  }

  function dots(positions, r) {
    r = r || 0.75;
    return positions
      .map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="${r}"/>`)
      .join("");
  }

  function ringDots(positions, r) {
    r = r || 0.9;
    return positions
      .map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="none"/>`)
      .join("");
  }

  const S = {}; // finished icon markup, keyed by id

  // ---- species icons ----------------------------------------------------

  S.lion = `
    <circle cx="12" cy="13.2" r="4" fill="none"/>
    ${burst(12, 13.2, 16, 4.6, 9, 0, 360, 1.3)}
    <circle cx="10.3" cy="12.6" r="0.35" fill="currentColor" stroke="none"/>
    <circle cx="13.7" cy="12.6" r="0.35" fill="currentColor" stroke="none"/>
    <path d="M11 14.6 Q12 15.4 13 14.6" fill="none"/>
  `;

  S.leopard = `
    <ellipse cx="11.5" cy="14.5" rx="7.6" ry="3.4" fill="none"/>
    <circle cx="18.4" cy="12.3" r="2.4" fill="none"/>
    <path d="M4.2 15 Q2.3 13.6 2 11.3" fill="none"/>
    <path d="M8 20 L8.6 17.3 M11 20.3 L11.2 17.6 M14 20 L13.6 17.3 M16.6 19.3 L16 16.8" fill="none" stroke-width="1.3"/>
    ${ringDots(
      [
        [9, 13.2],
        [11.7, 12.6],
        [14.2, 13.6],
        [10, 15.6],
        [13, 15.8],
        [16, 14.6],
      ],
      0.85
    )}
  `;

  S.cheetah = `
    <ellipse cx="11.5" cy="14.5" rx="7.6" ry="3.2" fill="none"/>
    <circle cx="18.4" cy="12" r="2.2" fill="none"/>
    <path d="M17.4 12.6 Q16.6 14 15.8 14.2" fill="none" stroke-width="1.1"/>
    <path d="M3.6 15.6 Q1.6 15.9 0.8 13.8" fill="none"/>
    <path d="M8 20 L8.6 17.1 M11 20.3 L11.2 17.4 M14 20 L13.6 17.1 M16.6 19.3 L16 16.6" fill="none" stroke-width="1.3"/>
    ${dots(
      [
        [8.6, 13],
        [10.4, 12.4],
        [12.4, 12.8],
        [14.4, 13.4],
        [16.2, 13],
        [9.2, 15.4],
        [11.6, 15.8],
        [14, 15.9],
        [16.4, 15],
      ],
      0.42
    )}
  `;

  S.elephant = `
    <ellipse cx="10.6" cy="14.5" rx="6.6" ry="4.2" fill="none"/>
    <ellipse cx="15.6" cy="11.4" rx="3.5" ry="4.2" fill="none"/>
    <path d="M18.4 11.6 Q19.6 11 19.2 9.6" fill="none" stroke-width="1.2"/>
    <path d="M18 12.6 Q20.2 13.6 19.6 16.2 Q19.2 18 17.3 18.4" fill="none"/>
    <path d="M6 19.6 L6 17.3 M9.2 20 L9.2 17.6 M13 20 L13 17.6 M16 19.6 L16 17.4" fill="none" stroke-width="1.3"/>
    <path d="M4.2 13.4 Q3 13.9 3.4 15.4" fill="none" stroke-width="1.1"/>
  `;

  S.giraffe = `
    <ellipse cx="9" cy="17.4" rx="4.6" ry="2.6" fill="none"/>
    <path d="M11.6 15.6 Q13.4 9.4 15.6 6.6" fill="none"/>
    <circle cx="16.4" cy="5.6" r="2" fill="none"/>
    <path d="M15.3 3.9 L15.1 2.6 M17.4 3.9 L17.6 2.6" fill="none" stroke-width="1.2"/>
    <path d="M6.2 19.8 L6 17.7 M8.4 20 L8.3 17.9 M10.6 19.8 L10.7 17.6" fill="none" stroke-width="1.3"/>
    <path d="M4.6 16.8 Q3.4 16.6 3.4 15" fill="none" stroke-width="1.1"/>
    ${[
      [13.6, 12.4],
      [14.6, 9.6],
      [10.2, 16.6],
      [8, 17.8],
    ]
      .map(
        (p) =>
          `<rect x="${p[0] - 0.6}" y="${p[1] - 0.6}" width="1.2" height="1.2" fill="currentColor" stroke="none" transform="rotate(45 ${p[0]} ${p[1]})"/>`
      )
      .join("")}
  `;

  S.gorilla = `
    <circle cx="12" cy="9.4" r="4.1" fill="none"/>
    <path d="M8.6 8 Q12 6.4 15.4 8" fill="none" stroke-width="1.3"/>
    <path d="M6.2 18.6 Q5.4 13.6 8.6 12.2 Q12 10.8 15.4 12.2 Q18.6 13.6 17.8 18.6" fill="none"/>
    <path d="M7.6 13.4 Q4.6 15 4.4 18.4" fill="none"/>
    <path d="M16.4 13.4 Q19.4 15 19.6 18.4" fill="none"/>
    <circle cx="10.2" cy="9.6" r="0.35" fill="currentColor" stroke="none"/>
    <circle cx="13.8" cy="9.6" r="0.35" fill="currentColor" stroke="none"/>
  `;

  S.wilddog = `
    <ellipse cx="11.5" cy="14.8" rx="7.2" ry="3" fill="none"/>
    <circle cx="18" cy="12.6" r="2.1" fill="none"/>
    <path d="M17 11 L15.6 8.6 M19.2 11 L20.4 8.4" fill="none" stroke-width="1.3"/>
    <path d="M3.8 15.6 Q1.8 15 2 12.8" fill="none"/>
    <path d="M8 20 L8.4 17.4 M11 20.2 L11 17.4 M14 20 L13.6 17.4 M16.4 19.3 L15.8 16.9" fill="none" stroke-width="1.3"/>
    ${[
      [9, 13.6, 1.1, -20],
      [12.2, 13.2, 1, 15],
      [15, 14.4, 0.9, -10],
      [10.4, 16, 0.8, 25],
    ]
      .map(
        (p) =>
          `<ellipse cx="${p[0]}" cy="${p[1]}" rx="${p[2]}" ry="${p[2] * 0.6}" fill="currentColor" stroke="none" transform="rotate(${p[3]} ${p[0]} ${p[1]})"/>`
      )
      .join("")}
  `;

  S.roller = `
    <ellipse cx="10.4" cy="12.6" rx="4.2" ry="3" fill="none"/>
    <circle cx="16.2" cy="10" r="2.1" fill="none"/>
    <path d="M18.2 10 L20.2 9.6" fill="none" stroke-width="1.3"/>
    <path d="M8 10.2 Q11 8.4 13.8 9.6" fill="none"/>
    <path d="M7.4 14.8 Q4.4 17.6 3 21.6" fill="none"/>
    <path d="M8.6 15.2 Q6.2 18.6 5.2 22.4" fill="none"/>
  `;

  S.owlet = `
    <circle cx="12" cy="13" r="6" fill="none"/>
    <circle cx="9.4" cy="12" r="1.9" fill="none"/>
    <circle cx="14.6" cy="12" r="1.9" fill="none"/>
    <circle cx="9.4" cy="12" r="0.4" fill="currentColor" stroke="none"/>
    <circle cx="14.6" cy="12" r="0.4" fill="currentColor" stroke="none"/>
    <path d="M11.4 13.8 L12.6 13.8 L12 15 Z" fill="currentColor" stroke="none"/>
    <path d="M8.4 17 L15.6 17 M9 18.6 L15 18.6" fill="none" stroke-width="1.1"/>
    <path d="M9.6 19.6 L9.2 20.8 M14.4 19.6 L14.8 20.8" fill="none" stroke-width="1.2"/>
  `;

  S.kingfisher = `
    <ellipse cx="9.4" cy="15" rx="3.2" ry="2.6" fill="none"/>
    <circle cx="14.4" cy="11.2" r="2.9" fill="none"/>
    <path d="M17 10.6 L22.2 9.6 L17.4 12.2 Z" fill="currentColor" stroke="none"/>
    <path d="M13.4 8.6 L12.8 6.8 M14.6 8.3 L14.6 6.4 M15.8 8.6 L16.6 7" fill="none" stroke-width="1.1"/>
    <path d="M7 16.6 Q5 18.4 4.4 21" fill="none"/>
  `;

  S.whale = `
    <path d="M2.6 13.6 Q3.4 9.6 10 9 Q17.4 8.6 20.4 12.4 Q22 14.4 19.6 15.6 Q13 18.6 6.4 16.6 Q3.2 15.6 2.6 13.6 Z" fill="none"/>
    <path d="M19.6 15.2 L23 14.4 L22 17.4 L19 17.8 Z" fill="none"/>
    <path d="M9.6 9.4 Q9.2 8 10.2 7.4 M11.6 9.1 Q11.4 7.8 12.4 7.2" fill="none" stroke-width="1.1"/>
    ${dots(
      [
        [9.4, 10],
        [11, 9.6],
        [12.6, 9.8],
        [10.2, 11.2],
      ],
      0.4
    )}
    <path d="M6 15.6 Q4.6 16.8 4 18.6" fill="none" stroke-width="1.2"/>
  `;

  S.penguin = `
    <path d="M12 3.2 Q17 4.4 17 11 Q17 17.6 12 20.8 Q7 17.6 7 11 Q7 4.4 12 3.2 Z" fill="none"/>
    <path d="M9 8.4 Q12 10.2 15 8.4" fill="none" stroke-width="1.2"/>
    <path d="M11.2 7 L12.8 7 L12 8.6 Z" fill="currentColor" stroke="none"/>
    <path d="M7.4 12 Q5.2 12.6 4.4 15" fill="none"/>
    <path d="M16.6 12 Q18.8 12.6 19.6 15" fill="none"/>
    <path d="M9.6 20 L8.6 21.6 M14.4 20 L15.4 21.6" fill="none" stroke-width="1.3"/>
  `;

  // ---- paw print (likelihood meter) -------------------------------------
  S.paw = `
    <ellipse cx="12" cy="15.4" rx="4.4" ry="3.4"/>
    <ellipse cx="6.4" cy="10.6" rx="1.7" ry="2.2" transform="rotate(-18 6.4 10.6)"/>
    <ellipse cx="10.4" cy="7.6" rx="1.8" ry="2.4" transform="rotate(-6 10.4 7.6)"/>
    <ellipse cx="14.6" cy="7.6" rx="1.8" ry="2.4" transform="rotate(6 14.6 7.6)"/>
    <ellipse cx="18" cy="10.6" rx="1.7" ry="2.2" transform="rotate(18 18 10.6)"/>
  `;

  // ---- card type icons ----------------------------------------------------
  S.lodge = `
    <path d="M4 19 L12 5 L20 19 Z" fill="none"/>
    <path d="M9.2 19 L9.2 14.4 L14.8 14.4 L14.8 19" fill="none"/>
    <path d="M2.4 19 L21.6 19" fill="none"/>
  `;

  S.tour = `
    <circle cx="12" cy="12" r="8.4" fill="none"/>
    <path d="M15.2 8.8 L13.1 13.1 L8.8 15.2 L10.9 10.9 Z" fill="none"/>
    <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none"/>
  `;

  // ---- status badge icons ---------------------------------------------
  S.status_preferred = `<path d="${starPath(12, 12.4, 8, 3.4, 5)}" fill="none"/>`;

  S.status_backup = `
    <path d="M12 3.4 L19.4 6.2 Q19.6 14.8 12 20.6 Q4.4 14.8 4.6 6.2 Z" fill="none"/>
  `;

  S.status_extension = `
    <circle cx="12" cy="12" r="8.4" fill="none"/>
    <path d="M12 7.4 L12 16.6 M7.4 12 L16.6 12" fill="none" stroke-width="1.6"/>
  `;

  S.status_rejected = `
    <circle cx="12" cy="12" r="8.4" fill="none"/>
    <path d="M8.4 8.4 L15.6 15.6 M15.6 8.4 L8.4 15.6" fill="none" stroke-width="1.6"/>
  `;

  S.status_neutral = `<circle cx="12" cy="12" r="7" fill="none"/>`;

  S.status_unresearched = `
    <circle cx="12" cy="12" r="8.4" fill="none" stroke-dasharray="2.6 2.4"/>
    <path d="M9.6 9.4 Q9.6 6.8 12.2 6.8 Q14.8 6.8 14.6 9.2 Q14.4 11 12.2 11.6 L12.1 13.4" fill="none" stroke-width="1.5"/>
    <circle cx="12.1" cy="16.2" r="0.55" fill="currentColor" stroke="none"/>
  `;

  // ---- UI chrome icons --------------------------------------------------
  S.chevron = `<path d="M6.4 9 L12 15 L17.6 9" fill="none" stroke-width="1.8"/>`;
  S.close = `<path d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke-width="1.7"/>`;
  S.external = `
    <path d="M9.6 6.4 L17.6 6.4 L17.6 14.4" fill="none" stroke-width="1.6"/>
    <path d="M17.6 6.4 L8 16" fill="none" stroke-width="1.6"/>
    <path d="M13.6 6.4 L7 6.4 Q5.6 6.4 5.6 7.8 L5.6 17 Q5.6 18.4 7 18.4 L16.2 18.4 Q17.6 18.4 17.6 17 L17.6 10.4" fill="none" stroke-width="1.4"/>
  `;
  S.menu = `<path d="M4 7 L20 7 M4 12 L20 12 M4 17 L20 17" fill="none" stroke-width="1.7"/>`;
  S.info = `
    <circle cx="12" cy="12" r="8.4" fill="none"/>
    <circle cx="12" cy="8.2" r="0.55" fill="currentColor" stroke="none"/>
    <path d="M12 11 L12 16.4" fill="none" stroke-width="1.6"/>
  `;
  S.search = `
    <circle cx="10.6" cy="10.6" r="6" fill="none"/>
    <path d="M15.2 15.2 L20 20" fill="none" stroke-width="1.8"/>
  `;

  function svg(key, extraClass) {
    const inner = S[key] || S.status_neutral;
    const cls = extraClass ? ` ${extraClass}` : "";
    return `<svg class="icon icon-${key}${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  }

  window.ICONS = S;
  window.icon = svg;
})();
