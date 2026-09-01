# data.js Population Plan

Tracks region-by-region progress filling out `website/data.js` from the markdown source docs
(research.md, itinerary.md, extensions.md), following the schema/pattern set by the East Africa
build (countries with visa/medical info, subregions with animal likelihoods pulled from
research.md's structured "Animals in X" lists, lodges/tours with status + rationale + `_sourceRefs`).

**Standing scoping rule:** a location only gets its own subregion if research.md has a structured
"Animals in X" breakdown for it, AND itinerary.md doesn't tag it "Animal checklist: None dedicated
— this leg is a rest stop." Pure transit/recovery hubs (Entebbe, Nairobi, Maun, Johannesburg, Cape
Town) are deliberately excluded even when they have named hotel picks — only wildlife-focused legs
get subregion cards. Extensions with no structured animal list in research.md (prose-only, like
Hwange/Central Kalahari) are deferred until that research exists.

## Central Africa (done)

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
- [x] Sanity-check the file (balanced braces, no trailing commas), confirmed data.js loads cleanly in Node
- [x] Committed and pushed (commit `71cb32b`)

- [x] Update `regions.southern-africa.countryIds` to include south-africa and namibia
- [x] Add `countries.south-africa` (visa-free, sourced from research.md's Visa & Entry Requirements section)
- [x] Add `countries.namibia` (no dedicated visa/medical research exists — flagged honestly, same treatment as Zambia)
- [x] Add subregion `greater-kruger` (South Africa) — Africa on Foot preferred lodge, nThambo backup, Umkumbe/SANParks rejected, ORYX Sabi Sands rejected, Timbavati tours neutral/unresearched
- [x] Add subregion `kalahari` (South Africa) — Wild Eye Exclusive Kalahari Safari, only candidate found, no lodges researched
- [x] Add subregion `hermanus` (South Africa) — Misty Waves preferred lodge + 3 other candidates; whale-watching/Marine Big 5/kayak activity operators as tour entries; helicopter flight rejected
- [x] Add subregion `etosha-damaraland` (Namibia) — not preferred as an extension; blurb-only, no lodges/tours since none were ever priced
- [x] Wire `subregionIds` on south-africa/namibia country entries
- [x] Sanity-check the file (balanced braces, no trailing commas), confirm data.js loads cleanly in Node
- [x] Commit and push

### Deferred from Central Africa

- **Hwange (Zimbabwe extension)** — real lodge pricing exists in extensions.md, but no structured
  animal-likelihood breakdown exists in research.md. Would need that research done first, or a
  deliberate call to build likelihoods from the prose description instead of transcribing them.
- **Central Kalahari (Botswana extension)** — same issue: extensions.md has pricing tiers but no
  named lodge/tour candidates and no research.md animal list. Also touches meerkats, a species
  not currently in the `species` dictionary or `icons.js`.
- **Maun (Botswana)** — has a structured animal list in research.md but is a pure transit/basing
  decision with no lodges or tours, same treatment as Entebbe/Nairobi (no subregion card).

## Southern Africa (in progress)

Countries: South Africa (Greater Kruger, Kalahari, Hermanus — Johannesburg/Cape Town excluded as
rest stops per the standing rule) and Namibia (Etosha & Damaraland — investigated and explicitly
not preferred as an extension, but logged the same way Lower Zambezi was: full subregion, blurb
explains the "not preferred" outcome, empty lodges/tours since no properties were ever priced).

### Checklist

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
