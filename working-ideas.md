# Working Ideas

Improvements identified but not yet implemented for the Markdown Character Sheet Generator (`mdtemplate.html` / `js/mdtemplate.js`).

## From Jaminka Reference Sheet

- **Base Atk / CMB / CMD fields** — The reference sheet includes these combat stats on a second line within the Ability Scores cell (`<br> Base Atk: +0, CMB: +0, CMD: +12`). Currently users must manually append these to the Ability Scores freetext field with no guidance or dedicated inputs.

- **Hyperlinks on Templates field** — Feats and Traits got name+URL inputs, but the Templates field (class, archetype) is still a plain freetext input. Should be upgraded to dynamic name+URL rows like feats.

## From Silas Swiftfoot Reference Sheet

- **Ranged weapon field** — Only a single Melee field exists. Silas has a Starknife with a range increment. Should add a dedicated Ranged input row (or make offense a dynamic section supporting multiple weapon entries).
