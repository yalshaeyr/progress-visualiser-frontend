import Grid from "@mui/material/Grid2";
import { Fragment } from "react";
import Metric from "./Metric";
import MetricSkeleton from "./MetricSkeleton";
import AddMetric from "./AddMetric/AddMetric";
import { deleteMetric } from "../../util/api";
import { useWakeUpNotification } from "../hooks/useWakeUpNotification";

export default function Dashboard({ metrics, loading = false, onRefresh }) {
    useWakeUpNotification(loading);

    return (
        <Grid
            container
            spacing={2}
            direction={"row"}
        >
            {loading ? (
                <Fragment>
                    <Grid size={4}>
                        <MetricSkeleton />
                    </Grid>
                    <Grid size={4}>
                        <MetricSkeleton />
                    </Grid>
                </Fragment>
            ) : (
                <Fragment>
                    {metrics?.map((metric, index) => (
                        <Grid
                            key={index}
                            size={4}
                        >
                            <Metric
                                id={metric.id}
                                name={metric.name}
                                unit={metric.unit}
                                data={metric.data}
                                description={metric.description}
                                onDelete={deleteMetric}
                                onDeleteCompletion={onRefresh}
                            />
                        </Grid>
                    ))}
                    <Grid size={4}>
                        <AddMetric onComplete={onRefresh} />
                    </Grid>
                </Fragment>
            )}
        </Grid>
    );
}
