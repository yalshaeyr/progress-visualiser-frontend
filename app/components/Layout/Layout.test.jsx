import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

jest.mock("../SideBar/SideBar", () => () => <div data-testid="sidebar"></div>);
jest.mock("../AppBar/AppBar", () => () => <div data-testid="appbar"></div>);
jest.mock("../ProgressVisualiserNotification", () => () => (
    <div data-testid="notification"></div>
));
jest.mock("../SearchProvider", () => ({ children }) => (
    <div data-testid="search-provider">{children}</div>
));
jest.mock("../NotificationProvider", () => ({ children }) => (
    <div data-testid="notification-provider">{children}</div>
));
jest.mock("react-router", () => ({
    Outlet: () => <div data-testid="outlet"></div>,
}));

describe("Layout", () => {
    it("renders the Layout component with all child components", () => {
        render(<Layout />);

        // Check for NotificationProvider
        const notificationProvider = screen.getByTestId(
            "notification-provider"
        );
        expect(notificationProvider).toBeVisible();

        // Check for SideBar
        const sidebar = screen.getByTestId("sidebar");
        expect(sidebar).toBeVisible();

        // Check for SearchProvider
        const searchProvider = screen.getByTestId("search-provider");
        expect(searchProvider).toBeVisible();

        // Check for AppBar
        const appbar = screen.getByTestId("appbar");
        expect(appbar).toBeVisible();

        // Check for Outlet
        const outlet = screen.getByTestId("outlet");
        expect(outlet).toBeVisible();

        // Check for ProgressVisualiserNotification
        const notification = screen.getByTestId("notification");
        expect(notification).toBeVisible();
    });
});
