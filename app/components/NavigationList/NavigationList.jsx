import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import ShowChartIcon from "@mui/icons-material/ShowChart";

export default function NavigationList() {
    return (
        <List
            dense={true}
            sx={{
                mt: 2,
            }}
        >
            <Link
                to="/"
                style={{
                    textDecoration: "none",
                    color: "inherit",
                }}
            >
                <ListItem
                    sx={{
                        paddingLeft: 0,
                    }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link
                to="/metrics"
                style={{
                    textDecoration: "none",
                    color: "inherit",
                }}
            >
                <ListItem
                    sx={{
                        paddingLeft: 0,
                    }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <ShowChartIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Metrics</ListItemText>
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
    );
}
