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
  /** Contenido de contexto en formato Markdown (soporta párrafos, listas, **negrita**, `código`, etc.) */
  contextoMd: string;
  /** Ruta de la imagen PNG/SVG o visor HTML en /public */
  imagenSrc?: string;
  /** Si el diagrama en /public está en formato .drawio.html interactivo */
  embedHtmlSrc?: string;
  /** Archivo a descargar al pulsar el botón abajo a la derecha */
  descargaSrc: string;
  descargaNombre?: string;
}

export interface EjercicioNormalizacion {
  id: string;
  titulo: string;
  etiqueta?: string;
  contextoMd: string;
  excelSrc: string;
  excelNombre?: string;
  /** Vista previa opcional de las tablas normalizadas */
  tablasResumen?: {
    formaNormal: string;
    descripcion: string;
    esquema: string;
  }[];
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
}

export interface RecursoProyecto {
  id: string;
  titulo: string;
  subtitulo: string;
  explicacionMd: string;
  documentosPdf?: {
    titulo: string;
    descripcion: string;
    src: string;
  }[];
  imagenes?: {
    titulo: string;
    contexto: string;
    src: string;
  }[];
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
  },
];

export const EJERCICIOS_NORMALIZACION: EjercicioNormalizacion[] = [
  {
    id: "normalizacion-1",
    titulo: "Ejercicio de Normalización (1FN, 2FN y 3FN)",
    etiqueta: "Excel · 1FN → 3FN",
    contextoMd: `### Contexto del ejercicio
Proceso paso a paso de normalización de una tabla universal no normalizada (UNF) hasta **Tercera Forma Normal (3FN)** desarrollado en hoja de cálculo Excel.

- **1FN (Primera Forma Normal):** Eliminación de grupos repetitivos y garantía de atomicidad en cada celda, identificando la llave primaria compuesta.
- **2FN (Segunda Forma Normal):** Separación de dependencias funcionales parciales en tablas independientes para que todo atributo no clave dependa completamente de la llave primaria.
- **3FN (Tercera Forma Normal):** Eliminación de dependencias transitivas entre atributos no primos.

> Cuando subas tus archivos \`.xlsx\` o archivos de contexto a \`public/\`, se enlazarán directamente aquí para su visualización y descarga.`,
    excelSrc: "#",
    excelNombre: "normalizacion_ejercicio_1.xlsx",
    tablasResumen: [
      {
        formaNormal: "1FN",
        descripcion: "Atributos atómicos y eliminación de valores multivaluados.",
        esquema: "REGISTRO_UNF (id_registro, cod_cliente, nombre_cliente, cod_producto, producto, cantidad, precio_unitario)",
      },
      {
        formaNormal: "2FN",
        descripcion: "Eliminación de dependencias parciales respecto a la clave compuesta.",
        esquema: "CLIENTES (cod_cliente [PK], nombre_cliente) · PRODUCTOS (cod_producto [PK], producto, precio_unitario)",
      },
      {
        formaNormal: "3FN",
        descripcion: "Separación de dependencias transitivas y catálogo normalizado.",
        esquema: "DETALLE_ORDEN (id_registro [PK, FK], cod_producto [PK, FK], cantidad)",
      },
    ],
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
  },
];

export const PROYECTO_INFO: RecursoProyecto = {
  id: "proyecto-semestral",
  titulo: "Proyecto Semestral de Bases de Datos I",
  subtitulo: "Diseño, Normalización e Implementación SGBD",
  explicacionMd: `### Descripción general del proyecto
Este módulo reúne la documentación técnica, los diagramas arquitectónicos, el diccionario de datos y los entregables en PDF del proyecto final de la asignatura.

- **Fase 1 — Levantamiento y Modelado Conceptual:** Definición de reglas de negocio, alcance del sistema y construcción del Modelo Entidad-Relación (MER).
- **Fase 2 — Diseño Lógico y Normalización:** Transformación al modelo relacional y verificación de formas normales (1FN, 2FN, 3FN).
- **Fase 3 — Implementación Física (SQL):** Scripts DDL de creación de esquema, carga de datos semilla (DML) y consultas analíticas del negocio.`,
  documentosPdf: [
    {
      titulo: "Informe Técnico del Proyecto (PDF)",
      descripcion: "Documento completo con planteamiento del problema, reglas de negocio, diccionario de datos y conclusiones.",
      src: "#",
    },
  ],
  imagenes: [
    {
      titulo: "Arquitectura del Modelo Relacional",
      contexto: "Vista general del esquema de base de datos del proyecto final.",
      src: "/ejecicio_4.drawio.png",
    },
  ],
};
