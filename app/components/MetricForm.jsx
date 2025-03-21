import Stack from '@mui/material/Stack';
import SearchBar from './SearchBar';
import MetricDatePicker from './MetricDatePicker';

export default function MetricForm() {
    return (
        <Stack
            sx={{
                mt: 1,
                mb: 2,
                ml: 'auto',
                mr: 5,
                width: '350px'
            }}
            direction="row"
            spacing={2}
        >
            <SearchBar/>
            <MetricDatePicker/>
        </Stack>
    )
}