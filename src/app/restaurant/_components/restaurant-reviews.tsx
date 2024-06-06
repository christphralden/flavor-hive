import { Separator } from '@components/ui/separator';
import { getRestaurantReviewsPaged } from '@service/restaurant.service';
import Comment from 'app/_components/comment';
import { notFound } from 'next/navigation';
import StarRating from './star-rating';
import { Button } from '@components/ui/button';
import { Edit3 } from '@geist-ui/icons';

interface RestaurantReviewsProps {
    recordId: string;
}

// TODO: Sort based on recent, most upvoted
export default async function RestaurantReviews({ recordId }: RestaurantReviewsProps) {
    try {
        const reviews = await getRestaurantReviewsPaged(recordId, 1, 8);
        const totalItems = reviews.totalItems;
        const length = reviews.items.length;
        return (
            <>
                <Separator className="my-8" />
                <h1 className="text-lg lg:text-xl font-medium">
                    {totalItems}&nbsp;Review{totalItems > 1 && "s"}
                </h1>
                <div className="flex w-full h-fit gap-8 relative justify-between">
                    <div className="flex flex-col w-[60%]">
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
                    <div className="w-[35%] h-fit sticky top-24">
                        <div className="w-full h-full bg-secondary rounded-lg p-8">
                            <div className="flex flex-col gap-4">
                                <div className="w-full flex justify-between items-baseline">
                                    <h1 className="text-2xl lg:text-3xl font-medium">Ratings & Reviews</h1>
                                    <p className="text-sm lg:text-base text-gray-500">
                                        {totalItems}&nbsp;Ratings
                                    </p>
                                </div>

                                <div className="w-full flex gap-4 justify-between">
                                    <div className="flex flex-col w-[15%] justify-start items-center">
                                        <h1 className="text-4xl lg:text-5xl font-medium">4.5</h1>
                                        <p className="text-sm lg:text-base text-gray-500">out of 5</p>
                                    </div>
                                    <div className="w-[85%] flex flex-col">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <StarRating value={100 - i * 10} key={i} star={5 - i} />
                                        ))}
                                    </div>
                                </div>

                                <Separator className="my-4" />
                                <div className="w-full flex justify-end">
                                    <Button variant="default" className="flex gap-2">
                                        <Edit3 color="#fafafa" className="w-4 flex-shrink-0" />
                                        Leave a review
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } catch (error) {
        notFound();
    }
}