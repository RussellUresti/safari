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
    { id: "east-africa",    label: "East Africa",    countryIds: ["kenya"] },
    { id: "central-africa", label: "Central Africa",  countryIds: [] },
    { id: "southern-africa",label: "Southern Africa", countryIds: [] }
  ],

  // ---- countries ---------------------------------------------------------
  countries: {
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
      subregionIds: ["laikipia", "masai-mara"]
    }
  },

  // ---- sub-regions ---------------------------------------------------------
  subregions: {

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
