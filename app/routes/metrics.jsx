import { Endpoints } from "../constants/Endpoints";
import { Suspense, useState, useEffect } from "react";
import { Await } from "react-router";
import { useSearch } from "../hooks/useSearch";
import MetricsModel from "../models/Metrics";
import DataGridSkeleton from "../components/DataGridSkeleton/DataGridSkeleton";
import MetricsDataGrid from "../components/MetricsDataGrid/MetricsDataGrid";

export async function clientLoader() {
    // see comments in home.jsx clientLoader()
    let criticalData = Promise.resolve();

    const metricsPromise = fetch(Endpoints.MetricsRoot).then((res) =>
        res.json()
    );

    return { criticalData, metricsPromise };
}

export default function Metrics({ loaderData }) {
    const { metricsPromise } = loaderData;

    return (
        <Suspense fallback={<DataGridSkeleton columns={MetricsModel} />}>
            <Await resolve={metricsPromise}>
                {(resolvedMetrics) => {
                    const [initialRows, setInitialRows] =
                        useState(resolvedMetrics);
                    const { setSearchLogic } = useSearch();

                    const getRefreshedMetrics = async () => {
                        const { metricsPromise } = await clientLoader();
                        const metrics = await metricsPromise;
                        return metrics;
                    };

                    useEffect(() => {
                        const onMetricSearch = (metricSearch) => {
                            const filteredMetrics = resolvedMetrics?.filter(
                                ({ name }) =>
                                    name
                                        ?.toLowerCase()
                                        ?.includes(
                                            metricSearch?.target?.value?.toLowerCase()
                                        )
                            );
                            setInitialRows(filteredMetrics);
                        };

                        setSearchLogic(() => onMetricSearch);
                    }, [resolvedMetrics, setSearchLogic, setInitialRows]);

                    return (
                        <MetricsDataGrid
                            initialRows={initialRows}
                            getRefreshedMetrics={getRefreshedMetrics}
                        />
                    );
                }}
            </Await>
        </Suspense>
    );
}
