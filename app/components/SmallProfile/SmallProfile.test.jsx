import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SmallProfile from "./SmallProfile";

const mockShowNotification = jest.fn();
jest.mock("../../hooks/useNotification", () => ({
    useNotification: jest.fn(() => ({
        showNotification: mockShowNotification,
    })),
}));

describe("SmallProfile", () => {
    it("renders the SmallProfile component with username and email", () => {
        render(
            <SmallProfile
                username="JohnDoe"
                email="john.doe@example.com"
            />
        );

        const avatar = screen.getByText("J");
        const username = screen.getByText("JohnDoe");
        const email = screen.getByText("john.doe@example.com");

        expect(avatar).toBeVisible();
        expect(username).toBeVisible();
        expect(email).toBeVisible();
    });

    it("handles long email addresses with ellipsis", () => {
        render(
            <SmallProfile
                username="JohnDoe"
                email="averylongemailaddress@example.com"
            />
        );

        const email = screen.getByText("averylongemailaddress@example.com");
        expect(email).toHaveStyle("text-overflow: ellipsis");
        expect(email).toHaveStyle("white-space: nowrap");
        expect(email).toHaveStyle("overflow: hidden");
    });

    it("shows a notification when the more options button is clicked", async () => {
        const user = userEvent.setup();
        render(
            <SmallProfile
                username="JohnDoe"
                email="john.doe@example.com"
            />
        );

        const moreOptionsButton = screen.getByRole("button");
        await user.click(moreOptionsButton);

        expect(mockShowNotification).toHaveBeenCalledWith(
            "warning",
            "Not implemented yet",
            "Please check back later"
        );
    });
});
