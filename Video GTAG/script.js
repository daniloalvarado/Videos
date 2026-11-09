/**
 * VIDEO S10: GTAG - AUDITORÍA DE INFRAESTRUCTURA Y OPERACIONES DE TI
 * Motor de Animación HyperFrames / GSAP Modular
 * Modo 2 Escenas (E1: Portada institucional • E2: Matriz de Riesgos Magerit)
 * Sin voces/diálogos • SFX Sincronizados y Tipografía Cinética OneTake
 * Resolución Nativa: 1920x1080
 */

// --- 1. MOTOR DE EFECTOS DE SONIDO (HÍBRIDO: ARCHIVO + WEB AUDIO API) ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudioSystem() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playAudioFile(relativePath) {
    try {
        const snd = new Audio(relativePath);
        snd.volume = 0.65;
        snd.play().catch(() => { });
    } catch (e) { }
}

// =========================================================================
// 🎚️ CALIBRADOR DE VELOCIDADES INDIVIDUALES POR AUDIO / ESCENA
// Modifica la velocidad de cada audio de forma totalmente independiente:
// Ejemplos: 1.0 (normal), 1.15 (+15%), 1.20 (+20%), 1.25 (+25%)
// Al modificar cualquiera, todo el video, sus animaciones, zooms
// y desplazamientos de tabla se sincronizan automáticamente.
// =========================================================================
const AUDIO_SPEEDS = {
    paso1_1: 1.25,      // Escena 2: Intro 32 Riesgos + Matriz 5x5 (Paso 1_1.wav)
    paso1_2: 1.25,      // Escena 2: Tabla de 12 Riesgos Priorizados (Paso 1_2Tabla.wav)
    paso2: 1.25,        // Escena 3: Controles Esperados Componentes A-E (Paso 2.wav)
    paso3: 1.25,        // Escena 4: Solicitud de Evidencias E1-E19 (Paso 3.wav: 0s-73.2s y 116.2s-133.96s)
    paso4_e5: 1.25,     // Escena 5: Pruebas de Cumplimiento A, B, C (Paso 4.wav: 0s a 64.85s)
    paso4_e6: 1.25,     // Escena 6: Pruebas de Cumplimiento D, E (Paso 4.wav: 64.88s a 100.31s)
    paso5_e7: 1.25,     // Escena 7: Hallazgos y Desviaciones A, B (Paso 5.wav: 0s a 100.95s)
    paso5_e8: 1.25,     // Escena 8: Hallazgos y Desviaciones C, D, E (Paso 5.wav: 100.95s a 188.05s)
    paso6_e9: 1.25      // Escena 9: Conclusiones y Dictamen de Auditoría (Paso 6.wav)
};

/*
===============================================================================
📋 MAPEO MAESTRO DE AUDIOS POR ESCENA Y PUNTOS DE CORTE EXACTOS (RMS):
-------------------------------------------------------------------------------
#  | ESCENA      | ARCHIVO DE AUDIO      | SEGMENTO / CONTENIDO           | INICIO AUDIO | DUR. RAW | VELOCIDAD
---+-------------+-----------------------+--------------------------------+--------------+----------+----------
1  | Escena 1    | (Sin voz - Portada)   | Efectos SFX y tipografía       | -            | -        | -
2a | Escena 2    | Paso 1_1.wav          | Intro 32 Riesgos + Matriz 5x5  | 0.00s        | 16.84s   | AUDIO_SPEEDS.paso1_1
2b | Escena 2    | Paso 1_2Tabla.wav     | Tabla 12 Riesgos Priorizados   | 0.00s        | 117.26s  | AUDIO_SPEEDS.paso1_2
3  | Escena 3    | Paso 2.wav            | Controles Esperados (Comp A-E) | 0.00s        | 130.76s  | AUDIO_SPEEDS.paso2
4a | Escena 4    | Paso 3.wav (Parte 1)  | Indagación + Gestión Interna   | 0.00s        | 73.20s   | AUDIO_SPEEDS.paso3 (detiene en 1:13)
4b | Escena 4    | Paso 3.wav (Parte 2)  | Observación Directa Presencial | 116.20s      | 17.76s   | AUDIO_SPEEDS.paso3 (reanuda en 1:56)
5  | Escena 5    | Paso 4.wav (Bloque 1) | Pruebas Cumplimiento (A, B, C) | 0.00s        | 64.85s   | AUDIO_SPEEDS.paso4_e5 (corte en silencio 64.80-64.88s)
6  | Escena 6    | Paso 4.wav (Bloque 2) | Pruebas Cumplimiento (D, E)    | 64.88s       | 35.43s   | AUDIO_SPEEDS.paso4_e6 (hasta final 100.31s)
7  | Escena 7    | Paso 5.wav (Bloque 1) | Hallazgos/Desviaciones (A, B)  | 0.00s        | 100.95s  | AUDIO_SPEEDS.paso5_e7 (corte en silencio 100.88-101.02s)
8  | Escena 8    | Paso 5.wav (Bloque 2) | Hallazgos/Desviaciones (C,D,E) | 100.95s      | 87.10s   | AUDIO_SPEEDS.paso5_e8 (hasta final 188.05s)
9  | Escena 9    | Paso 6.wav            | Dictamen y Conclusiones Finales| 0.00s        | 99.18s   | AUDIO_SPEEDS.paso6_e9
===============================================================================
*/

// --- SISTEMA MAESTRO DE VOZ EN OFF (VOICEOVER CONTROLLER) ---
const VOICEOVER_TRACKS = [
    {
        id: "paso1_1",
        file: "./AUDIOS PASO 1-6/Paso 1_1.wav",
        sceneLabel: "scene2_start",
        sceneIndex: 2,
        offsetInScene: 0.4,
        rawAudioStart: 0,
        rawDuration: 16.84,
        get speed() { return AUDIO_SPEEDS.paso1_1; },
        get duration() { return this.rawDuration / this.speed; }
    },
    {
        id: "paso1_2",
        file: "./AUDIOS PASO 1-6/Paso 1_2Tabla.wav",
        sceneLabel: "scene2_start",
        sceneIndex: 2,
        get offsetInScene() { return 0.4 + (16.84 / AUDIO_SPEEDS.paso1_1) + 1.2; },
        rawAudioStart: 0,
        rawDuration: 117.26,
        get speed() { return AUDIO_SPEEDS.paso1_2; },
        get duration() { return this.rawDuration / this.speed; }
    },
    {
        id: "paso2",
        file: "./AUDIOS PASO 1-6/Paso 2.wav",
        sceneLabel: "scene3_start",
        sceneIndex: 3,
        offsetInScene: 0.4,
        rawAudioStart: 0,
        rawDuration: 130.76,
        get speed() { return AUDIO_SPEEDS.paso2; },
        get duration() { return this.rawDuration / this.speed; }
    },
    {
        id: "paso3_part1",
        file: "./AUDIOS PASO 1-6/Paso 3.wav",
        sceneLabel: "scene4_start",
        sceneIndex: 4,
        offsetInScene: 0.4,
        rawAudioStart: 0,
        rawDuration: 73.20, // Se detiene en 1:13 (73.20s) del audio original
        get speed() { return AUDIO_SPEEDS.paso3; },
        get duration() { return this.rawDuration / this.speed; }
    },
    {
        id: "paso3_part2",
        file: "./AUDIOS PASO 1-6/Paso 3.wav",
        sceneLabel: "scene4_start",
        sceneIndex: 4,
        get offsetInScene() {
            return 0.4 + (73.20 / AUDIO_SPEEDS.paso3) + 0.5;
        },
        rawAudioStart: 116.20, // Se reanuda en 1:56 (116.20s) del audio original hasta el final
        rawDuration: 17.76,    // 133.96s - 116.20s
        get speed() { return AUDIO_SPEEDS.paso3; },
        get duration() { return this.rawDuration / this.speed; }
    },
    {
        id: "paso4_e5",
        file: "./AUDIOS PASO 1-6/Paso 4.wav",
        sceneLabel: "scene5_start",
        sceneIndex: 5,
        offsetInScene: 0.4,
        rawAudioStart: 0,
        rawDuration: 64.85, // Bloque 1: Intro + Componentes A, B, C (Silencio exacto entre 64.80s y 64.88s)
        get speed() { return AUDIO_SPEEDS.paso4_e5; },
        get duration() { return this.rawDuration / this.speed; }
    },
    {
        id: "paso4_e6",
        file: "./AUDIOS PASO 1-6/Paso 4.wav",
        sceneLabel: "scene6_start",
        sceneIndex: 6,
        offsetInScene: 0.4,
        rawAudioStart: 64.88, // Bloque 2: Componentes D y E (arranca en el silencio de 64.88s; locución inicia en 64.95s)
        rawDuration: 35.43,   // 100.31s total - 64.88s
        get speed() { return AUDIO_SPEEDS.paso4_e6; },
        get duration() { return this.rawDuration / this.speed; }
    },
    {
        id: "paso5_e7",
        file: "./AUDIOS PASO 1-6/Paso 5.wav",
        sceneLabel: "scene7_start",
        sceneIndex: 7,
        offsetInScene: 0.4,
        rawAudioStart: 0,
        rawDuration: 100.95, // Bloque 1: Intro + Desviaciones A y B (Silencio exacto entre 100.88s y 101.02s)
        get speed() { return AUDIO_SPEEDS.paso5_e7; },
        get duration() { return this.rawDuration / this.speed; }
    },
    {
        id: "paso5_e8",
        file: "./AUDIOS PASO 1-6/Paso 5.wav",
        sceneLabel: "scene8_start",
        sceneIndex: 8,
        offsetInScene: 0.4,
        rawAudioStart: 100.95, // Bloque 2: Desviaciones C, D y E (arranca en pausa de 100.95s; locución inicia en 101.05s)
        rawDuration: 87.10,    // 188.05s total - 100.95s
        get speed() { return AUDIO_SPEEDS.paso5_e8; },
        get duration() { return this.rawDuration / this.speed; }
    },
    {
        id: "paso6_e9",
        file: "./AUDIOS PASO 1-6/Paso 6.wav",
        sceneLabel: "scene9_start",
        sceneIndex: 9,
        offsetInScene: 0.4,
        rawAudioStart: 0,
        rawDuration: 99.18, // Dictamen y Conclusiones completas
        get speed() { return AUDIO_SPEEDS.paso6_e9; },
        get duration() { return this.rawDuration / this.speed; }
    }
];

class VoiceoverController {
    constructor() {
        this.audio = null;
        this.currentSrc = null;
        this.currentTrackId = null;
    }

    get defaultSpeed() {
        return AUDIO_SPEEDS.paso1_1 || 1.0;
    }

    getTrackAtTime(timelineTime) {
        if (!masterTimeline) return null;
        for (const tr of VOICEOVER_TRACKS) {
            const sceneStart = masterTimeline.labels[tr.sceneLabel];
            if (sceneStart === undefined) continue;
            const start = sceneStart + tr.offsetInScene;
            const end = start + tr.duration + 0.6; // Margen de gracia para permitir terminación natural
            if (timelineTime >= start && timelineTime < end) {
                const spd = tr.speed || 1.0;
                return {
                    track: tr,
                    startTimelineTime: start,
                    endTimelineTime: end,
                    audioTime: Math.min((tr.rawAudioStart || 0) + tr.rawDuration, (tr.rawAudioStart || 0) + (timelineTime - start) * spd)
                };
            }
        }
        return null;
    }

    syncWithTimeline(timelineTime, shouldPlay = true) {
        const info = this.getTrackAtTime(timelineTime);
        if (!info) {
            this.stop();
            return;
        }

        const { track, audioTime } = info;
        const speed = track.speed || 1.0;

        if (this.audio && this.currentTrackId === track.id) {
            // Ya es el mismo archivo de audio
            if (Math.abs(this.audio.currentTime - audioTime) > 0.35) {
                try {
                    this.audio.currentTime = audioTime;
                } catch (e) {}
            }
            this.audio.playbackRate = speed;
            this.audio.defaultPlaybackRate = speed;
            this.audio.preservesPitch = true;
            if (shouldPlay) {
                if (this.audio.paused) {
                    this.audio.play().catch(() => {});
                }
            } else {
                if (!this.audio.paused) {
                    this.audio.pause();
                }
            }
        } else {
            // Cargar nuevo track
            this.stop();
            try {
                const safePath = encodeURI(track.file);
                const a = new Audio(safePath);
                a.volume = 0.95;
                a.playbackRate = speed;
                a.defaultPlaybackRate = speed;
                a.preservesPitch = true;
                this.audio = a;
                this.currentSrc = track.file;
                this.currentTrackId = track.id;

                const applySeekAndPlay = () => {
                    try {
                        if (audioTime > 0) a.currentTime = audioTime;
                    } catch (e) {}
                    if (shouldPlay) {
                        a.play().catch(err => console.warn("Voz pospuesta:", err));
                    }
                };

                if (a.readyState >= 1) {
                    applySeekAndPlay();
                } else {
                    a.addEventListener('loadedmetadata', applySeekAndPlay, { once: true });
                }
            } catch (e) {
                console.error("Error al sincronizar audio:", e);
            }
        }
    }

    play(filePath, speed = 1.0, startTime = 0, trackId = null) {
        // Si ya está reproduciéndose este mismo track cerca del tiempo solicitado, continuar
        if (this.audio && this.currentTrackId === trackId && Math.abs(this.audio.currentTime - startTime) < 0.6) {
            return;
        }
        this.stop();
        try {
            const safePath = encodeURI(filePath);
            const a = new Audio(safePath);
            a.volume = 0.95;
            a.playbackRate = speed;
            a.defaultPlaybackRate = speed;
            a.preservesPitch = true;
            this.audio = a;
            this.currentSrc = filePath;
            this.currentTrackId = trackId || (VOICEOVER_TRACKS.find(t => t.file === filePath)?.id || null);

            const applySeekAndPlay = () => {
                try {
                    if (startTime > 0) a.currentTime = startTime;
                } catch (e) {}
                a.play().catch(err => {
                    console.warn("Reproducción de voz en off pospuesta:", err);
                });
            };

            if (a.readyState >= 1) {
                applySeekAndPlay();
            } else {
                a.addEventListener('loadedmetadata', applySeekAndPlay, { once: true });
            }
        } catch (e) {
            console.error("Error al reproducir audio de voz en off:", e);
        }
    }

    pause() {
        if (this.audio && !this.audio.paused) {
            this.audio.pause();
        }
    }

    resume() {
        if (masterTimeline) {
            this.syncWithTimeline(masterTimeline.time(), true);
        } else if (this.audio && this.audio.paused) {
            this.audio.play().catch(() => {});
        }
    }

    stop() {
        if (this.audio) {
            try {
                this.audio.pause();
                this.audio.currentTime = 0;
            } catch (e) {}
            this.audio = null;
            this.currentSrc = null;
            this.currentTrackId = null;
        }
    }
}
const Voiceover = new VoiceoverController();

const SFX = {
    whoosh: () => {
        playAudioFile('./sfx/clean fast swoosh.mp3');
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.35);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.22, audioCtx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.35);
    },
    pop: () => {
        playAudioFile('./sfx/pop-6.mp3');
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(850, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(250, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.12);
    },
    slide: () => {
        playAudioFile('./sfx/Slide.mp3');
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(550, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.2);
    },
    click: () => {
        playAudioFile('./sfx/Click sound best.wav');
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.03);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.03);
    },
    ting: () => {
        playAudioFile('./sfx/TING SOUND EFFECT.mp3');
    },
    alert: () => {
        playAudioFile('./sfx/Wrong Answer.mp3');
    },
    tick: () => {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.02);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.02);
    }
};

// --- 2. MOTOR DE MÁQUINA DE ESCRIBIR PARA TÍTULOS (SFX.tick + TING AL COMPLETAR) ---
function typeHeadingText(selector, text, speed = 0.028, playTing = true) {
    const el = document.querySelector(selector);
    if (!el) return gsap.timeline();

    const content = text || el.getAttribute('data-full-text') || el.textContent.trim();
    el.setAttribute('data-full-text', content);

    const words = content.split(" ");
    let html = "";
    words.forEach((w, wIdx) => {
        html += `<span class="title-word">`;
        for (let i = 0; i < w.length; i++) {
            html += `<span class="title-char" style="opacity: 0;">${w[i]}</span>`;
        }
        html += `</span>`;
        if (wIdx < words.length - 1) {
            html += `<span class="title-space">&nbsp;</span>`;
        }
    });
    el.innerHTML = html;

    return gsap.to(`${selector} .title-char`, {
        opacity: 1,
        duration: 0.01,
        stagger: {
            each: speed,
            onStart: () => SFX.tick()
        },
        onComplete: () => {
            if (playTing) SFX.ting();
        }
    });
}

// Función para calcular desplazamiento dinámico a una fila según su posición real en pantalla
function getScrollTargetY(elementId, fallbackY, padding = 15) {
    const el = document.getElementById(elementId);
    if (!el) return fallbackY;
    const track = el.parentElement;
    if (!track) return fallbackY;

    // Viewport contenedor de la tabla
    const viewport = track.parentElement;
    const vh = viewport ? (viewport.clientHeight || viewport.offsetHeight) : 600;

    // Medición exacta de posición respecto al track contenedor
    let topPos = el.offsetTop;
    if (typeof topPos !== 'number' || topPos <= 0) {
        let sib = el.previousElementSibling;
        let sum = 0;
        while (sib) {
            sum += (sib.offsetHeight || sib.clientHeight || 75);
            sib = sib.previousElementSibling;
        }
        topPos = sum;
    }

    if (topPos >= 0) {
        let scrollY = -(Math.max(0, topPos - padding));
        const totalHeight = track.scrollHeight || track.offsetHeight;
        // Si todo el contenido cabe en el viewport, no requiere scroll
        if (totalHeight <= vh) {
            return 0;
        }
        // Si el contenido sobrepasa, limitamos para que las últimas filas queden perfectamente dentro del viewport
        const maxScroll = -(totalHeight - vh + padding);
        if (scrollY < maxScroll) {
            scrollY = maxScroll;
        }
        return scrollY;
    }
    return fallbackY;
}

// --- 3. MÓDULOS DE ESCENA (GRAMÁTICA ONETAKE: CÁMARA CONTINUA A CONTENEDORES) ---

// ==========================================
// ESCENA 1: PORTADA & MARCO GTAG S10
// ==========================================
function buildScene1(cam) {
    const tl = gsap.timeline();

    tl.call(() => setActiveSceneDOM('scene1'), null, 0)
        .call(() => SFX.whoosh(), null, 0)
        .set(cam, { scale: 1.0, x: 0, y: 0 }, 0)
        .to("#scene1", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene1 .section-tag", { y: -25, opacity: 0, duration: 0.6, ease: "back.out(1.4)" }, 0.3)
        // OneTake: Cámara hace empuje dinámico hacia el título mientras se escribe letra por letra
        .to(cam, { scale: 1.06, x: 0, y: 0, duration: 2.2, ease: "power2.out" }, 0.5)
        .add(typeHeadingText("#scene1 .title-hero", "AUDITORÍA DE INFRAESTRUCTURA Y OPERACIONES DE TI", 0.028), 0.5)
        .from("#scene1 .subtitle-hero", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, 2.0)
        // OneTake: Desplazamiento continuo hacia los metadatos institucionales centrados
        .to(cam, { scale: 1.12, x: 0, y: -30, duration: 1.5, ease: "power2.inOut" }, 2.8)
        .from("#scene1 .meta-badges .meta-badge", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.18,
            ease: "back.out(1.2)",
            onStart: () => SFX.pop()
        }, 3.0)
        // OneTake: Retorno fluido de cámara para encuadre general antes de la transición
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.4, ease: "power2.inOut" }, 5.5)
        .to("#scene1", { opacity: 0, duration: 0.6 }, "+=2.0");

    return tl;
}

// ==========================================
// ESCENA 2: PASO 1 - IDENTIFICACIÓN Y EVALUACIÓN DE RIESGOS
// ==========================================
function buildScene2(cam) {
    const tl = gsap.timeline();
    const spd1 = AUDIO_SPEEDS.paso1_1;
    const spd2 = AUDIO_SPEEDS.paso1_2;
    const dur1 = 16.84 / spd1;
    const dur2 = 117.26 / spd2;
    const tableStartTime = 0.4 + dur1 + 1.2; // Transición fluida con colchón para la locución

    tl.call(() => setActiveSceneDOM('scene2'), null, 0)
        .call(() => SFX.whoosh(), null, 0)
        .call(() => Voiceover.stop(), null, 0)
        .set(cam, { scale: 1.0, x: 0, y: 0 }, 0)
        .set("#risks-rows-track", { y: 0 }, 0)
        .set("#scene2 .scene-header-box", { opacity: 1 }, 0)
        .set("#scene2 .matrix-container", { opacity: 1, y: 0, filter: "none", pointerEvents: "auto" }, 0)
        .set("#scene2 .risk-kpi-panel", { opacity: 0, x: -60 }, 0)
        .set("#matrix-graph-panel", { opacity: 0, scale: 0.88 }, 0)
        .set("#risks-table-box", { opacity: 0, y: 40, scale: 0.98, filter: "none", pointerEvents: "none", visibility: "hidden" }, 0)
        .set("#blob-mother", { scale: 1, cx: 190, cy: 45, opacity: 1 }, 0)
        .set("#blob-filtered", { cx: 190, cy: 45, scale: 0.75, opacity: 1 }, 0)
        .set("#blob-critical", { cx: 190, cy: 45, scale: 0.75, opacity: 1 }, 0)
        .set("#blob-txt-mother", { opacity: 1, scale: 1 }, 0)
        .set("#blob-txt-filtered", { opacity: 0 }, 0)
        .set("#blob-txt-critical", { opacity: 0 }, 0)
        .to("#scene2", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene2 .section-tag", { y: -20, opacity: 0, duration: 0.5 }, 0.3)
        // Título escrito letra por letra con SFX.tick
        .add(typeHeadingText("#scene2 .title-hero", "Identificación y Valoración de Riesgos", 0.03, false), 0.4)

        // AUDIO 1: PASO 1_1.WAV AL APARECER EL TÍTULO
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 1_1.wav', spd1, 0, 'paso1_1'), null, 0.4)

        .from("#scene2 .subtitle-hero", { opacity: 0, y: 15, duration: 0.8 }, 1.8)

        // 1. PRIMER ELEMENTO: Panel de KPIs a la izquierda (aparición con desplazamiento)
        .to(cam, { scale: 1.25, x: 340, y: 70, duration: 1.3, ease: "power2.inOut" }, 2.0)
        .to("#scene2 .risk-kpi-panel", { opacity: 1, x: 0, duration: 0.8, ease: "back.out(1.2)" }, 2.0)
        .call(() => {
            const kpi = { total: 0, low: 0, high: 0 };
            gsap.to(kpi, {
                total: 32,
                low: 20,
                high: 12,
                duration: 1.2,
                ease: "power2.out",
                onUpdate: () => {
                    const elTotal = document.getElementById('kpi-total-risks');
                    const elLow = document.getElementById('kpi-filtered-risks');
                    const elHigh = document.getElementById('kpi-prioritized-risks');
                    if (elTotal) elTotal.textContent = Math.round(kpi.total);
                    if (elLow) elLow.textContent = Math.round(kpi.low);
                    if (elHigh) elHigh.textContent = Math.round(kpi.high);
                }
            });
        }, null, 2.2)
        .call(() => SFX.slide(), null, 2.2)

        // ANIMACIÓN: DESPRENDIMIENTO CELULAR LÍQUIDO (METABALL GOOEY FILTER)
        .to("#blob-mother", { scaleX: 1.45, scaleY: 0.82, duration: 0.5, ease: "power2.inOut" }, 3.5)
        .to("#blob-filtered", { cx: 90, scale: 1, duration: 0.75, ease: "power3.inOut" }, 3.7)
        .to("#blob-critical", { cx: 290, scale: 1, duration: 0.75, ease: "power3.inOut" }, 3.7)
        .to("#blob-mother", { scale: 0.35, opacity: 0, duration: 0.4, ease: "power2.in" }, 4.1)
        .to("#blob-txt-mother", { opacity: 0, scale: 0.5, duration: 0.3 }, 4.05)
        .call(() => SFX.pop(), null, 4.25)
        .to("#blob-filtered", { scale: 1.14, duration: 0.35, yoyo: true, repeat: 1, ease: "elastic.out(1.2, 0.4)" }, 4.25)
        .to("#blob-critical", { scale: 1.18, duration: 0.35, yoyo: true, repeat: 1, ease: "elastic.out(1.2, 0.4)" }, 4.25)
        .to(["#blob-txt-filtered", "#blob-txt-critical"], { opacity: 1, duration: 0.35 }, 4.3)

        // 2. SEGUNDO ELEMENTO: Matriz 5x5 a la derecha (aparición con zoom)
        .to(cam, { scale: 1.25, x: -340, y: 70, duration: 1.3, ease: "power2.inOut" }, 5.0)
        .to("#matrix-graph-panel", { opacity: 1, scale: 1.0, duration: 0.8, ease: "back.out(1.2)" }, 5.0)
        .call(() => SFX.ting(), null, 5.8)
        .to("#matrix-graph-panel .cell-high", { scale: 1.15, duration: 0.3, yoyo: true, repeat: 3, transformOrigin: "center center" }, 5.8)

        // Pausa de contemplación de la matriz: se mantiene visible hasta tableStartTime - 0.8s
        // 3. TERCER ELEMENTO: Tabla de 12 Riesgos Priorizados (reordenada por componentes)
        .to("#scene2 .matrix-container", { opacity: 0, y: -25, duration: 0.65, ease: "power2.inOut", pointerEvents: "none" }, tableStartTime - 0.8)
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 0.9, ease: "power2.inOut" }, tableStartTime - 0.8)
        .set("#risks-table-box", { visibility: "visible" }, tableStartTime - 0.25)
        .to("#risks-table-box", { opacity: 1, y: 0, scale: 1.0, duration: 0.85, ease: "power2.out", pointerEvents: "auto" }, tableStartTime - 0.2)
        .call(() => SFX.slide(), null, tableStartTime - 0.2)
        .fromTo("#risks-table-box", {
            boxShadow: "0 0 45px rgba(88, 166, 255, 0.65)"
        }, {
            boxShadow: "0 16px 45px rgba(0, 0, 0, 0.55)",
            duration: 0.9
        }, tableStartTime - 0.2)

        // AUDIO 2: PASO 1_2TABLA.WAV AL APARECER LA TABLA
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 1_2Tabla.wav', spd2, 0, 'paso1_2'), null, tableStartTime)

        // Desplazamiento progresivo continuo y cadencioso de las filas de la tabla durante toda la locución de la tabla
        .to("#risks-rows-track", {
            y: () => {
                const track = document.getElementById('risks-rows-track');
                const viewport = track ? track.parentElement : null;
                const vh = viewport ? (viewport.clientHeight || viewport.offsetHeight) : 700;
                return track && track.scrollHeight > vh ? -(track.scrollHeight - vh + 15) : -450;
            },
            duration: Math.max(10, dur2 - 4.5),
            ease: "power1.inOut"
        }, tableStartTime + 2.0)

        // Cierre fluido y natural: sin corte brusco de voz, permitiendo que la última palabra respire
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.0, ease: "power2.inOut" }, tableStartTime + dur2 + 0.3)
        .to(["#scene2 .scene-header-box", "#scene2 #risks-table-box"], {
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
        }, tableStartTime + dur2 + 0.8)
        .to("#scene2", { opacity: 0, duration: 0.8 }, tableStartTime + dur2 + 1.4);

    return tl;
}

// ==========================================
// ESCENA 3: PASO 2 - CONTROLES ESPERADOS
// ==========================================
function buildScene3(cam) {
    const tl = gsap.timeline();
    const spd = AUDIO_SPEEDS.paso2;
    const dur = 130.76 / spd;
    const at = (rawSec) => 0.4 + (rawSec / spd);

    tl.call(() => setActiveSceneDOM('scene3'), null, 0)
        .call(() => SFX.whoosh(), null, 0)
        .set(cam, { scale: 1.0, x: 0, y: 0 }, 0)
        .set("#controls-rows-track", { y: 0 }, 0)
        .set(".controls-row-item", { clearProps: "all", backgroundColor: "transparent", boxShadow: "none" }, 0)
        .to("#scene3", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene3 .section-tag", { y: -20, opacity: 0, duration: 0.5 }, 0.3)
        // Título escrito letra por letra con SFX.tick
        .add(typeHeadingText("#scene3 .title-hero", "Identificación de Controles Esperados", 0.028, false), 0.4)

        // AUDIO PASO 2: VOZ EN OFF
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 2.wav', spd, 0, 'paso2'), null, 0.4)

        .from("#scene3 .subtitle-hero", { opacity: 0, y: 15, duration: 0.8 }, 1.8)

        // OneTake: Entrada de la tabla de controles esperados con resplandor suave
        .to(cam, { scale: 1.04, x: 0, y: -20, duration: 1.6, ease: "power2.inOut" }, 2.2)
        .call(() => SFX.slide(), null, 2.4)
        .from("#controls-table-box", { opacity: 0, y: 40, duration: 0.8, ease: "power2.out" }, 2.2)

        // ==============================================================
        // COMPONENTE A: CONTROLES AMBIENTALES Y SEGURIDAD FÍSICA (R02, R20, R12)
        // ==============================================================
        .call(() => SFX.ting(), null, at(19.0))
        .to(".row-ctrl-comp-a", {
            backgroundColor: "rgba(56, 139, 253, 0.20)",
            boxShadow: "0 0 18px rgba(88, 166, 255, 0.45)",
            duration: 0.45,
            yoyo: true,
            repeat: 1
        }, at(19.0))

        // ==============================================================
        // COMPONENTE B: RESPALDO Y RECUPERACIÓN (R01, R07, R17)
        // ==============================================================
        .to(".row-ctrl-comp-a", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, at(42.5))
        .to("#controls-rows-track", {
            y: () => getScrollTargetY('row-ctrl-r01', -200, 20),
            duration: 2.2,
            ease: "power1.inOut"
        }, at(42.8))
        .call(() => SFX.slide(), null, at(43.0))
        .call(() => SFX.ting(), null, at(45.5))
        .to(".row-ctrl-comp-b", {
            backgroundColor: "rgba(210, 153, 34, 0.22)",
            boxShadow: "0 0 18px rgba(210, 153, 34, 0.45)",
            duration: 0.45,
            yoyo: true,
            repeat: 1
        }, at(45.5))

        // ==============================================================
        // COMPONENTE C: SOFTWARE, GESTIÓN DE PARCHES Y SEGURIDAD LÓGICA (R26, R27)
        // ==============================================================
        .to(".row-ctrl-comp-b", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, at(70.0))
        .to("#controls-rows-track", {
            y: () => getScrollTargetY('row-ctrl-r26', -380, 20),
            duration: 2.2,
            ease: "power1.inOut"
        }, at(70.3))
        .call(() => SFX.slide(), null, at(70.5))
        .call(() => SFX.ting(), null, at(73.0))
        .to(".row-ctrl-comp-c", {
            backgroundColor: "rgba(248, 81, 73, 0.22)",
            boxShadow: "0 0 18px rgba(248, 81, 73, 0.45)",
            duration: 0.45,
            yoyo: true,
            repeat: 1
        }, at(73.0))

        // ==============================================================
        // COMPONENTE D: REDES Y TELECOMUNICACIONES (R16)
        // ==============================================================
        .to(".row-ctrl-comp-c", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, at(92.5))
        .to("#controls-rows-track", {
            y: () => getScrollTargetY('row-ctrl-r16', -540, 20),
            duration: 2.0,
            ease: "power1.inOut"
        }, at(92.8))
        .call(() => SFX.slide(), null, at(93.0))
        .call(() => SFX.ting(), null, at(95.5))
        .to("#row-ctrl-r16", {
            backgroundColor: "rgba(57, 197, 207, 0.25)",
            boxShadow: "0 0 20px rgba(57, 197, 207, 0.5)",
            duration: 0.45,
            yoyo: true,
            repeat: 1
        }, at(95.5))

        // ==============================================================
        // COMPONENTE E: OPERACIONES DE TI Y GESTIÓN DE INCIDENTES (R09, R24, R28)
        // ==============================================================
        .to("#row-ctrl-r16", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, at(107.5))
        .to("#controls-rows-track", {
            y: () => {
                const track = document.getElementById('controls-rows-track');
                const viewport = track ? track.parentElement : null;
                const vh = viewport ? (viewport.clientHeight || viewport.offsetHeight) : 640;
                return track && track.scrollHeight > vh ? -(track.scrollHeight - vh + 15) : -450;
            },
            duration: 2.4,
            ease: "power1.inOut"
        }, at(107.8))
        .call(() => SFX.slide(), null, at(108.0))
        .call(() => SFX.ting(), null, at(110.5))
        .to(".row-ctrl-comp-e", {
            backgroundColor: "rgba(63, 185, 80, 0.22)",
            boxShadow: "0 0 18px rgba(63, 185, 80, 0.45)",
            duration: 0.45,
            yoyo: true,
            repeat: 1
        }, at(110.5))

        // ==============================================================
        // CIERRE Y RETORNO PANORÁMICO TRAS CULMINAR LA LOCUCIÓN
        // ==============================================================
        .to(".row-ctrl-comp-e", { backgroundColor: "transparent", boxShadow: "none", duration: 0.5 }, at(130.0))
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, 0.4 + dur + 0.2)
        .to("#scene3", { opacity: 0, duration: 0.6 }, 0.4 + dur + 1.0);

    return tl;
}

// ==========================================
// ESCENA 4: PASO 3 - SOLICITUD DE EVIDENCIA (E1 - E19)
// ==========================================
function buildScene4(cam) {
    const tl = gsap.timeline();
    const spd = AUDIO_SPEEDS.paso3;
    const rawPart1Dur = 73.20;    // Se detiene exactamente en 1:13 del audio original (silencio)
    const rawPart2Start = 116.20;  // Se reanuda exactamente en 1:56 del audio original
    const rawPart2Dur = 17.76;    // 133.96s - 116.20s (hasta el final)
    const part1Dur = rawPart1Dur / spd;
    const pauseDur = 0.5;
    const part2StartTime = 0.4 + part1Dur + pauseDur;
    const part2Dur = rawPart2Dur / spd;
    const totalDur = part2StartTime + part2Dur;

    // Helper maestro: Mapea cualquier segundo del audio original al tiempo exacto de animación
    const at = (rawSec) => {
        if (rawSec <= rawPart1Dur) {
            return 0.4 + (rawSec / spd);
        } else {
            return part2StartTime + (Math.max(0, rawSec - rawPart2Start) / spd);
        }
    };

    tl.call(() => setActiveSceneDOM('scene4'), null, 0)
        .call(() => SFX.whoosh(), null, 0)
        .set(cam, { scale: 1.0, x: 0, y: 0 }, 0)
        .set("#evidence-rows-grid", { y: 0 }, 0)
        .set(".evidence-row-item", { clearProps: "all", backgroundColor: "transparent", boxShadow: "none" }, 0)
        .set(".tech-pill", { scale: 1.0, borderColor: "rgba(255, 255, 255, 0.12)", boxShadow: "none" }, 0)
        .set("#evidence-scan-beam", { opacity: 0, top: "0%" }, 0)
        .to("#scene4", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene4 .section-tag", { y: -20, opacity: 0, duration: 0.5 }, 0.3)
        // Título escrito letra por letra con SFX.tick
        .add(typeHeadingText("#scene4 .title-hero", "Solicitud de Evidencias e Instrumentos", 0.026, false), 0.4)

        // AUDIO PASO 3 (PARTE 1: DESDE 0:00 HASTA 1:13 ORIGINAL)
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 3.wav', spd, 0, 'paso3_part1'), null, 0.4)

        .from("#scene4 .subtitle-hero", { opacity: 0, y: 15, duration: 0.8 }, 1.8)

        // Entrada en cascada de los 3 Pills de Técnicas (Indagación, Observación, Inspección)
        .from(".evidence-techniques-pills .tech-pill", {
            scale: 0.8,
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.16,
            ease: "back.out(1.5)",
            onStart: () => SFX.pop()
        }, 2.0)

        // Entrada de la Tabla de Evidencias
        .from("#evidence-table-box", { opacity: 0, y: 35, duration: 0.7, ease: "power2.out" }, 2.5)

        // Cascada de las filas de evidencias
        .from(".evidence-row-item", {
            y: 12,
            opacity: 0,
            duration: 0.35,
            stagger: 0.025,
            ease: "power2.out",
            clearProps: "transform"
        }, 2.7)

        // Haz Láser de Escaneo Forense que barre la tabla durante la introducción
        .call(() => SFX.slide(), null, 3.2)
        .to("#evidence-scan-beam", { opacity: 1, duration: 0.1 }, 3.2)
        .to("#evidence-scan-beam", { top: "100%", duration: 2.2, ease: "power1.inOut" }, 3.3)
        .to("#evidence-scan-beam", { opacity: 0, duration: 0.2 }, 5.5)

        // ==============================================================
        // 1. PRIMER ACTO DE LOCUCIÓN: INDAGACIÓN (E1, E5, E14, E17)
        // ==============================================================
        .to(cam, { scale: 1.05, x: 0, y: -20, duration: 1.2, ease: "power2.inOut" }, at(25.0))
        .call(() => SFX.ting(), null, at(26.5))
        .to("#pill-indagacion", {
            scale: 1.08,
            borderColor: "var(--accent-blue)",
            boxShadow: "0 0 28px rgba(88, 166, 255, 0.6)",
            duration: 0.4
        }, at(26.5))
        .to(["#row-ev-1", "#row-ev-5"], {
            backgroundColor: "rgba(88, 166, 255, 0.24)",
            boxShadow: "0 0 18px rgba(88, 166, 255, 0.45)",
            duration: 0.4
        }, at(27.0))
        // Scroll hacia E14 y E17 cuando se mencionan en la locución
        .to("#evidence-rows-grid", {
            y: () => getScrollTargetY('row-ev-14', -350, 20),
            duration: 2.2,
            ease: "power1.inOut"
        }, at(38.0))
        .call(() => SFX.slide(), null, at(38.2))
        .call(() => SFX.ting(), null, at(40.5))
        .to(["#row-ev-14", "#row-ev-17"], {
            backgroundColor: "rgba(88, 166, 255, 0.24)",
            boxShadow: "0 0 18px rgba(88, 166, 255, 0.45)",
            duration: 0.4
        }, at(40.5))

        // ==============================================================
        // 2. SEGUNDO ACTO: INSPECCIÓN DOCUMENTAL (SELECCIÓN COMPLETA DE TODAS LAS FILAS)
        // ==============================================================
        .to("#pill-indagacion", { scale: 1.0, borderColor: "rgba(255, 255, 255, 0.12)", boxShadow: "none", duration: 0.35 }, at(52.5))
        .to(["#row-ev-14", "#row-ev-17", "#row-ev-1", "#row-ev-5"], { backgroundColor: "transparent", boxShadow: "none", duration: 0.35 }, at(52.5))
        // Desplazamiento dinámico para centrar el bloque de inspección documental
        .to("#evidence-rows-grid", {
            y: () => getScrollTargetY('row-ev-2', -80, 20),
            duration: 2.0,
            ease: "power1.inOut"
        }, at(52.8))
        .call(() => SFX.slide(), null, at(53.0))
        .call(() => SFX.ting(), null, at(55.0))
        .to("#pill-inspeccion", {
            scale: 1.08,
            borderColor: "var(--accent-amber)",
            boxShadow: "0 0 28px rgba(210, 153, 34, 0.6)",
            duration: 0.4
        }, at(55.0))
        // Resalta TODAS las filas de Inspección Documental de forma simultánea y continua
        .to(".row-tech-inspeccion", {
            backgroundColor: "rgba(210, 153, 34, 0.22)",
            boxShadow: "0 0 16px rgba(210, 153, 34, 0.45)",
            duration: 0.45
        }, at(55.0))

        // ==============================================================
        // AUDIO PASO 3 (PARTE 2: REANUDA EN 1:56 ORIGINAL HASTA EL FINAL)
        // ==============================================================
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 3.wav', spd, rawPart2Start, 'paso3_part2'), null, part2StartTime)

        // ==============================================================
        // 3. TERCER ACTO: OBSERVACIÓN DIRECTA PRESENCIAL (E4, E18)
        // ==============================================================
        .to("#pill-inspeccion", { scale: 1.0, borderColor: "rgba(255, 255, 255, 0.12)", boxShadow: "none", duration: 0.35 }, part2StartTime - 0.2)
        .to(".row-tech-inspeccion", { backgroundColor: "transparent", boxShadow: "none", duration: 0.35 }, part2StartTime - 0.2)
        // Retorno hacia E4
        .to("#evidence-rows-grid", {
            y: () => getScrollTargetY('row-ev-4', -120, 20),
            duration: 1.4,
            ease: "power1.inOut"
        }, part2StartTime)
        .call(() => SFX.slide(), null, part2StartTime)
        .call(() => SFX.ting(), null, at(117.5))
        .to("#pill-observacion", {
            scale: 1.08,
            borderColor: "var(--accent-purple)",
            boxShadow: "0 0 28px rgba(188, 140, 255, 0.6)",
            duration: 0.4
        }, at(117.5))
        .to("#row-ev-4", {
            backgroundColor: "rgba(188, 140, 255, 0.26)",
            boxShadow: "0 0 20px rgba(188, 140, 255, 0.5)",
            duration: 0.45
        }, at(117.5))
        // Scroll hacia E18 cuando se menciona la inspección ocular del 1 de octubre
        .to("#evidence-rows-grid", {
            y: () => getScrollTargetY('row-ev-18', -450, 20),
            duration: 1.8,
            ease: "power1.inOut"
        }, at(121.0))
        .call(() => SFX.slide(), null, at(121.2))
        .call(() => SFX.ting(), null, at(123.0))
        .to("#row-ev-18", {
            backgroundColor: "rgba(188, 140, 255, 0.28)",
            boxShadow: "0 0 22px rgba(188, 140, 255, 0.55)",
            duration: 0.45
        }, at(123.0))

        // Cierre y retorno panorámico tras culminar la locución de Paso 3
        .to(["#row-ev-4", "#row-ev-18"], { backgroundColor: "transparent", boxShadow: "none", duration: 0.5 }, at(133.0))
        .to(".tech-pill", { scale: 1.0, borderColor: "rgba(255, 255, 255, 0.12)", boxShadow: "none", duration: 0.5 }, at(133.0))
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, totalDur + 0.2)
        .to("#scene4", { opacity: 0, duration: 0.6 }, totalDur + 1.0);

    return tl;
}

// ==============================================================
// ESCENA 5: PASO 4 (PARTE 1) - PRUEBAS DE CUMPLIMIENTO (A, B, C)
// ==============================================================
function buildScene5(cam) {
    const tl = gsap.timeline();
    const spd = AUDIO_SPEEDS.paso4_e5;
    const dur = 64.85 / spd; // Locución concluye a 64.75s, corte en silencio exacto
    const at = (rawSec) => 0.4 + (rawSec / spd);

    tl.call(() => setActiveSceneDOM('scene5'), null, 0)
        .call(() => SFX.whoosh(), null, 0)
        .set(cam, { scale: 1.0, x: 0, y: 0 }, 0)
        .set("#tests-rows-grid-5", { y: 0 }, 0)
        .set("#scene5 .test-row-item", { clearProps: "all" }, 0)
        .set("#scene5 .test-stat-card", { clearProps: "all" }, 0)
        .to("#scene5", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene5 .section-tag", { y: -20, opacity: 0, duration: 0.5 }, 0.3)
        // Título escrito letra por letra con SFX.tick
        .add(typeHeadingText("#scene5 .title-hero", "Diseño y Ejecución de Pruebas de Cumplimiento", 0.024, false), 0.4)

        // AUDIO PASO 4 (BLOQUE 1: COMPONENTES A, B, C)
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 4.wav', spd, 0, 'paso4_e5'), null, 0.4)

        .from("#scene5 .subtitle-hero", { opacity: 0, y: 15, duration: 0.8 }, 1.8)

        // Entrada de las pastillas estadísticas de resumen (3 Componentes, 6 Pruebas, Alcance)
        .from("#scene5 .test-stat-card", {
            scale: 0.85,
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.14,
            ease: "back.out(1.5)",
            onStart: () => SFX.pop()
        }, 2.0)

        // Entrada del contenedor de la tabla
        .from("#tests-table-box-5", { opacity: 0, y: 30, duration: 0.7, ease: "power2.out" }, 2.4)
        .call(() => SFX.slide(), null, 2.4)

        // Cascada de las 6 filas de pruebas
        .from("#scene5 .test-row-item", {
            y: 14,
            opacity: 0,
            duration: 0.35,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "transform"
        }, 2.6)

        // ==============================================================
        // 1. FOCO EN COMPONENTE A: SEGURIDAD FÍSICA Y CUARTO DE SERVIDORES (R02, R20, R12)
        // ==============================================================
        .to(cam, { scale: 1.05, x: 0, y: -20, duration: 1.0, ease: "power2.inOut" }, at(11.0))
        .call(() => SFX.ting(), null, at(12.0))
        .to("#scene5 .test-row-comp-a", {
            backgroundColor: "rgba(188, 140, 255, 0.22)",
            boxShadow: "0 0 22px rgba(188, 140, 255, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, at(12.0))

        // ==============================================================
        // 2. FOCO EN COMPONENTE B: RESPALDO, RECUPERACIÓN Y MEDIOS (R01, R07, R17)
        // ==============================================================
        .to("#scene5 .test-row-comp-a", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, at(26.8))
        .to("#tests-rows-grid-5", {
            y: () => getScrollTargetY('row-test-3', -160, 20),
            duration: 1.2,
            ease: "power2.inOut"
        }, at(27.0))
        .to(cam, { scale: 1.05, x: 0, y: -30, duration: 1.2, ease: "power2.inOut" }, at(27.0))
        .call(() => SFX.slide(), null, at(27.2))
        .call(() => SFX.ting(), null, at(28.5))
        .to("#scene5 .test-row-comp-b", {
            backgroundColor: "rgba(210, 153, 34, 0.22)",
            boxShadow: "0 0 22px rgba(210, 153, 34, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, at(28.5))

        // ==============================================================
        // 3. FOCO EN COMPONENTE C: SOFTWARE, PARCHES Y SEGURIDAD LÓGICA (R26, R27)
        // ==============================================================
        .to("#scene5 .test-row-comp-b", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, at(44.2))
        .to("#tests-rows-grid-5", {
            y: () => getScrollTargetY('row-test-5', -380, 20),
            duration: 1.2,
            ease: "power2.inOut"
        }, at(44.5))
        .to(cam, { scale: 1.05, x: 0, y: -25, duration: 1.2, ease: "power2.inOut" }, at(44.5))
        .call(() => SFX.slide(), null, at(44.8))
        .call(() => SFX.ting(), null, at(46.0))
        .to("#scene5 .test-row-comp-c", {
            backgroundColor: "rgba(88, 166, 255, 0.24)",
            boxShadow: "0 0 22px rgba(88, 166, 255, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, at(46.0))

        // ==============================================================
        // 4. RETORNO PANORÁMICO Y CIERRE TRAS CULMINAR EL BLOQUE 1
        // ==============================================================
        .to("#scene5 .test-row-comp-c", { backgroundColor: "transparent", boxShadow: "none", duration: 0.6 }, at(63.5))
        .to("#tests-rows-grid-5", { y: 0, duration: 1.2, ease: "power2.inOut" }, at(63.5))
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, 0.4 + dur + 0.2)
        .to("#scene5", { opacity: 0, duration: 0.6 }, 0.4 + dur + 1.0);

    return tl;
}

// ==============================================================
// ESCENA 6: PASO 4 (PARTE 2) - PRUEBAS DE CUMPLIMIENTO (D, E)
// ==============================================================
function buildScene6(cam) {
    const tl = gsap.timeline();
    const spd = AUDIO_SPEEDS.paso4_e6;
    const dur = 35.43 / spd; // Desde 64.88s hasta el final (100.31s)
    const at = (elapsedRaw) => 0.4 + (elapsedRaw / spd);

    tl.call(() => setActiveSceneDOM('scene6'), null, 0)
        .call(() => SFX.whoosh(), null, 0)
        .set(cam, { scale: 1.0, x: 0, y: 0 }, 0)
        .set("#tests-rows-grid-6", { y: 0 }, 0)
        .set("#scene6 .test-row-item", { clearProps: "all" }, 0)
        .set("#scene6 .test-stat-card", { clearProps: "all" }, 0)
        .set("#tests-table-box-6", { x: 0, opacity: 1, clearProps: "transform" }, 0)
        .to("#scene6", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene6 .section-tag", { y: -20, opacity: 0, duration: 0.5 }, 0.3)
        // Título escrito letra por letra con SFX.tick
        .add(typeHeadingText("#scene6 .title-hero", "Diseño y Ejecución de Pruebas de Cumplimiento", 0.024, false), 0.4)

        // AUDIO PASO 4 (BLOQUE 2: COMPONENTES D, E - DESDE 64.88s RAW)
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 4.wav', spd, 64.88, 'paso4_e6'), null, 0.4)

        .from("#scene6 .subtitle-hero", { opacity: 0, y: 15, duration: 0.8 }, 1.8)

        // Entrada de las pastillas estadísticas de resumen (2 Componentes, 4 Pruebas, Alcance)
        .from("#scene6 .test-stat-card", {
            scale: 0.85,
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.14,
            ease: "back.out(1.5)",
            onStart: () => SFX.pop()
        }, 2.0)

        // Entrada de la tabla de pruebas a ANCHO COMPLETO
        .from("#tests-table-box-6", { opacity: 0, y: 30, duration: 0.7, ease: "power2.out" }, 2.4)
        .call(() => SFX.slide(), null, 2.4)

        // Cascada de las 4 filas de pruebas sobre el ancho completo
        .from("#scene6 .test-row-item", {
            y: 14,
            opacity: 0,
            duration: 0.35,
            stagger: 0.06,
            ease: "power2.out",
            clearProps: "transform"
        }, 2.6)

        // ==============================================================
        // 1. FOCO EN COMPONENTE D: REDES Y TELECOMUNICACIONES (R16)
        // ==============================================================
        .to(cam, { scale: 1.05, x: 0, y: -20, duration: 1.0, ease: "power2.inOut" }, at(2.0))
        .call(() => SFX.ting(), null, at(2.5))
        .to("#scene6 .test-row-comp-d", {
            backgroundColor: "rgba(57, 197, 207, 0.25)",
            boxShadow: "0 0 22px rgba(57, 197, 207, 0.5)",
            duration: 0.4,
            ease: "power2.out"
        }, at(2.5))

        // ==============================================================
        // 2. FOCO EN COMPONENTE E: OPERACIONES TI Y MESA DE AYUDA (R09, R24, R28)
        // ==============================================================
        .to("#scene6 .test-row-comp-d", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, at(15.8))
        .to("#tests-rows-grid-6", {
            y: () => getScrollTargetY('row-test-8', -180, 20),
            duration: 1.2,
            ease: "power2.inOut"
        }, at(16.0))
        .to(cam, { scale: 1.05, x: 0, y: -30, duration: 1.2, ease: "power2.inOut" }, at(16.0))
        .call(() => SFX.slide(), null, at(16.2))
        .call(() => SFX.ting(), null, at(17.5))
        .to("#scene6 .test-row-comp-e", {
            backgroundColor: "rgba(63, 185, 80, 0.22)",
            boxShadow: "0 0 20px rgba(63, 185, 80, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, at(17.5))

        // ==============================================================
        // 3. RETORNO PANORÁMICO Y CIERRE TRAS CULMINAR EL BLOQUE 2
        // ==============================================================
        .to("#scene6 .test-row-comp-e", { backgroundColor: "transparent", boxShadow: "none", duration: 0.6 }, at(34.5))
        .to("#tests-rows-grid-6", { y: 0, duration: 1.0, ease: "power2.inOut" }, at(34.5))
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, 0.4 + dur + 0.2)
        .to("#scene6", { opacity: 0, duration: 0.6 }, 0.4 + dur + 1.0);

    return tl;
}

// ==============================================================
// ESCENA 7: PASO 5 (PARTE 1) - DETERMINACIÓN DE DESVIACIONES (A, B)
// ==============================================================
function buildScene7(cam) {
    const tl = gsap.timeline();
    const spd = AUDIO_SPEEDS.paso5_e7;
    const dur = 100.95 / spd; // Locución concluye a 100.85s, corte en silencio exacto
    const at = (rawSec) => 0.4 + (rawSec / spd);

    tl.call(() => setActiveSceneDOM('scene7'), null, 0)
        .call(() => SFX.whoosh(), null, 0)
        .set(cam, { scale: 1.0, x: 0, y: 0 }, 0)
        .set("#dev-rows-grid-7", { y: 0 }, 0)
        .set("#scene7 .deviation-row-item", { clearProps: "all" }, 0)
        .set("#scene7 .dev-stat-card", { clearProps: "all" }, 0)
        .to("#scene7", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene7 .section-tag", { y: -20, opacity: 0, duration: 0.5 }, 0.3)
        // Título escrito letra por letra con SFX.tick (sin ting en título)
        .add(typeHeadingText("#scene7 .title-hero", "Determinación de Desviaciones y Hallazgos", 0.024, false), 0.4)

        // AUDIO PASO 5 (BLOQUE 1: DESVIACIONES A Y B - FÍSICA Y RESPALDOS)
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 5.wav', spd, 0, 'paso5_e7'), null, 0.4)

        .from("#scene7 .subtitle-hero", { opacity: 0, y: 15, duration: 0.8 }, 1.8)

        // Entrada de las pastillas estadísticas de resumen (2 Componentes, 5 Hallazgos, Riesgo Muy Alto)
        .from("#scene7 .dev-stat-card", {
            scale: 0.85,
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.14,
            ease: "back.out(1.5)",
            onStart: () => SFX.pop()
        }, 2.0)

        // Entrada del contenedor de la tabla
        .from("#dev-table-box-7", { opacity: 0, y: 30, duration: 0.7, ease: "power2.out" }, 2.4)
        .call(() => SFX.slide(), null, 2.4)

        // DESDOBLAMIENTO TIPO ACORDEÓN / CARPETA DE ARCHIVO (ACCORDION UNFOLD)
        // Cada tarjeta se desdobla en 3D desde su borde superior como un expediente administrativo
        .fromTo("#scene7 .deviation-row-item", 
            {
                rotationX: -85,
                opacity: 0,
                transformOrigin: "top center",
                transformPerspective: 1200
            },
            {
                rotationX: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.14,
                ease: "back.out(1.35)",
                onStart: () => SFX.slide()
            },
            2.6
        )

        // FOCO 1: COMPONENTE A - SEGURIDAD FÍSICA Y CUARTO DE SERVIDORES (R02, R20, R12)
        .to(cam, { scale: 1.06, x: 0, y: -20, duration: 1.0, ease: "power2.inOut" }, at(14.0))
        .call(() => SFX.ting(), null, at(15.0))
        .to("#scene7 .dev-row-comp-a", {
            backgroundColor: "rgba(188, 140, 255, 0.22)",
            boxShadow: "0 0 22px rgba(188, 140, 255, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, at(15.0))

        // FOCO 2: COMPONENTE B - RESPALDO, RECUPERACIÓN Y CUSTODIA (R01, R07, R17)
        // Se atenúa Componente A para ceder el turno exclusivo a Componente B
        .to("#scene7 .dev-row-comp-a", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, at(52.5))
        // Desplazamiento sincronizado de la tabla para centrar las 3 filas del Componente B en el viewport
        .to("#dev-rows-grid-7", {
            y: () => getScrollTargetY('row-dev-3', -280, 20),
            duration: 1.2,
            ease: "power2.inOut"
        }, at(52.8))
        .to(cam, { scale: 1.06, x: 0, y: -30, duration: 1.2, ease: "power2.inOut" }, at(52.8))
        .call(() => SFX.slide(), null, at(53.0))
        .call(() => SFX.ting(), null, at(55.0))
        // Se resalta el Componente B cuando TODAS sus filas están visibles en pantalla
        .to("#scene7 .dev-row-comp-b", {
            backgroundColor: "rgba(210, 153, 34, 0.22)",
            boxShadow: "0 0 22px rgba(210, 153, 34, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, at(55.0))

        // RETORNO PANORÁMICO Y CIERRE TRAS CULMINAR EL BLOQUE 1
        .to("#scene7 .dev-row-comp-b", { backgroundColor: "transparent", boxShadow: "none", duration: 0.6 }, at(99.0))
        .to("#dev-rows-grid-7", { y: 0, duration: 1.2, ease: "power2.inOut" }, at(99.0))
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, 0.4 + dur + 0.2)
        .to("#scene7", { opacity: 0, duration: 0.6 }, 0.4 + dur + 1.0);

    return tl;
}

// ==============================================================
// ESCENA 8: PASO 5 (PARTE 2) - DETERMINACIÓN DE DESVIACIONES (C, D, E)
// ==============================================================
function buildScene8(cam) {
    const tl = gsap.timeline();
    const spd = AUDIO_SPEEDS.paso5_e8;
    const dur = 87.10 / spd; // Desde 100.95s hasta el final (188.05s)
    const at = (elapsedRaw) => 0.4 + (elapsedRaw / spd);

    tl.call(() => setActiveSceneDOM('scene8'), null, 0)
        .call(() => SFX.whoosh(), null, 0)
        .set(cam, { scale: 1.0, x: 0, y: 0 }, 0)
        .set("#dev-rows-grid-8", { y: 0 }, 0)
        .set("#scene8 .deviation-row-item", { clearProps: "all" }, 0)
        .set("#scene8 .dev-stat-card", { clearProps: "all" }, 0)
        .to("#scene8", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene8 .section-tag", { y: -20, opacity: 0, duration: 0.5 }, 0.3)
        // Título escrito letra por letra con SFX.tick (sin ting en título)
        .add(typeHeadingText("#scene8 .title-hero", "Determinación de Desviaciones y Hallazgos", 0.024, false), 0.4)

        // AUDIO PASO 5 (BLOQUE 2: DESVIACIONES C, D, E - DESDE 100.95s RAW)
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 5.wav', spd, 100.95, 'paso5_e8'), null, 0.4)

        .from("#scene8 .subtitle-hero", { opacity: 0, y: 15, duration: 0.8 }, 1.8)

        // Entrada de las pastillas estadísticas de resumen (3 Componentes, 6 Hallazgos, Alta Vulnerabilidad)
        .from("#scene8 .dev-stat-card", {
            scale: 0.85,
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.14,
            ease: "back.out(1.5)",
            onStart: () => SFX.pop()
        }, 2.0)

        // Entrada del contenedor de la tabla
        .from("#dev-table-box-8", { opacity: 0, y: 30, duration: 0.7, ease: "power2.out" }, 2.4)
        .call(() => SFX.slide(), null, 2.4)

        // DESDOBLAMIENTO TIPO ACORDEÓN / CARPETA DE ARCHIVO (ACCORDION UNFOLD)
        // Cada tarjeta se desdobla en 3D desde su borde superior como un expediente administrativo
        .fromTo("#scene8 .deviation-row-item", 
            {
                rotationX: -85,
                opacity: 0,
                transformOrigin: "top center",
                transformPerspective: 1200
            },
            {
                rotationX: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.14,
                ease: "back.out(1.35)",
                onStart: () => SFX.slide()
            },
            2.6
        )

        // FOCO 1: COMPONENTE C - SOFTWARE, PARCHES Y SEGURIDAD LÓGICA (R26, R27)
        .to(cam, { scale: 1.05, x: 0, y: -20, duration: 1.0, ease: "power2.inOut" }, at(2.0))
        .call(() => SFX.ting(), null, at(2.5))
        .to("#scene8 .dev-row-comp-c", {
            backgroundColor: "rgba(88, 166, 255, 0.24)",
            boxShadow: "0 0 22px rgba(88, 166, 255, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, at(2.5))

        // FOCO 2: COMPONENTE D - REDES Y TELECOMUNICACIONES (R16)
        .to("#scene8 .dev-row-comp-c", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, at(25.8))
        .to("#dev-rows-grid-8", {
            y: () => getScrollTargetY('row-dev-8', -220, 20),
            duration: 1.2,
            ease: "power2.inOut"
        }, at(26.0))
        .to(cam, { scale: 1.05, x: 0, y: -30, duration: 1.2, ease: "power2.inOut" }, at(26.0))
        .call(() => SFX.slide(), null, at(26.2))
        .call(() => SFX.ting(), null, at(27.5))
        .to("#scene8 .dev-row-comp-d", {
            backgroundColor: "rgba(248, 81, 73, 0.22)",
            boxShadow: "0 0 22px rgba(248, 81, 73, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, at(27.5))

        // FOCO 3: COMPONENTE E - OPERACIONES TI, CAÍDAS SGF Y DEPENDENCIA HUMANA (R09, R24, R28)
        .to("#scene8 .dev-row-comp-d", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, at(52.8))
        .to("#dev-rows-grid-8", {
            y: () => getScrollTargetY('row-dev-9', -380, 20),
            duration: 1.2,
            ease: "power2.inOut"
        }, at(53.0))
        .to(cam, { scale: 1.05, x: 0, y: -25, duration: 1.2, ease: "power2.inOut" }, at(53.0))
        .call(() => SFX.slide(), null, at(53.2))
        .call(() => SFX.ting(), null, at(54.5))
        .to("#scene8 .dev-row-comp-e", {
            backgroundColor: "rgba(57, 197, 207, 0.24)",
            boxShadow: "0 0 22px rgba(57, 197, 207, 0.45)",
            duration: 0.4,
            stagger: 0.12,
            ease: "power2.out"
        }, at(54.5))

        // RETORNO PANORÁMICO Y CIERRE TRAS CULMINAR EL BLOQUE 2
        .to("#scene8 .dev-row-comp-e", { backgroundColor: "transparent", boxShadow: "none", duration: 0.6 }, at(85.5))
        .to("#dev-rows-grid-8", { y: 0, duration: 1.2, ease: "power2.inOut" }, at(85.5))
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, 0.4 + dur + 0.2)
        .to("#scene8", { opacity: 0, duration: 0.6 }, 0.4 + dur + 1.0);

    return tl;
}

// Actualiza tarjeta activa en carrusel 3D de Escena 9
function setConcl3DCard(index) {
    for (let i = 0; i < 3; i++) {
        const card = document.getElementById(`concl-3d-card-${i}`);
        const dot = document.getElementById(`concl-dot-${i}`);
        if (card) {
            card.classList.toggle('is-active', i === index);
        }
        if (dot) {
            dot.classList.toggle('active', i === index);
        }
    }
}

// ==============================================================
// ESCENA 9: CONCLUSIONES, DICTAMEN DE AUDITORÍA Y APERTURA ELÁSTICA
// ==============================================================
function buildScene9(cam) {
    const tl = gsap.timeline();
    const spd = AUDIO_SPEEDS.paso6_e9;
    const dur = 99.18 / spd;
    const at = (rawSec) => 0.4 + (rawSec / spd);

    tl.call(() => setActiveSceneDOM('scene9'), null, 0)
        .call(() => SFX.whoosh(), null, 0)
        .call(() => setConcl3DCard(0), null, 0)
        .set(cam, { scale: 1.0, x: 0, y: 0 }, 0)
        // Reset inicial explícito para garantizar efecto de aparición limpio sin parpadeos
        .set("#scene9", { opacity: 0 }, 0)
        .set("#dictum-hero-box", { opacity: 0, y: -25, scale: 0.94 }, 0)
        .set("#concl-elastic-viewport", { opacity: 0, y: 35 }, 0)
        .set("#concl-3d-dots", { opacity: 0, y: 15 }, 0)
        // Las tres tarjetas nacen unidas en el centro exacto (x: 513 y -513 para coincidir con Card 1)
        .set("#concl-3d-card-0", { x: 513, scale: 0.94, opacity: 0, zIndex: 5 }, 0)
        .set("#concl-3d-card-1", { x: 0, scale: 0.94, opacity: 0, zIndex: 10 }, 0)
        .set("#concl-3d-card-2", { x: -513, scale: 0.94, opacity: 0, zIndex: 5 }, 0)
        .set(["#ligament-left", "#ligament-right"], { opacity: 0, strokeWidth: 14 }, 0)

        // 1. Aparición del Escenario y Encabezado
        .to("#scene9", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene9 .section-tag", { y: -20, opacity: 0, duration: 0.5, ease: "power2.out" }, 0.25)
        .add(typeHeadingText("#scene9 .title-hero", "Conclusiones y Dictamen de Control Interno", 0.024, false), 0.35)

        // AUDIO PASO 6: CONCLUSIONES Y DICTAMEN DE AUDITORÍA
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 6.wav', spd, 0, 'paso6_e9'), null, 0.4)

        .from("#scene9 .subtitle-hero", { opacity: 0, y: 15, duration: 0.8, ease: "power2.out" }, 1.5)

        // 2. Efecto de Aparición del Dictamen Global (DEFICIENTE)
        .to("#dictum-hero-box", {
            opacity: 1,
            y: 0,
            scale: 1.0,
            duration: 0.7,
            ease: "back.out(1.4)"
        }, 1.8)
        .call(() => SFX.slide(), null, 1.8)

        // 3. APARICIÓN DE LA MASA MONOLÍTICA CENTRAL (Los 3 expedientes unidos en el centro)
        .to("#concl-elastic-viewport", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 2.3)
        .to(["#concl-3d-card-0", "#concl-3d-card-1", "#concl-3d-card-2"], { opacity: 1, duration: 0.6 }, 2.3)
        .to("#concl-3d-dots", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 2.5)
        .call(() => SFX.slide(), null, 2.3)

        // 4. APERTURA DE EXPEDIENTES POR TENSIÓN ELÁSTICA
        .call(() => SFX.whoosh(), null, 2.9)
        // Estiramiento de cuellos conectivos adhesivos (tether ligaments)
        .to(["#ligament-left", "#ligament-right"], { opacity: 0.85, strokeWidth: 12, duration: 0.2 }, 2.9)
        .to("#ligament-left", { strokeWidth: 3, duration: 0.7, ease: "power2.inOut" }, 3.0)
        .to("#ligament-right", { strokeWidth: 3, duration: 0.7, ease: "power2.inOut" }, 3.0)

        // Separación física elástica: Card 0 a la izquierda, Card 2 a la derecha, con rebote de inercia
        .to("#concl-3d-card-0", {
            x: 0,
            scale: 1.0,
            duration: 0.95,
            ease: "elastic.out(1.15, 0.45)"
        }, 2.9)
        .to("#concl-3d-card-1", {
            scale: 1.0,
            duration: 0.5,
            ease: "power2.out"
        }, 2.9)
        .to("#concl-3d-card-2", {
            x: 0,
            scale: 1.0,
            duration: 0.95,
            ease: "elastic.out(1.15, 0.45)"
        }, 2.9)

        // Ruptura elástica suave (SNAP): los cuellos adhesivos se sueltan suavemente al llegar a destino
        .call(() => SFX.pop(), null, 3.65)
        .to(["#ligament-left", "#ligament-right"], { opacity: 0, strokeWidth: 0, duration: 0.3 }, 3.65)

        // 5. FOCO EN EJE I - GOBERNANZA Y OPERACIONES TI
        .call(() => setConcl3DCard(0), null, at(23.5))
        .call(() => SFX.ting(), null, at(23.5))
        .to("#concl-3d-card-0", { scale: 1.04, opacity: 1.0, zIndex: 20, duration: 0.4, ease: "power2.out" }, at(23.5))
        .to(["#concl-3d-card-1", "#concl-3d-card-2"], { scale: 0.98, opacity: 0.65, zIndex: 5, duration: 0.4 }, at(23.5))

        // 6. FOCO EN EJE II - SEGURIDAD FÍSICA Y CENTRO DE CÓMPUTO
        .call(() => setConcl3DCard(1), null, at(46.0))
        .call(() => SFX.ting(), null, at(46.0))
        .to("#concl-3d-card-1", { scale: 1.04, opacity: 1.0, zIndex: 20, duration: 0.4, ease: "power2.out" }, at(46.0))
        .to(["#concl-3d-card-0", "#concl-3d-card-2"], { scale: 0.98, opacity: 0.65, zIndex: 5, duration: 0.4 }, at(46.0))

        // 7. FOCO EN EJE III - RESPALDO Y SEGURIDAD LÓGICA
        .call(() => setConcl3DCard(2), null, at(68.5))
        .call(() => SFX.ting(), null, at(68.5))
        .to("#concl-3d-card-2", { scale: 1.04, opacity: 1.0, zIndex: 20, duration: 0.4, ease: "power2.out" }, at(68.5))
        .to(["#concl-3d-card-0", "#concl-3d-card-1"], { scale: 0.98, opacity: 0.65, zIndex: 5, duration: 0.4 }, at(68.5))

        // 8. VEREDICTO FINAL UNIFICADO: Las 3 conclusiones brillan al 100% como módulos consolidados
        .call(() => {
            for (let i = 0; i < 3; i++) {
                document.getElementById(`concl-3d-card-${i}`)?.classList.add('is-active');
                document.getElementById(`concl-dot-${i}`)?.classList.add('active');
            }
        }, null, at(90.0))
        .call(() => SFX.ting(), null, at(90.0))
        .to(["#concl-3d-card-0", "#concl-3d-card-1", "#concl-3d-card-2"], {
            scale: 1.0,
            opacity: 1.0,
            zIndex: 10,
            duration: 0.6,
            ease: "power2.out"
        }, at(90.0))
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.4, ease: "power2.inOut" }, at(90.5))
        // Al culminar, la escena se mantiene fija y visible sin fundir a negro para lectura final
        .to("#scene9", { opacity: 1, duration: 2.0 }, 0.4 + dur);

    return tl;
}

// --- 4. CONTROLADOR MAESTRO DE LÍNEA DE TIEMPO (MASTER TIMELINE) ---
let masterTimeline = null;
let currentSceneIndex = 1;
let isLoopingScene = false;
const sceneLabels = ["scene1_start", "scene2_start", "scene3_start", "scene4_start", "scene5_start", "scene6_start", "scene7_start", "scene8_start", "scene9_start"];

function initMasterTimeline() {
    const cam = document.getElementById('camera-rig');

    masterTimeline = gsap.timeline({
        paused: true,
        onUpdate: updateScrubberUI,
        onComplete: () => {
            Voiceover.stop();
            if (isLoopingScene) {
                jumpToScene(currentSceneIndex);
            } else {
                // Al finalizar todo el video, queda varado/fijo en la última escena (sin regresar a la Escena 1)
                masterTimeline.pause();
                const icon = document.getElementById('play-icon');
                if (icon) icon.textContent = '▶';
            }
        }
    });

    // Ensamblaje Modular de las 9 Escenas
    masterTimeline.addLabel("scene1_start")
        .add(buildScene1(cam))
        .add(runWipeTransition(), "-=0.4")
        .addLabel("scene2_start")
        .add(buildScene2(cam))
        .add(runWipeTransition(), "-=0.4")
        .addLabel("scene3_start")
        .add(buildScene3(cam))
        .add(runWipeTransition(), "-=0.4")
        .addLabel("scene4_start")
        .add(buildScene4(cam))
        .add(runWipeTransition(), "-=0.4")
        .addLabel("scene5_start")
        .add(buildScene5(cam))
        .add(runWipeTransition(), "-=0.4")
        .addLabel("scene6_start")
        .add(buildScene6(cam))
        .add(runWipeTransition(), "-=0.4")
        .addLabel("scene7_start")
        .add(buildScene7(cam))
        .add(runWipeTransition(), "-=0.4")
        .addLabel("scene8_start")
        .add(buildScene8(cam))
        .add(runWipeTransition(), "-=0.4")
        .addLabel("scene9_start")
        .add(buildScene9(cam));
}

// Transición Wipe colorida entre Escena 1 y Escena 2
function runWipeTransition() {
    const tl = gsap.timeline();
    const wipe = document.getElementById('wipe-path');

    tl.call(() => SFX.whoosh(), null, 0)
        .fromTo(wipe,
            { strokeDashoffset: 45000 },
            { strokeDashoffset: 0, duration: 0.55, ease: "power2.in" },
            0
        )
        .to(wipe,
            { strokeDashoffset: -45000, duration: 0.55, ease: "power2.out" },
            0.55
        );

    return tl;
}

// Manejador del DOM para visibilidad de escenas
function setActiveSceneDOM(sceneId, stopAudio = true) {
    if (stopAudio) Voiceover.stop();
    document.querySelectorAll('.scene').forEach(sc => {
        sc.classList.remove('active-scene');
        sc.style.opacity = '0';
        sc.style.visibility = 'hidden';
    });

    const active = document.getElementById(sceneId);
    if (active) {
        active.classList.add('active-scene');
        active.style.visibility = 'visible';
    }

    const num = parseInt(sceneId.replace('scene', ''));
    currentSceneIndex = num;

    document.querySelectorAll('.scene-btn').forEach((btn, idx) => {
        btn.classList.toggle('current', idx === (num - 1));
    });
}

// Actualización del Scrubber y Tiempo
function updateScrubberUI() {
    if (!masterTimeline) return;
    const progress = masterTimeline.progress();
    const slider = document.getElementById('scrubber-slider');
    if (slider) slider.value = progress;

    const currentSecs = masterTimeline.time();
    const totalSecs = masterTimeline.duration();
    const timeDisp = document.getElementById('time-display');
    if (timeDisp) {
        timeDisp.textContent = `${formatTime(currentSecs)} / ${formatTime(totalSecs)}`;
    }

    // Actualizar dinámicamente la escena visual activa según la posición del cursor de tiempo
    let activeIndex = 1;
    for (let i = sceneLabels.length - 1; i >= 0; i--) {
        const lblTime = masterTimeline.labels[sceneLabels[i]];
        if (lblTime !== undefined && currentSecs >= lblTime - 0.08) {
            activeIndex = i + 1;
            break;
        }
    }
    if (activeIndex !== currentSceneIndex) {
        currentSceneIndex = activeIndex;
        document.querySelectorAll('.scene').forEach(sc => {
            sc.classList.remove('active-scene');
            sc.style.opacity = '0';
            sc.style.visibility = 'hidden';
        });
        const activeEl = document.getElementById(`scene${activeIndex}`);
        if (activeEl) {
            activeEl.classList.add('active-scene');
            activeEl.style.visibility = 'visible';
            activeEl.style.opacity = '1';
        }
        document.querySelectorAll('.scene-btn').forEach((btn, idx) => {
            btn.classList.toggle('current', idx === (activeIndex - 1));
        });
    }

    // BUCLE DE LA ESCENA ACTUAL (Repetir automáticamente al terminar la escena en curso)
    if (isLoopingScene && !masterTimeline.paused()) {
        const nextLabel = sceneLabels[currentSceneIndex]; // currentSceneIndex es 1..9 (1-based)
        if (nextLabel && masterTimeline.labels[nextLabel] !== undefined) {
            const nextTime = masterTimeline.labels[nextLabel];
            // Repite justo antes de la transición Wipe a la siguiente escena
            if (currentSecs >= nextTime - 0.45) {
                jumpToScene(currentSceneIndex);
                return;
            }
        } else if (currentSceneIndex === 9) {
            if (currentSecs >= totalSecs - 0.25) {
                jumpToScene(9);
                return;
            }
        }
    }
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// --- 5. INTERFAZ DE USUARIO Y EVENTOS DE REPRODUCCIÓN ---

// Scrubber Slider: Restablece y sincroniza el audio instantáneamente hacia donde se desplaza la barra
const scrubber = document.getElementById('scrubber-slider');
if (scrubber) {
    scrubber.addEventListener('input', (e) => {
        if (!masterTimeline) initMasterTimeline();
        const progress = parseFloat(e.target.value);
        const targetTime = progress * masterTimeline.duration();
        masterTimeline.seek(targetTime);
        Voiceover.syncWithTimeline(targetTime, !masterTimeline.paused());
    });
}

// Salto directo a Escena (1 a 9) con sincronización de audio inmediata
window.jumpToScene = function (sceneNumber) {
    initAudioSystem();
    if (!masterTimeline) initMasterTimeline();

    const label = sceneLabels[sceneNumber - 1];
    if (label && masterTimeline.labels[label] !== undefined) {
        const targetTime = masterTimeline.labels[label];
        masterTimeline.pause();
        masterTimeline.seek(targetTime);
        setActiveSceneDOM(`scene${sceneNumber}`, false);
        masterTimeline.play();
        const icon = document.getElementById('play-icon');
        if (icon) icon.textContent = '⏸';
        Voiceover.syncWithTimeline(targetTime, true);
    }
};

// Arranque maestro tras interacción inicial (Oculta controles para vista limpia 1080p)
window.startMasterPlayback = function () {
    document.getElementById("start-overlay").style.display = "none";
    initAudioSystem();
    if (!masterTimeline) initMasterTimeline();

    // Controles ocultos automáticamente al iniciar
    const dock = document.getElementById('playback-dock');
    const showBtn = document.getElementById('btn-show-dock');
    if (dock) dock.style.display = 'none';
    if (showBtn) showBtn.style.display = 'flex';

    masterTimeline.play();
    Voiceover.syncWithTimeline(masterTimeline.time(), true);
};

// Botón Play / Pausa
document.getElementById('btn-play-pause').addEventListener('click', () => {
    initAudioSystem();
    if (!masterTimeline) initMasterTimeline();

    const icon = document.getElementById('play-icon');
    if (masterTimeline.paused()) {
        masterTimeline.play();
        Voiceover.resume();
        if (icon) icon.textContent = '⏸';
    } else {
        masterTimeline.pause();
        Voiceover.pause();
        if (icon) icon.textContent = '▶';
    }
});

// Función para alternar visibilidad del dock (Mostrar / Ocultar controles)
function toggleDockVisibility() {
    const dock = document.getElementById('playback-dock');
    const showBtn = document.getElementById('btn-show-dock');
    if (!dock) return;

    const isHidden = dock.style.display === 'none';
    if (isHidden) {
        dock.style.display = 'flex';
        if (showBtn) showBtn.style.display = 'none';
    } else {
        dock.style.display = 'none';
        if (showBtn) showBtn.style.display = 'flex';
    }
}

// Botones Mostrar y Ocultar Dock
document.getElementById('btn-hide-dock')?.addEventListener('click', toggleDockVisibility);
document.getElementById('btn-show-dock')?.addEventListener('click', toggleDockVisibility);

// Botón Bucle de Escena Actual
const loopBtn = document.getElementById('btn-loop-scene');
if (loopBtn) {
    loopBtn.addEventListener('click', () => {
        isLoopingScene = !isLoopingScene;
        loopBtn.textContent = isLoopingScene ? '🔁 ON' : '🔁 OFF';
        loopBtn.style.borderColor = isLoopingScene ? 'var(--accent-emerald)' : 'var(--border-color)';
        loopBtn.style.color = isLoopingScene ? 'var(--accent-emerald)' : 'var(--text-primary)';
        loopBtn.title = isLoopingScene ? 'Bucle activado para la escena actual (Clic para desactivar)' : 'Repetir escena actual en bucle';
    });
}

// --- 6. ATAJOS DE TECLADO PARA NAVEGACIÓN Y RENDER ---
window.addEventListener('keydown', (e) => {
    // Evitar si el foco está en un input
    if (e.target.tagName === 'INPUT') return;

    if (e.code === 'Space') {
        e.preventDefault();
        document.getElementById('btn-play-pause').click();
    } else if (e.key === '1') {
        jumpToScene(1);
    } else if (e.key === '2') {
        jumpToScene(2);
    } else if (e.key === '3') {
        jumpToScene(3);
    } else if (e.key === '4') {
        jumpToScene(4);
    } else if (e.key === '5') {
        jumpToScene(5);
    } else if (e.key === '6') {
        jumpToScene(6);
    } else if (e.key === '7') {
        jumpToScene(7);
    } else if (e.key === '8') {
        jumpToScene(8);
    } else if (e.key === '9') {
        jumpToScene(9);
    } else if (e.key === 'h' || e.key === 'H') {
        toggleDockVisibility();
    } else if (e.key === 'l' || e.key === 'L') {
        const lBtn = document.getElementById('btn-loop-scene');
        if (lBtn) lBtn.click();
    } else if (e.code === 'ArrowLeft') {
        if (masterTimeline) {
            const targetTime = Math.max(0, masterTimeline.time() - 2);
            masterTimeline.seek(targetTime);
            Voiceover.syncWithTimeline(targetTime, !masterTimeline.paused());
        }
    } else if (e.code === 'ArrowRight') {
        if (masterTimeline) {
            const targetTime = Math.min(masterTimeline.duration(), masterTimeline.time() + 2);
            masterTimeline.seek(targetTime);
            Voiceover.syncWithTimeline(targetTime, !masterTimeline.paused());
        }
    }
});

// --- 7. ESCALADO RESPONSIVO PERFECTO AL VIEWPORT ---
function resizeVideoCanvas() {
    const container = document.getElementById('container');
    if (!container) return;
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    container.style.transform = `scale(${scale})`;
}
window.addEventListener('resize', resizeVideoCanvas);
resizeVideoCanvas();
