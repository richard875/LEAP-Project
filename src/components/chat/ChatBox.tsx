"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatBox = () => {
  const { systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="absolute bottom-0 left-0 w-full pl-5 pr-5">
      <div className="max-w-[800px] m-auto flex flex-col items-center justify-around">
        <div className="w-full h-14 pl-4 pr-4 bg-neutral-50 dark:bg-neutral-700 border border-stone-300 dark:border-stone-500 rounded-4xl shadow-xs flex items-center justify-between">
          <div className="w-full flex items-center">
            {systemTheme === "light" ? (
              <Image
                src="/logo-small-light.png"
                alt="LawConnect Logo"
                width={24}
                height={24}
                priority
              />
            ) : (
              <Image
                src="/logo-small-dark.png"
                alt="LawConnect Logo"
                width={24}
                height={24}
                priority
              />
            )}
            <input
              type="text"
              placeholder="Ask a question..."
              className="w-full focus:outline-none pl-3 pr-3"
            />
          </div>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className="text-2xl text-primary dark:text-white cursor-pointer hover:brightness-80 transition"
          />
        </div>
        <p className="select-none text-center text-xs text-neutral-700 dark:text-neutral-300 pt-2 pb-2 pl-10 pr-10">
          Our service provides general legal information, not legal advice.
          Consult a lawyer for personalized assistance.
        </p>
      </div>
    </footer>
  );
};

export default ChatBox;
