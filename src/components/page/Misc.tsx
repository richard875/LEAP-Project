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
      {systemTheme === "light" ? (
        <Image
          className="fixed top-6 left-5 select-none"
          src="/logo-light.webp"
          alt="LawConnect Logo"
          width={172.2}
          height={23.8}
          priority
        />
      ) : (
        <Image
          className="fixed top-6 left-5 select-none"
          src="/logo-dark.webp"
          alt="LawConnect Logo"
          width={172.2}
          height={23.8}
          priority
        />
      )}

      <Avatar className="fixed top-5 right-5 select-none">
        <AvatarImage src="https://github.com/richard875.png" />
        <AvatarFallback>RL</AvatarFallback>
      </Avatar>
    </>
  );
};

export default Misc;
