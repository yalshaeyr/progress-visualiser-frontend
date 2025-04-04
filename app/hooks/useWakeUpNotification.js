import { useEffect } from "react";
import { useNotification } from "../hooks/useNotification";

export function useWakeUpNotification(loading) {
    const { showNotification, closeNotification } = useNotification();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (loading) {
                showNotification(
                    "warning",
                    "Warming up",
                    "This app is having a slow start... It will wake up soon!",
                    10000
                );
            }
        }, 5000);

        return () => {
            // Clear the timeout & close the notification if the component unmounts or loading changes
            clearTimeout(timeoutId);
            closeNotification();
        };
    }, [loading, showNotification, closeNotification]);
}
