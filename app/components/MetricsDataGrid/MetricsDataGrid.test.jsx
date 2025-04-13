import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { postMetric, putMetric, deleteMetric } from "../../util/api";
import MetricsDataGrid from "./MetricsDataGrid";

jest.mock("../../util/api", () => ({
    postMetric: jest.fn(() => Promise.resolve({ status: 200 })),
    putMetric: jest.fn(() => Promise.resolve({ status: 200 })),
    deleteMetric: jest.fn(() => Promise.resolve({ status: 200 })),
}));

const mockShowNotification = jest.fn();
jest.mock("../../hooks/useNotification", () => ({
    useNotification: jest.fn(() => ({
        showNotification: mockShowNotification,
    })),
}));

describe("MetricsDataGrid", () => {
    const setup = (props) => {
        const user = userEvent.setup();
        render(<MetricsDataGrid {...props} />);
        return { user };
    };

    const getActionsButton = (iconName, rowIndex) => {
        return screen.getAllByTestId(iconName)[rowIndex];
    };

    const mockInitialRows = [
        {
            id: 1,
            name: "Metric 1",
            unit: "Unit 1",
            description: "Description 1",
        },
        {
            id: 2,
            name: "Metric 2",
            unit: "Unit 2",
            description: "Description 2",
        },
    ];

    it("renders the DataGrid with initial rows", () => {
        setup({ initialRows: mockInitialRows });

        expect(screen.getByText("Metric 1")).toBeVisible();
        expect(screen.getByText("Metric 2")).toBeVisible();
        expect(screen.getByText("Unit 1")).toBeVisible();
        expect(screen.getByText("Unit 2")).toBeVisible();
        expect(screen.getByText("Description 1")).toBeVisible();
        expect(screen.getByText("Description 2")).toBeVisible();
    });

    it("can modify a row", async () => {
        const { user } = setup({ initialRows: mockInitialRows });
        const editButton = getActionsButton("EditIcon", 0);
        await user.click(editButton);

        const nameInput = screen.getAllByRole("textbox")[0];
        await user.clear(nameInput);
        await user.type(nameInput, "Updated Metric 1");

        const saveButton = getActionsButton("SaveIcon", 0);
        await user.click(saveButton);

        expect(putMetric).toHaveBeenCalledWith({
            id: 1,
            name: "Updated Metric 1",
            unit: "Unit 1",
            description: "Description 1",
        });
    });

    it("can add a new row", async () => {
        const { user } = setup({ initialRows: mockInitialRows });
        const addButton = screen.getByRole("button", { name: /Add Record/i });
        await user.click(addButton);

        const nameInput = screen.getAllByRole("textbox")[0];
        await user.type(nameInput, "New Metric");

        const saveButton = getActionsButton("SaveIcon", 0);
        await user.click(saveButton);

        expect(postMetric).toHaveBeenCalledWith({
            id: -1,
            name: "New Metric",
            unit: "",
            description: "",
        });
    });

    it("can delete a row", async () => {
        const { user } = setup({ initialRows: mockInitialRows });
        const deleteButton = getActionsButton("DeleteIcon", 0);
        await user.click(deleteButton);

        expect(deleteMetric).toHaveBeenCalledWith(1);
    });

    it("failed deletes retain the row in the grid", async () => {
        const { user } = setup({ initialRows: mockInitialRows });
        deleteMetric.mockResolvedValueOnce({ status: 500 });

        const deleteButton = getActionsButton("DeleteIcon", 0);
        await user.click(deleteButton);

        // need to wait for some async operations to finish
        await waitFor(() => {
            expect(screen.getByText("Metric 1")).toBeVisible();
            expect(screen.getByText("Unit 1")).toBeVisible();
            expect(screen.getByText("Description 1")).toBeVisible();
        });
    });

    it("failed updates retain the row's edit mode in the grid", async () => {
        const { user } = setup({ initialRows: mockInitialRows });
        putMetric.mockResolvedValueOnce({ status: 500 });

        const editButton = getActionsButton("EditIcon", 0);
        await user.click(editButton);

        const nameInput = screen.getAllByRole("textbox")[0];
        await user.clear(nameInput);
        await user.type(nameInput, "Updated Metric 1");

        const saveButton = getActionsButton("SaveIcon", 0);
        await user.click(saveButton);

        await waitFor(() => {
            expect(screen.getAllByRole("textbox")[0]).toBeVisible();
            expect(screen.getAllByRole("textbox")[0]).toHaveValue(
                "Updated Metric 1"
            );
            expect(screen.getAllByRole("textbox")[1]).toBeVisible();
            expect(screen.getAllByRole("textbox")[1]).toHaveValue(
                "Description 1"
            );
            expect(screen.getAllByRole("textbox")[2]).toBeVisible();
            expect(screen.getAllByRole("textbox")[2]).toHaveValue("Unit 1");
            expect(screen.getByTestId("EditIcon")).toBeVisible();
            expect(screen.getByTestId("SaveIcon")).toBeVisible();
        });
    });

    it("shows a notification when a metric is deleted", async () => {
        const { user } = setup({ initialRows: mockInitialRows });
        const deleteButton = getActionsButton("DeleteIcon", 0);
        await user.click(deleteButton);

        expect(mockShowNotification).toHaveBeenCalledWith(
            "success",
            "Metric deleted",
            "The metric has been deleted successfully"
        );
    });

    it("shows a notification when a metric is added", async () => {
        postMetric.mockResolvedValueOnce({
            status: 200,
            json: () => {
                return Promise.resolve({
                    id: 3,
                    name: "New Metric",
                    unit: "Unit 3",
                    description: "Description 3",
                });
            },
        });
        const { user } = setup({ initialRows: mockInitialRows });
        const addButton = screen.getByRole("button", { name: /Add Record/i });
        await user.click(addButton);

        const nameInput = screen.getAllByRole("textbox")[0];
        await user.type(nameInput, "New Metric");

        const saveButton = getActionsButton("SaveIcon", 0);
        await user.click(saveButton);

        expect(mockShowNotification).toHaveBeenCalledWith(
            "success",
            "Metric created",
            "The metric has been created successfully"
        );
    });

    it("shows a notification when a metric is updated", async () => {
        const { user } = setup({ initialRows: mockInitialRows });
        const editButton = getActionsButton("EditIcon", 0);
        await user.click(editButton);

        const nameInput = screen.getAllByRole("textbox")[0];
        await user.clear(nameInput);
        await user.type(nameInput, "Updated Metric 1");

        const saveButton = getActionsButton("SaveIcon", 0);
        await user.click(saveButton);

        expect(mockShowNotification).toHaveBeenCalledWith(
            "success",
            "Metric updated",
            "The metric has been updated successfully"
        );
    });

    it("shows an error notification when a metric fails to delete", async () => {
        const { user } = setup({ initialRows: mockInitialRows });
        deleteMetric.mockResolvedValueOnce({ status: 500 });

        const deleteButton = getActionsButton("DeleteIcon", 0);
        await user.click(deleteButton);

        expect(mockShowNotification).toHaveBeenCalledWith(
            "error",
            "Error deleting metric",
            "Please try again later"
        );
    });

    it("shows an error notification when a metric fails to add", async () => {
        const { user } = setup({ initialRows: mockInitialRows });
        postMetric.mockResolvedValueOnce({ status: 500 });

        const addButton = screen.getByRole("button", { name: /Add Record/i });
        await user.click(addButton);

        const nameInput = screen.getAllByRole("textbox")[0];
        await user.type(nameInput, "New Metric");

        const saveButton = getActionsButton("SaveIcon", 0);
        await user.click(saveButton);

        expect(mockShowNotification).toHaveBeenCalledWith(
            "error",
            "Error saving metric",
            "The metric could not be created"
        );
    });
});
