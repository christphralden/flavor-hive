import { z } from "zod";
import { fileArraySchema, PocketbaseAttributes, PocketbaseListAttributes } from "./utils.schema";

const ReviewBaseSchema = z.object({
    description: z.string(),
    rating: z.number(),
    images: fileArraySchema.optional(),
    poster: z.string(),
    restaurant: z.string(),
    spent: z.number(),
})

export const ReviewPostSchema = ReviewBaseSchema

export const ReviewGetSchema = ReviewBaseSchema.extend({
    images: z.string().array().optional(),
    id:z.string()
}).merge(PocketbaseAttributes)
export const ReviewGetAllSchema = ReviewGetSchema.array()

export const ReviewListGetSchema = z.object({
    items:z.array(ReviewGetSchema)
}).merge(PocketbaseListAttributes)