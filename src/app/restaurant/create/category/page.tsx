"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import CreateRestaurantHeader from '../_components/create-restaurant-header';
import Link from 'next/link';
import { Button } from '@components/ui/button';
import { InputLabelled } from '@components/ui/input-labelled';
import { Badge } from '@components/ui/badge';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AlertCircle } from '@geist-ui/icons';
import { useCreateRestaurant } from '@hooks/useCreateRestaurant';
import { useRouter } from 'next/navigation';

export default function CreateRestaurantCategory() {
    const [tags, setTags] = useState<string[]>([]);
    const {
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<{ tag: string }>();
	const {appendRestaurantData, restaurantData} = useCreateRestaurant();
	const router = useRouter();

    const handleAddTag = (data: { tag: string }) => {
        const newTag = data.tag.trim();
        if (!newTag) return; 
        if (tags.length >= 8) {
            toast.error("You can only add up to 8 tags", {
                description: 'Click a tag to remove it.',
                icon: <AlertCircle className="h-full " />,
            });
            return;
        }
        if (!tags.includes(newTag)) {
            setTags(prevTags => [...prevTags, newTag]);
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(prevTags => prevTags.filter(t => t !== tag));
    };

    const handleContinue = () => {
        appendRestaurantData({
			keywords: {
				tags: tags
			}
		});
        router.push('menu');
    };

	useEffect(() => {
        if (restaurantData?.keywords?.tags) {
            setTags(restaurantData.keywords.tags);
        }
    }, [restaurantData]);

    return (
		<>
			<section className="w-full">
				<CreateRestaurantHeader
					header="Define your flavor profile"
					description="Tell us your restaurant’s category with tags that reflect its unique flavors and specialties."
					step={3}
				/>
			</section>
			<section className="w-full h-full">
				<Card className="w-full h-full p-4 py-8 flex flex-col justify-between">
					<CardContent className="mb-8">
						<form
							onSubmit={handleSubmit(handleAddTag)}
							className="flex flex-col gap-8 w-full h-64"
						>
							<div className="flex w-full items-end gap-4">
								<InputLabelled
									id="tag"
									className="w-3/4"
									label="Tags"
									{...register('tag', { required: 'Tag is required' })}
								/>
								<Button
									className="w-1/4"
									type="submit"
								>
									Add
								</Button>
							</div>
							<div className="flex flex-wrap gap-2 overflow-y-scroll">
								{tags.map((tag, index) => (
									<Badge
										variant={'outline'}
										key={index}
										onClick={() => handleRemoveTag(tag)}
									>
										{tag}
									</Badge>
								))}
							</div>
						</form>
					</CardContent>
					<CardFooter className="flex justify-between w-full gap-4">
						<Link
							className="w-1/4"
							href={'images'}
						>
							<Button
								variant={'secondary'}
								className="w-full"
							>
								Back
							</Button>
						</Link>
						<Button
							className="w-3/4"
							onClick={handleContinue}
						>
							Continue
						</Button>
					</CardFooter>
				</Card>
			</section>
		</>
	);
}