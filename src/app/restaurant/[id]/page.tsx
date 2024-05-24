"use server"
import { Suspense } from 'react';
import RestaurantHeader from '../_components/restaurant-header';

interface RestaurantProps{
    params: {
        id: string
    }
}

export default async function Restaurant({params}: RestaurantProps) {
	return (
		<>
        <div>ini kerender langsung, tp bawah gw bakal loading</div>
			<Suspense fallback='loading...'>
                <RestaurantHeader recordId={params.id} />
            </Suspense>
		</>
	);
}
