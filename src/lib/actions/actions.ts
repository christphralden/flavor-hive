"use server"

import { fetchData } from "@service/auth";
import pb, { PB_KEYS } from "@service/pocketbase.service";
import { revalidatePath } from "next/cache";

export interface State{
    status?:number
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