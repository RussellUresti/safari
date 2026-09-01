/* =========================================================================
   data.js — content for the inspiration board.
   SCOPE NOTE: only East Africa > Kenya > Masai Mara is populated right now.
   This is the working example for the site shell build. Once the shell is
   approved, the remaining 14 sub-regions get filled in against this same
   schema (see schema notes inline below).
   ========================================================================= */

const TRIP_DATA = {

  // ---- species dictionary --------------------------------------------
  // priorityTier: must_see | would_like | if_chance | anchor | incidental
  species: {
    lion:        { id: "lion",        name: "Lions",                    priorityTier: "must_see",   icon: "lion" },
    leopard:     { id: "leopard",     name: "Leopards",                 priorityTier: "must_see",   icon: "leopard" },
    cheetah:     { id: "cheetah",     name: "Cheetahs",                 priorityTier: "must_see",   icon: "cheetah" },
    elephant:    { id: "elephant",    name: "Elephants",                priorityTier: "must_see",   icon: "elephant" },
    giraffe:     { id: "giraffe",     name: "Giraffes",                 priorityTier: "would_like",  icon: "giraffe" },
    gorilla:     { id: "gorilla",     name: "Mountain gorillas",        priorityTier: "would_like",  icon: "gorilla" },
    "wild-dog":  { id: "wild-dog",    name: "Wild dogs",                priorityTier: "if_chance",   icon: "wilddog" },
    roller:      { id: "roller",      name: "Lilac-breasted roller",    priorityTier: "if_chance",   icon: "roller" },
    owlet:       { id: "owlet",       name: "African barred owlet",     priorityTier: "if_chance",   icon: "owlet" },
    kingfisher:  { id: "kingfisher",  name: "Malachite kingfisher",     priorityTier: "if_chance",   icon: "kingfisher" },
    whale:       { id: "whale",       name: "Southern right whales",    priorityTier: "anchor",      icon: "whale" },
    penguin:     { id: "penguin",     name: "African penguins",         priorityTier: "incidental",  icon: "penguin" }
  },

  // ---- legend / display config -----------------------------------------
  legend: {
    status: {
      preferred:    { label: "Preferred",    description: "Current top pick" },
      backup:       { label: "Backup",       description: "Logged fallback if the preferred option falls through" },
      extension:    { label: "Extension",    description: "Possible add-on, not part of the core itinerary" },
      rejected:     { label: "Rejected",     description: "Investigated and dropped" },
      neutral:      { label: "Considered",   description: "Logged for reference, no strong verdict either way" },
      unresearched: { label: "Unresearched", description: "Named as a candidate, not yet dug into" }
    },
    likelihood: {
      highly_likely:   { label: "Highly likely",   fill: 4 },
      somewhat_likely: { label: "Somewhat likely", fill: 3 },
      unlikely:        { label: "Rare",            fill: 1 },
      not_present:     { label: "Not present",     fill: 0 }
    }
  },

  // ---- regions (tabs) ----------------------------------------------------
  regions: [
    { id: "east-africa",    label: "East Africa",    countryIds: ["uganda", "rwanda", "kenya", "tanzania"] },
    { id: "central-africa", label: "Central Africa",  countryIds: ["zimbabwe", "botswana", "zambia"] },
    { id: "southern-africa",label: "Southern Africa", countryIds: ["south-africa"] }
  ],

  // ---- countries ---------------------------------------------------------
  countries: {
    uganda: {
      id: "uganda",
      name: "Uganda",
      flagEmoji: "\ud83c\uddfa\ud83c\uddec",
      regionId: "east-africa",
      visaRequired: true,
      visaInfo: {
        summary: "eVisa required, apply in advance \u2014 $50, valid 90 days from approval. Requires a yellow fever certificate as a supporting document.",
        body: "Single-entry tourist eVisa: $50, valid for stays up to 90 days. Apply only at the official government portal, visas.immigration.go.ug \u2014 Uganda's immigration ministry has published repeated warnings about fraudulent third-party sites charging inflated \u201cprocessing fees.\u201d Processing typically takes 3\u20137 business days. The approval letter (PDF) must be printed and carried, since some border officials still want the physical copy even though it's an eVisa. Requires a yellow fever vaccination certificate as a supporting document \u2014 Uganda requires this from all travelers over 1 year old regardless of origin, not just those arriving from endemic countries. Passport: 6+ months validity, 2 blank pages."
      },
      medicalInfo: {
        summary: "Yellow fever vaccination mandatory for every traveler. Gorilla trek fitness and altitude notes apply specifically to the Rushaga/GHE trek.",
        body: "Yellow fever: Uganda requires a certificate from every traveler over 1 year old, regardless of origin \u2014 mandatory here, not conditional the way it is at the other stops on this route. The certificate becomes valid 10 days after vaccination and, since WHO no longer requires a booster, is recognized for life. Gorilla trek fitness: over 90% of trekkers successfully complete their assigned trek. Rushaga (the GHE sector used for this trip) is rated \u201cstrenuous\u201d \u2014 steeper climbs than Buhoma or Ruhija, one notch below Nkuringo as Bwindi's hardest sector. The Gorilla Habituation Experience specifically lengthens the hike-in itself: guests join the tracking team rather than being guided to an already-known position, which can mean 5+ hours of hiking before the 4 hours with the family even starts, versus roughly 1\u20132 hours for a standard trek. A 4\u20136 week walking-based fitness prep plan is genuinely worthwhile given that extra time, though not required \u2014 porters ($15\u2013$20) are commonly recommended regardless of fitness level. Altitude sickness risk is low: Bwindi's elevation profile is a single-day ascend-and-return, below the threshold where true AMS becomes a real concern, so no Diamox or acclimatization strategy is needed."
      },
      subregionIds: ["bwindi", "kibale"]
    },
    kenya: {
      id: "kenya",
      name: "Kenya",
      flagEmoji: "\ud83c\uddf0\ud83c\uddea",
      regionId: "east-africa",
      visaRequired: true,
      visaInfo: {
        summary: "eTA required, apply in advance — $30\u2013$39, valid 90 days from approval.",
        body: "Standard eTA: $30 base fee (effectively $34\u2013$39 with a card-processing surcharge; debit cards reportedly avoid it), single entry, valid 90 days from date of approval \u2014 not from arrival. Apply only at the official portal, etakenya.go.ke. Processing is typically ~3 business days, up to 5. A 5-year multiple-entry eTA exists for US citizens at $185, but isn't worth it for a single trip. Passport: 6+ months validity, 1 blank page required. A yellow fever certificate is required on arrival, since this itinerary arrives from Uganda, which is yellow-fever-endemic."
      },
      medicalInfo: {
        summary: "Yellow fever certificate required (cascades from Uganda). No Kenya-specific vaccine notes beyond the standard panel.",
        body: "Kenya requires a yellow fever certificate on arrival because this itinerary arrives from Uganda, a yellow-fever-endemic country \u2014 the same certificate obtained for Uganda covers this automatically. No additional Kenya-specific vaccination requirements were identified beyond the standard travel panel (routine vaccines, hepatitis A/typhoid as generally recommended, malaria prophylaxis as advised by a travel clinic for the Mara region)."
      },
      subregionIds: ["masai-mara", "amboseli", "laikipia"]
    },
    rwanda: {
      id: "rwanda",
      name: "Rwanda",
      flagEmoji: "🇷🇼",
      regionId: "east-africa",
      visaRequired: true,
      visaInfo: {
        summary: "Visa on arrival, no advance application needed — $50 single-entry (30 days) or $70 multiple-entry (90 days). Not part of the core route; relevant only if this Volcanoes National Park research is ever turned into an itinerary change.",
        body: "Confirmed directly against the official portal, migration.gov.rw (Directorate General of Immigration and Emigration): the US is not an African Union/Commonwealth/La Francophonie member, so US citizens don't get Rwanda's free visa-waiver tier — instead, a Tourist/Holiday Visa (V1) is issued visa-on-arrival at Kigali International Airport or any land border, no pre-approval required, for $50 single-entry (30 days) or $70 multiple-entry (90 days). An eVisa can also be applied for in advance at the same portal if skipping the arrival queue is preferred, but unlike Uganda/Kenya/Zimbabwe, advance application isn't necessary here — Rwanda's policy (in place since Jan 2018) grants on-arrival visas to citizens of every country. Passport: 6+ months validity, 1 blank page. Rwanda is not part of the core 5-country route — its visa cost isn't folded into the trip's visa total unless this leg is actually added. Note: if Rwanda is ever added alongside Uganda and Kenya, the East Africa Tourist Visa (EATV, $100, 90-day multiple entry across all three) becomes cheaper and more flexible than three separate visas ($130–159 total) — worth revisiting if this section is ever acted on."
      },
      medicalInfo: {
        summary: "Yellow fever certificate not required for direct US arrival, but is required if entering from Uganda (or another endemic country) — the certificate already needed for Uganda would cover it. Volcanoes NP treks start from a higher gate and carry genuine altitude-sickness risk, unlike Bwindi.",
        body: "Yellow fever: not required for direct arrival from the US — Rwanda was removed from WHO's yellow-fever-endemic list and only requires the certificate from travelers arriving from (or transiting more than 12 hours through) a country with yellow fever risk. Since Uganda qualifies, this would apply if Rwanda were ever visited as part of the same trip as Uganda — but the certificate already needed for Uganda's mandatory requirement covers it with no separate action required. Altitude: this is a real point of contrast with Bwindi. Bwindi's elevation range (1,160–2,607m) sits below the ~2,400–2,500m threshold most medical/travel sources treat as where true acute mountain sickness (AMS) becomes plausible, but Volcanoes National Park treks start from a ~2,400m gate and can exceed 3,000m — genuinely higher AMS risk than anything currently on this itinerary. Worth revisiting acclimatization/Diamox guidance specifically if this leg is ever added, rather than assuming Bwindi's \"low risk, no need to research it\" conclusion carries over."
      },
      subregionIds: ["volcanoes-national-park"]
    },
    tanzania: {
      id: "tanzania",
      name: "Tanzania",
      flagEmoji: "\ud83c\uddf9\ud83c\uddff",
      regionId: "east-africa",
      visaRequired: true,
      visaInfo: {
        summary: "eVisa required, apply in advance \u2014 US citizens specifically need the $100 Multiple Entry Visa, not the standard $50 rate other nationalities pay.",
        body: "Confirmed directly on the official portal's guidelines page: US citizens must apply for the Multiple Entry Visa ($100) for tourism, rather than the Ordinary/Single Entry visa ($50) other nationalities are eligible for \u2014 a reciprocity measure matching what the US charges Tanzanian citizens for a US visa, and not avoidable by requesting single-entry instead. Valid 1 year from issuance, capped at 90 days per stay. Apply only at the official portal, visa.immigration.go.tz (also reachable via immigration.go.tz) \u2014 as with Uganda, avoid third-party sites charging inflated \u201cservice fees\u201d on top of the government rate. Passport: 6+ months validity, 1 blank page. This country isn't part of the core 5-country route \u2014 relevant only if the Ngorongoro/Tanzania extension is added."
      },
      medicalInfo: {
        summary: "Yellow fever certificate required on arrival from Kenya, Uganda, Ethiopia, or Rwanda \u2014 the same certificate already needed for Uganda covers this.",
        body: "Yellow fever is not present in Tanzania itself, so this requirement exists to protect the country rather than the traveler. A certificate is required from all travelers over 1 year old arriving from or transiting through a yellow-fever-risk country \u2014 Kenya, Uganda, Ethiopia, and Rwanda all qualify. Since this extension's own routing goes Nairobi \u2192 Arusha to reach Tanzania, that requirement would apply here \u2014 but the same certificate already obtained for the mandatory Uganda requirement satisfies it, consistent with the cascade already confirmed for the rest of the route. No additional vaccination needed beyond what's already planned for Uganda."
      },
      subregionIds: ["ngorongoro-crater"]
    },
    zimbabwe: {
      id: "zimbabwe",
      name: "Zimbabwe",
      flagEmoji: "\ud83c\uddff\ud83c\uddfc",
      regionId: "central-africa",
      visaRequired: true,
      visaInfo: {
        summary: "eVisa or visa-on-arrival, both available \u2014 $30, single entry, 30 days. The standard single-entry eVisa is the right pick for this itinerary.",
        body: "US citizens are \u201cCategory B\u201d \u2014 eligible for visa-on-arrival ($30 cash, single entry, 30 days) at Victoria Falls or Harare airports, but the eVisa (evisa.gov.zw) is recommended in advance to skip the arrival queue. Same $30 fee, 3\u20137 business day processing (allow up to 10 during Jul\u2013Sep peak season). Double-entry ($45) and multiple-entry ($55, 180 days) options exist but aren't needed here, since this itinerary passes through Zimbabwe once, single-direction, on the way into the Pangolin-collected Botswana leg. The KAZA UniVisa ($50, unlimited Zimbabwe\u2194Zambia crossings + Botswana day trips) isn't worth it for this itinerary either \u2014 the Zambia side trip was declined, and the Botswana leg is a multi-night stay collected directly by Pangolin, not a KAZA-eligible day trip. Passport: 6+ months validity, 2 blank pages."
      },
      medicalInfo: {
        summary: "Yellow fever certificate required on arrival from an endemic country \u2014 Uganda and Kenya both qualify, so the certificate already needed for Uganda covers this leg too.",
        body: "No Zimbabwe-specific vaccination requirements were identified beyond the yellow fever cascade already established for this route: since Uganda (mandatory for all travelers) and Kenya (endemic-country transit) both precede this leg, the certificate obtained before departure automatically satisfies Zimbabwe's conditional requirement. No additional vaccination is needed beyond the standard travel panel."
      },
      subregionIds: ["victoria-falls"]
    },
    zambia: {
      id: "zambia",
      name: "Zambia",
      flagEmoji: "🇿🇲",
      regionId: "central-africa",
      visaRequired: true,
      visaInfo: {
        summary: "Not yet researched in detail — Zambia is an extension candidate, not part of the core 5-country route, so a standalone eVisa/cost breakdown hasn't been done.",
        body: "Zambia isn't part of the core route, so it wasn't included in the full visa pass done for the five core countries. The one Zambia-adjacent product actually researched is the KAZA UniVisa ($50, 30 days, unlimited Zimbabwe↔Zambia crossings plus Botswana day trips via Kazungula) — evaluated and ruled not worth it for this itinerary, since the Zambia side trip (Devil's Pool/Livingstone Island) was declined and the Botswana leg is a multi-night Pangolin-collected stay, not a KAZA-eligible day trip. If the South Luangwa extension moves from “considered” to “booked,” a standalone Zambia eVisa cost/process check is a genuine open item, not yet done."
      },
      medicalInfo: {
        summary: "Not yet researched — no Zambia-specific vaccination requirements have been confirmed in this planning process.",
        body: "The yellow fever cascade note elsewhere in this research (one certificate, obtained for Uganda, covering Kenya/Zimbabwe/Botswana/South Africa's conditional requirements) has not been explicitly extended to Zambia. Zambia is generally understood to carry a similar conditional requirement for travelers arriving from an endemic country — which this itinerary would satisfy via the same certificate — but this hasn't been directly confirmed against an official Zambian source the way the other legs have been."
      },
      subregionIds: ["south-luangwa", "lower-zambezi"]
    },
    botswana: {
      id: "botswana",
      name: "Botswana",
      flagEmoji: "🇧🇼",
      regionId: "central-africa",
      visaRequired: false,
      visaInfo: {
        summary: "Visa-free for US citizens — up to 90 days within any 365-day period, entry stamp only.",
        body: "No visa needed for US citizens. Up to 90 days within any 365-day period, entry stamp only on arrival. Passport: 6+ months validity recommended (no hard minimum found the way Uganda/Kenya/Zimbabwe specify one). A yellow fever certificate is technically required if arriving from an endemic country — Uganda and Kenya both qualify on this itinerary — though in practice it's rarely checked at Botswana's Kasane/Maun entry points for travelers arriving via light aircraft from Zimbabwe. Worth having it in hand regardless, since it's already needed for Uganda, Kenya, and South Africa."
      },
      medicalInfo: {
        summary: "Yellow fever certificate technically required on arrival from Uganda or Kenya, though rarely enforced at Kasane/Maun — the certificate already needed for Uganda covers it regardless.",
        body: "No Botswana-specific vaccination requirements were identified beyond the yellow fever cascade already established for this route. The certificate obtained before departure (mandatory for Uganda) satisfies Botswana's conditional requirement, even though enforcement at the light-aircraft entry points used on this itinerary (Kasane, Maun) is reportedly inconsistent in practice. No additional vaccination is needed beyond the standard travel panel."
      },
      subregionIds: ["chobe-okavango-delta", "tuli-mashatu"]
    },
    "south-africa": {
      id: "south-africa",
      name: "South Africa",
      flagEmoji: "🇿🇦",
      regionId: "southern-africa",
      visaRequired: false,
      visaInfo: {
        summary: "Visa-free for US citizens — up to 90 days for tourism/business.",
        body: "No visa needed for US citizens. Up to 90 days for tourism/business. Passport: South Africa's own official rule (per the US State Department's South Africa page) is just 30 days' validity beyond exit date + 2 consecutive blank visa pages — noticeably more lenient than the 6-month rule elsewhere on this route, but moot in practice given the passport will already carry 6+ months of validity for Uganda/Kenya/Zimbabwe."
      },
      medicalInfo: {
        summary: "Yellow fever certificate required if arriving from an endemic country — Uganda and Kenya both qualify, so the certificate already needed for Uganda covers this leg too.",
        body: "No South Africa-specific vaccination requirements were identified beyond the yellow fever cascade already established for this route. A certificate is required if arriving from an endemic country — Uganda and Kenya both qualify on this itinerary — so the certificate obtained before departure (mandatory for Uganda) automatically satisfies this leg as well."
      },
      subregionIds: ["greater-kruger", "kalahari"]
    }
  },

  // ---- sub-regions ---------------------------------------------------------
  subregions: {

    bwindi: {
      id: "bwindi",
      name: "Bwindi",
      countryId: "uganda",
      blurb: "Bwindi Impenetrable Forest \u2014 the single most physically demanding activity on the trip, front-loaded before safari days stack up. The core decision here was standard trekking versus the Gorilla Habituation Experience: 4 hours with a semi-habituated family in a group of 4, versus 1 hour in a group of 8 on the standard permit.",
      animals: [
        { speciesId: "gorilla",    likelihood: "highly_likely" },
        { speciesId: "kingfisher", likelihood: "somewhat_likely" },
        { speciesId: "leopard",    likelihood: "unlikely" },
        { speciesId: "elephant",   likelihood: "unlikely" },
        { speciesId: "owlet",      likelihood: "unlikely" },
        { speciesId: "lion",       likelihood: "not_present" },
        { speciesId: "cheetah",    likelihood: "not_present" },
        { speciesId: "giraffe",    likelihood: "not_present" },
        { speciesId: "wild-dog",   likelihood: "not_present" },
        { speciesId: "roller",     likelihood: "not_present" }
      ],

      lodges: [],

      tours: [
        {
          id: "nextgensafaris-ghe",
          type: "tour",
          status: "preferred",
          name: "Nextgensafaris \u2014 Gorilla Habituation Experience",
          duration: "3 days / 2 nights",
          price: { total: "$3,000", note: "solo \u2014 $2,400 pp on a 2-pax sharing basis" },
          summary: "Transport, a Rushaga-area lodge, and a 4-hour Gorilla Habituation Experience trek with a semi-habituated family, bundled into one package.",
          rationale: "GHE gives 4 hours with the gorilla family in a group of 4, versus 1 hour in a group of 8 on the standard permit \u2014 directly serves the photography priority, worth the roughly $900\u2013$1,000pp premium over a standard trek.",
          keyFacts: [
            { label: "Sector", value: "Rushaga \u2014 the only sector currently offering GHE" },
            { label: "Group size", value: "4 (vs. 8 on the standard permit)" }
          ],
          links: [{ label: "Nextgensafaris", url: "https://nextgensafaris.com/3-days-gorilla-habituation-experience/" }],
          _sourceRefs: ["research.md > Uganda > Bwindi > Tour Operators & Packages Considered", "budget.md > Uganda"]
        },
        {
          id: "encounter-africa-safaris",
          type: "tour",
          status: "unresearched",
          name: "Encounter Africa Safaris",
          duration: "3 days (GHE)",
          price: { total: "Not published" },
          summary: "Specializes in GHE permit acquisition, paired correctly with Rushaga/Nkuringo-area accommodation.",
          rationale: "Logged as a GHE-capable operator worth a direct quote from; not yet priced or compared in detail against Nextgensafaris.",
          keyFacts: [],
          links: [{ label: "Encounter Africa Safaris", url: "https://encounterafricasafaris.com/" }],
          _sourceRefs: ["research.md > Uganda > Bwindi > Tour Operators & Packages Considered"]
        },
        {
          id: "gorilla-tracking-uganda",
          type: "tour",
          status: "unresearched",
          name: "Gorilla Tracking Uganda \u2014 3 Day Fly-in GHE Tour",
          duration: "3 days, fly-in via Kisoro Airstrip",
          price: { total: "Not published" },
          summary: "Fly-in GHE tour via Kisoro Airstrip rather than a road transfer.",
          rationale: "No published price found yet \u2014 logged as a candidate for a direct quote.",
          keyFacts: [],
          links: [{ label: "Gorilla Tracking Uganda", url: "https://www.gorilla-tracking-uganda.com/gorilla-habituation-experience-safaris/3-day-fly-gorilla-habituation-experience-tour/" }],
          _sourceRefs: ["research.md > Uganda > Bwindi > Tour Operators & Packages Considered"]
        },
        {
          id: "rwanda-gorilla",
          type: "tour",
          status: "unresearched",
          name: "Rwanda Gorilla \u2014 3 Days Uganda Gorilla Habituation Tour",
          duration: "3 days, fly-in via Kihihi (45 min flight)",
          price: { total: "Not published" },
          summary: "Fly-in GHE tour via Kihihi airstrip, despite the operator's name being Uganda-focused for this itinerary.",
          rationale: "No published price found yet \u2014 logged as a candidate for a direct quote.",
          keyFacts: [],
          links: [{ label: "Rwanda Gorilla", url: "https://www.rwandagorilla.com/gorilla-tours/3-days-uganda-gorilla-habituation-tour/" }],
          _sourceRefs: ["research.md > Uganda > Bwindi > Tour Operators & Packages Considered"]
        },
        {
          id: "katona-tours",
          type: "tour",
          status: "unresearched",
          name: "Katona Tours and Travel",
          duration: "3 days (GHE)",
          price: { total: "Not published" },
          summary: "Also offers GHE bookings in the Rushaga sector.",
          rationale: "Logged as a GHE-capable operator; not yet priced or compared.",
          keyFacts: [],
          links: [{ label: "Katona Tours and Travel", url: "https://www.katonatours.com/gorilla-trekking-uganda/gorilla-habituation-experience-uganda-bwindi-forest/" }],
          _sourceRefs: ["research.md > Uganda > Bwindi > Tour Operators & Packages Considered"]
        },
        {
          id: "ngoni-safaris-uganda",
          type: "tour",
          status: "rejected",
          name: "NGONI Safaris Uganda \u2014 Gorilla Trekking & Batwa Experience",
          duration: "3 days",
          price: { total: "$1,540", note: "2-traveler price shown; private tour, so vehicle/guide costs may not split for a solo booking" },
          summary: "Standard 1-hour gorilla trek plus a Batwa cultural experience, private tour with an 8\u20139hr guided drive to Rushaga.",
          rationale: "A standard-trek option, not preferred relative to the Gorilla Habituation Experience \u2014 kept for reference against the GHE decision.",
          keyFacts: [{ label: "Rating", value: "4.8/5 (181 reviews)" }],
          links: [{ label: "NGONI Safaris Uganda", url: "https://ngonisafarisuganda.com/package/3-day-gorilla-trekking-mist-and-batwa-experience/" }],
          _sourceRefs: ["research.md > Uganda > Bwindi > Tour Operators & Packages Considered"]
        },
        {
          id: "bugoli-adventures",
          type: "tour",
          status: "rejected",
          name: "Bugoli Adventures \u2014 Bwindi Gorilla Trek and Lake Bunyonyi Tour",
          duration: "3 days",
          price: { total: "$1,665", note: "pp; corrected from an earlier logged figure of $1,375\u2013$1,426 pp" },
          summary: "Standard 1-hour gorilla trek combined with a Lake Bunyonyi visit, shared group (max 6).",
          rationale: "A standard-trek option, not preferred relative to GHE. Also requires a minimum of 2 people to run.",
          keyFacts: [
            { label: "Rating", value: "5.0/5 (48 reviews)" },
            { label: "Minimum group", value: "2 people" }
          ],
          links: [{ label: "Bugoli Adventures", url: "https://www.bugoliadventures.com/" }],
          _sourceRefs: ["research.md > Uganda > Bwindi > Tour Operators & Packages Considered"]
        },
        {
          id: "jenik-tours",
          type: "tour",
          status: "rejected",
          name: "Jenik Tours and Travels \u2014 Gorilla Flying Safari",
          duration: "3 days",
          price: { total: "$2,420", note: "2-traveler price shown; private tour" },
          summary: "Standard 1-hour gorilla trek, private tour, fly-in via Kihihi/Kisoro to a lodge bordering Bwindi.",
          rationale: "A standard-trek option, not preferred relative to GHE.",
          keyFacts: [{ label: "Rating", value: "5.0/5 (7 reviews)" }],
          links: [{ label: "Jenik Tours and Travels", url: "https://www.jeniktours.com/gorilla-safaris/3-days-gorilla-flying-safari/" }],
          _sourceRefs: ["research.md > Uganda > Bwindi > Tour Operators & Packages Considered"]
        }
      ]
    },

    kibale: {
      id: "kibale",
      name: "Kibale",
      countryId: "uganda",
      blurb: "Chimpanzee trekking is explicitly out of scope for the core itinerary \u2014 Kibale and Bwindi sit ~350km / 6\u20137 hours apart by road with no quick flight shortcut, and combining them independently pushed the itinerary to 5\u20138+ days versus the clean 3-day GHE shape used for gorillas alone. Logged here as a possible future add-on if a bundled package can resolve that time cost.",
      animals: [
        { speciesId: "elephant",   likelihood: "somewhat_likely" },
        { speciesId: "kingfisher", likelihood: "somewhat_likely" },
        { speciesId: "leopard",    likelihood: "unlikely" },
        { speciesId: "owlet",      likelihood: "unlikely" },
        { speciesId: "gorilla",    likelihood: "not_present" },
        { speciesId: "lion",       likelihood: "not_present" },
        { speciesId: "cheetah",    likelihood: "not_present" },
        { speciesId: "giraffe",    likelihood: "not_present" },
        { speciesId: "wild-dog",   likelihood: "not_present" },
        { speciesId: "roller",     likelihood: "not_present" }
      ],

      lodges: [],

      tours: [
        {
          id: "wild-eye-primates-of-uganda",
          type: "tour",
          status: "extension",
          name: "Wild Eye \u2014 Primates of Uganda",
          duration: "8 nights (28 Jun\u20136 Jul 2028)",
          price: { total: "$15,525", note: "Early Bird rate $14,750" },
          summary: "Combines Bwindi gorilla trekking and Kibale chimpanzee trekking in a single fixed-length package.",
          rationale: "Chimpanzee trekking was dropped early in planning since combining Kibale independently with Bwindi pushed the itinerary to 5\u20138+ days versus the clean 3-day GHE shape. This bundled package may resolve that objection if its total length holds up against the gorillas-only Uganda leg \u2014 but it's still unconfirmed whether it uses the standard 1-hour trek or the preferred GHE for the Bwindi portion, which needs resolving before treating this as a genuine replacement for the current plan rather than just an add-on.",
          keyFacts: [{ label: "2028 departure", value: "28 Jun\u20136 Jul" }],
          links: [{ label: "Wild Eye", url: "https://wild-eye.com/photographic-travel/primates-of-uganda/" }],
          _sourceRefs: ["research.md > Uganda > Multi-Site (Bwindi + Kibale Primates)", "extensions.md > Uganda > Kibale"]
        }
      ]
    },

    "volcanoes-national-park": {
      id: "volcanoes-national-park",
      name: "Volcanoes National Park",
      countryId: "rwanda",
      blurb: "Investigated for completeness (Aug 2026) against the locked-in Uganda plan, not as an active alternative. Rwanda has no Gorilla Habituation Experience equivalent at any price — every trek, standard or private, runs to the same one-hour format, versus Uganda's 4-hour GHE. The standard permit alone is $1,500pp for that one hour, roughly what Uganda's 4-hour GHE costs (~$1,500–$1,800). Uganda/Rushaga GHE remains the preferred pick; this section is retained as reference in case Rwanda's product offering changes before 2028, or in case a standard one-hour Rwanda trek is ever wanted as a distinct add-on rather than a replacement.",
      animals: [
        { speciesId: "gorilla",    likelihood: "highly_likely" },
        { speciesId: "elephant",   likelihood: "unlikely" },
        { speciesId: "lion",       likelihood: "not_present" },
        { speciesId: "leopard",    likelihood: "not_present" },
        { speciesId: "cheetah",    likelihood: "not_present" },
        { speciesId: "giraffe",    likelihood: "not_present" },
        { speciesId: "wild-dog",   likelihood: "not_present" },
        { speciesId: "roller",     likelihood: "not_present" },
        { speciesId: "owlet",      likelihood: "not_present" },
        { speciesId: "kingfisher", likelihood: "not_present" }
      ],

      lodges: [],

      tours: [
        {
          id: "east-africa-safaris-rwanda",
          type: "tour",
          status: "neutral",
          name: "East Africa Safaris — 3-Day Rwanda Mountain Gorilla Tracking Safari",
          duration: "3 days",
          price: { total: "$2,598–$2,718", note: "pp, 2-traveler price shown" },
          summary: "Standard 1-hour gorilla trek, shared tour (max 7 people), mid-range lodge, Kigali start/end.",
          rationale: "Logged for reference against the Uganda GHE decision, not pursued as an active candidate — no GHE product exists in Rwanda to compare against.",
          keyFacts: [
            { label: "Rating", value: "5.0/5 (31 reviews)" },
            { label: "Group size", value: "Shared, max 7" }
          ],
          links: [{ label: "East Africa Safaris", url: "https://www.safaribookings.com/tours/t91973" }],
          _sourceRefs: ["research.md > Rwanda > Volcanoes National Park > Tour Operators & Packages Considered"]
        },
        {
          id: "umurage-eco-safaris",
          type: "tour",
          status: "neutral",
          name: "Umurage Eco Safaris — 3-Day Gorilla and Golden Monkey Trek with Gisenyi Tour",
          duration: "3 days",
          price: { total: "$2,662–$2,772", note: "pp" },
          summary: "Standard 1-hour gorilla trek, private tour, budget tier, adds a Lake Kivu/Gisenyi stop, Kigali start/end.",
          rationale: "Logged for reference; budget tier within the Rwanda comparison set, still priced above Uganda's GHE bundle.",
          keyFacts: [{ label: "Rating", value: "5.0/5 (16 reviews)" }],
          links: [{ label: "Umurage Eco Safaris", url: "https://www.safaribookings.com/tours/t115079" }],
          _sourceRefs: ["research.md > Rwanda > Volcanoes National Park > Tour Operators & Packages Considered"]
        },
        {
          id: "echoes-from-africa",
          type: "tour",
          status: "neutral",
          name: "Echoes From Africa — 3-Day Rwanda Gorillas & Golden Monkey Trekking Tour",
          duration: "3 days",
          price: { total: "$2,739–$3,770", note: "pp" },
          summary: "Standard 1-hour gorilla trek, private tour, mid-range lodge, Kigali start/end.",
          rationale: "Logged for reference against the Uganda GHE decision.",
          keyFacts: [{ label: "Rating", value: "5.0/5 (5 reviews)" }],
          links: [{ label: "Echoes From Africa", url: "https://www.safaribookings.com/tours/t106503" }],
          _sourceRefs: ["research.md > Rwanda > Volcanoes National Park > Tour Operators & Packages Considered"]
        },
        {
          id: "map2africa",
          type: "tour",
          status: "neutral",
          name: "Map2Africa — 3-Day Gorillas in the Mist - Rwanda",
          duration: "3 days",
          price: { total: "$2,739–$3,013", note: "pp" },
          summary: "Standard 1-hour gorilla trek, private tour, luxury tier (above this trip's mid-range target), Kigali start/end.",
          rationale: "Kept for reference rather than as a serious candidate — luxury tier sits above this trip's mid-range target on top of Rwanda's already-higher cost for a lesser product than Uganda's GHE.",
          keyFacts: [{ label: "Rating", value: "5.0/5 (6 reviews)" }],
          links: [{ label: "Map2Africa", url: "https://www.safaribookings.com/tours/t115750" }],
          _sourceRefs: ["research.md > Rwanda > Volcanoes National Park > Tour Operators & Packages Considered"]
        },
        {
          id: "golden-rwanda-safaris",
          type: "tour",
          status: "neutral",
          name: "Golden Rwanda Safaris — 3-Day Gorilla Trekking and Mountain Biking at Lake Kivu",
          duration: "3 days",
          price: { total: "$3,190", note: "pp" },
          summary: "Standard 1-hour gorilla trek, private tour, mid-range lodge & hotel, Kigali start/end, bundles in a Lake Kivu extension.",
          rationale: "Most-reviewed operator found in this pass — a real reliability signal — but still logged for reference only, since no GHE product exists in Rwanda to compare against Uganda's preferred pick.",
          keyFacts: [{ label: "Rating", value: "4.9/5 (328 reviews) — most-reviewed operator in this pass" }],
          links: [{ label: "Golden Rwanda Safaris", url: "https://www.safaribookings.com/tours/t87955" }],
          _sourceRefs: ["research.md > Rwanda > Volcanoes National Park > Tour Operators & Packages Considered"]
        },
        {
          id: "go-extra-mile-safaris",
          type: "tour",
          status: "neutral",
          name: "GO Extra Mile Safaris — 4-Day Rwanda Signature Safari Volcanoes & Akagera",
          duration: "4 days",
          price: { total: "$3,453", note: "pp" },
          summary: "Standard 1-hour gorilla trek, private tour, luxury tier, adds an Akagera (Big Five) stop rather than being a pure gorilla-only itinerary.",
          rationale: "Logged for reference given the operator's strong rating, but not a clean like-for-like comparison since it bundles in a separate Big Five park.",
          keyFacts: [{ label: "Rating", value: "5.0/5 (7 reviews)" }],
          links: [{ label: "GO Extra Mile Safaris", url: "https://www.safaribookings.com/tours/t107150" }],
          _sourceRefs: ["research.md > Rwanda > Volcanoes National Park > Tour Operators & Packages Considered"]
        },
        {
          id: "lion-safaris-rwanda",
          type: "tour",
          status: "neutral",
          name: "Lion Safaris — 6-Day Rwanda Mountain Gorillas & Chimpanzees Tour",
          duration: "6 days",
          price: { total: "$3,713", note: "pp" },
          summary: "Standard 1-hour gorilla trek, private tour, mid-range lodge & hotel, pairs Volcanoes gorilla trekking with Nyungwe chimp trekking.",
          rationale: "SafariBookings' current best-seller for Rwanda — longer and pricier than a pure 3-day comparison, but worth flagging since chimpanzee trekking is separately logged as a possible future add-on (see Uganda > Kibale).",
          keyFacts: [{ label: "Rating", value: "5.0/5 (74 reviews) — SafariBookings' current best-seller for Rwanda" }],
          links: [{ label: "Lion Safaris", url: "https://www.safaribookings.com/tours/t68411" }],
          _sourceRefs: ["research.md > Rwanda > Volcanoes National Park > Tour Operators & Packages Considered"]
        },
        {
          id: "safari-com-rwanda",
          type: "tour",
          status: "neutral",
          name: "safari.com — 3-Day Rwanda Gorilla Trekking in Volcanoes National Park",
          duration: "3 days",
          price: { total: "$3,850", note: "pp sharing — confirmed low-season 2026 rate direct from operator site" },
          summary: "Standard 1-hour gorilla trek, stays at Five Volcanoes Boutique Hotel, includes a Kigali city tour (Genocide Memorial) on the return leg.",
          rationale: "Pricier booking-platform option, logged as a rough price ceiling for this tier rather than a leading candidate.",
          keyFacts: [],
          links: [{ label: "safari.com", url: "https://www.safari.com/safaris/3-day-rwanda-gorilla-trekking-in-volcanoes-national-park" }],
          _sourceRefs: ["research.md > Rwanda > Volcanoes National Park > Tour Operators & Packages Considered"]
        },
        {
          id: "rwanda-private-gorilla-trekking",
          type: "tour",
          status: "rejected",
          name: "Private Gorilla Trekking (RDB)",
          duration: "1 hour with the gorilla family",
          price: { total: "$15,000", note: "pp, exclusive access to one full family with a dedicated guide" },
          summary: "Buys exclusive access to one gorilla family, a dedicated guide, and a flexible 8–11am start time — not extended time. Visits still run to roughly the standard one-hour window, not GHE's four hours.",
          rationale: "Logged for completeness, not a genuine GHE substitute — it buys privacy and schedule flexibility, not extended time. At roughly 5x the cost of Uganda's entire bundled GHE tour for a fraction of the photography time, this doesn't hold up as a competitive alternative and isn't pursued further.",
          keyFacts: [{ label: "vs. Uganda GHE", value: "~5x the cost for ~1/4 the time with the family" }],
          links: [{ label: "Volcanoes National Park — Park Fees (RDB)", url: "https://www.volcanoesnationalpark.org/park-fees/" }],
          _sourceRefs: ["research.md > Rwanda > Volcanoes National Park > Decision Rationale"]
        }
      ]
    },

    "victoria-falls": {
      id: "victoria-falls",
      name: "Victoria Falls",
      countryId: "zimbabwe",
      blurb: "The Zimbabwe side holds roughly two-thirds of the falls, giving wider panoramic views and better photography angles than Zambia's side, especially in dry season \u2014 plus simpler onward logistics into Botswana and a wider range of affordable accommodation. This leg is deliberately low-key downtime between the Kenya and Botswana legs, not a dedicated wildlife stop.",
      animals: [
        { speciesId: "elephant",   likelihood: "somewhat_likely" },
        { speciesId: "roller",     likelihood: "somewhat_likely" },
        { speciesId: "kingfisher", likelihood: "somewhat_likely" },
        { speciesId: "lion",       likelihood: "unlikely" },
        { speciesId: "leopard",    likelihood: "unlikely" },
        { speciesId: "giraffe",    likelihood: "unlikely" },
        { speciesId: "owlet",      likelihood: "unlikely" },
        { speciesId: "cheetah",    likelihood: "not_present" },
        { speciesId: "wild-dog",   likelihood: "not_present" },
        { speciesId: "gorilla",    likelihood: "not_present" }
      ],

      lodges: [],

      tours: []
    },

    "ngorongoro-crater": {
      id: "ngorongoro-crater",
      name: "Ngorongoro Crater",
      countryId: "tanzania",
      blurb: "The world's largest non-flooded volcanic caldera \u2014 a compact, walled ecosystem holding roughly 25,000 animals and this trip's best odds anywhere of a black rhino sighting. Unlike Kenya's conservancies or Greater Kruger's private reserves, the crater doesn't appear to have a genuine mid-range, photography-suitable lodge tier of its own \u2014 every direct-booking option investigated here was either ultra-luxury or had real availability problems.",
      animals: [
        { speciesId: "lion",       likelihood: "highly_likely" },
        { speciesId: "elephant",   likelihood: "highly_likely" },
        { speciesId: "roller",     likelihood: "highly_likely" },
        { speciesId: "leopard",    likelihood: "somewhat_likely" },
        { speciesId: "owlet",      likelihood: "somewhat_likely" },
        { speciesId: "kingfisher", likelihood: "somewhat_likely" },
        { speciesId: "cheetah",    likelihood: "unlikely" },
        { speciesId: "giraffe",    likelihood: "not_present" },
        { speciesId: "wild-dog",   likelihood: "not_present" },
        { speciesId: "gorilla",    likelihood: "not_present" }
      ],

      lodges: [
        {
          id: "lions-paw",
          type: "lodge",
          status: "rejected",
          name: "Lion's Paw",
          price: {
            perNightPP: "$1,580",
            singleSupplement: "Not stated",
            note: "Plus a mandatory $70.80/night NCA conservation fee (~$1,650+/night all-in) before any single supplement"
          },
          summary: "Explicitly recommended for photographers in secondary lodge-comparison sources, but priced well above what those sources suggest.",
          rationale: "Secondary-source pricing (claimed $350\u2013$500 pp/night) was stale or promotional \u2014 the same failure mode seen with Kicheche's \u201cstarting at\u201d rate before its real peak-season PDF was checked. The confirmed rate, verified directly against a booking flow since the operator doesn't publish rates on its own site, puts this alongside &Beyond Crater Lodge in the ultra-luxury tier.",
          keyFacts: [],
          links: [{ label: "Lion's Paw", url: "https://karibucamps.com/lions-paw/" }],
          _sourceRefs: ["research.md > Tanzania > Ngorongoro Crater > Lodging Considered"]
        },
        {
          id: "ngorongoro-serena",
          type: "lodge",
          status: "rejected",
          name: "Ngorongoro Serena",
          price: {
            perNightPP: "$772",
            singleSupplement: "Not stated",
            note: "More reasonable than Lion's Paw, but availability only showed for 2 nights, or only in July 2027"
          },
          summary: "Checked as a fallback mid-range candidate once Lion's Paw priced out as ultra-luxury.",
          rationale: "The rate itself is reasonable, but availability wasn't a clean match to this trip's needs on either duration or date consistency.",
          keyFacts: [],
          links: [{ label: "Serena Hotels \u2014 Ngorongoro", url: "https://www.serenahotels.com/ngorongoro" }],
          _sourceRefs: ["research.md > Tanzania > Ngorongoro Crater > Lodging Considered"]
        }
      ],

      tours: [
        {
          id: "nat-geo-journeys-tanzania",
          type: "tour",
          status: "neutral",
          name: "National Geographic Journeys \u2014 Tanzania Safari & Serengeti Tour",
          duration: "7 days",
          price: { total: "$5,800", note: "solo" },
          summary: "Broad Northern Circuit tour \u2014 Tarangire, Lake Manyara, Ngorongoro Crater, Serengeti, and Olduvai Gorge \u2014 the only reasonable way found to see Ngorongoro given this trip's dates and logistics.",
          rationale: "A general-interest small-group tour, not a photography specialist product \u2014 no dedicated photo vehicle or host. Worth treating as a \u201csee Tanzania's highlights\u201d trip rather than an upgrade to the photography-focused style used everywhere else on this itinerary. That said, it remains the only viable path to Ngorongoro found so far, since no genuine mid-range lodge option turned up on direct booking.",
          keyFacts: [
            { label: "Route", value: "Starts/ends in Arusha; routes back through Nairobi or via Zanzibar to reach Victoria Falls" }
          ],
          links: [{ label: "G Adventures", url: "https://www.gadventures.com/trips/journeys-tanzania-safari-experience/DTTNG/" }],
          _sourceRefs: ["research.md > Tanzania > Ngorongoro Crater > Tour Operators & Packages Considered", "extensions.md > Tanzania"]
        }
      ]
    },

    amboseli: {
      id: "amboseli",
      name: "Amboseli",
      countryId: "kenya",
      blurb: "Large elephant herds \u2014 including rare \u201cbig tusker\u201d bulls \u2014 set against the classic backdrop of Mount Kilimanjaro, one of Africa's most photographed combinations. Also strong for lion, cheetah, hyena, and prolific birdlife around the park's swamps. Wild4's Tsavo/Samburu/Shompole tours extend into the wider ecosystem beyond Amboseli itself.",
      animals: [
        { speciesId: "elephant",   likelihood: "highly_likely" },
        { speciesId: "lion",       likelihood: "highly_likely" },
        { speciesId: "giraffe",    likelihood: "highly_likely" },
        { speciesId: "roller",     likelihood: "highly_likely" },
        { speciesId: "leopard",    likelihood: "somewhat_likely" },
        { speciesId: "cheetah",    likelihood: "somewhat_likely" },
        { speciesId: "owlet",      likelihood: "somewhat_likely" },
        { speciesId: "kingfisher", likelihood: "somewhat_likely" },
        { speciesId: "wild-dog",   likelihood: "unlikely" },
        { speciesId: "gorilla",    likelihood: "not_present" }
      ],

      lodges: [
        {
          id: "ol-tukai-lodge",
          type: "lodge",
          status: "extension",
          name: "Ol Tukai Lodge",
          price: {
            perNightPP: "~$350",
            singleSupplement: "Not stated separately",
            note: "Confirmed at $1,050 for 3 nights \u2014 the rate may already reflect solo occupancy rather than a sharing rate"
          },
          summary: "Inside the park itself, well-positioned for elephant viewing with Kilimanjaro as a backdrop.",
          rationale: "The only viable mid-range option found \u2014 checked package deals didn't offer meaningful savings over the standard rate. Being inside the park rather than a private conservancy means no off-road driving or night drives, the same trade-off seen elsewhere on this trip (Ivan Glaser's Mara Reserve tour, Mombo Camp).",
          keyFacts: [
            { label: "Off-road / night drives", value: "No \u2014 inside the national park, not a conservancy" }
          ],
          links: [{ label: "Ol Tukai Lodge", url: "https://oltukailodge.com/" }],
          _sourceRefs: ["extensions.md > Kenya > Amboseli National Park"]
        },
        {
          id: "porini-amboseli",
          type: "lodge",
          status: "rejected",
          name: "Porini Amboseli",
          price: {
            perNightPP: "~$1,335 all-in",
            singleSupplement: "$390 total (2 nights)",
            note: "$2,280 + $390 single supplement for 2 nights"
          },
          summary: "Private Selenkay Conservancy camp bordering Amboseli, with off-road driving and night drives included.",
          rationale: "Repeats the same peak-season pricing surprise seen with Kicheche and Asilia Naboisho \u2014 well above the mid-range target once the single supplement is factored in.",
          keyFacts: [],
          links: [{ label: "Porini Amboseli Camp", url: "https://www.porini.com/african-safari-holidays/kenya/camps-and-lodges/porini-amboseli-camp-3/" }],
          _sourceRefs: ["extensions.md > Kenya > Amboseli National Park"]
        },
        {
          id: "tortilis-camp",
          type: "lodge",
          status: "rejected",
          name: "Tortilis Camp",
          price: {
            perNightPP: "~$2,000",
            singleSupplement: "Not stated",
            note: "$6,000 for 3 nights"
          },
          summary: "Elewana-run camp in a private conservancy on Amboseli's edge, built around Kilimanjaro views.",
          rationale: "Firmly ultra-luxury, well outside the mid-range target for this trip.",
          keyFacts: [],
          links: [{ label: "Elewana Tortilis Camp", url: "https://www.elewanacollection.com/tortilis-camp-amboseli/amboseli" }],
          _sourceRefs: ["extensions.md > Kenya > Amboseli National Park"]
        }
      ],

      tours: [
        {
          id: "wild4-tsavo-amboseli-masai-mara",
          type: "tour",
          status: "unresearched",
          name: "Wild4 \u2014 Tsavo, Amboseli & Masai Mara",
          duration: "14 days (Jun 11\u201324, 2028)",
          price: { total: "Price TBD" },
          summary: "Multi-park circuit tour; the Masai Mara leg overlaps with the dedicated Masai Mara research, but Tsavo and Amboseli aren't otherwise investigated.",
          rationale: "Named as a candidate but not yet dug into \u2014 no price found and not compared against the Ol Tukai direct-booking plan.",
          keyFacts: [],
          links: [{ label: "Wild4 Photographic Safaris", url: "https://www.wild4photographicsafaris.com/photo-safaris/tsavo-amboseli-masai-mara" }],
          _sourceRefs: ["research.md > Kenya > Amboseli, Tsavo, Samburu & Shompole"]
        },
        {
          id: "wild4-shompole-samburu",
          type: "tour",
          status: "neutral",
          name: "Wild4 \u2014 Shompole Hides & Secret Samburu",
          duration: "12 days (Aug 16\u201327, 2028)",
          price: { total: "$15,400\u2013$17,200" },
          summary: "Covers two regions not otherwise investigated on this trip: Shompole Conservancy (hide-based photography) and Samburu.",
          rationale: "Logged for reference \u2014 priced and has confirmed dates, but covers different territory entirely from Amboseli itself, so not directly compared against the Ol Tukai plan.",
          keyFacts: [],
          links: [{ label: "Wild4 Photographic Safaris", url: "https://www.wild4photographicsafaris.com/photo-safaris/shompole-hides-secret-samburu" }],
          _sourceRefs: ["research.md > Kenya > Amboseli, Tsavo, Samburu & Shompole"]
        }
      ]
    },

    laikipia: {
      id: "laikipia",
      name: "Laikipia",
      countryId: "kenya",
      blurb: "A working-ranch conservancy landscape north of Mount Kenya, home to one of the highest concentrations of black (melanistic) leopards known anywhere in Africa, alongside strong general predator and elephant populations. A genuinely rare, specialist pursuit rather than a classic Big Five stop.",
      animals: [
        { speciesId: "lion",       likelihood: "highly_likely" },
        { speciesId: "elephant",   likelihood: "highly_likely" },
        { speciesId: "giraffe",    likelihood: "highly_likely" },
        { speciesId: "wild-dog",   likelihood: "highly_likely" },
        { speciesId: "roller",     likelihood: "highly_likely" },
        { speciesId: "leopard",    likelihood: "somewhat_likely" },
        { speciesId: "cheetah",    likelihood: "somewhat_likely" },
        { speciesId: "owlet",      likelihood: "somewhat_likely" },
        { speciesId: "kingfisher", likelihood: "somewhat_likely" },
        { speciesId: "gorilla",    likelihood: "not_present" }
      ],

      lodges: [
        {
          id: "laikipia-wilderness-camp",
          type: "lodge",
          status: "rejected",
          name: "Laikipia Wilderness Camp",
          price: {
            perNightPP: "$820\u2013$1,090 all-in",
            singleSupplement: "Not stated separately",
            note: "Base rate $430\u2013$600/night, plus a separate conservation fee ($140\u2013$215/night) and a \u201cBlack Leopard Vehicle\u201d fee ($130/night shared or $400/night private) \u2014 fees stack rather than bundle"
          },
          summary: "Direct booking at the camp closest to Giza Mrembo's territory, with a dedicated black-leopard-tracking vehicle option.",
          rationale: "Nearly as expensive as the guided tour options once all fees are stacked, without the benefit of a guide with years of experience tracking these specific individual cats.",
          keyFacts: [
            { label: "Black leopard vehicle", value: "$130/night shared or $400/night exclusive" }
          ],
          links: [{ label: "Laikipia Wilderness Camp", url: "https://www.laikipia-wilderness.com/" }],
          _sourceRefs: ["research.md > Kenya > Laikipia > Lodging Considered"]
        }
      ],

      tours: [
        {
          id: "oryx-black-leopard-photo-safari",
          type: "tour",
          status: "extension",
          name: "ORYX Photo Tours \u2014 Kenya Black Leopard Photo Safari",
          duration: "8 days",
          price: { total: "$12,972", note: "$12,772 pp sharing + $200 single supplement, confirmed as the first solo traveler to book" },
          summary: "Tiny group (3 guests + 1 ORYX leader) built specifically around finding Giza Mrembo and other black leopards across the Laikipia landscape.",
          rationale: "The only specialist option with confirmed, bookable 2028 departures \u2014 every other option investigated for this pursuit (Ivan Glaser, Edward Selfe, Wild Eye) hit full booking, waitlist status, or down-to-the-last-space scarcity. Trip reports document strong guiding results (Giza spotted on 8 of 12 drives in one account, 9 different leopards in a week in another), supporting the value of expert guiding for a genuinely rare subject.",
          keyFacts: [
            { label: "2028 departures", value: "30 Jun\u20137 Jul and 5\u201312 Aug, both showing spaces available" },
            { label: "Group size", value: "3 guests + 1 ORYX leader" }
          ],
          links: [
            { label: "ORYX \u2014 30 Jun\u20137 Jul departure", url: "https://www.oryxphoto.com/tour-item/kenya-black-leopard-photo-safari-vi-2028/" },
            { label: "ORYX \u2014 5\u201312 Aug departure", url: "https://www.oryxphoto.com/tour-item/kenya-black-leopard-photo-safari-ii-2028/" }
          ],
          _sourceRefs: ["research.md > Kenya > Laikipia > Tour Operators & Packages Considered", "extensions.md > Kenya > Laikipia"]
        },
        {
          id: "wild-eye-amboseli-laikipia",
          type: "tour",
          status: "extension",
          name: "Wild Eye \u2014 Amboseli and Laikipia Photo Safari",
          duration: "11 nights (7 Laikipia + 3 Amboseli + 1 Nairobi)",
          price: { total: "$14,675", note: "no single supplement, max 4 guests" },
          summary: "Combines this black leopard pursuit with Amboseli's elephant-and-Kilimanjaro scenery, tracking the tusker Craig.",
          rationale: "Logged as a fallback rather than primary \u2014 there are currently no scheduled 2028 departures, only a waitlist, with Wild Eye's own site still finalizing a 2027 date. Worth revisiting if a 2028 date is announced, since it would also let the separately-booked Amboseli/Ol Tukai plan be dropped in favor of this bundled version.",
          keyFacts: [
            { label: "2028 availability", value: "Waitlist only \u2014 no confirmed departure yet" }
          ],
          links: [{ label: "Wild Eye", url: "https://wild-eye.com/photographic-travel/amboseli-and-laikipia-photo-safari/" }],
          _sourceRefs: ["extensions.md > Kenya > Laikipia"]
        }
      ]
    },

    "masai-mara": {
      id: "masai-mara",
      name: "Masai Mara",
      countryId: "kenya",
      blurb: "Kenya's most iconic savanna ecosystem \u2014 dense predator populations, classic Big Five viewing, and (outside the private conservancies) the annual wildebeest migration. Private conservancies bordering the national reserve add off-road driving and night drives not permitted inside the reserve itself.",
      animals: [
        { speciesId: "lion",        likelihood: "highly_likely" },
        { speciesId: "elephant",    likelihood: "highly_likely" },
        { speciesId: "cheetah",     likelihood: "highly_likely" },
        { speciesId: "giraffe",     likelihood: "highly_likely" },
        { speciesId: "roller",      likelihood: "highly_likely" },
        { speciesId: "leopard",     likelihood: "somewhat_likely" },
        { speciesId: "kingfisher",  likelihood: "somewhat_likely" },
        { speciesId: "wild-dog",    likelihood: "unlikely" },
        { speciesId: "owlet",       likelihood: "unlikely" },
        { speciesId: "gorilla",     likelihood: "not_present" }
      ],

      lodges: [
        {
          id: "kicheche-conservancy-camps",
          type: "lodge",
          status: "preferred",
          name: "Kicheche Conservancy Camps",
          price: {
            perNightPP: "$1,096\u2013$1,146",
            singleSupplement: "$212\u2013$229/night",
            note: "Peak season, Jul\u2013Oct \u2014 derived from the official 6-night rate PDF (published per-stay, not per-night)"
          },
          summary: "Private-conservancy camps enabling off-road driving and night drives, not available in the national reserve.",
          rationale: "Established operator with transparently published peak-season rates; conservancy access was the deciding factor over reserve-based alternatives.",
          keyFacts: [
            { label: "Candidate camps", value: "Mara North / Bush Olare / Valley Naboisho \u2014 final pick TBD" },
            { label: "Off-road / night drives", value: "Yes (private conservancy)" }
          ],
          speciesFocus: ["lion", "leopard", "cheetah", "elephant", "giraffe"],
          links: [{ label: "Kicheche official site", url: "https://kicheche.com/" }],
          _sourceRefs: ["research.md > Kenya > Masai Mara > Lodging Considered"]
        },
        {
          id: "asilia-naboisho-camp",
          type: "lodge",
          status: "rejected",
          name: "Asilia Naboisho Camp",
          price: {
            perNightPP: "$2,250+",
            singleSupplement: "Not stated",
            note: "Peak season, Jul\u2013Aug"
          },
          summary: "Excellent photo vehicle with 360\u00b0 swivel seats, bean bags, and camera rests.",
          rationale: "Green-season rate looked competitive, but peak-season pricing jumps roughly 240%, well above the other conservancy options for this trip's actual travel dates.",
          keyFacts: [],
          links: [{ label: "Asilia Africa", url: "https://www.asiliaafrica.com/camps-lodges/naboisho-camp/" }],
          _sourceRefs: ["research.md > Kenya > Masai Mara > Tour Operators & Packages Considered"]
        },
        {
          id: "angama-mara",
          type: "lodge",
          status: "rejected",
          name: "Angama Mara",
          price: {
            perNightPP: "Not priced",
            singleSupplement: "Not stated",
            note: "Assumed premium/luxury tier"
          },
          summary: "Positioned around a \u201cphotographic studio\u201d concept with in-house tutorials.",
          rationale: "Photo tutoring isn't needed by this traveler, and the property sits at the premium/luxury tier \u2014 not preferred.",
          keyFacts: [],
          links: [{ label: "Angama Mara", url: "https://angama.com/stay/angama-mara/" }],
          _sourceRefs: ["research.md > Kenya > Masai Mara > Tour Operators & Packages Considered"]
        },
        {
          id: "porini-mara-camp",
          type: "lodge",
          status: "neutral",
          name: "Porini Mara Camp",
          price: {
            perNightPP: "$983 pp sharing",
            singleSupplement: "Applies in peak season",
            note: "Peak season Jul\u2013Oct; shoulder season runs $618\u2013$648 pp sharing"
          },
          summary: "Reserve-based camp considered as a lower-cost alternative to the conservancy tier.",
          rationale: "Their usual \u201cno single supplement\u201d policy explicitly excludes July\u2013October, so a real supplement applies during this trip's actual travel window \u2014 logged for reference, no strong verdict against Kicheche.",
          keyFacts: [{ label: "Off-road / night drives", value: "No (national reserve)" }],
          links: [{ label: "Porini Mara Camp", url: "https://www.porini.com/african-safari-holidays/kenya/camps-and-lodges/porini-mara-camp/" }],
          _sourceRefs: ["research.md > Kenya > Masai Mara > Lodging Considered"]
        },
        {
          id: "mara-nyika-camp",
          type: "lodge",
          status: "unresearched",
          name: "Mara Nyika Camp",
          price: {
            perNightPP: "$240\u2013$450 (est.)",
            singleSupplement: "Unknown",
            note: "Off-peak estimate from an initial scan \u2014 not individually re-verified for peak-season pricing"
          },
          summary: "Included in an initial mid-range conservancy scan.",
          rationale: "Not yet individually re-verified once the Kicheche/Asilia/Porini peak-season reality check happened.",
          keyFacts: [],
          links: [{ label: "Mara Nyika", url: "https://naboisho.com/mara-nyika/" }],
          _sourceRefs: ["research.md > Kenya > Masai Mara > Lodging Considered"]
        },
        {
          id: "ol-kinyei-mara-tented-camp",
          type: "lodge",
          status: "unresearched",
          name: "Ol Kinyei Mara Tented Camp",
          price: {
            perNightPP: "$240\u2013$450 (est.)",
            singleSupplement: "Unknown",
            note: "Off-peak estimate from an initial scan \u2014 not individually re-verified for peak-season pricing"
          },
          summary: "Included in an initial mid-range conservancy scan.",
          rationale: "Not yet individually re-verified once the Kicheche/Asilia/Porini peak-season reality check happened.",
          keyFacts: [],
          links: [{ label: "Ol Kinyei Mara Tented Camp", url: "https://www.olkinyei-mara.com/" }],
          _sourceRefs: ["research.md > Kenya > Masai Mara > Lodging Considered"]
        }
      ],

      tours: [
        {
          id: "ivan-glaser-wildlife-photography",
          type: "tour",
          status: "backup",
          name: "Ivan Glaser Wildlife Photography (Oltepesi Tented Safari Camp)",
          duration: "8 days (minimum package)",
          price: { total: "$5,650\u2013$6,350", note: "solo, corrected to include the Nairobi\u2194Mara flight it otherwise excludes" },
          summary: "Individually-hosted small-group photo safari \u2014 max 2 guests per vehicle, exclusive-use vehicle and reserve fees bundled in, no single supplement.",
          rationale: "A genuine middle ground between raw camp booking and premium hosted tours, but it's reserve-based (no off-road/night drives) and carries single-operator reliability risk. Availability has improved since original research \u2014 1 spot now shows open 29 Aug\u20135 Sep 2027, directly in this trip's peak travel window.",
          keyFacts: [
            { label: "Group size", value: "Max 2 guests/vehicle" },
            { label: "Single supplement", value: "None" },
            { label: "Off-road / night drives", value: "No (national reserve)" }
          ],
          links: [{ label: "Mad About Mara", url: "https://madaboutmara.com/" }],
          _sourceRefs: ["research.md > Kenya > Masai Mara > Decision Rationale", "extensions.md > Kenya"]
        },
        {
          id: "wild-eye-masai-mara-photo-safari",
          type: "tour",
          status: "rejected",
          name: "Wild Eye Masai Mara Photo Safari",
          duration: "6 nights",
          price: { total: "$11,325", note: "solo" },
          summary: "3 guests per vehicle, off-road access on a prime Mara Triangle river-crossing-adjacent concession, in-field photo tuition included.",
          rationale: "Too expensive given the bundled photo tuition isn't needed by this traveler.",
          keyFacts: [{ label: "2028 departures", value: "5 fixed weekly slots, Jul 16\u2013Aug 19" }],
          links: [{ label: "Wild Eye", url: "https://wild-eye.com/photographic-travel/masai-mara-photo-safari/" }],
          _sourceRefs: ["research.md > Kenya > Masai Mara > Tour Operators & Packages Considered"]
        },
        {
          id: "pangolin-masai-mara-products",
          type: "tour",
          status: "neutral",
          name: "Pangolin Masai Mara Photo Safaris",
          duration: "8\u201312 days (varies by product)",
          price: { total: "From $9,950\u2013$17,450", note: "per person, varies by specific product" },
          summary: "Pangolin's Kenya photo-safari lineup, including a migration-season option with a bundled hot air balloon flight.",
          rationale: "Season/dates didn't align with this trip's travel window for the products checked; not directly compared against Kicheche.",
          keyFacts: [],
          links: [{ label: "Pangolin Photo", url: "https://www.pangolinphoto.com/safaris/masai-mara-safari" }],
          _sourceRefs: ["research.md > Kenya > Masai Mara > Tour Operators & Packages Considered"]
        },
        {
          id: "nat-geo-journeys-kenya",
          type: "tour",
          status: "neutral",
          name: "National Geographic Journeys \u2014 Kenya Only",
          duration: "7\u20138 days (exact night count unconfirmed)",
          price: { total: "$7,200", note: "solo, single-occupancy priced, no supplement needed" },
          summary: "Lake Nakuru, Masai Mara, Lake Naivasha/Crescent Island \u2014 a general-interest small-group tour, not a photography specialist product.",
          rationale: "Logged as a comparison point; current listing shows 8 days rather than the 7 days the price was recorded against, worth reconfirming before treating as comparable.",
          keyFacts: [],
          links: [{ label: "G Adventures", url: "https://www.gadventures.com/trips/kenya-safari-experience/DKKNG/" }],
          _sourceRefs: ["research.md > Kenya > Masai Mara > Tour Operators & Packages Considered"]
        }
      ]
    },

    "south-luangwa": {
      id: "south-luangwa",
      name: "South Luangwa",
      countryId: "zambia",
      blurb: "“Valley of the Leopard” — rivals Sabi Sands for the highest leopard density in Africa (~9–10 per 100km² vs. Sabi Sands' measured 12.2), with one estimate of one leopard per kilometer of river in the valley. Both night drives and walking safaris are permitted together here, a combination not available in many other parks. Logged as an extension slotting in before the Pangolin Chobe/Delta tour, via Livingstone → Lusaka → Mfuwe — not part of the core itinerary.",
      animals: [
        { speciesId: "leopard",    likelihood: "highly_likely" },
        { speciesId: "lion",       likelihood: "highly_likely" },
        { speciesId: "elephant",   likelihood: "highly_likely" },
        { speciesId: "giraffe",    likelihood: "highly_likely" },
        { speciesId: "roller",     likelihood: "highly_likely" },
        { speciesId: "kingfisher", likelihood: "highly_likely" },
        { speciesId: "wild-dog",   likelihood: "somewhat_likely" },
        { speciesId: "owlet",      likelihood: "somewhat_likely" },
        { speciesId: "cheetah",    likelihood: "not_present" },
        { speciesId: "gorilla",    likelihood: "not_present" }
      ],

      lodges: [
        {
          id: "robin-pope-luangwa-river-camp",
          type: "lodge",
          status: "extension",
          name: "Robin Pope Safaris — Luangwa River Camp",
          price: {
            perNightPP: "$600",
            singleSupplement: "None unless more than 3 singles are traveling",
            note: "Confirmed 2026 peak rate (Jul–Sep), direct from the operator's rate sheet"
          },
          summary: "Established, reputable small-vehicle operator with a genuinely rare no-single-supplement policy at this price point.",
          rationale: "A confirmed, transparent find relative to how much of this research hit stale or opaque pricing elsewhere — the clear pick for a direct-booking extension to South Luangwa.",
          keyFacts: [{ label: "Single supplement", value: "None unless >3 singles traveling" }],
          links: [{ label: "Robin Pope Safaris — Luangwa River Camp", url: "https://www.robinpopesafaris.net/camps-lodges/luangwa-river-camp/" }],
          _sourceRefs: ["research.md > Zambia > South Luangwa > Lodging Considered", "extensions.md > Zambia > South Luangwa National Park"]
        },
        {
          id: "wildlife-camp-zambia",
          type: "lodge",
          status: "unresearched",
          name: "Wildlife Camp",
          price: {
            perNightPP: "$210–$270 (historical)",
            singleSupplement: "Unknown",
            note: "2026 rates now show “accommodation only” rather than the historical all-inclusive figure — needs re-verification before treating as comparable to Robin Pope's rate"
          },
          summary: "Value-tier alternative to Robin Pope, flagged as needing a fresh pricing check.",
          rationale: "Historical pricing looked attractive, but the rate basis appears to have changed (accommodation-only vs. all-inclusive) — not re-verified, so not treated as a confirmed alternative yet.",
          keyFacts: [],
          links: [{ label: "Wildlife Camp", url: "https://wildlifezambia.com/" }],
          _sourceRefs: ["research.md > Zambia > South Luangwa > Lodging Considered"]
        }
      ],

      tours: [
        {
          id: "pangolin-south-luangwa",
          type: "tour",
          status: "neutral",
          name: "Pangolin — South Luangwa",
          duration: "Not specified",
          price: { total: "$10,945", note: "pp sharing" },
          summary: "Recurring June-departure photo safari; exact 2028 dates not yet published.",
          rationale: "Logged for reference alongside the preferred direct-booking (Robin Pope) plan — not directly compared against it in detail.",
          keyFacts: [{ label: "Departure pattern", value: "Recurring June (2027: Jun 2027); 2028 dates not yet published" }],
          links: [{ label: "Pangolin Photo — South Luangwa", url: "https://www.pangolinphoto.com/safaris/south-luangwa-photo-safari" }],
          _sourceRefs: ["research.md > Zambia > South Luangwa > Tour Operators & Packages Considered"]
        },
        {
          id: "penda-leopards-of-luangwa",
          type: "tour",
          status: "neutral",
          name: "Penda — Leopards of Luangwa",
          duration: "Not specified",
          price: { total: "$7,495" },
          summary: "Recurring June-departure photo safari; exact 2028 dates not yet published.",
          rationale: "Logged for reference alongside the preferred direct-booking (Robin Pope) plan — not directly compared against it in detail.",
          keyFacts: [{ label: "Departure pattern", value: "Recurring June (2027: Jun 12–19); 2028 dates not yet published" }],
          links: [{ label: "Penda Photo Tours — Leopards of Luangwa", url: "https://www.pendaphototours.com/tour/leopards-of-luangwa-photo-safari-zambia/" }],
          _sourceRefs: ["research.md > Zambia > South Luangwa > Tour Operators & Packages Considered"]
        }
      ]
    },

    "lower-zambezi": {
      id: "lower-zambezi",
      name: "Lower Zambezi",
      countryId: "zambia",
      blurb: "Investigated as a natural pairing with South Luangwa via Lusaka (~90 minutes apart by light aircraft), after being ruled out earlier as a standalone extension not reachable from Victoria Falls. Turned out to be the weaker half of that pairing — every path investigated, direct booking and every tour operator checked alike, hit a real cost, transparency, or availability obstacle. Not preferred; South Luangwa carries the Zambia extension forward alone.",
      animals: [
        { speciesId: "elephant",   likelihood: "highly_likely" },
        { speciesId: "lion",       likelihood: "highly_likely" },
        { speciesId: "leopard",    likelihood: "highly_likely" },
        { speciesId: "roller",     likelihood: "highly_likely" },
        { speciesId: "kingfisher", likelihood: "highly_likely" },
        { speciesId: "owlet",      likelihood: "somewhat_likely" },
        { speciesId: "wild-dog",   likelihood: "unlikely" },
        { speciesId: "cheetah",    likelihood: "not_present" },
        { speciesId: "giraffe",    likelihood: "not_present" },
        { speciesId: "gorilla",    likelihood: "not_present" }
      ],

      lodges: [
        {
          id: "chiawa-camp",
          type: "lodge",
          status: "rejected",
          name: "Chiawa Camp",
          price: {
            perNightPP: "$1,995",
            singleSupplement: "None (confirmed policy)",
            note: "Jul 1–Oct 15, 2026 peak rate"
          },
          summary: "Genuine no-single-supplement policy, but ultra-luxury regardless of that policy.",
          rationale: "A no-supplement policy doesn't make an expensive camp mid-range — the underlying rate itself is well outside the mid-range target. Not preferred on price.",
          keyFacts: [],
          links: [{ label: "Chiawa Camp", url: "https://www.chiawa.com/chiawa-camp/" }],
          _sourceRefs: ["research.md > Zambia > Lower Zambezi > Lodging Considered"]
        },
        {
          id: "old-mondoro",
          type: "lodge",
          status: "rejected",
          name: "Old Mondoro",
          price: {
            perNightPP: "$1,995 (per Chiawa's own current rate sheet)",
            singleSupplement: "Not stated",
            note: "Conflicting data: older secondary sources show $450–653/night, but the operator's own current sheet shows the same $1,995 as Chiawa Camp"
          },
          summary: "Chiawa's “rustic” sister camp; pricing conflict resolved in favor of the operator's own (much higher) current figure.",
          rationale: "Per the standing methodology in guidelines.md, opaque/conflicting pricing from a self-described luxury operator (when comparable properties publish theirs openly) is treated as a red flag, not just a gap to fill in later. Dropped rather than left open.",
          keyFacts: [],
          links: [{ label: "Old Mondoro", url: "https://www.chiawa.com/old-mondoro/" }],
          _sourceRefs: ["research.md > Zambia > Lower Zambezi > Lodging Considered"]
        },
        {
          id: "galamuka-adventures",
          type: "lodge",
          status: "rejected",
          name: "Galamuka Adventures",
          price: {
            perNightPP: "$388 (confirmed for an August date)",
            singleSupplement: "Never found",
            note: "Attractive price, but amenity list (pool, breakfast, parking, housekeeping) reads like a general hotel, not an all-inclusive safari camp"
          },
          summary: "Genuinely unresolved even after a second pass — no mention anywhere of game drives, walking safaris, or guiding, unlike every other property researched.",
          rationale: "The low price plausibly reflects lodging only, not a full safari experience. Combined with the site being down for a stretch (live again as of the last check, still no rates or activity listings) and no single-supplement info ever found, dropped rather than left open.",
          keyFacts: [],
          links: [{ label: "Galamuka Adventures", url: "https://www.galamuka.com/" }],
          _sourceRefs: ["research.md > Zambia > Lower Zambezi > Lodging Considered"]
        },
        {
          id: "royal-zambezi-lodge",
          type: "lodge",
          status: "rejected",
          name: "Royal Zambezi Lodge",
          price: {
            perNightPP: "$970",
            singleSupplement: "Not stated",
            note: "Confirmed peak pricing, Jun–Nov"
          },
          summary: "Has confirmed, transparent peak pricing, but still priced above the mid-range target.",
          rationale: "Pricing transparency is a plus relative to Old Mondoro/Galamuka, but the rate itself is still not mid-range. Not preferred on price.",
          keyFacts: [],
          links: [{ label: "Royal Zambezi Lodge", url: "https://www.royalzambezilodge.com/" }],
          _sourceRefs: ["research.md > Zambia > Lower Zambezi > Lodging Considered"]
        }
      ],

      tours: [
        {
          id: "expert-africa-vervet-monkey-safari",
          type: "tour",
          status: "rejected",
          name: "Expert Africa — Vervet Monkey Safari",
          duration: "7 days",
          price: { total: "$9,220–$11,540", note: "for two travelers — booking system doesn't support solo bookings" },
          summary: "Chiawa Camp (Lower Zambezi) + Puku Ridge (South Luangwa) combined itinerary.",
          rationale: "Not preferred — the booking system only supports bookings for 2 people, a hard blocker for a solo traveler.",
          keyFacts: [],
          links: [{ label: "Expert Africa — Vervet Monkey Safari", url: "https://www.expertafrica.com/zambia/safari/vervet-monkey-safari" }],
          _sourceRefs: ["research.md > Zambia > Lower Zambezi > Tour Operators & Packages Considered"]
        },
        {
          id: "expert-africa-crawshays-zebra-safari",
          type: "tour",
          status: "rejected",
          name: "Expert Africa — Crawshay's Zebra Safari",
          duration: "10 days",
          price: { total: "Not stated" },
          summary: "Same operator and combined-park structure as the Vervet Monkey Safari, at a 10-day length.",
          rationale: "Not preferred for the same reason as the Vervet Monkey Safari — the booking system doesn't support solo travelers.",
          keyFacts: [],
          links: [{ label: "Expert Africa — Crawshay's Zebra Safari", url: "https://www.expertafrica.com/zambia/safari/crawshays-zebra-safari" }],
          _sourceRefs: ["research.md > Zambia > Lower Zambezi > Tour Operators & Packages Considered"]
        },
        {
          id: "world-photo-travels-zambia",
          type: "tour",
          status: "rejected",
          name: "World Photo Travels — South Luangwa & Lower Zambezi",
          duration: "Not specified",
          price: { total: "Not found despite repeated attempts" },
          summary: "Dedicated combined photo safari explicitly highlighting the high leopard density draw.",
          rationale: "Not preferred for lack of pricing — no price ever found, and availability flagged as limited (“FINAL SPOT OPEN” still showing on the last check).",
          keyFacts: [],
          links: [{ label: "World Photo Travels", url: "https://www.worldphototravels.com/zambia-photo-safari-south-luangwa-lower-zambezi.php" }],
          _sourceRefs: ["research.md > Zambia > Lower Zambezi > Tour Operators & Packages Considered"]
        },
        {
          id: "edward-selfe-photo-safaris-zambia",
          type: "tour",
          status: "rejected",
          name: "Edward Selfe Photo Safaris — Lower Zambezi + South Luangwa",
          duration: "10–11 nights",
          price: { total: "$15,000–$17,500", note: "pp — latest confirmed departure: 11 nights, $17,500pp, Sep 2028 (tbc), 1 space" },
          summary: "Individually-hosted, covers both regions (Kutali/Lion Camp for the Lower Zambezi portion).",
          rationale: "Solidly premium, not mid-range, and down to the last space. Not preferred given cost and scarcity.",
          keyFacts: [{ label: "Availability", value: "1 space, Sep 2028 (tbc)" }],
          links: [{ label: "Edward Selfe Photo Safaris", url: "https://www.edwardselfephotosafaris.com/safaris" }],
          _sourceRefs: ["research.md > Zambia > Lower Zambezi > Tour Operators & Packages Considered"]
        },
        {
          id: "wild-eye-south-luangwa-extension",
          type: "tour",
          status: "rejected",
          name: "Photo Safari Company / Wild Eye — South Luangwa + Lower Zambezi extension",
          duration: "Not specified",
          price: { total: "Not stated" },
          summary: "Both operators run South Luangwa as a core trip with Lower Zambezi as an optional extension rather than a single fixed combo.",
          rationale: "Wild Eye's current departure shows 2027 waitlist only — not bookable for this trip's timeline, consistent with the overall not-preferred conclusion for Lower Zambezi.",
          keyFacts: [],
          links: [
            { label: "Photo Safari Company — Zambia", url: "https://photosafaricompany.com/safari-destinations/zambia-photo-safaris/" },
            { label: "Wild Eye — South Luangwa Safari", url: "https://wild-eye.com/photographic-travel/south-luangwa-safari/" }
          ],
          _sourceRefs: ["research.md > Zambia > Lower Zambezi > Tour Operators & Packages Considered"]
        }
      ]
    },

    "chobe-okavango-delta": {
      id: "chobe-okavango-delta",
      name: "Chobe & Okavango Delta",
      countryId: "botswana",
      blurb: "The centerpiece of the trip — a fully-hosted, 8-day Pangolin photography safari across two ecosystems: 3 nights at the Pangolin Chobe Hotel (Kasane) plus 4 nights at Shinde Footsteps in the Delta, connected by an included bush flight. Locked into the core itinerary, collected directly from Victoria Falls.",
      animals: [
        { speciesId: "elephant",   likelihood: "highly_likely" },
        { speciesId: "lion",       likelihood: "highly_likely" },
        { speciesId: "leopard",    likelihood: "highly_likely" },
        { speciesId: "giraffe",    likelihood: "highly_likely" },
        { speciesId: "wild-dog",   likelihood: "highly_likely" },
        { speciesId: "roller",     likelihood: "highly_likely" },
        { speciesId: "kingfisher", likelihood: "highly_likely" },
        { speciesId: "cheetah",    likelihood: "somewhat_likely" },
        { speciesId: "owlet",      likelihood: "somewhat_likely" },
        { speciesId: "gorilla",    likelihood: "not_present" }
      ],

      lodges: [
        {
          id: "shinde-footsteps",
          type: "lodge",
          status: "preferred",
          name: "Shinde Footsteps",
          price: { perNightPP: "Bundled into the Pangolin tour price", singleSupplement: "Included in the tour's $3,000 supplement", note: "Ker & Downey's Shinde concession, Okavango Delta" },
          summary: "The Delta camp bundled into the preferred Pangolin “Chobe and Okavango Delta” 8-day tour — 4 nights.",
          rationale: "Comes as part of the preferred Pangolin package rather than being independently priced/compared.",
          keyFacts: [],
          links: [{ label: "Shinde Footsteps", url: "https://kerdowneybotswana.com/our-camps/shinde-footsteps/" }],
          _sourceRefs: ["research.md > Botswana > Chobe & Okavango Delta > Lodging Considered", "itinerary.md > Chobe & Okavango Delta"]
        },
        {
          id: "muchenje-safari-lodge",
          type: "lodge",
          status: "rejected",
          name: "Muchenje Safari Lodge",
          price: {
            perNightPP: "$965+",
            singleSupplement: "Possible",
            note: "Jul–Oct sharing rate"
          },
          summary: "Owner-run lodge west of the main Kasane cluster.",
          rationale: "Not preferred — Pangolin Chobe Hotel (bundled into the preferred tour) covers the Chobe portion instead.",
          keyFacts: [],
          links: [{ label: "Muchenje Safari Lodge", url: "https://www.muchenje.com/" }],
          _sourceRefs: ["research.md > Botswana > Chobe & Okavango Delta > Lodging Considered"]
        },
        {
          id: "bushman-plains",
          type: "lodge",
          status: "neutral",
          name: "Bushman Plains",
          price: { perNightPP: "Not priced", singleSupplement: "Not stated", note: "Small camp, 4 tents, Bushman-owned" },
          summary: "Pangolin's recommended independent Delta partner camp — simple/authentic, considered as an a la carte option.",
          rationale: "Considered before the bundled Pangolin package (with Shinde Footsteps) was preferred instead — logged for reference, no strong verdict against it specifically.",
          keyFacts: [],
          links: [{ label: "Bushman Plains", url: "https://www.pangolinphoto.com/places/partners/bushman-plains" }],
          _sourceRefs: ["research.md > Botswana > Chobe & Okavango Delta > Lodging Considered"]
        }
      ],

      tours: [
        {
          id: "pangolin-chobe-okavango-delta-8day",
          type: "tour",
          status: "preferred",
          name: "Pangolin — Chobe and Okavango Delta (8 Days)",
          duration: "8 days",
          price: { total: "$13,850", note: "$10,850 pp + a confirmed $3,000 single supplement" },
          summary: "3 nights Pangolin Chobe Hotel (Kasane) + included bush flight + 4 nights Shinde Footsteps (Delta) — the locked-in centerpiece of the trip.",
          rationale: "The confirmed, preferred pick — note the single-supplement figure corrects an earlier logged number that omitted it. Pangolin's separate “no single supplement” policy applies only to standalone 3-night Chobe Hotel bookings, not this bundled multi-day tour.",
          keyFacts: [
            { label: "Seasonal window", value: "Recurring Mar/Apr–Nov departure pattern, not fixed one-off dates" }
          ],
          links: [{ label: "Pangolin Photo — Chobe and Okavango Delta", url: "https://www.pangolinphoto.com/safaris/chobe-okavango-delta-safari" }],
          _sourceRefs: ["research.md > Botswana > Chobe & Okavango Delta > Tour Operators & Packages Considered", "itinerary.md > Chobe & Okavango Delta", "budget.md > Chobe + Okavango Delta"]
        },
        {
          id: "pangolin-victoria-falls-chobe",
          type: "tour",
          status: "rejected",
          name: "Pangolin — Victoria Falls & Chobe (7 Days)",
          duration: "7 days",
          price: { total: "$4,595", note: "pp" },
          summary: "3 nights Victoria Falls (Palm River Hotel + a helicopter flight + Zambezi sunset cruise) + 3 nights Pangolin Chobe Hotel — no Delta portion at all.",
          rationale: "Not preferred — doesn't include the Delta (would need a separate, expensive Delta booking on top) and would replace the independently-researched Victoria Falls hotel plan.",
          keyFacts: [],
          links: [{ label: "Pangolin Photo — Victoria Falls & Chobe", url: "https://www.pangolinphoto.com/safaris/victoria-falls-chobe-safari" }],
          _sourceRefs: ["research.md > Botswana > Chobe & Okavango Delta > Tour Operators & Packages Considered"]
        },
        {
          id: "pangolin-best-of-the-chobe",
          type: "tour",
          status: "rejected",
          name: "Pangolin — Best of the Chobe (7 Days)",
          duration: "7 days",
          price: { total: "$5,495", note: "pp" },
          summary: "3 nights aboard the Pangolin Voyager houseboat + Pangolin Chobe Hotel — the practical way to access the exclusive-charter-only Voyager without the full charter markup.",
          rationale: "Not preferred given the schedule/cost tradeoffs of fitting it alongside the Delta — the Delta is the higher priority.",
          keyFacts: [],
          links: [{ label: "Pangolin Photo — Best of the Chobe", url: "https://www.pangolinphoto.com/safaris/best-of-the-chobe" }],
          _sourceRefs: ["research.md > Botswana > Chobe & Okavango Delta > Tour Operators & Packages Considered"]
        },
        {
          id: "pangolin-chobe-delta-kalahari",
          type: "tour",
          status: "backup",
          name: "Pangolin — Chobe, Delta and Kalahari (10 Days)",
          duration: "10 days",
          price: { total: "$20,450", note: "$15,345 pp + a confirmed $5,105 single supplement, 2027 rates" },
          summary: "Swaps the land-based Chobe Hotel for 3 nights on the Pangolin Voyager houseboat, adds a 30-minute scenic helicopter flight and 3 nights at Dinaka Camp (Central Kalahari) — same Shinde Footsteps Delta camp as the core pick, but 3 nights instead of 4.",
          rationale: "Not the primary pick — ~$6,600 more than the locked-in 8-day tour — but genuinely reconsidered rather than dropped: reviews are excellent (“all round winner,” specifically citing the Voyager and Dinaka's hide photography), and it remains a real candidate to swap to if extra budget/time opens up before booking.",
          keyFacts: [
            { label: "Delta nights vs. core pick", value: "3 nights (vs. 4) — traded for Voyager + Dinaka time" }
          ],
          links: [{ label: "Pangolin Photo — Chobe, Delta and Kalahari", url: "https://www.pangolinphoto.com/safaris/10-day-chobe-delta-and-kalahari-2" }],
          _sourceRefs: ["research.md > Botswana > Chobe & Okavango Delta > Tour Operators & Packages Considered", "extensions.md > Botswana > Pangolin \"Chobe, Delta and Kalahari\""]
        },
        {
          id: "wild4-okavango-savuti-chobe",
          type: "tour",
          status: "neutral",
          name: "Wild4 — Okavango, Savuti & Chobe River",
          duration: "14 days (Jul 6–19, 2028)",
          price: { total: "$14,950–$15,250" },
          summary: "Confirmed 2028 departure covering the same broad ecosystem as the preferred Pangolin package.",
          rationale: "Not yet compared in detail against the preferred Pangolin package — logged for reference.",
          keyFacts: [{ label: "2028 departure", value: "Jul 6–19" }],
          links: [{ label: "Wild4 Photographic Safaris", url: "https://www.wild4photographicsafaris.com/photo-safaris/okavango-savuti-chobe-river" }],
          _sourceRefs: ["research.md > Botswana > Chobe & Okavango Delta > Tour Operators & Packages Considered"]
        }
      ]
    },

    "tuli-mashatu": {
      id: "tuli-mashatu",
      name: "Tuli / Mashatu",
      countryId: "botswana",
      blurb: "A distinct eastern-Botswana region researched as a possible additional stop, not otherwise touched by the core itinerary. No decision has been reached here yet — logged as a set of priced, dated candidates without a preferred pick.",
      animals: [
        { speciesId: "elephant",   likelihood: "highly_likely" },
        { speciesId: "giraffe",    likelihood: "highly_likely" },
        { speciesId: "roller",     likelihood: "highly_likely" },
        { speciesId: "leopard",    likelihood: "somewhat_likely" },
        { speciesId: "lion",       likelihood: "somewhat_likely" },
        { speciesId: "cheetah",    likelihood: "somewhat_likely" },
        { speciesId: "wild-dog",   likelihood: "somewhat_likely" },
        { speciesId: "owlet",      likelihood: "somewhat_likely" },
        { speciesId: "kingfisher", likelihood: "somewhat_likely" },
        { speciesId: "gorilla",    likelihood: "not_present" }
      ],

      lodges: [],

      tours: [
        {
          id: "wild4-magical-mashatu",
          type: "tour",
          status: "neutral",
          name: "Wild4 — Magical Mashatu",
          duration: "10 days (Jun 22–Jul 1, 2028)",
          price: { total: "$12,000–$12,700" },
          summary: "Confirmed 2028 departure, Mashatu-only.",
          rationale: "Logged as a priced, dated candidate — not yet compared against the other Tuli/Mashatu options.",
          keyFacts: [{ label: "2028 departure", value: "Jun 22–Jul 1" }],
          links: [{ label: "Wild4 — Magical Mashatu", url: "https://www.wild4photographicsafaris.com/photo-safaris/magical-mashatu" }],
          _sourceRefs: ["research.md > Botswana > Tuli / Mashatu > Tour Operators & Packages Considered"]
        },
        {
          id: "wild4-lions-leopards-malamala-mashatu",
          type: "tour",
          status: "rejected",
          name: "Wild4 — Lions & Leopards of MalaMala & Mashatu",
          duration: "11 days (Aug 3–13, 2028)",
          price: { total: "$17,600–$18,300" },
          summary: "Combined South Africa + Botswana itinerary (MalaMala/Sabi Sands + Mashatu).",
          rationale: "The MalaMala/Sabi Sands leg falls squarely in the ultra-luxury, not-preferred tier already established for that region (see the Greater Kruger decision rationale) — not preferred as a result.",
          keyFacts: [{ label: "2028 departure", value: "Aug 3–13" }],
          links: [{ label: "Wild4 — Lions & Leopards of MalaMala & Mashatu", url: "https://www.wild4photographicsafaris.com/photo-safaris/lion-leopards-of-malamala-mashatu" }],
          _sourceRefs: ["research.md > Botswana > Tuli / Mashatu > Tour Operators & Packages Considered"]
        },
        {
          id: "oryx-mashatu-overnight-hide",
          type: "tour",
          status: "neutral",
          name: "ORYX — Mashatu: Overnight Hide & Predators",
          duration: "6 days (Jul 1–6, 2028)",
          price: { total: "$12,095" },
          summary: "Confirmed 2028 departure built around Mashatu's overnight photography hide.",
          rationale: "Logged as a priced, dated candidate — not yet compared against the other Tuli/Mashatu options.",
          keyFacts: [{ label: "2028 departure", value: "Jul 1–6" }],
          links: [{ label: "ORYX — Mashatu Overnight Hide & Predators", url: "https://www.oryxphoto.com/tour-item/mashatu-overnight-hide-predators-photo-safari-2028" }],
          _sourceRefs: ["research.md > Botswana > Tuli / Mashatu > Tour Operators & Packages Considered"]
        },
        {
          id: "oryx-mashatu-hides-predators",
          type: "tour",
          status: "neutral",
          name: "ORYX — Mashatu: Hides & Predators",
          duration: "6 days (Jul 19–24, 2028)",
          price: { total: "$11,042" },
          summary: "Confirmed 2028 departure, Mashatu hide-and-predator focus.",
          rationale: "Logged as a priced, dated candidate — not yet compared against the other Tuli/Mashatu options.",
          keyFacts: [{ label: "2028 departure", value: "Jul 19–24" }],
          links: [{ label: "ORYX — Mashatu Hides & Predators", url: "https://www.oryxphoto.com/tour-item/mashatu-hides-predators-photo-safari-2028" }],
          _sourceRefs: ["research.md > Botswana > Tuli / Mashatu > Tour Operators & Packages Considered"]
        },
        {
          id: "african-photography-safaris-tuli-wilderness",
          type: "tour",
          status: "unresearched",
          name: "African Photography Safaris — Tuli Wilderness",
          duration: "Not specified",
          price: { total: "Not found" },
          summary: "Recurring July departure (2027 date: Jul 12).",
          rationale: "No published price found yet — logged as a candidate for a direct quote.",
          keyFacts: [],
          links: [{ label: "African Photography Safaris — Tuli Wilderness", url: "https://africanphotographysafaris.com/botswanas-tuli-wilderness/" }],
          _sourceRefs: ["research.md > Botswana > Tuli / Mashatu > Tour Operators & Packages Considered"]
        },
        {
          id: "penda-botswana-photo-safari-tuli",
          type: "tour",
          status: "neutral",
          name: "Penda — Botswana Photo Safari (Tuli)",
          duration: "Recurring July departure (2027: Jul 12–18)",
          price: { total: "$5,795" },
          summary: "Based at Mohave Bush Camp on the Limpopo River. Penda explicitly markets this as pairable with their South Africa (Timbavati) tour the following week.",
          rationale: "Logged as a priced, dated candidate — not yet compared against the other Tuli/Mashatu options.",
          keyFacts: [{ label: "Pairing", value: "Explicitly pairable with Penda's South Africa (Timbavati) tour the following week" }],
          links: [{ label: "Penda Photo Tours — Botswana Photo Safari", url: "https://www.pendaphototours.com/tour/botswana-photo-safari/" }],
          _sourceRefs: ["research.md > Botswana > Tuli / Mashatu > Tour Operators & Packages Considered"]
        }
      ]
    },

    "greater-kruger": {
      id: "greater-kruger",
      name: "Greater Kruger",
      countryId: "south-africa",
      blurb: "The Klaserie Private Nature Reserve — part of the unfenced Greater Kruger ecosystem, the same wildlife as Sabi Sands at dramatically better value. Locked into the core itinerary as a 4-night stay at Africa on Foot, specifically renowned for leopard tracking.",
      animals: [
        { speciesId: "leopard",    likelihood: "highly_likely" },
        { speciesId: "lion",       likelihood: "highly_likely" },
        { speciesId: "elephant",   likelihood: "highly_likely" },
        { speciesId: "giraffe",    likelihood: "highly_likely" },
        { speciesId: "roller",     likelihood: "highly_likely" },
        { speciesId: "wild-dog",   likelihood: "somewhat_likely" },
        { speciesId: "kingfisher", likelihood: "somewhat_likely" },
        { speciesId: "cheetah",    likelihood: "unlikely" },
        { speciesId: "owlet",      likelihood: "unlikely" },
        { speciesId: "gorilla",    likelihood: "not_present" }
      ],

      lodges: [
        {
          id: "africa-on-foot",
          type: "lodge",
          status: "preferred",
          name: "Africa on Foot",
          price: {
            perNightPP: "~$425",
            singleSupplement: "None per earlier research — worth re-verifying",
            note: "4 nights, full board — $1,700 confirmed in budget.md"
          },
          summary: "Klaserie Private Nature Reserve — a specialist photographic operator, part of the same unfenced ecosystem as Sabi Sands at dramatically better value.",
          rationale: "Won a direct stress-test against Sabi Sands flagships (Londolozi $1,200–2,500/night; Mala Mala via Pangolin ~$2,200/night — both roughly 3x this price) and against a hosted alternative (SafariFRANK/Albie Venter, dropped over reliability/pricing-transparency concerns). The clear pick for the mid-range, photography-focused target.",
          keyFacts: [{ label: "Same ownership as", value: "nThambo Tree Camp (logged as backup)" }],
          links: [{ label: "Africa on Foot", url: "https://africaonfoot.com/" }],
          _sourceRefs: ["research.md > South Africa > Greater Kruger > Decision Rationale", "itinerary.md > South Africa — Greater Kruger", "budget.md > South Africa (Greater Kruger — Africa on Foot)"]
        },
        {
          id: "nthambo-tree-camp",
          type: "lodge",
          status: "backup",
          name: "nThambo Tree Camp",
          price: {
            perNightPP: "~$495 (2028 projected)",
            singleSupplement: "Not stated",
            note: "R6,750/pp/night (2026) → R7,425 (2027) → ~R8,170 projected (2028), ~17% more than Africa on Foot"
          },
          summary: "Same ownership as Africa on Foot, same Klaserie location — kept as backup/alternative.",
          rationale: "A direct, same-ownership fallback if Africa on Foot falls through. Runs ~17% more per night. Has a 12+ age policy (irrelevant here) reflecting a slightly more adult-oriented positioning.",
          keyFacts: [{ label: "Age policy", value: "12+ (not relevant for this trip)" }],
          links: [{ label: "nThambo Tree Camp", url: "https://nthambo.com/" }],
          _sourceRefs: ["research.md > South Africa > Greater Kruger > Lodging Considered"]
        },
        {
          id: "umkumbe-bush-lodge",
          type: "lodge",
          status: "rejected",
          name: "Umkumbe Bush Lodge",
          price: {
            perNightPP: "~$543 solo",
            singleSupplement: "Included in the ~$543 figure",
            note: "Includes conservation levy and single supplement"
          },
          summary: "A lower-cost entry point into Sabi Sands specifically.",
          rationale: "Meaningfully more than Africa on Foot, and carries a specific negative review flagging that the traversing area and sightings don't justify the Sabi Sands price tag. Not logged as a serious alternative given the higher cost and quality concerns. Note: a similarly-named but likely distinct property, \"Umkumbe Safari Lodge,\" also exists — worth distinguishing if revisiting.",
          keyFacts: [],
          links: [{ label: "Umkumbe Bush Lodge", url: "https://umkumbebushlodge.com/" }],
          _sourceRefs: ["research.md > South Africa > Greater Kruger > Lodging Considered"]
        },
        {
          id: "sanparks-self-drive-rest-camps",
          type: "lodge",
          status: "rejected",
          name: "Self-Drive SANParks Rest Camps",
          price: {
            perNightPP: "$80–$130",
            singleSupplement: "Not applicable",
            note: "Skukuza, Lower Sabie, etc."
          },
          summary: "A budget option considered before \"no self-drive\" was established as a firm style preference.",
          rationale: "Doesn't fit the trip's standing style preferences (guided, not self-driven) — not preferred.",
          keyFacts: [],
          links: [{ label: "SANParks", url: "https://www.sanparks.org/" }],
          _sourceRefs: ["research.md > South Africa > Greater Kruger > Lodging Considered"]
        }
      ],

      tours: [
        {
          id: "oryx-sabi-sands-big-5",
          type: "tour",
          status: "rejected",
          name: "ORYX — South Africa: Sabi Sands Big 5",
          duration: "Not specified",
          price: { total: "ZAR 226,600", note: "two confirmed 2028 departures: Jul 1–6 and Jul 25–30; ORYX's live tour calendar separately shows a Jul 1–6, 2028 Sabi Sands departure priced at $10,401 pp instead — worth reconfirming exact 2028 dates/currency/price directly before relying on either figure" },
          summary: "Sabi Sands remains the region already ruled out on price for this trip — logged for reference in case that decision is revisited.",
          rationale: "Sabi Sands was already established as not preferred (see Decision Rationale) — this option inherits that verdict rather than being independently rejected.",
          keyFacts: [],
          links: [{ label: "ORYX Photo Tours", url: "https://www.oryxphoto.com/" }],
          _sourceRefs: ["research.md > South Africa > Greater Kruger > Tour Operators & Packages Considered"]
        },
        {
          id: "african-photography-safaris-timbavati",
          type: "tour",
          status: "unresearched",
          name: "African Photography Safaris — Timbavati",
          duration: "Not specified",
          price: { total: "Not found" },
          summary: "Recurring July departure (2027 date: Jul 19). Timbavati is the same unfenced Greater Kruger sub-region as the preferred Africa on Foot pick.",
          rationale: "No published price found yet — logged as a candidate for a direct quote.",
          keyFacts: [],
          links: [{ label: "African Photography Safaris", url: "https://www.africanphotographysafaris.com/photography-safaris" }],
          _sourceRefs: ["research.md > South Africa > Greater Kruger > Tour Operators & Packages Considered"]
        },
        {
          id: "penda-south-africa-photo-safari",
          type: "tour",
          status: "neutral",
          name: "Penda — South Africa Photo Safari",
          duration: "Recurring July departure (2027 dates: Jul 19–25)",
          price: { total: "$5,795" },
          summary: "Also based in Timbavati; hosted by wildlife photographer Alan Hewitt with in-field tuition included (not needed by this traveler). Explicitly pairs with Penda's Botswana/Tuli tour the week before.",
          rationale: "Logged as a priced, dated candidate alongside the preferred direct-booking (Africa on Foot) plan — not directly compared against it in detail.",
          keyFacts: [{ label: "Pairing", value: "Explicitly pairable with Penda's Botswana/Tuli tour the week before" }],
          links: [{ label: "Penda Photo Tours — South Africa Photo Safari", url: "https://www.pendaphototours.com/tour/south-africa-photo-safari/" }],
          _sourceRefs: ["research.md > South Africa > Greater Kruger > Tour Operators & Packages Considered"]
        }
      ]
    },

    kalahari: {
      id: "kalahari",
      name: "Kalahari",
      countryId: "south-africa",
      blurb: "A new region for South Africa alongside Greater Kruger — black-maned Kalahari lions (larger than savanna lions), cheetah, and strong roller/leopard/giraffe presence. Not otherwise investigated in this research beyond the single Wild Eye tour below; no direct-booking lodge alternative has been checked.",
      animals: [
        { speciesId: "lion",       likelihood: "highly_likely" },
        { speciesId: "cheetah",    likelihood: "highly_likely" },
        { speciesId: "roller",     likelihood: "highly_likely" },
        { speciesId: "leopard",    likelihood: "somewhat_likely" },
        { speciesId: "giraffe",    likelihood: "somewhat_likely" },
        { speciesId: "elephant",   likelihood: "not_present" },
        { speciesId: "wild-dog",   likelihood: "not_present" },
        { speciesId: "owlet",      likelihood: "not_present" },
        { speciesId: "kingfisher", likelihood: "not_present" },
        { speciesId: "gorilla",    likelihood: "not_present" }
      ],

      lodges: [],

      tours: [
        {
          id: "wild-eye-exclusive-kalahari-safari",
          type: "tour",
          status: "neutral",
          name: "Wild Eye — Exclusive Kalahari Safari",
          duration: "10 nights (10–20 Jul 2028)",
          price: { total: "R204,195", note: "Early Bird R195,950" },
          summary: "The only Kalahari candidate found — not otherwise investigated in this research, and not yet compared against any direct-booking alternative.",
          rationale: "Logged as a priced, dated candidate — no decision reached yet, since no other Kalahari option has been checked for comparison.",
          keyFacts: [{ label: "2028 departure", value: "10–20 Jul" }],
          links: [{ label: "Wild Eye — Exclusive Kalahari Safari", url: "https://wild-eye.com/product/exclusive-kalahari-safari/" }],
          _sourceRefs: ["research.md > South Africa > Kalahari > Tour Operators & Packages Considered"]
        }
      ]
    }
  }
};

window.TRIP_DATA = TRIP_DATA;
