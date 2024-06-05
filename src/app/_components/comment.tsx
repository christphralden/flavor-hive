import { ThumbsDown, ThumbsUp } from '@geist-ui/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import React from 'react';

interface CommentProps {
    review: Review_Poster;
}

// TODO: upvote, downvote
export default function Comment({review}: CommentProps) {
    return (
        <div className="flex items-start gap-4 p-4">
            <Avatar className='lg:w-12 lg:h-12 w-8 h-8' >
                <AvatarImage className='w-full h-full object-cover' src="https://media.licdn.com/dms/image/D5603AQEIXNZ1vsXYCw/profile-displayphoto-shrink_200_200/0/1695397038206?e=2147483647&v=beta&t=FAzG7jubiCufP3bAXEroNljEw4BLYiwSRQ9C8vZN_9c" alt='avatar' />
                <AvatarFallback>DC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col items-start justify-center">
                        <span className="font-semibold">{review.expand.poster.name}</span>
                        <span className="text-sm text-gray-500">@{review.expand.poster.username}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">{review.created.toLocaleString()}</span>
                        <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="mt-2 text-sm lg:text-base">
                        <p className='text-gray-500'>{review.description}</p>
                    </div>
                    <div className="flex gap-2 text-sm text-gray-500">
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

