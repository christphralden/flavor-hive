'use server';

import pb, { PB_KEYS } from '@service/pocketbase';
import { notFound } from 'next/navigation';

interface RestaurantReviewProps {
	recordId: string;
}
export default async function RestaurantReview({recordId}: RestaurantReviewProps) {
	let record: Review_Poster[]
	try {
		record = await pb.collection(PB_KEYS.REVIEWS).getFullList({
			cache: 'no-cache', //note ini buat dev aja, nanti apus
			expand:"poster",
			filter: pb.filter('restaurant.id ?= {:id}', {id: recordId}),
		});

        return (
            <div className="flex gap-12 flex-col">
                {record.map((review: Review_Poster) => (
                    <div className="flex flex-col gap-1 bg-white text-black">
                        <div>id:<span>{review.id}</span></div>
                        <div>title:<span>{review.title}</span></div>
                        <div>description:<span>{review.description}</span></div>
                        <div>rating:<span>{review.rating}</span></div>
                        <div>created:<span>{review.created.toLocaleString()}</span></div>
                        <div>restaurant<span>{review.restaurant}</span></div>
                        <div>poster name:<span>{review.expand.poster.name}</span></div>
                        <div>poster username:<span>{review.expand.poster.username}</span></div>
                    </div>
                ))}
            </div>
        );
	} catch (error) {
        console.error(error)
		// notFound()
	}
	
}
