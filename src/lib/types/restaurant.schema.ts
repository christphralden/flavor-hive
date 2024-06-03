
import {z} from "zod"

const fileSchema = z.instanceof(File);

const fileArray = z.array(fileSchema)

export const RestaurantPostSchema = z.object({
    name: z.string(),
    cover: fileSchema.optional(),
    images: fileArray.optional(),
    description: z.string(),
    location: z.string(),
    keywords: z.object({
        tags: z.array(z.string())
    }).optional(),
    restaurantOwner: z.string(),
});

export const RestaurantGetSchema = z.object({
    id:z.string(),
    name: z.string(),
    cover: z.string().optional(),
    images: z.array(z.string()).optional(),
    description: z.string(),
    location: z.string(),
    keywords: z.object({
        tags: z.array(z.string())
    }).optional(),
    restaurantOwner: z.string(),
    created: z.string().transform((str) => new Date(str)),
    updated: z.string().transform((str) => new Date(str)),
});

export const MenuSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    restaurant: z.string(),
    image: z.optional(fileSchema)
})

export const MenuPostSchema = z.array(MenuSchema)

export const RestaurantListGetSchema = z.array(RestaurantGetSchema)
