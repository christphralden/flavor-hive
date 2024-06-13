import { z } from "zod";


export const fileSchema = z.instanceof(File);
export const fileArraySchema = z.array(fileSchema);
export const dateStringSchema = z.union([z.string(), z.string().transform((str) => new Date(str))]);

export const PocketbaseAttributes = z.object({
    id:z.string(),
    created: dateStringSchema,
    updated: dateStringSchema,
    collectionId: z.string(),
    collectionName: z.string(),
})

export const PocketbaseListAttributes = z.object({
    page: z.number(),
    perPage: z.number(),
    totalPages: z.number(),
    totalItems: z.number(),
})