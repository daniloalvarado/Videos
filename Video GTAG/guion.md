-----------------------------------------------------------------------------------------------
ESCENA 1: PORTADA INSTITUCIONAL Y MARCO GTAG

En esta presentación les compartiremos cómo realizamos la auditoría de infraestructura y operaciones de TI en la sede central de Iquitos del Distrito Fiscal de Loreto, revisando paso a paso sus principales riesgos y controles bajo los estándares de la guía GTAG.

-----------------------------------------------------------------------------------------------
PASO 1: EVALUACIÓN Y PRIORIZACIÓN DE RIESGOS DE TI (GTAG SECCIÓN 10)

En una auditoría de infraestructura y operaciones de TI, el primer paso nunca es probar controles a ciegas. Siguiendo las directrices de la guía GTAG (Sección 10) y la Norma Global de Auditoría Interna 13.2, el encargo comienza identificando y valorando rigurosamente las amenazas y vulnerabilidades que ponen en riesgo la disponibilidad, integridad y confidencialidad de los servicios tecnológicos de la organización.

---

### ACTO 1: UNIVERSO AUDITABLE Y DESPRENDIMIENTO CELULAR DE RIESGOS (Masa Líquida Viscosa)
En el panel de control inicial, definimos el universo auditable: un total de **32 riesgos tecnológicos** identificados en la sede central de Iquitos del Distrito Fiscal de Loreto. 

Para cuantificar su severidad, aplicamos la fórmula técnica de valoración: **Probabilidad multiplicada por Impacto**. 

A través de un proceso de separación y desprendimiento celular —representado visualmente por la división elástica de una masa líquida viscosa (*metaball gooey filter*)— se produce el filtrado crítico del universo:
* **20 riesgos** de niveles Bajo y Medio quedan descartados del alcance prioritario, permitiendo enfocar los recursos de auditoría donde el impacto es real.
* **12 riesgos críticos**, correspondientes a los niveles Alto y Muy Alto, se desprenden y decantan como el núcleo central que debe ser evaluado y auditado de manera exhaustiva.

---

### ACTO 2: MATRIZ 5×5 DE PROBABILIDAD E IMPACTO (Mapeo Bidimensional)
Para comprender la criticidad de estos eventos, la cámara enfoca y amplía la **Matriz 5×5 de Probabilidad e Impacto**:
* En el **eje vertical (Y)** medimos la **Probabilidad de ocurrencia**, en una escala del 1 (muy improbable) al 5 (frecuente o casi seguro).
* En el **eje horizontal (X)** cuantificamos el **Impacto operativo e institucional**, en una escala del 1 (insignificante) al 5 (catastrófico para la función fiscal).

Al cruzar ambas variables, la matriz distribuye los riesgos en cinco zonas de calor claramente diferenciadas: **Muy Bajo (1–4)** en verde suave, **Bajo (5–9)** en amarillo, **Medio (10–14)** en ámbar, **Alto (15–19)** en anaranjado y **Muy Alto (20–25)** en rojo carmesí.

En pantalla observamos el destello y pulsación de las celdas críticas: los valores **15, 16, 20 y 25**, donde convergen las amenazas que pueden paralizar las investigaciones fiscales, provocar la pérdida irreversible de carpetas electrónicas o dejar incomunicadas a las sedes provinciales.

---

### ACTO 3: TABLA DE LOS 12 RIESGOS PRIORIZADOS (Detalle por Componente)
Al abrirse la tabla a pantalla completa, examinamos el impacto directo y la trazabilidad de los doce riesgos priorizados:

* En **Respaldo y Recuperación**, identificamos tres riesgos Altos: **R01**, por la falta de pruebas de restauración que impide garantizar la recuperación de bases de datos; **R07**, por no tener copias fuera del local (*off-site*) actualizadas ante un siniestro en sede central; y **R17**, por el peligro de sustracción de medios magnéticos físicos sin custodia bajo llave.
* En **Centro de Datos**, el riesgo **R12**, de nivel Alto, advierte sobre fallas térmicas y daño en servidores debido a problemas de climatización y humedad en la selva.
* En **Infraestructura Física**, se ubican dos amenazas críticas: el riesgo **R02**, de nivel Alto, por el ingreso no autorizado al cuarto de cómputo; y el **R20**, calificado como **Muy Alto**, por la manipulación accidental, desconexión o daño de servidores debido al ingreso de personal administrativo a imprimir.
* En conectividad y plataformas, el componente **Dispositivos de Red** presenta el riesgo **R16**, calificado como **Muy Alto**, por la caída o saturación de enlaces hacia las fiscalías provinciales. En **Gestión de Parches**, el **R26**, de nivel Alto, expone estaciones con sistemas operativos obsoletos y sin soporte; mientras que en **Software y Antivirus**, el **R27** alcanza nivel **Muy Alto** ante el peligro inminente de propagación masiva de malware en la red institucional.
* Finalmente, en **Operaciones de TI**, se concentran tres factores clave: el riesgo **R09**, de nivel Alto, por tickets de soporte desatendidos o no medidos; el **R24**, de nivel **Muy Alto**, por la paralización del Sistema de Gestión Fiscal (SGF) ante fallas de componentes dependientes; y el **R28**, calificado como Alto, por la severa dependencia operativa y falta de personal de relevo ante la ausencia del único coordinador de TI.

---

### ACTO 4: EVIDENCIA EN CAMPO (Carrusel 3D - 4 Dominios Críticos con Imágenes)
Para contrastar la teoría con la realidad operativa, la presentación eleva un **Carrusel 3D con imágenes fotográficas capturadas in situ** en la sede central de Iquitos, agrupadas en cuatro frentes críticos:

1. **Tarjeta 1: Cuarto de Servidores y Climatización (Riesgos R02, R12, R20 - Imagen `saladeservidores.jpg`)**
   * *Dominio:* Seguridad Física y Ambiental.
   * *Evidencia visual:* La imagen revela el cuarto de cómputo donde la cerradura permanece sin llave durante la jornada, permitiendo el ingreso indiscriminado de personal ajeno para imprimir documentos, con cableado expuesto, sin extintores vigentes ni sistema de climatización monitoreado frente a la temperatura y humedad extremas de Iquitos.

2. **Tarjeta 2: Bases de Datos Fiscales y Custodia (Riesgos R01, R07, R17 - Imagen `gestordebasededatos.jpg`)**
   * *Dominio:* Respaldo y Recuperación.
   * *Evidencia visual:* La captura expone la consola de administración de bases de datos. Si bien se generan respaldos locales, nunca se han ejecutado pruebas de restauración con el Administrador de Base de Datos (DBA), los discos externos carecen de custodia bajo llave y no se remiten copias fuera del local (*off-site*), arriesgando la pérdida definitiva de miles de carpetas fiscales ante un fallo de disco o desastre.

3. **Tarjeta 3: Endpoints y Protección Antivirus (Riesgos R26, R27 - Imagen `antivirus.jpg`)**
   * *Dominio:* Software, Gestión de Parches y Seguridad Lógica.
   * *Evidencia visual:* La fotografía evidencia estaciones de trabajo operando con Windows 10 desactualizado y sin soporte oficial del fabricante, consolas de antivirus inactivas o con firmas desfasadas, y la ausencia de políticas automáticas de bloqueo por inactividad, dejando los puestos de los fiscales expuestos a ataques de ransomware y filtración de expedientes.

4. **Tarjeta 4: Mesa de Ayuda y Continuidad del SGF (Riesgos R09, R24, R28 - Imagen `mesadeayuda.png`)**
   * *Dominio:* Operaciones de TI y Gestión de Incidentes.
   * *Evidencia visual:* La interfaz muestra la plataforma de soporte técnico. Se evidencia la falta de registro de solicitudes verbales o informales, la ausencia de métricas de tiempos de respuesta ante caídas del Sistema de Gestión Fiscal (SGF) y el riesgo institucional que representa la concentración de contraseñas y procedimientos en una sola persona, sin manuales ni personal de contingencia asignado.


--------------------------------------

PASO 2


Una vez identificados y priorizados los riesgos críticos, el auditor no inventa qué debería haber en la organización. El Paso 2 consiste en determinar los **controles esperados**: la línea base técnica y organizativa que la entidad debió diseñar e implementar para mitigar esas amenazas y asegurar la continuidad operativa

Para los riesgos **R02** y **R20** —de accesos no autorizados y manipulación accidental por personal ajeno—, el control exige puertas bajo llave, registro formal de ingresos y la prohibición estricta de usar el cuarto para tareas administrativas. Y para el riesgo **R12** —falla por sobrecalentamiento—, se define un ambiente climatizado, con monitoreo térmico y extintores vigentes

Frente al riesgo **R01** de perder bases de datos críticas, el control demanda coordinar y evidenciar pruebas periódicas de restauración con el DBA. Para el riesgo **R07**, exige calendarios de copias fuera de sitio (*off-site*); y para el **R17**, que los medios físicos de respaldo estén inventariados, bajo llave y cifrados

Ante el riesgo **R26** de vulnerabilidades en sistemas obsoletos, el control establece operar solo con sistemas con soporte del fabricante, parches al día y bloqueo por inactividad. Y para el riesgo **R27** —infección por malware—, exige protección antimalware centralizada con firmas activas y filtrado de tráfico web

Para el riesgo **R16** de caídas e incomunicación de sedes remotas, el control esperado es el monitoreo proactivo de enlaces de datos, midiendo disponibilidad y saturación en lugar de esperar la queja del usuario

Frente al riesgo **R09** de incidentes perdidos o atendidos tarde, el estándar es una mesa de ayuda formal que clasifique y mida tiempos de respuesta. Para el riesgo **R24** —paralización de los sistemas centrales—, un protocolo formal de diagnóstico y escalamiento rápido; y para el riesgo **R28**, la designación de personal técnico de respaldo y manuales operativos que eliminen la dependencia de una sola persona»


--------------------------------------------------------------

PASO 3

Con los controles esperados ya definidos en el Paso 2, el auditor no asume que estos existen solo porque una política los mencione. El Paso 3 consiste en solicitar y recopilar la evidencia que demostrará si los controles se diseñaron e implementaron en la realidad operativa. La Norma Global 14.1 y la GTAG exigen que esta evidencia sea rigurosa, suficiente y confiable, estructurándose en una tabla formal que combina códigos de trazabilidad, descripciones precisas y técnicas de obtención especializadas

Al recorrer la tabla de evidencias de manera integral, encontramos diecisiete fuentes probatorias clave:

En el frente de **indagación**, se recopilan los testimonios técnicos: el cuestionario inicial de setiembre en **E1**, la entrevista complementaria en **E5**, la indagación informal al personal en **E14**, y el cuestionario formal de auditoría de octubre en **E17**, todos dirigidos al Analista Coordinador y su equipo.

Mediante **inspección documental**, se examina la gestión interna: el Plan de Mantenimiento Preventivo 2022 en **E2** y el de 2026 en elaboración en **E8**; el Reglamento de Organización y Funciones en **E3**; el Plan de Continuidad Operativa en **E6**; el inventario de equipos 2025 en **E7**; el directorio telefónico del Distrito Fiscal en **E9**; y la Directiva 006 de la Contraloría sobre Control Interno en **E19**.

En el mismo rubro documental, se incorpora el **marco legal obligatorio**: la Ley de Protección de Datos Personales en **E10**; los Lineamientos de SGSI de la PCM en **E11**; la Ley de Gobierno Digital en **E12**; y el artículo 324 del Código Procesal Penal sobre reserva de la investigación en **E13**.

Y finalmente, mediante **observación directa** presencial, se obtienen las fichas de verificación in situ: la ficha del área de informática de setiembre en **E4**, y la inspección ocular del área y del cuarto de servidores realizada el primero de octubre en **E18**.

--------------------------------------------------------------

PASO 4: PRUEBAS DE CUMPLIMIENTO

Una vez recopiladas las evidencias en el Paso 3, el equipo auditor procede en el Paso 4 al diseño y ejecución formal de las pruebas de cumplimiento. El objetivo es corroborar mediante pruebas cruzadas —combinando observación en campo, análisis documental cruzado e indagación técnica— si los controles operaron de manera continua y efectiva en la sede central de Iquitos.

En una primera escena se auditan los componentes A, B y C: en Seguridad Física (A), se evalúan los accesos y registros del cuarto de servidores (R02, R20) y las condiciones ambientales y extintores (R12); en Respaldo y Recuperación (B), se revisa el cronograma de copias del PCO, el almacenamiento fuera del local y las pruebas de restauración con el DBA (R01, R07), además de la custodia bajo llave de los medios (R17); y en Software y Seguridad Lógica (C), se inspeccionan los sistemas sin soporte técnico (R26) y la protección antimalware (R27).

En una segunda escena se evalúan los componentes D y E: en Redes y Telecomunicaciones (D), se solicitan los reportes de monitoreo de capacidad y disponibilidad de enlaces provinciales (R16); y en Operaciones de TI y Gestión de Incidentes (E), se somete a prueba el registro de tickets en la mesa de ayuda (R09), el diagnóstico y escalamiento ante caídas del Sistema de Gestión Fiscal (R24) y la existencia formal de personal técnico de respaldo en el ROF y PCO (R28).

--------------------------------------------------------------

PASO 5: DETERMINACIÓN DE DESVIACIONES (HALLAZGOS IDENTIFICADOS)

Con las pruebas de cumplimiento ejecutadas, el auditor formaliza en el Paso 5 las desviaciones o hallazgos detectados, estructurados en dos escenas clave:

ESCENA 7 - PARTE 1 (COMPONENTES A Y B):
- Componente A (Controles Ambientales y de Seguridad Física):
  * R02 y R20: No se registran los ingresos, el personal de Indicadores entra sin acompañamiento y la cerradura no se usa durante la jornada. No hay procedimiento de autorización, el acceso no se basa en el cargo y la capacitación en seguridad física es ocasional.
  * R12: No se identificaron las amenazas ambientales del cuarto ni hay una política sobre lo que puede guardarse en él, que no se mantiene libre de materiales. La ubicación no protege de calor, humedad y polvo y no hay extintores, alarmas ni procedimiento de respuesta.
- Componente B (Respaldo y Recuperación):
  * R01: No existe una programación de pruebas de restauración ni se solicita al DBA nacional evidencia de su ejecución. Los requisitos de almacenamiento local y remoto no están formalizados.
  * R07: El calendario de respaldo remoto no se cumple, los requisitos de almacenamiento fuera del local no están formalizados y no se prueban periódicamente las copias.
  * R17: No existe procedimiento para la custodia de los medios, no se evidenció cifrado ni inventario, el acceso no se limita y no hay salvaguardas físicas.

ESCENA 8 - PARTE 2 (COMPONENTES C, D Y E):
- Componente C (Software, Gestión de Parches y Seguridad Lógica):
  * R26: Los sistemas no se configuran de forma segura y las estaciones con Windows 10 no reciben actualizaciones. El bloqueo automático por inactividad y el cifrado de información son nulos.
  * R27: La protección antimalware no está activa y actualizada en todas las estaciones y no hay filtrado de tráfico web. La capacitación sobre seguridad de la información es ocasional y no hay distribución centralizada de la protección.
- Componente D (Redes y Telecomunicaciones):
  * R16: No se elaboran informes de capacidad de los enlaces ni existe un proceso de recopilación de datos de disponibilidad. El monitoreo es puramente reactivo.
- Componente E (Operaciones de TI y Gestión de Incidentes):
  * R09: No se registran todas las peticiones e incidentes, la clasificación solo se aplica a lo que ingresa por la plataforma y no se prioriza según tiempos de respuesta definidos.
  * R24: El diagnóstico es informal y depende del coordinador. Las caídas y sus causas no se registran. El escalamiento al equipo nacional no tiene tiempos de respuesta definidos para asegurar el restablecimiento del servicio.
  * R28: No hay personal técnico de respaldo ni documentación de procedimientos operativos estándar (manuales) suficiente para reducir la dependencia de una sola persona.

--------------------------------------------------------------

PASO 6: CONCLUSIONES Y DICTAMEN DE AUDITORÍA (ESCENA 9)

A partir de la evaluación de los doce (12) riesgos significativos priorizados en la infraestructura y operaciones de TI del Distrito Fiscal de Loreto, el equipo auditor concluye que el entorno de control interno presenta deficiencias estructurales, lógicas y operativas que exponen a la entidad a potenciales interrupciones del servicio y vulneración de la información.

Se concluye que:

La gestión de TI opera bajo un enfoque reactivo y con alta dependencia de los conocimientos de un único coordinador local. La ausencia de personal de respaldo capacitado, sumada a la falta de formalidad en el registro de la mesa de ayuda y en los escalamientos al equipo nacional, limita la capacidad de respuesta ante caídas del Sistema de Gestión Fiscal (SGF).

El cuarto de servidores, núcleo tecnológico de la sede, opera en un estado de vulnerabilidad física al carecer de restricciones estrictas de acceso, extintores y condiciones de climatización monitoreadas, contraviniendo las buenas prácticas para centros de datos.

Los controles preventivos y de contingencia son insuficientes. Existen estaciones operando con sistemas sin soporte y protección antimalware inactiva. Asimismo, las copias de seguridad se gestionan sin pruebas de restauración demostrables, sin cifrado y sin salvaguardas físicas fuera del local (off-site), lo que compromete la disponibilidad de la información ante un desastre.

Las desviaciones expuestas requieren que la administración del Distrito Fiscal formule e implemente un plan de acción correctivo a la brevedad.







