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
  function buildAnimalChip(entry) {
    const sp = DATA.species[entry.speciesId];
    if (!sp) return "";
    const tier = DATA.legend.likelihood[entry.likelihood];
    const fill = tier ? tier.fill : 0;
    let meter = "";
    for (let i = 1; i <= 4; i++) {
      meter += icon("paw", i <= fill ? "is-filled" : "");
    }
    return `
      <div class="animal-chip" data-tier="${entry.likelihood}" title="${esc(sp.name)} — ${esc(tier ? tier.label : "")}">
        <span class="animal-chip__icon">${icon(sp.icon)}</span>
        <span class="animal-chip__body">
          <span class="animal-chip__name">${esc(sp.name)}</span>
          <span class="animal-chip__meter">${meter}</span>
        </span>
      </div>
    `;
  }

  // ---- card -------------------------------------------------------------
  function buildCard(item, subregionId) {
    const statusInfo = DATA.legend.status[item.status] || DATA.legend.status.neutral;
    const cardIcon = item.speciesFocus && item.speciesFocus[0] ? DATA.species[item.speciesFocus[0]].icon : item.type === "lodge" ? "lodge" : "tour";

    let priceHtml = "";
    if (item.type === "lodge" && item.price) {
      priceHtml = `
        <div class="card__price">
          <span class="price-main">${esc(item.price.perNightPP)} / night pp</span>
          <span>Single supp: ${esc(item.price.singleSupplement)}</span>
        </div>`;
    } else if (item.type === "tour" && item.price) {
      priceHtml = `
        <div class="card__price">
          <span class="price-main">${esc(item.price.total)}</span>
          <span>${esc(item.duration || "")}</span>
        </div>`;
    }

    const card = el("button", {
      class: "card",
      type: "button",
      "data-status": item.status,
      "data-item-id": item.id,
      "aria-haspopup": "dialog"
    });
    card.innerHTML = `
      <span class="card__inner">
        <span class="card__top">
          <span class="card__icon">${icon(cardIcon)}</span>
          <span class="card__badge">${icon("status_" + item.status)} ${esc(statusInfo.label)}</span>
        </span>
        <span class="card__name">${esc(item.name)}</span>
        <span class="card__summary">${esc(item.summary)}</span>
        ${priceHtml}
      </span>
    `;
    card.addEventListener("click", () => {
      location.hash = `#/${currentRegionId}/${DATA.subregions[subregionId].countryId}/${subregionId}/${item.type}/${item.id}`;
    });
    return card;
  }

  // ---- sub-region section ------------------------------------------------
  function buildSubregionSection(subregion) {
    const animalsHtml = subregion.animals.map(buildAnimalChip).join("");
    const section = el("section", { class: "subregion", id: "sub-" + subregion.id });
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
      items.forEach((it) => grid.appendChild(buildCard(it, subregion.id)));
      section.appendChild(grid);
    }

    appendGrid(subregion.lodges, "lodge", "Lodges");
    appendGrid(subregion.tours, "tour", "Tours");

    return section;
  }

  // ---- country block -------------------------------------------------------
  function buildCountryBlock(country) {
    const wrap = el("div", { class: "country-block", id: "country-" + country.id });
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
  }

  // ---- modals ------------------------------------------------------------
  const backdrop = document.getElementById("modal-backdrop");
  const modalRoot = document.getElementById("modal-root");

  // Closing always navigates to an explicit "parent" hash rather than
  // history.back() — a direct deep link to a modal has no prior history
  // entry within the site, so back() could leave the page entirely.
  function backRoute() {
    const r = parseHash();
    if (r.third && r.fourth && r.fifth) {
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
      .map((l) => `<a class="modal__link-btn" href="${esc(l.url)}" target="_blank" rel="noopener">${icon("external")} ${esc(l.label)}</a>`)
      .join("");

    openModal(`
      <button class="modal__close" aria-label="Close">${icon("close")}</button>
      <div class="modal__badge-row">
        <span class="modal__icon">${icon(cardIcon)}</span>
        <span class="card__badge">${icon("status_" + item.status)} ${esc(statusInfo.label)}</span>
      </div>
      <h3 class="modal__title">${esc(item.name)}</h3>
      <p class="modal__summary">${esc(item.summary)}</p>
      ${priceHtml}
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

  function handleRoute() {
    const r = parseHash();
    const regionExists = DATA.regions.some((rg) => rg.id === r.regionId);
    const targetRegion = regionExists ? r.regionId : DATA.regions[0].id;

    if (targetRegion !== currentRegionId || !document.getElementById("content").childElementCount) {
      renderRegion(targetRegion);
    }

    if (r.third === "info" && r.countryId && r.fourth) {
      openInfoModal(r.countryId, r.fourth);
      return;
    }

    if (r.third && r.fourth && r.fifth) {
      openItemModal(r.third, r.fourth, r.fifth);
      return;
    }

    closeModal();

    if (r.third) {
      requestAnimationFrame(() => {
        const target = document.getElementById("sub-" + r.third);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  window.addEventListener("hashchange", handleRoute);

  // ---- init ---------------------------------------------------------------
  buildTabs();
  handleRoute();
})();
