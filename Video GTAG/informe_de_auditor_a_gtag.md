# AUDITORÍA DE INFRAESTRUCTURA Y OPERACIONES DE TI (GTAG)
## INFORME DE APLICACIÓN PRÁCTICA
**Fecha del Informe:** 9 de noviembre de 2026

| CAMPO | DETALLE |
| :--- | :--- |
| **NOMBRE DE LA ENTIDAD AUDITADA:** | Ministerio Público, Fiscalía de la Nación - Distrito Fiscal de Loreto. |
| **ÁREA EFECTO DE LA AUDITORÍA:** | Controles de infraestructura tecnológica y operaciones de TI en el Área de Informática (Coordinación de TI). |
| **OBJETIVO:** | Aplicar procedimientos basados en GTAG para evaluar riesgos y controles de infraestructura y operaciones de TI, documentando la evidencia y las desviaciones identificadas en su contexto empresarial. |
| **CÓDIGO DE LA AUDITORIA:** | AUD-MPL-GTAG-11-26 |
| **LUGAR DE AUDITORÍA:** | Sede Central Iquitos (Área de Informática y Cuarto de Servidores). |
| **NORMATIVA APLICADA Y EXCEPCIONES:** | - **Normativa:** Guía GTAG "Auditing Computing Infrastructure and IT Operations", Reglamento de Organización y Funciones N.° 001-2018-MP-FN y Normas Globales de Auditoría Interna.<br>- **Excepciones (Limitaciones):** La evaluación se limita a los controles de infraestructura física, conectividad local y respaldos bajo administración directa de la Coordinación de TI del Distrito Fiscal, excluyendo plataformas administradas por la OCTI nacional. |
| **ALCANCE DE LA AUDITORÍA:** | Evaluación de Controles Físicos y Ambientales, Respaldo y Recuperación, Software y Seguridad Lógica, Redes y Telecomunicaciones, y Operaciones de TI. |
| **GRUPO DE TRABAJO DE AUDITORÍA:** | Equipo auditor designado para el Distrito Fiscal de Loreto. |
| **COMPONENTES AUDITORES:** | - Ramirez Ruiz, Robert Jesus (Supervisor)<br>- Alva Rengifo, Anny Celeste (Jefe de comisión)<br>- Ramirez Lopez, Jefferson Giovertty (Encargado)<br>- Alvarado Silvano, Danilo (Encargado)<br>- Reategui Tote, Lucas Alejandro (Encargado)<br>- Rengifo Pinedo, Brittany Ariana (Encargado) |
| **FECHA DE INICIO DE LA AUDITORÍA:** | 3 de noviembre de 2026. |
| **DURACIÓN ESTIMADA DEL PROCESO:** | 7 días (del 3 al 9 de noviembre de 2026). |
| **MÉTODOS, HERRAMIENTAS Y PROCEDIMIENTOS UTILIZADOS:** | **Técnicas:** Indagación, inspección documental y observación directa de los ambientes informáticos y cuarto de servidores.<br>**Herramientas:** Guía GTAG, matriz de riesgos, cuestionarios y fichas de observación. |

---

## 1. Identificación y Valoración de Riesgos

### 1.1. Metodología y Priorización 
De acuerdo con las pautas de planificación de la guía GTAG y en cumplimiento de la Norma 13.2 sobre Evaluación de riesgos del trabajo, el equipo auditor realizó un diagnóstico inicial para evaluar los riesgos relevantes de la actividad bajo revisión, empleando el catálogo metodológico Magerit v3. En este diagnóstico preliminar, se identificó un universo auditable de 32 riesgos inherentes.

Para la valoración numérica de estos riesgos, el equipo auditor aplicó una matriz de 5x5 multiplicando la Probabilidad por el Impacto para obtener el Valor, utilizando parámetros institucionales alineados a la Directiva N.° 006-2019-CG/INTEG recopilada en la evidencia E19. Por su parte, la guía GTAG *Auditing Computing Infrastructure and IT Operations* señala que el auditor aplicará su juicio profesional para definir el alcance del encargo. En línea con las Normas 13.2 y 13.3, las pruebas de auditoría buscan determinar si existen exposiciones a riesgos significativos. 

Apoyando la priorización en dichas normas y en los resultados matemáticos de la matriz de valoración, se seleccionaron para evaluación únicamente los riesgos calificados en niveles Alto y Muy Alto.

**Escala de probabilidad**
| VALOR | NIVEL | DESCRIPCIÓN |
| :---: | :--- | :--- |
| **1** | Muy baja | No hay antecedentes conocidos y se estima poco probable que ocurra. |
| **2** | Baja | Puede ocurrir de forma excepcional. |
| **3** | Media | Ocurre ocasionalmente, existen antecedentes. |
| **4** | Alta | Ocurre con frecuencia. |
| **5** | Muy alta | Ocurre de forma habitual o casi permanente. |

**Escala de impacto**
| VALOR | NIVEL | DESCRIPCIÓN |
| :---: | :--- | :--- |
| **1** | Muy bajo | Efecto insignificante sobre la operación del área. |
| **2** | Bajo | Afectación menor, recuperable sin esfuerzo significativo. |
| **3** | Medio | Interrumpe parcialmente la operación o requiere esfuerzo para recuperar. |
| **4** | Alto | Interrumpe significativamente la operación o compromete información reservada. |
| **5** | Muy alto | Paraliza la operación o genera consecuencias graves para el servicio fiscal. |

### 1.2. Riesgos Priorizados (Exposiciones Significativas)
Apoyando la priorización en las Normas 13.2 y 13.3 detalladas en la guía GTAG y en los resultados de la matriz de valoración, se seleccionaron los siguientes doce (12) riesgos calificados en niveles Alto y Muy Alto. Estos riesgos amenazan directamente los componentes de infraestructura y operaciones de TI, por lo que pasan a las fases de diseño de controles y pruebas para determinar si representan exposiciones a riesgos significativos:

| Cód | Descripción del Riesgo (Infraestructura y Operaciones TI) | Nivel de Riesgo | Componente GTAG correspondiente |
| :--- | :--- | :--- | :--- |
| **R01** | Pérdida de la información de las fiscalías ante una falla, porque no se ha comprobado que las copias de respaldo puedan restaurarse. | Alto | Respaldo y Recuperación |
| **R02** | Acceso o manipulación de las bases de datos por personas no autorizadas que ingresan al cuarto de servidores. | Alto | Infraestructura Física |
| **R07** | Pérdida de información si falla la sede, porque la copia fuera del local no está actualizada. | Alto | Respaldo y Recuperación |
| **R09** | Incidentes que se pierden o se atienden tarde, sin datos para medir la carga de trabajo ni detectar problemas recurrentes. | Alto | Operaciones de TI |
| **R12** | Falla de los servidores por sobrecalentamiento o humedad en el cuarto. | Alto | Centro de Datos |
| **R16** | Pérdida de acceso a los sistemas en las sedes por caída o lentitud de los enlaces de comunicación. | Muy Alto | Dispositivos de Red |
| **R17** | Sustracción de medios con copias de la información fiscal y pérdida del respaldo. | Alto | Respaldo y Recuperación |
| **R20** | Manipulación, desconexión o daño de los servidores por personas que ingresan al cuarto para imprimir. | Muy Alto | Infraestructura Física |
| **R24** | Paralización del registro de casos fiscales cuando falla alguno de los componentes de los que depende el SGF. | Muy Alto | Operaciones de TI |
| **R26** | Explotación de vulnerabilidades sin corrección en estaciones con un sistema operativo sin soporte. | Alto | Gestión de Parches |
| **R27** | Infección de equipos y propagación de software malicioso en la red del distrito. | Muy Alto | Software y Antivirus |
| **R28** | Paralización de la gestión de accesos y de la recuperación de servicios ante la ausencia del coordinador. | Alto | Operaciones de TI |

### 1.3. Riesgos No Prioritarios (Universo Restante) 
Para dejar constancia de que se evaluó la totalidad del entorno tecnológico (32 riesgos en total), se listan a continuación los veinte (20) riesgos restantes que obtuvieron niveles Medio y Bajo en la matriz de valoración. Conforme a la metodología ISO/IEC 27005:2022 y al enfoque de la GTAG, estos riesgos no se consideran significativos para el alcance del presente encargo y no se evalúan en este encargo:

| Cód | Descripción del Riesgo (Infraestructura y Operaciones TI) | Nivel de Riesgo | Componente GTAG correspondiente |
| :--- | :--- | :--- | :--- |
| **R03** | Exposición de datos personales y de información reservada a personas ajenas al área que circulan junto a los equipos. | Medio | Gestión de Accesos |
| **R04** | Asignación de permisos indebidos o permanencia de accesos que debieron retirarse en el SGF y el SIATF. | Medio | Gestión de Accesos |
| **R05** | Imposibilidad de atribuir a una persona las acciones realizadas con una sesión compartida. | Medio | Gestión de Accesos |
| **R06** | Accesos o acciones indebidas en los sistemas que no se detectan a tiempo por falta de revisión de los registros. | Medio | Sistemas Operativos |
| **R08** | Decisiones de mantenimiento, reposición y baja tomadas con información desactualizada de los equipos. | Bajo | Gestión de Activos |
| **R10** | Errores al conectar o reconfigurar equipos y mayor tiempo para restablecer la red ante una falla. | Bajo | Dispositivos de Red |
| **R11** | Paralización de los sistemas de las fiscalías por la falla de uno de los servidores de la sede central. | Medio | Servidores |
| **R13** | Deterioro de los servidores por el calor y el polvo que genera la impresora ubicada en el cuarto. | Medio | Centro de Datos |
| **R14** | Interrupción prolongada de los sistemas en sedes provinciales por demora o errores en la atención técnica. | Medio | Operaciones de TI |
| **R15** | Fallas recurrentes de equipos que no se detectan ni se previenen, porque los mantenimientos correctivos no se registran. | Bajo | Operaciones de TI |
| **R18** | Desconexión o daño del cableado que deja sin red a los equipos. | Bajo | Infraestructura Física |
| **R19** | Sobrecalentamiento de los servidores ante la falla del único equipo de climatización. | Medio | Centro de Datos |
| **R21** | Daño de los equipos del cuarto por ingreso de lluvia y humedad. | Medio | Centro de Datos |
| **R22** | Acceso de personas ajenas a equipos e información técnica del área. | Medio | Infraestructura Física |
| **R23** | Salida de componentes que conservan información sin haber sido dados de baja de forma segura. | Bajo | Destrucción de Hardware |
| **R25** | Fallas de funcionamiento o de seguridad del Cliente MPFN en estaciones con un sistema operativo no soportado. | Bajo | Sistemas Operativos |
| **R29** | Atenciones duplicadas, omitidas o demoradas por falta de responsables definidos. | Medio | Operaciones de TI |
| **R30** | Sedes de Iquitos sin atención presencial ante la ausencia del operador. | Bajo | Operaciones de TI |
| **R31** | Apoyo del personal voluntario que no puede planificarse ni asegurarse. | Bajo | Operaciones de TI |
| **R32** | Entrega de credenciales a una persona que se hace pasar por un usuario legítimo. | Medio | Gestión de Accesos |

---

## 2. Identificación de Controles Esperados (Enfoque GTAG)

Con base en los doce (12) riesgos significativos priorizados y siguiendo los criterios de la guía *GTAG: Auditing Computing Infrastructure and IT Operations*, el equipo auditor ha definido el "estado ideal" de los controles que se espera encontrar implementados. Cada control se establece como el parámetro de evaluación para contrastar las pruebas y determinar las desviaciones:

| Componente GTAG | Riesgo | Control Esperado (Parámetro de Evaluación) |
| :--- | :--- | :--- |
| **A. Controles Ambientales y de Seguridad Física** *(Data Centers & Physical Security)* | **R02** | Existencia de mecanismos de restricción de acceso físico en el cuarto de servidores, bajo llave, uso exclusivo para personal autorizado y registro documentado de ingresos. |
| | **R12** | Cuarto de servidores con condiciones ambientales controladas, incluyendo sistema de climatización, monitoreo de temperatura, ventanas cerradas (protección perimetral) y presencia de extintor de incendios. |
| | **R20** | Políticas y controles de acceso que prohíban estrictamente el ingreso de personal de otras áreas (no técnico) al cuarto de servidores para el uso de equipos periféricos comunes (como impresoras). |
| **B. Respaldo y Recuperación** *(Backup & Recovery)* | **R01** | Dado que la administración de bases de datos recae en la Oficina Central (proveedor interno), el control local consiste en solicitar formalmente al DBA nacional y registrar los resultados de las pruebas de restauración periódicas. |
| | **R07** | Ejecución de copias de respaldo programadas según calendario, con almacenamiento seguro fuera del local principal (*off-site*) y pruebas de restauración documentadas. |
| | **R17** | Medios físicos de respaldo debidamente inventariados, cifrados para proteger la confidencialidad de la información y custodiados bajo llave con salvaguardas físicas. |
| **C. Software, Gestión de Parches y Seguridad Lógica** *(Software & Patch Management)* | **R26** | Estaciones de trabajo operando con sistemas con soporte vigente del fabricante, actualizaciones de seguridad aplicadas, configuración segura (incluyendo bloqueo automático por inactividad) y cifrado de información. *(Nota: No aplica protección física ni eliminación segura en este control).* |
| | **R27** | Despliegue centralizado de software antimalware activo y con firmas actualizadas, filtrado de tráfico web de entrada y programas de capacitación a usuarios en seguridad de la información. |
| **D. Redes y Telecomunicaciones** *(Network Devices)* | **R16** | Uso de herramientas y procedimientos de monitoreo proactivo para medir y reportar la disponibilidad y capacidad de los enlaces de comunicaciones, escalando informes a la Oficina Central. |
| **E. Operaciones de TI y Gestión de Incidentes** *(IT Operations & Incident Response)* | **R09** | Sistema formal de mesa de ayuda que registre la totalidad de peticiones e incidentes locales, clasificándolos por prioridad con tiempos de respuesta definidos. |
| | **R24** | Procedimiento documentado de diagnóstico local ante caídas del Sistema de Gestión Fiscal (SGF), registrando las causas y evidenciando el escalamiento oportuno y seguimiento al equipo nacional (proveedor central). |
| | **R28** | Existencia de personal técnico de respaldo debidamente designado, acompañado de manuales o procedimientos operativos documentados que permitan mantener la operatividad ante la ausencia del coordinador. |

---

## 3. Solicitud de Evidencia (Instrumentos de Verificación)

### 3.1. Técnicas de auditoría y evidencias

| TÉCNICA | EN QUÉ CONSISTE | EVIDENCIA |
| :--- | :--- | :--- |
| **Indagación** | Preguntar al responsable cómo se ejecuta el control. Por sí sola no basta para concluir que el control funciona. | E1, E5, E14 y E17 |
| **Observación directa** | Ver el control mientras se ejecuta o las condiciones del lugar. | E4 y E18 |
| **Inspección documental** | Revisar documentos, registros o configuraciones. | E2, E3, E6, E7, E8, E9, E10, E11, E12, E13 y E19 |

| CÓDIGO | DESCRIPCIÓN | TÉCNICA |
| :--- | :--- | :--- |
| **E1** | Cuestionario al Analista Coordinador de TI 18/09/2026 | Indagación |
| **E2** | Plan de mantenimiento preventivo 2022 | Inspección documental |
| **E3** | Reglamento de Organización y Funciones 001-2018-MP-FN v3.0 | Inspección documental |
| **E4** | Ficha de observación directa del área de informática, 18/09/2026 | Observación directa |
| **E5** | Entrevista complementaria al Analista Coordinador de TI, setiembre 2026 | Indagación |
| **E6** | Plan de Continuidad Operativa, R.J. 0506-2025-ANC-MP-J | Inspección documental |
| **E7** | Inventario de equipos 2025 | Inspección documental |
| **E8** | Plan de mantenimiento preventivo 2026 (en elaboración) | Inspección documental |
| **E9** | Directorio telefónico del Distrito Fiscal de Loreto | Inspección documental |
| **E10** | Ley N.° 29733 - Protección de Datos Personales | Inspección documental |
| **E11** | Resolución SGTD N.° 003-2023-PCM/SGTD - Lineamientos de SGSI para entidades públicas | Inspección documental |
| **E12** | Decreto Legislativo N.° 1412 - Ley de Gobierno Digital | Inspección documental |
| **E13** | Código Procesal Penal, art. 324 - Reserva de la investigación preparatoria | Inspección documental |
| **E14** | Indagación informal a personal del área de informática, setiembre 2026 | Indagación |
| **E17** | Cuestionario de auditoría al Analista Coordinador de TI, 01/10/2026 | Indagación |
| **E18** | Ficha de observación directa del área de informática y del cuarto de servidores, 01/10/2026 | Observación directa |
| **E19** | Directiva N.° 006-2019-CG/INTEG - Implementación del Sistema de Control Interno | Inspección documental |

### 3.2. Vinculación de técnicas y evidencias por Componente GTAG 
Para evitar depender exclusivamente de la técnica de indagación (la cual por sí sola es insuficiente para sustentar la efectividad de un control), el equipo auditor combinó la observación directa, la indagación y la inspección documental rigurosa. A continuación, se detallan las evidencias específicas utilizadas para evaluar los controles esperados de los doce (12) riesgos significativos *(excluyendo las normativas, las cuales fungen como criterio y no como evidencia de operatividad)*:

| Componente GTAG | Riesgos | Estrategia de Evaluación | Evidencias Vinculadas |
| :--- | :--- | :--- | :--- |
| **A. Controles Ambientales y de Seguridad Física** *(Data Centers & Physical Security)* | R02, R12, R20 | Combinación de la observación directa del cuarto de servidores con la indagación al personal para verificar accesos y condiciones. | **E4, E18** (Fichas de observación)<br>**E5, E17** (Entrevista y cuestionario) |
| **B. Respaldo y Recuperación** *(Backup & Recovery)* | R01, R07, R17 | Inspección de documentación formal de contingencia e inventario, contrastándolos con indagación sobre la ausencia de actas de prueba y falta de custodia. | **E6, E7** (Inspección documental)<br>**E1, E5** (Cuestionario y entrevista) |
| **C. Software, Gestión de Parches y Seguridad Lógica** *(Software & Patch Management)* | R26, R27 | Inspección del registro de activos y observación directa en campo para comprobar versiones de Windows sin soporte y estado del antimalware. | **E7** (Inspección documental)<br>**E18** (Ficha de observación)<br>**E14** (Indagación informal) |
| **D. Redes y Telecomunicaciones** *(Network Devices)* | R16 | Requerimiento de informes de monitoreo (inspección); ante su inexistencia, evaluación sustentada mediante indagación formal al coordinador. | **E5, E17** (Entrevista y cuestionario) |
| **E. Operaciones de TI y Gestión de Incidentes** *(IT Operations & Incident Response)* | R09, R24, R28 | Inspección de manuales organizacionales y de contingencia, revisión de la mesa de ayuda (comprobando falta de tickets), corroborado mediante entrevistas. | **E3, E6** (Inspección documental)<br>**E1, E5** (Cuestionario y entrevista) |

---

## 4. Diseño y Ejecución de Pruebas

Con base en la evidencia solicitada en la fase anterior, el equipo auditor diseñó y ejecutó los siguientes procedimientos y pruebas de cumplimiento para evaluar la efectividad de los controles en la infraestructura y operaciones de TI:
*(Nota: Las pruebas de indagación referencian directamente los cuestionarios y entrevistas aplicadas, eliminando la nomenclatura aislada de preguntas "P" para evitar duplicidades de codificación).*

| Componente GTAG | Riesgos | Procedimiento y Prueba de Cumplimiento | Evidencia |
| :--- | :--- | :--- | :--- |
| **A. Controles Ambientales y de Seguridad Física** *(Data Centers & Physical Security)* | **R02 y R20** | Verificar mediante observación directa en múltiples visitas y revisión de cuestionarios formales e informales el uso de la cerradura, la restricción de acceso y el registro de ingresos al cuarto de servidores. | **E4, E18, E5, E17** |
| | **R12** | Inspeccionar físicamente y mediante entrevistas el cuarto de servidores para validar las condiciones ambientales, la ubicación de los equipos frente a amenazas físicas y la presencia de controles ambientales (como extintores). | **E4, E18, E5** |
| **B. Respaldo y Recuperación** *(Backup & Recovery)* | **R01 y R07** | Evaluar mediante inspección documental cruzada con indagación la programación formal de copias de seguridad en el Plan de Continuidad Operativa, el cumplimiento del almacenamiento fuera del local y la ejecución periódica de pruebas de restauración. | **E1, E5, E6** |
| | **R17** | Observar en campo y contrastar con los registros documentales las medidas físicas de protección, resguardo bajo llave y el inventario formal de los medios de respaldo de información. | **E4, E5, E7** |
| **C. Software, Gestión de Parches y Seguridad Lógica** *(Software & Patch Management)* | **R26** | Inspeccionar el inventario institucional y contrastar mediante indagación informal el uso de sistemas operativos sin soporte y la falta de cifrado. | **E7, E14** |
| | **R27** | Verificar mediante observación directa en campo y entrevista el estado inactivo de la protección antimalware. | **E18, E5** |
| **D. Redes y Telecomunicaciones** *(Network Devices)* | **R16** | Solicitar documentales de informes de monitoreo de enlaces y, ante su inexistencia, sustentar mediante entrevista e indagación formal la falta de monitoreo proactivo. | **E5, E17** |
| **E. Operaciones de TI y Gestión de Incidentes** *(IT Operations & Incident Response)* | **R09** | Solicitar la revisión del sistema de mesa de ayuda; al constatar físicamente la falta de tickets o registros, sustentar la observación mediante entrevista y cuestionario. | **E1, E4, E5** |
| | **R24** | Inspeccionar el Plan de Continuidad Operativa cruzado con entrevista para validar la ausencia de diagnóstico local formal y falta de registro de escalamiento al equipo nacional ante caídas del sistema. | **E6, E5** |
| | **R28** | Inspeccionar el Reglamento de Organización y Funciones y el Plan de Continuidad Operativa, corroborado con indagación, comprobando la falta de personal de respaldo designado formalmente. | **E3, E6, E1, E5** |

---

## 5. Determinación de Desviaciones

Tras la ejecución de las pruebas de auditoría detalladas en el numeral anterior, se determinaron las siguientes desviaciones o deficiencias operativas frente a los controles esperados, las cuales representan hallazgos formales en la infraestructura y operaciones de TI de la entidad:

| Componente GTAG | Riesgos | Desviación Identificada (Hallazgo) |
| :--- | :--- | :--- |
| **A. Controles Ambientales y de Seguridad Física** *(Data Centers & Physical Security)* | **R02 y R20** | No se registran los ingresos, el personal de Indicadores entra sin acompañamiento y la cerradura no se usa durante la jornada. No hay procedimiento de autorización, el acceso no se basa en el cargo y la capacitación en seguridad física es ocasional. |
| | **R12** | No se identificaron las amenazas ambientales del cuarto ni hay una política sobre lo que puede guardarse en él, que no se mantiene libre de materiales. La ubicación no protege de calor, humedad y polvo y no hay extintores, alarmas ni procedimiento de respuesta. |
| **B. Respaldo y Recuperación** *(Backup & Recovery)* | **R01** | No existe una programación de pruebas de restauración ni se solicita al DBA nacional evidencia de su ejecución. Los requisitos de almacenamiento local y remoto no están formalizados. |
| | **R07** | El calendario de respaldo remoto no se cumple, los requisitos de almacenamiento fuera del local no están formalizados y no se prueban periódicamente las copias. |
| | **R17** | No existe procedimiento para la custodia de los medios, no se evidenció cifrado ni inventario, el acceso no se limita y no hay salvaguardas físicas. |
| **C. Software, Gestión de Parches y Seguridad Lógica** *(Software & Patch Management)* | **R26** | Los sistemas no se configuran de forma segura y las estaciones con Windows 10 no reciben actualizaciones. El bloqueo automático por inactividad y el cifrado de información son nulos. |
| | **R27** | La protección antimalware no está activa y actualizada en todas las estaciones y no hay filtrado de tráfico web. La capacitación sobre seguridad de la información es ocasional y no hay distribución centralizada de la protección. |
| **D. Redes y Telecomunicaciones** *(Network Devices)* | **R16** | No se elaboran informes de capacidad de los enlaces ni existe un proceso de recopilación de datos de disponibilidad. El monitoreo es puramente reactivo. |
| **E. Operaciones de TI y Gestión de Incidentes** *(IT Operations & Incident Response)* | **R09** | No se registran todas las peticiones e incidentes, la clasificación solo se aplica a lo que ingresa por la plataforma y no se prioriza según tiempos de respuesta definidos. |
| | **R24** | El diagnóstico es informal y depende del coordinador. Las caídas y sus causas no se registran. El escalamiento al equipo nacional no tiene tiempos de respuesta definidos para asegurar el restablecimiento del servicio. |
| | **R28** | No hay personal técnico de respaldo ni documentación de procedimientos operativos estándar (manuales) suficiente para reducir la dependencia de una sola persona. |

---

## 6. Conclusiones

A partir de la evaluación de los doce (12) riesgos significativos priorizados en la infraestructura y operaciones de TI del Distrito Fiscal de Loreto, el equipo auditor concluye que el entorno de control interno presenta deficiencias estructurales, lógicas y operativas que exponen a la entidad a potenciales interrupciones del servicio y vulneración de la información. 

De manera específica, se concluye lo siguiente:
*   **Gobernanza y Operaciones:** La gestión de TI opera bajo un enfoque reactivo y con alta dependencia de los conocimientos de un único coordinador local. La ausencia de personal de respaldo capacitado, sumada a la falta de formalidad en el registro de la mesa de ayuda y en los escalamientos al equipo nacional, limita la capacidad de respuesta ante caídas del Sistema de Gestión Fiscal (SGF).
*   **Seguridad Física y Ambiental:** El cuarto de servidores, núcleo tecnológico de la sede, opera en un estado de vulnerabilidad física al carecer de restricciones estrictas de acceso, extintores y condiciones de climatización monitoreadas, contraviniendo las buenas prácticas para centros de datos.
*   **Respaldo y Seguridad Lógica:** Los controles preventivos y de contingencia son insuficientes. Existen estaciones operando con sistemas sin soporte y protección antimalware inactiva. Asimismo, las copias de seguridad se gestionan sin pruebas de restauración demostrables, sin cifrado y sin salvaguardas físicas fuera del local (*off-site*), lo que compromete la disponibilidad de la información ante un desastre.

Las desviaciones expuestas requieren que la administración del Distrito Fiscal formule e implemente un plan de acción correctivo a la brevedad.

---

## 7. Anexos

*   **Anexo 1: Matriz de Diagnóstico Inicial (Magerit v3).** Presentación del universo auditable total de 32 riesgos inherentes evaluados mediante la matriz de 5x5 (Probabilidad por Impacto), la cual sustentó la priorización del presente encargo.
*   **Anexo 2: Evidencia Fotográfica (Observación Directa).** Registro visual de las deficiencias ambientales y de seguridad física en el cuarto de servidores (Evidencias E4 y E18), así como del estado de las estaciones de trabajo.
*   **Anexo 3: Instrumentos de Indagación.** Formatos aplicados correspondientes a los cuestionarios de auditoría (E1, E17) y guías de entrevista (E5).
*   **Anexo 4: Matriz de Riesgos y Controles (Evaluación de Diseño y Riesgo Residual).** Matriz metodológica que consolida la causa, el efecto, la clasificación del control y la estimación del riesgo final tras las pruebas de campo.

### Anexo 4: Matriz de Riesgos y Controles (Evaluación de Diseño y Riesgo Residual)

| Cód | Riesgo (Evento) | Control Esperado | Clasificación del Control | Causa de la Desviación | Efecto (Consecuencia) | Evaluación del Riesgo Residual |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **R01** | Pérdida de la información ante una falla, porque no se ha comprobado restauración. | Solicitar al DBA nacional y registrar resultados de pruebas de restauración. | **Correctivo** (Garantiza la recuperación). | Inexistencia de programación local formal ni solicitud de evidencias al DBA nacional. | Imposibilidad de restablecer bases de datos tras un fallo grave, paralizando la gestión fiscal. | **Alto.** Al no validarse la restauración, el riesgo de pérdida permanente de datos no se mitiga. |
| **R02** | Acceso o manipulación de bases de datos por ingresos no autorizados al cuarto. | Restricción física bajo llave, uso exclusivo y registro de ingresos. | **Preventivo** (Evita el acceso físico). | Falta de un procedimiento formal de autorización basado en el cargo y omisión en el uso de la cerradura. | Exposición del hardware a manipulación, robo o daño por parte de personal ajeno al área de TI. | **Alto.** Al no operar el control preventivo, el cuarto de servidores se mantiene expuesto. |
| **R07** | Pérdida de información si falla la sede por copia *off-site* no actualizada. | Copias programadas según calendario, con almacenamiento seguro *off-site* y pruebas. | **Preventivo / Correctivo** | Incumplimiento del calendario y falta de formalización de requisitos para el resguardo remoto. | Imposibilidad de recuperación ante un desastre físico que afecte la sede central de Iquitos. | **Alto.** Sin copias remotas efectivas, un desastre local representa un punto único de fallo. |
| **R09** | Incidentes perdidos o atendidos tarde, sin medir carga ni recurrencias. | Sistema formal de mesa de ayuda que registre, clasifique y mida tiempos. | **Detectivo / Correctivo** | Clasificación exclusiva a lo ingresado vía plataforma, dejando peticiones sin registro ni priorización de tiempos. | Retrasos prolongados en la solución de fallos técnicos de los usuarios y pérdida de trazabilidad. | **Alto.** La gestión reactiva y no documentada impide medir y mejorar la calidad del servicio. |
| **R12** | Falla de servidores por sobrecalentamiento o humedad. | Cuarto con climatización, monitoreo, ventanas cerradas y extintor. | **Preventivo** (Control ambiental). | Inexistencia de identificación de amenazas, sin extintor, ubicación expuesta al polvo y sin política de uso de espacio. | Daño físico irreversible al hardware crítico y paradas no programadas por sobrecalentamiento. | **Alto.** La ausencia de controles ambientales físicos deja al hardware totalmente vulnerable. |
| **R16** | Pérdida de acceso en sedes por enlaces de red caídos o lentos. | Monitoreo proactivo con reporte de disponibilidad y capacidad a nivel nacional. | **Detectivo** (Identifica problemas de red). | Proceso de atención puramente reactivo y ausencia total de recopilación de datos de desempeño. | Interrupción prolongada de los sistemas en fiscalías provinciales sin detección temprana por parte de TI. | **Muy Alto.** Sin monitoreo, el equipo desconoce las fallas hasta que la operación fiscal ya está paralizada. |
| **R17** | Sustracción de medios con copias fiscales. | Medios inventariados, cifrados y custodiados bajo llave con salvaguardas. | **Preventivo / Detectivo** | Ausencia de procedimiento de custodia, sin limitaciones de acceso y falta total de cifrado de la data. | Fuga de información reservada y confidencial de expedientes fiscales a terceros no autorizados. | **Alto.** La falta de cifrado y llaves deja la información crítica a disposición de cualquier persona. |
| **R20** | Manipulación, desconexión o daño por ingresos para imprimir. | Políticas de acceso que prohíban estrictamente ingreso de personal no técnico. | **Preventivo** (Protege integridad física). | Ingreso de personal de Indicadores sin acompañamiento y falta de capacitación en seguridad física. | Desconexión accidental de servidores críticos, interrumpiendo directamente los sistemas fiscales. | **Muy Alto.** El cruce de funciones administrativas dentro del área crítica aumenta la probabilidad de accidentes. |
| **R24** | Paralización del registro de casos por falla del SGF. | Procedimiento documentado de diagnóstico, causas y escalamiento al nivel nacional. | **Detectivo / Correctivo** | Diagnóstico informal, alta dependencia del coordinador y falta de tiempos definidos para el escalamiento. | Extensión del tiempo de inactividad del sistema core (SGF), paralizando la atención de denuncias. | **Muy Alto.** La falta de estandarización en la respuesta demora el restablecimiento del servicio crítico. |
| **R26** | Explotación de vulnerabilidades en estaciones Win10 sin soporte. | SO con soporte, actualizaciones aplicadas, bloqueo por inactividad y cifrado. | **Preventivo** (Seguridad lógica). | Estaciones con versiones desfasadas sin parches, ausencia de bloqueo inactivo y falta de cifrado. | Compromiso total del equipo local, permitiendo acceso no autorizado y posible pérdida de datos locales. | **Alto.** La brecha de seguridad permite que amenazas de red comprometan fácilmente las terminales. |
| **R27** | Infección de equipos y propagación de malware en la red. | Antimalware activo centralizado y filtrado de tráfico web. | **Preventivo / Detectivo** | Protección inactiva en estaciones, ausencia de bloqueos USB y falta de filtrado web. | Propagación rápida de software malicioso (como ransomware) a través de toda la red del distrito. | **Muy Alto.** La falta de antivirus funcional y de control USB abre la puerta a infecciones masivas en la red. |
| **R28** | Paralización por ausencia imprevista del coordinador TI. | Personal técnico de respaldo y documentación de manuales operativos (POE). | **Preventivo** (Continuidad del negocio). | Alta concentración de conocimiento en una persona, sin personal de contingencia debidamente capacitado. | Incapacidad de gestionar accesos, resolver caídas complejas o coordinar con la sede nacional ante ausencias. | **Alto.** La dependencia de una sola persona representa un riesgo operativo crítico para el área de Informática. |

---
<br>

**ELABORÓ**
Ramirez Lopez, Jefferson Giovertty
AUDITOR INFORMÁTICO SENIOR

<br>

**VALIDÓ**
Ramirez Ruiz, Robert Jesus
Supervisor

<br>

**AUTORIZÓ**
Alva Rengifo, Anny Celeste
Jefe de Comisión