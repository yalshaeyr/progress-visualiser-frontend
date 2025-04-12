import Stack from "@mui/material/Stack";
import SearchBar from "../SearchBar";
import ProgressVisualiserDatePicker from "../ProgressVisualiserDatePicker";

export default function ProgressVisualiserForm({ onSearch }) {
    return (
        <Stack
            sx={{
                mt: 1,
                mb: 2,
                ml: "auto",
                mr: 5,
                width: "350px",
            }}
            direction="row"
            spacing={2}
            data-testid="progress-visualiser-form"
        >
            <SearchBar onSearch={onSearch} />
            <ProgressVisualiserDatePicker />
        </Stack>
    );
}
