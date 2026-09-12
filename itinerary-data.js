/* =========================================================================
   itinerary-data.js — day-by-day content for the Itinerary page.
   Source: itinerary.md (settled plan). This file is a visual reconstruction
   of that document, not a re-statement of it — see the notes below and the
   `inferred` flags on individual days for anywhere this file had to make a
   judgment call the source document doesn't make explicitly.

   SCHEMA
   day.n            — overall trip day number, continuous across the whole trip
   day.primary       — { type: flight|hotel|lodge|tour, text }  ("type" picks the icon)
   day.supplemental  — optional { type: flight|transfer, text } shown as "+ icon"
   day.note          — optional short detail line
   day.inferred       — true if this day's placement/mode is a guess, not sourced

   TYPE MEANING
   flight  — air travel
   hotel   — a city/recovery hotel night (not a safari lodge)
   lodge   — a night at a safari lodge/camp (the safari/tour is inherent to the stay)
   tour    — a day itinerary.md itemizes around a specific named activity
   transfer (supplemental only) — a ground/local transfer alongside the day's main thing

   A shared travel day between two legs (e.g. the flight ending one leg and
   starting the next) is shown ONCE, as the first day of the leg you arrive
   into — not duplicated at the end of the leg you left. That means a leg's
   stated total from itinerary.md (e.g. "9d/8n") may be one day more than
   the number of rows shown directly under its header; the extra day is the
   arrival row at the top of the *next* leg. See page intro copy for this note.
   ========================================================================= */

const ITINERARY_DATA = {
  intro:
    "A visual day-by-day walk through itinerary.md — flights, hotels, lodges, and tours in the order they happen. Full date recalculation for the front half of the trip is still pending (see todo.md); day numbers below are relative to trip day 1, not calendar dates. Victoria Falls and Johannesburg are logged in itinerary.md as day ranges (4–5d/3–4n) — both are shown here at the higher end (4 nights). A travel day shared between two legs is shown once, as the arrival day of the leg it leads into, so a leg's row count can run one short of its itinerary.md total — the missing day is the arrival row at the top of the next leg.",

  legs: [
    {
      id: "uganda",
      name: "Uganda — Gorilla Trekking",
      country: "Uganda",
      blurb: "International arrival into Entebbe, a rest day, a 3-day Gorilla Habituation Experience, then recovery before continuing to Kenya.",
      totalPrice: "$4,407–5,717",
      totalDaysLabel: "9d / 8n",
      days: [
        {
          n: 1,
          primary: { type: "hotel", text: "Protea Hotel Entebbe" },
          supplemental: { type: "flight", text: "FLIGHT: TBD — international arrival into Entebbe (EBB), gateway city TBD (Europe/Istanbul/Cairo)" },
          note: "Post-flight recovery, night 1 of 2"
        },
        { n: 2, primary: { type: "hotel", text: "Protea Hotel Entebbe" }, note: "Recovery, night 2 of 2" },
        {
          n: 3,
          primary: { type: "lodge", text: "LODGE: TBD — Gorilla Habituation Experience lodge, Rushaga sector" },
          supplemental: { type: "transfer", text: "TRANSFER: TBD — Entebbe → Rushaga" },
          note: "Day 1 of the bundled 3-day/2-night GHE package (transport + lodge + trek). Operator TBD: Nextgensafaris, Encounter Africa Safaris, Gorilla Tracking Uganda, Rwanda Gorilla, or Katona Tours.",
          inferred: true
        },
        {
          n: 4,
          primary: { type: "lodge", text: "LODGE: TBD — Gorilla Habituation Experience lodge, Rushaga sector" },
          note: "The 4-hour Gorilla Habituation Experience trek happens today — semi-habituated family, small group of 4, extended photography time. (Exact day-within-stay placement inferred — itinerary.md doesn't specify.) Night 2 of 2.",
          inferred: true
        },
        {
          n: 5,
          primary: { type: "hotel", text: "Protea Hotel Entebbe" },
          supplemental: { type: "transfer", text: "TRANSFER: TBD — Rushaga → Entebbe" },
          note: "Post-safari recovery, night 1 of 4",
          inferred: true
        },
        { n: 6, primary: { type: "hotel", text: "Protea Hotel Entebbe" }, note: "Recovery, night 2 of 4" },
        { n: 7, primary: { type: "hotel", text: "Protea Hotel Entebbe" }, note: "Recovery, night 3 of 4" },
        { n: 8, primary: { type: "hotel", text: "Protea Hotel Entebbe" }, note: "Recovery, night 4 of 4" }
      ]
    },
    {
      id: "kenya",
      name: "Kenya — Masai Mara",
      country: "Kenya",
      blurb: "Nairobi as a recovery base on both ends of an extended stay in a Masai Mara conservancy camp with a dedicated photography vehicle.",
      totalPrice: "$6,072–7,347",
      totalDaysLabel: "9d / 8n",
      days: [
        {
          n: 9,
          primary: { type: "hotel", text: "Park Inn by Radisson Nairobi Westlands" },
          supplemental: { type: "flight", text: "FLIGHT: TBD — Entebbe → Nairobi" },
          note: "Post-flight recovery, night 1 of 2"
        },
        { n: 10, primary: { type: "hotel", text: "Park Inn by Radisson Nairobi Westlands" }, note: "Recovery, night 2 of 2" },
        {
          n: 11,
          primary: { type: "lodge", text: "LODGE: TBD — Kicheche conservancy camp, Masai Mara" },
          supplemental: { type: "flight", text: "FLIGHT: TBD — Nairobi → Masai Mara" },
          note: "Camp TBD: Kicheche Mara North, Kicheche Bush Olare, or Kicheche Valley Naboisho. Dedicated photography vehicle. Night 1 of 4. Transit mode assumed to be a light-aircraft hop, the standard way in — itinerary.md doesn't state it.",
          inferred: true
        },
        { n: 12, primary: { type: "lodge", text: "LODGE: TBD — Kicheche conservancy camp" }, note: "Night 2 of 4" },
        { n: 13, primary: { type: "lodge", text: "LODGE: TBD — Kicheche conservancy camp" }, note: "Night 3 of 4" },
        { n: 14, primary: { type: "lodge", text: "LODGE: TBD — Kicheche conservancy camp" }, note: "Night 4 of 4" },
        {
          n: 15,
          primary: { type: "hotel", text: "Park Inn by Radisson Nairobi Westlands" },
          supplemental: { type: "flight", text: "FLIGHT: TBD — Masai Mara → Nairobi" },
          note: "Post-safari recovery, night 1 of 2",
          inferred: true
        },
        { n: 16, primary: { type: "hotel", text: "Park Inn by Radisson Nairobi Westlands" }, note: "Recovery, night 2 of 2" }
      ]
    },
    {
      id: "victoria-falls",
      name: "Victoria Falls",
      country: "Zimbabwe",
      blurb: "A single relaxed stay in Zimbabwe, downtime between the Kenya and Botswana legs. Shown at the higher end of itinerary.md's 4–5d/3–4n range.",
      totalPrice: "$735–1,494",
      totalDaysLabel: "4–5d / 3–4n (shown as 5d/4n)",
      days: [
        {
          n: 17,
          primary: { type: "hotel", text: "HOTEL: TBD — Victoria Falls" },
          supplemental: { type: "flight", text: "FLIGHT: TBD — Nairobi → Victoria Falls (VFA)" },
          note: "Candidates: Shongwe Oasis Boutique Lodge & Spa, Cresta Sprayview, Nkosi Guest Lodge, Batonka Guest Lodge, Victoria Falls Safari Lodge, or Radisson Blu Mosi-oa-Tunya (Zambia side). Night 1 of 4."
        },
        {
          n: 18,
          primary: { type: "hotel", text: "HOTEL: TBD — Victoria Falls" },
          note: "One guided falls tour (Zimbabwe side, incl. park entry) happens sometime during this stay — itinerary.md doesn't say which day. Placed here as a best guess. Night 2 of 4.",
          inferred: true
        },
        { n: 19, primary: { type: "hotel", text: "HOTEL: TBD — Victoria Falls" }, note: "Night 3 of 4" },
        { n: 20, primary: { type: "hotel", text: "HOTEL: TBD — Victoria Falls" }, note: "Night 4 of 4 — collected directly into the Chobe & Okavango Delta tour tomorrow" }
      ]
    },
    {
      id: "chobe-okavango",
      name: "Chobe & Okavango Delta",
      country: "Botswana",
      blurb: "Pangolin's fully-hosted photography safari across two ecosystems — the centerpiece of the trip. 14 confirmed safari drives.",
      totalPrice: "$14,011",
      totalDaysLabel: "8d / 7n",
      days: [
        {
          n: 21,
          primary: { type: "lodge", text: "Pangolin Chobe Hotel, Kasane" },
          supplemental: { type: "transfer", text: "Collected directly from Victoria Falls" },
          note: "Pangolin “Chobe and Okavango Delta” 8-Day Photo Safari. Included: twice-daily activities (game drive or photo boat) on the Chobe River — elephants, buffalo, hippo, birdlife. Night 1 of 3."
        },
        { n: 22, primary: { type: "lodge", text: "Pangolin Chobe Hotel, Kasane" }, note: "Night 2 of 3" },
        { n: 23, primary: { type: "lodge", text: "Pangolin Chobe Hotel, Kasane" }, note: "Night 3 of 3" },
        {
          n: 24,
          primary: { type: "lodge", text: "Shinde Footsteps, Okavango Delta" },
          supplemental: { type: "flight", text: "Bush flight, Kasane → Delta (included in tour)" },
          note: "Included: twice-daily game drives, plus the trip's only mokoro/dugout-canoe safaris. Wild dogs, dense leopard population, malachite kingfisher stronghold, abundant African barred owlet. Night 1 of 4."
        },
        { n: 25, primary: { type: "lodge", text: "Shinde Footsteps, Okavango Delta" }, note: "Night 2 of 4" },
        { n: 26, primary: { type: "lodge", text: "Shinde Footsteps, Okavango Delta" }, note: "Night 3 of 4" },
        { n: 27, primary: { type: "lodge", text: "Shinde Footsteps, Okavango Delta" }, note: "Night 4 of 4" }
      ]
    },
    {
      id: "johannesburg",
      name: "Johannesburg",
      country: "South Africa",
      blurb: "Pure rest stop, breaking the Maun-to-Hoedspruit flight chain. Shown at the higher end of itinerary.md's 4–5d/3–4n range.",
      totalPrice: "$500–865",
      totalDaysLabel: "4–5d / 3–4n (shown as 5d/4n)",
      days: [
        {
          n: 28,
          primary: { type: "hotel", text: "Protea Hotel by Marriott Wanderers, Sandton" },
          supplemental: { type: "flight", text: "FLIGHT: TBD — Maun → Johannesburg" },
          note: "Night 1 of 4"
        },
        { n: 29, primary: { type: "hotel", text: "Protea Hotel by Marriott Wanderers, Sandton" }, note: "Night 2 of 4" },
        { n: 30, primary: { type: "hotel", text: "Protea Hotel by Marriott Wanderers, Sandton" }, note: "Night 3 of 4" },
        { n: 31, primary: { type: "hotel", text: "Protea Hotel by Marriott Wanderers, Sandton" }, note: "Night 4 of 4" }
      ]
    },
    {
      id: "greater-kruger",
      name: "South Africa — Greater Kruger",
      country: "South Africa",
      blurb: "Photography-focused safari lodge in the Klaserie Private Nature Reserve, part of the unfenced Greater Kruger ecosystem.",
      totalPrice: "$1,950–2,070",
      totalDaysLabel: "5d / 4n",
      days: [
        {
          n: 32,
          primary: { type: "lodge", text: "Africa on Foot, Klaserie Private Nature Reserve" },
          supplemental: { type: "flight", text: "FLIGHT: TBD — Johannesburg → Hoedspruit" },
          note: "Plus lodge transfer on arrival. Backup/alternative: nThambo Tree Camp. Region renowned for leopard tracking. Night 1 of 4."
        },
        { n: 33, primary: { type: "lodge", text: "Africa on Foot, Klaserie Private Nature Reserve" }, note: "Night 2 of 4" },
        { n: 34, primary: { type: "lodge", text: "Africa on Foot, Klaserie Private Nature Reserve" }, note: "Night 3 of 4" },
        { n: 35, primary: { type: "lodge", text: "Africa on Foot, Klaserie Private Nature Reserve" }, note: "Night 4 of 4" }
      ]
    },
    {
      id: "cape-town",
      name: "Cape Town",
      country: "South Africa",
      blurb: "Rest stop closing the gap between the Kruger safari and the Hermanus finale.",
      totalPrice: "$780–1,145",
      totalDaysLabel: "4d / 3n",
      days: [
        {
          n: 36,
          primary: { type: "hotel", text: "Radisson RED V&A Waterfront" },
          supplemental: { type: "flight", text: "FLIGHT: TBD — Hoedspruit → Cape Town" },
          note: "Night 1 of 3"
        },
        { n: 37, primary: { type: "hotel", text: "Radisson RED V&A Waterfront" }, note: "Night 2 of 3" },
        { n: 38, primary: { type: "hotel", text: "Radisson RED V&A Waterfront" }, note: "Night 3 of 3" }
      ]
    },
    {
      id: "hermanus",
      name: "Hermanus — Whale Watching Finale",
      country: "South Africa",
      blurb: "The trip's closing leg, timed to the front edge of peak southern right whale season.",
      totalPrice: "$1,225–1,430",
      totalDaysLabel: "5d / 4n",
      days: [
        {
          n: 39,
          primary: { type: "tour", text: "Whale watching sailing (14:00/15:00 slot)" },
          supplemental: { type: "transfer", text: "Private car transfer from Cape Town (~1.5 hrs)" },
          note: "“Transfer day” per itinerary.md — one additional sailing. Check into Misty Waves Boutique Hotel today, night 1 of 4."
        },
        {
          n: 40,
          primary: { type: "tour", text: "Three back-to-back whale watching sailings (9:00 / 12:00 / 15:00)" },
          note: "“Day 1” per itinerary.md. Southern right whales. Misty Waves Boutique Hotel, night 2 of 4."
        },
        {
          n: 41,
          primary: { type: "tour", text: "Marine Big 5 boat tour, Gansbaai / Dyer Island" },
          note: "“Day 2” per itinerary.md. African penguins appear incidentally on this tour. Misty Waves Boutique Hotel, night 3 of 4."
        },
        {
          n: 42,
          primary: { type: "tour", text: "Sea kayak tour, Hermanus Old Harbour" },
          note: "“Day 3” per itinerary.md. Misty Waves Boutique Hotel, night 4 of 4."
        },
        {
          n: 43,
          primary: { type: "end", text: "Trip ends" },
          note: "An independent extended stay in Hermanus follows, outside this trip's scope."
        }
      ]
    }
  ]
};

window.ITINERARY_DATA = ITINERARY_DATA;
