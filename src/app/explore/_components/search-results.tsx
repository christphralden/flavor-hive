import { getSearchedRestaurant } from "@service/restaurant.service";
import React from "react";
import RestaurantExploreCard from "./restaurant-explore-card";
import { notFound } from "next/navigation";

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
          {searchResults &&
            searchResults.items.map((r) => {
              return <RestaurantExploreCard restaurant={r} />;
            })}
        </>
      );
  } catch (error) {
    return (
      <>
        <p>no results</p>
      </>
    );
  }
}
