import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MetricSkeleton from "./MetricSkeleton";

describe("MetricSkeleton", () => {
    it("renders the MetricSkeleton component", () => {
        render(<MetricSkeleton />);

        const paper = screen.getByTestId("metric-skeleton");
        expect(paper).toBeVisible();
    });

    it("renders the correct number of skeleton bars", () => {
        render(<MetricSkeleton />);

        // Check for the skeleton bars in the bar chart
        const skeletonBars = screen.getAllByTestId(/skeleton-bar-\d+/);
        expect(skeletonBars.length).toBe(5);
    });
});
