'use client';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@components/ui/card';
import CreateRestaurantHeader from '../_components/create-restaurant-header';
import Link from 'next/link';
import {Button} from '@components/ui/button';
import {Plus} from '@geist-ui/icons';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@components/ui/alert-dialog';
import {
	Credenza,
	CredenzaBody,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger,
} from '@components/ui/credenza';
import {ChangeEvent, useEffect, useState} from 'react';
import {useCreateRestaurant} from '@hooks/useCreateRestaurant';
import {InputLabelled} from '@components/ui/input-labelled';
import {TextareaLabelled} from '@components/ui/textarea-labelled';
import {useForm} from 'react-hook-form';
import {Separator} from '@components/ui/separator';
import {toast} from 'sonner';
import {AlertCircle} from 'lucide-react';
import MenuTab from 'app/restaurant/_components/menu-tab';

export default function CreateRestaurantMenu() {
	const {finalize, isLoading, appendMenuData, removeMenuData, menuData} = useCreateRestaurant();
	const {
		register: formRegister,
		handleSubmit,
		resetField,
		formState: {errors},
		setValue,
	} = useForm<MenuBase>();

	const [menuItems, setMenuItems] = useState<MenuBase[]>([]);

	const removeMenuItem = (menu: MenuBase) => {
		removeMenuData(menu);
		setMenuItems((currentItems) => currentItems.filter((item) => item !== menu));
	};

	const submit = async (data: MenuBase) => {
		if (menuItems.length >= 20 || menuData.length >= 20) {
			toast.error('You currently can only add up to 20 menus', {
				description: 'Please remove to add more.',
				icon: <AlertCircle className="h-full " />,
			});
			return;
		}
		try {
			await appendMenuData(data);
			await setMenuItems((prevItems) => [...prevItems, data]);
			toast.success('New menu added');
		} catch (error) {
			toast.error('Failed to add menu', {
				icon: <AlertCircle className="h-full " />,
			});
		}
	};

	const [dialogState, setDialogState] = useState<boolean>(false);

	const toggleDialog = () => setDialogState(!dialogState);
	const closeDialog = () => setDialogState(false);

	useEffect(() => {
		setMenuItems(menuData);
	}, []);

	return (
		<>
			<section className="w-full h-fit">
				<CreateRestaurantHeader
					header="Hol' up, let him cook"
					description="Share the heart and soul of your restaurant with us. Let the world know what delicious dishes you’re cooking up!"
					step={4}
				/>
			</section>
			<section className="w-full h-[70%] flex-1">
				<Card className="w-full h-full flex flex-col justify-between gap-0">
					<CardContent className="h-[85%] max-h-[85%] flex flex-col gap-4 pt-6">
						<Credenza>
							<CardDescription>Dont worry, you can always change this later</CardDescription>
							<CredenzaTrigger
								asChild
								className="w-full justify-center items-center"
							>
								<Button variant="default">
									<Plus />
									<span>Add Menu</span>
								</Button>
							</CredenzaTrigger>

							<CredenzaContent className="pt-10 w-full p-8 ">
								<CredenzaHeader>
									<CredenzaTitle className="font-medium text-base lg:text-xl">Create a new menu</CredenzaTitle>
								</CredenzaHeader>
								<form
									onSubmit={handleSubmit(submit)}
									className="flex flex-col gap-4"
								>
									<InputLabelled
										label="Name"
										{...formRegister('name', {required: 'Name is required'})}
									>
										{errors.name && errors.name.message}
									</InputLabelled>
									<InputLabelled
										type="number"
										label="Price"
										{...formRegister('price', {required: 'Price is required'})}
									>
										{errors.price && errors.price.message}
									</InputLabelled>
									<TextareaLabelled
										label="Description"
										{...formRegister('description', {required: 'Description is required'})}
									>
										{errors.description && errors.description.message}
									</TextareaLabelled>
									<InputLabelled
										{...formRegister('image',{required: 'Image is required'})}
										label="Cover image"
										type="file"
									>
										{errors.image && <p>{errors.image?.message}</p>}
									</InputLabelled>
									<Button
										className="mt-4"
										type="submit"
									>
										Save Changes
									</Button>
								</form>
							</CredenzaContent>
						</Credenza>
                        <Separator className="w-full border-1" />
                        <div className="w-full h-full overflow-y-scroll flex flex-col gap-4 rounded-lg overflow-clip">
                            {menuItems.map((menu, i) => (
                                <MenuTab
                                    onClick={removeMenuItem}
                                    key={i}
                                    menu={menu}
                                />
                            ))}
                        </div>
					</CardContent>
					<CardFooter className="flex justify-between w-full gap-4 h-fit">
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
