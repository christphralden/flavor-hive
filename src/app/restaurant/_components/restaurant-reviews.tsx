import { Separator } from '@components/ui/separator';
import { getRestaurantReviewsPaged, getRestaurantReviewStats} from  '@service/reviews.service'
import Comment from '@components/review/comment';
import { notFound } from 'next/navigation';

import ReviewModal from './review-modal';

interface RestaurantReviewsProps {
    recordId: string;
}

// TODO: Sort based on recent, most upvoted
export default async function RestaurantReviews({ recordId }: RestaurantReviewsProps) {
    try {
        const [reviews, stats] = await Promise.all([
            getRestaurantReviewsPaged({ recordId, page: 1, perPage: 8 }),
            getRestaurantReviewStats({ recordId })
        ])
        const length = stats.amount
        return (
            <>
                <Separator className="my-8" />
                <div className="flex-col-reverse flex xl:flex-row w-full h-fit gap-16 relative justify-between">
                    <div className="flex flex-col w-full xl:w-[60%] ">
                        {length === 0 ? (
                            <p className="text-gray-500">
                                Restaurant has no reviews yet, Be the first one to leave an impression
                            </p>
                        ) : (
                            <>
                                {reviews.items.map((review: Review_Poster, i) => (
                                    <Comment review={review} key={i} />
                                ))}
                            </>
                        )}
                    </div>
                    <div className="w-full xl:w-[40%] h-fit xl:sticky xl:top-28">
                        <ReviewModal reviews={reviews} restaurantId={recordId} stats={stats}/>
                    </div>
                </div>
            </>
        );
    } catch (error) {
        notFound();
    }
}