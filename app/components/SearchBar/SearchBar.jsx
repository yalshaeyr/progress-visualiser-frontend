import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
    return (
        <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    sx: {
                        borderRadius: 2,
                    },
                },
            }}
            onChange={onSearch}
        />
    );
}
