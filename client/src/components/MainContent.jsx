import Header from "./Header";
import { useState } from "react";

function MainContent() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
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
    <div className="relative h-full w-full rounded-lg bg-backBase">
      <Header isScrolled={isScrolled} position={scrollPosition} />
      <div
        className="absolute bottom-0 left-0 right-0 top-2 z-10 mx-auto flex w-full flex-1 flex-col flex-nowrap gap-7 overflow-y-auto"
        onScroll={handleScroll}
      >
        <div className="h-16 w-full flex-shrink-0 bg-backBase"></div>
      </div>
    </div>
  );
}

export default MainContent;
