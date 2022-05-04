import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import {useEffect, useState} from "react";
import {endOfTomorrow, isPast} from "date-fns";
// @mui
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Stack,
  Button,
  Rating,
  Divider,
  IconButton,
  Typography,
  TextField,
  Autocomplete, Chip
} from '@mui/material';
// routes
import DatePicker from "@mui/lab/DatePicker";
import {useDispatch, useSelector} from "react-redux";
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import SocialsButton from '../../../../components/SocialsButton';
import { ColorSinglePicker } from '../../../../components/color-utils';
import { FormProvider, RHFSelect } from '../../../../components/hook-form';
import {getTypes} from "../../../../redux/slices/type";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

const INPUT_WIDTH = 160;

// ----------------------------------------------------------------------

ProductDetailsSummaryNew.propTypes = {
  cart: PropTypes.array,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.shape({
    available: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
    cover: PropTypes.string,
    id: PropTypes.string,
    inventoryType: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
    sizes: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    totalRating: PropTypes.number,
    totalReview: PropTypes.number,
  }),
};

export default function ProductDetailsSummaryNew({ cart, product, onAddCart, onGotoStep, ...other }) {
  const theme = useTheme();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { types } = useSelector((state) => state.type);

  const [appointData,setAppointData] = useState(endOfTomorrow);

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const {
    id,
    name,
    sizes,
    price,
    images,
    status,
    colors,
    available,
    priceSale,
    summary,
    tags,
    inventoryType,
  } = product;

  const containTags = new Set(tags);

  const {
    totalRating,
    totalReview,
  } = summary;

  const alreadyProduct = cart.map((item) => item.id).includes(id);

  const isMaxQuantity = cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;

  const defaultValues = {
    id,
    name,
    cover:images[0],
    available,
    price,
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      if (!alreadyProduct) {
        onAddCart({
          ...data,
          subtotal: data.price * data.quantity,
        });
      }
      onGotoStep(0);
      navigate(PATH_DASHBOARD.eCommerce.checkout);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCart = async () => {
    try {
      onAddCart({
        ...values,
        subtotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyle {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={inventoryType === 'in_stock' ? 'success' : 'error'}
          sx={{ textTransform: 'uppercase' }}
        >
          {sentenceCase(inventoryType || '')}
        </Label>

        <Typography
          variant="overline"
          sx={{
            mt: 2,
            mb: 1,
            display: 'block',
            color: status === 'sale' ? 'error.main' : 'info.main',
          }}
        >
          {status}
        </Typography>

        <Typography variant="h5" paragraph>
          {name}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Rating value={totalRating} precision={0.1} readOnly />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ({fShortenNumber(totalReview)}
            reviews)
          </Typography>
        </Stack>


        <Typography variant="h4" sx={{ mb: 3 }}>
          <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
            市场价: {price && fCurrency(price)}
          </Box>
          <br/>预约价: {fCurrency(priceSale)}
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between"  sx={{ my: 3 }}>
          <DatePicker
              label="预约日期"
              value={appointData}
              shouldDisableDate={isPast}
              onChange={(date)=>setAppointData(date)}
              renderInput={(params) => (
                  <TextField
                      {...params}
                      name="appoint"
                      fullWidth
                  />
              )}
          />
        </Stack>


        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3}} >
          <Autocomplete
              fullWidth
              multiple
              freeSolo
              readOnly
              id="tags-standard"
              options={types}
              getOptionLabel={(option) => option.name}
              defaultValue={types.filter(type => containTags.has(type.id))}
              renderInput={(params) => (
                  <TextField
                      {...params}
                      disabled
                      label="检查类型"
                  />
              )}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <div>
            <Typography variant="subtitle1" component="div" sx={{ mt: 1, textAlign: 'right'}}>
              可预约数:  {available}
            </Typography>
          </div>
        </Stack>




        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          <Button
            fullWidth
            disabled={isMaxQuantity}
            size="large"
            color="warning"
            variant="contained"
            startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
            onClick={handleAddCart}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add to Cart
          </Button>

          <Button fullWidth size="large" type="submit" variant="contained">
            Buy Now
          </Button>
        </Stack>

        <Stack alignItems="center" sx={{ mt: 3 }}>
          <SocialsButton initialColor />
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrementQuantity: PropTypes.func,
  onDecrementQuantity: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity }) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={quantity <= 1} onClick={onDecrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}
