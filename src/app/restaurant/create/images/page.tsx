"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@components/ui/card'
import CreateRestaurantHeader from '../_components/create-restaurant-header'
import Link from 'next/link'
import { Button } from '@components/ui/button'
import { InputLabelled } from '@components/ui/input-labelled'
import { useCreateRestaurant } from '@hooks/useCreateRestaurant'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CreateRestaurantImages() {
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
            appendRestaurantData(data)
            router.push('category')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (restaurantData) {
            reset(restaurantData);
        }
    }, []);

    return (
			<>
				<section className="w-full">
					<CreateRestaurantHeader
						header="Let your food do the talking"
						description="Give those hungry fellas a glimpse of what they're tasting."
						step={2}
					/>
				</section>
				<section className="w-full h-full">
					<Card className="w-full h-full pt-6  flex flex-col justify-between">
						<form
							className="flex flex-col justify-between h-full"
							onSubmit={handleSubmit(submit)}
						>
							<CardContent className="flex flex-col gap-8 ">
								<InputLabelled
									{...formRegister('cover')}
									label="Cover image"
									type="file"
                                    multiple={false}
								>{errors.cover && <p>{errors.cover?.message}</p>}</InputLabelled>
								<InputLabelled
									{...formRegister('images')}
									label="Restaurant Images"
									type="file"
									multiple
								>{errors.images && <p>{errors.images?.message}</p>}</InputLabelled>
							</CardContent>
							<CardFooter className="flex justify-between w-full gap-4">
								<Link
									className="w-1/4"
									href={'info'}
								>
									<Button
										variant={'outline'}
										className="w-full"
									>
										Back
									</Button>
								</Link>
								<Button
									type="submit"
									className="w-3/4"
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
