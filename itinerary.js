/* =========================================================================
   itinerary.js — renders the Itinerary page (day-by-day view of itinerary.md).
   Deliberately separate from app.js/data.js: this page doesn't share the
   region/country/subregion model the research site uses. window.renderItinerary
   is the only thing this file exposes; app.js calls it when the itinerary
   route/tab is active.
   ========================================================================= */

(function () {
  "use strict";

  const DATA = window.ITINERARY_DATA;
  const icon = window.icon;

  function esc(str) {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildBadge(entry, extraClass) {
    const cls = "itin-badge itin-badge--" + entry.type + (extraClass ? " " + extraClass : "");
    return `<span class="${cls}">${icon(entry.type)}<span class="itin-badge__text">${esc(entry.text)}</span></span>`;
  }

  function buildDayRow(day) {
    const badges = buildBadge(day.primary) + (day.supplemental ? `<span class="itin-day__plus">+</span>${buildBadge(day.supplemental, "itin-badge--supplemental")}` : "");
    return `
      <div class="itin-day${day.primary.type === "end" ? " itin-day--end" : ""}${day.inferred ? " itin-day--inferred" : ""}">
        <div class="itin-day__num">Day ${day.n}</div>
        <div class="itin-day__line"></div>
        <div class="itin-day__body">
          <div class="itin-day__badges">
            ${badges}
            ${day.inferred ? `<span class="itin-inferred-tag" title="Placement or transit mode inferred — not stated explicitly in itinerary.md">${icon("info")} inferred</span>` : ""}
          </div>
          ${day.note ? `<p class="itin-day__note">${esc(day.note)}</p>` : ""}
        </div>
      </div>
    `;
  }

  function buildLeg(leg) {
    const daysHtml = leg.days.map(buildDayRow).join("");
    return `
      <section class="itin-leg" id="itin-${leg.id}">
        <header class="itin-leg__header">
          <h2 class="itin-leg__name">${esc(leg.name)}</h2>
          <div class="itin-leg__meta">
            <span>${esc(leg.totalDaysLabel)}</span>
            <span>${esc(leg.totalPrice)}</span>
          </div>
        </header>
        <p class="itin-leg__blurb">${esc(leg.blurb)}</p>
        <div class="itin-days">${daysHtml}</div>
      </section>
    `;
  }

  function buildLegend() {
    const types = [
      { type: "flight", label: "Flight" },
      { type: "hotel", label: "Hotel (recovery stay)" },
      { type: "lodge", label: "Safari lodge / camp" },
      { type: "tour", label: "Named tour / activity day" },
      { type: "transfer", label: "Transfer (supplemental)" }
    ];
    return `
      <div class="itin-legend">
        ${types.map((t) => `<span class="itin-legend__item">${icon(t.type)} ${t.label}</span>`).join("")}
        <span class="itin-legend__item itin-legend__item--inferred">${icon("info")} inferred — a guess, not stated in itinerary.md</span>
      </div>
    `;
  }

  function render(container) {
    if (!DATA) {
      container.innerHTML = `<p class="card-grid-empty">Itinerary data not loaded.</p>`;
      return;
    }
    container.innerHTML = `
      <div class="itin-page">
        <header class="itin-page__header">
          <h1 class="itin-page__title">Day-by-Day Itinerary</h1>
          <p class="itin-page__intro">${esc(DATA.intro)}</p>
          ${buildLegend()}
        </header>
        ${DATA.legs.map(buildLeg).join("")}
      </div>
    `;
  }

  window.renderItinerary = render;
})();
