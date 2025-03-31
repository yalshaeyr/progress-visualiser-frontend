/**
 * Default MUI exports will cause Hydration issues when building with Vite
 * Use named exports instead.
 * https://github.com/remix-run/remix/discussions/8913#discussioncomment-8640299
 */
import { Box, CircularProgress } from "@mui/material";

export default function LoadingScreen() {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                backgroundColor: 'background.default',
            }}
        >
            <CircularProgress />
        </Box>
    );
};