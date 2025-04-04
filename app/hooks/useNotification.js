import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

export function useNotification() {
    const { showNotification, closeNotification } =
        useContext(NotificationContext);
    return {
        showNotification,
        closeNotification,
    };
}
