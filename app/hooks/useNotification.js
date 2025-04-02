import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

export function useNotification() {
    const { showNotification } = useContext(NotificationContext);
    return showNotification;
}
