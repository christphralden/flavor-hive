'use client';

import {Button} from '@components/ui/button';
import {Heart, HeartFill} from '@geist-ui/icons';
import {useMutation} from 'react-query';
import {toggleFavorite} from '@service/restaurant.service';
import {useState} from 'react';
import {toast} from 'sonner';

interface FavoriteButtonProps {
	favorited: boolean;
	restaurantId: string;
}

export default function FavoriteButton({favorited: initialFavorited, restaurantId}: FavoriteButtonProps) {
	const [favorited, setFavorited] = useState(initialFavorited);

	const {mutate: toggle, isLoading} = useMutation(toggleFavorite, {
		onSuccess: () => {
			setFavorited(!favorited);
			const message = !favorited ? 'Favorited' : 'Removed from favorites';
			toast.success(message);
		},
		onError: (error: Error) => {
			console.error('Error toggling favorite:', error);
		},
	});

	return (
		<Button
			variant={'outline'}
			className="flex gap-2 bg-indigo-200"
			onClick={() => toggle({restaurantId})}
			disabled={isLoading}
		>
			{favorited ? (
				<>
					<HeartFill className="w-4 flex-shrink-0" />
					Remove from favorites
				</>
			) : (
				<>
					<Heart className="w-4 flex-shrink-0" />
					Add to favorites
				</>
			)}
		</Button>
	);
}
