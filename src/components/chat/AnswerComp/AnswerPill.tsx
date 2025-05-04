import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const AnswerPill = () => {
  const { systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-fit mb-5 h-fit pl-2.5 pr-2.5 pt-2 pb-2 rounded-full border border-stone-300 dark:border-stone-500 flex items-center justify-center gap-2.5 select-none">
      {systemTheme === "light" ? (
        <Image
          className="select-none"
          src="/logo-small-light.png"
          alt="LawConnect Logo"
          width={20}
          height={20}
          priority
        />
      ) : (
        <Image
          className="select-none"
          src="/logo-small-dark.png"
          alt="LawConnect Logo"
          width={20}
          height={20}
          priority
        />
      )}
      <p className="text-sm font-medium">LawConnect</p>
    </div>
  );
};

export default AnswerPill;
