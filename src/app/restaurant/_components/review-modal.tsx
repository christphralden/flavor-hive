'use client';
import {Button} from '@components/ui/button';
import {Separator} from '@radix-ui/react-separator';
import {Edit3} from 'lucide-react';
import React, { useState } from 'react';
import StarRating from '../../../lib/components/review/star-rating';
import {PocketbaseListTyped, PocketbaseTyped} from 'lib/types/utils.types';
import {
	Credenza,
	CredenzaBody,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger,
} from '@components/ui/credenza';
import CreateReviewForm from './create-review-form';
import { round } from '@utils/utils';

interface ReviewModalInterface {
	reviews: PocketbaseListTyped<PocketbaseTyped<Review_Poster>>;
	restaurantId: string;
	stats: ReviewStats;
}

export default function ReviewModal({reviews, restaurantId, stats}: ReviewModalInterface) {
	const totalItems = reviews.totalItems;
	const percentage = (value: number, ratio: number): number => {
		return (value / ratio) * 100;
	};


	return (
		<>
			<Credenza>
				<div className="w-full h-full bg-secondary rounded-lg p-6 lg:p-8">
					<div className="flex flex-col gap-4">
						<div className="w-full flex justify-between items-start">
							<h1 className="text-2xl lg:text-3xl font-medium">Ratings & Reviews</h1>
							<p className="text-sm lg:text-base text-gray-500 hidden lg:flex">{totalItems}&nbsp;Ratings</p>
							<div className="flex lg:hidden flex-col w-[20%] min-w-fit justify-start items-center ">
								<h1 className="text-4xl md:text-5xl font-medium">{round(stats.average)}</h1>
								<p className="text-sm lg:text-base text-nowrap text-gray-500">out of {totalItems}</p>
							</div>
						</div>
						<div className="w-full flex gap-4 justify-between">
							{stats.amount > 0 && (
								<>
									<div className="hidden lg:flex flex-col w-[20%] min-w-fit justify-start items-center ">
										<h1 className="text-4xl md:text-5xl font-medium">{round(stats.average)}</h1>
										<p className="text-sm lg:text-base text-nowrap text-gray-500">out of {totalItems}</p>
									</div>
									<div className="w-full lg:w-[80%] flex flex-col">
										{Array.from({length: 5}).map((_, i) => (
											<StarRating
												value={percentage(stats.stars[5 - i], stats.amount)}
												key={i}
												star={5 - i}
											/>
										))}
									</div>
								</>
							)}
						</div>
						<Separator className="my-2 lg:my-4" />
						<div className="w-full flex justify-end">
							<CredenzaTrigger asChild>
								<Button
									variant="default"
									className="flex gap-2"
								>
									<Edit3
										color="#fafafa"
										className="w-4 flex-shrink-0"
									/>
									Leave a review
								</Button>
							</CredenzaTrigger>
						</div>
					</div>
				</div>
				<CredenzaContent>
					<CredenzaHeader>
						<CredenzaTitle className="font-medium text-base lg:text-2xl">Leave a review</CredenzaTitle>
					</CredenzaHeader>
					<CredenzaBody>
						<CreateReviewForm restaurantId={restaurantId} />
					</CredenzaBody>
				</CredenzaContent>
			</Credenza>
		</>
	);
}
