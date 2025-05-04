"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Misc = () => {
  const { systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="h-12 w-full fixed top-0 left-0 border-b bg-background block xl:hidden"></div>
      {systemTheme === "light" ? (
        <Image
          className="fixed top-3 left-0 select-none xl:top-6 xl:left-5 scale-75 xl:scale-100"
          src="/logo-light.webp"
          alt="LawConnect Logo"
          width={172.2}
          height={23.8}
          priority
        />
      ) : (
        <Image
          className="fixed top-3 left-0 select-none xl:top-6 xl:left-5 scale-75 xl:scale-100"
          src="/logo-dark.webp"
          alt="LawConnect Logo"
          width={172.2}
          height={23.8}
          priority
        />
      )}

      <Avatar className="fixed top-5 right-5 select-none hidden xl:flex">
        <AvatarImage src="https://github.com/richard875.png" />
        <AvatarFallback>RL</AvatarFallback>
      </Avatar>
    </>
  );
};

export default Misc;
