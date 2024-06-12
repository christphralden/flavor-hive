"use client";
import React, { useState } from "react";
import { NavbarRoutes } from "./navbar.routes";
import Link from "next/link";
import { Separator } from "@components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { Search, User, X } from "@geist-ui/icons";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import Searchbar from "@components/searchbar/searchbar";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeSearch = () => {setIsOpen(false)};

  return (
    <div className="fixed w-full h-fit z-[50] flex flex-col">
      <div className="flex w-full h-full justify-between p-4 px-8 items-center bg-white">
        <section className="w-fit flex justify-start gap-8 items-center">
          <div className="w-fit">
            <h1 className="text-2xl lg:text-3xl font-medium">FlavorHive</h1>
          </div>
          <div className="flex gap-4 ">
            {NavbarRoutes.map((routes, i) => (
              <Link
                key={i}
                href={routes.path}
                className="  text-base  text-gray-500"
              >
                {routes.name}
              </Link>
            ))}
          </div>
        </section>
        <section className="w-fit flex gap-4 items-center">
          
          <Button className="p-2" variant={'ghost'} onClick={() => setIsOpen(!isOpen)}>
            <Search color="#6b7280" />
          </Button>

          <Link
            href={"/profile"}
            className="p-2 hover:bg-secondary rounded-lg transition-all duration-300"
          >
            <User color="#6b7280" />
          </Link>
          <Link href={"/restaurant/create/info"}>
            <Button
              className="p-2 px-4 text-gray-500 font-normal "
              variant={"outline"}
            >
              Set up restaurant
            </Button>
          </Link>
        </section>
      </div>
      <Separator orientation="horizontal" className="w-full border-black" />
      <AnimatePresence>
        {isOpen && (
          <>
            <Searchbar closeSearch={closeSearch }/>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
