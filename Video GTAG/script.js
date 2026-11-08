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
function getScrollTargetY(elementId, fallbackY, padding = 20) {
    const el = document.getElementById(elementId);
    if (el && typeof el.offsetTop === 'number' && el.offsetTop > 0) {
        return -(Math.max(0, el.offsetTop - padding));
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

        // 2. SEGUNDO ELEMENTO: Matriz 5x5 a la derecha (aparición con zoom y escala tras contemplar la división celular)
        .to(cam, { scale: 1.25, x: -340, y: 70, duration: 1.3, ease: "power2.inOut" }, 5.0)
        .to("#matrix-graph-panel", { opacity: 1, scale: 1.0, duration: 0.8, ease: "back.out(1.2)" }, 5.0)
        .call(() => SFX.ting(), null, 5.8)
        .to("#matrix-graph-panel .cell-high", { scale: 1.15, duration: 0.3, yoyo: true, repeat: 3, transformOrigin: "center center" }, 5.8)

        // 3. TERCER ELEMENTO: Tabla de 12 Riesgos Priorizados (aparición limpia a altura completa de 650px)
        // Desvanecemos la matriz para ceder todo el escenario a la tabla y centramos la cámara
        .to("#scene2 .matrix-container", { opacity: 0, y: -25, duration: 0.65, ease: "power2.inOut", pointerEvents: "none" }, 6.7)
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.0, ease: "power2.inOut" }, 6.7)
        .to("#risks-table-box", { opacity: 1, y: 0, scale: 1.0, duration: 0.85, ease: "power2.out", pointerEvents: "auto" }, 7.0)
        .call(() => SFX.slide(), null, 7.0)
        .fromTo("#risks-table-box", {
            boxShadow: "0 0 45px rgba(88, 166, 255, 0.65)"
        }, {
            boxShadow: "0 16px 45px rgba(0, 0, 0, 0.55)",
            duration: 0.9
        }, 7.0)

        // Desplazamiento progresivo de filas de la tabla a través de los 12 riesgos
        .to("#risks-rows-track", {
            y: () => {
                const track = document.getElementById('risks-rows-track');
                return track && track.scrollHeight > 650 ? -(track.scrollHeight - 620) : -450;
            },
            duration: 8.5,
            ease: "power1.inOut"
        }, 7.5)

        // ========================================================
        // DESPUÉS DEL TERCERO: CARRUSEL 3D POR ARRIBA DE LOS DEMÁS
        // ========================================================
        // Retorno de cámara al centro y eliminación total de los textos/tablas de fondo
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, 16.0)
        .to(["#scene2 .scene-header-box", "#scene2 .matrix-container", "#scene2 #risks-table-box"], {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, 16.0)

        // Entrada del Carrusel 3D con su encabezado elevado e independiente
        .to("#risk-carousel-3d-overlay", {
            visibility: "visible",
            opacity: 1,
            scale: 1.0,
            duration: 0.9,
            ease: "back.out(1.2)"
        }, 16.5)
        .call(() => SFX.whoosh(), null, 16.5)
        .call(() => { set3DCarouselCard(0); SFX.ting(); }, null, 17.3)

        // Rotación a Card 1 (Bases de Datos Fiscales: R01, R07, R17)
        .to("#carousel-ring", { rotationY: -90, duration: 0.9, ease: "power2.inOut" }, 19.2)
        .call(() => { set3DCarouselCard(1); SFX.ting(); }, null, 20.1)

        // Rotación a Card 2 (Endpoints y Antivirus: R26, R27)
        .to("#carousel-ring", { rotationY: -180, duration: 0.9, ease: "power2.inOut" }, 21.8)
        .call(() => { set3DCarouselCard(2); SFX.ting(); }, null, 22.7)

        // Rotación a Card 3 (Mesa de Ayuda y SGF: R09, R24, R28) - Última tarjeta, sin volver a la primera
        .to("#carousel-ring", { rotationY: -270, duration: 0.9, ease: "power2.inOut" }, 24.4)
        .call(() => { set3DCarouselCard(3); SFX.ting(); }, null, 25.3)

        // Se mantiene fija en la última tarjeta (Card 3: Mesa de Ayuda) para apreciarla sin rotar al inicio
        .to(cam, { scale: 1.04, duration: 2.2, ease: "power1.out" }, 25.5)

        // Cierre fluido de la Escena 2
        .to("#scene2", { opacity: 0, duration: 0.7 }, 28.5);

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
        .to("#scene3", { opacity: 1, duration: 0.5 }, 0.1)
        .from("#scene3 .section-tag", { y: -20, opacity: 0, duration: 0.5 }, 0.3)
        // Título escrito letra por letra con SFX.tick
        .add(typeHeadingText("#scene3 .title-hero", "Identificación de Controles Esperados", 0.03, false), 0.4)
        .from("#scene3 .subtitle-hero", { opacity: 0, y: 15, duration: 0.8 }, 1.8)

        // OneTake: Cámara desciende y hace zoom directamente en el cuadro de Controles Esperados
        .to(cam, { scale: 1.05, x: 0, y: -30, duration: 1.6, ease: "power2.inOut" }, 2.2)
        .call(() => SFX.slide(), null, 2.4)
        .from("#controls-table-box", { opacity: 0, y: 40, duration: 0.8, ease: "power2.out" }, 2.2)

        // Desplazamiento progresivo de filas: van subiendo paulatinamente
        .to("#controls-rows-track", {
            y: () => {
                const track = document.getElementById('controls-rows-track');
                return track && track.scrollHeight > 580 ? -(track.scrollHeight - 550) : -500;
            },
            duration: 10.0,
            ease: "power1.inOut"
        }, 3.4)

        // OneTake: Retorno fluido de cámara a encuadre panorámico completo
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.8, ease: "power2.inOut" }, 14.5)
        .to("#scene3", { opacity: 0, duration: 0.6 }, "+=2.0");

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
        // Título escrito letra por letra con SFX.tick (sin ting en título)
        .add(typeHeadingText("#scene4 .title-hero", "Solicitud de Evidencias e Instrumentos", 0.026, false), 0.4)
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

        // Entrada de la Tabla de Evidencias con desplazamiento en perspectiva
        .from("#evidence-table-box", { opacity: 0, y: 35, duration: 0.7, ease: "power2.out" }, 2.5)

        // Cascada forense de las 17 filas de evidencias (alineación estrictamente recta y uniforme en una sola columna)
        .from(".evidence-row-item", {
            y: 12,
            opacity: 0,
            duration: 0.35,
            stagger: 0.03,
            ease: "power2.out",
            clearProps: "transform"
        }, 2.7)

        // Haz Láser de Escaneo Forense que recorre la tabla de arriba a abajo
        .call(() => SFX.slide(), null, 3.2)
        .to("#evidence-scan-beam", { opacity: 1, duration: 0.1 }, 3.2)
        .to("#evidence-scan-beam", {
            top: "100%",
            duration: 1.8,
            ease: "power1.inOut"
        }, 3.3)
        .to("#evidence-scan-beam", { opacity: 0, duration: 0.2 }, 5.1)

        // ==============================================================
        // 1. FOCO EN OBSERVACIÓN DIRECTA (E4 - Ficha de Observación Directa In Situ)
        // ==============================================================
        // Cámara se desplaza y encuadra primero
        .to(cam, { scale: 1.08, x: 0, y: -25, duration: 0.8, ease: "power2.inOut" }, 5.2)
        // Justo al asentarse la cámara (6.0s), suena el ting y resalta la técnica y fila
        .call(() => SFX.ting(), null, 6.0)
        .to("#pill-observacion", {
            scale: 1.08,
            borderColor: "var(--accent-purple)",
            boxShadow: "0 0 25px rgba(188, 140, 255, 0.5)",
            duration: 0.35
        }, 6.0)
        .to("#row-ev-4", {
            backgroundColor: "rgba(188, 140, 255, 0.22)",
            boxShadow: "0 0 16px rgba(188, 140, 255, 0.4)",
            duration: 0.35,
            yoyo: true,
            repeat: 2
        }, 6.0)

        // ==============================================================
        // 2. RECORRIDO PROGRESIVO Y FOCO PRINCIPAL EN INSPECCIÓN DOCUMENTAL
        // ==============================================================
        // Retiro del foco de observación (se apagan el pill de observación y su fila)
        .to("#pill-observacion", {
            scale: 1.0,
            borderColor: "rgba(255, 255, 255, 0.12)",
            boxShadow: "none",
            duration: 0.35
        }, 8.0)
        .to("#row-ev-4", {
            backgroundColor: "transparent",
            boxShadow: "none",
            duration: 0.35
        }, 8.0)
        // La tabla se desplaza dinámicamente para centrar el bloque de inspección documental (E6+) en el viewport
        .to("#evidence-rows-grid", {
            y: () => getScrollTargetY('row-ev-6', -380, 25),
            duration: 2.3,
            ease: "power1.inOut"
        }, 8.2)
        .call(() => SFX.slide(), null, 8.3)

        // Activación del ENFOQUE DESTACADO EN INSPECCIÓN DOCUMENTAL (la cámara encuadra)
        .to(cam, { scale: 1.04, x: 0, y: -20, duration: 0.8, ease: "power2.inOut" }, 10.5)
        // Justo al asentarse la cámara y el scroll (11.3s), suena el ting y resaltan las evidencias documentales visibles
        .call(() => SFX.ting(), null, 11.3)
        .to("#pill-inspeccion", {
            scale: 1.08,
            borderColor: "var(--accent-amber)",
            boxShadow: "0 0 28px rgba(210, 153, 34, 0.6)",
            duration: 0.35
        }, 11.3)
        .to(["#row-ev-6", "#row-ev-7", "#row-ev-8", "#row-ev-9", "#row-ev-10"], {
            backgroundColor: "rgba(210, 153, 34, 0.20)",
            boxShadow: "0 0 16px rgba(210, 153, 34, 0.4)",
            duration: 0.35,
            yoyo: true,
            repeat: 2
        }, 11.3)

        // ==============================================================
        // 3. RECORRIDO Y FOCO EXCLUSIVO EN INDAGACIÓN (E14 Y E17 ÚNICAMENTE)
        // ==============================================================
        // Retiro del foco de inspección
        .to("#pill-inspeccion", { scale: 1.0, borderColor: "rgba(255, 255, 255, 0.12)", boxShadow: "none", duration: 0.35 }, 14.5)
        .to(["#row-ev-6", "#row-ev-7", "#row-ev-8", "#row-ev-9", "#row-ev-10"], { backgroundColor: "transparent", boxShadow: "none", duration: 0.35 }, 14.5)
        // Recorrido dinámico que desplaza la tabla exactamente hasta centrar E14 y E17 en el viewport
        .to("#evidence-rows-grid", {
            y: () => getScrollTargetY('row-ev-14', -920, 25),
            duration: 2.5,
            ease: "power1.inOut"
        }, 14.7)
        .call(() => SFX.slide(), null, 14.8)

        // La cámara encuadra
        .to(cam, { scale: 1.04, x: 0, y: -20, duration: 0.8, ease: "power2.inOut" }, 17.2)
        // Justo al asentarse (18.0s), suena el ting y resalta ÚNICAMENTE Indagación (Pill e instrumentos E14 y E17 plenamente visibles)
        .call(() => SFX.ting(), null, 18.0)
        .to("#pill-indagacion", {
            scale: 1.08,
            borderColor: "var(--accent-blue)",
            boxShadow: "0 0 25px rgba(88, 166, 255, 0.5)",
            duration: 0.35
        }, 18.0)
        .to(["#row-ev-14", "#row-ev-17"], {
            backgroundColor: "rgba(88, 166, 255, 0.24)",
            boxShadow: "0 0 18px rgba(88, 166, 255, 0.4)",
            duration: 0.35,
            yoyo: true,
            repeat: 2
        }, 18.0)

        // ==============================================================
        // 4. RETORNO PANORÁMICO Y CIERRE
        // ==============================================================
        .to(["#row-ev-14", "#row-ev-17"], { backgroundColor: "transparent", boxShadow: "none", duration: 0.4 }, 21.0)
        .to(".tech-pill", { scale: 1.0, borderColor: "rgba(255, 255, 255, 0.12)", boxShadow: "none", duration: 0.4 }, 21.0)
        .to("#evidence-rows-grid", { y: 0, duration: 1.4, ease: "power2.inOut" }, 21.0)
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.4, ease: "power2.inOut" }, 21.0)
        .to("#scene4", { opacity: 0, duration: 0.6 }, "+=2.0");

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

        // 2. DESPLAZAMIENTO TOTAL: LA TOPOLOGÍA DE RED DESPLAZA POR COMPLETO A LA TABLA Y OCUPA SU LUGAR
        .call(() => SFX.whoosh(), null, 3.8)
        .to("#tests-table-box-6", {
            x: -1600,
            opacity: 0,
            duration: 0.85,
            ease: "power3.inOut"
        }, 3.8)
        .to("#network-topology-hud", {
            x: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.inOut"
        }, 3.8)

        // FOCO 1: COMPONENTE D - REDES Y TELECOMUNICACIONES (R16 - Enlaces de Sedes Caídos)
        .to(cam, { scale: 1.02, x: 0, y: -10, duration: 0.8, ease: "power2.inOut" }, 3.8)
        .call(() => SFX.ting(), null, 4.4)
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
        }, null, 4.4)
        // HALOS CONCÉNTRICOS ALERTA R16 (CENTRADO EXACTO EN EL NODO ORIGEN)
        .fromTo(["#halo-requena", "#halo-datem"],
            { attr: { r: 14 }, opacity: 1, strokeWidth: 2.5 },
            { attr: { r: 44 }, opacity: 0, strokeWidth: 0.5, duration: 0.85, repeat: 3, ease: "power1.out" },
            4.4
        )
        .fromTo(["#halo-requena-2", "#halo-datem-2"],
            { attr: { r: 14 }, opacity: 0.7, strokeWidth: 2 },
            { attr: { r: 44 }, opacity: 0, strokeWidth: 0.5, duration: 0.85, repeat: 3, ease: "power1.out" },
            4.7
        )

        // FOCO 2: COMPONENTE E - OPERACIONES DE TI Y MESA DE AYUDA (R09 Mesa de Ayuda, R24 Caídas SGF, R28 Suplencia)
        .to(cam, { scale: 1.02, x: 0, y: -15, duration: 0.8, ease: "power2.inOut" }, 7.5)
        .call(() => SFX.ting(), null, 8.3)
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
        }, null, 8.3)
        // HALOS CONCÉNTRICOS MESA DE AYUDA (CENTRADO EXACTO EN EL NODO ORIGEN)
        .fromTo("#halo-sgf",
            { attr: { r: 13 }, opacity: 1, strokeWidth: 2.5 },
            { attr: { r: 40 }, opacity: 0, strokeWidth: 0.5, duration: 0.85, repeat: 3, ease: "power1.out" },
            8.3
        )
        .fromTo("#halo-sgf-2",
            { attr: { r: 13 }, opacity: 0.7, strokeWidth: 2 },
            { attr: { r: 40 }, opacity: 0, strokeWidth: 0.5, duration: 0.85, repeat: 3, ease: "power1.out" },
            8.6
        )

        // Retorno panorámico y fade out
        .to(cam, { scale: 1.0, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" }, 12.0)
        .to("#scene6", { opacity: 0, duration: 0.6 }, 14.0);

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
function setActiveSceneDOM(sceneId) {
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

// Scrubber Slider
const scrubber = document.getElementById('scrubber-slider');
if (scrubber) {
    scrubber.addEventListener('input', (e) => {
        if (!masterTimeline) initMasterTimeline();
        masterTimeline.progress(parseFloat(e.target.value));
    });
}

// Salto directo a Escena (1 a 9)
window.jumpToScene = function (sceneNumber) {
    initAudioSystem();
    if (!masterTimeline) initMasterTimeline();

    const label = sceneLabels[sceneNumber - 1];
    if (label && masterTimeline.labels[label] !== undefined) {
        masterTimeline.pause();
        masterTimeline.seek(label);
        masterTimeline.play();
        setActiveSceneDOM(`scene${sceneNumber}`);
        const icon = document.getElementById('play-icon');
        if (icon) icon.textContent = '⏸';
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
};

// Botón Play / Pausa
document.getElementById('btn-play-pause').addEventListener('click', () => {
    initAudioSystem();
    if (!masterTimeline) initMasterTimeline();

    const icon = document.getElementById('play-icon');
    if (masterTimeline.paused()) {
        masterTimeline.play();
        if (icon) icon.textContent = '⏸';
    } else {
        masterTimeline.pause();
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
            masterTimeline.seek(Math.max(0, masterTimeline.time() - 2));
        }
    } else if (e.code === 'ArrowRight') {
        if (masterTimeline) {
            masterTimeline.seek(Math.min(masterTimeline.duration(), masterTimeline.time() + 2));
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
