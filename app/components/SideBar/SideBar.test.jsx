import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SideBar from "./SideBar";

jest.mock("../SmallProfile/SmallProfile", () => (props) => (
    <div data-testid="small-profile">
        {props.username} - {props.email}
    </div>
));

jest.mock("../NavigationList/NavigationList", () => () => (
    <div data-testid="navigation-list"></div>
));

describe("SideBar", () => {
    it("renders the SideBar component with NavigationList and SmallProfile", () => {
        render(<SideBar />);

        // Check for NavigationList
        const navigationList = screen.getByTestId("navigation-list");
        expect(navigationList).toBeVisible();

        // Check for SmallProfile
        const smallProfile = screen.getByTestId("small-profile");
        expect(smallProfile).toBeVisible();
        expect(smallProfile).toHaveTextContent(
            "John Doe - john.doe@example.com"
        );
    });

    it("renders the drawer with correct width", () => {
        render(<SideBar />);

        const drawer = screen.getByTestId("sidebar-drawer");
        expect(drawer).toBeVisible();
        expect(drawer).toHaveStyle("width: 240px");
    });
});
