import { z, defineCollection } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.enum(["Anna Dixon", "Victoria Greenfelder", "Darnell McClure"]),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    description: z
      .string()
      .max(
        160,
        "For best SEO results, please keep the description under 160 characters."
      ),
    draft: z.boolean().default(false),
    category: z.array(
      z.enum(["CSS", "Docs", "General", "Astro", "Reference Docs"])
    ),
  }),
});

export const collections = { projects };
