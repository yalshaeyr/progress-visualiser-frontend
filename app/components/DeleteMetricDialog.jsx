import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

export default function DeleteMetricDialog({
    open,
    onClose,
    onConfirm,
    metricName,
    resultsCount,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Delete Metric</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete <b>{metricName}?</b>
                </DialogContentText>
                <br />
                <DialogContentText>
                    There are <b>{resultsCount || 0}</b> results recorded
                    against it.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>No</Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                >
                    Yes, Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
