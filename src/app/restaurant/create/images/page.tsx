"use client"
import { Card, CardContent, CardFooter } from '@components/ui/card'
import CreateRestaurantHeader from '../_components/create-restaurant-header'
import Link from 'next/link'
import { Button } from '@components/ui/button'
import { InputLabelled } from '@components/ui/input-labelled'
import { useCreateRestaurant } from '@hooks/useCreateRestaurant'

export default function CreateRestaurantImages() {
    const {restaurantData, appendRestaurantData} = useCreateRestaurant();
    console.log(restaurantData)
    return (
        <>
            <section className='w-full'>
                <CreateRestaurantHeader
                    header="Let your food do the talking"
                    description="Give those hungry fellas a glimpse of what they're tasting."
                    step={2}
                />
            </section>
            <section className='w-full h-full'>
                <Card className="w-full h-full p-4 py-8 flex flex-col justify-between">
                    <CardContent className="mb-8">
                        <form className="flex flex-col gap-8" action="">
                            <InputLabelled label='Cover image' type='file' />
                            <InputLabelled label='Restaurant Images' type='file' multiple/>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between w-full gap-4">
                        <Link className="w-1/4" href={'info'}><Button variant={'secondary'} className="w-full">Back</Button></Link>
                        <Link className="w-3/4" href={'category'}><Button className="w-full">Continue</Button></Link>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}
