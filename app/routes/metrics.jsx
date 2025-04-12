import { Endpoints } from "../constants/Endpoints";
import { useState, Suspense, useEffect } from "react";
import { Await } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import { useSearch } from "../hooks/useSearch";
import DataGridSkeleton from "../components/DataGridSkeleton/DataGridSkeleton";
import MetricsModel from "../models/Metrics";
import MetricsEditToolbar from "../components/MetricsEditToolbar/MetricsEditToolbar";

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
                    const { setSearchLogic } = useSearch();
                    const [rows, setRows] = useState(resolvedMetrics);
                    const [rowModesModel, setRowModesModel] = useState({});
                    const [rowSelectionModel, setRowSelectionModel] = useState(
                        {}
                    );
                    const [loading, setLoading] = useState(false);

                    const handleRowModesModelChange = (newRowModesModel) => {
                        setRowModesModel(newRowModesModel);
                    };

                    const handleRowSelectionModelChange = (
                        newRowSelectionModel
                    ) => {
                        setRowSelectionModel(newRowSelectionModel);
                    };

                    const processRowUpdate = (newRow) => {
                        const updatedRow = { ...newRow, isNew: false };
                        setRows(
                            rows.map((row) =>
                                row.id === newRow.id ? updatedRow : row
                            )
                        );
                        return updatedRow;
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
                            setRows(filteredMetrics);
                        };

                        setSearchLogic(() => onMetricSearch);
                    }, [resolvedMetrics, setSearchLogic, setRows]);

                    return (
                        <DataGrid
                            rows={rows}
                            columns={MetricsModel}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            rowSelectionModel={rowSelectionModel}
                            onRowSelectionModelChange={
                                handleRowSelectionModelChange
                            }
                            loading={loading}
                            processRowUpdate={processRowUpdate}
                            slots={{
                                toolbar: MetricsEditToolbar,
                            }}
                            slotProps={{
                                toolbar: {
                                    setRows,
                                    setRowModesModel,
                                    setLoading,
                                    loading,
                                    rows,
                                    rowSelectionModel,
                                },
                                loadingOverlay: {
                                    variant: "skeleton",
                                },
                            }}
                        />
                    );
                }}
            </Await>
        </Suspense>
    );
}
