import React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import SmallProfile from "./SmallProfile/SmallProfile";
import NavigationList from "./NavigationList";

export default function SideBar() {
    return (
        <Box>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 240,
                        boxSizing: "border-box",
                    },
                }}
            >
                <NavigationList />
                <Box sx={{ flexGrow: 1 }} />
                <Divider />
                <SmallProfile
                    username="John Doe"
                    email="john.doe@example.com"
                />
            </Drawer>
        </Box>
    );
}
