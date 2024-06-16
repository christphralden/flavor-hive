import { getAllRestaurantPaged } from "@service/restaurant.service";
import RestaurantProfileCard from "app/_components/restaurant-profile-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";

export default async function RestaurantSlider() {
  try {
    const restaurants = await getAllRestaurantPaged({ page: 1, perPage: 10 });

    return (
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-2xl font-medium">Featured restaurant</h1>
        <Carousel
          className="w-[100%]"
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="flex gap-4 w-full">
            {restaurants.items.map((restaurant, i) => (
              <CarouselItem className="flex-shrink-0 w-full max-w-[250px] lg:max-w-[350px]">
                <RestaurantProfileCard restaurant={restaurant} key={i} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
  } catch (error) {
    console.error(error);
  }
}
