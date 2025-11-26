import { Project, SkillNode, Coordinates } from './types';

export const PERSONAL_INFO = {
  name: "COLLINS OJEABU",
  role: "WEB DESIGNER & DEV",
  location: "LAGOS, NG",
  availability: "OPEN FOR COMMISSIONS",
  email: "hello@collinsojeabu.com"
};

export const GEODATA: Coordinates = {
  lat: "06° 31' 22.34\" N",
  lng: "03° 23' 14.98\" E",
  location: "LAGOS_TERMINAL_01"
};

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "NEBULA",
    category: "FINTECH / UI",
    year: "2024",
    description: "A decentralized trading terminal interface focusing on high-frequency data visualization and kinetic interactions.",
    tech: ["React", "Framer Motion", "D3.js"],
    link: "#"
  },
  {
    id: "02",
    title: "AETHER",
    category: "AGENCY / 3D",
    year: "2023",
    description: "Immersive 3D portfolio for a creative agency. Features WebGL fluid distortions and seamless page transitions.",
    tech: ["Next.js", "Three.js", "GSAP"],
    link: "#"
  },
  {
    id: "03",
    title: "VANGUARD",
    category: "E-COMM / UX",
    year: "2023",
    description: "Brutalist fashion e-commerce experience. Zero-bloat architecture with a focus on raw performance.",
    tech: ["Shopify", "TypeScript", "Liquid"],
    link: "#"
  }
];

export const SKILLS: string[] = [
  "FRAMER", "FIGMA", "MOTION DESIGN", "REACT.JS", "NEXT.JS", "TYPESCRIPT", 
  "WEBGL", "CREATIVE DEV", "TAILWIND CSS", "NODE.JS", "UI/UX"
];

export const SKILL_MATRIX: SkillNode[] = [
  { name: "Frontend Arch", level: 95, category: "dev" },
  { name: "Motion Design", level: 92, category: "design" },
  { name: "UI Systems", level: 88, category: "design" },
  { name: "Backend Logic", level: 75, category: "dev" },
];