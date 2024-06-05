import pb from "@service/pocketbase.service";
import { getRestaurant } from "@service/restaurant.service";
import Image from "next/image";
import { notFound } from "next/navigation";

interface RestaurantHeaderProps {
    recordId: string;
}

export default async function RestaurantHeader({ recordId }: RestaurantHeaderProps) {
    try {
        const restaurant = await getRestaurant(recordId)

        const images:string[] = (restaurant.images as string[]).map(image=>{
            return pb.files.getUrl(restaurant, image , {'thumb': '0x300'});
        })
        //TODO: breadcrumbs
        return (
            <>
                <div className="w-full h-screen ">
                    <h1 className="text-2xl lg:text-3xl font-medium">{restaurant.name}</h1>
                    <Image width={1024} height={720} className='w-32 h-32 object-cover opacity-60' src={images[0]} alt='coverImage'></Image>
                </div>
            </>
            
        );
    } catch (error) {
        console.error(error)
        // return notFound();
    }
}