"use server"
import pb, { PB_KEYS } from "./pocketbase.service";
import { fetchData } from "./auth.service";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import {  MenuListGetSchema, MenuListPostSchema, RestaurantGetSchema, RestaurantListGetSchema, RestaurantPostSchema } from "lib/types/restaurant.schema";
import { PocketbaseListTyped, PocketbaseTyped } from "lib/types/utils.types";


export async function getRestaurant({ recordId }: { recordId: string; }): Promise<PocketbaseTyped<RestaurantBase>> {
    try {
        const record = await pb.collection(PB_KEYS.RESTAURANTS).getOne(recordId, {
            cache:'force-cache',
            next:{
                tags:['restaurant'],
                revalidate:60*5
            }
        });

        const restaurant: PocketbaseTyped<RestaurantBase> = RestaurantGetSchema.parse(record);

        return restaurant
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Error("Failed to validate data integrity");
        } else {
            throw new Error("Error retrieving restaurant data");
        }
    }
}
export async function getAllRestaurantPaged({ page, perPage = 10 }: { page: number; perPage?: number; }): Promise<PocketbaseListTyped<PocketbaseTyped<RestaurantBase>>> {
    try {
        const records = await pb.collection(PB_KEYS.RESTAURANTS).getList(page, perPage, {
            cache:'no-store',
            next:{
                tags:['restaurant'],
                revalidate:60*5
            }
        });
        const recordsTransformed: PocketbaseListTyped<PocketbaseTyped<RestaurantBase>> = RestaurantListGetSchema.parse(records)
        
        return recordsTransformed
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Error("Failed to validate data integrity");
        } else {
            throw new Error("Error retrieving restaurant data");
        }
    }
}

export async function getRestaurantMenusPaged({ restaurantId, page, perPage = 10 }: { restaurantId: string; page: number; perPage?: number; }):Promise<PocketbaseListTyped<PocketbaseTyped<MenuBase>>>{
    try {
        const records = await pb.collection(PB_KEYS.MENUS).getList(page, perPage, {
            cache:'force-cache',
            filter: pb.filter('restaurant ?= {:id}', {id: restaurantId}),
            next:{
                revalidate:60*5
            }
        });

        const recordTransformed:PocketbaseListTyped<PocketbaseTyped<MenuBase>> = MenuListGetSchema.parse(records)
        return recordTransformed
        
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Error("Failed to validate data integrity");
        } else {
            throw new Error("Error retrieving restaurant's menu data");
        }
        
    }
}

async function parseMenus({ menus, restaurantId }: { menus: FormData[]; restaurantId: string; }) {
    const menuData = menus.map(menu => {
        const menuImage = menu.getAll('image') as File[];
        const name = menu.get('name') as string;
        const price = parseFloat(menu.get('price') as string); 
        const description = menu.get('description') as string;

        const record: MenuPost = {
            image: (menuImage.length == 0) ? "" : menuImage[0],  
            name,
            price,
            description,
            restaurant: restaurantId
        };
        return record;
    });

    return menuData;
}

// TODO: Masalahnya gaada batch transaction, jd gaada auto rollback. restonya bisa amam, tp menunya engge
// terus restonya kebikin tp menunya kaga, tp errornya failed to process (gw gaperduli)
export async function createRestaurant({ restaurant, menus }: { restaurant: FormData; menus: FormData[]; }): Promise<any> {
    const userData = await fetchData();
    if (!userData) throw new Error("You are not authorized to create a restaurant.");

    try {
        const otherRestaurantData = JSON.parse(restaurant.get('otherData') as string);
        const restaurantRecord: RestaurantBase = RestaurantPostSchema.parse({
            ...otherRestaurantData,
            cover: restaurant.getAll('cover')[0] as File,
            images: restaurant.getAll('images') as File[],
            restaurantOwner: userData.id,
            cachedRating:0
        });

        const resRestaurant: PocketbaseTyped<RestaurantBase> = await pb.collection(PB_KEYS.RESTAURANTS).create(restaurantRecord);
        const menuRecords = MenuListPostSchema.parse(await parseMenus({ menus, restaurantId: resRestaurant.id }));
        // if(menuRecords.length>20) throw new Error("Currently you can only add up to 20 menus")

        const resMenu = await Promise.all(menuRecords.map(async(record) =>
            await pb.collection(PB_KEYS.MENUS).create(record, { '$autoCancel': false })
        ));

        userData.isRestaurantOwner = true
        await pb.collection(PB_KEYS.USERS).update(userData.id, userData);
        
        revalidatePath('/home')
        revalidatePath(`/restaurant/${resRestaurant.id}`)
        return { resRestaurant, resMenu };
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Error("Please fill in the necessary data correctly.");
        } else {
            throw new Error("Failed to process the request.");
        }
    }
}