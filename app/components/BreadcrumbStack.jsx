import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function BreadcrumbStack() {
    return (
        <Stack
            spacing={2}
            direction="row"
        >
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link
                underline="hover"
                color="inherit"
                href="/"
                >
                Dashboard
                </Link>
                <Link
                underline="hover"
                color="inherit"
                href="/"
                >
                Home
                </Link>
            </Breadcrumbs>
        </Stack>
    )
}