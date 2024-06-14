import { PocketbaseTyped } from "lib/types/utils.types";
import React from "react";

interface RestaurantExploreCardProps {
  restaurant: PocketbaseTyped<RestaurantBase>;
}

export default function RestaurantExploreCard({
  restaurant,
}: RestaurantExploreCardProps) {
  return <div>{restaurant.name}</div>;
}
