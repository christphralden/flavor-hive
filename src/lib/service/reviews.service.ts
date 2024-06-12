"use server"

import pb, {PB_KEYS} from '@service/pocketbase.service'
import { PocketbaseListTyped, PocketbaseTyped } from 'lib/types/utils.types';
import { fetchData } from '@service/auth.service'
import { ReviewGetAllSchema, ReviewListGetSchema, ReviewPostSchema } from 'lib/types/review.schema';
import { revalidatePath } from 'next/cache';
import { z, ZodError } from 'zod';

export async function getRestaurantReviewsPaged(recordId:string, page: number, perPage: number = 10, sort: string = "-created"):Promise<PocketbaseListTyped<PocketbaseTyped<Review_Poster>>>{
    return pb.collection(PB_KEYS.REVIEWS).getList(page, perPage, {
        sort: sort as string,
        cache: 'no-store',
        expand:"poster",
        filter: pb.filter('restaurant.id ?= {:id}', {id: recordId}),
    });
}

export async function getRestaurantReviewsAmount(recordId:string):Promise<number>{
    const { totalItems } = await pb.collection(PB_KEYS.REVIEWS).getList(1, 1,{
        cache: 'force-cache',
        filter: pb.filter('restaurant.id ?= {:id}', {id: recordId}),
    });
    return totalItems
}

// TODO: ini sama get reviews paged agak redundant krn atas paged ini full, but we chilling
export async function getRestaurantReviewStats(recordId:String):Promise<ReviewStats>{
    const data = await pb.collection(PB_KEYS.REVIEWS).getFullList({
        cache:"no-cache",
        filter: pb.filter('restaurant.id ?= {:id}', {id: recordId}),
    })
    const reviewData = ReviewGetAllSchema.parse(data)

    const reviewStats: ReviewStats = {
        amount: reviewData.length,
        stars: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        average: 0
    };
    
    let total = 0;
    
    reviewData.forEach(review => {
        total += review.rating;
        reviewStats.stars[review.rating] += 1;
    });
    
    reviewStats.average = total / reviewData.length;

    return reviewStats
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

