import { Avatar, AvatarFallback, AvatarImage  } from '@components/ui/avatar';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import pb from '@service/pocketbase.service';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { Star } from '@geist-ui/icons'
import { Separator } from '@components/ui/separator';

interface RestaurantProfileCardInterface{
    restaurant:Restaurant
}
export default function RestaurantProfileCard({restaurant}:RestaurantProfileCardInterface) {
    const headerImage = pb.files.getUrl(restaurant, (Array.isArray(restaurant.images) ? restaurant.images[0] as string : "") , {'thumb': '0x300'});
    const coverImage = pb.files.getUrl(restaurant, restaurant.cover as string , {'thumb': '0x300'});
    return (
        <Link href={`/restaurant/${restaurant.id}`}>
            <Card className='w-[350px] h-[450px] overflow-clip bg-whit rounded-lg'>
                <CardHeader className='h-[40%] w-full bg-black p-0 relative'>
                    <Image width={1024} height={720} className='w-full h-full object-cover opacity-[0.5]' src={headerImage} alt='coverImage'></Image>
                    <Avatar className='w-24 h-24 absolute bottom-0 left-8 translate-y-[50%]' >
                        <AvatarImage className='w-full h-full object-cover' src={coverImage} alt={`@${restaurant.name}`}/>
                        <AvatarFallback>DC</AvatarFallback>
                    </Avatar>
                </CardHeader>
                <CardContent className='p-8 pt-14 flex flex-col gap-4 lg:leading-6'>
                    <div className='w-full flex flex-col gap-1  text-base lg:text-lg'>
                        <div className='w-full flex justify-between items-start font-medium  leading-5'>
                            <h1 className='w-[70%] text-wrap line-clamp-2'>{restaurant.name}</h1>
                            <div className='w-[30%] flex gap-1 items-center justify-end'>
                                <Star className='w-4' color='#FDCC0D'/>
                                <p>4.5</p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <p className='text-gray-500 text-xs lg:text-sm font-normal'>{restaurant.location}</p>
                        </div>
                    </div>
                    <Separator/>
                </CardContent>
            </Card>
        </Link>
    );
}
