import { defineCollection, z } from 'astro:content';

import { glob, file } from 'astro/loaders';

const period = z.object({
	start: z.string().transform((str) => new Date(str)),
	end: z.string().transform((str) => (str === 'present' ? 'present' : new Date(str))),
});

const profile = defineCollection({
	loader: file('./src/data/profile.json'),
	schema: z.object({
		name: z.string(),
		profession: z.string(),
		description: z.string(),
		avatar_url: z.string().nullable(),
		social: z.object({
			email: z.string().email(),
			whatsapp: z.string().url(),
			github: z.string().url(),
		}),
	}),
});

const education = defineCollection({
	loader: glob({ base: './src/data/education', pattern: '**/*.json' }),
	schema: z.object({
		name: z.string(),
		location: z.string(),
		gpa: z.number().nullable(),
		period,
	}),
});

const experience = defineCollection({
	loader: glob({ base: './src/data/experience', pattern: '**/*.json' }),
	schema: z.object({
		name: z.string(),
		location: z.object({
			name: z.string(),
			description: z.string(),
			address: z.string(),
		}),
		period,
		works: z.array(z.string()),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/data/projects', pattern: '**/*.json' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		type: z.enum(['website', 'desktop']),
		url: z.string().url(),
		source_url: z.string().url(),
	}),
});

export const collections = { profile, education, experience, projects };
