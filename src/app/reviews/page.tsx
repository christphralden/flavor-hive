import Comment from '@components/review/comment';
import {getUserPastReviewsPaged} from '@service/reviews.service';
import {PocketbaseListTyped, PocketbaseTyped} from 'lib/types/utils.types';
import React from 'react';

export default async function Reviews() {
	const pastReviews: PocketbaseListTyped<PocketbaseTyped<Review_Poster_Restaurant>> = await getUserPastReviewsPaged(
        { page: 1, perPage: 10, sort: '-created' }	);
	return (
		<div>
			{pastReviews.items.map((pastReview, i) => {
				return (
					<>
                        <p>{pastReview.expand.restaurant.name}</p>
						<Comment
							review={pastReview}
							key={i}
						/>
					</>
				);
			})}
		</div>
	);
}
