import { Separator } from '@components/ui/separator';
import { getRestaurantReviews } from '@service/restaurant.service';
import Comment from 'app/_components/comment';
import { notFound } from 'next/navigation';

interface RestaurantReviewProps {
	recordId: string;
}

// TODO: Sort based on recent, most upvoted
export default async function RestaurantReview({recordId}: RestaurantReviewProps) {
	try {
		const record: Review_Poster[] = await getRestaurantReviews(recordId);
        if (record.length == 0)  {
            return(
                <>
                    <Separator/>
                    <p className='text-gray-500'>Restaurant has no reviews yet, Be the first one to leave an impression</p>
                </>
            )
        }
        return (
            <>
            <Separator/>
            <h1 className='text-lg lg:text-xl font-medium'>{record.length}&nbsp;Reviews</h1>
            <div className="flex flex-col">
                {record.map((review: Review_Poster, i) => (
                    <Comment review={review} key={i}/>
                ))}
            </div>
            </>
        );
	} catch (error) {
		notFound()
	}
	
}
