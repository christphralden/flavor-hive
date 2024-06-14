import pb, {PB_KEYS} from '@service/pocketbase.service';
import {getRestaurantMenusPaged} from '@service/restaurant.service';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import MenuTab from './menu-tab';
import MenuCard from './menu-card';
import {Separator} from '@components/ui/separator';

interface RestaurantMenusProps {
	restaurantId: string;
}

export default async function RestaurantMenus({restaurantId}: RestaurantMenusProps) {
	try {
		const menus = await getRestaurantMenusPaged({ restaurantId: restaurantId, page: 1, perPage: 10 });
		const totalItems = menus.totalItems
		const length = menus.items.length
		if (length == 0) return null
		return (
			<>
				<Separator className='my-8'/>
                <h1 className="font-medium text-2xl lg:text-3xl">Menus</h1>
				<div>
					{length !== 0 && (
						<div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-8">
							{menus.items.map((menu, i) => {
								if (i <= 15) {
									return (
										<MenuCard
											menu={menu}
											key={i}
										/>
									);
								}
							})}
						</div>
					)}
				</div>
			</>
		);
	} catch (error) {
		return notFound();
	}
}
