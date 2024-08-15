import { useState } from "react";

function HomeContent() {
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
