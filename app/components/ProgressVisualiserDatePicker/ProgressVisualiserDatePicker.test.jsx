import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProgressVisualiserDatePicker from "./ProgressVisualiserDatePicker";

const mockShowNotification = jest.fn();
jest.mock("../../hooks/useNotification", () => ({
    useNotification: jest.fn(() => ({
        showNotification: mockShowNotification,
    })),
}));

describe("ProgressVisualiserDatePicker", () => {
    it("renders the ProgressVisualiserDatePicker component", () => {
        render(<ProgressVisualiserDatePicker />);

        const datePickerInput = screen.getByRole("textbox");
        expect(datePickerInput).toBeVisible();
    });

    it("shows a notification when a date is selected", async () => {
        const user = userEvent.setup();
        render(<ProgressVisualiserDatePicker />);

        const datePickerButton = screen.getByRole("button", {
            name: /choose date/i,
        });
        await user.click(datePickerButton);

        // Simulate selecting the 15th of the month
        const dateOption = screen.getByText("15", { exact: true });
        await user.click(dateOption);

        expect(mockShowNotification).toHaveBeenCalledWith(
            "warning",
            "Not implemented yet",
            "Please check back later"
        );
    });
});
