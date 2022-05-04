import PropTypes from 'prop-types';
// @mui
import { Card, Button, Typography, CardHeader, CardContent } from '@mui/material';
// redux
import { useSelector } from '../../../../redux/store';
// components
import Iconify from '../../../../components/Iconify';
import {fDate} from "../../../../utils/formatTime";

// ----------------------------------------------------------------------

CheckoutBillingInfo.propTypes = {
  onBackStep: PropTypes.func,
};

export default function CheckoutBillingInfo({ onBackStep }) {
  const { checkout } = useSelector((state) => state.product);

  const { billing } = checkout;

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="体检人信息"
        action={
          <Button size="small" startIcon={<Iconify icon={'eva:edit-fill'} />} onClick={onBackStep}>
            Edit
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {billing?.name}&nbsp;
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            ({billing?.gender})
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
          {billing?.contact}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {fDate(billing?.birth)}
        </Typography>
      </CardContent>
    </Card>
  );
}
