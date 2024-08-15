import { useState } from "react";
import { useEffect } from "react";

function useToggle() {
  const [toggle, setToggle] = useState(() => {
    const isToggle = localStorage.getItem("libraryToggled");
    return isToggle === null ? false : isToggle === "true";
  });
  const changeToggle = () => setToggle(!toggle);

  useEffect(() => {
    localStorage.setItem("libraryToggled", toggle.toString());
  }, [toggle]);

  return { toggle, changeToggle };
}

export default useToggle;
