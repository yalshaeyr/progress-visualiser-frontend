import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

export default function MetricSkeleton() {
    const skeletonBarHeights = ["200px", "100px", "150px", "50px", "175px"];
    return (
        <Paper
            data-testid="metric-skeleton"
            sx={{ height: "100%" }}
        >
            <CardContent>
                <Skeleton width="15%">
                    <Typography variant="subtitle2">.</Typography>
                </Skeleton>
                <Stack>
                    <Stack
                        direction="row"
                        justifyContent={"space-between"}
                    >
                        <Skeleton width="10%">
                            <Typography variant="subtitle2">.</Typography>
                        </Skeleton>
                        <Skeleton>
                            <Chip />
                        </Skeleton>
                    </Stack>
                    <Skeleton width="25%">
                        <Typography variant="caption">.</Typography>
                    </Skeleton>
                    <Stack
                        direction={"row"}
                        marginTop="10px"
                        alignItems={"baseline"}
                        justifyContent={"center"}
                    >
                        {skeletonBarHeights.map((height, index) => {
                            return (
                                <Skeleton
                                    variant="rectangular"
                                    data-testid={"skeleton-bar-" + index}
                                    width="5%"
                                    height={height}
                                    key={index}
                                    sx={{
                                        marginRight: "1px",
                                    }}
                                />
                            );
                        })}
                    </Stack>
                </Stack>
            </CardContent>
        </Paper>
    );
}
