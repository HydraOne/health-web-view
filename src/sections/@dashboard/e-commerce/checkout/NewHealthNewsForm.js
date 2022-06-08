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
import {
  FormProvider,
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
  RHFRadioGroup,
  RHFEditor
} from '../../../../components/hook-form';
import axios from "../../../../utils/axios";
import AsyncSelectUser from "./AsyncSelectUser";
import {fDate} from "../../../../utils/formatTime";

// ----------------------------------------------------------------------

NewHealthNewsForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  isEdit: PropTypes.bool,
  healthProgram: PropTypes.object
};

export default function NewHealthNewsForm({ open, onClose, isEdit, healthProgram }) {
  const NewAddressSchema = Yup.object().shape({
    // user: Yup.string().required('请选择健康信息归属人'),
    title: Yup.string().required('请输入健康信息'),
    content: Yup.string().required('请输入健康信息'),
  });


  const [executeTime,setExecuteTime] = useState(endOfTomorrow);

  const defaultValues = {
    id: healthProgram?.id,
    title: healthProgram?.title || '',
    content: healthProgram?.content || '',
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isEdit && healthProgram) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, healthProgram]);

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;

  useEffect(()=>{
    setExecuteTime(healthProgram?.executeTime||new Date())
  },[healthProgram])

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await axios.put("/api/healthNews/add",data);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
        <DialogTitle>添加健康信息</DialogTitle>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack spacing={3}>
              <RHFTextField name="id" style={{display: "none"}}/>

              <RHFTextField name="title" label="标题"/>

              <RHFEditor name="content" label="内容" />

            </Stack>
          </DialogContent>

          <Divider />

          <DialogActions>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              添加健康新闻
            </LoadingButton>
            <Button color="inherit" variant="outlined" onClick={onClose}>
              取消
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
  );
}
