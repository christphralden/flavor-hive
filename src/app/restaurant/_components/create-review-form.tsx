'use client';
import { Button } from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { InputLabelled } from '@components/ui/input-labelled';
import { TextareaLabelled } from '@components/ui/textarea-labelled';
import { createRestaurantReview } from '@service/reviews.service';
import StarSelect from '@components/review/star-select';

interface ReviewFormInputs {
    description: string;
    images?: FileList;
    poster: string;
    rating: number;
    restaurant: string;
    minPriceRange: number;
    maxPriceRange: number;
}

export default function CreateReviewForm({ restaurantId }: { restaurantId: string }) {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ReviewFormInputs>();

    const submitReview = async (data: ReviewFormInputs) => {
        try {
            const formData = new FormData();
            const otherData = {
                description: data.description,
                rating: data.rating,
                restaurant: restaurantId,
                minPriceRange: data.minPriceRange,
                maxPriceRange: data.maxPriceRange,
            }
            formData.append('otherData', JSON.stringify(otherData));

            if (data.images) {
                Array.from(data.images).forEach((file) => formData.append('images', file));
            }

            await createRestaurantReview({ review: formData });

            toast.success('Review submitted successfully');
        } catch (error) {
            toast.error('Failed to submit review', {
                icon: <AlertCircle className="h-full " />,
            });
        }
    };

    return (
        <section className="w-full h-fit">
            <form onSubmit={handleSubmit(submitReview)} className="flex flex-col gap-4">
                <TextareaLabelled
                    className='h-[350px] min-h-[250px] max-h-[250px]'
                    label="Review Description"
                    {...register('description', { required: 'Description is required' })}
                >
                    {errors.description && errors.description.message}
                </TextareaLabelled>
                <InputLabelled
                    type="file"
                    label="Images (optional)"
                    {...register('images')}
                >
                    {errors.images && errors.images.message}
                </InputLabelled>
                <div className="flex items-center gap-4">
                    <InputLabelled
                        label="Min Price"
                        type="number"
                        {...register('minPriceRange', { required: 'Required' })}
                    >
                        {errors.minPriceRange && errors.minPriceRange.message}
                    </InputLabelled>
                    <InputLabelled
                        label="Max Price"
                        type="number"
                        {...register('maxPriceRange', { required: 'Required' })}
                    >
                        {errors.maxPriceRange && errors.maxPriceRange.message}
                    </InputLabelled>
                </div>
                <div className="flex items-center gap-4">
                    <h1 className='font-medium'>Rating</h1>
                    <StarSelect
                        onChange={(rating) => setValue('rating', rating)}
                        value={watch('rating')}
                    />
                </div>
                <Button type="submit">Submit Review</Button>
            </form>
        </section>
    );
}