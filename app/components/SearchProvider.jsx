import { useState } from "react";
import { SearchContext } from "../hooks/useSearch";

export default function SearchProvider({ children }) {
    const [searchLogic, setSearchLogic] = useState(() => {});

    return (
        <SearchContext.Provider value={{ searchLogic, setSearchLogic }}>
            {children}
        </SearchContext.Provider>
    );
}