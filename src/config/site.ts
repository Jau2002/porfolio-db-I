const info = new Map<string, string>([
  ["name", "Jaume Suarez"],
  ["career", "Ingeniería de Sistemas"],
  ["university", "Universidad El Bosque"],
  ["subject", "Bases de Datos 1"],
  ["title", "E-portafolio"],
]);

export interface NavLink {
  href: string;
  label: string;
}

export interface EvidenciaCategoria {
  id: string;
  numero: string;
  titulo: string;
}

export interface DiagramaModelado {
  id: string;
  titulo: string;
  etiqueta?: string;
  /** Contenido de contexto en formato Markdown */
  contextoMd: string;
  /** Ruta de la imagen PNG/SVG en /public */
  imagenSrc?: string;
  /** Si el diagrama en /public está en formato .drawio.html interactivo */
  embedHtmlSrc?: string;
  /** Archivo a descargar al pulsar el botón abajo a la derecha */
  descargaSrc: string;
  descargaNombre?: string;
  /** Conclusiones y qué se aprendió al finalizar este ejercicio */
  conclusionMd: string;
}

export interface TablaNormalizacion {
  titulo: string;
  subtitulo?: string;
  columnas: string[];
  filas: string[][];
}

export interface EjercicioNormalizacion {
  id: string;
  titulo: string;
  etiqueta?: string;
  contextoMd: string;
  /** Ruta del archivo descargable (PDF o Excel) */
  archivoSrc: string;
  archivoNombre?: string;
  /** Tablas estructuradas para representar esquemas, dependencias y pasos de normalización */
  tablas?: TablaNormalizacion[];
  /** Conclusiones y qué se aprendió al finalizar este ejercicio */
  conclusionMd: string;
}

export interface EjercicioSQL {
  id: string;
  /** Título de lo esperado en la consulta */
  tituloEsperado: string;
  etiqueta?: string;
  /** Sentencia o código SQL */
  sentenciaSql: string;
  /** Explicación o resultado obtenido */
  respuestaTexto?: string;
  /** Tabla de resultado de la consulta */
  respuestaTabla?: {
    columnas: string[];
    filas: (string | number)[][];
  };
  /** Conclusiones y aprendizaje del ejercicio SQL */
  conclusionMd?: string;
}

export interface RecursoProyecto {
  id: string;
  titulo: string;
  subtitulo: string;
  explicacionMd: string;
  tablas?: TablaNormalizacion[];
  imagenes?: {
    titulo: string;
    contexto: string;
    src: string;
    pdfSrc?: string;
  }[];
  documentosPdf?: {
    categoria?: string;
    titulo: string;
    descripcion: string;
    src: string;
  }[];
  conclusionMd?: string;
}

export const SITE_META = {
  name: info.get("name"),
  role: `${info.get("career")} · ${info.get("university")}`,
  pageTitle: `${info.get("name")} — E-portafolio · ${info.get("subject")}`,
  description: `${info.get("title")} — ${info.get("subject")}, ${info.get("career")}.`,
  videoSrc:
    "https://dbportfoliostatics.blob.core.windows.net/containerblobs/presentation.mp4",
};

export const NAV_LINKS: NavLink[] = [
  { href: "#presentacion", label: "Presentación" },
  { href: "#evidencias", label: "Evidencias" },
];

export const EVIDENCIA_CATEGORIAS: EvidenciaCategoria[] = [
  { id: "modelado", numero: "01", titulo: "Modelado" },
  { id: "normalizacion", numero: "02", titulo: "Normalización" },
  { id: "sql", numero: "03", titulo: "SQL" },
  { id: "proyecto", numero: "04", titulo: "Proyecto" },
];

export const DIAGRAMAS_MODELADO: DiagramaModelado[] = [
  {
    id: "ejercicio-1",
    titulo: "Ejercicio 1 — Taller Automotriz y Órdenes de Trabajo",
    etiqueta: "Ejercicio 1 · MER",
    contextoMd: `### Contexto del problema
Modelado Entidad-Relación para la gestión integral de un **taller de servicio automotriz**.

- **Entidades principales:** \`CLIENTE\`, \`AUTOMOVIL\`, \`TECNICO\`, \`DIAGNOSTICO\`, \`ORDEN_TRABAJO\`, \`FACTURA\`, \`ADMINISTRACION\` y \`COMPONENTE\`.
- **Atributos compuestos y derivados:** \`nombre_completo\` desglosado en nombres y apellidos; \`costo_total\` calculado como atributo derivado en el diagnóstico.
- **Jerarquía de especialización (ISA):** La entidad \`COMPONENTE\` se especializa en \`ACEITE\` (*densidad*), \`FILTRO\` (*tipo*), \`BATERIA\` (*amperaje, voltaje*) y \`NEUMATICO\` (*ancho, perfil, diámetro*).
- **Relación recursiva:** Entre \`TECNICO\` con roles de *Mecánico* y *Especialista* (\`Asistir\` M:N).`,
    embedHtmlSrc: "/ejercicio_1.drawio.html",
    descargaSrc: "/ejercicio_1.drawio.html",
    descargaNombre: "ejercicio_1.drawio.html",
    conclusionMd:
      "Se comprendió cómo representar jerarquías de especialización (**ISA**) cuando distintos subtipos de una entidad (`COMPONENTE`) poseen atributos técnicos exclusivos que no deben dejarse como valores nulos en una única tabla general, así como el uso de relaciones recursivas con roles diferenciados (*Mecánico* y *Especialista*).",
  },
  {
    id: "caso-2",
    titulo: "Caso 2 / Ejercicio 4 — Consultoría, Contratos y Equipos de Proyecto",
    etiqueta: "Caso 2 & Ejercicio 4",
    contextoMd: `### Contexto del problema
Diseño conceptual para una empresa de **servicios y consultoría por contratos** asignados a equipos de proyecto.

- **Gestión comercial:** Un \`CLIENTE\` (*nit*, *nombre_empresa*, *dirección* y atributo multivaluado *teléfonos*) suscribe un \`CONTRATO\` asociado a cada \`SERVICIO\` (*id_servicio*, *nombre_servicio*, *costo_interno*).
- **Entidad débil por existencia:** \`EQUIPO_PROYECTO\` depende del servicio asignado (\`EX\`) y agrupa a profesionales bajo una fecha de formación.
- **Supervisión jerárquica:** \`GERENTE_PROYECTO\` integra los equipos (M:N), posee atributo derivado \`sueldo_recomendado_rango\` y mantiene una relación recursiva \`requiere\` (1:1) con roles *supervisa* y *es_superior_de*.`,
    imagenSrc: "/ejecicio_4.drawio.png",
    descargaSrc: "/ejecicio_4.drawio.html",
    descargaNombre: "ejecicio_4.drawio.html",
    conclusionMd:
      "Se aprendió a distinguir cuándo un vínculo contractual requiere modelarse como entidad propia (`CONTRATO`) para conservar el historial de servicios contratados, además de aplicar **dependencia por existencia (`EX`)** en entidades débiles (`EQUIPO_PROYECTO`) cuya vida útil depende del servicio asignado.",
  },
  {
    id: "quiz-veterinaria",
    titulo: "Quiz — Clínica Veterinaria y Atención de Mascotas",
    etiqueta: "Quiz · MER",
    contextoMd: `### Contexto del problema
Modelo conceptual para el control de consultas médicas en una **clínica veterinaria**.

- **Entidades:** \`DUEÑO\`, \`MASCOTA\` y \`VETERINARIO\`.
- **Características del modelo:**
  - En \`DUEÑO\` se calcula la \`edad\` como **atributo derivado** a partir de \`fecha_nacimiento\`.
  - \`MASCOTA\` registra atributo multivaluado \`telefono\` de contacto, dirección y datos del propietario.
  - La relación \`atender\` entre \`MASCOTA\` y \`VETERINARIO\` almacena los atributos propios del evento clínico: \`fecha\`, \`motivo\` y \`fecha_ultima_consulta\`.
  - \`VETERINARIO\` se identifica por \`tarjeta_profesional\` y cuenta con atributo multivaluado \`especialidad\`.`,
    imagenSrc: "/quiz.drawio.png",
    descargaSrc: "/quiz.drawio.png",
    descargaNombre: "quiz-veterinaria.drawio.png",
    conclusionMd:
      "Se reforzó la ubicación correcta de los **atributos propios de una relación** (`fecha`, `motivo`, `fecha_ultima_consulta` dentro de `atender`), evitando almacenarlos erróneamente en `MASCOTA` o en `VETERINARIO`, junto con el uso de atributos derivados (`edad`) y multivaluados (`especialidad`).",
  },
  {
    id: "quiz-uno",
    titulo: "Quiz 1 — Propietarios, Vehículos y Reparaciones",
    etiqueta: "Quiz 1 · MER",
    contextoMd: `### Contexto del problema
Sistema de registro de **vehículos por cliente y control de reparaciones mecánicas**.

- **Propiedad (1:N):** Un \`CLIENTE\` (*cédula*, *nombre*, *dirección* y multivaluado *correo*) puede \`poseer\` de \`0...*\` instancias de \`VEHICULO\`.
- **Atributo derivado en Vehículo:** Además de la llave primaria \`placa\`, \`marca\`, \`linea\` y \`modelo\`, se modela la \`antiguedad\` como atributo derivado.
- **Historial de fallas:** La relación \`reparar\` vincula \`VEHICULO\` con \`MECANICO\` (*id*, *nombre* y multivaluado *especialidad*), registrando en la relación \`descripcion_falla\` y \`fecha_ultimo_ingreso\`.`,
    imagenSrc: "/quiz-uno.drawio.png",
    descargaSrc: "/quiz-uno.drawio.png",
    descargaNombre: "quiz-uno.drawio.png",
    conclusionMd:
      "Se interiorizó la diferencia entre cardinalidades mínimas y máximas (`1...1` frente a `0...*`) para expresar reglas de negocio como que todo vehículo registrado debe tener un propietario, mientras que un cliente puede tener varios vehículos e múltiples ingresos por reparación.",
  },
  {
    id: "quiz-dos",
    titulo: "Quiz 2 — Préstamo Institucional de Equipos y Almacén",
    etiqueta: "Quiz 2 · MER",
    contextoMd: `### Contexto del problema
Modelo con **agregación** para el control de inventario, reemplazo y préstamo de equipos institucionales.

- **Entidad débil e identificación:** \`EQUIPO\` (*referencia*, *nombre*, *año_lanzamiento*, multivaluado *proveedores*) se identifica a través de la relación débil \`poseer (ID)\` con \`ALMACEN\` (*consecutivo*, *estado*).
- **Reemplazo recursivo:** Un \`EQUIPO\` puede ser reemplazado por otro mediante la relación recursiva \`remplazar\` (1:1) con roles *es remplazada* y *se remplaza*.
- **Préstamo:** La relación \`prestar\` entre \`EQUIPO\` y \`USUARIO\` (*codigo_institucional*, *dependencia* y atributo compuesto *nombre_completo*) registra \`fecha_salida\`, \`fecha_devolucion\` y el atributo derivado \`mora\`.`,
    imagenSrc: "/quiz_dos.drawio.png",
    descargaSrc: "/quiz_dos.drawio.png",
    descargaNombre: "quiz_dos.drawio.png",
    conclusionMd:
      "Se aprendió a aplicar el concepto de **agregación (`Prestamo`)** y **dependencia por identificación (`ID`)**, entendiendo cómo una entidad débil (`EQUIPO`) requiere de la llave de `ALMACEN` para identificarse unívocamente y cómo controlar trazabilidad de reemplazos con relaciones recursivas 1:1.",
  },
  {
    id: "taller-puerto",
    titulo: "Taller — Operación Portuaria, Buques y Recaladas",
    etiqueta: "Taller · Draw.io",
    contextoMd: `### Contexto del problema
Modelado avanzado de **logística marítima y terminal portuaria** con agregación (\`deposita\`), entidades débiles y jerarquía de operarios.

- **Tráfico marítimo:** Gestión de \`SERVICIO\` (*codigo_servicio*, *puerto_origen*, *puerto_destino*), \`BUQUE\` (*imo*, *nombre_buque*, *capacidad_teu*, derivado *antiguedad*), \`CERTIFICADO\` y la entidad débil \`RECALADA\` (*fecha_arribo*, *hora_arribo*, *estado*).
- **Operación e importación:** Agregación de procesos con \`IMPORTADOR\`, entidad débil \`CORREO\`, turnos de \`IMP_REC\` y almacenamiento en \`BODEGA\`.
- **Especialización de personal:** \`OPERARIO\` con relación recursiva \`supervisar\` y jerarquía hacia \`GRUERO\` (*horas_operacion*, *tipo_certificacion*) y \`ESTIBADOR\` (*examen_medico_vigente*), además de \`CONTRATISTA\`, \`SEDE\` y \`SUMINISTRO\`.`,
    descargaSrc: "/taller.drawio",
    descargaNombre: "taller.drawio",
    conclusionMd:
      "Este ejercicio integró todos los constructos avanzados del Modelo Entidad-Relación Extendido (EER) en un dominio complejo real: **agregaciones** para relacionar procesos completos con bodegas, **entidades débiles encadenadas** (`RECALADA`), relaciones recursivas de transbordo y supervisión, y **herencia disjunta/solapada** en operarios portuarios.",
  },
  {
    id: "furvo",
    titulo: "Furvo — Torneo de Fútbol, Clasificatoria y Estadísticas",
    etiqueta: "Furvo · Draw.io",
    contextoMd: `### Contexto del problema
Modelo Entidad-Relación para la organización de un **campeonato universitario de fútbol**.

- **Competencia:** Relaciona \`EQUIPO\`, \`JUGADOR\` (*semestre*, *carrera*), \`PARTIDO\` (*tarjeta_roja*, *tarjeta_amarilla*) y \`CLASIFICATORIA\` (*puntos*).
- **Vínculos del torneo:** Incluye las relaciones \`DISPUTAR\` (M:N entre equipo y partido), \`COMPETIR\` (entre equipo y fase clasificatoria) y \`TITULAR\` (entre equipo y jugador).`,
    descargaSrc: "/Furvo.drawio",
    descargaNombre: "Furvo.drawio",
    conclusionMd:
      "Se consolidó la estructuración de relaciones muchos a muchos (`M:N`) entre equipos y partidos disputados, comprendiendo cómo separar las estadísticas de la fase clasificatoria de los eventos propios de cada encuentro deportivo.",
  },
];

export const EJERCICIOS_NORMALIZACION: EjercicioNormalizacion[] = [
  {
    id: "caso-1-hospitalizacion",
    titulo: "Caso 1 — Hospitalización (Análisis de Dependencias Transitivas, 3FN y FNBC)",
    etiqueta: "Taller · Caso 1",
    contextoMd: `### Contexto y Esquema Original
- **Esquema original (en 2FN):** \`(ID_Paciente [PK], Nombre_Paciente, Especialidad_Tratamiento, Cama_Asignada, Ala_Hospital, Médico_Tratante, Teléfono_Médico, Email_Médico, Fecha_Ingreso, Fecha_Alta)\`.
- **Diagnóstico:** Cumple **1FN** (atributos atómicos) y **2FN** (clave primaria simple \`ID_Paciente\`), pero **no cumple 3FN** debido a dos cadenas de dependencias transitivas:
  1. \`ID_Paciente → Médico_Tratante → {Teléfono_Médico, Email_Médico, Especialidad_Tratamiento}\`
  2. \`ID_Paciente → Cama_Asignada → Ala_Hospital\``,
    archivoSrc: "/Taller Normalización_BD1 Grupo DataBikers.pdf",
    archivoNombre: "Taller_Normalizacion_BD1_DataBikers.pdf",
    tablas: [
      {
        titulo: "1. Dependencias Funcionales Identificadas",
        subtitulo: "Clasificación de determinantes directos y transitivos en el esquema original",
        columnas: ["Dependencia Funcional", "Tipo", "Descripción / Regla de Negocio"],
        filas: [
          ["ID_Paciente → Nombre_Paciente, Cama_Asignada, Médico_Tratante, Fecha_Ingreso, Fecha_Alta", "Directa (PK)", "El ID identifica unívocamente al paciente, su cama, médico tratante y fechas."],
          ["Médico_Tratante → Teléfono_Médico", "Transitiva (Viola 3FN)", "El teléfono pertenece al médico, no a la hospitalización."],
          ["Médico_Tratante → Email_Médico", "Transitiva (Viola 3FN)", "El correo pertenece al médico, no al paciente."],
          ["Médico_Tratante → Especialidad_Tratamiento", "Transitiva (Viola 3FN)", "Cada médico ejerce una especialidad fija."],
          ["Cama_Asignada → Ala_Hospital", "Transitiva (Viola 3FN)", "La cama es un objeto físico anclado a un ala del hospital."],
        ],
      },
      {
        titulo: "2. Anomalías del Esquema Original (en 2FN)",
        columnas: ["Tipo de Anomalía", "Impacto en la Base de Datos"],
        filas: [
          ["Anomalía de Inserción", "No se puede registrar a un médico nuevo (con su teléfono, correo y especialidad) hasta que tenga al menos un paciente hospitalizado."],
          ["Anomalía de Actualización", "Si un médico con 8 pacientes hospitalizados cambia de teléfono, hay que actualizar 8 filas; si falla una, el médico queda con dos teléfonos distintos."],
          ["Anomalía de Eliminación", "Si el único paciente asignado a la Cama 305 recibe el alta y su fila se elimina, se pierde el registro de que esa cama existe y pertenece al Ala Norte."],
        ],
      },
      {
        titulo: "3. Esquema Resultante Normalizado (3FN y FNBC / BCNF)",
        subtitulo: "Descomposición sin pérdida y con preservación de dependencias",
        columnas: ["Tabla Resultante", "Clave Primaria (PK)", "Atributos y Claves Foráneas (FK)", "Dependencia Interna", "¿Cumple 3FN / FNBC?"],
        filas: [
          ["CAMA", "Cama_Asignada", "Ala_Hospital", "Cama_Asignada → Ala_Hospital", "Sí / Sí"],
          ["MEDICO", "Médico_Tratante", "Teléfono_Médico, Email_Médico, Especialidad_Tratamiento", "Médico_Tratante → Teléfono, Email, Especialidad", "Sí / Sí"],
          ["HOSPITALIZACION_FINAL", "ID_Paciente", "Nombre_Paciente, Cama_Asignada (FK → CAMA), Médico_Tratante (FK → MEDICO), Fecha_Ingreso, Fecha_Alta", "ID_Paciente → Nombre, Cama, Médico, Fechas", "Sí / Sí"],
        ],
      },
    ],
    conclusionMd:
      "Se aprendió que **toda tabla con clave primaria simple en 1FN está automáticamente en 2FN**, pero aun así puede sufrir graves anomalías de inserción, actualización y eliminación debido a **dependencias transitivas (violación de 3FN)**. Además, se comprobó que cuando cada tabla resultante tiene una única clave candidata simple, **3FN y la Forma Normal de Boyce-Codd (FNBC/BCNF) son equivalentes**, logrando integridad total sin sobre-normalizar.",
  },
  {
    id: "caso-2-empresa-ventas",
    titulo: "Caso 2 — Empresa de Ventas (Clave Compuesta: De 1FN a 2FN, 3FN y BCNF)",
    etiqueta: "Taller · Caso 2",
    contextoMd: `### Contexto y Esquema Original
- **Esquema original (en 1FN):** \`(ID_Pedido [PK], ID_Producto [PK], Fecha_Pedido, ID_Cliente, Nombre_Cliente, Sector_Cliente, Nombre_Producto, Precio_Producto, Cantidad_Solicitada, ID_Vendedor, Nombre_Vendedor, Comisión_Vendedor)\`.
- **Clave primaria compuesta:** \`(ID_Pedido, ID_Producto)\`.
- **Diagnóstico inicial:** Solo cumple **1FN**. Viola **2FN** porque existen atributos que dependen solo de una parte de la clave (\`ID_Pedido\` o \`ID_Producto\`), y viola **3FN** por dependencias transitivas hacia cliente y vendedor.`,
    archivoSrc: "/Taller Normalización_BD1 Grupo DataBikers.pdf",
    archivoNombre: "Taller_Normalizacion_BD1_DataBikers.pdf",
    tablas: [
      {
        titulo: "1. Matriz de Dependencias Funcionales",
        columnas: ["Dependencia Funcional", "Tipo de Dependencia", "Justificación"],
        filas: [
          ["(ID_Pedido, ID_Producto) → Cantidad_Solicitada", "Clave completa", "La cantidad solicitada es específica de qué producto se pidió en qué pedido."],
          ["ID_Pedido → Fecha_Pedido, ID_Cliente, ID_Vendedor", "Parcial (Viola 2FN)", "Cada pedido tiene una única fecha, un único cliente y un único vendedor."],
          ["ID_Producto → Nombre_Producto, Precio_Producto", "Parcial (Viola 2FN)", "El nombre y precio de catálogo pertenecen al producto, no al pedido."],
          ["ID_Cliente → Nombre_Cliente, Sector_Cliente", "Transitiva (Viola 3FN)", "El nombre y sector económico pertenecen al cliente (a través de ID_Pedido)."],
          ["ID_Vendedor → Nombre_Vendedor, Comisión_Vendedor", "Transitiva (Viola 3FN)", "El nombre y porcentaje de comisión dependen del vendedor, no del pedido."],
        ],
      },
      {
        titulo: "2. Evolución y Verificación por Pasos (1FN → 2FN → 3FN)",
        columnas: ["Paso", "Forma Normal Alcanzada", "Problema que se Corrige", "¿Surgen nuevas dependencias?"],
        filas: [
          ["Paso 1", "Transición a 2FN", "Desaparece la dependencia parcial de ID_Producto al extraer la tabla PRODUCTO.", "No surge ninguna nueva; PRODUCTO queda con clave simple."],
          ["Paso 2", "Cumple 2FN", "Desaparece la dependencia parcial de ID_Pedido al separar PEDIDO y DETALLE_PEDIDO.", "Se hacen visibles las dependencias transitivas dentro de PEDIDO (Cliente y Vendedor)."],
          ["Paso 3", "Cumple 3FN y BCNF", "Desaparecen las dependencias transitivas al extraer las tablas CLIENTE y VENDEDOR.", "No surge ninguna; cada una de las 5 tablas depende únicamente de su clave primaria."],
        ],
      },
      {
        titulo: "3. Esquema Final Normalizado (5 Tablas en 3FN / BCNF)",
        columnas: ["Tabla", "Clave Primaria (PK)", "Atributos No Primos / Claves Foráneas (FK)"],
        filas: [
          ["CLIENTE", "ID_Cliente", "Nombre_Cliente, Sector_Cliente"],
          ["VENDEDOR", "ID_Vendedor", "Nombre_Vendedor, Comisión_Vendedor"],
          ["PRODUCTO", "ID_Producto", "Nombre_Producto, Precio_Producto"],
          ["PEDIDO", "ID_Pedido", "Fecha_Pedido, ID_Cliente (FK → CLIENTE), ID_Vendedor (FK → VENDEDOR)"],
          ["DETALLE_PEDIDO", "(ID_Pedido, ID_Producto)", "ID_Pedido (FK → PEDIDO), ID_Producto (FK → PRODUCTO), Cantidad_Solicitada"],
        ],
      },
    ],
    conclusionMd:
      "Se comprendió el flujo completo de descomposición desde **1FN → 2FN → 3FN** cuando existe una **llave primaria compuesta**: primero se deben separar las dependencias parciales para aislar la tabla puente transaccional (`DETALLE_PEDIDO`) de la cabecera (`PEDIDO`) y el catálogo (`PRODUCTO`), lo cual deja expuestas las dependencias transitivas que finalmente se resuelven en 3FN creando las entidades maestras (`CLIENTE` y `VENDEDOR`).",
  },
  {
    id: "caso-3-empleados-multivaluados",
    titulo: "Caso 3 — Empleados con Múltiples Competencias e Idiomas (Violación de 1FN y Producto Cartesiano)",
    etiqueta: "Taller · Caso 3",
    contextoMd: `### Contexto y Esquema Original
- **Esquema original (UNF — No Normalizado):** Un solo registro almacena listas de valores múltiples en la misma fila.
- **Violación de 1FN:** Tanto \`Competencias_Técnicas\` (\`{Python, Java, SQL}\`) como \`Idiomas\` (\`{Español, Inglés, Francés}\`) contienen múltiples valores no atómicos.
- **Efecto al pasar a 1FN en una sola tabla:** Exige generar el **producto cartesiano** (\`3 competencias × 3 idiomas = 9 filas\` para \`Empleado_1\`) con clave compuesta \`(ID_Empleado, Competencia, Idioma)\`, repitiendo \`Nombre_Empleado\` en cada fila (dependencia parcial que motiva subir a 2FN/4FN).`,
    archivoSrc: "/Taller Normalización_BD1 Grupo DataBikers.pdf",
    archivoNombre: "Taller_Normalizacion_BD1_DataBikers.pdf",
    tablas: [
      {
        titulo: "1. Tabla Original (Viola 1FN — Atributos Multivaluados)",
        columnas: ["ID_Empleado", "Nombre_Empleado", "Competencias_Técnicas (No Atómico)", "Idiomas (No Atómico)"],
        filas: [
          ["1", "Empleado_1", "Python, Java, SQL", "Español, Inglés, Francés"],
        ],
      },
      {
        titulo: "2. Tabla Normalizada a 1FN (Producto Cartesiano: 3 × 3 = 9 Filas)",
        subtitulo: "Clave Primaria Compuesta: (ID_Empleado, Competencias_Técnicas, Idiomas)",
        columnas: ["ID_Empleado (PK)", "Nombre_Empleado (Redundante)", "Competencias_Técnicas (PK)", "Idiomas (PK)"],
        filas: [
          ["1", "Empleado_1", "Python", "Español"],
          ["1", "Empleado_1", "Python", "Inglés"],
          ["1", "Empleado_1", "Python", "Francés"],
          ["1", "Empleado_1", "Java", "Español"],
          ["1", "Empleado_1", "Java", "Inglés"],
          ["1", "Empleado_1", "Java", "Francés"],
          ["1", "Empleado_1", "SQL", "Español"],
          ["1", "Empleado_1", "SQL", "Inglés"],
          ["1", "Empleado_1", "SQL", "Francés"],
        ],
      },
      {
        titulo: "3. Comparativa: Columna de Texto vs. Tabla en 1FN",
        columnas: ["Enfoque", "Ventajas", "Desventajas"],
        filas: [
          [
            "Columna de texto ('Python,Java,SQL')",
            "• Una sola fila por empleado (compacto).\n• Sin redundancia del nombre del empleado.\n• Simple si el dato solo se muestra y nunca se filtra.",
            "• Viola 1FN (no es atómico).\n• Buscar con LIKE '%Python%' no usa índices y da falsos positivos.\n• Texto libre sin validación; actualizar implica reescribir todo el string.",
          ],
          [
            "Tabla en 1FN",
            "• Cumple 1FN: cada celda es atómica.\n• Búsqueda exacta e indexable (WHERE Competencia = 'Python').\n• COUNT y GROUP BY directos sin JOINs.",
            "• Redundancia: Nombre_Empleado se repite en cada fila.\n• Producto cartesiano (competencias × idiomas).\n• Presenta anomalías de inserción, actualización y eliminación que se corrigen en 2FN y superiores.",
          ],
        ],
      },
    ],
    conclusionMd:
      "Se aprendió por qué **guardar listas separadas por comas en una columna de texto es un antipatrón relacional** (rompe la atomicidad de 1FN, inhabilita índices y complica agregaciones), pero también se demostró que aplanar dos atributos multivaluados independientes en una sola tabla 1FN produce un **producto cartesiano redundante** que obliga a separar los datos maestros del empleado en formas normales superiores.",
  },
  {
    id: "avanzado-1-envio-internacional",
    titulo: "Taller Avanzado · Ejercicio 1 — Sistema de Envío Internacional de Mercancía (43 Atributos → 11 Relaciones en 3FN)",
    etiqueta: "Taller Avanzado · Ej. 1",
    contextoMd: `### Contexto y Relación Original (ENVIO)
- **Relación inicial sin normalizar (43 atributos):** La tabla universal \`ENVIO\` contiene dos grupos repetidos anidados: los **paquetes** que ampara una guía y, dentro de cada paquete, sus **eventos de rastreo**.
- **Llave primaria compuesta al aplanar a 1FN:** \`(num_guia, cod_paquete, cod_evento)\`, que representa la jerarquía \`guía → paquete → evento\`.
- **Observación clave del análisis de muestra:** Aunque el diccionario sugiere que \`estado_evento\` depende de la tripleta completa, la muestra evidencia que \`E1\` es siempre *«Recogido»*, \`E2\` *«En aduana»* y \`E3\` *«Entregado»*; por tanto, \`cod_evento → estado_evento\` es una dependencia parcial que se separa en el catálogo \`TIPO_EVENTO\`, mientras que \`fecha_evento\` y \`descripcion_evento\` sí dependen de la llave completa.`,
    archivoSrc: "/taller_normalizacion_avanzado_JaumeSuarez.pdf",
    archivoNombre: "taller_normalizacion_avanzado_JaumeSuarez.pdf",
    tablas: [
      {
        titulo: "1. Dependencias Funcionales Identificadas (11 DF sobre los 43 Atributos)",
        columnas: ["N.º", "Determinante", "Atributos que Determina Funcionalmente"],
        filas: [
          ["DF 1", "num_guia", "fecha_guia, hora_guia, orgn_nit, dest_id, cod_empleado, placa_vehiculo, cod_pago"],
          ["DF 2", "orgn_nit", "orgn_nombre, orgn_actividad, orgn_ciudad, orgn_pais, orgn_direccion, orgn_telefono, orgn_celular"],
          ["DF 3", "dest_id", "dest_nombre, dest_direccion, dest_telefono, dest_cod_ciudad"],
          ["DF 4", "dest_cod_ciudad", "dest_ciudad, dest_pais, dest_km_desde_origen, cod_zona"],
          ["DF 5", "cod_zona", "nombre_zona, tarifa_base_zona"],
          ["DF 6", "cod_empleado", "nombre_empleado, licencia_empleado"],
          ["DF 7", "placa_vehiculo", "tipo_vehiculo, capacidad_vehiculo"],
          ["DF 8", "cod_pago", "metodo_pago, valor_pagado"],
          ["DF 9", "cod_paquete", "num_guia, tipo_paquete, nombre_paquete, descripcion_paquete, peso_paquete, valor_declarado, cant_unidades, valor_flete_paquete"],
          ["DF 10", "cod_evento", "estado_evento"],
          ["DF 11", "num_guia, cod_paquete, cod_evento", "fecha_evento, descripcion_evento"],
        ],
      },
      {
        titulo: "2. Reglas Incumplidas y Transición 1FN → 2FN → 3FN",
        columnas: ["Etapa", "Diagnóstico / Regla Aplicada", "Descomposición Realizada"],
        filas: [
          [
            "1FN",
            "Eliminación de grupos repetidos anidados (paquetes y eventos por paquete).",
            "ENVIO_1FN con PK compuesta (num_guia, cod_paquete, cod_evento) y 40 atributos descriptivos.",
          ],
          [
            "2FN",
            "Eliminación de dependencias parciales respecto a la tripleta (num_guia, cod_paquete, cod_evento).",
            "Se divide en 4 relaciones: GUIA_2FN (PK: num_guia), PAQUETE (PK: cod_paquete), TIPO_EVENTO (PK: cod_evento) y EVENTO_RASTREO (PK: num_guia, cod_paquete, cod_evento).",
          ],
          [
            "3FN",
            "Eliminación de 7 dependencias transitivas contenidas dentro de GUIA_2FN (incluyendo la cadena dest_id → dest_cod_ciudad → cod_zona).",
            "Se extraen REMITENTE, DESTINATARIO, CIUDAD_DESTINO, ZONA, EMPLEADO, VEHICULO y PAGO, dejando GUIA solo con fecha, hora y 5 claves foráneas.",
          ],
        ],
      },
      {
        titulo: "3. Esquema Relacional Final en 3FN (11 Relaciones — Reunión sin Pérdida)",
        subtitulo: "Cada una de las 11 dependencias funcionales queda preservada en una única tabla",
        columnas: ["Relación", "Clave Primaria (PK)", "Atributos Descriptivos", "Claves Foráneas (FK)"],
        filas: [
          ["GUIA", "num_guia", "fecha_guia, hora_guia", "orgn_nit → REMITENTE · dest_id → DESTINATARIO · cod_empleado → EMPLEADO · placa_vehiculo → VEHICULO · cod_pago → PAGO"],
          ["REMITENTE", "orgn_nit", "orgn_nombre, orgn_actividad, orgn_ciudad, orgn_pais, orgn_direccion, orgn_telefono, orgn_celular", "—"],
          ["DESTINATARIO", "dest_id", "dest_nombre, dest_direccion, dest_telefono", "dest_cod_ciudad → CIUDAD_DESTINO"],
          ["CIUDAD_DESTINO", "dest_cod_ciudad", "dest_ciudad, dest_pais, dest_km_desde_origen", "cod_zona → ZONA"],
          ["ZONA", "cod_zona", "nombre_zona, tarifa_base_zona", "—"],
          ["EMPLEADO", "cod_empleado", "nombre_empleado, licencia_empleado", "—"],
          ["VEHICULO", "placa_vehiculo", "tipo_vehiculo, capacidad_vehiculo", "—"],
          ["PAGO", "cod_pago", "metodo_pago, valor_pagado", "—"],
          ["PAQUETE", "cod_paquete", "tipo_paquete, nombre_paquete, descripcion_paquete, peso_paquete, valor_declarado, cant_unidades, valor_flete_paquete", "num_guia → GUIA"],
          ["TIPO_EVENTO", "cod_evento", "estado_evento", "—"],
          ["EVENTO_RASTREO", "(num_guia, cod_paquete, cod_evento)", "fecha_evento, descripcion_evento", "num_guia → GUIA · cod_paquete → PAQUETE · cod_evento → TIPO_EVENTO"],
        ],
      },
    ],
    conclusionMd:
      "Se aprendió a contrastar el **diccionario de datos contra la muestra real de registros** para descubrir dependencias parciales ocultas (`cod_evento → estado_evento`), así como a desanidar jerarquías multinivel (`guía → paquete → evento`) y cadenas transitivas encadenadas (`dest_id → dest_cod_ciudad → cod_zona`) garantizando reunión natural sin pérdida en las 11 tablas resultantes.",
  },
  {
    id: "avanzado-2-videoclub",
    titulo: "Taller Avanzado · Ejercicio 2 — Sistema Integral de Video Club (Llave de 4 Atributos → 13 Relaciones en 3FN)",
    etiqueta: "Taller Avanzado · Ej. 2",
    contextoMd: `### Contexto y Relación Original (ALQUILER)
- **Grupos repetidos y multivaluados independientes:** La tabla universal \`ALQUILER\` mezcla alquileres, membresías, clientes, planes, sucursales, casetes, películas, directores, categorías y actores. Un alquiler incluye varios casetes, y cada película tiene múltiples **actores** y múltiples **categorías** independientes entre sí (lo que genera un producto cartesiano \`actor × categoría\` al aplanar).
- **Llave primaria compuesta en 1FN:** \`(cod_alquiler, cod_cassette, cod_actor, cod_categoria)\` con 32 atributos descriptivos restantes.
- **Decisiones de diseño en 3FN:**
  1. *Separación entre medio físico (\`CASSETTE\`) y obra (\`PELICULA\`):* Como el rol de un actor y las categorías pertenecen a la película y no a la copia física del casete, en 3FN \`CASSETTE_ACTOR\` y \`CASSETTE_CATEGORIA\` se transforman en \`PELICULA_ACTOR\` y \`PELICULA_CATEGORIA\`.
  2. *Atributos derivados (DF 13 y 14):* \`dias_retraso\` (\`fecha_real_dev - fecha_prog_dev\`) y \`recargo_mora\` dependen de otros atributos no clave; se eliminan del esquema físico 3FN para obtenerse por consulta.`,
    archivoSrc: "/taller_normalizacion_avanzado_JaumeSuarez.pdf",
    archivoNombre: "taller_normalizacion_avanzado_JaumeSuarez.pdf",
    tablas: [
      {
        titulo: "1. Dependencias Funcionales Identificadas (14 DF)",
        columnas: ["N.º", "Determinante", "Atributos que Determina Funcionalmente"],
        filas: [
          ["DF 1", "cod_alquiler", "fecha_alquiler, num_membresia, cod_sucursal"],
          ["DF 2", "num_membresia", "cod_cliente, cod_plan"],
          ["DF 3", "cod_cliente", "nom_cliente, dir_cliente, tel_cliente, email_cliente"],
          ["DF 4", "cod_plan", "nombre_plan, tarifa_dia_plan, dias_prestamo_max"],
          ["DF 5", "cod_sucursal", "nombre_sucursal, direccion_sucursal, ciudad_sucursal"],
          ["DF 6", "cod_cassette", "formato_cassette, estado_cassette, cod_pelicula"],
          ["DF 7", "cod_pelicula", "titulo_pelicula, anio_pelicula, cod_director"],
          ["DF 8", "cod_director", "nombre_director, nacionalidad_director"],
          ["DF 9", "cod_categoria", "nombre_categoria, recargo_categoria"],
          ["DF 10", "cod_actor", "nombre_actor, fecha_nac_actor"],
          ["DF 11", "cod_pelicula, cod_actor", "rol_en_pelicula"],
          ["DF 12", "cod_alquiler, cod_cassette", "fecha_prog_dev, fecha_real_dev"],
          ["DF 13", "fecha_prog_dev, fecha_real_dev", "dias_retraso (atributo derivado / calculable)"],
          ["DF 14", "dias_retraso, recargo_categoria", "recargo_mora (atributo derivado / calculable)"],
        ],
      },
      {
        titulo: "2. Descomposición Paso a Paso (1FN → 2FN → 3FN)",
        columnas: ["Fase", "Relaciones Generadas", "Problema Resuelto"],
        filas: [
          [
            "1FN",
            "ALQUILER_1FN (PK: cod_alquiler, cod_cassette, cod_actor, cod_categoria)",
            "Aplanamiento de grupos repetidos de casetes y atributos multivaluados independientes de actores y categorías.",
          ],
          [
            "2FN (7 tablas)",
            "ALQUILER_2FN, DETALLE_2FN, CASSETTE_2FN, CASSETTE_ACTOR, CASSETTE_CATEGORIA, ACTOR, CATEGORIA",
            "Eliminación de todas las dependencias parciales sobre subconjuntos de la llave de 4 atributos.",
          ],
          [
            "3FN (13 tablas)",
            "Extracción de MEMBRESIA, CLIENTE, PLAN_MEMBRESIA, SUCURSAL, PELICULA, DIRECTOR; reemplazo por PELICULA_ACTOR y PELICULA_CATEGORIA; remoción de derivados en DETALLE_ALQUILER",
            "Eliminación de cadenas transitivas, desacoplamiento entre copia física (casete) y película, y exclusión de atributos calculables.",
          ],
        ],
      },
      {
        titulo: "3. Esquema Relacional Final en 3FN (13 Relaciones)",
        subtitulo: "Cumple reunión sin pérdida y preservación de dependencias funcionales",
        columnas: ["Relación", "Clave Primaria (PK)", "Atributos Descriptivos", "Claves Foráneas (FK)"],
        filas: [
          ["ALQUILER", "cod_alquiler", "fecha_alquiler", "num_membresia → MEMBRESIA · cod_sucursal → SUCURSAL"],
          ["DETALLE_ALQUILER", "(cod_alquiler, cod_cassette)", "fecha_prog_dev, fecha_real_dev", "cod_alquiler → ALQUILER · cod_cassette → CASSETTE"],
          ["MEMBRESIA", "num_membresia", "—", "cod_cliente → CLIENTE · cod_plan → PLAN_MEMBRESIA"],
          ["CLIENTE", "cod_cliente", "nom_cliente, dir_cliente, tel_cliente, email_cliente", "—"],
          ["PLAN_MEMBRESIA", "cod_plan", "nombre_plan, tarifa_dia_plan, dias_prestamo_max", "—"],
          ["SUCURSAL", "cod_sucursal", "nombre_sucursal, direccion_sucursal, ciudad_sucursal", "—"],
          ["CASSETTE", "cod_cassette", "formato_cassette, estado_cassette", "cod_pelicula → PELICULA"],
          ["PELICULA", "cod_pelicula", "titulo_pelicula, anio_pelicula", "cod_director → DIRECTOR"],
          ["DIRECTOR", "cod_director", "nombre_director, nacionalidad_director", "—"],
          ["ACTOR", "cod_actor", "nombre_actor, fecha_nac_actor", "—"],
          ["CATEGORIA", "cod_categoria", "nombre_categoria, recargo_categoria", "—"],
          ["PELICULA_ACTOR", "(cod_pelicula, cod_actor)", "rol_en_pelicula", "cod_pelicula → PELICULA · cod_actor → ACTOR"],
          ["PELICULA_CATEGORIA", "(cod_pelicula, cod_categoria)", "— (relación puente pura)", "cod_pelicula → PELICULA · cod_categoria → CATEGORIA"],
        ],
      },
    ],
    conclusionMd:
      "Se aprendió a resolver esquemas de alta complejidad donde confluyen **grupos repetidos y múltiples atributos multivaluados independientes** (que en 1FN obligan a una llave de 4 atributos con producto cartesiano). El aprendizaje más valioso fue identificar cómo en **3FN** las asociaciones de actores y categorías deben vincularse a la entidad conceptual (`PELICULA`) y no al ejemplar físico (`CASSETTE`), además de tratar los **atributos derivados** (`dias_retraso`, `recargo_mora`) como dependencias transitivas que se calculan en consulta en lugar de almacenarse redundantemente.",
  },
];

export const EJERCICIOS_SQL: EjercicioSQL[] = [
  {
    id: "sql-1",
    tituloEsperado: "1. Creación de tablas relacionales con restricciones de integridad (DDL)",
    etiqueta: "DDL · CREATE TABLE",
    sentenciaSql: `CREATE TABLE cliente (
    cedula VARCHAR(15) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(150)
);

CREATE TABLE vehiculo (
    placa VARCHAR(10) PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    linea VARCHAR(50) NOT NULL,
    modelo INT NOT NULL CHECK (modelo >= 1950),
    cedula_cliente VARCHAR(15) NOT NULL,
    CONSTRAINT fk_vehiculo_cliente
        FOREIGN KEY (cedula_cliente) REFERENCES cliente(cedula)
        ON UPDATE CASCADE ON DELETE RESTRICT
);`,
    respuestaTexto:
      "Tablas creadas exitosamente aplicando llaves primarias (PK), restricción de dominio CHECK sobre el modelo del vehículo y llave foránea (FK) con integridad referencial.",
    conclusionMd:
      "Se aprendió a traducir restricciones conceptuales del diagrama MER directamente a reglas físicas en el motor SQL mediante `PRIMARY KEY`, `FOREIGN KEY`, `CHECK` y políticas de integridad referencial (`ON UPDATE CASCADE`, `ON DELETE RESTRICT`).",
  },
  {
    id: "sql-2",
    tituloEsperado: "2. Consulta de vehículos reparados por mecánico y cantidad de ingresos (DML)",
    etiqueta: "DML · JOIN & GROUP BY",
    sentenciaSql: `SELECT 
    m.id AS id_mecanico,
    m.nombre AS mecanico,
    v.placa,
    v.marca,
    COUNT(r.fecha_ultimo_ingreso) AS total_reparaciones
FROM mecanico m
INNER JOIN reparar r ON m.id = r.id_mecanico
INNER JOIN vehiculo v ON v.placa = r.placa_vehiculo
GROUP BY m.id, m.nombre, v.placa, v.marca
ORDER BY total_reparaciones DESC;`,
    respuestaTexto:
      "Retorna el consolidado de intervenciones realizadas por cada mecánico agrupado por vehículo, ordenado de mayor a menor frecuencia.",
    respuestaTabla: {
      columnas: ["id_mecanico", "mecanico", "placa", "marca", "total_reparaciones"],
      filas: [
        ["MEC-01", "Carlos Ramírez", "ABC-123", "Toyota", 3],
        ["MEC-02", "Laura Gómez", "XYZ-789", "Mazda", 2],
        ["MEC-01", "Carlos Ramírez", "KLM-456", "Renault", 1],
      ],
    },
    conclusionMd:
      "Se comprendió cómo reconstruir la información distribuida en tablas normalizadas utilizando combinaciones `INNER JOIN` junto con funciones de agregación (`COUNT`) y agrupación (`GROUP BY`).",
  },
];

export const PROYECTO_INFO: RecursoProyecto = {
  id: "proyecto-semestral",
  titulo: "Sistema Contable para Pymes: Balance General y Estado de Resultados",
  subtitulo: "Grupo DataBikers · PostgreSQL 16/17 · 3FN · Arquitectura de Tres Capas en Azure",
  explicacionMd: `### Síntesis Ejecutiva del Proyecto
Diseño, normalización e implementación de una **base de datos relacional en Tercera Forma Normal (3FN)** que centraliza el plan de cuentas (PUC), periodos y asientos contables bajo el principio de **partida doble**, generando en tiempo real el **Balance General** y el **Estado de Resultados** sin almacenar saldos redundantes.

- **Modelo de Datos (12 Entidades y 17 Relaciones):** Incluye relaciones \`1:1\` (*cierre de periodo*), \`1:N\`, \`N:M\` (resuelta en \`MOVIMIENTO\` con \`debe\` y \`haber\`) y **jerarquías recursivas** (\`PLAN_CUENTA\` y \`RUBRO_ESTADO\`). El análisis EER demostró que no se requieren supertipos/subtipos adicionales.
- **Integridad Declarativa en PostgreSQL:** Montos exactos con \`NUMERIC(20,2)\`, llaves primarias \`BIGINT IDENTITY\`, \`CHECK\` de partida exclusiva (\`debe > 0 XOR haber > 0\`), restricción \`EXCLUDE USING gist\` para impedir traslape de periodos y validación de partida doble (\`Σ debe = Σ haber\`).
- **Arquitectura de 3 Capas en Azure:** Desplegada sobre 3 máquinas virtuales **Ubuntu Server 26.04 LTS** segmentadas por subred y NSG (\`vm-web\` con Angular + Nginx, \`vm-api\` con FastAPI + psycopg 3 y \`vm-db\` con PostgreSQL aislado sin IP pública).`,
  tablas: [
    {
      titulo: "1. Esquema Relacional en 3FN (12 Tablas, 17 FK, 15 CHECK y 1 EXCLUDE)",
      subtitulo: "Los saldos y reportes financieros se derivan por consulta desde MOVIMIENTO (Supuesto S-07)",
      columnas: ["Tabla", "Clave Primaria (PK)", "Claves Foráneas (FK) y Restricciones Clave", "Propósito en el Dominio Contable"],
      filas: [
        ["moneda", "id_moneda", "UK(codigo), CHECK(longitud = 3)", "Catálogo ISO 4217 de monedas funcionales (COP, USD)."],
        ["empresa", "id_empresa", "FK(id_moneda), UK(nit)", "Organización propietaria de la contabilidad."],
        ["periodo_contable", "id_periodo", "FK(id_empresa), EXCLUDE gist (sin traslape)", "Rango de fechas contables en estado ABIERTO o CERRADO."],
        ["tipo_cuenta", "id_tipo_cuenta", "UK(clase, naturaleza)", "6 clases PUC (Activo, Pasivo, Patrimonio, Ingreso, Costo, Gasto) y naturaleza."],
        ["rubro_estado", "id_rubro", "FK(id_rubro_padre?), UK(codigo)", "Jerarquía recursiva de secciones del Balance y Estado de Resultados."],
        ["plan_cuenta", "id_cuenta", "FK(id_empresa, id_cuenta_padre?), FK(id_tipo_cuenta, id_rubro)", "Árbol recursivo de cuentas por empresa; marca si acepta movimiento (hoja)."],
        ["tipo_asiento", "id_tipo_asiento", "UK(nombre: APERTURA, DIARIO, AJUSTE, CIERRE)", "Clasificación del comprobante contable."],
        ["asiento", "id_asiento", "FK(id_periodo, id_tipo_asiento), UK(id_periodo, numero)", "Cabecera del comprobante en estado BORRADOR o CONTABILIZADO."],
        ["movimiento", "id_movimiento", "FK(id_asiento, id_cuenta, id_tercero?, id_centro_costo?), CHECK(debe XOR haber)", "Entidad asociativa N:M con imputaciones monetarias exactas NUMERIC(20,2)."],
        ["tercero", "id_tercero", "FK(id_empresa), UK(id_empresa, documento)", "Clientes, proveedores u otros terceros asociados a movimientos."],
        ["centro_costo", "id_centro_costo", "FK(id_empresa), UK(id_empresa, codigo)", "Áreas operativas para análisis de ingresos y gastos."],
        ["cierre_periodo", "id_cierre", "FK,UK(id_periodo), FK,UK(id_asiento_cierre?)", "Registro 1:1 del cierre contable y utilidad neta trasladada al patrimonio."],
      ],
    },
    {
      titulo: "2. Síntesis de Análisis de Selección Tecnológica (SO y RDBMS)",
      subtitulo: "Decisiones fundamentadas bajo restricciones arquitectónicas y Costo Total de Propiedad ($0 COP)",
      columnas: ["Capa / Decisión", "Alternativa Seleccionada", "Alternativas Descartadas", "Justificación Técnica Principal"],
      filas: [
        [
          "Sistema Operativo (3 VM en Azure)",
          "Ubuntu Server 26.04 LTS",
          "RHEL y SLES (licencia por hora), Oracle Linux, Rocky/AlmaLinux, Debian",
          "Imagen oficial de Canonical en Azure sin costo de licencia SO, 5 años de parches LTS gratuitos (ampliables con Ubuntu Pro) y soporte nativo de paquetes PostgreSQL y Python.",
        ],
        [
          "Motor de Base de Datos (VM-DB)",
          "PostgreSQL 16 / 17",
          "Oracle DB 23ai Free (tope 2 CPU / 2 GB RAM / 12 GB), MySQL y MariaDB Community",
          "Único motor libre sin topes de hardware con DDL transaccional, restricción EXCLUDE USING gist contra traslape de periodos, triggers diferibles al COMMIT e índices cubrientes INCLUDE.",
        ],
      ],
    },
    {
      titulo: "3. Muestra de Sentencias de Álgebra Relacional Verificadas (de 51 formuladas)",
      subtitulo: "Ejecutadas sobre PostgreSQL con 399 registros semilla de 4 empresas colombianas",
      columnas: ["Operador", "Consulta de Negocio", "Expresión en Álgebra Relacional", "Filas"],
      filas: [
        ["σ, π", "Cuentas que aceptan movimiento (cuentas hoja)", "π codigo, nombre (σ acepta_movimiento=TRUE (PC))", "52"],
        ["⋈", "Cuentas de la empresa 1 con su clase y naturaleza", "π codigo, nombre, clase, naturaleza (σ id_empresa=1 (PC ⋈ TC))", "90"],
        ["−", "Cuentas registradas que aún no tienen movimientos", "π id_cuenta (PC) − π id_cuenta (MOV)", "63"],
        ["γ, ⋈", "Saldo contable acumulado por clase de cuenta", "γ clase; SUM(debe) − SUM(haber) → saldo (MOV ⋈ PC ⋈ TC)", "6"],
        ["γ, σ", "Auditoría de Partida Doble (asientos descuadrados)", "σ debe_total ≠ haber_total (γ id_asiento; SUM(debe)→debe_total, SUM(haber)→haber_total (MOV))", "0"],
        ["÷", "Empresas con cuentas en todos los tipos de cuenta", "π id_empresa, id_tipo_cuenta (PC) ÷ π id_tipo_cuenta (TC)", "1"],
      ],
    },
  ],
  imagenes: [
    {
      titulo: "1. Modelo Conceptual Entidad-Relación (Notación Peter Chen)",
      contexto: "12 entidades y 17 relaciones: jerarquías recursivas en PLAN_CUENTA y RUBRO_ESTADO, cierre 1:1 y relación asociativa MOVIMIENTO.",
      src: "/proy_mer_chen.svg",
      pdfSrc: "/03_Modelo_ER_Peter_Chen.pdf",
    },
    {
      titulo: "2. Esquema Relacional Normalizado en 3FN (Notación Crow's Foot)",
      contexto: "12 tablas físicas con llaves sustitutas BIGINT IDENTITY, 17 llaves foráneas ON DELETE RESTRICT y montos exactos NUMERIC(20,2).",
      src: "/proy_relacional_3fn.svg",
      pdfSrc: "/06_Modelo_Relacional_Crows_Foot.pdf",
    },
    {
      titulo: "3. Topología de Tres Capas y Aislamiento de Red en Microsoft Azure",
      contexto: "Segmentación en 3 subredes (snet-web, snet-app, snet-data) con NSG por capa; PostgreSQL solo acepta conexiones TLS desde FastAPI.",
      src: "/proy_arquitectura_azure.svg",
      pdfSrc: "/Proyecto_Final_BD1_Documento_Final.pdf",
    },
  ],
  documentosPdf: [
    {
      categoria: "Documento Maestro",
      titulo: "Documento Final Consolidado del Proyecto (Paper IEEE + Anexos)",
      descripcion: "Artículo completo del sistema contable: marco teórico, modelos, normalización 3FN, arquitectura en Azure, pruebas y anexos.",
      src: "/Proyecto_Final_BD1_Documento_Final.pdf",
    },
    {
      categoria: "Fase 1 · Definición",
      titulo: "01. Propuesta del Proyecto Contable",
      descripcion: "Planteamiento del problema en pymes, justificación, alcance, modelo propuesto de 12 entidades y 15 requerimientos funcionales.",
      src: "/01_Propuesta_del_Proyecto-2.pdf",
    },
    {
      categoria: "Fase 1 · Reglas",
      titulo: "02. Documento de Supuestos y Restricciones (S-01 a S-37)",
      descripcion: "37 supuestos de diseño sobre partida doble, periodos sin traslape, cálculo dinámico de saldos sin redundancia y cierre contable.",
      src: "/02_Documento_de_Supuestos-2.pdf",
    },
    {
      categoria: "Fase 1 · Conceptual",
      titulo: "03. Modelo Entidad-Relación en Notación Peter Chen",
      descripcion: "Diagrama conceptual de 12 entidades con sus atributos identificadores, cardinalidades y participaciones.",
      src: "/03_Modelo_ER_Peter_Chen.pdf",
    },
    {
      categoria: "Fase 1 · Análisis EER",
      titulo: "04. Análisis de Aplicabilidad del Modelo EER Extendido",
      descripcion: "Evaluación formal de candidatos a especialización/herencia y justificación de uso de catálogos y discriminadores en 3FN.",
      src: "/04_Modelo_ER_Extendido.pdf",
    },
    {
      categoria: "Fase 1 · Conceptual",
      titulo: "05. Modelo Entidad-Relación en Notación Barker / Crow's Foot",
      descripcion: "Representación del modelo conceptual de 12 entidades y 17 relaciones generada en Oracle SQL Developer Data Modeler.",
      src: "/05_Modelo_ER_Crows_Foot.pdf",
    },
    {
      categoria: "Fase 1 · Lógico 3FN",
      titulo: "06. Modelo Relacional en 3FN (Crow's Foot)",
      descripcion: "Transformación conceptual a relacional, eliminación de 7 dependencias transitivas y definición de las 17 llaves foráneas.",
      src: "/06_Modelo_Relacional_Crows_Foot.pdf",
    },
    {
      categoria: "Fase 1 · Metadatos",
      titulo: "07. Diccionario de Datos Verificado en PostgreSQL",
      descripcion: "Especificación de las 12 tablas, tipos de datos, 12 PK, 17 FK, 12 UNIQUE, 15 CHECK, 1 EXCLUDE y 5 índices.",
      src: "/07_Diccionario_de_Datos.pdf",
    },
    {
      categoria: "Fase 1 · Consultas",
      titulo: "08. Sentencias de Álgebra Relacional y Equivalentes SQL (51 Consultas)",
      descripcion: "51 consultas formales con operadores σ, π, ρ, ⋈, ∪, ∩, −, γ y ÷ verificadas contra la base de datos.",
      src: "/08_Algebra_Relacional.pdf",
    },
    {
      categoria: "Fase 2 · Arquitectura SO",
      titulo: "09. Análisis de Selección del Sistema Operativo (Ubuntu Server 26.04 LTS)",
      descripcion: "Evaluación técnica, de licenciamiento (TCO), soporte LTS y mantenimiento entre 6 distribuciones Linux empresariales.",
      src: "/01_Analisis_Seleccion_Sistema_Operativo.pdf",
    },
    {
      categoria: "Fase 2 · Arquitectura BD",
      titulo: "10. Análisis de Selección del RDBMS (PostgreSQL vs. MySQL, MariaDB y Oracle)",
      descripcion: "Estudio comparativo de concurrencia MVCC, precisión NUMERIC(20,2), triggers diferibles y escalabilidad sin topes de licencia.",
      src: "/03_Analisis_Seleccion_RDBMS-2.pdf",
    },
  ],
  conclusionMd:
    "El proyecto demostró cómo un **modelo relacional estrictamente normalizado en 3FN** elimina de raíz los descuadres y anomalías de las hojas de cálculo en las pymes: ningún saldo se guarda precalculado, la **partida doble (`Σ debe = Σ haber`)** y el **no traslape de periodos (`EXCLUDE USING gist`)** se blindan con reglas formales, y el aislamiento en tres capas sobre **Ubuntu Server + PostgreSQL** garantiza seguridad, trazabilidad y precisión financiera (`Activo = Pasivo + Patrimonio` con diferencia 0 en todas las empresas de prueba).",
};
