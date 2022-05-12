import PropTypes from 'prop-types';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Divider, Typography, Button } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
import useToggle from '../../../../hooks/useToggle';
// _mock
import { _invoiceAddressFrom, _invoiceAddressTo } from '../../../../_mock';
// components
import Iconify from '../../../../components/Iconify';
//
import InvoiceAddressListDialog from './InvoiceAddressListDialog';
import InvoiceNewEditForm from "./index";
import {fDate} from "../../../../utils/formatTime";

// ----------------------------------------------------------------------
InvoiceNewEditAddress.propTypes = {
  userInfo: PropTypes.object,
  order: PropTypes.object,
};

export default function InvoiceNewEditAddress({userInfo,order}) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const upMd = useResponsive('up', 'md');

  const values = watch();

  const { toggle: openFrom, onOpen: onOpenFrom, onClose: onCloseFrom } = useToggle();

  const { toggle: openTo, onOpen: onOpenTo, onClose: onCloseTo } = useToggle();

  const { invoiceFrom, invoiceTo } = values;

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={<Divider flexItem orientation={upMd ? 'vertical' : 'horizontal'} sx={{ borderStyle: 'dashed' }} />}
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            体检人信息:
          </Typography>

          <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />} onClick={onOpenFrom}>
            修改
          </Button>

          <InvoiceAddressListDialog
            open={openFrom}
            onClose={onCloseFrom}
            selected={(selectedId) => invoiceFrom?.id === selectedId}
            onSelect={(address) => setValue('invoiceFrom', address)}
            addressOptions={_invoiceAddressFrom}
          />
        </Stack>

        <AddressInfo userInfo={userInfo} order={order}/>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

AddressInfo.propTypes = {
  userInfo: PropTypes.object,
  order: PropTypes.object,
};

function AddressInfo({userInfo,order}){
  return (
    <>
      <Typography variant="subtitle2">姓名：{userInfo.name}({userInfo.gender})</Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 0.5 }}>
        身份证号码：{userInfo.idCard}
      </Typography>
      <Typography variant="body2">联系方式: {userInfo.contact}</Typography>
      <Typography variant="body2">检查日期: {fDate(order.appoint)}</Typography>
    </>
  );
}