// src/lib/content.ts
export const aboutBlurb = `AI engineer exploring agents, inference, perception and world modelling`;

export const cvLinks = [
  { label: "Download CV (PDF)", href: "/cv", note: "Latest résumé" },
  // add more links if needed
];

export type Project = { title: string; subtitle?: string; href?: string; description?: string; tags?: string[] };
export type Post = { title: string; href?: string; date?: string; excerpt?: string };

export const recentProjects: Project[] = [
  { title: "Rose AI", description: "A React/Tailwind kit for analog-CRT vibes.", href: "/work/rose-ai", tags: ["React","Tailwind","xterm.js"] },
  { title: "UMGPT", description: "Provider verification via weekly phone calls.", href: "/work/umgpt", tags: ["LLM","Telephony"] },
];

export const recentPosts: Post[] = [
  { title: "AI For Robotic Surgery", href: "/blog/ai-for-robotic-surgery", date: "2025-09-20", excerpt: "Realtime Optical Coherence Tomography for robotic-assisted surgery with adaptive scanning." },
  { title: "Deep Learning for App Security Prediction", href: "/blog/deep-learning-for-app-security-prediction", date: "2025-09-12", excerpt: "Outcompeting Gradient-Boosted Decision Trees with Tabular Transformers for app security classification" },
];
