import { Card, CardContent, CardFooter } from '@components/ui/card'
import CreateRestaurantHeader from '../_components/create-restaurant-header'
import Link from 'next/link'
import { Button } from '@components/ui/button'

export default function CreateRestaurantMenu() {
    return (
        <>
            <section className='w-1/2'>
                <CreateRestaurantHeader
                    header="Hol' up, let him cook"
                    description="Share the heart and soul of your restaurant with us. Let the world know what delicious dishes you’re cooking up!"
                    step={4}
                />
            </section>
            <section className='w-1/2'>
                <Card className="w-full p-4 py-8">
                    <CardContent className="mb-8">
                        <form className="flex flex-col gap-8" action="">
                            
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between w-full gap-4">
                        <Link className="w-1/4" href={'category'}><Button variant={'secondary'} className="w-full">Back</Button></Link>
                        <Button className="w-3/4">Finish</Button>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}
