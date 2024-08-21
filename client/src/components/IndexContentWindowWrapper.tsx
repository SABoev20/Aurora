import Header from "./Header";
import { useState } from "react";
import React, { ReactNode } from "react";

interface IndexContentWindowWrapperProps {
  children: ReactNode;
}

function IndexContentWindowWrapper({
  children,
}: IndexContentWindowWrapperProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const position = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 100,
    );
    if (position > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  return (
    <div className="relative h-full w-full rounded-lg bg-backBase">
      <Header isScrolled={isScrolled} />
      <div
        className="bg-headerBackgroundGradient underHeaderGradient absolute top-0 z-10 h-80 w-full rounded-t-lg bg-gradient-to-b from-[#00000099] from-10% to-backBase"
        id="underHeaderGradientId"
      ></div>
      <div
        className="absolute bottom-0 left-0 right-0 top-2 z-10 mx-auto flex w-full flex-1 flex-col flex-nowrap gap-7 overflow-y-auto pb-4 pt-16"
        onScroll={handleScroll}
      >
        {children}
      </div>
    </div>
  );
}
export default IndexContentWindowWrapper;
