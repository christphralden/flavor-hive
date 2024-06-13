'use client';
import { Button } from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { InputLabelled } from '@components/ui/input-labelled';
import { TextareaLabelled } from '@components/ui/textarea-labelled';
import { createRestaurantReview } from '@service/reviews.service';
import StarSelect from '@components/review/star-select';

export default function CreateReviewForm({ restaurantId }: { restaurantId: string }) {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ReviewBase>();

    const submitReview = async (reviewData: ReviewBase) => {
        try {
            const reviewForm = new FormData();
            const otherData = {
                description: reviewData.description,
                rating: reviewData.rating,
                restaurant: restaurantId,
                spent: reviewData.spent,
            }
            reviewForm.append('otherData', JSON.stringify(otherData));

            if (reviewData.images && reviewData.images.length) {
                for (let i = 0; i < reviewData.images.length; i++) {
                    reviewForm.append('images', reviewData.images[i]);
                }
            }

            await createRestaurantReview({ review: reviewForm });

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
                        label="Total spent"
                        type="number"
                        {...register('spent', { required: 'Required' })}
                    >
                        {errors.spent && errors.spent.message}
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