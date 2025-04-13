import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoadingScreen from "./LoadingScreen";

describe("LoadingScreen", () => {
    it("renders the LoadingScreen component", () => {
        render(<LoadingScreen />);

        // Check for CircularProgress
        const circularProgress = screen.getByRole("progressbar");
        expect(circularProgress).toBeVisible();

        // Check for Box container
        const loadingScreen = screen.getByTestId("loading-screen");
        expect(loadingScreen).toHaveStyle({
            position: "fixed",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "background.default",
        });
    });
});
