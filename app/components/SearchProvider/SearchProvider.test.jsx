import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SearchContext } from "../../contexts/SearchContext";
import SearchProvider from "./SearchProvider";

describe("SearchProvider", () => {
    it("provides valid function for setSearchLogic", () => {
        render(
            <SearchProvider>
                <SearchContext.Consumer>
                    {({ setSearchLogic }) => {
                        return (
                            <div data-testid="search-context-values">
                                {!!setSearchLogic
                                    ? "Valid context values"
                                    : "Invalid context values"}
                            </div>
                        );
                    }}
                </SearchContext.Consumer>
            </SearchProvider>
        );

        const contextValues = screen.getByTestId("search-context-values");
        expect(contextValues).toHaveTextContent("Valid context values");
    });
});
