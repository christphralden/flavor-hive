import { ListResult, RecordModel } from "pocketbase";
import pb, { PB_KEYS } from "./pocketbase.service";
import { fetchData } from "@service/auth.service";
import { revalidatePath } from "next/cache";

export async function getRestaurant(recordId:string):Promise<Restaurant>{
    return pb.collection(PB_KEYS.RESTAURANTS).getOne(recordId,{
        cache:"force-cache", 
    });
}

export async function getRestaurantReviews(recordId:string):Promise<Review_Poster[]>{
    return pb.collection(PB_KEYS.REVIEWS).getFullList({
        cache: 'no-cache',
        expand:"poster",
        filter: pb.filter('restaurant.id ?= {:id}', {id: recordId}),
    });
}

export async function getAllRestaurantPaged(page:number, perPage:number = 10):Promise<ListResult<RecordModel>>{
    return pb.collection(PB_KEYS.RESTAURANTS).getList(page, perPage, {
        cache: 'no-cache'
    });
    
}



export async function createRestaurant(prevState: State, data: FormData): Promise<State> {
	const userData = await fetchData();

	if (!userData) return {
        status: 400
    }

	const restaurant: RestaurantBase = {
        name: data.get('name') as string,
        description: data.get('description') as string,
        location: data.get('location') as string,
        keywords: {
            tags: (data.getAll('keywords.tags') as string[]).map(tag => tag.trim()),
        },
        images: [],
        restaurantOwner: userData.id
	};

	try {
        const record = await pb.collection(PB_KEYS.RESTAURANTS).create(restaurant);
        revalidatePath("/restaurant/create")
        return {status:200}
    } catch (error:any) {
        return {
            status:error.code || 400
        }
	}
}