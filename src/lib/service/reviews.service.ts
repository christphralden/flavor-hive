'use server';

import pb, {PB_KEYS} from '@service/pocketbase.service';
import {PocketbaseListTyped, PocketbaseTyped} from 'lib/types/utils.types';
import {fetchData} from '@service/auth.service';
import {ReviewGetAllSchema, ReviewPostSchema} from 'lib/types/review.schema';
import {revalidatePath} from 'next/cache';
import {z, ZodError} from 'zod';
import { getRestaurant } from './restaurant.service';

export async function getUserPastReviewsPaged({
	page,
	perPage = 10,
	sort = '-created',
}: {
	page: number;
	perPage?: number;
	sort?: string;
}): Promise<PocketbaseListTyped<PocketbaseTyped<Review_Poster_Restaurant>>> {
	const user = await fetchData();
	if (!user) throw new Error();

	return await pb.collection(PB_KEYS.REVIEWS).getList(page, perPage, {
		next: {
			revalidate: 60 * 1,
		},
		cache: 'no-store',
		sort: sort as string,
		expand: 'poster,restaurant',
		filter: pb.filter('poster.id ?= {:id}', {id: user.id}),
	});
}

export async function getRestaurantReviewsPaged({
	recordId,
	page,
	perPage = 10,
	sort = '-created',
}: {
	recordId: string;
	page: number;
	perPage?: number;
	sort?: string;
}): Promise<PocketbaseListTyped<PocketbaseTyped<Review_Poster>>> {
	return pb.collection(PB_KEYS.REVIEWS).getList(page, perPage, {
		next: {
			revalidate: 60 * 1,
		},
		cache: 'force-cache',
		sort: sort as string,
		expand: 'poster',
		filter: pb.filter('restaurant.id ?= {:id}', {id: recordId}),
	});
}

export async function getRestaurantReviewsAmount({ recordId }: { recordId: string; }): Promise<number> {
	const {totalItems} = await pb.collection(PB_KEYS.REVIEWS).getList(1, 1, {
		next: {
			revalidate: 60 * 1,
		},
		cache: 'force-cache',
		filter: pb.filter('restaurant.id ?= {:id}', {id: recordId}),
	});
	return totalItems;
}

// TODO: ini sama get reviews paged agak redundant krn atas paged ini full, but we chilling
export async function getRestaurantReviewStats({ recordId }: { recordId: String; }): Promise<ReviewStats> {
	const data = await pb.collection(PB_KEYS.REVIEWS).getFullList({
		cache: 'force-cache',
		next: {
			revalidate: 60 * 1,
		},
		filter: pb.filter('restaurant.id ?= {:id}', {id: recordId}),
	});
	const reviewData = ReviewGetAllSchema.parse(data);

	const reviewStats: ReviewStats = {
		amount: reviewData.length,
		stars: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
		average: 0,
	};

	let total = 0;

	reviewData.forEach((review) => {
		total += review.rating;
		reviewStats.stars[review.rating] += 1;
	});
	reviewStats.average = reviewData.length > 0 ? total / reviewData.length : 0;

	return reviewStats;
}

export async function createRestaurantReview({ review }: { review: FormData; }): Promise<any> {
	const userData = await fetchData();
	if (!userData) throw new Error('You are not authorized to create a review.');

	try {
		const reviewData = JSON.parse(review.get('otherData') as string);

		const spent = Number(reviewData.spent);
		const reviewRecord: Review = ReviewPostSchema.parse({
			...reviewData,
            spent,
			poster: userData.id,
			images: review.getAll('images') as File[],
		});
		// if (reviewRecord.spent <= 0) throw new Error();
		if (!(reviewRecord.rating >= 0 || reviewRecord.rating <= 5)) throw new Error();

		await pb.collection(PB_KEYS.REVIEWS).create(reviewRecord);

        const restaurantReviewAmount = await getRestaurantReviewsAmount({recordId:reviewRecord.restaurant})
        const futureRestaurantReviewAmount = restaurantReviewAmount + 1
		const restaurant = await getRestaurant({recordId:reviewRecord.restaurant})
        const newAverageRating = ((restaurant.cachedRating * restaurantReviewAmount) + reviewRecord.rating) / futureRestaurantReviewAmount;
        
        restaurant.cachedRating = newAverageRating

        await pb.collection(PB_KEYS.RESTAURANTS).update(reviewRecord.restaurant, restaurant);
        
        revalidatePath(`/restaurant/${reviewRecord.restaurant}`);
		revalidatePath(`/reviews`);
        revalidatePath('/home')
	} catch (error) {
		if (error instanceof ZodError) {
			throw new Error('Please fill in the necessary data correctly.');
		} else {
			throw new Error('Failed to process the request.');
		}
	}
}
