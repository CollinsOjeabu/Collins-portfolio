
export interface Project {
  id: string;
  title: string;
  category: string;
  client?: string;
  year: string;
  description: string;
  tech: string[];
  link: string;
  featured?: boolean;
  type: 'dashboard' | 'app' | 'website' | 'visual' | 'fun';
  stats?: { label: string; value: string; trend?: 'up' | 'down' }[];
  imageType?: 'chart-complex' | 'chart-simple' | '3d-character' | 'mobile-ui' | 'table-ui';
}

export interface SkillNode {
  name: string;
  level: number; // 0-100
  category: 'design' | 'dev' | 'tool';
}

export interface Coordinates {
  lat: string;
  lng: string;
  location: string;
}

export interface PersonaTrait {
  label: string;
  value: number; // 0-100
}

export interface ExperienceItem {
  city: string;
  coords: string;
  years: string;
  role?: string;
}

export interface TestimonialItem {
  role: string;
  company: string;
  quote: string;
  shape: 'triangle' | 'square' | 'circle' | 'diamond';
}

export interface ProfileData {
  pillars: {
    icon: string;
    title: string;
    desc: string;
    tags: string[];
  }[];
  persona: {
    traits: PersonaTrait[];
    goals: string[];
  };
  experience: ExperienceItem[];
  testimonials: TestimonialItem[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  heroMetric: string; // e.g. "Reducing an 80% misuse rate..."
  visualType: 'dashboard' | 'mobile' | 'system';
  context: {
    role: string;
    timeline: string;
    team: string;
    stack: string[];
  };
  narrative: {
    problem: string;
    research: string;
    process: string;
    solution: string;
    impact: string;
  };
  stats: { label: string; value: string }[];
}
