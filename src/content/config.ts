import { z, defineCollection } from "astro:content";
import { format } from "date-fns";

const researchCollection = defineCollection({
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.string().transform((str) => format(new Date(str), "MMM yyyy ")),
      authors: z.array(z.string()),
      tags: z.array(z.string()),
      links: z.array(
        z.object({
          url: z.string(),
          label: z.string(),
          icon: z.string(),
        })
      ),
    }),
});

export const collections = {
  research: researchCollection,
};
