import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PageMain = () => {
  return (
    <>
      <Image
        className="fixed top-6 left-5 select-none"
        src="/logo.webp"
        alt="LawConnect Logo"
        width={172.2}
        height={23.8}
        priority
      />
      <Avatar className="fixed top-5 right-5 select-none">
        <AvatarImage src="https://github.com/richard875.png" />
        <AvatarFallback>RL</AvatarFallback>
      </Avatar>
    </>
  );
};

export default PageMain;
