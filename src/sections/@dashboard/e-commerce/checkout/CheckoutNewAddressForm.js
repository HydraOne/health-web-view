import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {Box, Stack, Dialog, Button, Divider, DialogTitle, DialogContent, DialogActions, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// _mock
import DatePicker from "@mui/lab/DatePicker";
import {endOfTomorrow, isPast} from "date-fns";
import {useState} from "react";
import { countries } from '../../../../_mock';
import { FormProvider, RHFCheckbox, RHFSelect, RHFTextField, RHFRadioGroup } from '../../../../components/hook-form';
import axios from "../../../../utils/axios";

// ----------------------------------------------------------------------

CheckoutNewAddressForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

export default function CheckoutNewAddressForm({ open, onClose, onNextStep, onCreateBilling }) {
  const NewAddressSchema = Yup.object().shape({
    name: Yup.string().required('请输入姓名'),
    gender: Yup.string().required('请输入性别'),
    idCard: Yup.string().required('请输入身份证号码'),
    contact: Yup.string().required('请输入联系方式'),
    birth: Yup.date().required('请输入生日'),
  });


  const [appointData,setAppointData] = useState(endOfTomorrow);

  const defaultValues = {
    gender: '男',
    name: '',
    contact: '',
    idCard: '',
    birth: new Date(),
    isDefault: true,
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const {gender,name,contact,idCard,birth}=data;
      await axios.put('/api/userInfo/put',{gender,name,contact,idCard,birth});
      onNextStep();
      onCreateBilling({
        name,
        contact,
        birth,
        gender,
        isDefault: data.isDefault,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
        <DialogTitle>Add new address</DialogTitle>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack spacing={3}>
              <RHFRadioGroup name="gender" options={['男', '女']} />

              <Box
                  sx={{
                    display: 'grid',
                    rowGap: 3,
                    columnGap: 2,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  }}
              >
                <RHFTextField name="name" label="姓名" />
                <RHFTextField name="contact" label="手机号码" />
              </Box>

              <RHFTextField name="idCard" label="身份证号码" />

              <DatePicker
                  label="出生日期"
                  value={appointData}
                  onChange={(date)=>setAppointData(date)}
                  renderInput={(params) => (
                      <TextField
                          name="birth"
                          {...params}
                          fullWidth
                      />
                  )}
              />


              <RHFCheckbox name="isDefault" label="作为默认健康监管人" sx={{ mt: 3 }} />
            </Stack>
          </DialogContent>

          <Divider />

          <DialogActions>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              添加健康监管人
            </LoadingButton>
            <Button color="inherit" variant="outlined" onClick={onClose}>
              取消
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
  );
}
