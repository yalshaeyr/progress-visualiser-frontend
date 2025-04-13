import { useContext } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { NotificationContext } from "../../contexts/NotificationContext";

export default function ProgressVisualiserNotification() {
    const { notification, closeNotification } = useContext(NotificationContext);

    if (!notification) return null;

    const { severity, title, message, duration } = notification;

    return (
        <Snackbar
            open={!!notification}
            autoHideDuration={duration ? duration : 5000}
            onClose={closeNotification}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            data-testid="notification-snackbar"
        >
            <Alert
                onClose={closeNotification}
                severity={severity ? severity : "error"}
                sx={{ width: "100%", maxWidth: "400px" }}
            >
                <AlertTitle>{title ? title : "Unknown Error"}</AlertTitle>
                {message ? message : "An unknown error occurred"}
            </Alert>
        </Snackbar>
    );
}
