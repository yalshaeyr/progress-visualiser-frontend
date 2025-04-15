import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddMetric from "./AddMetric";
import { postMetric } from "../../util/api";

jest.mock("../../constants/Endpoints.js", () => ({
    MetricsRoot: "https://not-a-real-url/metrics",
    MetricDataRoot: "https://not-a-real-url/metricdata",
    MetricDataForMetric: "https://not-a-real-url/metricdata/metric",
}));

jest.mock("../../util/api");

const mockShowNotification = jest.fn();
jest.mock("../../hooks/useNotification.js", () => {
    return {
        useNotification: jest.fn(() => ({
            showNotification: mockShowNotification,
        })),
    };
});

// see https://testing-library.com/docs/user-event/intro/#writing-tests-with-userevent
function setup(jsx) {
    return {
        user: userEvent.setup(),
        ...render(jsx),
    };
}

describe("AddMetric", () => {
    it("renders AddMetric component", () => {
        setup(<AddMetric />);

        const addMetricCard = screen.getByTestId("add-metric-card");
        expect(addMetricCard).toBeVisible();
    });

    it("dialog is rendered on click", async () => {
        const { user } = setup(<AddMetric />);

        const addMetricCard = screen.getByTestId("add-metric-card");
        await user.click(addMetricCard);

        // check for fields
        const nameField = screen.getByLabelText("Name");
        const descriptionField = screen.getByLabelText("Description");
        const unitField = screen.getByLabelText("Unit");

        expect(nameField).toBeVisible();
        expect(descriptionField).toBeVisible();
        expect(unitField).toBeVisible();

        // check for buttons
        const addButton = screen.getByRole("button", { name: /Add/i });
        const cancelButton = screen.getByRole("button", { name: /Cancel/i });
        expect(addButton).toBeVisible();
        expect(cancelButton).toBeVisible();
    });

    it("validates the form", async () => {
        const mockOnComplete = jest.fn();
        const mockPostMetric = jest.fn(() => Promise.resolve({}));
        postMetric.mockImplementation(mockPostMetric);

        const { user } = setup(<AddMetric onComplete={mockOnComplete} />);

        const addMetricCard = screen.getByTestId("add-metric-card");
        await user.click(addMetricCard);

        // attempt without filling in the fields
        const addButton = screen.getByRole("button", { name: /Add/i });
        await user.click(addButton);

        expect(mockPostMetric).not.toHaveBeenCalled();
        expect(mockOnComplete).not.toHaveBeenCalledWith();
        expect(mockShowNotification).toHaveBeenCalledWith(
            "error",
            "Invalid input",
            "Please fill all fields"
        );
    });

    it("submits the form", async () => {
        const mockOnComplete = jest.fn();
        const mockPostMetric = jest.fn(() => Promise.resolve({ status: 200 }));
        postMetric.mockImplementation(mockPostMetric);

        const { user } = setup(<AddMetric onComplete={mockOnComplete} />);

        const addMetricCard = screen.getByTestId("add-metric-card");
        await user.click(addMetricCard);

        // check for fields
        const nameField = screen.getByLabelText("Name");
        const descriptionField = screen.getByLabelText("Description");
        const unitField = screen.getByLabelText("Unit");

        // fill in the fields
        await user.type(nameField, "Test Metric");
        await user.type(descriptionField, "Test Description");
        await user.type(unitField, "Test Unit");

        // check for buttons
        const addButton = screen.getByRole("button", { name: /Add/i });
        await user.click(addButton);

        expect(mockOnComplete).toHaveBeenCalledWith();
        expect(mockPostMetric).toHaveBeenCalledWith({
            name: "Test Metric",
            description: "Test Description",
            unit: "Test Unit",
        });
    });

    it("Renders a skeleton when submitting", async () => {
        const { user } = setup(<AddMetric />);
        // do not resolve the promise, so that we can check for the skeleton
        const mockPostMetric = jest.fn(() => new Promise(() => {}));
        postMetric.mockImplementation(mockPostMetric);

        const addMetricCard = screen.getByTestId("add-metric-card");
        await user.click(addMetricCard);

        // fill in the fields
        const nameField = screen.getByLabelText("Name");
        const descriptionField = screen.getByLabelText("Description");
        const unitField = screen.getByLabelText("Unit");

        await user.type(nameField, "Test Metric");
        await user.type(descriptionField, "Test Description");
        await user.type(unitField, "Test Unit");

        // trigger submit
        const addButton = screen.getByRole("button", { name: /Add/i });
        await user.click(addButton);

        // check for skeleton
        const skeleton = screen.getByTestId("metric-skeleton");
        expect(skeleton).toBeVisible();
    });

    it("closes the dialog on cancel", async () => {
        const { user } = setup(<AddMetric />);

        const addMetricCard = screen.getByTestId("add-metric-card");
        await user.click(addMetricCard);

        // check for dialog
        expect(screen.getByTestId("add-metric-dialog")).toBeVisible();

        // click cancel button
        const cancelButton = screen.getByRole("button", { name: /Cancel/i });
        await user.click(cancelButton);

        await waitFor(() => {
            expect(
                screen.queryByTestId("add-metric-dialog")
            ).not.toBeInTheDocument();
        });
    });

    it("Rejected metric submission shows error notification", async () => {
        const mockOnComplete = jest.fn();
        const mockPostMetric = jest.fn(() =>
            Promise.resolve({ status: 400, json: () => ({}) })
        );
        postMetric.mockImplementation(mockPostMetric);

        const { user } = setup(<AddMetric onComplete={mockOnComplete} />);

        const addMetricCard = screen.getByTestId("add-metric-card");
        await user.click(addMetricCard);

        // fill in the fields
        const nameField = screen.getByLabelText("Name");
        const descriptionField = screen.getByLabelText("Description");
        const unitField = screen.getByLabelText("Unit");

        await user.type(nameField, "Test Metric");
        await user.type(descriptionField, "Test Description");
        await user.type(unitField, "Test Unit");

        // check for buttons
        const addButton = screen.getByRole("button", { name: /Add/i });
        await user.click(addButton);

        await waitFor(() => {
            expect(mockShowNotification).toHaveBeenCalledWith(
                "error",
                "Error",
                "Failed to add metric. The content might be unsafe. Please try again."
            );
        });
    });
});
