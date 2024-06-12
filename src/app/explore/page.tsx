import { Input } from "@components/ui/input";
import { useSearchParams } from "next/navigation";
import React from "react";

interface ExploreProps {
  params: {
    searchParams: { [key: string]: string | string[] | undefined };
  };
}

export default function Explore({ params }: ExploreProps) {
  return (
    <>
      {/* <div>{params.searchParams}</div> */}
      <div>Explore</div>
    </>
  );
}
