import { getSearchedRestaurant } from "@service/restaurant.service";
import React from "react";
import RestaurantExploreCard from "./restaurant-explore-card";

interface SearchResultsProps {
  searchParams: string;
}

export default async function SearchResults({
  searchParams,
}: SearchResultsProps) {
  // fetch search
  try {
    const searchResults = await getSearchedRestaurant({
      restaurantName: searchParams,
    });
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-8">
          {searchResults &&
            searchResults.items.map((r) => {
              return <RestaurantExploreCard restaurant={r} />;
            })}
        </div>
      </>
    );
  } catch (error) {
    console.log("no results");
    return (
      <>
        <p>no results</p>
      </>
    );
  }
}
