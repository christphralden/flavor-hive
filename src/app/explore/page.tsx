import { Suspense } from "react";
import RestaurantExploreCard from "./_components/restaurant-explore-card";
import SearchResults from "./_components/search-results";

interface ExploreProps {
  searchParams: { [key: string]: string | undefined };
}

export default function Explore({ searchParams }: ExploreProps) {
  return (
    <>
      <Suspense fallback="loading...">
        <SearchResults searchParams={searchParams.search ?? ""}  />
      </Suspense>
      <div>Explore</div>
    </>
  );
}
