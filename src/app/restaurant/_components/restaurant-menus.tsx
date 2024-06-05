import pb, {PB_KEYS} from '@service/pocketbase.service';
import {getRestaurantMenusPaged} from '@service/restaurant.service';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import MenuTab from './menu-tab';
import MenuCard from './menu-card';
import {Separator} from '@components/ui/separator';

interface RestaurantMenusProps {
	recordId: string;
}

export default async function RestaurantMenus({recordId}: RestaurantMenusProps) {
	try {
		const menus = await getRestaurantMenusPaged(recordId, 1, 10);
		if (menus.totalItems == 0) return null;

		return (
			<>
				<Separator />
                <h1 className="font-medium text-2xl lg:text-3xl">Menus</h1>
				<div>
					{menus.items.length !== 0 && (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
							{menus.items.map((menu, i) => {
								if (i <= 8) {
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
