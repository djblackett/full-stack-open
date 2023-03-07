import { useQuery } from "react-query";
import { getAllUsers } from "../requests";

export const useUsers = () => useQuery(["users"], getAllUsers);
