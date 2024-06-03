
"use server"
import { ListResult, RecordModel } from "pocketbase";
import pb, { PB_KEYS } from "./pocketbase.service";
import { fetchData } from "./auth.service";
import { revalidatePath } from "next/cache";
import { RestaurantGetSchema, RestaurantPostSchema } from "lib/types/restaurant.schema";

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
        cache: 'no-cache'
    });
    const validRestaurants:Restaurant[] = response.items.filter(item => {
        const result = RestaurantGetSchema.safeParse(item);
        return result.success;
    }) as unknown as Restaurant[];
    
    return validRestaurants
}


export async function createRestaurant(data: FormData): Promise<any> {
    const userData = await fetchData();

    if (!userData) throw new Error("You are not authorized to create a restaurant.")

    const cover = data.getAll('cover') as File[];
    const images = data.getAll('images') as File[];
    const otherData = JSON.parse(data.get('otherData') as string);


    try {
        const restaurant: RestaurantBase = RestaurantPostSchema.parse({
            ...otherData,
            cover: cover[0],
            images: images,
            restaurantOwner: userData.id,
        });

        try {
            const res = await pb.collection(PB_KEYS.RESTAURANTS).create(restaurant);
            revalidatePath("/restaurant/create/menu");
            return res;
        } catch (error) {
            throw new Error("Failed to process the request.");
        }

    } catch (error) {
        throw new Error("Please fill in the necessary data correctly")
    }

    
}