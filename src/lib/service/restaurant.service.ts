
"use server"
import pb, { PB_KEYS } from "./pocketbase.service";
import { fetchData } from "./auth.service";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { MenuGetSchema, MenuPostArraySchema, RestaurantGetSchema, RestaurantPostSchema } from "lib/types/restaurant.schema";
import { RecordModel } from "pocketbase";
import { PocketbaseTyped } from "lib/types/utils.types";

export async function getRestaurant(recordId: string): Promise<PocketbaseTyped<Restaurant>> {
    try {
        const record = await pb.collection(PB_KEYS.RESTAURANTS).getOne(recordId, {
            cache: "force-cache",
        });

        const restaurant: Restaurant = RestaurantGetSchema.parse({
            id: record.id,
            description: record.description,
            location: record.location,
            name: record.name,
            restaurantOwner: record.restaurantOwner,
            cover: record.cover,
            images: record.images,
            created: record.created,
            updated: record.updated,
            keywords: record.keywords
        });

        return { record, data: restaurant };
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

export async function getAllRestaurantPaged(page: number, perPage: number = 10): Promise<PocketbaseTyped<Restaurant>[]> {
    try {
        const records = await pb.collection(PB_KEYS.RESTAURANTS).getList(page, perPage, {
            cache: 'no-cache',
        });

        const recordsTransformed: PocketbaseTyped<Restaurant>[] = records.items.map(record => {

            const restaurant = RestaurantGetSchema.parse({
                id: record.id,
                description: record.description,
                location: record.location,
                name: record.name,
                restaurantOwner: record.restaurantOwner,
                cover: record.cover,
                images: record.images,
                created: record.created,
                updated: record.updated,
                keywords: record.keywords
            })
            return {
                record,
                data:restaurant
            };
        });

        return recordsTransformed
    } catch (error) {
        throw new Error("Error retrieving paginated restaurant data");
    }
}

export async function getRestaurantMenusPaged(restaurantId:string, page:number, perPage:number = 10):Promise<PocketbaseTyped<Menu>[]>{
    try {
        const records = await pb.collection(PB_KEYS.MENUS).getList(page, perPage, {
            filter: pb.filter('restaurant ?= {:id}', {id: restaurantId}),
            // fields: 'id,name,description,price,image,restaurant',
            cache: "force-cache", 
        });

        try {
            const recordTransformed:PocketbaseTyped<Menu>[] = records.items.map(record=>{
                const menu = MenuGetSchema.parse({
                    name:record.name,
                    description:record.description,
                    price:record.price,
                    image:record.image,
                    restaurant:record.restaurant,
                    id:record.id
                })

                return{
                    record,
                    data:menu
                }
            }) 
            return recordTransformed
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