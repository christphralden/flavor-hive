import { z } from "zod";
import { dateStringSchema, fileArraySchema, fileSchema, PocketbaseAttributes, PocketbaseListAttributes } from "./utils.schema";

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
}).merge(PocketbaseAttributes);

export const RestaurantListGetSchema = z.object({
    items: z.array(RestaurantGetSchema)
}).merge(PocketbaseListAttributes);

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
}).merge(PocketbaseAttributes);

export const MenuListPostSchema = z.array(MenuPostSchema)

export const MenuListGetSchema = z.object({
    items: z.array(MenuGetSchema)
}).merge(PocketbaseListAttributes);
