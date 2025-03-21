import Stack from '@mui/material/Stack';
import BreadcrumbStack from "./BreadcrumbStack";
import MetricForm from "./MetricForm";

export default function AppBar() {
  return (
    <Stack
        sx={{
            mb: 2,
            alignItems: 'center'
        }}
        direction="row"
    >
        <BreadcrumbStack/>
        <MetricForm/>
    </Stack>
  );
}