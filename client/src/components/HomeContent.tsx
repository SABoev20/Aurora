import { useState } from "react";

function HomeContent() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const position = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 100,
    );
    if (position > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    setScrollPosition(position);
  };

  return (
    <>
      <div className="h-8 w-full flex-shrink-0 bg-backBase"></div>
      <div className="h-100 w-full flex-shrink-0 bg-blue-500"></div>
      <div className="h-100 w-full flex-shrink-0 bg-blue-500"></div>
      <div className="h-100 w-full flex-shrink-0 bg-blue-500"></div>
      <div className="h-100 w-full flex-shrink-0 bg-blue-500"></div>
    </>
  );
}

export default HomeContent;
