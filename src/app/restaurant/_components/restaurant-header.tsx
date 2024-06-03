import { getRestaurant } from "@service/restaurant.service";
import { notFound } from "next/navigation";
import { Fragment } from "react";

interface RestaurantHeaderProps {
    recordId: string;
}

export default async function RestaurantHeader({ recordId }: RestaurantHeaderProps) {
    try {
        const record:Restaurant = await getRestaurant(recordId)
        return (
            <div className="flex flex-col gap-2">
                <div>id:<span>{record.id}</span></div>
                <div>restaurant name:<span>{record.name}</span></div>
                <div>restaurant location:<span>{record.location}</span></div>
                <div>restaurant tags:<span>{record.keywords?.tags?.map((tag,i)=><Fragment key={i}>{tag},</Fragment>)}</span></div>
                {/* <div>restaurant image:<span>{record.images}</span></div> */}
                <div>restaurant owner:<span>{record.restaurantOwner}</span></div>
            </div>
        );
    } catch (error) {
        return notFound();
    }
}