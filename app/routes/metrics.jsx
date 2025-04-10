import { Endpoints } from "../constants/Endpoints";
import { useState, Suspense, Fragment, useEffect } from "react";
import { Await } from "react-router";
import { GridRowModes, DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useSearch } from "../hooks/useSearch";
import DataGridSkeleton from "../components/DataGridSkeleton";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";

export async function clientLoader() {
    // see comments in home.jsx clientLoader()
    let criticalData = Promise.resolve();

    const metricsPromise = fetch(Endpoints.MetricsRoot).then((res) =>
        res.json()
    );

    return { criticalData, metricsPromise };
}

const postMetric = async (metric) => {
    metric.id = -1;

    return fetch(Endpoints.MetricsRoot, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(metric),
    }).then((res) => res.json());
};

const deleteMetric = async (metricId) => {
    await fetch(`${Endpoints.MetricDataForMetric}/${metricId}`, {
        method: "DELETE",
    });

    return fetch(`${Endpoints.MetricsRoot}/${metricId}`, {
        method: "DELETE",
    });
};

function EditToolbar(props) {
    const {
        setRows,
        setRowModesModel,
        setLoading,
        loading,
        rows,
        rowSelectionModel,
    } = props;
    const [editing, setEditing] = useState(false);
    const [newIds, setNewIds] = useState([]);
    const [deletedRows, setDeletedRows] = useState([]);

    const setRowViews = (edit) => {
        setRowModesModel((oldModel) => {
            const newModel = { ...oldModel };
            Object.keys(newModel).forEach((entry) => {
                newModel[entry].mode = edit
                    ? GridRowModes.Edit
                    : GridRowModes.View;
            });
            return newModel;
        });
    };

    const onEditClick = () => {
        setEditing(true);
        setRowViews(true);
    };

    const onEditFinish = () => {
        setEditing(false);
        setRowViews(false);
        setNewIds([]);
        setDeletedRows([]);
    };

    const onAddClick = () => {
        const id = Date.now();

        setNewIds((oldIds) => [...oldIds, id]);

        setRows((oldRows) => [
            ...oldRows,
            { id: id, name: "", description: "", unit: "", isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        }));
    };

    const onRefreshClick = async () => {
        setLoading(true);
        onEditFinish();

        const { metricsPromise } = await clientLoader();
        const metrics = await metricsPromise;

        setRows(metrics);
        setLoading(false);
    };

    const onSaveClick = async () => {
        // TODO: Add validation
        setLoading(true);

        // delete desired
        for (const row of deletedRows) {
            await deleteMetric(row.id);
        }

        // save new rows
        for (const row of rows) {
            if (newIds.includes(row.id)) {
                await postMetric(row);
            }
        }

        onEditFinish();
        setLoading(false);
    };

    const onCancelClick = () => {
        // remove new but unsaved ids
        setRows((oldRows) => {
            return oldRows.filter((row) => {
                return !newIds.includes(row.id);
            });
        });
        setRowModesModel((oldModel) => {
            for (const ids of newIds) {
                delete oldModel[ids];
            }

            return oldModel;
        });

        // restore deleted rows
        setRows((oldRows) => [...oldRows, ...deletedRows]);

        onEditFinish();
    };

    const onDeleteRowClick = () => {
        if (rowSelectionModel?.length) {
            // we assume single-row selection, so there's only one element
            const deleteId = rowSelectionModel[0];

            // check if this is a new row. If so, we don't want to flag it
            // for deletion later on. A visual delete is enough.
            const deletedRow = rows.find((row) => row.id === deleteId);
            if (!deletedRow.isNew) {
                setDeletedRows((oldRows) => [...oldRows, deletedRow]);
            }

            setRows((oldRows) => {
                return oldRows.filter((row) => {
                    return row.id !== deletedRow.id;
                });
            });
        }
    };

    return (
        <GridToolbarContainer>
            {editing ? (
                <Fragment>
                    <Button
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={onAddClick}
                    >
                        New Row
                    </Button>
                    <Button
                        color="primary"
                        startIcon={<RefreshIcon />}
                        onClick={onRefreshClick}
                    >
                        Refresh
                    </Button>
                    <Button
                        color="success"
                        startIcon={<SaveIcon />}
                        onClick={onSaveClick}
                    >
                        Save
                    </Button>
                    <Button
                        color="primary"
                        startIcon={<CloseIcon />}
                        onClick={onCancelClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={onDeleteRowClick}
                    >
                        Delete Row
                    </Button>
                </Fragment>
            ) : (
                <Button
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={onEditClick}
                    disabled={loading}
                >
                    Edit
                </Button>
            )}
        </GridToolbarContainer>
    );
}

export default function Metrics({ loaderData }) {
    const { metricsPromise } = loaderData;

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            editable: true,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 3,
            editable: true,
        },
        {
            field: "unit",
            headerName: "Unit",
            flex: 1,
            editable: true,
        },
    ];

    return (
        <Suspense fallback={<DataGridSkeleton columns={columns} />}>
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
                            columns={columns}
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
                                toolbar: EditToolbar,
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
