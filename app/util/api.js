import { Endpoints } from "../constants/Endpoints";

export const postMetric = async (metric) => {
    metric.id = -1;

    return fetch(Endpoints.MetricsRoot, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(metric),
    });
};

export const putMetric = async (metric) => {
    return fetch(`${Endpoints.MetricsRoot}/${metric.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(metric),
    });
};

export const deleteMetric = async (metricId) => {
    await fetch(`${Endpoints.MetricDataForMetric}/${metricId}`, {
        method: "DELETE",
    });

    return fetch(`${Endpoints.MetricsRoot}/${metricId}`, {
        method: "DELETE",
    });
};

export const recordMetricData = async (metricData) => {
    await fetch(`${Endpoints.MetricDataRoot}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(metricData),
    });
};
