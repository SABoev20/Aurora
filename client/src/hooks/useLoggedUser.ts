import { useState } from "react";

function useLoggedUser() {
  const [isLogged, setIsLogged] = useState(false);
  const changeIsLogged = () => setIsLogged(!isLogged);

  return { isLogged, changeIsLogged };
}

export default useLoggedUser;
