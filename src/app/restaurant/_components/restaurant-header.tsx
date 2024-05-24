"use server"
import pb, { PB_KEYS } from "@service/pocketbase";
import { notFound } from "next/navigation";

interface RestaurantHeaderProps {
    recordId: string;
}

export default async function RestaurantHeader({ recordId }: RestaurantHeaderProps) {
    try {
        const record:Restaurant = await pb.collection(PB_KEYS.RESTAURANTS).getOne(recordId,{
            cache:"no-cache", //note ini buat dev aja, nanti apus
        });

        return (
            <div className="flex flex-col gap-2">
                <div>id:<span>{record.id}</span></div>
                <div>restaurant name:<span>{record.name}</span></div>
                <div>restaurant location:<span>{record.location}</span></div>
                <div>restaurant tags:<span>{record.keywords?.tags?.map(tag=><>{tag},</>)}</span></div>
                <div>restaurant image:<span>{record.images}</span></div>
                <div>restaurant owner:<span>{record.restaurantOwner}</span></div>
            </div>
        );
    } catch (error) {
        console.error(error)
        // return notFound();
    }
}