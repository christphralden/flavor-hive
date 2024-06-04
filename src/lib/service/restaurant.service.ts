
"use server"
import pb, { PB_KEYS } from "./pocketbase.service";
import { fetchData } from "./auth.service";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { MenuGetArraySchema, MenuGetSchema, MenuPostArraySchema, RestaurantGetSchema, RestaurantPostSchema } from "lib/types/restaurant.schema";
import { ListResult, RecordModel } from "pocketbase";

export async function getRestaurant(recordId: string): Promise<Restaurant> {
    try {
        const data = await pb.collection(PB_KEYS.RESTAURANTS).getOne(recordId, {
            cache: "force-cache", 
        });
        try {
            const restaurant = RestaurantGetSchema.parse(data);
            return restaurant;
        } catch (error) {
            throw new Error("Invalid restaurant data")
        }
    } catch (error) {
        throw new Error("Error retrieving restaurant data");
    }
}

export async function getRestaurantReviews(recordId:string):Promise<Review_Poster[]>{
    return pb.collection(PB_KEYS.REVIEWS).getFullList({
        cache: 'no-cache',
        expand:"poster",
        filter: pb.filter('restaurant.id ?= {:id}', {id: recordId}),
    });
}

export async function getAllRestaurantPaged(page:number, perPage:number = 10):Promise<Restaurant[]>{
    const response = await pb.collection(PB_KEYS.RESTAURANTS).getList(page, perPage, {
        cache: 'no-cache',
    });
    const validRestaurants:Restaurant[] = response.items.filter(item => {
        const result = RestaurantGetSchema.safeParse(item);
        return result.success;
    }) as unknown as Restaurant[];
    
    return validRestaurants
}

export async function getRestaurantMenusPaged(restaurantId:string, page:number, perPage:number = 10):Promise<Menu[]>{
    try {
        const response = await pb.collection(PB_KEYS.MENUS).getList(page, perPage, {
            filter: pb.filter('restaurant ?= {:id}', {id: restaurantId}),
            // fields: 'id,name,description,price,image,restaurant',
            cache: "force-cache", 
        });

        try {
            const validMenus:Menu[] = response.items.filter(item=>{
                const result = MenuGetSchema.safeParse(item)
                return result.success
            }) as unknown as Menu[]
            return validMenus
        } catch (error) {
            throw new Error("Invalid menu data")
        }
    } catch (error) {
        console.error(error)
        throw new Error("Error retrieving restaurant's menu data");
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
        const menuRecords = MenuPostArraySchema.parse(parseMenus(menus, resRestaurant.id));
        const resMenu = await Promise.all(menuRecords.map(record =>
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