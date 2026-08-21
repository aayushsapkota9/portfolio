export const site = {
  name: 'Aayush Sapkota',
  wordmark: 'aayush.',
  email: 'aayushsapkota9@gmail.com',
  role: 'Full Stack / DevOps / AI Explorer',
  focus: 'Building scalable apps & automating workflows',
  academic: 'B.E. Computer Engineering',
  tagline:
    'Full-stack engineer building scalable apps and automating the workflows around them.',
  github: 'https://github.com/aayushsapkota9',
};


/** The three things I actually get hired for. */
export const focus = [
  {
    title: 'Full-stack web',
    tagline: 'Next.js, NestJS, Postgres',
    href: '/projects',
    variant: 'panels' as const,
  },
  {
    title: 'Cloud & DevOps',
    tagline: 'AWS, Docker, Kubernetes, Terraform',
    href: '/projects',
    variant: 'lines' as const,
  },
  {
    title: 'AI & automation',
    tagline: 'Gemini, LangChain, OpenCV',
    href: '/projects',
    variant: 'chat' as const,
  },
];

/** Grouped tech stack — mirrors the skill tree in the GitHub profile. */
export const stack = [
  {
    group: 'Web',
    items: ['React', 'Next.js', 'TypeScript', 'Node / Express', 'FastAPI / Python', 'Tailwind'],
  },
  {
    group: 'Data',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
  },
  {
    group: 'DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Nginx', 'Linux'],
  },
  {
    group: 'Embedded & AI',
    items: ['Arduino / ESP32', 'C / C++', 'PyTorch', 'OpenCV', 'LangChain'],
  },
];

/** Domains I've shipped into — replaces the placeholder client logo row. */
export const logos = [
  {
    name: 'Government',
    href: '/projects/digipalika',
    path: 'M12 2.5 22 8v2H2V8l10-5.5ZM4 12h2.6v7H4v-7Zm6.7 0h2.6v7h-2.6v-7Zm6.7 0H20v7h-2.6v-7ZM2 20.5h20V22H2v-1.5Z',
    stroke: false,
  },
  {
    name: 'Agriculture',
    href: '/projects/krishi-connect',
    path: 'M12 22V11m0 0c0-4 3-7 8-7 0 5-3.5 8-8 8Zm0 3c0-3.5-2.6-6-6.5-6 0 4 2.9 6 6.5 6Z',
    stroke: true,
  },
  {
    name: 'Commerce',
    href: '/projects/toolsmandu',
    path: 'M3 5h2.2l2.3 11h11M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM7 8h14l-1.6 6H8',
    stroke: true,
  },
  {
    name: 'Hospitality',
    href: '/projects/nepal-house',
    path: 'M4 21V9l8-5 8 5v12h-6v-6h-4v6H4Z',
    stroke: false,
  },
  {
    name: 'Fintech',
    href: '/projects/kirana-books',
    path: 'M3 6h18v12H3V6Zm0 4h18M7 15h4',
    stroke: true,
  },
];

/** "Recent favorite" — swap for a live Spotify endpoint later. */
export const nowPlaying = {
  track: 'Weightless',
  artist: 'Marconi Union',
  href: 'https://open.spotify.com',
};

export const socials = [
  { name: 'GitHub', href: 'https://github.com/aayushsapkota9', handle: '@aayushsapkota9' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/aayushsapkota9', handle: '/in/aayushsapkota9' },
  { name: 'Facebook', href: 'https://facebook.com/aayushhsapkota9/', handle: '@aayushhsapkota9' },
  { name: 'Email', href: 'mailto:aayushsapkota9@gmail.com', handle: 'aayushsapkota9@gmail.com' },
];

/** Small circular icon links in the bio card footer. */
export const bioSocials = [
  {
    name: 'GitHub',
    href: 'https://github.com/aayushsapkota9',
    path: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5.01 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/aayushsapkota9',
    path: 'M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.5 8.5h3.1V21H3.5V8.5Zm5.4 0H12v1.7h.05a3.4 3.4 0 0 1 3.06-1.68c3.27 0 3.87 2.15 3.87 4.95V21h-3.1v-5.9c0-1.4-.03-3.22-1.96-3.22-1.97 0-2.27 1.53-2.27 3.11V21H8.9V8.5Z',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/aayushhsapkota9/',
    path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z',
  },
];
