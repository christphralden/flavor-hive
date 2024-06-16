import { Suspense } from "react";
import SearchResults from "./_components/search-results";

interface ExploreProps {
  searchParams: { [key: string]: string | undefined };
}

export default function Explore({ searchParams }: ExploreProps) {
  return (
    <>
      <h1 className="text-6xl font-medium mb-8">Explore</h1>
      <Suspense fallback="loading...">
        <SearchResults searchParams={searchParams.search ?? ""} />
      </Suspense>
    </>
  );
}
