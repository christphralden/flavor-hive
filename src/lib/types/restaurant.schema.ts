import { z } from "zod";

// Reusable Schemas
const fileSchema = z.instanceof(File);
const fileArraySchema = z.array(fileSchema);
const dateStringSchema = z.union([z.string(), z.string().transform((str) => new Date(str))]);

// Keywords Schema
const keywordsSchema = z.object({
    tags: z.array(z.string())
}).optional();

// Restaurant Schemas
export const RestaurantBaseSchema = z.object({
    name: z.string(),
    cover: fileSchema.optional(),
    images: fileArraySchema.optional(),
    description: z.string(),
    location: z.string(),
    keywords: keywordsSchema,
    restaurantOwner: z.string(),
});

export const RestaurantPostSchema = RestaurantBaseSchema;

export const RestaurantGetSchema = RestaurantBaseSchema.extend({
    cover: z.string().optional(),
    images: z.array(z.string()).optional(),
    id: z.string(),
    created: dateStringSchema,
    updated: dateStringSchema,
    collectionId: z.string(),
    collectionName: z.string(),
});

export const RestaurantListGetSchema = z.object({
    page: z.number(),
    perPage: z.number(),
    totalPages: z.number(),
    totalItems: z.number(),
    items: z.array(RestaurantGetSchema)
});

// Menu Schemas
export const MenuBaseSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    restaurant: z.string(),
    image: fileSchema.optional(),
});

export const MenuPostSchema = MenuBaseSchema;

export const MenuGetSchema = MenuBaseSchema.extend({
    image: z.string(),
    id: z.string(),
    created: dateStringSchema,
    updated: dateStringSchema,
    collectionId: z.string(),
    collectionName: z.string(),
});

export const MenuListPostSchema = z.array(MenuPostSchema)

export const MenuListGetSchema = z.object({
    page: z.number(),
    perPage: z.number(),
    totalPages: z.number(),
    totalItems: z.number(),
    items: z.array(MenuGetSchema)
});
