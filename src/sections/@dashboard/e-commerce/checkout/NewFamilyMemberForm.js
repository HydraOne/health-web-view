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
import {useEffect, useState} from "react";
import { countries } from '../../../../_mock';
import { FormProvider, RHFCheckbox, RHFSelect, RHFTextField, RHFRadioGroup } from '../../../../components/hook-form';
import axios from "../../../../utils/axios";

// ----------------------------------------------------------------------

NewFamilyMemberForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
  familyMember: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default function NewFamilyMemberForm({ open, onClose, familyMember, onCreateBilling, isEdit}) {
  const NewAddressSchema = Yup.object().shape({
    account: Yup.string().required("请输入绑定的老年用户账号"),
    name: Yup.string().required('请输入姓名'),
    gender: Yup.string().required('请输入性别'),
    idCard: Yup.string().required('请输入身份证号码'),
    contact: Yup.string().required('请输入联系方式'),
    birth: Yup.date().required('请输入生日'),
  });

  const [accountIsError,setAccountIsError] = useState(false);

  const [appointData,setAppointData] = useState(endOfTomorrow);

  const defaultValues = {
    id: familyMember?.id||'',
    account: familyMember?.account||'',
    gender: familyMember?.gender||'男',
    name: familyMember?.name||'',
    contact: familyMember?.contact||'',
    idCard: familyMember?.idCard||'',
    birth: familyMember?.birth||new Date(),
    isDefault: true,
  };


  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isEdit && familyMember) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, familyMember]);

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const {id,account,gender,name,contact,idCard,birth}=data;
      console.log(data);
      const {data:{pid}} = await axios.get('/api/user/isExistUser',{params:{account}});
      if (!pid){
        setAccountIsError(true);
        return;
      }
      await axios.put('/api/userInfo/put',{id,pid,account,gender,name,contact,idCard,birth});
      onCreateBilling({
        name,
        contact,
        birth,
        gender,
        isDefault: data.isDefault,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
        <DialogTitle>添加家庭成员</DialogTitle>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack spacing={3}>
              <RHFTextField error={accountIsError} name="account" label="账号"/>

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
            </Stack>
          </DialogContent>

          <Divider />

          <DialogActions>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              添加被监管人信息
            </LoadingButton>
            <Button color="inherit" variant="outlined" onClick={onClose}>
              取消
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
  );
}
