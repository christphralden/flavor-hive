"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "@geist-ui/icons";
import { Input } from "@components/ui/input";
import { useRouter } from "next/navigation";

interface Searchbar {
  closeSearch: () => void;
}

export default function Searchbar({ closeSearch }: Searchbar) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  const explore = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push("/explore?search=" + search);
      closeSearch();
    }
  };
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -1200 }}
      className="bg-gray-200 w-full h-fit px-8 py-4 flex items-center justify-center"
      // transition={{ ease: "easeOut", duration: 0.5, times: [0, 0.8, 1] }}
    >
      <Search color="#6b7280" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={explore}
        placeholder="Search Restaurant"
        className="bg-transparent text-lg px-3 w-full placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
        ref={ref}
      />
      <X className="cursor-pointer" onClick={closeSearch} />
    </motion.div>
  );
}
