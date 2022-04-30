import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {Stack, IconButton, InputAdornment, Alert, Button} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import {useNavigate} from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import {PATH_AUTH, PATH_PAGE} from "../../../routes/paths";


// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { sendEmailGetCaptchaCode }=useAuth();
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('姓是必须的'),
    lastName: Yup.string(),
    email: Yup.string().email('电子邮件必须是有效的电子邮件地址').required('电子邮件是必须的'),
    CaptchaCode:Yup.string(),
    password: Yup.string().required('密码是必须的'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    CaptchaCode:'',
    password: '',

  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(4546);
      navigate(PATH_AUTH.verify);
      // await register(data.email, data.password, data.firstName, data.lastName,data.CaptchaCode);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.msg });
      }
    }
  };

  const sendCaptchaCode = async () => {
   try {
     await sendEmailGetCaptchaCode(document.getElementsByName('email')[0].value);

   }catch (error){
     console.error(error);
     setError('afterSubmit', { ...error, message: error.msg });
   }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="姓" />
        </Stack>

        <Stack  direction="row" spacing={1}>
          <RHFTextField name="email" label="电子邮箱" />
        </Stack>

        <RHFTextField
          name="password"
          label="密码"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          注册
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
