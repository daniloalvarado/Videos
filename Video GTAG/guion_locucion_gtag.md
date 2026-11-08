# Guion Técnico Visual - Video GTAG S10 (Sin Voces ni Diálogos)

**Formato:** Video Web Animado 1920x1080 (HyperFrames / GSAP)  
**Estilo:** Glassmorphism + Cinematografía OneTake + SFX Sincronizados  
**Locución:** Desactivada (100% Visual y Tipográfico)  

---

## Estructura Modular (9 Escenas: E1 - E9)

### Escena 1: Portada Institucional y Marco GTAG
* **Duración:** ~8.5 segundos
* **Fondo:** Sede Central Iquitos (Ministerio Público - Loreto) con desenfoque de profundidad (`blur: 10px`) y efecto vidrio esmerilado.
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
* **Transición:** Barrido dinámico Wipe (`SFX.whoosh`).

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
  1. La cámara desciende y hace **Zoom Cinematográfico** (`scale: 1.25, y: -70`) directo a la **Tabla de Controles Esperados**:
     * Contenedor con vidrio esmerilado centrado simétricamente (`max-width: 1560px`).
     * Columnas: *Componente GTAG* (Azul Tecnológico), *Riesgo* (Insignia R01-R28) y *Control Esperado* (Parámetro técnico detallado).
  2. Las 12 filas van ascendiendo de forma progresiva (`y: -540`) a velocidad de lectura natural.
  3. Las filas superiores se van desvaneciendo suavemente en el borde superior mediante la máscara de degradado vertical, mientras van emergiendo los controles subsiguientes (A. Físicos, B. Respaldo, C. Parches, D. Redes, E. Operaciones).
  4. Reencuadre panorámico final institucional.

---

### Escena 4: Paso 3 - Solicitud de Evidencias e Instrumentos (E1 - E19)
* **Duración:** ~24 segundos
* **Identificación:** APLICACIÓN PRÁCTICA • PASO 3 (Sustento Forense de Auditoría)
* **Tipografía Cinética:**
  * Título: `Solicitud de Evidencias e Instrumentos` (typewriter con `SFX.tick` y `SFX.ting`).
  * Subtítulo: `17 Instrumentos y Fuentes de Información Requeridos para Evaluar la Operatividad de los Controles (Técnicas GTAG).`
* **Diseño Visual de Badges y Contenedores:**
  * 3 Cuadros superiores expandidos y simétricos (`Indagación: 4`, `Observación: 2`, `Inspección: 11`) con bordes perimetrales finos (sin barras gruesas a la izquierda) y amplio margen inferior (34px) de separación con la tabla.
  * Tabla centralizada de 1560px con máscara suave en degradado y visor fluido.
* **Cámara OneTake y Secuencia de Recorrido Forense:**
  1. Entrada en pop escalonado de los 3 cuadros superiores (`SFX.pop`) y cascada alterna de las 17 filas de evidencias.
  2. Barrido vertical mediante Haz Láser Forense (`#evidence-scan-beam`) con sonido `SFX.slide`.
  3. **Fase 1 - Observación Directa:** Zoom cinematográfico (`scale: 1.08`), foco púrpura en el cuadro y pulso lumínico en las evidencias físicas (E4 y E18) con `SFX.ting`.
  4. **Fase 2 - Recorrido y Enfoque en Inspección Documental:** La tabla recorre suavemente hacia las evidencias documentales centrales (E6 a E13). Foco en el cuadro de Inspección (`#pill-inspeccion`) con resplandor dorado ámbar (`SFX.ting`) y destello en las filas de PCO, Inventario, Leyes y Reglamentos (`.row-tech-inspeccion`).
  5. **Fase 3 - Recorrido hasta el Final Absoluto:** La tabla continúa su desplazamiento hasta `y: -490px`, revelando con total claridad las evidencias de cierre (E14, E17, E18 y E19), activando `SFX.ting` y resplandor dual de verificación.
  6. **Fase 4 - Reencuadre Panorámico:** Retorno al encuadre 1920x1080 maestro para la transición.

---

### Escena 5: Paso 4 (Parte 1) - Diseño y Ejecución de Pruebas: Seguridad Física, Respaldo y Software (Componentes A, B, C)
* **Duración:** ~17 segundos
* **Identificación:** APLICACIÓN PRÁCTICA • PASO 4 (PARTE 1)
* **Tipografía Cinética:**
  * Título: `Diseño y Ejecución de Pruebas de Cumplimiento` (typewriter con `SFX.tick` y `SFX.ting`).
  * Subtítulo: `Evaluación de Efectividad Operativa en Infraestructura Física, Respaldos y Seguridad Lógica.`
* **Contenido de Pruebas:**
  * **Componente A (Seguridad Física):** R02 y R20 (cerradura, acceso físico y registro del cuarto) [E4, E18, E5, E17] | R12 (condiciones ambientales, climatización y extintores) [E4, E18, E5].
  * **Componente B (Respaldo y Recuperación):** R01 y R07 (cronograma de copias PCO, off-site y pruebas de restauración) [E1, E5, E6] | R17 (custodia física bajo llave e inventario de medios) [E4, E5, E7].
  * **Componente C (Software y Parches):** R26 (SO sin soporte Windows 10 y falta de cifrado) [E7, E14] | R27 (antimalware inactivo y firmas desactualizadas) [E18, E5].
* **Cámara OneTake y Secuencia:**
  1. Entrada de pastillas métricas (3 Componentes, 6 Pruebas) con `SFX.pop`.
  2. Despliegue de tabla y cascada de las 6 pruebas.
  3. Foco 1 en Componente A (Cuarto de Servidores) con pulso violeta y `SFX.ting`.
  4. Foco 2 en Componente B (Respaldos) con pulso dorado y `SFX.ting`.
  5. Foco 3 en Componente C (Software) con pulso azul tecnológico y `SFX.ting`.
  6. Retorno panorámico.

---

### Escena 6: Paso 4 (Parte 2) - Diseño y Ejecución de Pruebas: Redes y Operaciones TI (Componentes D, E)
* **Duración:** ~16 segundos
* **Identificación:** APLICACIÓN PRÁCTICA • PASO 4 (PARTE 2)
* **Tipografía Cinética:**
  * Título: `Diseño y Ejecución de Pruebas de Cumplimiento` (typewriter con `SFX.tick` y `SFX.ting`).
  * Subtítulo: `Evaluación en Redes, Telecomunicaciones, Mesa de Ayuda y Continuidad Operativa de TI.`
* **Contenido de Pruebas:**
  * **Componente D (Redes y Telecomunicaciones):** R16 (solicitud de reportes de enlaces, constatando falta de monitoreo proactivo) [E5, E17].
  * **Componente E (Operaciones TI):** R09 (revisión de mesa de ayuda, falta de tickets formales) [E1, E4, E5] | R24 (ausencia de diagnóstico local formal y falta de registro ante caídas del SGF) [E6, E5] | R28 (inspección de ROF y PCO, ausencia de personal técnico de respaldo) [E3, E6, E1, E5].
* **Cámara OneTake y Secuencia:**
  1. Entrada de métricas (2 Componentes, 4 Pruebas Críticas).
  2. Cascada de filas.
  3. Foco 1 en Redes (R16 - Enlaces provinciales caídos) con pulso carmesí y `SFX.ting`.
  4. Foco 2 en Operaciones TI (R09, R24, R28) con pulso azul y `SFX.ting`.
  5. Retorno panorámico general.

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
* **Duración:** ~17.5 segundos
* **Identificación:** APLICACIÓN PRÁCTICA • PASO 5 (PARTE 2) [Insignia sólida carmesí]
* **Tipografía Cinética:**
  * Título: `Determinación de Desviaciones y Hallazgos` en **DM Serif Display** (typewriter con `SFX.tick` y `SFX.ting`).
  * Subtítulo: `Incumplimientos en Software Lógico, Red Provincial y Operaciones de TI.` en **Roboto**.
* **Contenido de Desviaciones (Hallazgos Críticos):**
  * **Componente C (Software, Parches y Seguridad Lógica):**
    * *R26:* Los sistemas no se configuran de forma segura y las estaciones con Windows 10 no reciben actualizaciones. El bloqueo automático por inactividad y el cifrado de información son nulos.
    * *R27:* La protección antimalware no está activa y actualizada en todas las estaciones y no hay filtrado de tráfico web. La capacitación sobre seguridad de la información es ocasional y no hay distribución centralizada de la protección.
  * **Componente D (Redes y Telecomunicaciones):**
    * *R16:* No se elaboran informes de capacidad de los enlaces ni existe un proceso de recopilación de datos de disponibilidad. El monitoreo es puramente reactivo.
  * **Componente E (Operaciones TI e Incidentes):**
    * *R09:* No se registran todas las peticiones e incidentes, la clasificación solo se aplica a lo que ingresa por la plataforma y no se prioriza según tiempos de respuesta definidos.
    * *R24:* El diagnóstico es informal y depende del coordinador. Las caídas y sus causas no se registran. El escalamiento al equipo nacional no tiene tiempos de respuesta definidos para asegurar el restablecimiento del servicio.
    * *R28:* No hay personal técnico de respaldo ni documentación de procedimientos operativos estándar (manuales) suficiente para reducir la dependencia de una sola persona.
* **Cámara OneTake y Secuencia:**
  1. Entrada de pastillas métricas (3 Dominios Críticos, 6 Hallazgos Formales, Alta Vulnerabilidad) con `SFX.pop`.
  2. Cascada de las 6 desviaciones con llamada visual carmesí (`SFX.slide`).
  3. Foco 1 en Software y Parches (R26, R27) con zoom y `SFX.ting`.
  4. Foco 2 en Redes (R16) con zoom y `SFX.ting`.
  5. Foco 3 en Operaciones de TI y Continuidad Operativa (R09, R24, R28) con zoom y `SFX.ting`.
  6. Reencuadre panorámico final.

---

### Escena 9: Paso 6 - Conclusiones, Dictamen de Auditoría y Carrusel 3D
* **Duración:** ~19.5 segundos
* **Identificación:** DICTAMEN FINAL & CONCLUSIONES DE AUDITORÍA • GTAG [Insignia sólida carmesí]
* **Tipografía Cinética:**
  * Título: `Conclusiones y Dictamen de Control Interno` en **DM Serif Display** (typewriter con `SFX.tick` y `SFX.ting`).
  * Subtítulo: `Evaluación Integral del Entorno de Infraestructura y Operaciones de TI en Loreto.` en **Roboto**.
* **Estructura y Puesta en Escena (Carrusel 3D):**
  1. **Banner Hero del Dictamen Global:**
     * Insignia destacada: `DICTAMEN DE CONTROL INTERNO: DEFICIENTE`.
     * Fundamento: *"A partir de la evaluación de los doce (12) riesgos significativos priorizados en la infraestructura y operaciones de TI del Distrito Fiscal de Loreto, el equipo auditor concluye que el entorno de control interno presenta deficiencias estructurales, lógicas y operativas que exponen a la entidad a potenciales interrupciones del servicio y vulneración de la información."*
  2. **Carrusel 3D de 3 Ejes Conclusivos (120° de separación):**
     * **Card 0 (0°): Gobernanza y Operaciones:** Gestión de TI reactiva, alta dependencia unipersonal del coordinador, falta de personal de respaldo y mesa de ayuda informal ante caídas del SGF *(Vulnerabilidad Operativa Alta)*.
     * **Card 1 (120°): Seguridad Física y Ambiental:** Cuarto de servidores en estado de vulnerabilidad física, sin restricciones estrictas de acceso, sin extintores ni climatización monitoreada *(Riesgo Crítico en Centro de Cómputo)*.
     * **Card 2 (240°): Respaldo y Seguridad Lógica:** Controles preventivos insuficientes, terminales con Windows 10 desactualizados, antimalware inactivo y copias de seguridad sin pruebas de restauración ni custodia off-site *(Riesgo Severo de Pérdida de Datos)*.
* **Secuencia de Entrada & Sincronización Sonora Exacta (3 Posiciones Únicas):**
  1. `0.0s`: Apertura de escena con `SFX.whoosh()`.
  2. `0.35s - 1.4s`: Escritura tipográfica del título con `SFX.tick` y subtítulo con márgenes amplios y equilibrados.
  3. `1.8s`: Entrada suave del banner del Dictamen con `SFX.slide()`.
  4. `2.5s`: Entrada y elevación del Carrusel 3D con `SFX.whoosh()`.
  5. `3.2s`: **Posición 1 (Frente: 0°):** Bloqueo en **Card 0 (Gobernanza TI)**, pulso lumínico e iluminación de dot 0 con **`SFX.ting()`** único.
  6. `7.5s - 8.6s`: **Posición 2 (Frente: 120°):** Rotación con `SFX.whoosh()` y fijación en **Card 1 (Centro de Cómputo)** con **`SFX.ting()`** y dot 1.
  7. `13.0s - 14.1s`: **Posición 3 (Frente: 240°):** Rotación con `SFX.whoosh()` y fijación en **Card 2 (Respaldo y Seguridad Lógica)** con **`SFX.ting()`** y dot 2.
  8. `14.5s - 19.0s`: **Cierre Estable:** Se mantiene la vista fija en la tercera tarjeta, concluyendo de forma limpia y definitiva sin vueltas repetidas ni reaparición redundante de la primera tarjeta.
