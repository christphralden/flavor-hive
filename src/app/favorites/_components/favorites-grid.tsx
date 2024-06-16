import { getUserFavoriteRestaurants } from "@service/restaurant.service";
import RestaurantExploreCard from "app/explore/_components/restaurant-explore-card";

export default async function FavoritesGrid() {
  const userFavoriteRestaurants = await getUserFavoriteRestaurants();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-8">
      {userFavoriteRestaurants.items.map((r) => (
        <RestaurantExploreCard restaurant={r.expand.restaurant} />
      ))}
    </div>
  );
}
