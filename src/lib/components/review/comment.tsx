import { ThumbsDown, ThumbsUp } from '@geist-ui/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { formatDate } from '@utils/date-utils';
import { dateType } from 'lib/types/date.types';
import StarRepeat from './star-repeat';

interface CommentProps {
    review: Review_Poster | Review_Poster_Restaurant;
}

// TODO: upvote, downvote
export default function Comment({review}: CommentProps) {
    const time = formatDate(review.created, dateType.ago)
    const poster = review.expand.poster
    return (
        <div className="flex items-start gap-4 p-4 lg:px-4 px-0">
            <Avatar className='lg:w-12 lg:h-12 w-10 h-10' >
                <AvatarImage className='w-full h-full object-cover' src="https://media.licdn.com/dms/image/D5603AQEIXNZ1vsXYCw/profile-displayphoto-shrink_200_200/0/1695397038206?e=2147483647&v=beta&t=FAzG7jubiCufP3bAXEroNljEw4BLYiwSRQ9C8vZN_9c" alt='avatar' />
                <AvatarFallback>DC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full gap-4">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col items-start justify-center">
                        <span className="font-medium   text-sm ">{poster.name}</span>
                        <span className=" text-sm  text-gray-500">@{poster.username}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <StarRepeat amount={review.rating}/>
                        <span className="text-xs lg:text-sm  text-gray-500 text-right">{time}</span>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                <div className="  text-base  ">
                    <p className='text-gray-500'>{review.description}</p>
                </div>

                <div className="flex gap-4 text-sm   text-gray-500">
                    <div className='flex gap-2 items-center'>
                        <span><ThumbsUp className='w-4 flex-shrink-0'/></span>
                        <span>31</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span><ThumbsDown className='w-4 flex-shrink-0'/></span>
                        <span>19</span>
                    </div>
                </div>
                </div>
                
            </div>
        </div>
    );
}

