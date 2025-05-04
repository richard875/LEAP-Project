"use client";

import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const EmptyChat = ({ isEmpty }: { isEmpty: boolean }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    isEmpty && (
      <div className="w-full h-full flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400">
        <p className="text-2xl font-bold">Start a conversation below</p>
        <FontAwesomeIcon className="text-xl" icon={faWandMagicSparkles} />
      </div>
    )
  );
};

export default EmptyChat;
