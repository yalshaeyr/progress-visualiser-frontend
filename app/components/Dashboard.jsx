import Grid from "@mui/material/Grid2";
import { Fragment } from "react";
import Metric from "./Metric";
import MetricSkeleton from "./MetricSkeleton";

export default function Dashboard({ metrics, loading = false, onRefresh }) {
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
            {metrics?.map((metric, index) => (
                <Grid
                    key={index}
                    size={4}
                >
                    <Metric
                        name={metric.name}
                        unit={metric.unit}
                        data={metric.data}
                        description={metric.description}
                    />
                </Grid>
            ))}
        </Grid>
    )
}