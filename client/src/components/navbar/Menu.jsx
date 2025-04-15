"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { ThemeToggle } from "./ThemeToggle";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <IoMenuSharp onClick={() => setOpen((prev) => !prev)} size={25} />
      {open && (
        <div className="absolute font-semibold bg-white/80  dark:bg-black/80 z-20 left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl ">
          <Link href="/">Homepage</Link>
          <Link href="/">Shop</Link>
          <Link href="/">Deals</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Logout</Link>
          <Link href="/">Cart(1)</Link>
          <ThemeToggle />
        </div>
      )}
    </div>
  );
};

export default Menu;
