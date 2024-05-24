"use server"
import pb from "@service/pocketbase";
import { notFound } from "next/navigation";



interface RestaurantHeaderProps {
    recordId: string;
}

export default async function RestaurantHeader({ recordId }: RestaurantHeaderProps) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating delay
    let record;
    try {
        record = await pb.collection('restaurants').getOne(recordId, {
            expand: "restaurantOwner",
        });
        // console.log("Fetched record:", record);
    } catch (error) {
        return notFound();
    }

    return (
        <div>
            {Object.entries(record).map(([key, value]) => (
                <div key={key}>{`${key}: ${JSON.stringify(value)}`}</div>
            ))}
            {record.expand && record.expand.restaurantOwner && (
                <div>
                    <h3>Restaurant Owner</h3>
                    {Object.entries(record.expand.restaurantOwner).map(([key, value]) => (
                        <div key={key}>{`${key}: ${JSON.stringify(value)}`}</div>
                    ))}
                </div>
            )}
        </div>
    );
}