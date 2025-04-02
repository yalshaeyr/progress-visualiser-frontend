import NotificationProvider from "./NotificationProvider";
import Stack from "@mui/material/Stack";
import SideBar from "./SideBar";
import SearchProvider from "./SearchProvider";
import AppBar from "./AppBar";
import ProgressVisualiserNotification from "./ProgressVisualiserNotification";
import { Outlet } from "react-router";

export default function Layout() {
    return (
        <NotificationProvider>
            <Stack direction="row">
                <SideBar />
                <Stack
                    direction="column"
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <SearchProvider>
                        <AppBar />
                        <Outlet />
                    </SearchProvider>
                </Stack>
            </Stack>
            <ProgressVisualiserNotification />
        </NotificationProvider>
    );
}
