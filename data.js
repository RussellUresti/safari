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
    { id: "east-africa",    label: "East Africa",    countryIds: ["uganda", "kenya", "tanzania"] },
    { id: "central-africa", label: "Central Africa",  countryIds: [] },
    { id: "southern-africa",label: "Southern Africa", countryIds: [] }
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
      subregionIds: ["laikipia", "amboseli", "masai-mara"]
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
          status: "preferred",
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
          status: "preferred",
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
          status: "backup",
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
    }
  }
};

window.TRIP_DATA = TRIP_DATA;
