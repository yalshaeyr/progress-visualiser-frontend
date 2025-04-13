import "@testing-library/jest-dom";
import { createRoutesStub } from "react-router";
import { render, screen } from "@testing-library/react";
import BreadcrumbStack from "./BreadcrumbStack";

describe("BreadcrumbStack", () => {
    const renderWithRouter = (path) => {
        const Stub = createRoutesStub([
            {
                path: path,
                Component: BreadcrumbStack,
                useLocation() {
                    return { pathname: path };
                },
            },
        ]);

        render(<Stub initialEntries={[path]} />);
    };

    it("renders the base breadcrumb for the root path", () => {
        renderWithRouter("/");

        const dashboardLink = screen.getByText("Dashboard");
        const homeLink = screen.getByText("Home");

        expect(dashboardLink).toBeVisible();
        expect(dashboardLink).toHaveAttribute("href", "/");

        expect(homeLink).toBeVisible();
        expect(homeLink).toHaveAttribute("href", "/");
    });

    it("renders breadcrumbs for nested paths", () => {
        renderWithRouter("/grandparent/parent/child");

        const dashboardLink = screen.getByText("Dashboard");
        const grandparentLink = screen.getByText("Grandparent");
        const parentLink = screen.getByText("Parent");
        const childLink = screen.getByText("Child");

        expect(dashboardLink).toBeVisible();
        expect(dashboardLink).toHaveAttribute("href", "/");

        expect(grandparentLink).toBeVisible();
        expect(grandparentLink).toHaveAttribute("href", "/grandparent");

        expect(parentLink).toBeVisible();
        expect(parentLink).toHaveAttribute("href", "/grandparent/parent");

        expect(childLink).toBeVisible();
        expect(childLink).toHaveAttribute("href", "/grandparent/parent/child");
    });

    it("capitalizes breadcrumb names correctly", () => {
        renderWithRouter("/example/path");

        const exampleLink = screen.getByText("Example");
        const pathLink = screen.getByText("Path");

        expect(exampleLink).toBeVisible();
        expect(pathLink).toBeVisible();
    });
});
