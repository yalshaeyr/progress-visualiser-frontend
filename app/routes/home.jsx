import Stack from "@mui/material/Stack";
import AppBar from "../components/AppBar";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard";

export function meta() {
  return [
    { title: "Progress Visualiser" },
    { name: "description", content: "Welcome to Progress Visualiser!" },
  ];
}

export default function Home() {
    return (
        <Stack direction="row">
            <SideBar />
            <Stack
                direction="column"
                sx={{
                    flexGrow: 1,
                }}
            >
                <AppBar />
                <Dashboard
                    metrics={[
                        {
                            name: "Hours Worked",
                            unit: "hrs",
                            data: [
                                { recordedAt: "2023-01-01T00:00:00Z", value: 1 },
                                { recordedAt: "2023-01-02T00:00:00Z", value: 2 },
                                { recordedAt: "2023-01-03T00:00:00Z", value: 3 },
                                { recordedAt: "2023-01-04T00:00:00Z", value: 4 },
                                { recordedAt: "2023-01-05T00:00:00Z", value: 5 },
                            ],
                            description: "Total hours worked",
                        },
                        {
                            name: "Tasks Completed",
                            unit: "tasks",
                            data: [
                                { recordedAt: "2023-01-01T00:00:00Z", value: 1 },
                                { recordedAt: "2023-01-02T00:00:00Z", value: 2 },
                                { recordedAt: "2023-01-03T00:00:00Z", value: 3 },
                                { recordedAt: "2023-01-04T00:00:00Z", value: 4 },
                                { recordedAt: "2023-01-05T00:00:00Z", value: 5 },
                            ],
                            description: "Total tasks completed",
                        },
                    ]}
                />
            </Stack>
        </Stack>
    );
}