import { useState, useCallback } from "react";
import { GridRowModes, GridActionsCellItem, DataGrid } from "@mui/x-data-grid";
import { postMetric, putMetric, deleteMetric } from "../../util/api";
import { useNotification } from "../../hooks/useNotification";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import MetricsModel from "../../models/Metrics";
import MetricsEditToolbar from "../MetricsEditToolbar/MetricsEditToolbar";

export default function MetricsDataGrid({ initialRows, getRefreshedMetrics }) {
    const { showNotification } = useNotification();
    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState({});
    const [rowSelectionModel, setRowSelectionModel] = useState({});
    const [loading, setLoading] = useState(false);
    let newId = -1;

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleRowSelectionModelChange = (newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id) => () => {
        setLoading(true);
        deleteMetric(id)
            .then((res) => {
                if (String(res.status).startsWith("2")) {
                    setRows(rows.filter((row) => row.id !== id));
                    showNotification(
                        "success",
                        "Metric deleted",
                        "The metric has been deleted successfully"
                    );
                } else {
                    showNotification(
                        "error",
                        "Error deleting metric",
                        "Please try again later"
                    );
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = useCallback(
        async (newRow) => {
            setLoading(true);

            const handleResponse = async (res) => {
                const verb = newRow.isNew ? "created" : "updated";

                if (String(res.status).startsWith("2")) {
                    const validatedRow = newRow.isNew
                        ? await res.json()
                        : { ...newRow, isNew: false };

                    // update rows so that the newRow has the id of validatedRow
                    setRows((prevRows) =>
                        prevRows.map((row) =>
                            row.id === newRow.id ? validatedRow : row
                        )
                    );

                    showNotification(
                        "success",
                        `Metric ${verb}`,
                        `The metric has been ${verb} successfully`
                    );
                    return validatedRow;
                } else {
                    setRowModesModel({
                        ...rowModesModel,
                        [newRow.id]: { mode: GridRowModes.Edit },
                    });

                    return Promise.reject(
                        new Error(
                            `The metric could not be ${verb}. Is your content unsafe?`
                        )
                    );
                }
            };

            try {
                const res = newRow.isNew
                    ? await postMetric({ ...newRow, isNew: undefined })
                    : await putMetric(newRow);

                return handleResponse(res);
            } finally {
                setLoading(false);
            }
        },
        [rowModesModel, showNotification, setLoading]
    );

    const handleProcessRowUpdateError = useCallback(
        (error) => {
            showNotification(
                "error",
                "Error saving metric",
                error.message || "Please try again later"
            );
        },
        [showNotification]
    );

    const onAdd = () => {
        const id = newId--;
        const newRow = {
            id: id,
            name: "",
            unit: "",
            description: "",
            isNew: true,
        };

        setRows((prevRows) => [...prevRows, newRow]);
        setRowModesModel((prev) => ({
            ...prev,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        }));
    };

    const columns = [...MetricsModel];
    columns.push({
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        cellClassName: "actions",
        getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                    <GridActionsCellItem
                        icon={<SaveIcon color="success" />}
                        label="Save"
                        onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<CancelIcon color="primary" />}
                        label="Cancel"
                        onClick={handleCancelClick(id)}
                    />,
                ];
            }

            return [
                <GridActionsCellItem
                    icon={<EditIcon color="primary" />}
                    label="Edit"
                    onClick={handleEditClick(id)}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon color="error" />}
                    label="Delete"
                    onClick={handleDeleteClick(id)}
                />,
            ];
        },
    });

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            rowModesModel={rowModesModel}
            editMode="row"
            loading={loading}
            onRowModesModelChange={handleRowModesModelChange}
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={handleRowSelectionModelChange}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            slots={{
                toolbar: MetricsEditToolbar,
            }}
            slotProps={{
                toolbar: {
                    loading,
                    onAddClick: onAdd,
                },
                loadingOverlay: {
                    variant: "skeleton",
                },
            }}
        />
    );
}
