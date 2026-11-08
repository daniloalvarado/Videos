---
name: onetake
description: >-
  Build continuous-take product launch films, motion graphics, and UI/UX demos
  using front-end code (HTML5/CSS/GSAP) and continuous camera grammar without
  abrupt cuts or slideshow transitions. Based on feitangyuan/onetake.
---

# OneTake Motion Skill (`feitangyuan/onetake`)

## Core Philosophy: The Continuous Single Take
Traditional AI-generated videos stack discrete scenes with crossfades or slide cuts, creating a disjointed "slideshow" feel. **OneTake** enforces a continuous camera language where every visual beat physically morphs, zooms, pans, or scales into the next under one unbroken temporal timeline.

---

## 1. Golden Motion Grammar
1. **Never Replace a Beat — Carry It:** An active card, avatar, or data point should not vanish; it zooms out, becomes part of a cluster, or transforms into an anchor for the next scene.
2. **Rest vs. Burst (Pacing):** Bursts of kinetic animation must be followed by a deliberate resting beat (0.8s - 1.5s) to allow the viewer's eyes to absorb the data.
3. **Continuous Tracking Camera:** The camera rig never jumps instantly to (0,0). It tracks along a 2D/3D plane with continuous momentum using smooth easing (`power2.inOut`, `cubic-bezier(0.16, 1, 0.3, 1)`).
4. **Deterministic Timeline:** Avoid `setInterval` or wall-clock `Date.now()`. All animations must be tied to a scrubbable GSAP or Web Animations timeline with frame-perfect precision.

---

## 2. Implementation Template (GSAP / HyperFrames)
```javascript
// Continuous Camera Move between Beats
function transitionBeat(cam, targetX, targetY, targetScale, duration = 1.8) {
    return gsap.to(cam, {
        x: targetX,
        y: targetY,
        scale: targetScale,
        duration: duration,
        ease: "power2.inOut"
    });
}
```

---

## 3. Visual Polish Checklist
* [ ] Background depth grid or particle field that reveals camera velocity.
* [ ] Micro-interactions (pops, glows, subtle parallax) on active elements.
* [ ] Sound effects synchronized to spatial arrival, not just generic entrance.

