import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function ProgressVisualiserDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            defaultValue={dayjs()}
            slotProps={{
                textField: {
                    size: 'small'
                }
            }}
        />
    </LocalizationProvider>
  );
}