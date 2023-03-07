import { useQuery } from "react-query";
import { getAllBlogs } from "../requests";

export const useBlogs = () => useQuery(["blogs"], getAllBlogs);
