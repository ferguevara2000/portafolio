export type ProjectStatus = "published" | "in_progress" | "archived";
export type ProjectCategory = "Web App" | "Mobile App" | "Next.js" | "Angular" | "Python";

export type Project = {
  id: number;
  title: string;
  description: string;
  categories: ProjectCategory[];
  status: ProjectStatus;
  role: string;
  tech: string[];
  github: string[];
  website?: string;
  image: string;
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Sistema de Gestión de Catequesis – Parroquia Montalvo",
    description: "Aplicación web progresiva (PWA) desarrollada para optimizar la gestión de los procesos de catequesis en la Parroquia Montalvo, permitiendo administrar catequizandos, catequistas, inscripciones y acceso rápido a la información.",
    categories: ["Web App", "Next.js"],
    status: "published",
    role: "Full Stack Developer",
    tech: ["React", "Next.js", "Node.js", "Express", "Supabase", "PostgreSQL", "TypeScript", "Tailwind", "Shadcn", "Git"],
    github: [
      "https://github.com/ferguevara2000/pwa-catequesis-frontend",
      "https://github.com/ferguevara2000/catequesis-api",
    ],
    website: "https://sanmigueldemontalvo.vercel.app/home",
    image: "/catequesis.jpg",
  },
  {
    id: 2,
    title: "Sistema de Gestión de Catequesis – Parroquia Montalvo",
    description: "Aplicación web progresiva (PWA) desarrollada para optimizar la gestión de los procesos de catequesis en la Parroquia Montalvo, permitiendo administrar catequizandos, catequistas, inscripciones y acceso rápido a la información.",
    categories: ["Web App", "Next.js"],
    status: "in_progress",
    role: "Full Stack Developer",
    tech: ["React", "Next.js", "Node.js", "Express", "Supabase", "PostgreSQL", "TypeScript", "Tailwind", "Shadcn", "Git"],
    github: [
      "https://github.com/ferguevara2000/pwa-catequesis-frontend",
      "https://github.com/ferguevara2000/catequesis-api",
    ],
    website: "https://sanmigueldemontalvo.vercel.app/home",
    image: "/projects/catequesis.png",
  },
  {
    id: 3,
    title: "Sistema de Gestión de Catequesis – Parroquia Montalvo",
    description: "Aplicación web progresiva (PWA) desarrollada para optimizar la gestión de los procesos de catequesis en la Parroquia Montalvo, permitiendo administrar catequizandos, catequistas, inscripciones y acceso rápido a la información.",
    categories: ["Web App", "Next.js"],
    status: "published",
    role: "Full Stack Developer",
    tech: ["React", "Next.js", "Node.js", "Express", "Supabase", "PostgreSQL", "TypeScript", "Tailwind", "Shadcn", "Git"],
    github: [
      "https://github.com/ferguevara2000/pwa-catequesis-frontend",
      "https://github.com/ferguevara2000/catequesis-api",
    ],
    website: "https://sanmigueldemontalvo.vercel.app/home",
    image: "/projects/catequesis.png",
  },
  {
    id: 4,
    title: "Sistema de Gestión de Catequesis – Parroquia Montalvo",
    description: "Aplicación web progresiva (PWA) desarrollada para optimizar la gestión de los procesos de catequesis en la Parroquia Montalvo, permitiendo administrar catequizandos, catequistas, inscripciones y acceso rápido a la información.",
    categories: ["Web App", "Next.js"],
    status: "archived",
    role: "Full Stack Developer",
    tech: ["React", "Next.js", "Node.js", "Express", "Supabase", "PostgreSQL", "TypeScript", "Tailwind", "Shadcn", "Git"],
    github: [
      "https://github.com/ferguevara2000/pwa-catequesis-frontend",
      "https://github.com/ferguevara2000/catequesis-api",
    ],
    website: "https://sanmigueldemontalvo.vercel.app/home",
    image: "/projects/catequesis.png",
  },
];