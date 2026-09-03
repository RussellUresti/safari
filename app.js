/* =========================================================================
   app.js — routing, rendering, and modal behavior.
   Hash routes:
     #/<region>                                         -> switch tab
     #/<region>/<country>/<subregion>                    -> switch tab + scroll
     #/<region>/<country>/<subregion>/<lodge|tour>/<id>   -> also open item modal
     #/<region>/<country>/info/<visa|medical>             -> open info modal
   ========================================================================= */

(function () {
  "use strict";

  const DATA = window.TRIP_DATA;
  const icon = window.icon;
  let currentRegionId = DATA.regions[0].id;
  let lastFocusedElement = null; // set right before opening a modal so we can restore it on close
  let previousRoute = null; // used to tell "closing a modal" apart from "navigating to a new subregion"

  // ---- small utils --------------------------------------------------
  function esc(str) {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function el(tag, attrs, html) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function countriesForRegion(regionId) {
    const region = DATA.regions.find((r) => r.id === regionId);
    return region ? region.countryIds.map((id) => DATA.countries[id]) : [];
  }

  // display order for lodge/tour cards within a grid
  const STATUS_ORDER = ["preferred", "backup", "extension", "neutral", "unresearched", "rejected"];
  function sortByStatus(items) {
    return items.slice().sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status));
  }

  // preferred/backup/extension all share the "trophy" glyph (recolored via
  // CSS); the rest have their own dedicated icon
  function statusIconKey(status) {
    if (status === "preferred" || status === "backup" || status === "extension") return "trophy";
    return "status_" + status;
  }

  // pulls the first dollar figure out of a price string for filter
  // comparisons, e.g. "$1,096–$1,146" -> 1096, "From $9,950–$17,450" -> 9950.
  // Returns null when nothing parseable is found (item won't be excluded
  // by a price filter rather than guessed at).
  function parsePriceLow(str) {
    if (!str) return null;
    const match = String(str).replace(/,/g, "").match(/[\d]+(\.\d+)?/);
    return match ? parseFloat(match[0]) : null;
  }

  // ---- tab bar --------------------------------------------------------
  function buildTabs() {
    const tabWrap = document.getElementById("tabs");
    tabWrap.innerHTML = "";
    DATA.regions.forEach((region) => {
      const btn = el(
        "button",
        { class: "tab", role: "tab", "aria-selected": region.id === currentRegionId ? "true" : "false", "data-region": region.id },
        esc(region.label)
      );
      btn.addEventListener("click", () => {
        location.hash = "#/" + region.id;
      });
      tabWrap.appendChild(btn);
    });
  }

  function updateTabsActiveState() {
    document.querySelectorAll(".tab").forEach((btn) => {
      btn.setAttribute("aria-selected", btn.dataset.region === currentRegionId ? "true" : "false");
    });
  }

  // ---- animal likelihood chip -----------------------------------------
  // Gauge geometry: a fixed semicircular track (4 quarter-turn segments,
  // 180deg at the left down to 0deg at the right) drawn once in the 36x36
  // viewBox below; only the needle's rotation changes per chip, driven by
  // the tier's fill count (0-4) mapped onto that same 180deg sweep.
  const GAUGE_MAX_FILL = 4;
  const GAUGE_TRACK_SEGMENTS = [
    "M3.75,18 A14.25,14.25 0 0 1 7.92,7.92",
    "M7.92,7.92 A14.25,14.25 0 0 1 18,3.75",
    "M18,3.75 A14.25,14.25 0 0 1 28.08,7.92",
    "M28.08,7.92 A14.25,14.25 0 0 1 32.25,18"
  ];

  function buildLikelihoodGauge(fill) {
    // needle SVG points straight up by default (the "up" transform origin),
    // so the rotation is relative to that, not an absolute compass angle
    const needleAngle = (Math.min(fill, GAUGE_MAX_FILL) / GAUGE_MAX_FILL) * 180 - 90;
    const segments = GAUGE_TRACK_SEGMENTS.map((d, i) => {
      const segFilled = fill >= (i + 1) * (GAUGE_MAX_FILL / GAUGE_TRACK_SEGMENTS.length);
      return `<path class="gauge-track${segFilled ? " is-filled" : ""}" d="${d}"></path>`;
    }).join("");
    return `
      <span class="animal-chip__gauge">
        <svg viewBox="0 0 36 36" width="36" height="36" aria-hidden="true">
          ${segments}
          <circle class="gauge-pivot" cx="18" cy="18" r="1.5"></circle>
          <line class="gauge-needle" x1="18" y1="18" x2="18" y2="5.25" transform="rotate(${needleAngle} 18 18)"></line>
        </svg>
      </span>
    `;
  }

  function buildAnimalChip(entry) {
    const sp = DATA.species[entry.speciesId];
    if (!sp) return "";
    const tier = DATA.legend.likelihood[entry.likelihood];
    const fill = tier ? tier.fill : 0;
    return `
      <div class="animal-chip" data-tier="${entry.likelihood}" title="${esc(sp.name)} — ${esc(tier ? tier.label : "")}">
        <span class="animal-chip__name">${esc(sp.name)}</span>
        ${buildLikelihoodGauge(fill)}
      </div>
    `;
  }

  // ---- card -------------------------------------------------------------
  function buildCard(item, subregionId) {
    const cardIcon = item.speciesFocus && item.speciesFocus[0] ? DATA.species[item.speciesFocus[0]].icon : item.type === "lodge" ? "lodge" : "tour";

    let priceHtml = "";
    let priceLow = null;
    if (item.type === "lodge" && item.price) {
      priceLow = parsePriceLow(item.price.perNightPP);
      priceHtml = `
        <div class="card__price">
          <span class="price-main">${esc(item.price.perNightPP)} / night pp</span>
          <span>Single supp: ${esc(item.price.singleSupplement)}</span>
        </div>`;
    } else if (item.type === "tour" && item.price) {
      priceLow = parsePriceLow(item.price.total);
      priceHtml = `
        <div class="card__price">
          <span class="price-main">${esc(item.price.total)}</span>
          <span>${esc(item.duration || "")}</span>
        </div>`;
    }

    // "neutral" gets no corner badge — its absence of a marker is the signal
    const badgeHtml =
      item.status === "neutral"
        ? ""
        : `<span class="card__corner-badge" data-status="${item.status}">${icon(statusIconKey(item.status))}</span>`;

    const card = el("button", {
      class: "card",
      type: "button",
      "data-status": item.status,
      "data-card-type": item.type,
      "data-price-low": priceLow === null ? "" : priceLow,
      "data-item-id": item.id,
      "aria-haspopup": "dialog"
    });
    card.innerHTML = `
      <span class="card__inner">
        <span class="card__top">
          <span class="card__icon">${icon(cardIcon)}</span>
        </span>
        <span class="card__name">${esc(item.name)}</span>
        <span class="card__summary">${esc(item.summary)}</span>
        ${priceHtml}
      </span>
      ${badgeHtml}
    `;
    card.addEventListener("click", () => {
      lastFocusedElement = card;
      location.hash = `#/${currentRegionId}/${DATA.subregions[subregionId].countryId}/${subregionId}/${item.type}/${item.id}`;
    });
    return card;
  }

  // ---- sub-region section ------------------------------------------------
  function buildSubregionSection(subregion) {
    const animalsHtml = subregion.animals.map(buildAnimalChip).join("");
    const section = el("section", {
      class: "subregion",
      id: "sub-" + subregion.id,
      "data-animals": JSON.stringify(subregion.animals)
    });
    section.innerHTML = `
      <h3 class="subregion__name">${esc(subregion.name)}</h3>
      <p class="subregion__blurb">${esc(subregion.blurb)}</p>
      <div class="animal-strip">${animalsHtml}</div>
    `;

    function appendGrid(items, typeIcon, label) {
      if (!items.length) {
        section.insertAdjacentHTML("beforeend", `<p class="card-grid-empty">No ${label.toLowerCase()} logged for this sub-region yet.</p>`);
        return;
      }
      section.insertAdjacentHTML("beforeend", `<div class="section-label">${icon(typeIcon)} ${label}</div>`);
      const grid = el("div", { class: "card-grid" });
      sortByStatus(items).forEach((it) => grid.appendChild(buildCard(it, subregion.id)));
      section.appendChild(grid);
      section.appendChild(el("p", { class: "filter-empty-msg" }, "No items match your current filters."));
    }

    appendGrid(subregion.lodges, "lodge", "Lodges");
    appendGrid(subregion.tours, "tour", "Tours");

    return section;
  }

  // ---- country block -------------------------------------------------------
  function buildCountryBlock(country) {
    const wrap = el("div", {
      class: "country-block",
      id: "country-" + country.id,
      "data-visa-required": country.visaRequired ? "true" : "false"
    });
    const links = [];
    if (country.visaInfo) links.push(`<button class="info-link" data-country="${country.id}" data-info="visa">${icon("info")} Visa info</button>`);
    if (country.medicalInfo) links.push(`<button class="info-link" data-country="${country.id}" data-info="medical">${icon("info")} Medical info</button>`);

    const header = el("header", { class: "country-header" });
    header.innerHTML = `
      <span class="country-header__flag">${country.flagEmoji}</span>
      <h2 class="country-header__name">${esc(country.name)}</h2>
      <span class="country-header__links">${links.join("")}</span>
    `;
    header.querySelectorAll(".info-link").forEach((btn) => {
      btn.addEventListener("click", () => {
        lastFocusedElement = btn;
        location.hash = `#/${currentRegionId}/${country.id}/info/${btn.dataset.info}`;
      });
    });
    wrap.appendChild(header);

    country.subregionIds.forEach((subId) => {
      wrap.appendChild(buildSubregionSection(DATA.subregions[subId]));
    });
    return wrap;
  }

  // ---- sidebar TOC -----------------------------------------------------
  function buildSidebar(regionId) {
    const countries = countriesForRegion(regionId);
    const nav = document.getElementById("sidebar-nav");
    if (!countries.length) {
      nav.innerHTML = `<p class="card-grid-empty">Nothing scoped in this region yet.</p>`;
      return;
    }
    nav.innerHTML = countries
      .map((country) => {
        const items = country.subregionIds
          .map((subId) => {
            const sub = DATA.subregions[subId];
            return `<li><a href="#/${regionId}/${country.id}/${subId}">${esc(sub.name)}</a></li>`;
          })
          .join("");
        return `
          <div class="toc-country">
            <button class="toc-country__head" aria-expanded="true" data-country="${country.id}">
              ${icon("chevron")} <span>${country.flagEmoji} ${esc(country.name)}</span>
            </button>
            <ul class="toc-subregions">${items}</ul>
          </div>
        `;
      })
      .join("");

    nav.querySelectorAll(".toc-country__head").forEach((btn) => {
      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", expanded ? "false" : "true");
        btn.nextElementSibling.style.display = expanded ? "none" : "block";
      });
    });
    nav.querySelectorAll(".toc-subregions a").forEach((a) => {
      a.addEventListener("click", () => closeSidebarDrawer());
    });
  }

  // ---- render a full region panel --------------------------------------
  function renderRegion(regionId) {
    currentRegionId = regionId;
    updateTabsActiveState();
    buildSidebar(regionId);

    const content = document.getElementById("content");
    const countries = countriesForRegion(regionId);
    content.innerHTML = "";
    if (!countries.length) {
      content.innerHTML = `
        <div class="empty-region">
          <p>This region hasn't been scoped into the data yet — Masai Mara (East Africa → Kenya) is the only fully built section right now.</p>
        </div>`;
      return;
    }
    countries.forEach((country) => content.appendChild(buildCountryBlock(country)));
    applyFilters();
  }

  // ---- modals ------------------------------------------------------------
  const backdrop = document.getElementById("modal-backdrop");
  const modalRoot = document.getElementById("modal-root");

  // Closing always navigates to an explicit "parent" hash rather than
  // history.back() — a direct deep link to a modal has no prior history
  // entry within the site, so back() could leave the page entirely.
  function backRoute() {
    const r = parseHash();
    if (r.third === "info") {
      location.hash = `#/${r.regionId}/${r.countryId}`;
    } else if (r.third && r.fourth && r.fifth) {
      location.hash = `#/${r.regionId}/${r.countryId}/${r.third}`;
    } else {
      location.hash = `#/${r.regionId}`;
    }
  }

  function openModal(html, extraClass) {
    modalRoot.className = "modal" + (extraClass ? " " + extraClass : "");
    modalRoot.innerHTML = html;
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = modalRoot.querySelector(".modal__close");
    if (closeBtn) closeBtn.addEventListener("click", backRoute);
    modalRoot.focus();
  }

  function closeModal() {
    backdrop.hidden = true;
    modalRoot.innerHTML = "";
    document.body.style.overflow = "";
  }

  // returns focus to whatever card/link opened the modal, without letting
  // the browser scroll to it — the user is already positioned where they
  // want to be, this just restores keyboard/AT focus correctly.
  function restoreFocus() {
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus({ preventScroll: true });
    }
    lastFocusedElement = null;
  }

  function openItemModal(subregionId, type, itemId) {
    const sub = DATA.subregions[subregionId];
    if (!sub) return closeModal();
    const list = type === "lodge" ? sub.lodges : sub.tours;
    const item = list.find((i) => i.id === itemId);
    if (!item) return closeModal();

    const statusInfo = DATA.legend.status[item.status];
    const cardIcon = item.speciesFocus && item.speciesFocus[0] ? DATA.species[item.speciesFocus[0]].icon : type === "lodge" ? "lodge" : "tour";

    const factsHtml = (item.keyFacts || [])
      .map((f) => `<div class="modal__fact-label">${esc(f.label)}</div><div class="modal__fact-value">${esc(f.value)}</div>`)
      .join("");

    let priceHtml = "";
    if (type === "lodge" && item.price) {
      priceHtml = `
        <div class="modal__price-box">
          <span class="price-main">${esc(item.price.perNightPP)} per person / night</span>
          <span class="price-note">Single supplement: ${esc(item.price.singleSupplement)}${item.price.note ? " — " + esc(item.price.note) : ""}</span>
        </div>`;
    } else if (type === "tour" && item.price) {
      priceHtml = `
        <div class="modal__price-box">
          <span class="price-main">${esc(item.price.total)}</span>
          <span class="price-note">${esc(item.duration || "")}${item.price.note ? " — " + esc(item.price.note) : ""}</span>
        </div>`;
    }

    const linksHtml = (item.links || [])
      .map((l) => `<a class="modal__link-btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ${icon("external")}</a>`)
      .join("");

    let drivesHtml = "";
    if (type === "tour" && item.safariDrives) {
      const sd = item.safariDrives;
      const isConfirmed = sd.basis === "confirmed";
      drivesHtml = `
        <div class="modal__drives-box">
          <div class="modal__drives-head">
            <span class="modal__drives-count">${esc(sd.count)} safari drives / viewing experiences</span>
            <span class="modal__drives-basis" data-basis="${esc(sd.basis)}">${isConfirmed ? icon("check") : icon("info")} ${isConfirmed ? "Confirmed" : "Estimated"}</span>
          </div>
          ${sd.note ? `<p class="modal__drives-note">${esc(sd.note)}</p>` : ""}
        </div>`;
    }

    openModal(`
      <button class="modal__close" aria-label="Close">${icon("close")}</button>
      <div class="modal__badge-row">
        <span class="modal__icon">${icon(cardIcon)}</span>
        <span class="card__badge" data-status="${item.status}">${icon(statusIconKey(item.status))} ${esc(statusInfo.label)}</span>
      </div>
      <h3 class="modal__title">${esc(item.name)}</h3>
      <p class="modal__summary">${esc(item.summary)}</p>
      ${priceHtml}
      ${drivesHtml}
      <div class="modal__section-title">Why this status</div>
      <p class="modal__rationale">${esc(item.rationale)}</p>
      ${factsHtml ? `<div class="modal__section-title">Key facts</div><div class="modal__facts">${factsHtml}</div>` : ""}
      ${linksHtml ? `<div class="modal__links">${linksHtml}</div>` : ""}
    `, "modal--item");
  }

  function openInfoModal(countryId, infoType) {
    const country = DATA.countries[countryId];
    if (!country) return closeModal();
    const info = infoType === "visa" ? country.visaInfo : country.medicalInfo;
    if (!info) return closeModal();
    openModal(`
      <button class="modal__close" aria-label="Close">${icon("close")}</button>
      <div class="modal__badge-row">
        <span class="modal__icon">${icon("info")}</span>
        <span class="country-header__flag">${country.flagEmoji}</span>
      </div>
      <h3 class="modal__title">${esc(country.name)} — ${infoType === "visa" ? "Visa info" : "Medical info"}</h3>
      <p class="modal__summary">${esc(info.summary)}</p>
      <div class="modal__body-text">${esc(info.body)}</div>
    `, "modal--text");
  }

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) backRoute();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !backdrop.hidden) backRoute();
  });

  // ---- mobile sidebar drawer --------------------------------------------
  const sidebarEl = document.getElementById("sidebar");
  const scrimEl = document.getElementById("sidebar-scrim");
  function openSidebarDrawer() {
    sidebarEl.classList.add("is-open");
    scrimEl.classList.add("is-visible");
  }
  function closeSidebarDrawer() {
    sidebarEl.classList.remove("is-open");
    scrimEl.classList.remove("is-visible");
  }
  document.getElementById("menu-toggle").addEventListener("click", openSidebarDrawer);
  scrimEl.addEventListener("click", closeSidebarDrawer);

  // ---- filters ------------------------------------------------------------
  const filterState = {
    status: new Set(Object.keys(DATA.legend.status)),
    lodgeMin: null,
    lodgeMax: null,
    tourMin: null,
    tourMax: null,
    speciesId: null,
    minLikelihood: null, // null = "any presence" (fill >= 1)
    visaFree: null // null = any, true = visa-free only, false = visa-required only
  };

  function buildFilterDock() {
    const dock = document.getElementById("filter-dock");
    dock.innerHTML = `
      <button class="filter-toggle" id="filter-toggle" aria-expanded="false" aria-controls="filter-panel">
        ${icon("filter")} <span>Filters</span> ${icon("chevron", "filter-toggle__chevron")}
      </button>
      <div class="filter-chips" id="filter-chips"></div>
    `;
    document.getElementById("filter-toggle").addEventListener("click", () => {
      const panel = document.getElementById("filter-panel");
      const btn = document.getElementById("filter-toggle");
      const isOpen = !panel.classList.contains("is-open");
      panel.classList.toggle("is-open", isOpen);
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  function buildFilterPanel() {
    const panel = document.getElementById("filter-panel");
    const statusOptions = Object.keys(DATA.legend.status)
      .map((key) => `<label class="filter-check"><input type="checkbox" value="${key}" checked data-filter="status">${esc(DATA.legend.status[key].label)}</label>`)
      .join("");
    const speciesOptions = Object.values(DATA.species)
      .map((sp) => `<option value="${sp.id}">${esc(sp.name)}</option>`)
      .join("");
    const likelihoodOptions = Object.keys(DATA.legend.likelihood)
      .filter((k) => k !== "not_present")
      .map((k) => `<option value="${k}">${esc(DATA.legend.likelihood[k].label)} or better</option>`)
      .join("");

    panel.innerHTML = `
      <div class="filter-panel__inner">
        <div class="filter-group">
          <div class="filter-group__title">Status</div>
          <div class="filter-check-row">${statusOptions}</div>
        </div>
        <div class="filter-group">
          <div class="filter-group__title">Lodge price (USD / night, per person)</div>
          <div class="filter-range-row">
            <input type="number" id="filter-lodge-min" placeholder="Min" min="0">
            <span>\u2013</span>
            <input type="number" id="filter-lodge-max" placeholder="Max" min="0">
          </div>
        </div>
        <div class="filter-group">
          <div class="filter-group__title">Tour price (USD, total)</div>
          <div class="filter-range-row">
            <input type="number" id="filter-tour-min" placeholder="Min" min="0">
            <span>\u2013</span>
            <input type="number" id="filter-tour-max" placeholder="Max" min="0">
          </div>
        </div>
        <div class="filter-group">
          <div class="filter-group__title">Animal presence</div>
          <div class="filter-range-row">
            <span class="select-wrap">
              <select id="filter-species"><option value="">Any species</option>${speciesOptions}</select>
              ${icon("chevron", "select-wrap__arrow")}
            </span>
            <span class="select-wrap">
              <select id="filter-likelihood"><option value="">Any presence</option>${likelihoodOptions}</select>
              ${icon("chevron", "select-wrap__arrow")}
            </span>
          </div>
        </div>
        <div class="filter-group">
          <div class="filter-group__title">Entry requirements</div>
          <div class="filter-check-row">
            <label class="filter-check"><input type="radio" name="visa" value="any" checked>Any</label>
            <label class="filter-check"><input type="radio" name="visa" value="free">Visa-free only</label>
            <label class="filter-check"><input type="radio" name="visa" value="required">Visa required only</label>
          </div>
        </div>
        <button class="filter-clear" id="filter-clear">Clear all filters</button>
      </div>
    `;

    panel.querySelectorAll('input[data-filter="status"]').forEach((cb) => {
      cb.addEventListener("change", () => {
        filterState.status = new Set([...panel.querySelectorAll('input[data-filter="status"]:checked')].map((c) => c.value));
        applyFilters();
      });
    });
    document.getElementById("filter-lodge-min").addEventListener("input", (e) => {
      filterState.lodgeMin = e.target.value === "" ? null : Number(e.target.value);
      applyFilters();
    });
    document.getElementById("filter-lodge-max").addEventListener("input", (e) => {
      filterState.lodgeMax = e.target.value === "" ? null : Number(e.target.value);
      applyFilters();
    });
    document.getElementById("filter-tour-min").addEventListener("input", (e) => {
      filterState.tourMin = e.target.value === "" ? null : Number(e.target.value);
      applyFilters();
    });
    document.getElementById("filter-tour-max").addEventListener("input", (e) => {
      filterState.tourMax = e.target.value === "" ? null : Number(e.target.value);
      applyFilters();
    });
    document.getElementById("filter-species").addEventListener("change", (e) => {
      filterState.speciesId = e.target.value || null;
      applyFilters();
    });
    document.getElementById("filter-likelihood").addEventListener("change", (e) => {
      filterState.minLikelihood = e.target.value || null;
      applyFilters();
    });
    panel.querySelectorAll('input[name="visa"]').forEach((r) => {
      r.addEventListener("change", (e) => {
        filterState.visaFree = e.target.value === "any" ? null : e.target.value === "free";
        applyFilters();
      });
    });
    document.getElementById("filter-clear").addEventListener("click", clearAllFilters);
  }

  function syncFilterPanelInputs() {
    document.querySelectorAll('input[data-filter="status"]').forEach((cb) => {
      cb.checked = filterState.status.has(cb.value);
    });
    document.getElementById("filter-lodge-min").value = filterState.lodgeMin ?? "";
    document.getElementById("filter-lodge-max").value = filterState.lodgeMax ?? "";
    document.getElementById("filter-tour-min").value = filterState.tourMin ?? "";
    document.getElementById("filter-tour-max").value = filterState.tourMax ?? "";
    document.getElementById("filter-species").value = filterState.speciesId || "";
    document.getElementById("filter-likelihood").value = filterState.minLikelihood || "";
    const visaVal = filterState.visaFree === null ? "any" : filterState.visaFree ? "free" : "required";
    document.querySelectorAll('input[name="visa"]').forEach((r) => {
      r.checked = r.value === visaVal;
    });
  }

  function clearAllFilters() {
    filterState.status = new Set(Object.keys(DATA.legend.status));
    filterState.lodgeMin = filterState.lodgeMax = null;
    filterState.tourMin = filterState.tourMax = null;
    filterState.speciesId = null;
    filterState.minLikelihood = null;
    filterState.visaFree = null;
    syncFilterPanelInputs();
    applyFilters();
  }

  function removeFilter(key) {
    if (key === "status") filterState.status = new Set(Object.keys(DATA.legend.status));
    if (key === "lodgePrice") { filterState.lodgeMin = null; filterState.lodgeMax = null; }
    if (key === "tourPrice") { filterState.tourMin = null; filterState.tourMax = null; }
    if (key === "animal") { filterState.speciesId = null; filterState.minLikelihood = null; }
    if (key === "visa") filterState.visaFree = null;
    syncFilterPanelInputs();
    applyFilters();
  }

  function renderActiveChips() {
    const chips = [];
    const allStatuses = Object.keys(DATA.legend.status);
    if (filterState.status.size < allStatuses.length) {
      const shown = allStatuses.filter((s) => filterState.status.has(s)).map((s) => DATA.legend.status[s].label);
      chips.push({ key: "status", label: "Status: " + (shown.length ? shown.join(", ") : "none selected") });
    }
    if (filterState.lodgeMin != null || filterState.lodgeMax != null) {
      chips.push({ key: "lodgePrice", label: `Lodge \$${filterState.lodgeMin ?? "0"}\u2013${filterState.lodgeMax ?? "\u221e"}/night` });
    }
    if (filterState.tourMin != null || filterState.tourMax != null) {
      chips.push({ key: "tourPrice", label: `Tour \$${filterState.tourMin ?? "0"}\u2013${filterState.tourMax ?? "\u221e"}` });
    }
    if (filterState.speciesId) {
      const sp = DATA.species[filterState.speciesId];
      const likLabel = filterState.minLikelihood ? DATA.legend.likelihood[filterState.minLikelihood].label + "+" : "Any presence";
      chips.push({ key: "animal", label: `${sp.name}: ${likLabel}` });
    }
    if (filterState.visaFree !== null) {
      chips.push({ key: "visa", label: filterState.visaFree ? "Visa-free only" : "Visa required only" });
    }

    const chipsEl = document.getElementById("filter-chips");
    if (!chips.length) {
      chipsEl.innerHTML = `<span class="filter-chips__empty">No filters applied</span>`;
      return;
    }
    chipsEl.innerHTML = chips
      .map((c) => `<span class="filter-chip">${esc(c.label)}<button class="filter-chip__remove" data-key="${c.key}" aria-label="Remove filter">${icon("close")}</button></span>`)
      .join("");
    chipsEl.querySelectorAll(".filter-chip__remove").forEach((btn) => {
      btn.addEventListener("click", () => removeFilter(btn.dataset.key));
    });
  }

  function applyFilters() {
    document.querySelectorAll(".country-block").forEach((cb) => {
      const visaRequired = cb.dataset.visaRequired === "true";
      const countryVisible =
        filterState.visaFree === null || (filterState.visaFree === true && !visaRequired) || (filterState.visaFree === false && visaRequired);
      cb.classList.toggle("is-filtered-out", !countryVisible);
      if (!countryVisible) return;

      cb.querySelectorAll(".subregion").forEach((sec) => {
        let subVisible = true;
        if (filterState.speciesId) {
          let animals = [];
          try { animals = JSON.parse(sec.dataset.animals || "[]"); } catch (e) { animals = []; }
          const entry = animals.find((a) => a.speciesId === filterState.speciesId);
          const fill = entry ? (DATA.legend.likelihood[entry.likelihood] || {}).fill || 0 : 0;
          const neededFill = filterState.minLikelihood ? (DATA.legend.likelihood[filterState.minLikelihood] || {}).fill || 1 : 1;
          subVisible = fill >= neededFill;
        }
        sec.classList.toggle("is-filtered-out", !subVisible);
        if (!subVisible) return;

        sec.querySelectorAll(".card-grid").forEach((grid) => {
          let anyVisible = false;
          grid.querySelectorAll(".card").forEach((cardEl) => {
            let visible = filterState.status.has(cardEl.dataset.status);
            if (visible) {
              const priceLow = parseFloat(cardEl.dataset.priceLow);
              if (!isNaN(priceLow)) {
                if (cardEl.dataset.cardType === "lodge") {
                  if (filterState.lodgeMin != null && priceLow < filterState.lodgeMin) visible = false;
                  if (filterState.lodgeMax != null && priceLow > filterState.lodgeMax) visible = false;
                } else {
                  if (filterState.tourMin != null && priceLow < filterState.tourMin) visible = false;
                  if (filterState.tourMax != null && priceLow > filterState.tourMax) visible = false;
                }
              }
            }
            cardEl.classList.toggle("is-filtered-out", !visible);
            if (visible) anyVisible = true;
          });
          const msg = grid.nextElementSibling;
          if (msg && msg.classList.contains("filter-empty-msg")) {
            msg.classList.toggle("is-visible", grid.children.length > 0 && !anyVisible);
          }
        });
      });
    });

    renderActiveChips();
  }

  // ---- routing ------------------------------------------------------------
  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, "");
    const parts = raw.split("/").filter(Boolean).map(decodeURIComponent);
    return {
      regionId: parts[0] || DATA.regions[0].id,
      countryId: parts[1] || null,
      third: parts[2] || null, // subregionId OR "info"
      fourth: parts[3] || null, // itemType OR infoType
      fifth: parts[4] || null // itemId
    };
  }

  function isModalRoute(r) {
    if (!r) return false;
    if (r.third === "info") return !!r.fourth;
    return !!(r.third && r.fourth && r.fifth);
  }

  function scrollToId(id, instant) {
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: instant ? "auto" : "smooth", block: "start" });
    });
  }

  function handleRoute() {
    const r = parseHash();
    const regionExists = DATA.regions.some((rg) => rg.id === r.regionId);
    const targetRegion = regionExists ? r.regionId : DATA.regions[0].id;
    const isFreshLoad = previousRoute === null;

    if (targetRegion !== currentRegionId || !document.getElementById("content").childElementCount) {
      renderRegion(targetRegion);
    }

    if (r.third === "info" && r.countryId && r.fourth) {
      if (isFreshLoad) scrollToId("country-" + r.countryId, true);
      openInfoModal(r.countryId, r.fourth);
      previousRoute = r;
      return;
    }

    if (r.third && r.fourth && r.fifth) {
      if (isFreshLoad) scrollToId("sub-" + r.third, true);
      openItemModal(r.third, r.fourth, r.fifth);
      previousRoute = r;
      return;
    }

    closeModal();
    restoreFocus();

    // only auto-scroll to a sub-region on a genuine navigation (sidebar
    // click, direct link) — not as a side effect of closing a modal that
    // was opened from a card the user had already scrolled to.
    const closingModalForSameSubregion = isModalRoute(previousRoute) && previousRoute.third === r.third;
    if (r.third && !closingModalForSameSubregion) {
      scrollToId("sub-" + r.third, false);
    }

    previousRoute = r;
  }

  window.addEventListener("hashchange", handleRoute);

  // ---- init ---------------------------------------------------------------
  buildTabs();
  buildFilterDock();
  buildFilterPanel();
  handleRoute();
})();
