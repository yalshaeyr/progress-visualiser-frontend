import { useState, useCallback } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

export default function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((severity, title, message) => {
        setNotification({ severity, title, message });
    }, []);

    const closeNotification = useCallback(() => {
        setNotification(null);
    }, []);

    return (
        <NotificationContext.Provider
            value={{ notification, showNotification, closeNotification }}
        >
            {children}
        </NotificationContext.Provider>
    );
}
