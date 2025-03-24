import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ShowChartIcon from '@mui/icons-material/ShowChart';

export default function NavigationList() {
    return (
        <List
            dense={true}
            sx={{
                mt: 2
            }}
        >
            <ListItem
                sx={{
                    paddingLeft: 0
                }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon
                            fontSize='small'
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary="Home"
                    />
                </ListItemButton>
            </ListItem>
            <ListItem
                sx={{
                    paddingLeft: 0
                }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <ShowChartIcon
                            fontSize='small'
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary="Metrics"
                    />
                </ListItemButton>
            </ListItem>
        </List>
    );
}