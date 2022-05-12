import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import {useCallback, useState} from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {Box, Grid, Card, Stack, Typography, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import {endOfTomorrow} from "date-fns";
import DatePicker from "@mui/lab/DatePicker";
import useAuth from '../../../../hooks/useAuth';
// utils
import { fData } from '../../../../utils/formatNumber';
// _mock
import { countries } from '../../../../_mock';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import axios from "../../../../utils/axios";


const gender =[
  {
    name:"男",
    value:"M"
  },
  {
    name:"女",
    value:"F"
  }
]
// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();


  const [appointData,setAppointData] = useState(endOfTomorrow);

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || '',
    phoneNumber: user?.phoneNumber || '',
    country: user?.country || '',
    address: user?.address || '',
    state: user?.state || '',
    city: user?.city || '',
    birth: user?.birth || new Date(),
    zipCode: user?.zipCode || '',
    about: user?.about || '',
    isPublic: user?.isPublic || false,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {

        const forms = new FormData()
        const configs = {
          headers:{'Content-Type':'multipart/form-data'}
        };

        forms.append('file',file);
        forms.append('bucketName','demo');
        axios.post("/api/file/uploadAvatar",forms ,configs).then(res=>{
          console.log(res)
        });

        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  允许上传 *.jpeg, *.jpg, *.png, *.gif
                  <br /> 最大文件尺寸 {fData(3145728)}
                </Typography>
              }
            />

            <RHFSwitch name="isPublic" labelPlacement="start" label="公开信息" sx={{ mt: 5 }} />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="displayName" label="显示名" fullWidth/>
              <RHFTextField name="email" label="联系电子邮件" />

              <RHFTextField name="phoneNumber" label="电话号码" />
              <RHFTextField name="address" label="居住地" />

              <RHFSelect name="country" label="性别" placeholder="男">
                {gender.map((option) => (
                  <option key={option.value} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>

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
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="about" multiline rows={4} label="简介" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                保存
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
