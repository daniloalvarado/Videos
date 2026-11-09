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

// --- SISTEMA MAESTRO DE VOZ EN OFF (VOICEOVER CONTROLLER) ---
const VOICEOVER_TRACKS = [
    {
        id: "paso1_1",
        file: "./AUDIOS PASO 1-6/Paso 1_1.wav",
        sceneLabel: "scene2_start",
        sceneIndex: 2,
        offsetInScene: 0.4,
        speed: 1.14,
        duration: 16.84 / 1.14 // ~14.77s
    },
    {
        id: "paso1_2",
        file: "./AUDIOS PASO 1-6/Paso 1_2Tabla.wav",
        sceneLabel: "scene2_start",
        sceneIndex: 2,
        offsetInScene: 15.8,
        speed: 1.14,
        duration: 117.26 / 1.14 // ~102.86s
    },
    {
        id: "paso2",
        file: "./AUDIOS PASO 1-6/Paso 2.wav",
        sceneLabel: "scene3_start",
        sceneIndex: 3,
        offsetInScene: 0.4,
        speed: 1.14,
        duration: 130.76 / 1.14 // ~114.70s
    },
    {
        id: "paso3",
        file: "./AUDIOS PASO 1-6/Paso 3.wav",
        sceneLabel: "scene4_start",
        sceneIndex: 4,
        offsetInScene: 0.4,
        speed: 1.14,
        duration: 133.96 / 1.14 // ~117.51s
    }
];

class VoiceoverController {
    constructor() {
        this.audio = null;
        this.currentSrc = null;
        this.currentTrackId = null;
        this.defaultSpeed = 1.14; // Velocidad ligeramente acelerada (+14%) como solicitó el usuario
    }

    getTrackAtTime(timelineTime) {
        if (!masterTimeline) return null;
        for (const tr of VOICEOVER_TRACKS) {
            const sceneStart = masterTimeline.labels[tr.sceneLabel];
            if (sceneStart === undefined) continue;
            const start = sceneStart + tr.offsetInScene;
            const end = start + tr.duration;
            if (timelineTime >= start && timelineTime < end) {
                return {
                    track: tr,
                    startTimelineTime: start,
                    endTimelineTime: end,
                    audioTime: (timelineTime - start) * (tr.speed || this.defaultSpeed)
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
        const speed = track.speed || this.defaultSpeed;

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

    play(filePath, speed = 1.14, startTime = 0) {
        // Si ya está reproduciéndose este mismo archivo cerca del tiempo solicitado, continuar
        if (this.audio && this.currentSrc === filePath && Math.abs(this.audio.currentTime - startTime) < 0.6) {
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
            if (startTime > 0) {
                a.currentTime = startTime;
            }
            this.audio = a;
            this.currentSrc = filePath;
            const matching = VOICEOVER_TRACKS.find(t => t.file === filePath);
            if (matching) this.currentTrackId = matching.id;

            a.play().catch(err => {
                console.warn("Reproducción de voz en off pospuesta:", err);
            });
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

// Función auxiliar para actualizar el estado del Carrusel 3D (tarjeta activa y dot indicador)
function set3DCarouselCard(index) {
    for (let i = 0; i < 4; i++) {
        const card = document.getElementById(`c3d-card-${i}`);
        const dot = document.getElementById(`c3d-dot-${i}`);
        if (card) {
            if (i === index) card.classList.add('is-active');
            else card.classList.remove('is-active');
        }
        if (dot) {
            if (i === index) dot.classList.add('active');
            else dot.classList.remove('active');
        }
    }
}

// ==========================================
// ESCENA 2: PASO 1 - IDENTIFICACIÓN Y EVALUACIÓN DE RIESGOS
// ==========================================
function buildScene2(cam) {
    const tl = gsap.timeline();

    tl.call(() => setActiveSceneDOM('scene2'), null, 0)
        .call(() => SFX.whoosh(), null, 0)
        .call(() => Voiceover.stop(), null, 0)
        .set(cam, { scale: 1.0, x: 0, y: 0 }, 0)
        .set("#risks-rows-track", { y: 0 }, 0)
        .set("#scene2 .scene-header-box", { opacity: 1 }, 0)
        .set("#scene2 .matrix-container", { opacity: 1, y: 0, filter: "none", pointerEvents: "auto" }, 0)
        .set("#scene2 .risk-kpi-panel", { opacity: 0, x: -60 }, 0)
        .set("#matrix-graph-panel", { opacity: 0, scale: 0.88 }, 0)
        .set("#risks-table-box", { opacity: 0, y: 40, scale: 0.98, filter: "none", pointerEvents: "none" }, 0)
        .set("#risk-carousel-3d-overlay", { opacity: 0, visibility: "hidden", scale: 0.85 }, 0)
        .set("#carousel-ring", { rotationY: 0 }, 0)
        .set("#blob-mother", { scale: 1, cx: 190, cy: 45, opacity: 1 }, 0)
        .set("#blob-filtered", { cx: 190, cy: 45, scale: 0.75, opacity: 1 }, 0)
        .set("#blob-critical", { cx: 190, cy: 45, scale: 0.75, opacity: 1 }, 0)
        .set("#blob-txt-mother", { opacity: 1, scale: 1 }, 0)
        .set("#blob-txt-filtered", { opacity: 0 }, 0)
        .set("#blob-txt-critical", { opacity: 0 }, 0)
        .call(() => set3DCarouselCard(0), null, 0)
        .to("#scene2", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene2 .section-tag", { y: -20, opacity: 0, duration: 0.5 }, 0.3)
        // Título escrito letra por letra con SFX.tick
        .add(typeHeadingText("#scene2 .title-hero", "Identificación y Valoración de Riesgos", 0.03, false), 0.4)

        // AUDIO 1: PASO 1_1.WAV AL APARECER EL TÍTULO (con velocidad acelerada a 1.14x)
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 1_1.wav', 1.14), null, 0.4)

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
        // Pausa intencional para permitir ver la masa madre de 32 riesgos asentada y los contadores
        // Comienza el estiramiento viscoso tras la pausa
        .to("#blob-mother", { scaleX: 1.45, scaleY: 0.82, duration: 0.5, ease: "power2.inOut" }, 3.5)
        // Separación elástica con puente viscoso conectivo
        .to("#blob-filtered", { cx: 90, scale: 1, duration: 0.75, ease: "power3.inOut" }, 3.7)
        .to("#blob-critical", { cx: 290, scale: 1, duration: 0.75, ease: "power3.inOut" }, 3.7)
        .to("#blob-mother", { scale: 0.35, opacity: 0, duration: 0.4, ease: "power2.in" }, 4.1)
        .to("#blob-txt-mother", { opacity: 0, scale: 0.5, duration: 0.3 }, 4.05)
        // Snap elástico con pop sonoro sincronizado
        .call(() => SFX.pop(), null, 4.25)
        .to("#blob-filtered", { scale: 1.14, duration: 0.35, yoyo: true, repeat: 1, ease: "elastic.out(1.2, 0.4)" }, 4.25)
        .to("#blob-critical", { scale: 1.18, duration: 0.35, yoyo: true, repeat: 1, ease: "elastic.out(1.2, 0.4)" }, 4.25)
        .to(["#blob-txt-filtered", "#blob-txt-critical"], { opacity: 1, duration: 0.35 }, 4.3)

        // 2. SEGUNDO ELEMENTO: Matriz 5x5 a la derecha (aparición con zoom y permanencia mientras se completa la locución inicial)
        .to(cam, { scale: 1.25, x: -340, y: 70, duration: 1.3, ease: "power2.inOut" }, 5.0)
        .to("#matrix-graph-panel", { opacity: 1, scale: 1.0, duration: 0.8, ease: "back.out(1.2)" }, 5.0)
        .call(() => SFX.ting(), null, 5.8)
        .to("#matrix-graph-panel .cell-high", { scale: 1.15, duration: 0.3, yoyo: true, repeat: 3, transformOrigin: "center center" }, 5.8)

        // Pausa de contemplación de la matriz: se mantiene visible y en foco hasta los 15.0s (duración de Paso 1_1.wav acelerado)
        // 3. TERCER ELEMENTO: Tabla de 12 Riesgos Priorizados (aparición a altura completa ampliada de 700px)
        // Desvanecemos la matriz tras la locución inicial y centramos la cámara
        .to("#scene2 .matrix-container", { opacity: 0, y: -25, duration: 0.65, ease: "power2.inOut", pointerEvents: "none" }, 15.0)
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 0.9, ease: "power2.inOut" }, 15.0)
        .to("#risks-table-box", { opacity: 1, y: 0, scale: 1.0, duration: 0.85, ease: "power2.out", pointerEvents: "auto" }, 15.6)
        .call(() => SFX.slide(), null, 15.6)
        .fromTo("#risks-table-box", {
            boxShadow: "0 0 45px rgba(88, 166, 255, 0.65)"
        }, {
            boxShadow: "0 16px 45px rgba(0, 0, 0, 0.55)",
            duration: 0.9
        }, 15.6)

        // AUDIO 2: PASO 1_2TABLA.WAV AL APARECER LA TABLA (duración a 1.14x es ~102.8s)
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 1_2Tabla.wav', 1.14), null, 15.8)

        // Desplazamiento progresivo continuo y cadencioso de las filas de la tabla durante toda la locución de la tabla
        .to("#risks-rows-track", {
            y: () => {
                const track = document.getElementById('risks-rows-track');
                const viewport = track ? track.parentElement : null;
                const vh = viewport ? (viewport.clientHeight || viewport.offsetHeight) : 700;
                return track && track.scrollHeight > vh ? -(track.scrollHeight - vh + 15) : -450;
            },
            duration: 98.0,
            ease: "power1.inOut"
        }, 18.0)

        // ========================================================
        // DESPUÉS DEL TERCERO: CARRUSEL 3D POR ARRIBA DE LOS DEMÁS
        // ========================================================
        // Retorno de cámara al centro y desvanecimiento de la tabla y encabezados de fondo tras culminar la locución de la tabla
        .call(() => Voiceover.stop(), null, 118.8)
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.0, ease: "power2.inOut" }, 119.0)
        .to(["#scene2 .scene-header-box", "#scene2 .matrix-container", "#scene2 #risks-table-box"], {
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
        }, 119.0)

        // Entrada del Carrusel 3D con su encabezado elevado e independiente
        .to("#risk-carousel-3d-overlay", {
            visibility: "visible",
            opacity: 1,
            scale: 1.0,
            duration: 0.9,
            ease: "back.out(1.2)"
        }, 119.8)
        .call(() => SFX.whoosh(), null, 119.8)
        .call(() => { set3DCarouselCard(0); SFX.ting(); }, null, 120.5)

        // Rotación a Card 1 (Bases de Datos Fiscales: R01, R07, R17)
        .to("#carousel-ring", { rotationY: -90, duration: 0.9, ease: "power2.inOut" }, 124.0)
        .call(() => { set3DCarouselCard(1); SFX.ting(); }, null, 124.9)

        // Rotación a Card 2 (Endpoints y Antivirus: R26, R27)
        .to("#carousel-ring", { rotationY: -180, duration: 0.9, ease: "power2.inOut" }, 128.0)
        .call(() => { set3DCarouselCard(2); SFX.ting(); }, null, 128.9)

        // Rotación a Card 3 (Mesa de Ayuda y SGF: R09, R24, R28) - Última tarjeta, sin volver a la primera
        .to("#carousel-ring", { rotationY: -270, duration: 0.9, ease: "power2.inOut" }, 132.0)
        .call(() => { set3DCarouselCard(3); SFX.ting(); }, null, 132.9)

        // Se mantiene fija en la última tarjeta (Card 3: Mesa de Ayuda) para apreciarla sin rotar al inicio
        .to(cam, { scale: 1.04, duration: 2.5, ease: "power1.out" }, 133.5)

        // Cierre fluido de la Escena 2
        .to("#scene2", { opacity: 0, duration: 0.8 }, 136.5);

    return tl;
}

// ==========================================
// ESCENA 3: PASO 2 - CONTROLES ESPERADOS
// ==========================================
function buildScene3(cam) {
    const tl = gsap.timeline();

    tl.call(() => setActiveSceneDOM('scene3'), null, 0)
        .call(() => SFX.whoosh(), null, 0)
        .set(cam, { scale: 1.0, x: 0, y: 0 }, 0)
        .set("#controls-rows-track", { y: 0 }, 0)
        .set(".controls-row-item", { clearProps: "all", backgroundColor: "transparent", boxShadow: "none" }, 0)
        .to("#scene3", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene3 .section-tag", { y: -20, opacity: 0, duration: 0.5 }, 0.3)
        // Título escrito letra por letra con SFX.tick
        .add(typeHeadingText("#scene3 .title-hero", "Identificación de Controles Esperados", 0.028, false), 0.4)

        // AUDIO PASO 2: VOZ EN OFF ACELERADA A 1.14x (duración neta: 114.70s)
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 2.wav', 1.14), null, 0.4)

        .from("#scene3 .subtitle-hero", { opacity: 0, y: 15, duration: 0.8 }, 1.8)

        // OneTake: Entrada de la tabla de controles esperados con resplandor suave
        .to(cam, { scale: 1.04, x: 0, y: -20, duration: 1.6, ease: "power2.inOut" }, 2.2)
        .call(() => SFX.slide(), null, 2.4)
        .from("#controls-table-box", { opacity: 0, y: 40, duration: 0.8, ease: "power2.out" }, 2.2)

        // ==============================================================
        // COMPONENTE A: CONTROLES AMBIENTALES Y SEGURIDAD FÍSICA (R02, R20, R12)
        // Narración: 16.5s a 38.0s
        // ==============================================================
        .call(() => SFX.ting(), null, 16.8)
        .to(".row-ctrl-comp-a", {
            backgroundColor: "rgba(56, 139, 253, 0.20)",
            boxShadow: "0 0 18px rgba(88, 166, 255, 0.45)",
            duration: 0.45,
            yoyo: true,
            repeat: 1
        }, 16.8)

        // ==============================================================
        // COMPONENTE B: RESPALDO Y RECUPERACIÓN (R01, R07, R17)
        // Narración: 38.0s a 62.0s
        // ==============================================================
        .to(".row-ctrl-comp-a", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, 37.5)
        .to("#controls-rows-track", {
            y: () => getScrollTargetY('row-ctrl-r01', -200, 20),
            duration: 2.2,
            ease: "power1.inOut"
        }, 37.8)
        .call(() => SFX.slide(), null, 38.0)
        .call(() => SFX.ting(), null, 40.2)
        .to(".row-ctrl-comp-b", {
            backgroundColor: "rgba(210, 153, 34, 0.22)",
            boxShadow: "0 0 18px rgba(210, 153, 34, 0.45)",
            duration: 0.45,
            yoyo: true,
            repeat: 1
        }, 40.2)

        // ==============================================================
        // COMPONENTE C: SOFTWARE, GESTIÓN DE PARCHES Y SEGURIDAD LÓGICA (R26, R27)
        // Narración: 62.0s a 82.0s
        // ==============================================================
        .to(".row-ctrl-comp-b", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, 61.5)
        .to("#controls-rows-track", {
            y: () => getScrollTargetY('row-ctrl-r26', -380, 20),
            duration: 2.2,
            ease: "power1.inOut"
        }, 61.8)
        .call(() => SFX.slide(), null, 62.0)
        .call(() => SFX.ting(), null, 64.2)
        .to(".row-ctrl-comp-c", {
            backgroundColor: "rgba(248, 81, 73, 0.22)",
            boxShadow: "0 0 18px rgba(248, 81, 73, 0.45)",
            duration: 0.45,
            yoyo: true,
            repeat: 1
        }, 64.2)

        // ==============================================================
        // COMPONENTE D: REDES Y TELECOMUNICACIONES (R16)
        // Narración: 82.0s a 95.0s
        // ==============================================================
        .to(".row-ctrl-comp-c", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, 81.5)
        .to("#controls-rows-track", {
            y: () => getScrollTargetY('row-ctrl-r16', -540, 20),
            duration: 2.0,
            ease: "power1.inOut"
        }, 81.8)
        .call(() => SFX.slide(), null, 82.0)
        .call(() => SFX.ting(), null, 84.0)
        .to("#row-ctrl-r16", {
            backgroundColor: "rgba(57, 197, 207, 0.25)",
            boxShadow: "0 0 20px rgba(57, 197, 207, 0.5)",
            duration: 0.45,
            yoyo: true,
            repeat: 1
        }, 84.0)

        // ==============================================================
        // COMPONENTE E: OPERACIONES DE TI Y GESTIÓN DE INCIDENTES (R09, R24, R28)
        // Narración: 95.0s a 114.7s
        // ==============================================================
        .to("#row-ctrl-r16", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, 94.5)
        .to("#controls-rows-track", {
            y: () => {
                const track = document.getElementById('controls-rows-track');
                const viewport = track ? track.parentElement : null;
                const vh = viewport ? (viewport.clientHeight || viewport.offsetHeight) : 640;
                return track && track.scrollHeight > vh ? -(track.scrollHeight - vh + 15) : -450;
            },
            duration: 2.4,
            ease: "power1.inOut"
        }, 94.8)
        .call(() => SFX.slide(), null, 95.0)
        .call(() => SFX.ting(), null, 97.2)
        .to(".row-ctrl-comp-e", {
            backgroundColor: "rgba(63, 185, 80, 0.22)",
            boxShadow: "0 0 18px rgba(63, 185, 80, 0.45)",
            duration: 0.45,
            yoyo: true,
            repeat: 1
        }, 97.2)

        // ==============================================================
        // CIERRE Y RETORNO PANORÁMICO TRAS CULMINAR LA LOCUCIÓN (~115.1s)
        // ==============================================================
        .to(".row-ctrl-comp-e", { backgroundColor: "transparent", boxShadow: "none", duration: 0.5 }, 114.5)
        .call(() => Voiceover.stop(), null, 115.2)
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.4, ease: "power2.inOut" }, 115.0)
        .to("#scene3", { opacity: 0, duration: 0.6 }, 116.6);

    return tl;
}

// ==========================================
// ESCENA 4: PASO 3 - SOLICITUD DE EVIDENCIA (E1 - E19)
// ==========================================
function buildScene4(cam) {
    const tl = gsap.timeline();

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

        // AUDIO PASO 3: VOZ EN OFF ACELERADA A 1.14x (duración neta: 117.51s)
        .call(() => Voiceover.play('./AUDIOS PASO 1-6/Paso 3.wav', 1.14), null, 0.4)

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
        // Narración: 23.5s a 47.0s
        // ==============================================================
        .to(cam, { scale: 1.05, x: 0, y: -20, duration: 1.2, ease: "power2.inOut" }, 22.8)
        .call(() => SFX.ting(), null, 23.8)
        .to("#pill-indagacion", {
            scale: 1.08,
            borderColor: "var(--accent-blue)",
            boxShadow: "0 0 28px rgba(88, 166, 255, 0.6)",
            duration: 0.4
        }, 23.8)
        .to(["#row-ev-1", "#row-ev-5"], {
            backgroundColor: "rgba(88, 166, 255, 0.24)",
            boxShadow: "0 0 18px rgba(88, 166, 255, 0.45)",
            duration: 0.4,
            yoyo: true,
            repeat: 1
        }, 24.2)
        // Scroll hacia E14 y E17 cuando se mencionan en la locución
        .to("#evidence-rows-grid", {
            y: () => getScrollTargetY('row-ev-14', -350, 20),
            duration: 2.2,
            ease: "power1.inOut"
        }, 34.0)
        .call(() => SFX.slide(), null, 34.2)
        .call(() => SFX.ting(), null, 36.4)
        .to(["#row-ev-14", "#row-ev-17"], {
            backgroundColor: "rgba(88, 166, 255, 0.24)",
            boxShadow: "0 0 18px rgba(88, 166, 255, 0.45)",
            duration: 0.4,
            yoyo: true,
            repeat: 1
        }, 36.4)

        // ==============================================================
        // 2. SEGUNDO ACTO: INSPECCIÓN DOCUMENTAL - GESTIÓN INTERNA (E2, E8, E3, E6, E7, E9, E19)
        // Narración: 47.0s a 76.0s
        // ==============================================================
        .to("#pill-indagacion", { scale: 1.0, borderColor: "rgba(255, 255, 255, 0.12)", boxShadow: "none", duration: 0.35 }, 46.5)
        .to(["#row-ev-14", "#row-ev-17", "#row-ev-1", "#row-ev-5"], { backgroundColor: "transparent", boxShadow: "none", duration: 0.35 }, 46.5)
        // Desplazamiento dinámico para centrar el bloque de gestión interna
        .to("#evidence-rows-grid", {
            y: () => getScrollTargetY('row-ev-2', -80, 20),
            duration: 2.0,
            ease: "power1.inOut"
        }, 46.8)
        .call(() => SFX.slide(), null, 47.0)
        .call(() => SFX.ting(), null, 49.0)
        .to("#pill-inspeccion", {
            scale: 1.08,
            borderColor: "var(--accent-amber)",
            boxShadow: "0 0 28px rgba(210, 153, 34, 0.6)",
            duration: 0.4
        }, 49.0)
        .to(["#row-ev-2", "#row-ev-3", "#row-ev-6", "#row-ev-7", "#row-ev-8", "#row-ev-9"], {
            backgroundColor: "rgba(210, 153, 34, 0.22)",
            boxShadow: "0 0 16px rgba(210, 153, 34, 0.45)",
            duration: 0.4,
            yoyo: true,
            repeat: 1
        }, 49.0)

        // ==============================================================
        // 3. TERCER ACTO: INSPECCIÓN DOCUMENTAL - MARCO LEGAL OBLIGATORIO (E10, E11, E12, E13)
        // Narración: 76.0s a 96.0s
        // ==============================================================
        .to("#evidence-rows-grid", {
            y: () => getScrollTargetY('row-ev-10', -300, 20),
            duration: 2.2,
            ease: "power1.inOut"
        }, 75.8)
        .call(() => SFX.slide(), null, 76.0)
        .call(() => SFX.ting(), null, 78.2)
        .to(["#row-ev-10", "#row-ev-11", "#row-ev-12", "#row-ev-13"], {
            backgroundColor: "rgba(210, 153, 34, 0.26)",
            boxShadow: "0 0 18px rgba(210, 153, 34, 0.5)",
            duration: 0.45,
            yoyo: true,
            repeat: 1
        }, 78.2)

        // ==============================================================
        // 4. CUARTO ACTO: OBSERVACIÓN DIRECTA PRESENCIAL (E4, E18)
        // Narración: 96.0s a 117.5s
        // ==============================================================
        .to("#pill-inspeccion", { scale: 1.0, borderColor: "rgba(255, 255, 255, 0.12)", boxShadow: "none", duration: 0.35 }, 95.8)
        .to("#scene4 .row-tech-inspeccion", { backgroundColor: "transparent", boxShadow: "none", duration: 0.35 }, 95.8)
        // Retorno hacia E4
        .to("#evidence-rows-grid", {
            y: () => getScrollTargetY('row-ev-4', -120, 20),
            duration: 2.0,
            ease: "power1.inOut"
        }, 96.2)
        .call(() => SFX.slide(), null, 96.4)
        .call(() => SFX.ting(), null, 98.4)
        .to("#pill-observacion", {
            scale: 1.08,
            borderColor: "var(--accent-purple)",
            boxShadow: "0 0 28px rgba(188, 140, 255, 0.6)",
            duration: 0.4
        }, 98.4)
        .to("#row-ev-4", {
            backgroundColor: "rgba(188, 140, 255, 0.26)",
            boxShadow: "0 0 20px rgba(188, 140, 255, 0.5)",
            duration: 0.45,
            yoyo: true,
            repeat: 1
        }, 98.4)
        // Scroll hacia E18 cuando se menciona la inspección ocular del 1 de octubre
        .to("#evidence-rows-grid", {
            y: () => getScrollTargetY('row-ev-18', -450, 20),
            duration: 2.2,
            ease: "power1.inOut"
        }, 107.0)
        .call(() => SFX.slide(), null, 107.2)
        .call(() => SFX.ting(), null, 109.4)
        .to("#row-ev-18", {
            backgroundColor: "rgba(188, 140, 255, 0.28)",
            boxShadow: "0 0 22px rgba(188, 140, 255, 0.55)",
            duration: 0.45,
            yoyo: true,
            repeat: 1
        }, 109.4)

        // ==============================================================
        // CIERRE Y RETORNO PANORÁMICO TRAS CULMINAR LA LOCUCIÓN (~117.9s)
        // ==============================================================
        .to(["#row-ev-4", "#row-ev-18"], { backgroundColor: "transparent", boxShadow: "none", duration: 0.5 }, 117.2)
        .to(".tech-pill", { scale: 1.0, borderColor: "rgba(255, 255, 255, 0.12)", boxShadow: "none", duration: 0.5 }, 117.2)
        .call(() => Voiceover.stop(), null, 118.0)
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.4, ease: "power2.inOut" }, 117.8)
        .to("#scene4", { opacity: 0, duration: 0.6 }, 119.4);

    return tl;
}

// ==============================================================
// ESCENA 5: PASO 4 (PARTE 1) - PRUEBAS DE CUMPLIMIENTO (A, B, C)
// ==============================================================
function buildScene5(cam) {
    const tl = gsap.timeline();

    tl.call(() => setActiveSceneDOM('scene5'), null, 0)
        .call(() => SFX.whoosh(), null, 0)
        .set(cam, { scale: 1.0, x: 0, y: 0 }, 0)
        .set("#tests-rows-grid-5", { y: 0 }, 0)
        .set("#scene5 .test-row-item", { clearProps: "all" }, 0)
        .set("#scene5 .test-stat-card", { clearProps: "all" }, 0)
        .to("#scene5", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene5 .section-tag", { y: -20, opacity: 0, duration: 0.5 }, 0.3)
        // Título escrito letra por letra con SFX.tick (sin ting en título)
        .add(typeHeadingText("#scene5 .title-hero", "Diseño y Ejecución de Pruebas de Cumplimiento", 0.024, false), 0.4)
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

        // Cascada de las 6 filas de pruebas (alineación estrictamente recta y uniforme)
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
        // La cámara se desplaza y encuadra primero con suavidad
        .to(cam, { scale: 1.08, x: 0, y: -20, duration: 0.8, ease: "power2.inOut" }, 3.6)
        // Justo al asentarse la cámara (4.4s), suena el ting y resalta el Componente A
        .call(() => SFX.ting(), null, 4.4)
        .to("#scene5 .test-row-comp-a", {
            backgroundColor: "rgba(188, 140, 255, 0.22)",
            boxShadow: "0 0 22px rgba(188, 140, 255, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, 4.4)

        // ==============================================================
        // 2. FOCO EN COMPONENTE B: RESPALDO, RECUPERACIÓN Y MEDIOS (R01, R07, R17)
        // ==============================================================
        // Se atenúa Componente A para ceder el turno a Componente B
        .to("#scene5 .test-row-comp-a", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, 7.2)
        // Desplazamiento dinámico sincronizado para centrar Componente B
        .to("#tests-rows-grid-5", {
            y: () => getScrollTargetY('row-test-3', -160, 20),
            duration: 0.8,
            ease: "power2.inOut"
        }, 7.2)
        .to(cam, { scale: 1.08, x: 0, y: -35, duration: 0.8, ease: "power2.inOut" }, 7.2)
        // Al asentarse el scroll y la cámara (8.0s), suena el ting y resalta el Componente B
        .call(() => SFX.ting(), null, 8.0)
        .to("#scene5 .test-row-comp-b", {
            backgroundColor: "rgba(210, 153, 34, 0.22)",
            boxShadow: "0 0 22px rgba(210, 153, 34, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, 8.0)

        // ==============================================================
        // 3. FOCO EN COMPONENTE C: SOFTWARE, PARCHES Y SEGURIDAD LÓGICA (R26, R27)
        // ==============================================================
        // Se atenúa Componente B para ceder el turno a Componente C
        .to("#scene5 .test-row-comp-b", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, 10.8)
        // Desplazamiento sincronizado dinámico para centrar Componente C en el viewport
        .to("#tests-rows-grid-5", {
            y: () => getScrollTargetY('row-test-5', -380, 20),
            duration: 0.9,
            ease: "power2.inOut"
        }, 10.8)
        .to(cam, { scale: 1.08, x: 0, y: -30, duration: 0.9, ease: "power2.inOut" }, 10.8)
        // Al asentarse el scroll y la cámara (11.7s), suena el ting y resalta el Componente C
        .call(() => SFX.ting(), null, 11.7)
        .to("#scene5 .test-row-comp-c", {
            backgroundColor: "rgba(88, 166, 255, 0.24)",
            boxShadow: "0 0 22px rgba(88, 166, 255, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, 11.7)

        // ==============================================================
        // 4. RETORNO PANORÁMICO Y CIERRE
        // ==============================================================
        .to("#scene5 .test-row-comp-c", { backgroundColor: "transparent", boxShadow: "none", duration: 0.6 }, 14.8)
        .to("#tests-rows-grid-5", { y: 0, duration: 1.2, ease: "power2.inOut" }, 14.8)
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, 14.8)
        .to("#scene5", { opacity: 0, duration: 0.6 }, 16.8);

    return tl;
}

// ==============================================================
// ESCENA 6: PASO 4 (PARTE 2) - PRUEBAS DE CUMPLIMIENTO (D, E)
// ==============================================================
function buildScene6(cam) {
    const tl = gsap.timeline();

    tl.call(() => setActiveSceneDOM('scene6'), null, 0)
        .call(() => SFX.whoosh(), null, 0)
        .set(cam, { scale: 1.0, x: 0, y: 0 }, 0)
        .set("#tests-rows-grid-6", { y: 0 }, 0)
        .set("#scene6 .test-row-item", { clearProps: "all" }, 0)
        .set("#scene6 .test-stat-card", { clearProps: "all" }, 0)
        .set("#tests-table-box-6", { x: 0, opacity: 1, clearProps: "transform" }, 0)
        .set("#network-topology-hud", { x: 1600, opacity: 0 }, 0)
        .set(["#halo-requena", "#halo-requena-2", "#halo-datem", "#halo-datem-2", "#halo-sgf", "#halo-sgf-2"], {
            attr: { r: 14 },
            opacity: 0,
            strokeWidth: 2.5
        }, 0)
        .to("#scene6", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene6 .section-tag", { y: -20, opacity: 0, duration: 0.5 }, 0.3)
        // Título escrito letra por letra con SFX.tick (sin ting en título)
        .add(typeHeadingText("#scene6 .title-hero", "Diseño y Ejecución de Pruebas de Cumplimiento", 0.024, false), 0.4)
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

        // 1. LA TABLA ENTRA A ANCHO COMPLETO (100% Full Width inicial)
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

        // Permanencia y lectura de la tabla de pruebas (demora intencional para lectura completa)
        .to(cam, { scale: 1.03, x: 0, y: -15, duration: 1.8, ease: "power1.out" }, 3.2)

        // 2. DESPLAZAMIENTO TOTAL: TRAS LA LECTURA, LA TOPOLOGÍA DE RED DESPLAZA POR COMPLETO A LA TABLA Y OCUPA SU LUGAR
        .call(() => SFX.whoosh(), null, 7.2)
        .to("#tests-table-box-6", {
            x: -1600,
            opacity: 0,
            duration: 0.85,
            ease: "power3.inOut"
        }, 7.2)
        .to("#network-topology-hud", {
            x: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.inOut"
        }, 7.2)

        // FOCO 1: COMPONENTE D - REDES Y TELECOMUNICACIONES (R16 - Enlaces de Sedes Caídos)
        .to(cam, { scale: 1.02, x: 0, y: -10, duration: 0.8, ease: "power2.inOut" }, 7.8)
        .call(() => SFX.ting(), null, 8.5)
        // DISPARO DE TELEMETRÍA EN VIVO: ALERTA R16 EN LA TOPOLOGÍA DE RED
        .call(() => {
            const statusPill = document.getElementById('hud-live-status');
            if (statusPill) {
                statusPill.textContent = 'ALERTA R16 • CAÍDA DE ENLACES';
                statusPill.classList.add('alert-mode');
            }
            const cReq = document.getElementById('cable-requena');
            const cDat = document.getElementById('cable-datem');
            if (cReq) cReq.classList.add('cable-danger');
            if (cDat) cDat.classList.add('cable-danger');
            const sReq = document.getElementById('stat-requena');
            const sDat = document.getElementById('stat-datem');
            if (sReq) { sReq.textContent = '480ms • CAÍDA INTERMITENTE'; sReq.style.fill = '#ff8b85'; }
            if (sDat) { sDat.textContent = '520ms • PÉRDIDA PAQUETES 24%'; sDat.style.fill = '#ff8b85'; }
            const dBul = document.getElementById('diag-bullet');
            const dTit = document.getElementById('diag-title');
            const dDesc = document.getElementById('diag-desc');
            if (dBul) dBul.style.color = '#f85149';
            if (dTit) { dTit.textContent = 'Riesgo Crítico R16 Identificado'; dTit.style.color = '#ff8b85'; }
            if (dDesc) dDesc.textContent = 'Falta de enlaces redundantes y nulo monitoreo proactivo hacia fiscalías provinciales.';
        }, null, 8.5)
        // HALOS CONCÉNTRICOS ALERTA R16 (CENTRADO EXACTO EN EL NODO ORIGEN)
        .fromTo(["#halo-requena", "#halo-datem"],
            { attr: { r: 14 }, opacity: 1, strokeWidth: 2.5 },
            { attr: { r: 44 }, opacity: 0, strokeWidth: 0.5, duration: 0.85, repeat: 3, ease: "power1.out" },
            8.5
        )
        .fromTo(["#halo-requena-2", "#halo-datem-2"],
            { attr: { r: 14 }, opacity: 0.7, strokeWidth: 2 },
            { attr: { r: 44 }, opacity: 0, strokeWidth: 0.5, duration: 0.85, repeat: 3, ease: "power1.out" },
            8.8
        )

        // FOCO 2: COMPONENTE E - OPERACIONES DE TI Y MESA DE AYUDA (R09 Mesa de Ayuda, R24 Caídas SGF, R28 Suplencia)
        .to(cam, { scale: 1.02, x: 0, y: -15, duration: 0.8, ease: "power2.inOut" }, 12.6)
        .call(() => SFX.ting(), null, 13.4)
        // ACTUALIZACIÓN DE TOPOLOGÍA: MESA DE AYUDA Y SGF
        .call(() => {
            const statusPill = document.getElementById('hud-live-status');
            if (statusPill) {
                statusPill.textContent = 'COMPONENTE E • OPERACIONES & SGF';
                statusPill.classList.remove('alert-mode');
                statusPill.style.borderColor = 'var(--accent-blue)';
                statusPill.style.color = 'var(--accent-blue)';
                statusPill.style.background = 'rgba(88, 166, 255, 0.18)';
            }
            const cReq = document.getElementById('cable-requena');
            const cDat = document.getElementById('cable-datem');
            if (cReq) cReq.classList.remove('cable-danger');
            if (cDat) cDat.classList.remove('cable-danger');
            const dBul = document.getElementById('diag-bullet');
            const dTit = document.getElementById('diag-title');
            const dDesc = document.getElementById('diag-desc');
            if (dBul) dBul.style.color = 'var(--accent-blue)';
            if (dTit) { dTit.textContent = 'Operaciones TI y Mesa de Ayuda'; dTit.style.color = '#ffffff'; }
            if (dDesc) dDesc.textContent = 'Carencia de catálogo de servicios, sin medición de tiempos ni pruebas de continuidad.';
        }, null, 13.4)
        // HALOS CONCÉNTRICOS MESA DE AYUDA (CENTRADO EXACTO EN EL NODO ORIGEN)
        .fromTo("#halo-sgf",
            { attr: { r: 13 }, opacity: 1, strokeWidth: 2.5 },
            { attr: { r: 40 }, opacity: 0, strokeWidth: 0.5, duration: 0.85, repeat: 3, ease: "power1.out" },
            13.4
        )
        .fromTo("#halo-sgf-2",
            { attr: { r: 13 }, opacity: 0.7, strokeWidth: 2 },
            { attr: { r: 40 }, opacity: 0, strokeWidth: 0.5, duration: 0.85, repeat: 3, ease: "power1.out" },
            13.7
        )

        // Retorno panorámico y fade out
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, 17.5)
        .to("#scene6", { opacity: 0, duration: 0.6 }, 19.5);

    return tl;
}

// ==============================================================
// ESCENA 7: PASO 5 (PARTE 1) - DETERMINACIÓN DE DESVIACIONES (A, B)
// ==============================================================
function buildScene7(cam) {
    const tl = gsap.timeline();

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
        .to(cam, { scale: 1.08, x: 0, y: -20, duration: 0.8, ease: "power2.inOut" }, 3.6)
        .call(() => SFX.ting(), null, 4.4)
        .to("#scene7 .dev-row-comp-a", {
            backgroundColor: "rgba(188, 140, 255, 0.22)",
            boxShadow: "0 0 22px rgba(188, 140, 255, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, 4.4)

        // FOCO 2: COMPONENTE B - RESPALDO, RECUPERACIÓN Y CUSTODIA (R01, R07, R17)
        // Se atenúa Componente A para ceder el turno exclusivo a Componente B
        .to("#scene7 .dev-row-comp-a", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, 7.5)
        // Desplazamiento sincronizado de la tabla para centrar las 3 filas del Componente B en el viewport
        .to("#dev-rows-grid-7", {
            y: () => getScrollTargetY('row-dev-3', -300, 20),
            duration: 0.8,
            ease: "power2.inOut"
        }, 7.5)
        .to(cam, { scale: 1.08, x: 0, y: -35, duration: 0.8, ease: "power2.inOut" }, 7.5)
        .call(() => SFX.ting(), null, 8.3)
        // Se resalta el Componente B cuando TODAS sus filas están visibles en pantalla
        .to("#scene7 .dev-row-comp-b", {
            backgroundColor: "rgba(210, 153, 34, 0.22)",
            boxShadow: "0 0 22px rgba(210, 153, 34, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, 8.3)

        // Retorno panorámico y fade out (Componente B se desvanece suavemente durante el retorno)
        .to("#scene7 .dev-row-comp-b", { backgroundColor: "transparent", boxShadow: "none", duration: 0.6 }, 12.0)
        .to("#dev-rows-grid-7", { y: 0, duration: 1.2, ease: "power2.inOut" }, 12.0)
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, 12.0)
        .to("#scene7", { opacity: 0, duration: 0.6 }, 14.0);

    return tl;
}

// ==============================================================
// ESCENA 8: PASO 5 (PARTE 2) - DETERMINACIÓN DE DESVIACIONES (C, D, E)
// ==============================================================
function buildScene8(cam) {
    const tl = gsap.timeline();

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
        .to(cam, { scale: 1.08, x: 0, y: -20, duration: 0.8, ease: "power2.inOut" }, 3.6)
        .call(() => SFX.ting(), null, 4.4)
        .to("#scene8 .dev-row-comp-c", {
            backgroundColor: "rgba(88, 166, 255, 0.24)",
            boxShadow: "0 0 22px rgba(88, 166, 255, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, 4.4)

        // FOCO 2: COMPONENTE D - REDES Y TELECOMUNICACIONES (R16)
        // Se atenúa Componente C al cambiar el turno
        .to("#scene8 .dev-row-comp-c", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, 7.0)
        .to(cam, { scale: 1.08, x: 0, y: -38, duration: 0.8, ease: "power2.inOut" }, 7.0)
        .call(() => SFX.ting(), null, 7.8)
        .to("#scene8 .dev-row-comp-d", {
            backgroundColor: "rgba(248, 81, 73, 0.22)",
            boxShadow: "0 0 22px rgba(248, 81, 73, 0.45)",
            duration: 0.4,
            ease: "power2.out"
        }, 7.8)

        // FOCO 3: COMPONENTE E - OPERACIONES TI, CAÍDAS SGF Y DEPENDENCIA HUMANA (R09, R24, R28)
        // Se atenúa Componente D para ceder el turno exclusivo a Componente E
        .to("#scene8 .dev-row-comp-d", { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, 10.4)
        // Desplazamiento dinámico sincronizado para centrar las 3 filas del Componente E en el viewport
        .to("#dev-rows-grid-8", {
            y: () => getScrollTargetY('row-dev-9', -380, 20),
            duration: 0.9,
            ease: "power2.inOut"
        }, 10.4)
        .to(cam, { scale: 1.08, x: 0, y: -30, duration: 0.9, ease: "power2.inOut" }, 10.4)
        .call(() => SFX.ting(), null, 11.3)
        // Se resalta el Componente E cuando TODAS sus 3 filas están plenamente visibles en el viewport
        .to("#scene8 .dev-row-comp-e", {
            backgroundColor: "rgba(57, 197, 207, 0.24)",
            boxShadow: "0 0 22px rgba(57, 197, 207, 0.45)",
            duration: 0.4,
            stagger: 0.12,
            ease: "power2.out"
        }, 11.3)

        // Retorno panorámico y fade out (Componente E se desvanece suavemente durante el retorno)
        .to("#scene8 .dev-row-comp-e", { backgroundColor: "transparent", boxShadow: "none", duration: 0.6 }, 14.8)
        .to("#dev-rows-grid-8", { y: 0, duration: 1.2, ease: "power2.inOut" }, 14.8)
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, 14.8)
        .to("#scene8", { opacity: 0, duration: 0.6 }, 16.8);

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
        .call(() => setConcl3DCard(0), null, 3.9)
        .call(() => SFX.ting(), null, 3.9)
        .to("#concl-3d-card-0", { scale: 1.04, opacity: 1.0, zIndex: 20, duration: 0.4, ease: "power2.out" }, 3.9)
        .to(["#concl-3d-card-1", "#concl-3d-card-2"], { scale: 0.98, opacity: 0.65, zIndex: 5, duration: 0.4 }, 3.9)

        // 6. FOCO EN EJE II - SEGURIDAD FÍSICA Y CENTRO DE CÓMPUTO
        .call(() => setConcl3DCard(1), null, 8.0)
        .call(() => SFX.ting(), null, 8.0)
        .to("#concl-3d-card-1", { scale: 1.04, opacity: 1.0, zIndex: 20, duration: 0.4, ease: "power2.out" }, 8.0)
        .to(["#concl-3d-card-0", "#concl-3d-card-2"], { scale: 0.98, opacity: 0.65, zIndex: 5, duration: 0.4 }, 8.0)

        // 7. FOCO EN EJE III - RESPALDO Y SEGURIDAD LÓGICA
        .call(() => setConcl3DCard(2), null, 12.5)
        .call(() => SFX.ting(), null, 12.5)
        .to("#concl-3d-card-2", { scale: 1.04, opacity: 1.0, zIndex: 20, duration: 0.4, ease: "power2.out" }, 12.5)
        .to(["#concl-3d-card-0", "#concl-3d-card-1"], { scale: 0.98, opacity: 0.65, zIndex: 5, duration: 0.4 }, 12.5)

        // 8. VEREDICTO FINAL UNIFICADO: Las 3 conclusiones brillan al 100% como módulos independientes consolidados
        .call(() => {
            for (let i = 0; i < 3; i++) {
                document.getElementById(`concl-3d-card-${i}`)?.classList.add('is-active');
                document.getElementById(`concl-dot-${i}`)?.classList.add('active');
            }
        }, null, 16.0)
        .to(["#concl-3d-card-0", "#concl-3d-card-1", "#concl-3d-card-2"], {
            scale: 1.0,
            opacity: 1.0,
            zIndex: 10,
            duration: 0.6,
            ease: "power2.out"
        }, 16.0)
        .to("#scene9", { opacity: 1, duration: 4.5 }, 16.5);

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
