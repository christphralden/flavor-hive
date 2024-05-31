import { getAllRestaurantPaged } from "@service/restaurant.service"
import Link from "next/link";
import { ListResult, RecordModel } from "pocketbase";

export default async function RestaurantSlider(){
    try{
        const records:ListResult<RecordModel> = await getAllRestaurantPaged(1,10);
        return(
            <div className="flex gap-4">
                {
                    records.items.map((record,i)=>(
                        <Link href={`/restaurant/${record.id}`} key={i}>{record.name}</Link>
                    ))
                }
            </div>
        )
    } catch(error){
        console.error(error)
    }
}