import React from "react";
import Image from "next/image";
import { cn } from "@utils/utils";
import placeholder from "@public/images/pic1.png";

export default function HomeHeader() {
  return (
    <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden">
      <div className="w-full h-full absolute rounded-lg overflow-clip bg-black">
        <Image
          src={placeholder}
          alt="Restaurant background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div
        className={cn(
          "relative z-10 text-center p-4 bg-opacity-70 rounded-lg",
          "max-w-2xl mx-auto",
        )}
      >
        <h1 className="text-3xl font-medium text-white">
          Welcome to FlavorHive: Your personalized culinary journey starts here
        </h1>
        <p className="text-gray-200 text-sm lg:text-base mt-2">
          See all your favorite dishes and restaurants, all in one place
        </p>
      </div>
    </div>
  );
}
