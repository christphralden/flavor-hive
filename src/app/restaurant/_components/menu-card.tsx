import pb from '@service/pocketbase.service';
import {PocketbaseTyped} from 'lib/types/utils.types';
import Image from 'next/image';
import React from 'react';

interface MenuCardProps {
	menu: PocketbaseTyped<MenuBase>;
}

export default function MenuCard({menu}: MenuCardProps) {
	const menuImage = pb.files.getUrl(menu, menu.image as string, {thumb: '0x300'});

	return (
		<div className="border flex flex-col rounded-lg p-4 justify-between ">
			<div className="w-full h-[75%] rounded-lg overflow-clip">
				<Image
					width={300}
					height={300}
					className="w-full h-full object-cover"
					src={menuImage}
					alt={menu.name}
				/>
			</div>
			<div className="w-full h-fit flex-col flex gap-4">
				<div>
					<h2 className="font-medium text-base lg:text-lg">{menu.name}</h2>
					<p className="text-xs lg:text-sm text-gray-500">{menu.description}</p>
				</div>
				<p className="font-medium">Rp. {menu.price}</p>
			</div>
		</div>
	);
}
