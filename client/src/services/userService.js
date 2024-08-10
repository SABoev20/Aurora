import { useQuery } from "@tanstack/react-query";

const user = true;

function wait() {
  return new Promise((resolve) => resolve(user));
}

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => wait(),
  });
};
