import { Endpoints } from "../constants/Endpoints";

export const postMetric = async (metric) => {
    metric.id = -1;

    return fetch(Endpoints.MetricsRoot, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(metric),
    }).then((res) => res.json());
};
