import { GridToolbarContainer } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function MetricsEditToolbar({ onAddClick }) {
    return (
        <GridToolbarContainer>
            <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={onAddClick}
            >
                Add Record
            </Button>
        </GridToolbarContainer>
    );
}
