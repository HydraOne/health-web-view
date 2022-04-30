import { paramCase } from 'change-case';
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
  Button,
  Tabs,
  Tab,
  Divider,
  TableContainer,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  Box,
  TablePagination,
  FormControlLabel, Switch, Hidden
} from '@mui/material';
// routes
import {List} from "immutable";
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
import {UserTableRow, UserTableToolbar} from "../user/list";
import Scrollbar from "../../../components/Scrollbar";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
  TableSkeleton
} from "../../../components/table";
import Iconify from "../../../components/Iconify";
import useTable, {emptyRows, getComparator} from "../../../hooks/useTable";
import useSettings from "../../../hooks/useSettings";
import {_userList} from "../../../_mock";
import useTabs from "../../../hooks/useTabs";
import {getProducts} from "../../../redux/slices/product";
import {dispatch, useSelector} from "../../../redux/store";
import {ProductTableRow} from "./product-list";

// ----------------------------------------------------------------------


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

const TYPE_VALUE = new Map([
  ["Added", 0],
  ["Group", 2],
  ["Plan", 3],
])

// const STATUS_OPTIONS = ['added', 'active', 'banned'];

const TYPE_OPTIONS = [
    {'label':'已添加','value':'Added'},
    {'label':'体检组','value':'Group'},
    {'label':'体检项','value':'Item'}
];

const ROLE_OPTIONS = [
  'added',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

const TABLE_HEAD = [
  { id: 'name', label: 'Product', alignRight: false },
  { id: 'type', label: 'type', alignRight: false },
  { id: 'createTime', label: 'Create at', alignRight: false },
  { id: 'inventoryType', label: 'Status', align: 'center'},
  { id: 'price', label: 'Price', align: 'center' },
  { id: '' },
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProductNewEditFormNew1.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ProductNewEditFormNew1({ isEdit, currentProduct }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);

  const { products, isLoading } = useSelector((state) => state.product);

  const [addedProducts, setAddedProducts] = useState(new Set());

  const [productImgs, setProductImgs] = useState(new Set());

  useEffect(() => {
    if (products.length) {
      setTableData(products);
    }
  }, [products]);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();


  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('added');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('Added');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleAddRows = (selected) => {
    selected.forEach((id)=>{
      addedProducts.add(id);
    });
    const addRows = new Set(addedProducts);
    setAddedProducts(addRows);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const handleSelectAllRows = () =>{

  }

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
    addedProducts
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
      (!dataFiltered.length && !!filterName) ||
      (!dataFiltered.length && !!filterRole) ||
      (!dataFiltered.length && !!filterStatus);

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
      id: currentProduct?.id || '',
      tags: currentProduct?.tags || [TAGS_OPTION[0]],
      inStock: true,
      taxes: true,
      type: currentProduct?.type || TYPE_OPTION[0],
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

  const onSubmit = async (data,added) => {
    try {
      const recordDescription = data.description;
      const {name,type,images,id} = data;
      const children = Array.from(added);
      const doc = new DOMParser().parseFromString(recordDescription,"text/html")
      const imgs = doc.getElementsByTagName("img");
      const blobs = [];
      const uploadImgElement = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < imgs.length; i++) {
        const encode = imgs[i].getAttribute("src");
        if (encode.length > 66) {
          uploadImgElement.push(imgs[i]);
          blobs.push(base64EncodeToBlob(encode));
        }
      }

      const forms = new FormData();
      const configs = {
        headers:{'Content-Type':'multipart/form-data'}
      };
      // append('files',blobs);
      blobs.forEach(blob=>forms.append('files',blob))
      forms.append('bucketName','demo');

      await axios.post("/api/file/uploadPictures",forms ,configs).then(res=>{
        const list=res.data.data;
        list.forEach((item)=>{
          // console.log(item);
          uploadImgElement.pop().setAttribute("src",item);
        })
      });

      // const images = description.get;
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const description = doc.documentElement.outerHTML;


      const checkEntity = {name,description,type,children,id};
      const dataForms = new FormData();
      dataForms.append("checkEntity",JSON.stringify(checkEntity));
      // dataForms.append("checkEntity",new Blob([JSON.stringify(checkEntity)], {type: "application/json"}));
      images.forEach(image =>dataForms.append('images',image));
      await axios.put("/api/check/put",dataForms,configs).then(res=>{
        // eslint-disable-next-line no-plusplus
        console.log(res);
      });


      // const checkEntity = {name,description,type,children};
      // await axios.put("/api/check/put",dataForms,configs).then(res=>{
      //   // eslint-disable-next-line no-plusplus
      //   console.log(res);
      // });
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
        <FormProvider methods={methods} onSubmit={handleSubmit((data)=>onSubmit(data,addedProducts,addedProducts))}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField name="name" label="Product Name" />



                  <div>
                    <LabelStyle>Description</LabelStyle>
                    <RHFEditor name="description" />
                  </div>

                  <div hidden>
                    <RHFTextField name="id" />
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

            <Grid item xs={12} >
              <Card>
                <Tabs
                    allowScrollButtonsMobile
                    variant="scrollable"
                    scrollButtons="auto"
                    value={filterStatus}
                    onChange={(event,currentTab)=>{
                      onChangeFilterStatus(event,currentTab);
                      onSelectAllRows(false);
                    }}
                    sx={{ px: 2, bgcolor: 'background.neutral' }}
                >
                  {TYPE_OPTIONS.map((tab) => (
                      <Tab disableRipple key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </Tabs>

                <Divider />

                <UserTableToolbar
                    filterName={filterName}
                    filterRole={filterRole}
                    onFilterName={handleFilterName}
                    onFilterRole={handleFilterRole}
                    optionsRole={ROLE_OPTIONS}
                />

                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                    {selected.length > 0 && (
                      <TableSelectedActions
                        dense={dense}
                        numSelected={selected.length}
                        rowCount={dataFiltered.length}
                        onSelectAllRows={(checked) =>
                          onSelectAllRows(
                              checked,
                              dataFiltered.map((row) => row.id)
                          )
                        }
                        actions={
                          <Tooltip title="Add">
                            <IconButton color="primary" onClick={(checked) => {
                              handleAddRows(selected);
                              onSelectAllRows(!checked)}}
                            >
                              <Iconify icon={'eva:file-add-outline'} />
                            </IconButton>
                          </Tooltip>
                        }
                      />
                    )}

                    <Table size={dense ? 'small' : 'medium'}>
                      <TableHeadCustom
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={dataFiltered.length}
                        numSelected={selected.length}
                        onSort={onSort}
                        onSelectAllRows={(checked) =>
                          onSelectAllRows(
                            checked,
                            dataFiltered.map((row) => row.id)
                          )
                        }
                      />

                      <TableBody>
                        {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) =>
                            row ? (
                              <ProductTableRow
                                  key={row.id}
                                  row={row}
                                  selected={selected.includes(row.id)}
                                  onSelectRow={() => onSelectRow(row.id)}
                                  onDeleteRow={() => handleDeleteRow(row.id)}
                                  onEditRow={() => handleEditRow(row.name)}
                              />
                            ) : (
                              !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                            )
                          )}

                        <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                        <TableNoData isNotFound={isNotFound} />
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
              </Card>
            </Grid>
          </Grid>

          <ShopProductPreview
              values={values}
              isOpen={open}
              isValid={isValid}
              isSubmitting={isSubmitting}
              onClose={handleClosePreview}
              onSubmit={handleSubmit((data)=>onSubmit(data,addedProducts))}
          />
        </FormProvider>


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


function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole , addedProducts}) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  if (filterStatus !== 'Added') {
    tableData = tableData.filter((item) => (item.type === filterStatus) && !addedProducts.has(item.id));
  }else {
    tableData = tableData.filter((item) => addedProducts.has(item.id));
  }

  if (filterRole !== 'added') {
    tableData = tableData.filter((item) => item.role === filterRole);
  }

  return tableData;
}