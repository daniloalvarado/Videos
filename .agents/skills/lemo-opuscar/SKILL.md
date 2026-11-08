---
name: lemo-opuscar
description: >-
  Code-driven animation and film production toolkit. Generates short films,
  explainer videos, and data graphics using deterministic HTML5/Canvas/GSAP code,
  script-to-scene storyboarding, and local TTS/SFX pipelines. Based on lemomo-ai/lemo-opuscar.
---

# Lemo-Opuscar Animation Toolkit (`lemomo-ai/lemo-opuscar`)

## Core Concept
Lemo-Opuscar replaces black-box video generative models with **video-as-code**. Every element, transition, camera move, and sound cue is strictly programmed with mathematical precision, allowing 100% reproducible, pixel-perfect 1080p/4K renders.

---

## 1. Production Pipeline
1. **Directing Brief & Storyboard:** Define the script, pacing, scene modules, and typographic hierarchy before animation code is finalized.
2. **Modular Scene Architecture:** Each scene lives in an isolated builder function (`buildSceneN()`). Modifying, iterating, or re-rendering one scene must never break adjacent scenes.
3. **Audio-Video Lock:** Every subtitle token and graphical reveal is strictly keyed to speech markers or audio durations.
4. **Deterministic Canvas / Frame-Stepping:** The timeline can be scrubbed frame-by-frame (`timeline.seek(time)`) without state drift or glitching.

---

## 2. Key Animation Conventions
* **Resolution:** 1920x1080 Full HD (16:9 standard).
* **Frame Rate:** 30fps / 60fps deterministic stepping.
* **Typographic Standards:** High-personality display headings paired with clean, readable serif/sans body fonts.
* **Audio Layer:** Multi-channel audio (Speech Narration, Ambient Soundscape, UI SFX micro-cues).

