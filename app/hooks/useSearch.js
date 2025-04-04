import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

export function useSearch() {
    return useContext(SearchContext);
}
