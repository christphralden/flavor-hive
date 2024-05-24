"use server"
import pb from "@service/pocketbase";
import { notFound } from "next/navigation";

interface RestaurantHeaderProps {
    recordId: string;
}

export default async function RestaurantHeader({ recordId }: RestaurantHeaderProps) {
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating delay
    let record;
    try {
        record = await pb.collection('restaurants').getOne(recordId,{
            cache:"no-cache",
        });
    } catch (error) {
        return notFound();
    }

    return (
        <div>
            {Object.entries(record).map(([key, value]) => (
                <div key={key}>{`${key}: ${JSON.stringify(value)}`}</div>
            ))}
            
        </div>
    );
}