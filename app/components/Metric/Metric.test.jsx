import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Metric from "./Metric";

jest.mock("../DeleteMetricDialog/DeleteMetricDialog", () => (props) => (
    <div data-testid="delete-metric-dialog">
        {props.open && (
            <>
                <button onClick={props.onClose}>Cancel</button>
                <button onClick={props.onConfirm}>Confirm</button>
            </>
        )}
    </div>
));

const mockShowNotification = jest.fn();
jest.mock("../../hooks/useNotification", () => ({
    useNotification: jest.fn(() => ({
        showNotification: mockShowNotification,
    })),
}));

jest.mock("../../constants/Endpoints", () => ({
    Endpoints: {
        MetricDataForMetric: "https://not-a-real-url/metricdata/metric",
        MetricsRoot: "https://not-a-real-url/metrics",
        MetricDataRoot: "https://not-a-real-url/metricdata",
    },
}));

describe("Metric", () => {
    const setup = (props) => {
        const user = userEvent.setup();
        render(<Metric {...props} />);
        return { user };
    };

    it("renders the Metric component with data", () => {
        setup({
            name: "Test Metric",
            unit: "kg",
            data: [{ recordedAt: "2023-01-01", value: 10 }],
            description: "Test Description",
        });

        expect(screen.getByText("Test Metric")).toBeVisible();
        expect(screen.getByText("10")).toBeVisible();
        expect(screen.getByText("kg")).toBeVisible();
        expect(screen.getByText("Test Description")).toBeVisible();
    });

    it("renders 'No data to display' when no data is provided", () => {
        setup({
            name: "Test Metric",
            unit: "kg",
            data: [],
            description: "Test Description",
        });

        expect(screen.getByText("No data to display")).toBeVisible();
    });

    it("opens the delete dialog when the delete button is clicked", async () => {
        const { user } = setup({
            name: "Test Metric",
            unit: "kg",
            data: [],
            description: "Test Description",
        });

        const deleteButton = screen.getByTestId("DeleteIcon");
        await user.click(deleteButton);

        expect(screen.getByTestId("delete-metric-dialog")).toBeVisible();
    });

    it("calls onDeleteCompletion when the delete is confirmed", async () => {
        const mockOnDelete = jest.fn(() => Promise.resolve({ ok: true }));

        const { user } = setup({
            name: "Test Metric",
            unit: "kg",
            data: [],
            description: "Test Description",
            id: "123",
            onDeleteCompletion: mockOnDelete,
        });

        const deleteButton = screen.getByTestId("DeleteIcon");
        await user.click(deleteButton);

        const confirmButton = screen.getByText("Confirm");
        await user.click(confirmButton);

        await waitFor(() => {
            expect(mockOnDelete).toHaveBeenCalled();
        });
    });

    it("calls onDelete when the delete is initiated", async () => {
        const mockOnDelete = jest.fn(() => Promise.resolve({ ok: true }));

        const { user } = setup({
            name: "Test Metric",
            unit: "kg",
            data: [],
            description: "Test Description",
            id: "123",
            onDelete: mockOnDelete,
        });

        const deleteButton = screen.getByTestId("DeleteIcon");
        await user.click(deleteButton);

        const confirmButton = screen.getByText("Confirm");
        await user.click(confirmButton);

        await waitFor(() => {
            expect(mockOnDelete).toHaveBeenCalledWith("123");
        });
    });

    it("shows a notification when 'Record Result' is clicked", async () => {
        const { user } = setup({
            name: "Test Metric",
            unit: "kg",
            data: [],
            description: "Test Description",
        });

        const recordButton = screen.getByRole("button", {
            name: /Record Result/i,
        });
        await user.click(recordButton);

        expect(mockShowNotification).toHaveBeenCalledWith(
            "warning",
            "Not implemented yet",
            "Please check back later"
        );
    });
});
