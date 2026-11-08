// --- SISTEMA DE SONIDOS SINTÉTICOS (Web Audio API) ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

const SFX = {
    whoosh: () => {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.5);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.5);
    },
    pop: () => {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.1);
    },
    slide: () => {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.2);
    },
    tick: () => {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        // Sonido suave y muy corto, estilo teclado de celular (smartphone tap)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.015);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.015);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.015);
    }
};

// --- MOTOR DE SUBTITULOS CON COLORES Y DESBORDAMIENTO ---
function typeColoredText(curveSelector, overflowSelector, wordsArray) {
    const curveEl = document.querySelector(curveSelector);
    const overflowEl = document.querySelector(overflowSelector);

    // Límite aumentado a 35 caracteres para que llene la curva completa (de 9 a 3 en punto)
    const CURVE_LIMIT = 35;
    let totalChars = 0;

    let curveHTML = "";
    let overflowHTML = "";

    wordsArray.forEach((wordObj) => {
        const color = wordObj.color || "white";
        const text = wordObj.text + " ";

        // Comprobamos si la palabra completa cabe en el espacio restante de la curva
        if (totalChars + text.length <= CURVE_LIMIT) {
            // Toda la palabra va a la curva
            for (let i = 0; i < text.length; i++) {
                const char = text[i] === ' ' ? '&nbsp;' : text[i];
                curveHTML += `<tspan fill="${color}" opacity="0" class="sub-char">${char}</tspan>`;
                totalChars++;
            }
        } else {
            // Toda la palabra va al overflow (para no entrecortar palabras a la mitad)
            for (let i = 0; i < text.length; i++) {
                const char = text[i] === ' ' ? '&nbsp;' : text[i];
                overflowHTML += `<tspan fill="${color}" opacity="0" class="sub-char">${char}</tspan>`;
                totalChars++;
            }
        }
    });

    curveEl.innerHTML = curveHTML;
    overflowEl.innerHTML = overflowHTML;

    // Retornamos la animación GSAP que revela las letras una por una
    const targets = [];
    if (curveHTML) targets.push(`${curveSelector} .sub-char`);
    if (overflowHTML) targets.push(`${overflowSelector} .sub-char`);

    return gsap.to(targets.join(', '), {
        opacity: 1,
        duration: 0.01,
        stagger: {
            each: 0.06,
            onStart: function () {
                // Emitimos el sonido de teclado para cada caracter
                SFX.tick();
            }
        }
    });
}

// --- MÓDULOS DE ESCENA ---

function buildScene1(cam) {
    const tl = gsap.timeline();

    tl.call(() => SFX.whoosh(), null, 0)
        // Movimiento Lento y Suave de Camara (Sleepymotion)
        .to(cam, { scale: 1, x: 0, y: 0, duration: 4.5, ease: "power1.inOut" }, 0)

        .to("#scene1", { opacity: 1, duration: 0.5 }, 0)
        .to("#wrap-duda", { left: 285, opacity: 1, duration: 1, ease: "power3.out" }, 1.0)
        .call(() => SFX.pop(), null, 2.0)
        // Personaje se transforma a Círculo (Avatar)
        .call(() => document.getElementById('wrap-duda').classList.add('circle-avatar'), null, 2.5)

        // Esperamos a que la imagen se centre completamente ANTES de dibujar las letras
        .add(typeColoredText("#text-duda", "#overflow-duda", [
            { text: "Hmmm...", color: "#3fb950" },
            { text: "¿Cómo", color: "white" },
            { text: "alineamos", color: "#58a6ff" },
            { text: "la", color: "white" },
            { text: "tecnología", color: "#3fb950" },
            { text: "con", color: "white" },
            { text: "nuestros", color: "white" },
            { text: "objetivos?", color: "#58a6ff" }
        ]), 3.5)

        .from("#scene1 .title", { x: 50, opacity: 0, duration: 0.8 }, 4.0)
        .from("#scene1 .subtitle", { x: 50, opacity: 0, duration: 0.8 }, 4.2)

        // Sale escena 1
        .to(["#scene1", "#wrap-duda", "#text-duda", "#overflow-duda"], { opacity: 0, duration: 0.5 }, "+=1.5");

    return tl;
}

function buildScene2(cam) {
    const tl = gsap.timeline();

    tl.add("scene2", 0) // Etiqueta base 0
        .to(cam, { scale: 1.1, x: 0, y: 20, duration: 3, ease: "power2.inOut" }, "scene2") // Zoom In sutil
        .to("#scene2", { opacity: 1, duration: 0.5 }, "scene2+=0.5")
        .to("#wrap-1", { right: 100, opacity: 1, duration: 1, ease: "power3.out" }, "scene2+=0.5")
        .call(() => document.getElementById('wrap-1').classList.add('circle-avatar'), null, "scene2+=1.5")

        // Esperar a centrar el avatar antes de hablar
        .add(typeColoredText("#text-1a", "#overflow-1a", [
            { text: "Definimos", color: "#58a6ff" },
            { text: "qué", color: "white" },
            { text: "información", color: "#3fb950" },
            { text: "es", color: "white" },
            { text: "necesaria...", color: "#58a6ff" }
        ]), "scene2+=2.5")
        .call(() => SFX.slide(), null, "scene2+=3.5")
        .to("#card-eval", { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)" }, "scene2+=3.5")

        // Movimiento de cámara hacia el escudo de Seguridad
        .add("scene2b", "+=1") // Etiqueta para segunda parte
        .to(cam, { scale: 1.15, x: -50, y: -20, duration: 2.5, ease: "power1.inOut" }, "scene2b")
        // Desvanecemos el primer diálogo suavemente
        .to(["#text-1a", "#overflow-1a"], { opacity: 0, duration: 0.5 }, "scene2b")

        // Texto de la segunda parte de la escena
        .add(typeColoredText("#text-1b", "#overflow-1b", [
            { text: "¡Y", color: "white" },
            { text: "programamos", color: "#3fb950" },
            { text: "los", color: "white" },
            { text: "tiempos", color: "#58a6ff" },
            { text: "de", color: "white" },
            { text: "ejecución!", color: "#3fb950" }
        ]), "scene2b+=1.5")
        .call(() => SFX.slide(), null, "scene2b+=2.0")
        .to("#card-seg", { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)" }, "scene2b+=2.0")

        // Salida
        .to([".cards-container", "#wrap-1", "#text-1b", "#overflow-1b"], { opacity: 0, duration: 0.5 }, "+=1.5");

    return tl;
}

function buildScene3(cam) {
    const tl = gsap.timeline();

    tl.add("scene3", 0)
        .to(cam, { scale: 1, x: 0, y: 0, duration: 2.5, ease: "power2.inOut" }, "scene3")
        .to("#scene3", { opacity: 1, duration: 0.5 }, "scene3+=0.5")
        .to("#wrap-3", { left: 100, opacity: 1, duration: 1, ease: "power3.out" }, "scene3+=0.5")
        .from("#scene3 .title", { y: -50, opacity: 0, duration: 0.8 }, "scene3+=1.0")
        .from("#scene3 .final-text", { y: 50, opacity: 0, duration: 0.8 }, "scene3+=1.5")
        .to(["#scene3", "#wrap-3"], { opacity: 0, duration: 0.5 }, "+=2.5");

    return tl;
}

function buildScene4(cam) {
    const tl = gsap.timeline();

    gsap.set(".wb-svg path, .wb-svg rect, .wb-svg circle, .wb-svg polygon, .wb-svg line, .wb-svg ellipse", { strokeDasharray: 4000, strokeDashoffset: 4000 });

    tl.add("s4_start", 0)
        .to(cam, { scale: 1, x: 0, y: 0, duration: 1, ease: "power2.inOut" }, "s4_start")
        .to("#scene4", { opacity: 1, duration: 0.5 }, "s4_start+=0.5")

        // --- Estación 1 (El Riesgo) ---
        .add("est1", "+=0.5")
        .to(cam, { x: 0, duration: 1.5, ease: "power2.inOut" }, "est1")
        .call(() => SFX.slide(), null, "est1+=0.5")
        .to(".wb-svg-1 path, .wb-svg-1 rect, .wb-svg-1 circle, .wb-svg-1 polygon, .wb-svg-1 line, .wb-svg-1 ellipse", { strokeDashoffset: 0, duration: 2.5, ease: "power2.out", stagger: 0.02 }, "est1+=0.5")
        .to(".wb-svg-1", { fillOpacity: 1, duration: 1.5 }, "est1+=2.8")
        .to(".wb-svg-1", { strokeOpacity: 0, duration: 1.5 }, "est1+=2.8")
        .to(".wb-text-station:nth-child(1)", { opacity: 1, x: 50, duration: 1 }, "est1+=3.0")

        // --- Estación 2 (Diagnóstico) ---
        .add("est2", "+=1.5")
        .to(cam, { x: -1920, duration: 2, ease: "power2.inOut" }, "est2")
        .call(() => SFX.slide(), null, "est2+=1.0")
        .to(".wb-svg-2 path, .wb-svg-2 rect, .wb-svg-2 circle, .wb-svg-2 polygon, .wb-svg-2 line, .wb-svg-2 ellipse", { strokeDashoffset: 0, duration: 2.5, ease: "power2.out", stagger: 0.02 }, "est2+=1.0")
        .to(".wb-svg-2", { fillOpacity: 1, duration: 1.5 }, "est2+=3.3")
        .to(".wb-svg-2", { strokeOpacity: 0, duration: 1.5 }, "est2+=3.3")
        .to(".wb-text-station:nth-child(2)", { opacity: 1, x: 50, duration: 1 }, "est2+=3.5")

        // --- Estación 3 (Estrategia) ---
        .add("est3", "+=1.5")
        .to(cam, { x: -3840, duration: 2, ease: "power2.inOut" }, "est3")
        .call(() => SFX.slide(), null, "est3+=1.0")
        .to(".wb-svg-3 path, .wb-svg-3 rect, .wb-svg-3 circle, .wb-svg-3 polygon, .wb-svg-3 line, .wb-svg-3 ellipse", { strokeDashoffset: 0, duration: 2.5, ease: "power2.out", stagger: 0.02 }, "est3+=1.0")
        .to(".wb-svg-3", { fillOpacity: 1, duration: 1.5 }, "est3+=3.3")
        .to(".wb-svg-3", { strokeOpacity: 0, duration: 1.5 }, "est3+=3.3")
        .to(".wb-text-station:nth-child(3)", { opacity: 1, x: 50, duration: 1 }, "est3+=3.5")

        // --- Estación 4 (Ejecución) ---
        .add("est4", "+=1.5")
        .to(cam, { x: -5760, duration: 2, ease: "power2.inOut" }, "est4")
        .call(() => SFX.slide(), null, "est4+=1.0")
        .to(".wb-svg-4 path, .wb-svg-4 rect, .wb-svg-4 circle, .wb-svg-4 polygon, .wb-svg-4 line, .wb-svg-4 ellipse", { strokeDashoffset: 0, duration: 2.5, ease: "power2.out", stagger: 0.02 }, "est4+=1.0")
        .to(".wb-svg-4", { fillOpacity: 1, duration: 1.5 }, "est4+=3.3")
        .to(".wb-svg-4", { strokeOpacity: 0, duration: 1.5 }, "est4+=3.3")
        .to(".wb-text-station:nth-child(4)", { opacity: 1, x: 50, duration: 1 }, "est4+=3.5")

        // --- Estación 5 (Dirección) ---
        .add("est5", "+=1.5")
        .to(cam, { x: -7680, duration: 2, ease: "power2.inOut" }, "est5")
        .call(() => SFX.slide(), null, "est5+=1.0")
        .to(".wb-svg-5 path, .wb-svg-5 rect, .wb-svg-5 circle, .wb-svg-5 polygon, .wb-svg-5 line, .wb-svg-5 ellipse", { strokeDashoffset: 0, duration: 2.5, ease: "power2.out", stagger: 0.02 }, "est5+=1.0")
        .to(".wb-svg-5", { fillOpacity: 1, duration: 1.5 }, "est5+=3.3")
        .to(".wb-svg-5", { strokeOpacity: 0, duration: 1.5 }, "est5+=3.3")
        .to(".wb-text-station:nth-child(5)", { opacity: 1, x: 50, duration: 1 }, "est5+=3.5")

        // Salida
        .to(["#scene4", "#scene4-whiteboard"], { opacity: 0, duration: 0.5 }, "+=3.0");

    return tl;
}

function buildScene5(cam) {
    const tl = gsap.timeline();

    tl.call(() => SFX.whoosh(), null, 0)
        .set(cam, { scale: 1, x: 0, y: 0 }, 0) // <--- Reset camera to 0,0 so we can see it!
        .to("#scene5", { opacity: 1, duration: 0.5 }, 0)
        .from("#scene5 .title", { scale: 0.5, opacity: 0, duration: 1, ease: "elastic.out(1, 0.5)" }, 0)
        .call(() => SFX.pop(), null, 0.2);

    return tl;
}

function buildWipeTransition() {
    const tl = gsap.timeline();
    const paths = document.querySelectorAll('.wipe-paint-path');
    tl.call(() => SFX.whoosh(), null, 0)
        .fromTo(paths[0], { strokeDashoffset: 40000 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0)
        .set(paths, { strokeDashoffset: 40000 }, 1.3);
    return tl;
}

// --- CONTROLADOR PRINCIPAL ---
function startAnimation() {
    document.getElementById("start-overlay").style.display = "none";
    initAudio();

    const masterTl = gsap.timeline();
    const cam = "#camera-rig";

    // ESTADO INICIAL DE CAMARA
    gsap.set(cam, { scale: 1.2, x: -100, y: 50 });

    // ENSAMBLAJE DE LA ANIMACIÓN
    masterTl.add(buildScene1(cam))
        .add(buildWipeTransition(), "+=1")
        .add(buildScene2(cam))
        .add(buildWipeTransition(), "+=1")
        .add(buildScene3(cam))
        .add(buildWipeTransition(), "+=1")
        .add(buildScene4(cam))
        .add(buildWipeTransition(), "+=1")
        .add(buildScene5(cam));

    // ==========================================
    // LOGICA DE CONTROLES DE REPRODUCCIÓN
    // ==========================================
    const controls = document.getElementById('playback-controls');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const scrubber = document.getElementById('timeline-scrubber');
    const timeDisplay = document.getElementById('time-display');
    const hideBtn = document.getElementById('hide-controls-btn');

    // Muestra los controles cuando inicia
    controls.classList.add('active');

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }

    masterTl.eventCallback('onUpdate', () => {
        // Update the scrubber only if user is not actively dragging it
        if (document.activeElement !== scrubber) {
            scrubber.value = masterTl.progress();
        }
        timeDisplay.textContent = `${formatTime(masterTl.time())} / ${formatTime(masterTl.duration())}`;
    });

    scrubber.addEventListener('input', () => {
        masterTl.progress(scrubber.value);
        if (masterTl.paused()) {
            timeDisplay.textContent = `${formatTime(masterTl.time())} / ${formatTime(masterTl.duration())}`;
        }
    });

    playPauseBtn.addEventListener('click', () => {
        if (masterTl.paused()) {
            masterTl.play();
            playPauseBtn.textContent = '⏸ Pausa';
        } else {
            masterTl.pause();
            playPauseBtn.textContent = '▶ Reproducir';
        }
    });

    hideBtn.addEventListener('click', () => {
        controls.style.display = 'none';
    });
}

// --- ESCALADO RESPONSIVO PARA LA VISTA PREVIA ---
function resizePreview() {
    const container = document.getElementById('container');
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    container.style.transform = `scale(${scale})`;
}
window.addEventListener('resize', resizePreview);
resizePreview();
