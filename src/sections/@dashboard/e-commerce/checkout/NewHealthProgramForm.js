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

// ----------------------------------------------------------------------

NewHealthProgramForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

export default function NewHealthProgramForm({ open, onClose, onNextStep, onCreateBilling }) {
  const NewAddressSchema = Yup.object().shape({
    // user: Yup.string().required('请选择健康信息归属人'),
    details: Yup.string().required('请输入健康信息'),
  });


  const [executeTime,setExecuteTime] = useState(endOfTomorrow);

  const defaultValues = {
    user: '',
    details: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const {user,details,target}=data;
      const {id}=user;
      await axios.put("/api/healthProgram/add",{pid:id,details,target,executeTime});
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

              <AsyncSelectUser inputName={"user"} inputLabel={"用户"} control={control}/>

              <RHFTextField name="details" label="健康信息信息" multiline rows={5} />

              <RHFTextField name="target" label="备注" />

              <DatePicker
                  label="预约日期"
                  value={executeTime}
                  shouldDisableDate={isPast}
                  onChange={(date)=>setExecuteTime(date)}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          name="executeTime"
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
