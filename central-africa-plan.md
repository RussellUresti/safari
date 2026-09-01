# Central Africa → data.js Population Plan

Scope: fill in Zambia and Botswana (Zimbabwe's Victoria Falls is already done) under the
`central-africa` region, following the exact pattern used for East Africa — countries with
visa/medical info, subregions with animal likelihoods pulled from research.md's structured
"Animals in X" lists, lodges/tours with status + rationale + `_sourceRefs`.

**Scoping rule carried over from the East Africa build:** a location only gets its own
subregion if research.md has a structured "Animals in X" breakdown for it. Transit/logistics-only
stops (Maun) and extensions with no structured animal list (Hwange, Central Kalahari) are
deliberately left out for now — see "Deferred" below.

## Checklist

- [x] Read research.md, itinerary.md, extensions.md, guidelines.md, budget.md for Central Africa content
- [x] Confirm icon/species set — no new species needed (all Central Africa animals already exist in `species`)
- [x] Update `regions.central-africa.countryIds` to include zambia and botswana
- [x] Add `countries.zambia` (no dedicated visa/medical research exists in the source docs — flagged honestly rather than fabricated)
- [x] Add `countries.botswana` (visa-free, sourced from research.md's Visa & Entry Requirements section)
- [x] Add subregion `south-luangwa` (Zambia) — Robin Pope Safaris preferred lodge, Pangolin/Penda tours, Wildlife Camp
- [x] Add subregion `lower-zambezi` (Zambia) — whole subregion not preferred/dropped; Chiawa, Old Mondoro, Galamuka, Royal Zambezi lodges + 5 tour operators, all rejected
- [x] Add subregion `chobe-okavango-delta` (Botswana) — Shinde Footsteps + Muchenje + Bushman Plains lodges; Pangolin's 4 Botswana products + Wild4
- [x] Add subregion `tuli-mashatu` (Botswana) — Wild4/ORYX/African Photography Safaris/Penda tours, no lodges researched
- [x] Wire `subregionIds` on zambia/botswana country entries
- [x] Sanity-check the file (balanced braces, no trailing commas) and open in browser to confirm it renders

## Deferred (not in this pass — flagged for a future round)

- **Hwange (Zimbabwe extension)** — real lodge pricing exists in extensions.md, but no structured
  animal-likelihood breakdown exists in research.md. Would need that research done first, or a
  deliberate call to build likelihoods from the prose description instead of transcribing them.
- **Central Kalahari (Botswana extension)** — same issue: extensions.md has pricing tiers but no
  named lodge/tour candidates and no research.md animal list. Also touches meerkats, a species
  not currently in the `species` dictionary or `icons.js`.
- **Maun (Botswana)** — has a structured animal list in research.md but is a pure transit/basing
  decision with no lodges or tours, same treatment as Entebbe/Nairobi (no subregion card).
