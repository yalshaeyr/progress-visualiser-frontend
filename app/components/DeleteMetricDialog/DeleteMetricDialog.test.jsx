import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteMetricDialog from "./DeleteMetricDialog";

describe("DeleteMetricDialog", () => {
    const setup = (props) => {
        const user = userEvent.setup();
        render(<DeleteMetricDialog {...props} />);
        return { user };
    };

    // required as some of the text is broken up by <b> tags
    const matchText = (text) => (_, element) => {
        return element.textContent === text;
    };

    it("renders the dialog with metric name and results count", () => {
        setup({
            open: true,
            metricName: "Test Metric",
            resultsCount: 5,
            onClose: jest.fn(),
            onConfirm: jest.fn(),
        });

        expect(screen.getByText("Delete Metric")).toBeVisible();
        expect(
            screen.getByText(
                matchText("Are you sure you want to delete Test Metric?")
            )
        ).toBeVisible();
        expect(
            screen.getByText(
                matchText("There are 5 results recorded against it.")
            )
        ).toBeVisible();
    });

    it("calls onClose when the 'No' button is clicked", async () => {
        const mockOnClose = jest.fn();
        const { user } = setup({
            open: true,
            metricName: "Test Metric",
            resultsCount: 5,
            onClose: mockOnClose,
            onConfirm: jest.fn(),
        });

        const noButton = screen.getByRole("button", { name: /No/i });
        await user.click(noButton);

        expect(mockOnClose).toHaveBeenCalled();
    });

    it("calls onConfirm when the 'Yes, Delete' button is clicked", async () => {
        const mockOnConfirm = jest.fn();
        const { user } = setup({
            open: true,
            metricName: "Test Metric",
            resultsCount: 5,
            onClose: jest.fn(),
            onConfirm: mockOnConfirm,
        });

        const yesButton = screen.getByRole("button", { name: /Yes, Delete/i });
        await user.click(yesButton);

        expect(mockOnConfirm).toHaveBeenCalled();
    });

    it("does not render the dialog when open is false", () => {
        setup({
            open: false,
            metricName: "Test Metric",
            resultsCount: 5,
            onClose: jest.fn(),
            onConfirm: jest.fn(),
        });

        expect(screen.queryByText("Delete Metric")).not.toBeInTheDocument();
    });
});
