"use client";
import { Button } from "@/components/ui/button"; // Correct import path
import { useTheme } from "next-themes";
import { Sun, Moon, ShopingCart } from "lucide-react";
import { useEffect } from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </Button>
  );
}
