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
