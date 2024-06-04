import pb from "@service/pocketbase.service";
import { getRestaurant } from "@service/restaurant.service";
import { RestaurantGetSchema } from "lib/types/restaurant.schema";
import { PocketbaseTyped } from "lib/types/utils.types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RecordModel } from "pocketbase";
import { z } from "zod";

interface RestaurantHeaderProps {
    recordId: string;
}

export default async function RestaurantHeader({ recordId }: RestaurantHeaderProps) {
    try {
        const restaurant:PocketbaseTyped<Restaurant> = await getRestaurant(recordId)

        const images:string[] = (restaurant.data.images as string[]).map(image=>{
            return pb.files.getUrl(restaurant.record, image , {'thumb': '0x300'});
        })
        
        return (
            <>
                <div className="w-full h-screen bg-red-200">
                    <h1 className="text-2xl lg:text-3xl font-medium">{restaurant.data.name}</h1>
                    <Image width={1024} height={720} className='w-full h-full object-cover opacity-60 absolute' src={images[0]} alt='coverImage'></Image>
                </div>
            </>
            
        );
    } catch (error) {
        console.error(error)
        // return notFound();
    }
}