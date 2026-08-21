import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One line, shown on the card. */
      tagline: z.string(),
      /** Client work, product, or a personal build. */
      kind: z.enum(['client', 'product', 'personal']),
      status: z.enum(['live', 'archived', 'private', 'in-progress']).default('live'),
      year: z.number(),
      /** Uppercase mono chips on the card — keep to 5. */
      stack: z.array(z.string()).max(6).default([]),
      role: z.string().default('Full-stack'),
      cover: image(),
      /** Extra screenshots for the detail page. */
      gallery: z.array(z.object({ src: image(), caption: z.string() })).default([]),
      url: z.string().url().optional(),
      repo: z.string().url().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(99),
    }),
});


export const collections = { projects };
