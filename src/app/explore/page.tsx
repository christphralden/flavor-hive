<<<<<<< HEAD

import React from "react";
=======
>>>>>>> 68c9f35b1371dad4e83c30b5e1bfca2447567b85

interface ExploreProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

<<<<<<< HEAD
export default function Explore({ params }: ExploreProps) {
  console.log(params.searchParams)
  return (
    
    <>
      <div>{params.searchParams?.search}</div>
=======
export default function Explore({ searchParams }: ExploreProps) {
  console.log(searchParams)
  console.log(searchParams.search)
  return (
    
    <>
>>>>>>> 68c9f35b1371dad4e83c30b5e1bfca2447567b85
      <div>Explore</div>
    </>
  );
}

