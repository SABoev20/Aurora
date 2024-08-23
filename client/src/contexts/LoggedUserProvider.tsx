import { createContext, FC, ReactNode } from "react";
import useLoggedUser from "../hooks/useLoggedUser.js";

interface LoggedUserContextType {
  isLogged: boolean;
}

const defaultValue: LoggedUserContextType = {
  isLogged: false,
};

const LoggedUserContext = createContext<LoggedUserContextType>(defaultValue);
interface LoggedUserProviderProps {
  children: ReactNode;
}

const LoggedUserProvider: FC<LoggedUserProviderProps> = ({ children }) => {
  const { isLogged, changeIsLogged } = useLoggedUser();

  return (
    <LoggedUserContext.Provider value={{ isLogged }}>
      {children}
    </LoggedUserContext.Provider>
  );
};

export { LoggedUserContext, LoggedUserProvider };
