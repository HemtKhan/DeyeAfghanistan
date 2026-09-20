/* ============================================================
   DEYE AFGHANISTAN — script.js
   Theme + language + mobile menu + product rendering/filter/modal
   + a WhatsApp-compose contact "form" (no backend — everything
   here runs client-side and opens wa.me with a prefilled message).
   ============================================================ */
(function () {
  "use strict";

  var WA_NUMBER = "93707077675"; // +93 707 077 675

  /* ---------- i18n: short UI strings only. Longer prose (About
     sections, FAQ answers) uses .lang-block show/hide instead —
     see the per-page inline scripts. ---------- */
  var I18N = {
    navHome:        { en: "Home", ps: "کور", fa: "خانه" },
    navProducts:    { en: "Products", ps: "محصولات", fa: "محصولات" },
    navAbout:       { en: "About Deye", ps: "د Deye په اړه", fa: "درباره Deye" },
    navContact:     { en: "Contact", ps: "اړیکه", fa: "تماس" },
    whatsapp:       { en: "WhatsApp", ps: "واټس اپ", fa: "واتساپ" },
    whatsappUs:     { en: "WhatsApp Us", ps: "واټس اپ کې لیکئ", fa: "در واتساپ بنویسید" },
    getQuote:       { en: "Get Quote", ps: "بیه واخلئ", fa: "استعلام قیمت" },
    browseCatalog:  { en: "Browse Full Catalog", ps: "بشپړ کتالوګ وګورئ", fa: "کاتالوگ کامل" },
    viewFullCatalog:{ en: "View Full Catalog", ps: "بشپړ کتالوګ وګورئ", fa: "مشاهده کاتالوگ کامل" },
    whatsappToday:  { en: "WhatsApp for Today's Price", ps: "د نننۍ بیې لپاره واټس اپ وکړئ", fa: "برای قیمت امروز واتساپ کنید" },
    chatWhatsapp:   { en: "Chat on WhatsApp", ps: "په واټس اپ کې خبرې وکړئ", fa: "چت در واتساپ" },
    searchPh:       { en: "Search Deye models (e.g. SG06, SE-F16, 12kW)", ps: "د Deye ماډلونه لټون کړئ", fa: "جستجوی مدل‌های Deye" },
    allProducts:    { en: "All Products", ps: "ټول محصولات", fa: "همه محصولات" },
    hybridInverters:{ en: "Hybrid Inverters", ps: "هایبرید انورټرونه", fa: "انورترهای هایبرید" },
    lifepo4Batteries:{ en: "LiFePO4 Batteries", ps: "LiFePO4 بیټرۍ", fa: "بطری‌های LiFePO4" },
    noResults:      { en: "No models match your search — try a different term.", ps: "هیڅ ماډل ونه موندل شو — بل کلیدي لغت وکاروئ.", fa: "هیچ مدلی یافت نشد — عبارت دیگری امتحان کنید." },
    catBattery:     { en: "Lithium Battery", ps: "لیتیم بیټرۍ", fa: "بطری لیتیوم" },
    catInverter:    { en: "Hybrid Inverter", ps: "هایبرید انورټر", fa: "انورتر هایبرید" },
    viewDetails:    { en: "View details", ps: "جزئیات وګورئ", fa: "مشاهده جزئیات" },
    specsT:         { en: "Specifications", ps: "مشخصات", fa: "مشخصات" },
    detailsT:       { en: "Key Details", ps: "مهم توضیحات", fa: "جزئیات مهم" },
    officialT:      { en: "Deye official product page", ps: "د Deye رسمي پاڼه", fa: "صفحه رسمی Deye" },
    priceL:         { en: "Price", ps: "بیه", fa: "قیمت" },
    priceV:         { en: "WhatsApp for today's price", ps: "د نننۍ بیې لپاره واټس اپ", fa: "برای قیمت در واتساپ بپرسید" },
    capacityL:      { en: "Capacity", ps: "ظرفیت", fa: "ظرفیت" },
    powerL:         { en: "Power", ps: "برېښنا", fa: "توان" },
    warrantyL:      { en: "Warranty", ps: "ضمانت", fa: "ضمانت" },
    warrantyBatteryV:{ en: "Up to 10-year warranty", ps: "تر ۱۰ کلونو ضمانت", fa: "تا ۱۰ سال ضمانت" },
    warrantyInverterV:{ en: "5-year warranty", ps: "۵ کلن ضمانت", fa: "۵ سال ضمانت" },
    footerQuick:    { en: "Quick Links", ps: "چټک لینکونه", fa: "لینک‌های سریع" },
    footerRange:    { en: "Deye Range", ps: "د Deye لړۍ", fa: "محصولات Deye" },
    footerContact:  { en: "Contact", ps: "اړیکه", fa: "تماس" },
  };

  function cur() {
    var l = localStorage.getItem("lang") || "en";
    return (l === "ps" || l === "fa") ? l : "en";
  }
  function tr(obj, l) { return (obj && (obj[l] || obj.en)) || ""; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function waOpen(text) {
    window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text), "_blank");
  }
  window.DA = { cur: cur, tr: tr, waOpen: waOpen, WA_NUMBER: WA_NUMBER };

  function applyI18n(l) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var d = I18N[el.getAttribute("data-i18n")];
      if (d) el.textContent = tr(d, l);
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var d = I18N[el.getAttribute("data-i18n-ph")];
      if (d) el.setAttribute("placeholder", tr(d, l));
    });
    document.querySelectorAll(".tl-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.lang === l);
    });
    document.querySelectorAll(".lang-btn[data-lang]").forEach(function (b) {
      b.classList.toggle("active", b.dataset.lang === l);
    });
  }

  window.setLang = function (l) {
    localStorage.setItem("lang", l);
    var isRTL = l === "ps" || l === "fa";
    document.documentElement.lang = l;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.body.dir = isRTL ? "rtl" : "ltr";
    applyI18n(l);
    renderAll(l);
  };

  /* ---------- theme ---------- */
  window.toggleTheme = function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  };
  function applyTheme(t) {
    if (t === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    var icon = document.getElementById("themeIcon");
    if (icon) icon.className = t === "dark" ? "fas fa-sun" : "fas fa-moon";
  }

  /* ---------- mobile menu ---------- */
  window.toggleMobileMenu = function () {
    var m = document.getElementById("mobileMenu"), h = document.getElementById("hamburger");
    if (!m || !h) return;
    m.classList.toggle("open"); h.classList.toggle("open");
    document.body.style.overflow = m.classList.contains("open") ? "hidden" : "";
  };

  /* ---------- product facts (Price/Capacity/Warranty) — only
     computed from data actually on the product, plus the two
     warranty lengths the business itself states (5yr inverters,
     up to 10yr batteries). Never a fabricated stock/date figure. ---------- */
  function parseLead(specs) {
    for (var i = 0; i < (specs || []).length; i++) {
      var m = String(specs[i]).match(/([\d.]+)\s*[–-]?\s*([\d.]+)?\s*(kWh|kW|W)\b/i);
      if (m) return { spec: specs[i], hi: parseFloat(m[2] || m[1]), unit: m[3].toLowerCase() };
    }
    return null;
  }
  function productFacts(p, l) {
    var U = function (k) { return tr(I18N[k], l); };
    var facts = [{ label: U("priceL"), value: U("priceV") }];
    var lead = parseLead(p.specs);
    if (lead) facts.push({ label: p.cat === "battery" ? U("capacityL") : U("powerL"), value: lead.spec });
    facts.push({ label: U("warrantyL"), value: p.cat === "battery" ? U("warrantyBatteryV") : U("warrantyInverterV") });
    return facts;
  }

  /* ---------- product card + modal ---------- */
  function cardHTML(p, idx, l) {
    var name = tr(p.name, l);
    var search = [p.name.en, p.name.ps, p.name.fa, p.cat, (p.specs || []).join(" ")].join(" ").toLowerCase();
    return (
      '<article class="pc" data-cat="' + p.cat + '" data-search="' + esc(search) + '">' +
        '<button type="button" class="pc-img" data-idx="' + idx + '" aria-label="' + esc(tr(I18N.viewDetails, l)) + ' — ' + esc(name) + '">' +
          (p.img ? '<img src="' + p.img + '" alt="" loading="lazy">' : "") +
        "</button>" +
        '<div class="pc-body">' +
          '<div class="pc-meta"><span>Deye</span><span>' + esc(tr(I18N[p.cat === "battery" ? "catBattery" : "catInverter"], l)) + "</span></div>" +
          "<h3><button type=\"button\" class=\"pc-title-btn\" data-idx=\"" + idx + '">' + esc(name) + "</button></h3>" +
          '<button class="pc-btn" data-wa="' + esc(name) + '"><i class="fab fa-whatsapp"></i> ' + esc(tr(I18N.getQuote, l)) + "</button>" +
        "</div>" +
      "</article>"
    );
  }

  function closeProduct() {
    var ov = document.getElementById("pmOverlay");
    if (ov) { ov.remove(); document.body.style.overflow = ""; }
  }
  function openProduct(idx) {
    var p = (window.DEYE_PRODUCTS || [])[idx];
    if (!p) return;
    var l = cur(), name = tr(p.name, l);
    var bullets = function (arr, title) {
      var list = arr && (arr[l] || arr.en);
      if (!list || !list.length) return "";
      return '<h4 class="pm-h">' + esc(title) + '</h4><ul class="pm-list">' + list.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
    };
    closeProduct();
    var ov = document.createElement("div");
    ov.id = "pmOverlay"; ov.className = "pm-overlay";
    ov.innerHTML =
      '<div class="pm-sheet" role="dialog" aria-label="' + esc(name) + '">' +
        '<button class="pm-close" aria-label="close">✕</button>' +
        '<div class="pm-img">' + (p.img ? '<img src="' + p.img + '" alt="' + esc(name) + '">' : "") + "</div>" +
        '<div class="pm-meta">Deye · ' + esc(tr(I18N[p.cat === "battery" ? "catBattery" : "catInverter"], l)) + "</div>" +
        "<h3>" + esc(name) + "</h3>" +
        '<p class="pm-desc">' + esc(tr(p.desc, l)) + "</p>" +
        '<div class="pm-facts">' + productFacts(p, l).map(function (f) {
          return '<div class="pm-fact"><span class="pm-fact-label">' + esc(f.label) + '</span><span class="pm-fact-value">' + esc(f.value) + "</span></div>";
        }).join("") + "</div>" +
        bullets(p.details, tr(I18N.detailsT, l)) +
        '<h4 class="pm-h">' + esc(tr(I18N.specsT, l)) + '</h4>' +
        '<div class="pc-specs">' + (p.specs || []).map(function (s) { return '<span class="pc-spec">' + esc(s) + "</span>"; }).join("") + "</div>" +
        '<button class="btn pm-wa" data-wa="' + esc(name) + '"><i class="fab fa-whatsapp"></i> ' + esc(tr(I18N.getQuote, l)) + "</button>" +
        (p.link ? '<a class="pm-link" href="' + esc(p.link) + '" target="_blank" rel="noopener"><i class="fas fa-arrow-up-right-from-square"></i> ' + esc(tr(I18N.officialT, l)) + "</a>" : "") +
      "</div>";
    document.body.appendChild(ov);
    document.body.style.overflow = "hidden";
  }

  document.addEventListener("click", function (e) {
    var wa = e.target.closest("[data-wa]");
    if (wa) { waOpen(wa.getAttribute("data-wa")); return; }
    if (e.target.closest(".pm-close") || e.target.id === "pmOverlay") { closeProduct(); return; }
    var card = e.target.closest("[data-idx]");
    if (card) { openProduct(+card.getAttribute("data-idx")); return; }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeProduct(); });

  /* ---------- HOME: popular picks ---------- */
  function renderPopular(l) {
    var grid = document.getElementById("popGrid");
    if (!grid) return;
    var list = window.DEYE_PRODUCTS || [];
    var html = "";
    for (var i = 0; i < list.length; i++) if (list[i].popular) html += cardHTML(list[i], i, l);
    grid.innerHTML = html;
  }

  /* ---------- PRODUCTS PAGE: full grid, grouped by category ---------- */
  var CAT_ORDER = ["inverter", "battery"];
  function renderCatalog(l) {
    var grid = document.getElementById("prodGrid");
    if (!grid) return;
    var list = window.DEYE_PRODUCTS || [];
    var html = "";
    CAT_ORDER.forEach(function (cat) {
      var items = [];
      list.forEach(function (p, i) { if (p.cat === cat) items.push({ p: p, i: i }); });
      if (!items.length) return;
      html += '<div class="cat-head"><span>' + esc(tr(I18N[cat === "battery" ? "catBattery" : "catInverter"], l)) + "</span></div>";
      items.forEach(function (x) { html += cardHTML(x.p, x.i, l); });
    });
    grid.innerHTML = html;
    if (typeof window.applyProductFilter === "function") window.applyProductFilter();
  }

  function renderAll(l) {
    renderPopular(l);
    renderCatalog(l);
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(localStorage.getItem("theme") || "light");
    var l = cur();
    document.documentElement.lang = l;
    var isRTL = l === "ps" || l === "fa";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.body.dir = isRTL ? "rtl" : "ltr";
    applyI18n(l);
    renderAll(l);

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: .12 });
      document.querySelectorAll("[data-reveal]").forEach(function (el) { io.observe(el); });
    }

    var nav = document.getElementById("mainNav");
    if (nav) window.addEventListener("scroll", function () {
      nav.classList.toggle("nav-scrolled", window.scrollY > 24);
    }, { passive: true });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        var m = document.getElementById("mobileMenu"), h = document.getElementById("hamburger");
        if (m && m.classList.contains("open")) { m.classList.remove("open"); h.classList.remove("open"); document.body.style.overflow = ""; }
      }
    });
  });
})();
