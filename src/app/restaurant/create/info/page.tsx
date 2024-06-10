'use client';
import {Card, CardContent, CardFooter} from '@components/ui/card';
import {InputLabelled} from '@components/ui/input-labelled';
import {InputPrefixed} from '@components/ui/input-prefixed';
import {Button} from '@components/ui/button';
import {TextareaLabelled} from '@components/ui/textarea-labelled';
import Link from 'next/link';
import CreateRestaurantHeader from '../_components/create-restaurant-header';
import {useCreateRestaurant} from '@hooks/useCreateRestaurant';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function CreateRestaurantInfo() {
	const {
		register: formRegister,
		formState: {errors},
		handleSubmit,
		reset,
	} = useForm<Partial<RestaurantBase>>();
	const {appendRestaurantData, restaurantData} = useCreateRestaurant();
	const router = useRouter();

	const submit = (data: Partial<RestaurantBase>) => {
		try {
			appendRestaurantData(data);
			router.push('images');
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (restaurantData) {
			reset(restaurantData);
		}
	}, []);

	return (
		<>
			<section className="w-full">
				<CreateRestaurantHeader
					header="Lets get you started!"
					description="We just need some basic info to get your restaurant up and running."
					step={1}
				/>
			</section>
			<section className="w-full h-full">
				<Card className="w-full h-full pt-6 ">
					<form
						className="flex flex-col justify-between h-full"
						onSubmit={handleSubmit(submit)}
					>
						<CardContent className="flex flex-col gap-8 ">
							<div className="flex flex-col gap-1">
								<div className="flex gap-2 items-baseline justify-between">
									<p className="font-normal   text-sm ">Restaurant Name</p>
									<div className="text-gray-500 text-sm lg:  ">
										{errors.name && <p>{errors.name?.message}</p>}
									</div>
								</div>
								<InputPrefixed
									{...formRegister('name', {required: 'Name is required'})}
									prefix="flavorhive.com/"
									placeholder="Restaurant"
								/>
							</div>

							<TextareaLabelled
								{...formRegister('description', {required: 'Description is required'})}
								label="Description"
								className="h-[150px] max-h-[150px] min-h-[150px]"
								placeholder="Talk about your restaurant here"
							>
								{errors.description && <p>{errors.description?.message}</p>}
							</TextareaLabelled>

							<InputLabelled
								{...formRegister('location', {required: 'Location is required'})}
								label="Location"
								placeholder="Somewhere"
							>
								{errors.location && <p>{errors.location?.message}</p>}
							</InputLabelled>
						</CardContent>
						<CardFooter className="flex justify-between w-full">
							<Button
								className="w-full"
								type="submit"
							>
								Continue
							</Button>
						</CardFooter>
					</form>
				</Card>
			</section>
		</>
	);
}
