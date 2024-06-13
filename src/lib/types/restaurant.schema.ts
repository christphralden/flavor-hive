import {z} from 'zod';
import {fileArraySchema, fileSchema, PocketbaseAttributes, PocketbaseListAttributes} from './utils.schema';

// Keywords Schema
const keywordsSchema = z
	.object({
		tags: z.array(z.string()),
	})
	.optional();

// Restaurant Schemas
const RestaurantBaseSchema = z.object({
	name: z.string(),
	cover: fileSchema.optional(),
	images: fileArraySchema.optional(),
	description: z.string(),
	location: z.string(),
	keywords: keywordsSchema,
	restaurantOwner: z.string(),
	cachedRating: z.number(),
});

export const RestaurantPostSchema = RestaurantBaseSchema;

export const RestaurantGetSchema = RestaurantBaseSchema.extend({
	cover: z.string().optional(),
	images: z.array(z.string()).optional(),
}).merge(PocketbaseAttributes);

export const RestaurantListGetSchema = z
	.object({
		items: z.array(RestaurantGetSchema),
	})
	.merge(PocketbaseListAttributes);

// Menu Schemas
const MenuBaseSchema = z.object({
	name: z.string(),
	description: z.string(),
	price: z.number(),
	restaurant: z.string(),
	image: fileSchema,
});

export const MenuPostSchema = MenuBaseSchema;

export const MenuGetSchema = MenuBaseSchema.extend({
	image: z.string(),
}).merge(PocketbaseAttributes);

export const MenuListPostSchema = z.array(MenuPostSchema);

export const MenuListGetSchema = z
	.object({
		items: z.array(MenuGetSchema),
	})
	.merge(PocketbaseListAttributes);

const FavoritedRestaurantBaseSchema = z.object({
	user: z.string(),
	restaurant: z.string(),
    favorited: z.boolean()
});

export const FavoritedRestaurantPostSchema = FavoritedRestaurantBaseSchema;

export const FavoritedRestaurantGetSchema = FavoritedRestaurantBaseSchema.merge(PocketbaseAttributes);
