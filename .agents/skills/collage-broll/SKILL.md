---
name: collage-broll
description: >-
  Editorial halftone paper-collage B-roll and tactile motion graphics based on
  pyang5166/gbro-collage-broll (Vox/Bloomberg explainer style). Uses paper cut-outs,
  high-contrast halftone textures, cardstock backing, tactile stamps, and stop-motion assembly.
---

# Collage B-Roll Skill (`pyang5166/gbro-collage-broll`)

## Core Concept
Collage B-roll turns conceptual, technical, or auditory explanations into high-retention editorial paper-collage visuals. Instead of generic 3D renders or stock slides, it uses tactile, human-curated paper cut-out aesthetics reminiscent of Vox and Johnny Harris journalism.

---

## 1. Aesthetic Rules & Visual Language
1. **Halftone & Paper Cut-outs:** Black-and-white photographic assets silhouetted on transparent backgrounds, framed with colored cardstock borders or washi tape accents.
2. **Tactile Imperfection:** Slight rotational offsets (`transform: rotate(-1.5deg)` to `rotate(2deg)`), heavy paper drop-shadows (`box-shadow: 0 12px 30px rgba(0,0,0,0.7)`), and stamp textures.
3. **Assemble-from-Empty:** Elements do not crossfade smoothly like a slideshow; they slide, stamp down with an elastic bounce (`back.out(1.6)`), and assemble into a tactile dossier.
4. **Concrete Metaphors:**
   * Infrastructure $\rightarrow$ Server rack blueprint cards.
   * Evidences $\rightarrow$ Classified dossier folders with paperclips and evidence tags (E1 to E19).
   * Audit Findings $\rightarrow$ Angled red warning stamps ("NO CONFORME", "HALLAZGO CRÍTICO").

---

## 2. Animation Code Implementation (GSAP)
```javascript
// Tactile Paper Stamp Assembly
function stampCard(selector, angle = -2, duration = 0.6) {
    return gsap.fromTo(selector, 
        { scale: 1.4, opacity: 0, rotation: angle * 2 },
        { scale: 1.0, opacity: 1, rotation: angle, duration: duration, ease: "back.out(1.7)" }
    );
}
```

