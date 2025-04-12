import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
    it("renders the SearchBar component", () => {
        render(<SearchBar onSearch={jest.fn()} />);

        const searchInput = screen.getByPlaceholderText("Search...");
        expect(searchInput).toBeVisible();
    });

    it("calls onSearch when input changes", async () => {
        const mockOnSearch = jest.fn();
        const user = userEvent.setup();

        render(<SearchBar onSearch={mockOnSearch} />);

        const searchInput = screen.getByPlaceholderText("Search...");
        await user.type(searchInput, "test");

        expect(mockOnSearch).toHaveBeenCalledTimes(4); // Called for each character typed
    });
});
