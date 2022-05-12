// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material';
// utils
import PropTypes from "prop-types";
import { fNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  'full stack development',
  'backend development',
  'ui design',
  'ui/ux design',
  'front end development',
];


InvoiceNewEditDetails.propTypes = {
  checks: PropTypes.array,
}

export default function InvoiceNewEditDetails({checks}) {
  const { control, setValue, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const handleAdd = () => {
    append({
      title: '',
      description: '',
      service: '',
      quantity: '',
      price: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
          体检信息明细:
        </Typography>

        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          {fields.map((item, index) => (
              <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                  <RHFTextField
                      size="small"
                      name={`items[${index}].name`}
                      label="科目"
                      disabled
                      InputLabelProps={{ shrink: true }}
                  />

                  <RHFTextField
                      size="small"
                      name={`items[${index}].content`}
                      label="信息"
                      InputLabelProps={{ shrink: true }}
                  />

                  <RHFTextField
                      size="small"
                      name={`items[${index}].info`}
                      label="备注"
                      InputLabelProps={{ shrink: true }}
                  />


                </Stack>

                <Button
                    size="small"
                    color="error"
                    startIcon={<Iconify icon="eva:trash-2-outline" />}
                    onClick={() => handleRemove(index)}
                >
                  移除
                </Button>
              </Stack>
          ))}
        </Stack>

        <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

        <Stack
            spacing={2}
            direction={{ xs: 'column-reverse', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAdd} sx={{ flexShrink: 0 }}>
            Add new detail
          </Button>

          <Stack spacing={2} justifyContent="flex-end" direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
            <RHFTextField
                size="small"
                label="Discount"
                name="discount"
                onChange={(event) => setValue('discount', Number(event.target.value))}
                sx={{ maxWidth: { md: 200 } }}
            />

            <RHFTextField
                size="small"
                label="Taxes"
                name="taxes"
                onChange={(event) => setValue('taxes', Number(event.target.value))}
                sx={{ maxWidth: { md: 200 } }}
            />
          </Stack>
        </Stack>
      </Box>
  );
}
