import { createContext, ReactNode, FC } from "react";
import useToggle from "../hooks/useLibraryToggle";

interface LibraryToggleContextType {
  toggle: boolean;
  changeToggle: () => void;
}

const defaultValue: LibraryToggleContextType = {
  toggle: false,
  changeToggle: () => {},
};

const LibraryToggleContext =
  createContext<LibraryToggleContextType>(defaultValue);

interface LibraryToggleProviderProps {
  children: ReactNode;
}

const LibraryToggleProvider: FC<LibraryToggleProviderProps> = ({
  children,
}) => {
  const { toggle, changeToggle } = useToggle();

  return (
    <LibraryToggleContext.Provider value={{ toggle, changeToggle }}>
      {children}
    </LibraryToggleContext.Provider>
  );
};

export { LibraryToggleContext, LibraryToggleProvider };
