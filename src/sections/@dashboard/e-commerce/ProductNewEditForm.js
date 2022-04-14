import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import {useCallback, useEffect, useMemo, useState} from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  MenuItem,
  Button
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../../components/hook-form';
import axios from "../../../utils/axios";
import RHFSelectNew from "../../../components/hook-form/RHFSelectNew";
import {ShopProductPreview} from "./shop";

// ----------------------------------------------------------------------

const GENDER_OPTION = ['Men', 'Women', 'Kids'];

// const CATEGORY_OPTION = [
//   { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
//   { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
//   { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
// ];

const TYPE_OPTION = [
    "Item","Group","Plan"
];

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProductNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ProductNewEditForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'Images is required'),
    price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images || [],
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || [TAGS_OPTION[0]],
      inStock: true,
      taxes: true,
      type: currentProduct?.type || TYPE_OPTION[0],
      gender: currentProduct?.gender || GENDER_OPTION[2],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting ,isValid},
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async (data) => {
    try {
      const recordDescription = data.description;
      const {name,type} = data;
      const doc = new DOMParser().parseFromString(recordDescription,"text/html")
      const imgs = doc.getElementsByTagName("img");
      const blobs = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < imgs.length; i++) {
        const encode = imgs[i].getAttribute("src");
        blobs.push(base64EncodeToBlob(encode));
      }

      const forms = new FormData();
      const configs = {
        headers:{'Content-Type':'multipart/form-data'}
      };
      // append('files',blobs);
      blobs.forEach(blob=>forms.append('files',blob))
      forms.append('bucketName','demo');

      await axios.post("/api/file/uploadPictures",forms ,configs).then(res=>{
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].setAttribute("src",res.data.data[i]);
        }
        const flag = false;
      });

      // const images = description.get;
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const description = doc.documentElement.outerHTML;
      const checkEntity = {name,description,type};
      await axios.put("/api/check/put",checkEntity).then(res=>{
        // eslint-disable-next-line no-plusplus
        console.log(res);
      });
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.eCommerce.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  return (
      <>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField name="name" label="Product Name" />


                  <div>
                    <LabelStyle>Description</LabelStyle>
                    <RHFEditor name="description" />
                  </div>

                  <div>
                    <LabelStyle>Images</LabelStyle>
                    <RHFUploadMultiFile
                        name="images"
                        showPreview
                        accept="image/*"
                        maxSize={3145728}
                        onDrop={handleDrop}
                        onRemove={handleRemove}
                        onRemoveAll={handleRemoveAll}
                    />
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                  <RHFSwitch name="inStock" label="In stock" />

                  <Stack spacing={3} mt={2}>
                    <RHFTextField name="code" label="Product Code" />
                    <RHFTextField name="sku" label="Product SKU" />

                    <div>
                      <LabelStyle>Gender</LabelStyle>
                      <RHFRadioGroup
                          name="gender"
                          options={GENDER_OPTION}
                          sx={{
                            '& .MuiFormControlLabel-root': { mr: 4 },
                          }}
                      />
                    </div>

                    <RHFSelectNew name={'type'} label={'Type'} options={TYPE_OPTION}/>

                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                multiple
                                freeSolo
                                onChange={(event, newValue) => field.onChange(newValue)}
                                options={TAGS_OPTION.map((option) => option)}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                                    ))
                                }
                                renderInput={(params) => <TextField label="Tags" {...params} />}
                            />
                        )}
                    />
                  </Stack>
                </Card>

                <Card sx={{ p: 3 }}>
                  <Stack spacing={3} mb={2}>
                    <RHFTextField
                        name="price"
                        label="Regular Price"
                        placeholder="0.00"
                        value={getValues('price') === 0 ? '' : getValues('price')}
                        onChange={(event) => setValue('price', Number(event.target.value))}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          type: 'number',
                        }}
                    />

                    <RHFTextField
                        name="priceSale"
                        label="Sale Price"
                        placeholder="0.00"
                        value={getValues('priceSale') === 0 ? '' : getValues('priceSale')}
                        onChange={(event) => setValue('price', Number(event.target.value))}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          type: 'number',
                        }}
                    />
                  </Stack>

                  <RHFSwitch name="taxes" label="Price includes taxes" />
                </Card>
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}>
                  Preview
                </Button>
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? 'Create Product' : 'Save Changes'}
                </LoadingButton>
                <div/>
              </Stack>
            </Grid>
          </Grid>
        </FormProvider>

        <ShopProductPreview
            values={values}
            isOpen={open}
            isValid={isValid}
            isSubmitting={isSubmitting}
            onClose={handleClosePreview}
            onSubmit={handleSubmit(onSubmit)}
        />
      </>
  );
}


function base64EncodeToBlob(encode){ // 生成Blob
  const arr = encode.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}