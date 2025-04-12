import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AppBar from "./AppBar";
import { useSearch } from "../../hooks/useSearch";

jest.mock("../../hooks/useSearch", () => ({
    useSearch: jest.fn(),
}));

jest.mock("../BreadcrumbStack/BreadcrumbStack", () => () => (
    <div data-testid="breadcrumb-stack" />
));
jest.mock("../ProgressVisualiserForm", () => (props) => (
    <div
        data-testid="progress-visualiser-form"
        onClick={props.onSearch}
    ></div>
));

describe("AppBar", () => {
    it("renders AppBar component with child components", () => {
        const mockSearchLogic = jest.fn();
        useSearch.mockReturnValue({ searchLogic: mockSearchLogic });

        render(<AppBar />);

        // Check for BreadcrumbStack
        const breadcrumbStack = screen.getByTestId("breadcrumb-stack");
        expect(breadcrumbStack).toBeVisible();

        // Check for ProgressVisualiserForm
        const progressVisualiserForm = screen.getByTestId(
            "progress-visualiser-form"
        );
        expect(progressVisualiserForm).toBeVisible();
    });

    it("passes searchLogic to ProgressVisualiserForm", () => {
        const mockSearchLogic = jest.fn();
        useSearch.mockReturnValue({ searchLogic: mockSearchLogic });

        render(<AppBar />);

        const progressVisualiserForm = screen.getByTestId(
            "progress-visualiser-form"
        );
        progressVisualiserForm.click();

        expect(mockSearchLogic).toHaveBeenCalled();
    });
});
