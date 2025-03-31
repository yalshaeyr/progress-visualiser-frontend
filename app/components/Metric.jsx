import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts/LineChart";
import { Delete } from "@mui/icons-material";
import { Button, IconButton, CircularProgress } from "@mui/material";
import { Fragment, useState } from "react";
import { Endpoints } from "../constants/Endpoints";
import DeleteMetricDialog from "./DeleteMetricDialog";

const deleteMetric = async (metricId) => {
    await fetch(`${Endpoints.MetricDataForMetric}/${metricId}`, {
        method: "DELETE",
    });

    return fetch(`${Endpoints.MetricsRoot}/${metricId}`, {
        method: "DELETE",
    });
};

export default function Metric({
    name,
    unit,
    data = [],
    description,
    id,
    onDelete,
}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        await deleteMetric(id);
        setOpenDialog(false);
        await onDelete?.();
        setIsDeleting(false);
    };

    const xAxis = data?.map(({ recordedAt }) => new Date(recordedAt));
    const yAxis = data?.map(({ value }) => value);
    const total =
        yAxis.length == 0 ? 0 : yAxis.reduce((total, val) => total + val);

    return (
        <Fragment>
        <Paper>
            <CardContent>
                    {isDeleting ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "300px",
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Stack>
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <Typography variant="subtitle1">
                    {name}
                </Typography>                
                                <IconButton onClick={() => setOpenDialog(true)}>
                                    <Delete color="error" />
                                </IconButton>
                            </Stack>
                <Stack>
                    <Stack
                        direction="row"
                        justifyContent={"space-between"}
                    >
                        <Typography variant="subtitle2">
                                        {total}
                        </Typography>
                        <Chip
                            size="small"
                                        color="success"
                            label={unit}
                        />
                    </Stack>
                    <Typography variant="caption">
                        {description}
                    </Typography>
                                {xAxis.length == 0 || yAxis.length == 0 ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            height: "300px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography variant="subtitle2">
                                            No data to display
                                        </Typography>
                                    </Box>
                                ) : (
                    <LineChart
                                        xAxis={[
                                {
                                    data: xAxis,
                                    valueFormatter: (date) => {
                                                    return new Date(
                                                        date
                                                    ).toLocaleDateString();
                                                },
                                            },
                                        ]}
                        series={[
                            {
                                data: yAxis,
                                                area: true,
                                            },
                        ]}
                        leftAxis={null}
                        bottomAxis={null}
                        height={300}
                    />
                                )}
                            </Stack>
                </Stack>
                    )}
            </CardContent>
        </Paper>
            <DeleteMetricDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={handleDelete}
                metricName={name}
                resultsCount={data?.length}
            />
        </Fragment>
    );
}
