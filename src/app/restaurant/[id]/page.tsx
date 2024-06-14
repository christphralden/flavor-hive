import {Suspense} from 'react';
import RestaurantHeader from '../_components/restaurant-header';
import RestaurantReviews from '../_components/restaurant-reviews';
import RestaurantMenus from '../_components/restaurant-menus';

interface RestaurantProps {
	params: {
		id: string;
	};
}

export default async function Restaurant({params}: RestaurantProps) {
	return (
		<>
			<Suspense fallback="loading...">
				<RestaurantHeader restaurantId={params.id} />
			</Suspense>
			<Suspense fallback="loading...">
				<RestaurantReviews restaurantId={params.id} />
			</Suspense>
			<Suspense fallback="loading...">
				<RestaurantMenus restaurantId={params.id} />
			</Suspense>
		</>
	);
}
