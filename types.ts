export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  link: string;
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
