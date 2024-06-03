"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import CreateRestaurantHeader from '../_components/create-restaurant-header'
import Link from 'next/link'
import { Button } from '@components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@components/ui/alert-dialog"
import { useState } from 'react'
import { useCreateRestaurant } from '@hooks/useCreateRestaurant'

export default function CreateRestaurantMenu() {
    const {finalize, isLoading} = useCreateRestaurant()
    const [dialogState, setDialogState] = useState<boolean>(false)

    const toggleDialog = () => setDialogState(!dialogState)
    const closeDialog = () => setDialogState(false)

    return (
        <>
            <section className='w-full'>
                <CreateRestaurantHeader
                    header="Hol' up, let him cook"
                    description="Share the heart and soul of your restaurant with us. Let the world know what delicious dishes you’re cooking up!"
                    step={4}
                />
            </section>
            <section className="w-full h-full">
                <Card className="w-full h-full p-4 py-8 flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className='font-medium'>Your Menu's</CardTitle>
                    <CardDescription>Dont worry you can always edit or fill this in later.</CardDescription>
                </CardHeader>
                    <CardContent className="mb-8">
                        <form className="flex flex-col gap-8" action="">

                            
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between w-full gap-4">
                        <Link className="w-1/4" href={'category'}><Button variant={'secondary'} className="w-full">Back</Button></Link>
                        <Button onClick={toggleDialog} className='w-3/4'>Finish</Button>
                    </CardFooter>
                </Card>
            </section>
            <AlertDialog open={dialogState}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Create restaurant</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your registered restaurant data will be publicly available. <br/>it will be used for our AI model securely to improve your exposure and performance, do you want to continue? 
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading} onClick={closeDialog}>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isLoading} onClick={async ()=>{await finalize(); closeDialog()}}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
