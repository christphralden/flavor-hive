import { ListResult, RecordModel } from "pocketbase";
import pb, { PB_KEYS } from "./pocketbase.service";

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