# Guion Técnico Visual - Video GTAG S10 (Sin Voces ni Diálogos)

**Formato:** Video Web Animado 1920x1080 (HyperFrames / GSAP)  
**Estilo:** Glassmorphism + Cinematografía OneTake + SFX Sincronizados  
**Locución:** Desactivada (100% Visual y Tipográfico)  

---

## Estructura Modular (9 Escenas: E1 - E9)

### Escena 1: Portada Institucional y Marco GTAG
* **Duración:** Dinámica y 100% sincronizada con `AUDIO_SPEEDS.presentacion` (a 1.0x: ~18.6s | a 1.1x: ~17.0s | a 1.25x: ~15.1s).
* **Archivo de Audio:** `presentacion.mp4` (`AUDIOS PASO 1-6/presentacion.mp4`)
* **Sincronización Dinámica:** Inicia en el segundo **1.0**. El cierre visual, retorno de cámara y transición se calculan en tiempo real según la velocidad configurada (`1.0 + (17.5 / spd) + 0.15s`), eliminando tiempos muertos de espera y enlazando de inmediato con la Escena 2.
* **Fondo:** Sede Central Iquitos (Ministerio Público - Loreto) con desenfoque de profundidad (`blur: 10px`) y efecto vidrio esmerilado.
* **Locución:**
  > *"En esta presentación les compartiremos cómo realizamos la auditoría de infraestructura y operaciones de TI en la sede central de Iquitos del Distrito Fiscal de Loreto, revisando paso a paso sus principales riesgos y controles bajo los estándares de la guía GTAG."*
* **Tipografía Editorial:** **DM Serif Display** (Título principal) combinada con **Roboto** (Subtítulos, insignias y metadatos).
* **Tipografía Cinética:**
  * Título institucional escrito letra por letra con efecto typewriter (`SFX.tick` sincronizado y campana final `SFX.ting`):
    `AUDITORÍA DE INFRAESTRUCTURA Y OPERACIONES DE TI`
  * Subtítulo:
    `GTAG: Auditing Computing Infrastructure and IT Operations`
* **Cámara OneTake:**
  * Desplazamiento continuo hacia los metadatos institucionales:
    * *Entidad Auditada:* Ministerio Público - Distrito Fiscal de Loreto
    * *Código:* AUD-MPL-GTAG-11-26
    * *Sede:* Sede Central Iquitos
* **Transición:** Barrido dinámico Wipe (`SFX.whoosh`) iniciando a los 17.6s hacia la Escena 2.

---

### Escena 2: Paso 1 - Identificación y Valoración de Riesgos
* **Duración:** ~29.5 segundos
* **Identificación:** APLICACIÓN PRÁCTICA • PASO 1 (Magerit v3 & ISO 27005)
* **Tipografía Cinética:**
  * Título: `Identificación y Valoración de Riesgos` en **DM Serif Display** (typewriter sincronizado).
  * Subtítulo: `Metodología Magerit v3 y Matriz 5x5: Universo total de 32 riesgos inherentes evaluados.` en **Roboto**.
* **Cámara OneTake y Puesta en Escena Dinámica:**
  1. **Primer Elemento:** La cámara viaja hacia el **Panel de Métricas KPI** (Izquierda, 50% del ancho simétrico de 1560px):
     * *Universo Auditable:* Conteo progresivo animado de 0 a 32 (`#58a6ff`).
     * *Fórmula de Valoración:* Probabilidad × Impacto.
     * *Riesgos Descartados (Bajo/Medio):* Conteo progresivo de 0 a 20 (`#d29922`).
     * *Riesgos Priorizados (Alto/Muy Alto):* Conteo progresivo de 0 a 12 (`#f85149`).
  2. **Segundo Elemento:** La cámara se desliza horizontalmente hacia la **Matriz 5x5** (Derecha, 50% del ancho simétrico de 1560px):
     * Despliegue de cuadrícula con celdas baja, media y alta a ancho completo.
     * Alerta sonora sutil (`SFX.ting()`) y pulso en las celdas críticas (15, 20, 25) con borde carmesí de auditoría.
  3. **Tercer Elemento:** La cámara desciende y hace **Zoom Cinematográfico** hacia la **Tabla de 12 Riesgos Priorizados (GTAG)**:
     * Contenedor con efecto vidrio esmerilado translúcido (*Glassmorphism*) a ancho completo (`1560px`).
     * Tipografía limpia y badges sin imágenes distractoras.
     * Las filas van subiendo paulatinamente de forma continua y fluida (R01 a R28), mostrando código, descripción, nivel (Alto / Muy Alto) y componente GTAG.
     * Mediante una máscara de degradado vertical, las filas superiores se van desvaneciendo suavemente conforme ascienden.
  4. **Al Final en Tiempo (Después del Tercero) - Carrusel 3D por Arriba de los Demás:**
     * La cámara retorna al centro panorámico y los elementos previos de fondo (matriz y tabla de riesgos) se ocultan totalmente (`opacity: 0`), despejando el 100% del escenario para que no asome ninguna letra debajo del carrusel.
     * Emerge elevado y en primer plano el **Carrusel 3D de Evidencias en Campo** (`perspective: 1400px; transform-style: preserve-3d`) con `SFX.whoosh()`:
       - **Card 0 (0°):** Cuarto de Servidores (`saladeservidores.jpg`) • R02, R12, R20 • Seguridad Física y Ambiental (`SFX.ting()`).
       - **Card 1 (-90°):** Bases de Datos Fiscales (`gestordebasededatos.jpg`) • R01, R07, R17 • Respaldo y Restauración (`SFX.ting()`).
       - **Card 2 (-180°):** Endpoints & Antivirus (`antivirus.jpg`) • R26, R27 • Software y Parches Lógicos (`SFX.ting()`).
       - **Card 3 (-270°):** Mesa de Ayuda & SGF (`mesadeayuda.png`) • R09, R24, R28 • Operaciones TI e Incidentes (`SFX.ting()`).
       - **Giro Panorámico Final 3D (-360°):** Órbita completa continua de las 4 tarjetas con `SFX.pop()` antes del cierre de escena.

---

### Escena 3: Paso 2 - Identificación de Controles Esperados (Parámetros GTAG)
* **Duración:** ~16.5 segundos
* **Identificación:** APLICACIÓN PRÁCTICA • PASO 2 (Parámetros de Evaluación)
* **Tipografía Cinética:**
  * Título: `Identificación de Controles Esperados` (typewriter con `SFX.tick` y `SFX.ting`).
  * Subtítulo: `Parámetros de Evaluación GTAG: El parámetro técnico preventivo, detectivo y correctivo para mitigar los 12 riesgos priorizados.`
* **Cámara OneTake y Animación de Tabla de Controles:**
  1. La cámara desciende y hace **Zoom Cinematográfico** (`scale: 1.04, y: -20`) directo a la **Tabla de Controles Esperados**:
     * Contenedor con vidrio esmerilado centrado simétricamente (`max-width: 1560px`).
     * Encabezados de todas las columnas centrados: *Componente GTAG*, *Riesgo* y *Control Esperado*.
  2. **Calibración Sonora Sincronizada (1s antes para máxima cadencia vocal):**
     * **R02 y R20:** 2:13.80 global (raw 21.02s) - Físico
     * **R12:** 2:26.80 global (raw 37.27s) - Centro de Datos
     * **R01:** scroll 2:32.78, highlight 2:34.80 global (raw 47.27s) - Respaldo
     * **R07:** 2:41.80 global (raw 56.02s) - Respaldo off-site
     * **R17:** 2:47.80 global (raw 63.52s) - Custodia bajo llave
     * **R26:** scroll 2:51.98, highlight 2:53.80 global (raw 71.02s) - Software y Parches
     * **R27:** 3:02.80 global (raw 82.27s) - Antivirus y Malware
     * **R16:** scroll 3:08.78, highlight 3:10.80 global (raw 92.27s) - Redes
     * **R09:** scroll 3:20.78, highlight 3:22.80 global (raw 107.27s) - Operaciones TI
     * **R24:** 3:29.80 global (raw 116.02s) - Continuidad SGF
     * **R28:** 3:35.80 global (raw 123.52s) - Personal de relevo
     * Reset R28: 3:39.98 global (raw 128.75s)
  3. Reencuadre panorámico final institucional.

---

### Escena 4: Paso 3 - Solicitud de Evidencias e Instrumentos (E1 - E19)
* **Duración:** ~75 segundos en total (Parte 1: 0 a 73.20s raw + pausa 0.5s + Parte 2: 116.20s a 133.96s raw)
* **Identificación:** APLICACIÓN PRÁCTICA • PASO 3 (Sustento Forense de Auditoría)
* **Tipografía Cinética:**
  * Título: `Solicitud de Evidencias e Instrumentos` (typewriter con `SFX.tick` y `SFX.ting`).
  * Subtítulo: `17 Instrumentos y Fuentes de Información Requeridos para Evaluar la Operatividad de los Controles (Técnicas GTAG).`
* **Diseño Visual de Badges y Contenedores:**
  * 3 Pastillas superiores simétricas (`Indagación: 4`, `Observación: 2`, `Inspección: 11`).
  * Tabla centralizada con visor interactivo y desplazamiento dinámico por scroll.
* **Calibración Sincronizada con el Cronómetro Global:**
  1. **4:20 global (raw 39.64s):** Foco en **Indagación** (`#pill-indagacion`, E1, E5) con resplandor azul y `SFX.ting`.
  2. **4:28 global (raw 49.64s):** Desplazamiento fluido hacia **E14 y E17** con `SFX.slide`, resplandor azul y `SFX.ting`.
  3. **4:38 global (raw 62.14s):** Foco en **Inspección Documental** (`#pill-inspeccion`), resplandor ámbar en todas las filas de la categoría (`.row-tech-inspeccion`) y recorrido continuo de la tabla visualizando desde E2 hasta E13.
  4. **4:50 global (raw 119.52s):** Foco en **Observación Directa** (`#pill-observacion`), resaltando E4 y desplazando de arriba a abajo continuamente hacia E18 con `SFX.slide` y `SFX.ting`, culminando en vista panorámica completa.

---

### Escena 5: Paso 4 (Parte 1) - Diseño y Ejecución de Pruebas: Seguridad Física, Respaldo y Software (Componentes A, B, C)
* **Duración:** ~53 segundos (audio acelerado 1.25x desde Paso 4.wav hasta 64.85s raw)
* **Identificación:** APLICACIÓN PRÁCTICA • PASO 4 (PARTE 1)
* **Tipografía Cinética:**
  * Título: `Diseño y Ejecución de Pruebas de Cumplimiento` (typewriter con `SFX.tick` y `SFX.ting`).
  * Subtítulo: `Evaluación de Efectividad Operativa en Infraestructura Física, Respaldos y Seguridad Lógica.`
* **Contenido de Pruebas y Calibración Sincronizada:**
  * **5:27 global (raw 29.18s):** Foco en **Componente A (Seguridad Física)**: R02 y R20 (cerradura, acceso físico y registro del cuarto) [E4, E18, E5, E17] | R12 (condiciones ambientales, climatización y extintores) [E4, E18, E5] con pulso violeta y `SFX.ting`.
  * **5:36 global (raw 40.43s):** Desplazamiento fluido y foco en **Componente B (Respaldo y Recuperación)**: R01 y R07 (cronograma de copias PCO, off-site y pruebas de restauración) [E1, E5, E6] | R17 (custodia física bajo llave e inventario de medios) [E4, E5, E7] con pulso dorado y `SFX.ting`.
  * **5:49 global (raw 56.68s):** Desplazamiento fluido y foco en **Componente C (Software y Parches)**: R26 (SO sin soporte Windows 10 y falta de cifrado) [E7, E14] | R27 (antimalware inactivo y firmas desactualizadas) [E18, E5] con pulso azul tecnológico y `SFX.ting`.
* **Cámara OneTake y Secuencia:**
  1. Entrada de pastillas métricas (3 Componentes, 6 Pruebas) con `SFX.pop`.
  2. Despliegue de tabla y cascada de las 6 pruebas.
  3. Foco 1 en Componente A (5:27) con pulso violeta y `SFX.ting`.
  4. Foco 2 en Componente B (5:36) con pulso dorado y `SFX.ting`.
  5. Foco 3 en Componente C (5:49) con pulso azul tecnológico y `SFX.ting`.
  6. Retorno panorámico general.

---

### Escena 6: Paso 4 (Parte 2) - Diseño y Ejecución de Pruebas: Redes y Operaciones TI (Componentes D, E)
* **Duración:** ~28 segundos (audio reproducido íntegro hasta el final natural 100.31s sin cortes)
* **Identificación:** APLICACIÓN PRÁCTICA • PASO 4 (PARTE 2)
* **Tipografía Cinética:**
  * Título: `Diseño y Ejecución de Pruebas de Cumplimiento` (typewriter con `SFX.tick` y `SFX.ting`).
  * Subtítulo: `Evaluación en Redes, Telecomunicaciones, Mesa de Ayuda y Continuidad Operativa de TI.`
* **Contenido de Pruebas y Calibración Sincronizada:**
  * **6:03 global (elapsedRaw 6.71s / raw 71.59s):** Foco en **Componente D (Redes y Telecomunicaciones)**: R16 (solicitud de reportes de enlaces, constatando falta de monitoreo proactivo) [E5, E17] con pulso carmesí/cian y `SFX.ting`.
  * **6:10 global (elapsedRaw 15.46s / raw 80.34s):** Desplazamiento fluido y foco en **Componente E (Operaciones TI)**: R09 (revisión de mesa de ayuda, falta de tickets formales) [E1, E4, E5] | R24 (ausencia de diagnóstico local formal y falta de registro ante caídas del SGF) [E6, E5] | R28 (inspección de ROF y PCO, ausencia de personal técnico de respaldo) [E3, E6, E1, E5] con pulso verde/azul y `SFX.ting`.
  * **Cierre natural completo:** Concluye toda la locución de R28 sin cortes abruptos, permitiendo que la locución finalice de forma orgánica.
* **Cámara OneTake y Secuencia:**
  1. Entrada de métricas (2 Componentes, 4 Pruebas Críticas).
  2. Cascada de filas.
  3. Foco 1 en Redes (6:03) con pulso cian y `SFX.ting`.
  4. Foco 2 en Operaciones TI (6:10) con pulso verde esmeralda y `SFX.ting`.
  5. Retorno panorámico y finalización completa del audio de Paso 4.

---

### Escena 7: Paso 5 (Parte 1) - Determinación de Desviaciones: Seguridad Física y Respaldo (Componentes A, B)
* **Duración:** ~16 segundos
* **Identificación:** APLICACIÓN PRÁCTICA • PASO 5 (PARTE 1) [Insignia sólida carmesí]
* **Tipografía Cinética:**
  * Título: `Determinación de Desviaciones y Hallazgos` en **DM Serif Display** (typewriter con `SFX.tick` y `SFX.ting`).
  * Subtítulo: `Incumplimientos Críticos en Seguridad Física, Ambiental y Respaldo de Información.` en **Roboto**.
* **Contenido de Desviaciones (Hallazgos Críticos):**
  * **Componente A (Seguridad Física y Ambiental):**
    * *R02 y R20:* No se registran los ingresos, el personal de Indicadores entra sin acompañamiento y la cerradura no se usa durante la jornada. No hay procedimiento de autorización, el acceso no se basa en el cargo y la capacitación en seguridad física es ocasional.
    * *R12:* No se identificaron las amenazas ambientales del cuarto ni hay una política sobre lo que puede guardarse en él, que no se mantiene libre de materiales. La ubicación no protege de calor, humedad y polvo y no hay extintores, alarmas ni procedimiento de respuesta.
  * **Componente B (Respaldo y Recuperación):**
    * *R01:* No existe una programación de pruebas de restauración ni se solicita al DBA nacional evidencia de su ejecución. Los requisitos de almacenamiento local y remoto no están formalizados.
    * *R07:* El calendario de respaldo remoto no se cumple, los requisitos de almacenamiento fuera del local no están formalizados y no se prueban periódicamente las copias.
    * *R17:* No existe procedimiento para la custodia de los medios, no se evidenció cifrado ni inventario, el acceso no se limita y no hay salvaguardas físicas.
* **Cámara OneTake y Secuencia:**
  1. Entrada de pastillas métricas (2 Dominios Críticos, 5 Hallazgos Formales, Riesgo Muy Alto) con `SFX.pop`.
  2. Despliegue de tabla con borde superior carmesí y cascada de las 5 desviaciones (`SFX.slide`).
  3. Foco 1 en Componente A (Cuarto de Servidores) con zoom (`scale: 1.08`), resplandor y `SFX.ting`.
  4. Foco 2 en Componente B (Respaldo y Custodia) con zoom (`scale: 1.09`), resplandor ámbar y `SFX.ting`.
  5. Retorno panorámico institucional.

---

### Escena 8: Paso 5 (Parte 2) - Determinación de Desviaciones: Software, Redes y Operaciones TI (Componentes C, D, E)
* **Duración:** ~76.4 segundos (audio reproducido desde 92.50s hasta el final 188.05s de Paso 5.wav a 1.25x)
* **Identificación:** APLICACIÓN PRÁCTICA • PASO 5 (PARTE 2) [Insignia sólida carmesí]
* **Tipografía Cinética:**
  * Título: `Determinación de Desviaciones y Hallazgos` en **DM Serif Display** (typewriter con `SFX.tick` y `SFX.ting`).
  * Subtítulo: `Incumplimientos en Software Lógico, Red Provincial y Operaciones de TI.` en **Roboto**.
* **Contenido de Desviaciones y Calibración Sincronizada:**
  * **7:50 global (elapsedRaw 7.45s):** Foco en **Componente C (Software, Parches y Seguridad Lógica)**:
    * *R26:* Sistemas sin soporte en Windows 10 y falta de cifrado.
    * *R27:* Protección antimalware inactiva y firmas desactualizadas.
    * Resplandor azul tecnológico con `SFX.ting`.
  * **8:15 global (elapsedRaw 39.50s):** Desplazamiento fluido y foco en **Componente D (Redes y Telecomunicaciones)**:
    * *R16:* Falta de monitoreo proactivo y saturación de enlaces a fiscalías provinciales.
    * Resplandor carmesí con `SFX.slide` y `SFX.ting`.
  * **8:30 global (elapsedRaw 57.45s):** Desplazamiento fluido y foco en **Componente E (Operaciones TI e Incidentes)**:
    * *R09:* Falta de tickets formales y SLA en mesa de ayuda.
    * *R24:* Ausencia de diagnóstico local formal ante caídas del SGF.
    * *R28:* Severa dependencia humana y falta de personal técnico de respaldo.
    * Resplandor cian/esmeralda con `SFX.slide` y `SFX.ting`.
* **Cámara OneTake y Secuencia:**
  1. Entrada de pastillas métricas (3 Dominios Críticos, 6 Hallazgos Formales, Alta Vulnerabilidad) con `SFX.pop`.
  2. Cascada de las 6 desviaciones con llamada visual carmesí (`SFX.slide`).
  3. Foco 1 en Software y Parches (7:50) con zoom y `SFX.ting`.
  4. Foco 2 en Redes (8:15) con zoom y `SFX.ting`.
  5. Foco 3 en Operaciones de TI y Continuidad Operativa (8:30) con zoom y `SFX.ting`.
  6. Reencuadre panorámico final.

---

### Escena 9: Paso 6 - Conclusiones, Dictamen de Auditoría y Carrusel 3D
* **Duración:** ~33 segundos
* **Identificación:** DICTAMEN FINAL & CONCLUSIONES DE AUDITORÍA • GTAG [Insignia sólida carmesí]
* **Tipografía Cinética:**
  * Título: `Conclusiones y Dictamen de Control Interno` en **DM Serif Display** (typewriter con `SFX.tick` y `SFX.ting`).
  * Subtítulo: `Evaluación Integral del Entorno de Infraestructura y Operaciones de TI en Loreto.` en **Roboto**.
* **Estructura y Puesta en Escena (Apertura Elástica de Expedientes):**
  1. **Banner Hero del Dictamen Global:**
     * Insignia destacada: `DICTAMEN DE CONTROL INTERNO: DEFICIENTE`.
     * Fundamento: *"A partir de la evaluación de los doce (12) riesgos significativos priorizados en la infraestructura y operaciones de TI del Distrito Fiscal de Loreto, el equipo auditor concluye que el entorno de control interno presenta deficiencias estructurales, lógicas y operativas que exponen a la entidad a potenciales interrupciones del servicio y vulneración de la información."*
  2. **Tres Expedientes Conclusivos:**
     * **Card 0 (Izquierda): Gobernanza y Operaciones TI:** Gestión reactiva, dependencia unipersonal del coordinador, falta de relevo capacitado y mesa de ayuda informal ante caídas del SGF *(Vulnerabilidad Operativa Alta)*.
     * **Card 1 (Centro): Seguridad Física y Ambiental:** Cuarto de servidores desprotegido, sin control estricto de accesos, sin extintor CO2 ni climatización monitoreada *(Riesgo Crítico en Centro de Cómputo)*.
     * **Card 2 (Derecha): Respaldo y Seguridad Lógica:** Sin pruebas de restauración documentadas, sin custodia externa de backups, terminales desactualizadas con Windows 10 y antivirus inactivo *(Riesgo Severo de Pérdida de Datos)*.
* **Sincronización Sonora y Puntos de Corte Exactos:**
  1. `0.4s`: Inicio del **Bloque 1 de Voz** (`Paso 6.wav`).
  2. **9:23 global (563.00s / 25.525s raw):** Finalización del Bloque 1 (-2 segundos respecto a 9:25). Graduable directamente mediante `SCENE9_AUDIO_CONFIG.part1RawDuration` en `script.js`.
  3. `9:23.40 global`: Inicio del **Bloque 2 de Voz** (`89.00s` en adelante hasta el final) sincronizado con el resplandor de los 3 expedientes.
  4. Cierre final institucional con vista panorámica fija.
