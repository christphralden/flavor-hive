"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import CreateRestaurantHeader from '../_components/create-restaurant-header'
import Link from 'next/link'
import { Button } from '@components/ui/button'
import { Plus } from '@geist-ui/icons'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@components/ui/dialog"
import { useEffect, useState } from 'react'
import { useCreateRestaurant } from '@hooks/useCreateRestaurant'
import { InputLabelled } from '@components/ui/input-labelled'
import { TextareaLabelled } from '@components/ui/textarea-labelled'
import { useForm } from 'react-hook-form'
import { Separator } from '@components/ui/separator'

export default function CreateRestaurantMenu() {
    const {finalize, isLoading, appendMenuData, menuData} = useCreateRestaurant()
    const { register: formRegister, handleSubmit, reset, formState: { errors }, setValue } = useForm<MenuBase>();

    const [menuItems, setMenuItems] = useState<MenuBase[]>([]);

    const submit = (data:MenuBase) => {
        setMenuItems(prevItems => [...prevItems, data]);
        appendMenuData(data)
        reset();  
    };
    
    const [dialogState, setDialogState] = useState<boolean>(false)

    const toggleDialog = () => setDialogState(!dialogState)
    const closeDialog = () => setDialogState(false)


	useEffect(() => {
        setMenuItems(menuData)
    }, []);

    return (
			<>
				<section className="w-full">
					<CreateRestaurantHeader
						header="Hol' up, let him cook"
						description="Share the heart and soul of your restaurant with us. Let the world know what delicious dishes you’re cooking up!"
						step={4}
					/>
				</section>
				<section className="w-full h-full">
					<Card className="w-full h-full flex flex-col justify-between">
						<CardHeader>
							<CardDescription>Dont worry, you can always change this later</CardDescription>
						</CardHeader>
						<CardContent className="h-full flex flex-col gap-4">
                            <Dialog >
                                <DialogTrigger asChild className='w-full justify-center items-center'>
                                    <Button variant="default">
                                        <Plus /> <span>Add Menu</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='pt-10 w-full'>
                                    <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-4'>
                                        <InputLabelled
                                            label="Name"
                                            {...formRegister('name', { required: 'Name is required' })}
                                        >{errors.name && errors.name.message}</InputLabelled>
                                        <InputLabelled
                                            type="number"
                                            label="Price"
                                            {...formRegister('price', { required: 'Price is required' })}
                                        >{errors.price && errors.price.message}</InputLabelled>
                                        <TextareaLabelled
                                            label="Description"
                                            {...formRegister('description', { required: 'Description is required' })}
                                        >{errors.description && errors.description.message}</TextareaLabelled>
                                        <InputLabelled
                                            {...formRegister('image',  { required: 'Image is required' })}
                                            label="Image"
                                            type="file"
                                        >{errors.image && <p>{errors.image?.message}</p>}</InputLabelled>
                                        <Button className='mt-4' type="submit">Save Changes</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                            <Separator className='w-full border-1'/>
                            <div className='w-full flex flex-col gap-2'>
                                {menuItems.map((menu,i)=>(
                                    <p key={i}>{menu.name}</p>
                                ))}
                            </div>
						</CardContent>
						<CardFooter className="flex justify-between w-full gap-4">
							<Link
								className="w-1/4"
								href={'category'}
							>
								<Button
									variant={'outline'}
									className="w-full"
								>
									Back
								</Button>
							</Link>
							<Button
								onClick={toggleDialog}
								className="w-3/4"
							>
								Finish
							</Button>
						</CardFooter>
					</Card>
				</section>
				<AlertDialog open={dialogState}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Create restaurant</AlertDialogTitle>
							<AlertDialogDescription>
								Your registered restaurant data will be publicly available. <br />
								it will be used for our AI model securely to improve your exposure and performance, do you want to
								continue?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel
								disabled={isLoading}
								onClick={closeDialog}
							>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								disabled={isLoading}
								onClick={async () => {
									await finalize();
									closeDialog();
								}}
							>
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</>
		);
}
