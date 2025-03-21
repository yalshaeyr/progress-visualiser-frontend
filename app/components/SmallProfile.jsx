import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function SmallProfile({
    username,
    email
}) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                pb: 2,
                pt: 2,
                boxShadow: 1,
                overflow: 'hidden'
            }}>
            <Avatar
                sx={{
                    mr: 1,
                    ml: 1
                }}
            >
                {
                    username ?
                        username[0].toUpperCase()
                        :
                        ''
                }
            </Avatar>
            <Box
                sx={{
                    flex: 1,
                    overflow: 'hidden'
                }}
            >
                <Typography variant="body1">{username}</Typography>
                <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    sx={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden'
                    }}
                >
                    {email}
                </Typography>
            </Box>
            <IconButton>
                <MoreVertIcon/>
            </IconButton>
        </Box>
    )
}