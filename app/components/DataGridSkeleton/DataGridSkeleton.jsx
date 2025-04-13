import { DataGrid } from "@mui/x-data-grid";
import { useWakeUpNotification } from "../../hooks/useWakeUpNotification";

export default function DataGridSkeleton({ columns = [] }) {
    useWakeUpNotification(true);

    return (
        <DataGrid
            loading
            slotProps={{
                loadingOverlay: {
                    variant: "skeleton",
                    noRowsVariant: "skeleton",
                },
            }}
            columns={columns}
        />
    );
}
