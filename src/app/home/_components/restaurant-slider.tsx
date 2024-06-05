import { getAllRestaurantPaged } from "@service/restaurant.service"
import RestaurantProfileCard from "app/_components/restaurant-profile-card";

export default async function RestaurantSlider(){
    try{
        const restaurants = await getAllRestaurantPaged(1,10);

        return(
            <div className="flex gap-4 w-full overflow-scroll">
                {
                    restaurants.items.map((restaurant,i)=>{
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