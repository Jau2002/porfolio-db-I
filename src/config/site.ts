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

export interface EjercicioNormalizacion {
  id: string;
  titulo: string;
  etiqueta?: string;
  contextoMd: string;
  /** Ruta del archivo descargable (PDF o Excel) */
  archivoSrc: string;
  archivoNombre?: string;
  /** Desglose paso a paso del proceso de normalización */
  tablasResumen?: {
    formaNormal: string;
    descripcion: string;
    esquema: string;
  }[];
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
Análisis de un esquema de hospitalización con clave candidata simple \`ID_Paciente\`:
- **Esquema original:** \`(ID_Paciente, Nombre_Paciente, Especialidad_Tratamiento, Cama_Asignada, Ala_Hospital, Médico_Tratante, Teléfono_Médico, Email_Médico, Fecha_Ingreso, Fecha_Alta)\`.
- **Diagnóstico de Forma Normal:** El esquema original cumple **1FN** (atributos atómicos) y **2FN** (al tener clave simple \`ID_Paciente\`, no existen dependencias parciales), pero **viola 3FN** por dos cadenas de dependencias transitivas entre atributos no primos:
  1. \`ID_Paciente → Médico_Tratante → {Teléfono_Médico, Email_Médico, Especialidad_Tratamiento}\`
  2. \`ID_Paciente → Cama_Asignada → Ala_Hospital\` (la cama física está anclada a un ala, mientras que una especialidad puede tener pacientes en varias alas).
- **Anomalías detectadas:**
  - *Inserción:* No se puede registrar un médico nuevo en el directorio hasta que tenga al menos un paciente hospitalizado.
  - *Actualización:* Si un médico con 8 pacientes cambia de teléfono, hay que actualizar 8 filas con riesgo de inconsistencia.
  - *Eliminación:* Si el único paciente de la Cama 305 recibe el alta y se borra su registro, se pierde que esa cama existe y pertenece al Ala Norte.`,
    archivoSrc: "/Taller Normalización_BD1 Grupo DataBikers.pdf",
    archivoNombre: "Taller_Normalizacion_BD1_DataBikers.pdf",
    tablasResumen: [
      {
        formaNormal: "Estado Inicial (2FN)",
        descripcion: "Cumple 1FN y 2FN por clave simple, pero presenta dependencias transitivas hacia Médico y Cama.",
        esquema: "HOSPITALIZACION (ID_Paciente [PK], Nombre_Paciente, Especialidad_Tratamiento, Cama_Asignada, Ala_Hospital, Médico_Tratante, Teléfono_Médico, Email_Médico, Fecha_Ingreso, Fecha_Alta)",
      },
      {
        formaNormal: "Paso 1 → 3FN",
        descripcion: "Eliminación de la dependencia transitiva Cama_Asignada → Ala_Hospital (descomposición sin pérdida).",
        esquema: "CAMA (Cama_Asignada [PK], Ala_Hospital) · HOSPITALIZACION_1 (ID_Paciente [PK], ..., Cama_Asignada [FK → CAMA])",
      },
      {
        formaNormal: "Paso 2 → 3FN & FNBC",
        descripcion: "Eliminación de la dependencia transitiva de Médico_Tratante. Se preservan todas las dependencias y cumple FNBC.",
        esquema: "CAMA (Cama_Asignada [PK], Ala_Hospital) · MEDICO (Médico_Tratante [PK], Teléfono_Médico, Email_Médico, Especialidad_Tratamiento) · HOSPITALIZACION_FINAL (ID_Paciente [PK], Nombre_Paciente, Cama_Asignada [FK], Médico_Tratante [FK], Fecha_Ingreso, Fecha_Alta)",
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
Modelado de pedidos comerciales donde un pedido incluye varios productos.
- **Esquema original:** \`(ID_Pedido, Fecha_Pedido, ID_Cliente, Nombre_Cliente, Sector_Cliente, ID_Producto, Nombre_Producto, Precio_Producto, Cantidad_Solicitada, ID_Vendedor, Nombre_Vendedor, Comisión_Vendedor)\`.
- **Clave primaria compuesta:** \`(ID_Pedido, ID_Producto)\`. Solo \`Cantidad_Solicitada\` depende de la clave completa.
- **Diagnóstico inicial (Solo cumple 1FN):**
  - **Viola 2FN (Dependencias parciales):** \`Nombre_Producto\` y \`Precio_Producto\` dependen solo de \`ID_Producto\`; mientras que \`Fecha_Pedido\`, \`ID_Cliente\` e \`ID_Vendedor\` dependen solo de \`ID_Pedido\`.
  - **Viola 3FN (Dependencias transitivas):** \`ID_Cliente → {Nombre_Cliente, Sector_Cliente}\` e \`ID_Vendedor → {Nombre_Vendedor, Comisión_Vendedor}\`.
- **Impacto en el negocio (Anomalías):** Cambiar el \`Sector_Cliente\` de un cliente con 200 pedidos exige actualizar 200 filas; eliminar el único pedido de un vendedor borra sus datos maestros y comisión.`,
    archivoSrc: "/Taller Normalización_BD1 Grupo DataBikers.pdf",
    archivoNombre: "Taller_Normalizacion_BD1_DataBikers.pdf",
    tablasResumen: [
      {
        formaNormal: "Paso 1 (Hacia 2FN)",
        descripcion: "Extracción de los atributos que dependen parcialmente solo de ID_Producto.",
        esquema: "PRODUCTO (ID_Producto [PK], Nombre_Producto, Precio_Producto) · PEDIDO_PRODUCTO (ID_Pedido [PK], ID_Producto [PK, FK], Fecha_Pedido, ID_Cliente, ..., Cantidad_Solicitada)",
      },
      {
        formaNormal: "Paso 2 (Cumple 2FN)",
        descripcion: "Separación de atributos que dependen solo de ID_Pedido. Todo atributo no primo depende ya de la clave completa.",
        esquema: "DETALLE_PEDIDO (ID_Pedido [PK, FK], ID_Producto [PK, FK], Cantidad_Solicitada) · PEDIDO (ID_Pedido [PK], Fecha_Pedido, ID_Cliente, Nombre_Cliente, Sector_Cliente, ID_Vendedor, Nombre_Vendedor, Comisión_Vendedor) · PRODUCTO (ID_Producto [PK], Nombre_Producto, Precio_Producto)",
      },
      {
        formaNormal: "Paso 3 (Cumple 3FN y BCNF)",
        descripcion: "Eliminación de dependencias transitivas separando los catálogos maestros de Clientes y Vendedores (5 tablas finales).",
        esquema: "CLIENTE (ID_Cliente [PK], Nombre_Cliente, Sector_Cliente) · VENDEDOR (ID_Vendedor [PK], Nombre_Vendedor, Comisión_Vendedor) · PRODUCTO (ID_Producto [PK], Nombre_Producto, Precio_Producto) · PEDIDO (ID_Pedido [PK], Fecha_Pedido, ID_Cliente [FK], ID_Vendedor [FK]) · DETALLE_PEDIDO (ID_Pedido [PK, FK], ID_Producto [PK, FK], Cantidad_Solicitada)",
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
Análisis de atributos multivaluados independientes en un mismo registro:
- **Registro original no normalizado (UNF):** \`ID_Empleado = 1\`, \`Nombre_Empleado = 'Empleado_1'\`, \`Competencias_Técnicas = 'Python, Java, SQL'\`, \`Idiomas = 'Español, Inglés, Francés'\`.
- **¿Por qué viola 1FN?** La Primera Forma Normal exige que cada celda contenga un único **valor atómico**. Aquí existen dos listas de valores simultáneas en una misma fila.
- **Normalización a 1FN en una sola tabla:** Para aplanar la tabla sin perder combinaciones válidas es obligatorio generar el **producto cartesiano** (\`3 competencias × 3 idiomas = 9 filas\` para \`Empleado_1\`) con clave primaria compuesta \`(ID_Empleado, Competencia, Idioma)\`.
- **Comparación Columna de Texto vs. Tabla en 1FN:** Guardar \`'Python,Java,SQL'\` en un string impide usar índices (obliga a usar \`LIKE '%Python%'\`), carece de validación y dificulta \`COUNT\` / \`GROUP BY\`; mientras que llevarlo solo a 1FN en una única tabla permite consultas exactas pero repite \`Nombre_Empleado\` 9 veces (dependencia parcial que exige avanzar a formas normales superiores).`,
    archivoSrc: "/Taller Normalización_BD1 Grupo DataBikers.pdf",
    archivoNombre: "Taller_Normalizacion_BD1_DataBikers.pdf",
    tablasResumen: [
      {
        formaNormal: "UNF (No Normalizado)",
        descripcion: "Dos atributos multivaluados almacenados como listas de texto en la misma fila.",
        esquema: "EMPLEADO_UNF (ID_Empleado, Nombre_Empleado, Competencias_Técnicas: {Python, Java, SQL}, Idiomas: {Español, Inglés, Francés})",
      },
      {
        formaNormal: "1FN (Tabla Única)",
        descripcion: "Celdas atómicas mediante producto cartesiano (3 × 3 = 9 tuplas por empleado). Genera redundancia en Nombre_Empleado.",
        esquema: "EMPLEADO_1FN (ID_Empleado [PK], Competencias_Técnicas [PK], Idiomas [PK], Nombre_Empleado)",
      },
      {
        formaNormal: "Solución Superior (2FN/4FN)",
        descripcion: "Separación del dato maestro del empleado respecto a sus competencias e idiomas para eliminar anomalías.",
        esquema: "EMPLEADO (ID_Empleado [PK], Nombre_Empleado) · EMPLEADO_COMPETENCIA (ID_Empleado [PK, FK], Competencia [PK]) · EMPLEADO_IDIOMA (ID_Empleado [PK, FK], Idioma [PK])",
      },
    ],
    conclusionMd:
      "Se aprendió por qué **guardar listas separadas por comas en una columna de texto es un antipatrón relacional** (rompe la atomicidad de 1FN, inhabilita índices y complica agregaciones), pero también se demostró que aplanar dos atributos multivaluados independientes en una sola tabla 1FN produce un **producto cartesiano redundante** que obliga a separar los datos maestros del empleado en formas normales superiores.",
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
  titulo: "Proyecto Semestral de Bases de Datos I",
  subtitulo: "Diseño, Normalización e Implementación SGBD",
  explicacionMd: `### Descripción general del proyecto
Este módulo reúne la documentación técnica, los diagramas arquitectónicos, el diccionario de datos y los entregables en PDF del proyecto final de la asignatura.

- **Fase 1 — Levantamiento y Modelado Conceptual:** Definición de reglas de negocio, alcance del sistema y construcción del Modelo Entidad-Relación (MER).
- **Fase 2 — Diseño Lógico y Normalización:** Transformación al modelo relacional y verificación de formas normales (1FN, 2FN, 3FN y FNBC).
- **Fase 3 — Implementación Física (SQL):** Scripts DDL de creación de esquema, carga de datos semilla (DML) y consultas analíticas del negocio.`,
  documentosPdf: [
    {
      titulo: "Taller de Normalización — Grupo DataBikers (PDF)",
      descripcion: "Análisis completo de dependencias funcionales, anomalías y normalización paso a paso hasta 3FN y FNBC.",
      src: "/Taller Normalización_BD1 Grupo DataBikers.pdf",
    },
  ],
  imagenes: [
    {
      titulo: "Arquitectura del Modelo Conceptual",
      contexto: "Vista general del esquema Entidad-Relación diseñado para la gestión de contratos y equipos.",
      src: "/ejecicio_4.drawio.png",
    },
  ],
  conclusionMd:
    "El desarrollo del proyecto permitió conectar todas las etapas del ciclo de vida de una base de datos relacional: desde abstraer la realidad del negocio en un diagrama MER sin ambigüedades, hasta garantizar cero redundancia mediante normalización formal e implementarlo en SQL.",
};
