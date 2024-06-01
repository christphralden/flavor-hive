"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import CreateRestaurantHeader from '../_components/create-restaurant-header';
import Link from 'next/link';
import { Button } from '@components/ui/button';
import { InputLabelled } from '@components/ui/input-labelled';
import { Badge } from '@components/ui/badge';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AlertCircle } from '@geist-ui/icons';

export default function CreateRestaurantCategory() {
    const [tags, setTags] = useState<string[]>([]);
    const {
		register: formRegister,
		formState: {errors},
		handleSubmit,
        watch,
		reset,
	} = useForm<{tag:string}>();

    const handleAddTag = ({tag}:{tag:string}) => {
        if(tags.length >8) {
            toast.error("You can only add up to 8 tags", {
                description:'Click a tag to remove ',
                icon: <AlertCircle className="h-full " />,
            })
            return
        }
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    const handleRemoveTag = (tag:string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    return (
			<>
				<section className="w-1/2">
					<CreateRestaurantHeader
						header="Define your flavor profile"
						description="Tell us your restaurant’s category with tags that reflect its unique flavors and specialties."
						step={3}
					/>
				</section>
				<section className="w-1/2 h-full">
					<Card className="w-full h-full p-4 py-8 flex flex-col justify-between">
						<CardContent className="mb-8">
							<form
								className="flex flex-col gap-8 w-full h-64"
								onSubmit={handleSubmit(handleAddTag)}
							>
								<div className="flex w-full items-end gap-4">
									<InputLabelled
										id="tag"
										className="w-3/4"
										label="Input Tags"
										{...formRegister('tag', {required: 'Must be filled'})}
                                        children={errors.tag && <p>{errors.tag?.message}</p>}
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
							<Link
								className="w-3/4"
								href={'menu'}
							>
								<Button className="w-full">Continue</Button>
							</Link>
						</CardFooter>
					</Card>
				</section>
			</>
		);
}