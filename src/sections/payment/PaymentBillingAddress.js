// @mui
import { Typography, TextField, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function PaymentBillingAddress() {
  return (
    <div>
      <Typography variant="subtitle1">Billing Address</Typography>

      <Stack spacing={3} mt={5}>
        <TextField fullWidth label="name" />
        <TextField fullWidth label="contact" />
        <TextField fullWidth label="birth" />
        <TextField fullWidth label="gender" />
      </Stack>
    </div>
  );
}
