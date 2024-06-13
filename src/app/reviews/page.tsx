import Comment from '@components/review/comment';
import RestaurantComment from '@components/review/restaurant-comment';
import {getUserPastReviewsPaged} from '@service/reviews.service';
import {PocketbaseListTyped, PocketbaseTyped} from 'lib/types/utils.types';

export default async function Reviews() {
	const pastReviews: PocketbaseListTyped<PocketbaseTyped<Review_Poster_Restaurant>> = await getUserPastReviewsPaged(
        { page: 1, perPage: 10, sort: '-created' }	);
	return (
		<div className='w-[100%] flex flex-col gap-4'>
			{pastReviews.items.map((pastReview, i) => {
				return (
					<>
						<RestaurantComment
							review={pastReview}
							key={i}
						/>
					</>
				);
			})}
		</div>
	);
}
