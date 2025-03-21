import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Metric({ name, unit, data = [], description}) {
    const xAxis = data.map(({ recordedAt }) => new Date(recordedAt));
    const yAxis = data.map(({ value }) => value);

    return (
        <Paper>
            <CardContent>
                <Typography variant="subtitle2">
                    {name}
                </Typography>                
                <Stack>
                    <Stack
                        direction="row"
                        justifyContent={"space-between"}
                    >
                        <Typography variant="subtitle2">
                            {yAxis.reduce((total, val) => total + val) ?? "N/A"}
                        </Typography>
                        <Chip
                            size="small"
                            color='success'
                            label={unit}
                        />
                    </Stack>
                    <Typography variant="caption">
                        {description}
                    </Typography>
                    <LineChart
                        xAxis={
                            [
                                {
                                    data: xAxis,
                                    valueFormatter: (date) => {
                                        return new Date(date).toLocaleDateString()
                                    }
                                }
                            ]
                        }
                        series={[
                            {
                                data: yAxis,
                                area: true
                            }
                        ]}
                        leftAxis={null}
                        bottomAxis={null}
                        height={300}
                    />
                </Stack>
            </CardContent>
        </Paper>
    )
}