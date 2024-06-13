
import React from "react";

interface ExploreProps {
  params: {
    searchParams: { [key: string]: string | string[] | undefined };
  };
}

export default function Explore({ params }: ExploreProps) {
  console.log(params.searchParams)
  return (
    
    <>
      <div>{params.searchParams?.search}</div>
      <div>Explore</div>
    </>
  );
}
