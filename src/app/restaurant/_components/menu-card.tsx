import pb from '@service/pocketbase.service';
import { formatPrice } from '@utils/utils';
import {PocketbaseTyped} from 'lib/types/utils.types';
import Image from 'next/image';
import React from 'react';

interface MenuCardProps {
	menu: PocketbaseTyped<MenuBase>;
}

export default function MenuCard({menu}: MenuCardProps) {
	const menuImage = pb.files.getUrl(menu, menu.image as string, {thumb: '0x300'});

	const price = formatPrice(menu.price)

	return (
		<div className="border flex flex-col rounded-lg p-4 justify-between gap-2 lg:gap-8 ">
			<div className="w-full h-[75%] aspect-square rounded-lg overflow-clip">
				<Image
					width={300}
					height={300}
					className="w-full h-full object-cover"
					src={menuImage}
					alt={menu.name}
				/>
			</div>
			<div className="w-full h-fit flex-col flex gap-2 lg:gap-4">
				<div>
					<h2 className="font-medium   text-base ">{menu.name}</h2>
					<p className="text-sm lg:  text-gray-500">{menu.description}</p>
				</div>
				<p className="font-medium   text-base ">{price}</p>
			</div>
		</div>
	);
}
