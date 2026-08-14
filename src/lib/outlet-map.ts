import { outlets } from "@/lib/dummy-data";

export type MapOutlet = {
  name: string;
  city: string;
  lat: number;
  lon: number;
  active: boolean;
};

export const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** The 5 outlets with live analytics (Kathmandu valley, slightly spread for legibility). */
const activeLocations: MapOutlet[] = [
  { name: "Tridevi Marg", city: "Kathmandu", lat: 27.98, lon: 85.05, active: true },
  { name: "Panipokhari", city: "Kathmandu", lat: 28.05, lon: 85.62, active: true },
  { name: "International Club", city: "Kathmandu", lat: 27.62, lon: 85.05, active: true },
  { name: "Durbar Mall", city: "Kathmandu", lat: 27.38, lon: 85.55, active: true },
  { name: "Bikers Cafe Naxal", city: "Kathmandu", lat: 27.80, lon: 85.95, active: true },
];

/** Outlets mapped across Nepal whose analytics are not connected yet. */
const soonLocations: MapOutlet[] = [
  { name: "Pokhara Lakeside", city: "Pokhara", lat: 28.209, lon: 83.958, active: false },
  { name: "Butwal Traffic Chowk", city: "Butwal", lat: 27.7, lon: 83.448, active: false },
  { name: "Chitwan Bharatpur", city: "Bharatpur", lat: 27.68, lon: 84.43, active: false },
  { name: "Biratnagar Main", city: "Biratnagar", lat: 26.455, lon: 87.27, active: false },
  { name: "Dharan Bhanu Chowk", city: "Dharan", lat: 26.812, lon: 87.283, active: false },
  { name: "Nepalgunj Birendra", city: "Nepalgunj", lat: 28.05, lon: 81.617, active: false },
  { name: "Dhangadhi Highway", city: "Dhangadhi", lat: 28.7, lon: 80.6, active: false },
  { name: "Surkhet Birendranagar", city: "Surkhet", lat: 28.6, lon: 81.63, active: false },
  { name: "Janakpur Dhanusha", city: "Janakpur", lat: 26.73, lon: 85.925, active: false },
  { name: "Hetauda Bazar", city: "Hetauda", lat: 27.428, lon: 85.033, active: false },
  { name: "Bhaktapur Durbar", city: "Bhaktapur", lat: 27.671, lon: 85.428, active: false },
  { name: "Patan Durbar", city: "Lalitpur", lat: 27.667, lon: 85.324, active: false },
  { name: "Ilam Tea Garden", city: "Ilam", lat: 26.909, lon: 87.928, active: false },
  { name: "Jomsom Trail", city: "Mustang", lat: 28.78, lon: 83.723, active: false },
];

export const mapOutlets: MapOutlet[] = [...activeLocations, ...soonLocations];

/** Every outlet in the network — the 5 connected ones plus the rest, alphabetised. */
export const allOutletNames: string[] = mapOutlets.map((o) => o.name);

export const isActiveOutlet = (name: string) => outlets.some((o) => o.name === name);

export function findOutletBySlug(slug: string) {
  return mapOutlets.find((o) => slugify(o.name) === slug);
}

/** Project lat/lon onto the 1000x400 map viewBox. */
export const MAP_W = 1000;
export const MAP_H = 400;
export const project = (lon: number, lat: number) => ({
  x: ((lon - 79.9) / 8.5) * MAP_W,
  y: ((30.7 - lat) / 4.6) * MAP_H,
});

const border: [number, number][] = [
  [80.05, 30.2], [80.4, 30.42], [81.0, 30.35], [81.6, 30.45], [82.2, 30.12],
  [82.8, 29.95], [83.4, 29.35], [84.2, 29.35], [85.0, 28.65], [85.7, 28.35],
  [86.2, 28.1], [86.7, 28.1], [87.2, 27.85], [87.8, 27.9], [88.15, 27.85],
  [88.2, 26.75], [88.05, 26.42], [87.5, 26.4], [87.0, 26.6], [86.5, 26.55],
  [86.0, 26.6], [85.5, 26.85], [85.0, 26.85], [84.5, 27.35], [84.0, 27.45],
  [83.5, 27.4], [83.0, 27.5], [82.5, 27.7], [82.0, 27.9], [81.5, 28.1],
  [81.0, 28.4], [80.5, 28.6], [80.05, 28.8],
];

export const NEPAL_PATH =
  border
    .map(([lon, lat], i) => {
      const p = project(lon, lat);
      return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    })
    .join(" ") + " Z";
