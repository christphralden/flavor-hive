"use client"
import { Separator } from '@components/ui/separator';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { X } from '@geist-ui/icons'
import { Button } from '@components/ui/button';


interface MenuTabProps {
    menu: MenuBase;
    onClick: (menu:MenuBase)=>any
}

export default function MenuTab({ menu, onClick }: MenuTabProps) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (menu.image instanceof FileList && menu.image.length > 0) {
            const file = menu.image[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [menu.image]);

    return (
			<div className="w-full flex gap-4 border-[1px] rounded-lg bg-secondary p-4 justify-between">
				<section className='w-fit h-full flex gap-4'>
                    <div className="w-24 h-24 bg-gray-500 rounded-lg overflow-clip">
                        {imageUrl && (
                            <Image
                                width={1024}
                                height={720}
                                src={imageUrl}
                                alt={`Image of ${menu.name}`}
                                className="w-full h-full object-cover opacity-60"
                            />
                        )}
                    </div>
                    <Separator orientation='vertical'/>
                    <div className='flex flex-col justify-between'>
                        <div className='flex flex-col gap-1'>
                            <h1 className='text-base lg:text-lg font-medium'>{menu.name}</h1>
                            <p className='text-sm lg:text-base font-normal text-gray-500'>{menu.description}</p>
                        </div>
                        <p className='text-sm lg:text-base font-normal'>Rp.&nbsp;{menu.price}</p>
                    </div>
                </section >
                <section>
                    <Button onClick={()=>onClick(menu)} className='p-0 h-fit w-fit ' variant={'secondary'}><X color='#6b7280' className='h-fit w-fit'/></Button>
                </section>
			</div>
		);
}
