import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNotification } from "../hooks/useNotification";
import dayjs from "dayjs";

export default function ProgressVisualiserDatePicker() {
    const { showNotification } = useNotification();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                defaultValue={dayjs()}
                slotProps={{
                    textField: {
                        size: "small",
                    },
                }}
                onChange={() =>
                    showNotification(
                        "warning",
                        "Not implemented yet",
                        "Please check back later"
                    )
                }
            />
        </LocalizationProvider>
    );
}
