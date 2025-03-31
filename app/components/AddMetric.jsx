import { Add } from "@mui/icons-material";
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
    CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Endpoints } from "../constants/Endpoints";
import MetricSkeleton from "./MetricSkeleton";

const postMetric = async (metric) => {
    metric.id = -1;

    return fetch(Endpoints.MetricsRoot, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(metric),
    }).then((res) => res.json());
};

export default function AddMetric({ onComplete }) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [metric, setMetric] = useState({
        name: "",
        description: "",
        unit: "",
    });

    const handleChange = (field) => (event) => {
        setMetric({ ...metric, [field]: event.target.value });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setOpen(false);
        await postMetric(metric);
        setMetric({ name: "", description: "", unit: "" });
        await onComplete?.();
        setIsSubmitting(false);
    };

    return (
        <>
            {isSubmitting ? (
                <MetricSkeleton />
            ) : (
                <Card
                    sx={{
                        height: "100%",
                        minHeight: "300px", // in case it's rendered on its own row with no sibling height to borrow
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        "&:hover": { bgcolor: "action.hover" },
                    }}
                    onClick={() => setOpen(true)}
                >
                    <Add sx={{ fontSize: 40 }} />
                </Card>
            )}

            <Dialog
                open={open}
                onClose={() => !isSubmitting && setOpen(false)}
            >
                <DialogTitle>Add New Metric</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={metric.name}
                        onChange={handleChange("name")}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={2}
                        value={metric.description}
                        onChange={handleChange("description")}
                    />
                    <TextField
                        margin="dense"
                        label="Unit"
                        fullWidth
                        value={metric.unit}
                        onChange={handleChange("unit")}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
