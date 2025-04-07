"use client";

import Image from "next/image";
import Link from "next/link";
import CartModal from "./CartModal";
import { usePathname, useRouter } from "next/navigation";
import { BsBell } from "react-icons/bs";
import { IoCartOutline, IoMenuSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [counter, setCounter] = useState(0);

  const router = useRouter();
  const pathName = usePathname();
  const isLoggedIn = false;

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push("/");
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    setCart(storedCart);
    setCounter(storedCart.length);
  }, []);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <CgProfile size={25} className="text-gray-500 dark:text-gray-300" />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0  text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/profile">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
          </div>
        </div>
      )}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <IoCartOutline size={27} className="text-gray-500 dark:text-gray-300" />
        <div className="absolute text-blue-900 dark:text-blue-300 -top-4 -right-3 w-6 h-6 bg-lama rounded-full text-sm flex items-center justify-center">
          {counter}
        </div>
      </div>

      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <BsBell
          size={22}
          className="text-gray-500 font-bold dark:text-gray-300"
        />
        <div className="absolute text-red-600 dark:text-red-300 -top-4 -right-3 w-6 h-6 bg-lama rounded-full text-sm flex items-center justify-center">
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModal cart={cart} setCart={setCart} />}
    </div>
  );
};

export default NavIcons;
