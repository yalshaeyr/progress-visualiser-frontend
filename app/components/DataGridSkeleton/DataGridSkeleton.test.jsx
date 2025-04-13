import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DataGridSkeleton from "./DataGridSkeleton";

jest.mock("../../hooks/useWakeUpNotification", () => ({
    useWakeUpNotification: jest.fn(),
}));

describe("DataGridSkeleton", () => {
    it("renders the DataGridSkeleton component with loading state", () => {
        render(
            <DataGridSkeleton columns={[{ field: "id", headerName: "ID" }]} />
        );

        // Check for the DataGrid loading overlay
        const dataGrid = screen.getByRole("grid");
        expect(dataGrid).toBeVisible();
        expect(dataGrid).toHaveClass(
            "MuiDataGrid-main--hasSkeletonLoadingOverlay"
        );
    });

    it("renders the DataGrid with provided columns", () => {
        render(
            <DataGridSkeleton
                columns={[
                    { field: "id", headerName: "ID" },
                    { field: "name", headerName: "Name" },
                ]}
            />
        );

        // Check for column headers
        expect(screen.getByText("ID")).toBeVisible();
        expect(screen.getByText("Name")).toBeVisible();
    });
});
