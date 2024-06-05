"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
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
import { Plus } from 'lucide-react';
import { Separator } from '@components/ui/separator';

export default function CreateRestaurantCategory() {
    const [tags, setTags] = useState<string[]>([]);
    const {
		register:formRegister,
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

	// TODO: Back juga save
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
    }, []);

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
					<Card className="w-full h-full flex flex-col justify-between">
						<CardHeader>
							<CardTitle className='font-normal'>
								<form
									onSubmit={handleSubmit(handleAddTag)}
									className="flex flex-col gap-8 w-full"
								>
									<div className="flex w-full items-end gap-4">
										<InputLabelled
											id="tag"
											className="w-5/6"
											label="Tags"
											{...formRegister('tag', {required: 'Tag is required'})}
										/>
										<Button className="flex gap-2 w-1/6">
											<Plus className="w-4 flex-shrink-0" />
											<p>Add</p>
										</Button>
									</div>
								</form>
							</CardTitle>
						</CardHeader>
						<CardContent className="h-full flex flex-col gap-4">
							<Separator/>
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
						</CardContent>
						<CardFooter className="flex justify-between w-full gap-4">
							<Link
								className="w-1/4"
								href={'images'}
							>
								<Button
									variant={'outline'}
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