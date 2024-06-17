import React from "react";
import RestaurantSlider from "./_components/restaurant-slider";

export default function Home() {
  return (
    <>
      <div className="w-[100%] flex flex-col gap-8 justify-center">
        <RestaurantSlider />
        <RestaurantSlider />
      </div>
    </>
  );
}
