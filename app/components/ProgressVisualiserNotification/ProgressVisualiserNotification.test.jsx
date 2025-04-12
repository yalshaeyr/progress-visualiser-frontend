import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProgressVisualiserNotification from "./ProgressVisualiserNotification";
import { NotificationContext } from "../../contexts/NotificationContext";

describe("ProgressVisualiserNotification", () => {
    const renderWithContext = (notification, closeNotification) => {
        render(
            <NotificationContext.Provider
                value={{ notification, closeNotification }}
            >
                <ProgressVisualiserNotification />
            </NotificationContext.Provider>
        );
    };

    it("does not render anything when notification is null", () => {
        renderWithContext(null, jest.fn());

        expect(
            screen.queryByTestId("notification-snackbar")
        ).not.toBeInTheDocument();
    });

    it("renders the notification with correct severity, title, and message", () => {
        renderWithContext(
            {
                severity: "success",
                title: "Success",
                message: "Operation completed successfully",
                duration: 5000,
            },
            jest.fn()
        );

        const snackbar = screen.getByTestId("notification-snackbar");
        expect(snackbar).toBeVisible();

        const alert = screen.getByRole("alert");
        expect(alert).toHaveClass("MuiAlert-standardSuccess");

        expect(screen.getByText("Success")).toBeVisible();
        expect(
            screen.getByText("Operation completed successfully")
        ).toBeVisible();
    });

    it("renders default values when notification properties are missing", () => {
        renderWithContext({}, jest.fn());

        const snackbar = screen.getByTestId("notification-snackbar");
        expect(snackbar).toBeVisible();

        const alert = screen.getByRole("alert");
        expect(alert).toHaveClass("MuiAlert-standardError");

        expect(screen.getByText("Unknown Error")).toBeVisible();
        expect(screen.getByText("An unknown error occurred")).toBeVisible();
    });

    it("calls closeNotification when the close button is clicked", async () => {
        const mockCloseNotification = jest.fn();
        renderWithContext(
            {
                severity: "error",
                title: "Error",
                message: "Something went wrong",
                duration: 5000,
            },
            mockCloseNotification
        );

        const closeButton = screen.getByRole("button", { name: /close/i });
        await userEvent.click(closeButton);

        expect(mockCloseNotification).toHaveBeenCalled();
    });
});
