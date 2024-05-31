import { Suspense } from 'react';
import RestaurantHeader from '../_components/restaurant-header';
import RestaurantReview from '../_components/restaurant-review';

interface RestaurantProps{
    params: {
        id: string
    }
}

export default async function Restaurant({params}: RestaurantProps) {
	return (
		<>
			<Suspense fallback='loading...'>
                <RestaurantHeader recordId={params.id} />
            </Suspense>
            <br/>
            <Suspense fallback='loading...'>
                <RestaurantReview recordId={params.id} />
            </Suspense>
		</>
	);
}
