import { createContext, FC, ReactNode } from "react";
import useLoggedUser from "../hooks/useLoggedUser.js";

interface LoggedUserContextType {
  isLogged: boolean;
  changeIsLogged: (status: boolean) => void;
}

// Default value
const defaultValue: LoggedUserContextType = {
  isLogged: false,
  changeIsLogged: () => {},
};

const LoggedUserContext = createContext<LoggedUserContextType>(defaultValue);
interface LoggedUserProviderProps {
  children: ReactNode;
}

const LoggedUserProvider: FC<LoggedUserProviderProps> = ({ children }) => {
  const { isLogged, changeIsLogged } = useLoggedUser();

  return (
    <LoggedUserContext.Provider value={{ isLogged, changeIsLogged }}>
      {children}
    </LoggedUserContext.Provider>
  );
};

export { LoggedUserContext, LoggedUserProvider };
