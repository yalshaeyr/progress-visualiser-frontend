import { Endpoints } from "../constants/Endpoints";
import { useSearch } from "../hooks/useSearch";
import { useState, useEffect, Suspense } from "react";
import { Await } from "react-router";
import Dashboard from "../components/Dashboard";

export function meta() {
    return [
        { title: "Progress Visualiser" },
        { name: "description", content: "Welcome to Progress Visualiser!" },
    ];
}

export async function clientLoader() {
    /**
     * It seems that this function does not play nicely when returning
     * a single Promise that is not awaited. If instead, another Promise is
     * returned by its side that is resolved, it will function as expected.
     * What I expected - I can return metrics and render my fallback using Suspense/Await
     * What happens - returning metrics triggers HydrateFallback in root.jsx
     * My solution - return a dummy resolved Promise to trigger the intended effect
     * See https://reactrouter.com/how-to/suspense#1-return-a-promise-from-loader
     */
    let criticalData = Promise.resolve();

    const metricsPromise = new Promise((resolve, _reject) => {
        fetch(Endpoints.MetricsRoot)
            .then((res) => res.json())
            .then(async (metrics) => {
                const metricIds = metrics?.map(({ id }) => id);

                return Promise.all(
                    metricIds.map((id) =>
                        fetch(`${Endpoints.MetricDataForMetric}/${id}/`).then(
                            (res) => {
                                if (res.status === 200) {
                                    return res.json();
                                }
                            }
                        )
                    )
                ).then(async (data) => {
                    metrics?.forEach((metric, index) => {
                        metric.data = data[index];
                    });
                    resolve(metrics);
                });
            });
    });

    return { criticalData, metricsPromise };
}

export default function Home({ loaderData }) {
    const { metricsPromise } = loaderData;

    return (
        <Suspense fallback={<Dashboard loading={true} />}>
            <Await resolve={metricsPromise}>
                {
                    /**
                     * Need to wait for the metrics to resolve
                     * before defining our states and effects,
                     * as they are entirely reliant on the resolved values.
                     * They are only resolved in this Await element.
                     */
                    (resolvedMetrics) => {
                        const { setSearchLogic } = useSearch();
                        const [allMetrics] = useState(resolvedMetrics);
                        const [filteredMetrics, setFilteredMetrics] =
                            useState(resolvedMetrics);

                        const onRefresh = async () => {
                            const { metricsPromise } = await clientLoader();
                            const metrics = await metricsPromise;
                            setFilteredMetrics(metrics);
                        };

                        useEffect(() => {
                            const onMetricSearch = (metricSearch) => {
                                const filteredMetrics = allMetrics?.filter(
                                    ({ name }) =>
                                        name
                                            ?.toLowerCase()
                                            ?.includes(
                                                metricSearch?.target?.value?.toLowerCase()
                                            )
                                );
                                setFilteredMetrics(filteredMetrics);
                            };

                            /**
                             * We must wrap this in a useEffect hook.
                             * You cannot update a parent state in a child component
                             * during rendering, which is what would happen if this setSearchLogic call
                             * was made in the body of this component, rather than in an effect hook.
                             * This hook is called after rendering, so it's safe to update the state.
                             * See https://legacy.reactjs.org/blog/2020/02/26/react-v16.13.0.html#warnings-for-some-updates-during-render
                             * "In the rare case that you intentionally want to change the state of another component as a result of rendering,
                             *  you can wrap the setState call into useEffect."
                             */
                            setSearchLogic(() => onMetricSearch);
                        }, [
                            allMetrics,
                            filteredMetrics,
                            setFilteredMetrics,
                            setSearchLogic,
                        ]);

                        return (
                            <Dashboard
                                metrics={filteredMetrics}
                                onRefresh={onRefresh}
                            />
                        );
                    }
                }
            </Await>
        </Suspense>
    );
}
