import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProgressVisualiserForm from "./ProgressVisualiserForm";

jest.mock("../SearchBar", () => (props) => (
    <div
        data-testid="search-bar"
        onClick={props.onSearch}
    ></div>
));
jest.mock("../ProgressVisualiserDatePicker", () => () => (
    <div data-testid="progress-visualiser-date-picker"></div>
));

describe("ProgressVisualiserForm", () => {
    it("renders ProgressVisualiserForm with child components", () => {
        const mockOnSearch = jest.fn();

        render(<ProgressVisualiserForm onSearch={mockOnSearch} />);

        // Check for SearchBar
        const searchBar = screen.getByTestId("search-bar");
        expect(searchBar).toBeVisible();

        // Check for ProgressVisualiserDatePicker
        const datePicker = screen.getByTestId(
            "progress-visualiser-date-picker"
        );
        expect(datePicker).toBeVisible();
    });

    it("passes onSearch prop to SearchBar", () => {
        const mockOnSearch = jest.fn();

        render(<ProgressVisualiserForm onSearch={mockOnSearch} />);

        const searchBar = screen.getByTestId("search-bar");
        searchBar.click();

        expect(mockOnSearch).toHaveBeenCalled();
    });
});
