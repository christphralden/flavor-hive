import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Badge } from "@components/ui/badge";
import { Heart, MapPin, Star } from "@geist-ui/icons";
import pb from "@service/pocketbase.service";
import { round } from "@utils/utils";
import { PocketbaseTyped } from "lib/types/utils.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RestaurantExploreCardProps {
  restaurant: PocketbaseTyped<RestaurantBase>;
}

export default function RestaurantExploreCard({
  restaurant,
}: RestaurantExploreCardProps) {
  const coverImage = pb.files.getUrl(
    restaurant,
    Array.isArray(restaurant.images) ? (restaurant.images[0] as string) : ""
  );
  return (
    <div className="flex flex-col w-full h-[25rem] gap-2">
      <Link
        className="m-0 cursor-pointer"
        href={`/restaurant/${restaurant.id}`}
      >
        <div className="relative w-full h-[17rem]">
          <Image
            width={350}
            height={250}
            src={coverImage === "" ? "/images/placeholder.jpg" : coverImage}
            alt=""
            className="object-cover w-full h-[17rem] rounded-sm absolute z-5"
          />
          <div className="w-full overflow-clip px-2 py-2 z-10 gap-2 flex justify-end absolute">
            <Badge
              className="text-white lg:text-sm px-3 py-2 h-fit lg:p-3 lg:h-full"
              variant={"dark"}
            >
              <Heart className="w-4 h-4" />
            </Badge>
          </div>
        </div>
      </Link>
      <div className="w-full flex justify-start items-start font-medium">
        <h1 className="w-[70%] text-wrap line-clamp-2 text-xl">
          {restaurant.name}
        </h1>
        <div className="w-[30%] flex gap-1 items-center justify-end">
          <Star color="#6b7280" className="w-4 flex-shrink-0" />
          <p>{round(restaurant.cachedRating)}</p>
        </div>
      </div>
      <div className="w-[full%] flex gap-1 items-start justify-start">
        <MapPin color="#6b7280" className="w-4 flex-shrink-0" />
        <p>{restaurant.location}</p>
      </div>
      <section className="hidden  gap-2 lg:flex">
        {restaurant.keywords?.tags.map((tag, i) => {
          const limit = 4;
          if (i == limit)
            return (
              <Badge
                key={i}
                variant={"outline"}
                className="p-2 px-4 text-xs lg:text-sm"
              >
                +{(restaurant.keywords?.tags.length || 0) - limit}
              </Badge>
            );
          if (i < limit)
            return (
              <Badge
                key={i}
                variant={"secondary"}
                className="p-2 px-4 text-xs lg:text-sm"
              >
                {tag}
              </Badge>
            );
        })}
      </section>
    </div>
  );
}
