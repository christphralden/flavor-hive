import { getAllRestaurantPaged } from "@service/restaurant.service"
import RestaurantProfileCard from "app/_components/restaurant-profile-card";
import { PocketbaseTyped } from "lib/types/utils.types";


export default async function RestaurantSlider(){
    try{
        const restaurants:PocketbaseTyped<Restaurant>[] = await getAllRestaurantPaged(1,10);

        
        return(
            <div className="flex gap-4 w-full overflow-scroll">
                {
                    restaurants.map((restaurant,i)=>{
                        return(
                            <RestaurantProfileCard restaurant={restaurant} key={i}/>
                        )
                    })
                }
            </div>
        )
    } catch(error){
        console.error(error)
    }
}