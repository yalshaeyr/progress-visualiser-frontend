import "@testing-library/jest-dom";
import { createRoutesStub } from "react-router";
import { render, screen } from "@testing-library/react";
import NavigationList from "./NavigationList";

describe("NavigationList", () => {
    const renderWithRouter = (path) => {
        const Stub = createRoutesStub([
            {
                path: path,
                Component: NavigationList,
            },
        ]);

        render(<Stub initialEntries={[path]} />);
    };

    it("renders the NavigationList component with links", () => {
        renderWithRouter("/");

        // Check for Home link
        const homeLink = screen.getByText("Home");
        expect(homeLink).toBeVisible();
        expect(homeLink.closest("a")).toHaveAttribute("href", "/");

        // Check for Metrics link
        const metricsLink = screen.getByText("Metrics");
        expect(metricsLink).toBeVisible();
        expect(metricsLink.closest("a")).toHaveAttribute("href", "/metrics");
    });

    it("renders icons for each navigation item", () => {
        renderWithRouter("/");

        // Check for Home icon
        const homeIcon = screen.getByTestId("HomeIcon");
        expect(homeIcon).toBeVisible();

        // Check for Metrics icon
        const metricsIcon = screen.getByTestId("ShowChartIcon");
        expect(metricsIcon).toBeVisible();
    });
});
