import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

jest.mock("../Metric/Metric", () => (props) => (
    <div data-testid="metric">
        {props.name} - {props.unit}
    </div>
));

jest.mock("../MetricSkeleton/MetricSkeleton", () => () => (
    <div data-testid="metric-skeleton"></div>
));

jest.mock("../AddMetric/AddMetric", () => (props) => (
    <div
        data-testid="add-metric"
        onClick={props.onComplete}
    ></div>
));

jest.mock("../../hooks/useWakeUpNotification", () => ({
    useWakeUpNotification: jest.fn(),
}));

jest.mock("../../util/api", () => ({
    deleteMetric: jest.fn(),
}));

describe("Dashboard", () => {
    it("renders skeletons when loading is true", () => {
        render(<Dashboard loading={true} />);

        const skeletons = screen.getAllByTestId("metric-skeleton");
        expect(skeletons).toHaveLength(2);
        skeletons.forEach((skeleton) => expect(skeleton).toBeVisible());
    });

    it("renders metrics when loading is false", () => {
        const metrics = [
            {
                id: 1,
                name: "Metric 1",
                unit: "kg",
                data: [],
                description: "Description 1",
            },
            {
                id: 2,
                name: "Metric 2",
                unit: "m",
                data: [],
                description: "Description 2",
            },
        ];

        render(
            <Dashboard
                metrics={metrics}
                loading={false}
            />
        );

        const metricElements = screen.getAllByTestId("metric");
        expect(metricElements).toHaveLength(2);
        expect(metricElements[0]).toHaveTextContent("Metric 1 - kg");
        expect(metricElements[1]).toHaveTextContent("Metric 2 - m");
    });

    it("renders the AddMetric component", () => {
        render(
            <Dashboard
                loading={false}
                metrics={[]}
            />
        );

        const addMetric = screen.getByTestId("add-metric");
        expect(addMetric).toBeVisible();
    });

    it("calls onRefresh when AddMetric is completed", async () => {
        const mockOnRefresh = jest.fn();

        render(
            <Dashboard
                loading={false}
                metrics={[]}
                onRefresh={mockOnRefresh}
            />
        );

        const addMetric = screen.getByTestId("add-metric");
        addMetric.click();

        expect(mockOnRefresh).toHaveBeenCalled();
    });
});
