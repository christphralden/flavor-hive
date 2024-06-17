import { Badge } from "@components/ui/badge";
import { Card } from "@components/ui/card";
import { Heart, Star } from "@geist-ui/icons";
import pb from "@service/pocketbase.service";
import { getRestaurantFavoritedAmount } from "@service/restaurant.service";
import { round } from "@utils/utils";
import { PocketbaseTyped } from "lib/types/utils.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RestaurantExploreCardProps {
  restaurant: PocketbaseTyped<RestaurantBase>;
}

export default async function RestaurantExploreCard({
  restaurant,
}: RestaurantExploreCardProps) {
  const favoritedAmount = await getRestaurantFavoritedAmount({
    restaurantId: restaurant.id,
  });
  const coverImage = pb.files.getUrl(
    restaurant,
    Array.isArray(restaurant.images) ? (restaurant.images[0] as string) : "",
  );
  return (
    <Card className="w-full h-[25rem] overflow-clip bg-white rounded-lg">
      <Link className="w-full h-full" href={`/restaurant/${restaurant.id}`}>
        <section className="w-full h-[50%] bg-black relative">
          <div className="w-full overflow-clip p-4 z-10 absolute  gap-2 flex justify-end">
            {favoritedAmount > 0 && (
              <Badge
                className="text-white py-2 h-fit lg:h-full"
                variant={"dark"}
              >
                Liked by {favoritedAmount}
              </Badge>
            )}

            <Badge className="text-white p-2 h-fit lg:h-full" variant={"dark"}>
              <Heart className="w-5 h-5" />
            </Badge>
          </div>
          <Image
            width={1024}
            height={720}
            className="w-full h-full object-cover opacity-60"
            src={coverImage}
            alt="coverImage"
          ></Image>
        </section>
        <section className="w-full h-[50%] p-6 flex flex-col gap-4">
          <div className="w-full h-full flex flex-col gap-1">
            <div className="w-full flex justify-start items-start font-medium leading-5 text-base lg:text-lg">
              <h1 className="w-[80%] text-wrap line-clamp-2">
                {restaurant.name}
              </h1>
              <div className="w-[20%] flex gap-1 items-center justify-end">
                <Star color="#6b7280" className="w-4 flex-shrink-0" />
                <p>{round(restaurant.cachedRating ?? 0)}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm lg:font-normal line-clamp-2">
                {restaurant.location}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {restaurant.keywords?.tags.map((tag, i) => {
              const limit = 4;
              if (i == limit)
                return (
                  <Badge key={i} variant={"outline"} className="text-sm px-4">
                    +{(restaurant.keywords?.tags.length || 0) - limit}
                  </Badge>
                );
              if (i < limit)
                return (
                  <Badge key={i} variant={"secondary"} className="text-sm px-4">
                    {tag}
                  </Badge>
                );
            })}
          </div>
        </section>
      </Link>
    </Card>
  );
}
