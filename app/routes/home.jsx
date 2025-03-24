import { useState } from "react";
import Stack from "@mui/material/Stack";
import AppBar from "../components/AppBar";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard";
import { Endpoints } from "../constants/Endpoints";

export function meta() {
  return [
    { title: "Progress Visualiser" },
    { name: "description", content: "Welcome to Progress Visualiser!" },
  ];
}

export async function clientLoader() {
    const res = await fetch(Endpoints.MetricsRoot);
    const metrics = await res.json();
    const metricIds = metrics.map(({ id }) => id);
    const data = await Promise.all(metricIds.map(async (id) => {
        const res = await fetch(`${Endpoints.MetricDataForMetric}/${id}/`);
        return res.json();
    }));
    metrics.forEach((metric, index) => {
        metric.data = data[index];
    });
    return metrics;
}

export default function Home({ loaderData }) {
    const [allMetrics, setAllMetrics] = useState(loaderData);
    const [filteredMetrics, setFilteredMetrics] = useState(allMetrics);

    return (
        <Stack direction="row">
            <SideBar />
            <Stack
                direction="column"
                sx={{
                    flexGrow: 1,
                }}
            >
                <AppBar />
                <Dashboard
                    metrics={filteredMetrics}
                />
            </Stack>
        </Stack>
    );
}