"use server"

import pb, {PB_KEYS} from '@service/pocketbase.service'
import { PocketbaseListTyped, PocketbaseTyped } from 'lib/types/utils.types';
import { fetchData } from '@service/auth.service'
import { ReviewPostSchema } from 'lib/types/review.schema';
import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';

export async function getRestaurantReviewsPaged(recordId:string, page: number, perPage: number = 10, sort: string = ""):Promise<PocketbaseListTyped<PocketbaseTyped<Review_Poster>>>{
    return pb.collection(PB_KEYS.REVIEWS).getList(page, perPage, {
        sort: sort as string,
        cache: 'no-store',
        expand:"poster",
        filter: pb.filter('restaurant.id ?= {:id}', {id: recordId}),
    });
}

export async function getRestaurantReviewsAmount(recordId:string):Promise<number>{
    const { totalItems } = await pb.collection(PB_KEYS.REVIEWS).getList(1, 1,{
        cache: 'no-store',
        filter: pb.filter('restaurant.id ?= {:id}', {id: recordId}),
    });
    return totalItems
}


export async function createRestaurantReview(review: FormData): Promise<any>{
    const userData = await fetchData()
    if (!userData) throw new Error("You are not authorized to create a review.");
    
    try {
        const reviewData = JSON.parse(review.get('otherData') as string)
        
        const minPriceRange = Number(reviewData.minPriceRange)
        const maxPriceRange = Number(reviewData.maxPriceRange)
        const reviewRecord: ReviewBase = ReviewPostSchema.parse({
            ...reviewData,
            minPriceRange,
            maxPriceRange,
            poster: userData.id,
            images: review.getAll('images') as File[],

        })
        console.log(reviewRecord)
        if(reviewRecord.minPriceRange >= reviewData.maxPriceRange) throw new Error()
        if (!(reviewRecord.rating >= 0 ||reviewRecord.rating <=5) ) throw new Error()
        
        const resReview = await pb.collection(PB_KEYS.REVIEWS).create(reviewRecord);

        revalidatePath(`/restaurant/${reviewRecord.restaurant}`)
    } catch (error) {
        console.error(error)
        if (error instanceof ZodError) {
            throw new Error("Please fill in the necessary data correctly.");
        } else {
            throw new Error("Failed to process the request.");
        }
    }
}

