
"use server"
import pb, { PB_KEYS } from "./pocketbase.service";
import { fetchData } from "./auth.service";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { MenuGetSchema, MenuListGetSchema, MenuListPostSchema, RestaurantGetSchema, RestaurantListGetSchema, RestaurantPostSchema } from "lib/types/restaurant.schema";
import { PocketbaseListTyped, PocketbaseTyped } from "lib/types/utils.types";

export async function getRestaurant(recordId: string): Promise<PocketbaseTyped<RestaurantBase>> {
    try {
        const record = await pb.collection(PB_KEYS.RESTAURANTS).getOne(recordId, {
            cache: "force-cache",
        });

        const restaurant: PocketbaseTyped<RestaurantBase> = RestaurantGetSchema.parse(record);

        return restaurant
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Error("Please fill in the necessary data correctly.");
        } else {
            throw new Error("Error retrieving restaurant data");
        }
    }
}

export async function getRestaurantReviews(recordId:string):Promise<Review_Poster[]>{
    return pb.collection(PB_KEYS.REVIEWS).getFullList({
        cache: 'no-cache',
        expand:"poster",
        filter: pb.filter('restaurant.id ?= {:id}', {id: recordId}),
    });
}

export async function getAllRestaurantPaged(page: number, perPage: number = 10): Promise<PocketbaseListTyped<PocketbaseTyped<RestaurantBase>>> {
    try {
        const records = await pb.collection(PB_KEYS.RESTAURANTS).getList(page, perPage, {
            cache: 'no-cache',
        });

        const recordsTransformed: PocketbaseListTyped<PocketbaseTyped<RestaurantBase>> = RestaurantListGetSchema.parse(records)
        
        return recordsTransformed
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Error("Please fill in the necessary data correctly.");
        } else {
            throw new Error("Error retrieving restaurant data");
        }
    }
}

export async function getRestaurantMenusPaged(restaurantId:string, page:number, perPage:number = 10):Promise<PocketbaseListTyped<PocketbaseTyped<MenuBase>>>{
    try {
        const records = await pb.collection(PB_KEYS.MENUS).getList(page, perPage, {
            filter: pb.filter('restaurant ?= {:id}', {id: restaurantId}),
            cache: "force-cache", 
        });

        const recordTransformed:PocketbaseListTyped<PocketbaseTyped<MenuBase>> = MenuListGetSchema.parse(records)
        return recordTransformed
        
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Error("Please fill in the necessary data correctly.");
        } else {
            throw new Error("Error retrieving restaurant's menu data");
        }
        
    }
}

function parseMenus(menus: FormData[], restaurantId: string) {
    const menuData = menus.map(menu => {
        const menuImage = menu.getAll('image') as File[];
        const name = menu.get('name') as string;
        const price = parseFloat(menu.get('price') as string); 
        const description = menu.get('description') as string;

        // if (menuImage.length == 0) continue
        
        const record: MenuPost = {
            image: menuImage[0],  
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
export async function createRestaurant(restaurant: FormData, menus: FormData[]): Promise<any> {
    const userData = await fetchData();
    if (!userData) throw new Error("You are not authorized to create a restaurant.");

    try {
        const otherRestaurantData = JSON.parse(restaurant.get('otherData') as string);
        const restaurantRecord: RestaurantBase = RestaurantPostSchema.parse({
            ...otherRestaurantData,
            cover: restaurant.getAll('cover')[0] as File,
            images: restaurant.getAll('images') as File[],
            restaurantOwner: userData.id,
        });

        const resRestaurant = await pb.collection(PB_KEYS.RESTAURANTS).create(restaurantRecord);
        const menuRecords = MenuListPostSchema.parse(parseMenus(menus, resRestaurant.id));
        const resMenu = await Promise.all(menuRecords.map((record) =>
            pb.collection(PB_KEYS.MENUS).create(record, { '$autoCancel': false })
        ));

        revalidatePath("/restaurant/create/menu");
        return { resRestaurant, resMenu };
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Error("Please fill in the necessary data correctly.");
        } else {
            throw new Error("Failed to process the request.");
        }
    }
}