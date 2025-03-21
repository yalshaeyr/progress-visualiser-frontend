import Grid from '@mui/material/Grid2';
import Metric from './Metric';

export default function Dashboard({ metrics }) {
    return (
        <Grid
            container
            spacing={2}
            direction={"row"}
        >
            {metrics?.map((metric, index) => (
                <Grid
                    key={index}
                    size={4}
                >
                    <Metric
                        name={metric.name}
                        unit={metric.unit}
                        data={metric.data}
                        description={metric.description}
                    />
                </Grid>
            ))}
        </Grid>
    )
}