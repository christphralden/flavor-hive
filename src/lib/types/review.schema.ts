import { z } from "zod";
import { fileArraySchema } from "./utils.schema";

export const ReviewPostSchema = z.object({
    description: z.string(),
    rating: z.number(),
    images: fileArraySchema,
    poster: z.string(),
    restaurant: z.string(),
    minPriceRange: z.number(),
    maxPriceRange: z.number(),
})