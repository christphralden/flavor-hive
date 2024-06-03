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
import { useState } from 'react'
import { useCreateRestaurant } from '@hooks/useCreateRestaurant'
import { InputLabelled } from '@components/ui/input-labelled'
import { TextareaLabelled } from '@components/ui/textarea-labelled'

export default function CreateRestaurantMenu() {
    const {finalize, isLoading} = useCreateRestaurant()
    const [dialogState, setDialogState] = useState<boolean>(false)

    const toggleDialog = () => setDialogState(!dialogState)
    const closeDialog = () => setDialogState(false)

    

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
						<CardContent className="h-full">
							<Dialog>
								<DialogTrigger
									asChild
									className="w-full justify-center items-center"
								>
									<Button
										variant="default"
										className="flex gap-2"
									>
										<Plus className="w-4 h-4" /> <p>Add</p>
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[50%]">
									<DialogHeader>
										<DialogTitle className="font-medium">Add Menu</DialogTitle>
										<DialogDescription>
											Input details of your menu
										</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<div className="w-full flex gap-4">
											<InputLabelled label="Name" />
											<InputLabelled
												type="number"
												label="Price"
											/>
										</div>
										<TextareaLabelled
											label="Description"
											className="h-[150px] max-h-[150px] min-h-[150px]"
											placeholder="Talk about your restaurant here"
										/>
                                        <InputLabelled type='file' label='Image'/>
									</div>
									<DialogFooter>
										<Button type="submit">Save changes</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</CardContent>
						<CardFooter className="flex justify-between w-full gap-4">
							<Link
								className="w-1/4"
								href={'category'}
							>
								<Button
									variant={'secondary'}
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
