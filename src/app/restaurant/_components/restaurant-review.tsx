'use server';

import pb from '@service/pocketbase';

interface RestaurantReviewProps {
	recordId: string;
}
export default async function RestaurantReview({recordId}: RestaurantReviewProps) {
	let record: any = {};
	try {
		record = await pb.collection('reviews').getFullList({
			cache: 'no-cache',
			// expand:"restaurant",
			filter: pb.filter('restaurant.id ?= {:id}', {id: recordId}),
		});
	} catch (error) {
		console.error(error);
	}
	console.log(record);
	return (
		<div className="flex gap-12 flex-col">
			{record.map((reviews: any) => (
				<div className="flex flex-col gap-1 bg-white text-black">
					{Object.entries(reviews).map(([key, value]) => (
						<div key={key}>{`${key}: ${JSON.stringify(value)}`}</div>
					))}
				</div>
			))}
		</div>
	);
}
