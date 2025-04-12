import Stack from "@mui/material/Stack";
import BreadcrumbStack from "../BreadcrumbStack/BreadcrumbStack";
import ProgressVisualiserForm from "../ProgressVisualiserForm";
import { useSearch } from "../../hooks/useSearch";

export default function AppBar() {
    const { searchLogic } = useSearch();

    return (
        <Stack
            sx={{
                mb: 2,
                alignItems: "center",
            }}
            direction="row"
        >
            <BreadcrumbStack />
            <ProgressVisualiserForm onSearch={searchLogic} />
        </Stack>
    );
}
