import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MetricsEditToolbar from "./MetricsEditToolbar";

jest.mock("@mui/x-data-grid", () => ({
    ...jest.requireActual("@mui/x-data-grid"),
    GridToolbarContainer: ({ children }) => (
        <div data-testid="grid-toolbar-container">{children}</div>
    ),
}));

describe("MetricsEditToolbar", () => {
    const setup = (props) => {
        const user = userEvent.setup();
        render(<MetricsEditToolbar {...props} />);
        return { user };
    };

    it("renders the toolbar with Add button", () => {
        setup();

        expect(
            screen.getByRole("button", { name: /Add Record/i })
        ).toBeVisible();
    });

    it("calls onAdd when Add button is clicked", async () => {
        const onAddClickMock = jest.fn();
        const { user } = setup({ onAddClick: onAddClickMock });

        const addButton = screen.getByRole("button", { name: /Add Record/i });
        await user.click(addButton);

        expect(onAddClickMock).toHaveBeenCalledTimes(1);
    });
});
