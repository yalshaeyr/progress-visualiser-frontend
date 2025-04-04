import { useContext } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { NotificationContext } from "../contexts/NotificationContext";

export default function ProgressVisualiserNotification() {
    const { notification, closeNotification } = useContext(NotificationContext);

    if (!notification) return null;

    const { severity, title, message } = notification;

    return (
        <Snackbar
            open={notification}
            autoHideDuration={5000}
            onClose={closeNotification}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert
                onClose={closeNotification}
                severity={severity}
                sx={{ width: "100%", maxWidth: "300px" }}
            >
                {title && <AlertTitle>{title}</AlertTitle>}
                {message}
            </Alert>
        </Snackbar>
    );
}
