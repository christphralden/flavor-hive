"use client";
import React, { useState } from "react";
import { NavbarRoutes } from "./navbar.routes";
import Link from "next/link";
import { Separator } from "@components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { Search, User, X } from "@geist-ui/icons";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
          <motion.div
            initial={{ opacity: 0, x: -1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -1200 }}
            className="bg-gray-200 w-full h-fit px-8 py-4 flex items-center justify-center"
          >
            <Search color="#6b7280" />
            <Input
              placeholder="Search Restaurant"
              className="bg-transparent text-lg px-3 w-full placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
