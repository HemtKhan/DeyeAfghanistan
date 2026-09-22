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
    highVoltage:    { en: "High Voltage", ps: "لوړ ولتاژ", fa: "ولتاژ بالا" },
    hvBadge:        { en: "HV", ps: "لوړ ولتاژ", fa: "ولتاژ بالا" },

    /* shared */
    kabulAfghanistan:  { en: "Kabul, Afghanistan", ps: "کابل، افغانستان", fa: "کابل، افغانستان" },
    genuineDeyeProducts:{ en: "Genuine Deye Products", ps: "اصلي Deye محصولات", fa: "محصولات اصلی Deye" },
    warranty510:       { en: "5–10 Year Warranty", ps: "۵–۱۰ کلن ضمانت", fa: "۵–۱۰ سال ضمانت" },
    whatsappSupportLabel:{ en: "WhatsApp Support", ps: "د واټس اپ ملاتړ", fa: "پشتیبانی واتساپ" },
    brandFooterName:   { en: "Deye Afghanistan", ps: "Deye افغانستان", fa: "Deye افغانستان" },
    footerBlurb:       { en: "Genuine Deye hybrid inverters &amp; LiFePO4 batteries in Kabul, Afghanistan.", ps: "اصلي Deye هایبرید انورټرونه او LiFePO4 بیټرۍ په کابل، افغانستان کې.", fa: "انورترهای هایبرید اصلی Deye و بطری‌های LiFePO4 در کابل، افغانستان." },
    footerHybridRange: { en: "Hybrid Inverters 3–80kW", ps: "هایبرید انورټرونه ۳–۸۰ کیلوواټ", fa: "انورترهای هایبرید ۳–۸۰ کیلووات" },
    footerBatteryRange:{ en: "LiFePO4 Batteries", ps: "LiFePO4 بیټرۍ", fa: "بطری‌های LiFePO4" },
    footerMonitoring:  { en: "SolarmanPV Monitoring", ps: "د SolarmanPV څارنه", fa: "مانیتورینگ SolarmanPV" },

    /* index.html */
    homeHeroP: { en: "Genuine Deye hybrid inverters and LiFePO4 lithium batteries — sold in Kabul with a 5-year warranty, up to 10 years on select battery models.",
      ps: "اصلي Deye هایبرید انورټرونه او LiFePO4 لیتیم بیټرۍ — په کابل کې د ۵ کلن ضمانت سره پلورل کیږي، د ځینو بیټرۍ ماډلونو لپاره تر ۱۰ کلونو پورې.",
      fa: "انورترهای هایبرید اصلی Deye و بطری‌های لیتیوم LiFePO4 — در کابل با ۵ سال ضمانت فروخته می‌شود، تا ۱۰ سال برای برخی مدل‌های بطری." },
    tagSinglePhase: { en: "Single-Phase 3–16kW", ps: "یو فاز ۳–۱۶ کیلوواټ", fa: "تک‌فاز ۳–۱۶ کیلووات" },
    tagThreePhase:  { en: "Three-Phase 8–80kW", ps: "درې فاز ۸–۸۰ کیلوواټ", fa: "سه‌فاز ۸–۸۰ کیلووات" },
    tagSolarman:    { en: "SolarmanPV App", ps: "SolarmanPV ایپ", fa: "اپلیکیشن SolarmanPV" },
    statGridSwitching:  { en: "Grid Switching", ps: "د ګرېډ اړول", fa: "سوییچ برق شهری" },
    statPeakEfficiency: { en: "Peak Efficiency", ps: "اعظمي موثریت", fa: "حداکثر بازدهی" },
    statInverterRange:  { en: "Inverter Range", ps: "د انورټر لړۍ", fa: "محدوده انورتر" },
    statBatteryCycles:  { en: "Battery Cycles", ps: "د بیټرۍ سایکلونه", fa: "سایکل‌های بطری" },
    statModelsCatalog:  { en: "Models in Catalog", ps: "ماډلونه په کتالوګ کې", fa: "مدل‌ها در کاتالوگ" },
    catInverterDesc: { en: "Single-phase and three-phase hybrid inverters, 3kW to 80kW, with native LiFePO4 support and 4ms automatic grid-outage switching.",
      ps: "یو فاز او درې فاز هایبرید انورټرونه، ۳ تر ۸۰ کیلوواټ، د LiFePO4 مستقیم ملاتړ او ۴ میلي ثانیې اتومات د ګرېډ بندښت اړولو سره.",
      fa: "انورترهای هایبرید تک‌فاز و سه‌فاز، ۳ تا ۸۰ کیلووات، با پشتیبانی مستقیم LiFePO4 و سویچ خودکار ۴ میلی‌ثانیه‌ای قطعی برق." },
    catBatteryDesc: { en: "Stackable 48V lithium battery modules with a built-in BMS and 6000+ charge/discharge cycles.",
      ps: "د یوځای کیدو وړ 48V لیتیم بیټرۍ ماډلونه د دنننی BMS او ۶۰۰۰+ چارج/ډسچارج سایکلونو سره.",
      fa: "ماژول‌های بطری لیتیومی 48V قابل‌استک با BMS داخلی و بیش از ۶۰۰۰ سایکل شارژ/دشارژ." },
    catFullDesc: { en: "Every Deye inverter and battery we sell, in one place, with specs and warranty details for each.",
      ps: "هر Deye انورټر او بیټرۍ چې موږ یې پلورو، په یو ځای کې، د هر یو د مشخصاتو او ضمانت توضیحاتو سره.",
      fa: "تمام انورترها و بطری‌های Deye که می‌فروشیم، در یک‌جا، با مشخصات و جزئیات ضمانت هر کدام." },
    fullCatalogTitle: { en: "Full Catalog", ps: "بشپړ کتالوګ", fa: "کاتالوگ کامل" },
    modelsCount:      { en: "models", ps: "ماډلونه", fa: "مدل" },
    modelsTotalCount: { en: "models total", ps: "ټول ماډلونه", fa: "مجموع مدل‌ها" },
    browseInverters:  { en: "Browse Inverters", ps: "انورټرونه وګورئ", fa: "مشاهده انورترها" },
    browseBatteries:  { en: "Browse Batteries", ps: "بیټرۍ وګورئ", fa: "مشاهده بطری‌ها" },
    viewAllModels:    { en: "View All", ps: "ټول وګورئ", fa: "مشاهده همه" },
    popularPicksLabel:  { en: "Popular Picks", ps: "مشهور ټاکنې", fa: "محبوب‌ترین‌ها" },
    popularModelsTitle: { en: "Popular Deye Models", ps: "مشهور Deye ماډلونه", fa: "مدل‌های محبوب Deye" },
    whyDeyeLabel: { en: "Why Deye", ps: "ولې Deye", fa: "چرا Deye" },
    whyDeyeTitle: { en: "Built for Afghanistan's Grid", ps: "د افغانستان د برېښنا شبکې لپاره جوړ شوی", fa: "ساخته‌شده برای شبکه برق افغانستان" },
    why1Title: { en: "4ms Automatic Switching", ps: "۴ میلي ثانیې اتومات اړول", fa: "سویچ خودکار ۴ میلی‌ثانیه‌ای" },
    why1Desc:  { en: "Deye hybrid inverters detect a grid outage and switch to battery power in as little as 4 milliseconds — most households never notice the interruption.",
      ps: "Deye هایبرید انورټرونه د ګرېډ بندښت معلوموي او یوازې په ۴ میلي ثانیو کې بیټرۍ برېښنا ته اړوي — ډیری کورنۍ دا وقفه هیڅکله نه احساسوي.",
      fa: "انورترهای هایبرید Deye قطعی برق را تشخیص داده و تنها در ۴ میلی‌ثانیه به برق بطری سویچ می‌کنند — اکثر خانه‌ها اصلاً متوجه این وقفه نمی‌شوند." },
    why2Title: { en: "98.6% Peak Efficiency", ps: "۹۸.۶٪ اعظمي موثریت", fa: "۹۸.۶٪ حداکثر بازدهی" },
    why2Desc:  { en: "SiC MOSFET power electronics keep conversion losses low, so more of the energy your panels generate actually reaches your home.",
      ps: "SiC MOSFET برېښنایی برخې د بدلون تلفات ټیټ ساتي، نو ستاسو د پنلونو تولید شوې ډیره انرژي ستاسو کور ته رسیږي.",
      fa: "الکترونیک قدرت SiC MOSFET تلفات تبدیل را پایین نگه می‌دارد، بنابراین انرژی بیشتری که پنل‌های شما تولید می‌کنند واقعاً به خانه شما می‌رسد." },
    why3Title: { en: "Native LiFePO4 Support", ps: "مستقیم LiFePO4 ملاتړ", fa: "پشتیبانی مستقیم LiFePO4" },
    why3Desc:  { en: "Built from the ground up for 48V lithium batteries — no separate charge controller needed.",
      ps: "د 48V لیتیم بیټریو لپاره له بنسټه جوړ شوی — جلا چارج کنټرولر ته اړتیا نشته.",
      fa: "از پایه برای بطری‌های لیتیومی 48V ساخته شده — نیازی به کنترلر شارژ جداگانه نیست." },
    why4Title: { en: "Monitor From Your Phone", ps: "د خپل ګرځنده څخه څارنه", fa: "مانیتور از موبایل شما" },
    why4Desc:  { en: "Every Deye hybrid inverter connects to the SolarmanPV app, so you can check generation, battery level and consumption in real time.",
      ps: "هر Deye هایبرید انورټر د SolarmanPV ایپ سره نښلي، نو تاسو کولی شئ تولید، بیټرۍ کچه او مصرف په حقیقي وخت کې وګورئ.",
      fa: "هر انورتر هایبرید Deye به اپلیکیشن SolarmanPV وصل می‌شود، بنابراین می‌توانید تولید، سطح بطری و مصرف را به صورت زنده بررسی کنید." },
    why5Title: { en: "Global Manufacturing Scale", ps: "نړیوال تولیدي کچه", fa: "مقیاس تولید جهانی" },
    why5Desc:  { en: "Deye has built hybrid inverters since 2007, listed on the Shanghai Stock Exchange in 2021, from a 600,000㎡ factory in Ningbo, China.",
      ps: "Deye له ۲۰۰۷ راهیسې هایبرید انورټرونه جوړوي، په ۲۰۲۱ کې د شانګهای سټاک ایکسچینج کې لیست شوی، د چین د نینګبو په ۶۰۰,۰۰۰ متر مربع فابریکه کې.",
      fa: "Deye از سال ۲۰۰۷ انورترهای هایبرید تولید می‌کند، در سال ۲۰۲۱ در بورس شانگهای ثبت شده، از یک کارخانه ۶۰۰,۰۰۰ متر مربعی در نینگبو چین." },
    why6Title: { en: "5–10 Year Warranty", ps: "۵–۱۰ کلن ضمانت", fa: "۵–۱۰ سال ضمانت" },
    why6Desc:  { en: "Every Deye inverter and battery we sell carries a 5-year warranty — up to 10 years on select battery models.",
      ps: "هر Deye انورټر او بیټرۍ چې موږ یې پلورو ۵ کلن ضمانت لري — د ځینو بیټرۍ ماډلونو لپاره تر ۱۰ کلونو پورې.",
      fa: "هر انورتر و بطری Deye که می‌فروشیم ۵ سال ضمانت دارد — تا ۱۰ سال برای برخی مدل‌های بطری." },
    homeCtaH2: { en: "Ready to go solar with Deye?", ps: "د Deye سره لمریز کیدو ته چمتو یاست؟", fa: "آماده استفاده از انرژی سولار با Deye هستید؟" },
    homeCtaP:  { en: "Message us on WhatsApp for today's price and a free system recommendation.",
      ps: "د نننۍ بیې او وړیا سیسټم وړاندیز لپاره موږ ته په واټس اپ کې پیغام راولېږئ.",
      fa: "برای قیمت امروز و پیشنهاد رایگان سیستم، در واتساپ برای ما پیام بدهید." },

    /* products.html */
    productsHeroP: { en: "56 genuine Deye hybrid inverters and LiFePO4 batteries, including <strong>High-Voltage (HV) three-phase systems</strong> for larger and commercial installations — 5-year warranty, up to 10 years on select batteries.",
      ps: "۵۶ اصلي Deye هایبرید انورټرونه او LiFePO4 بیټرۍ، پشمول د <strong>لوړ ولتاژ (HV) درې فاز سیسټمونو</strong> د لویو او سوداګریزو نصبونو لپاره — ۵ کلن ضمانت، د ځینو بیټریو لپاره تر ۱۰ کلونو پورې.",
      fa: "۵۶ انورتر هایبرید و بطری LiFePO4 اصلی Deye، شامل <strong>سیستم‌های سه‌فاز ولتاژ بالا (HV)</strong> برای نصب‌های بزرگ و تجاری — ۵ سال ضمانت، تا ۱۰ سال برای برخی بطری‌ها." },
    productsCantFindH2: { en: "Can't find the right model?", ps: "سم ماډل نه مومئ؟", fa: "مدل مناسب را پیدا نمی‌کنید؟" },
    productsCantFindP:  { en: "Tell us your appliance load or building type on WhatsApp and we'll help you pick the right Deye inverter and battery size.",
      ps: "خپل د وسایلو بار یا د ودانۍ ډول موږ ته په واټس اپ کې ووایاست، موږ به ستاسو سره د سم Deye انورټر او بیټرۍ اندازې په ټاکلو کې مرسته وکړو.",
      fa: "بار وسایل یا نوع ساختمان خود را در واتساپ به ما بگویید، ما به شما در انتخاب اندازه مناسب انورتر و بطری Deye کمک می‌کنیم." },

    /* about.html */
    aboutHeroP: { en: "The manufacturer, the technology behind a hybrid inverter, and warranty terms on what we sell.",
      ps: "تولیدونکی، د هایبرید انورټر شاته ټیکنالوژي، او د هغه څه چې موږ یې پلورو د ضمانت شرایط.",
      fa: "تولیدکننده، فناوری پشت یک انورتر هایبرید، و شرایط ضمانت آنچه می‌فروشیم." },
    aboutCtaH2: { en: "Have a question about your building?", ps: "ستاسو د ودانۍ په اړه پوښتنه لرئ؟", fa: "سوالی درباره ساختمان خود دارید؟" },
    aboutCtaP:  { en: "Send us a photo of your meter box or appliance list on WhatsApp and we'll help you pick the right Deye setup.",
      ps: "د خپل میتر بکس عکس یا د وسایلو لیست موږ ته په واټس اپ کې واستوئ، موږ به ستاسو سره د سم Deye تنظیم په ټاکلو کې مرسته وکړو.",
      fa: "عکس جعبه میتر یا لیست وسایل خود را در واتساپ برای ما بفرستید، ما به شما در انتخاب تنظیمات مناسب Deye کمک می‌کنیم." },

    /* contact.html */
    contactHeroP: { en: "WhatsApp is the fastest way to reach us — message us directly or use the form below to open a pre-filled WhatsApp chat.",
      ps: "واټس اپ ستاسو د موږ سره اړیکې لپاره ترټولو چټک لاره ده — مستقیم موږ ته پیغام راولېږئ یا لاندې فورمه وکاروئ ترڅو مخکې ډک شوی واټس اپ چیټ خلاص کړئ.",
      fa: "واتساپ سریع‌ترین راه برای تماس با ماست — مستقیماً برای ما پیام بدهید یا از فرم زیر برای باز کردن یک چت واتساپ از پیش پر شده استفاده کنید." },
    cardWhatsappUs: { en: "WhatsApp Us", ps: "موږ ته واټس اپ وکړئ", fa: "در واتساپ به ما پیام دهید" },
    cardCallUs:     { en: "Call Us", ps: "موږ ته زنګ ووهئ", fa: "با ما تماس بگیرید" },
    cardLocation:   { en: "Location", ps: "موقعیت", fa: "موقعیت" },
    sendMessageH2:  { en: "Send Us a Message", ps: "موږ ته پیغام راولېږئ", fa: "برای ما پیام بفرستید" },
    sendMessageSub: { en: "Fill this in and we'll open WhatsApp with your message ready to send — nothing is stored or emailed, it goes straight to our WhatsApp.",
      ps: "دا ډک کړئ، موږ به واټس اپ ستاسو د پیغام سره چمتو خلاص کړو — هیڅ شی نه زیرمه کیږي او نه ایمیل کیږي، مستقیم زموږ واټس اپ ته ځي.",
      fa: "این را پر کنید تا واتساپ را با پیام آماده شما باز کنیم — چیزی ذخیره یا ایمیل نمی‌شود، مستقیم به واتساپ ما می‌رود." },
    fullNameLabel: { en: "Full Name", ps: "بشپړ نوم", fa: "نام کامل" },
    fullNamePh:    { en: "Enter your full name", ps: "خپل بشپړ نوم ولیکئ", fa: "نام کامل خود را وارد کنید" },
    yourPhoneLabel:{ en: "Your Phone Number", ps: "ستاسو د تلیفون شمېره", fa: "شماره تلفن شما" },
    phonePh:       { en: "Enter your phone number", ps: "خپله د تلیفون شمېره ولیکئ", fa: "شماره تلفن خود را وارد کنید" },
    subjectLabel:  { en: "Subject", ps: "موضوع", fa: "موضوع" },
    subjInverter:  { en: "Deye Inverter Inquiry", ps: "د Deye انورټر پوښتنه", fa: "استعلام انورتر Deye" },
    subjBattery:   { en: "Deye Battery Inquiry", ps: "د Deye بیټرۍ پوښتنه", fa: "استعلام بطری Deye" },
    subjQuote:     { en: "Get a Quote", ps: "بیه واخلئ", fa: "استعلام قیمت" },
    subjWarranty:  { en: "Warranty Question", ps: "د ضمانت پوښتنه", fa: "سوال ضمانت" },
    subjOther:     { en: "Other", ps: "نور", fa: "سایر" },
    messageLabel:  { en: "Message", ps: "پیغام", fa: "پیام" },
    messagePh:     { en: "Tell us about your building and appliance load...", ps: "زموږ سره د خپلې ودانۍ او د وسایلو بار په اړه ووایاست...", fa: "درباره ساختمان و بار وسایل خود به ما بگویید..." },
    formNote:      { en: "This opens WhatsApp with your details filled in — you send it yourself from there.", ps: "دا به واټس اپ ستاسو د معلوماتو سره ډک خلاص کړي — تاسو یې له هغه ځایه استوئ.", fa: "این واتساپ را با جزئیات شما پر شده باز می‌کند — شما خودتان از آنجا ارسال می‌کنید." },
    openWhatsappSubmit: { en: "Open WhatsApp with This Message", ps: "د دې پیغام سره واټس اپ خلاص کړئ", fa: "باز کردن واتساپ با این پیام" },
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
      if (!d) return;
      if (el.tagName === "OPTION") el.textContent = tr(d, l);
      else el.innerHTML = tr(d, l);
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
    var search = [p.name.en, p.name.ps, p.name.fa, p.cat, (p.specs || []).join(" "), p.hv ? "high voltage hv" : ""].join(" ").toLowerCase();
    return (
      '<article class="pc" data-cat="' + p.cat + '" data-voltage="' + (p.hv ? "hv" : "lv") + '" data-search="' + esc(search) + '">' +
        '<button type="button" class="pc-img" data-idx="' + idx + '" aria-label="' + esc(tr(I18N.viewDetails, l)) + ' — ' + esc(name) + '">' +
          (p.hv ? '<span class="hv-badge">' + esc(tr(I18N.hvBadge, l)) + '</span>' : "") +
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
      items.sort(function (a, b) { return (b.p.hv ? 1 : 0) - (a.p.hv ? 1 : 0); }); // HV models first
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
