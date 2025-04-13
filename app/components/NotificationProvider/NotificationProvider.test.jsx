import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import { NotificationContext } from "../../contexts/NotificationContext";
import NotificationProvider from "./NotificationProvider";

describe("NotificationProvider", () => {
    it("provides default null notification", () => {
        render(
            <NotificationProvider>
                <NotificationContext.Consumer>
                    {({ notification }) => (
                        <div data-testid="notification-value">
                            {notification
                                ? "Notification exists"
                                : "No notification"}
                        </div>
                    )}
                </NotificationContext.Consumer>
            </NotificationProvider>
        );

        const notificationValue = screen.getByTestId("notification-value");
        expect(notificationValue).toHaveTextContent("No notification");
    });

    it("updates notification when showNotification is called", () => {
        let showNotification;
        render(
            <NotificationProvider>
                <NotificationContext.Consumer>
                    {({ notification, showNotification: show }) => {
                        showNotification = show;
                        return (
                            <div data-testid="notification-value">
                                {notification
                                    ? `${notification.title}: ${notification.message}`
                                    : "No notification"}
                            </div>
                        );
                    }}
                </NotificationContext.Consumer>
            </NotificationProvider>
        );

        act(() => {
            showNotification("success", "Test Title", "Test Message", 3000);
        });

        const notificationValue = screen.getByTestId("notification-value");
        expect(notificationValue).toHaveTextContent("Test Title: Test Message");
    });

    it("clears notification when closeNotification is called", () => {
        let showNotification, closeNotification;
        render(
            <NotificationProvider>
                <NotificationContext.Consumer>
                    {({
                        notification,
                        showNotification: show,
                        closeNotification: close,
                    }) => {
                        showNotification = show;
                        closeNotification = close;
                        return (
                            <div data-testid="notification-value">
                                {notification
                                    ? `${notification.title}: ${notification.message}`
                                    : "No notification"}
                            </div>
                        );
                    }}
                </NotificationContext.Consumer>
            </NotificationProvider>
        );

        act(() => {
            showNotification("success", "Test Title", "Test Message", 3000);
        });

        act(() => {
            closeNotification();
        });

        const notificationValue = screen.getByTestId("notification-value");
        expect(notificationValue).toHaveTextContent("No notification");
    });
});
