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

### Deferred from Central Africa

- **Hwange (Zimbabwe extension)** — real lodge pricing exists in extensions.md, but no structured
  animal-likelihood breakdown exists in research.md. Would need that research done first, or a
  deliberate call to build likelihoods from the prose description instead of transcribing them.
- **Central Kalahari (Botswana extension)** — same issue: extensions.md has pricing tiers but no
  named lodge/tour candidates and no research.md animal list. Also touches meerkats, a species
  not currently in the `species` dictionary or `icons.js`.
- **Maun (Botswana)** — has a structured animal list in research.md but is a pure transit/basing
  decision with no lodges or tours, same treatment as Entebbe/Nairobi (no subregion card).

## Southern Africa (done, scoped down)

South Africa only — Greater Kruger and Kalahari. Hermanus and Namibia (Etosha & Damaraland) were
both drafted and then deliberately removed at Russell's request: Hermanus is whale watching, not
a safari, and Namibia was never researched to the depth the rest of the trip was (investigated,
found not compelling enough, dropped). Johannesburg/Cape Town stay excluded as rest stops per the
standing rule above.

- [x] Read research.md, itinerary.md, extensions.md, guidelines.md, budget.md for Southern Africa content
- [x] Update `regions.southern-africa.countryIds` to include south-africa
- [x] Add `countries.south-africa` (visa-free, sourced from research.md's Visa & Entry Requirements section)
- [x] Add subregion `greater-kruger` — Africa on Foot preferred lodge, nThambo backup, Umkumbe/SANParks rejected, ORYX Sabi Sands rejected, Timbavati tours neutral/unresearched
- [x] Add subregion `kalahari` — Wild Eye Exclusive Kalahari Safari, only candidate found, no lodges researched
- [x] Add, then remove, subregion `hermanus` and country `namibia`/`etosha-damaraland` per Russell's request
- [x] Sanity-check the file (balanced braces, no trailing commas), confirm data.js loads cleanly in Node
- [x] Commit and push

## Site polish

- [x] Generated `website/favicon.ico` (16/32/48px) — a gold sun over a rust horizon band on the
  site's dark "dusk-savanna" palette, built with a small standalone Python script since no
  ImageMagick/Pillow was available locally. Wired in via `<link rel="icon">` in index.html.
