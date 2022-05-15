import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {Grid, Button, TextField, Card, CardContent} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import {endOfTomorrow, isPast} from "date-fns";
import DatePicker from "@mui/lab/DatePicker";
import {useState} from "react";
import { useDispatch, useSelector } from '../../../../redux/store';
import { onGotoStep, onBackStep, onNextStep, applyShipping } from '../../../../redux/slices/product';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider } from '../../../../components/hook-form';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import axios from "../../../../utils/axios";

// ----------------------------------------------------------------------

const DELIVERY_OPTIONS = [
  {
    value: 0,
    title: 'Standard delivery (Free)',
    description: 'Delivered on Monday, August 12',
  },
  {
    value: 2,
    title: 'Fast delivery ($2,00)',
    description: 'Delivered on Monday, August 5',
  },
];

const PAYMENT_OPTIONS = [
  {
    value: 'paypal',
    title: 'Paypal支付',
    description: '您将被重定向到PayPal网站以安全地完成购买。',
    icons: ['https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg'],
  },
  {
    value: 'credit_card',
    title: '信用卡支付',
    description: '我们支持Mastercard、Visa、Discover和Stripe。',
    icons: [
      'https://minimal-assets-api.vercel.app/assets/icons/ic_mastercard.svg',
      'https://minimal-assets-api.vercel.app/assets/icons/ic_visa.svg',
    ],
  },
  {
    value: 'cash',
    title: '现金支付',
    description: '线下体检时前往指定地点支付。',
    icons: [],
  },
];

const CARDS_OPTIONS = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
];

export default function CheckoutPayment() {
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);

  const [appointData,setAppointData] = useState(endOfTomorrow);

  const { total, discount, subtotal, shipping } = checkout;

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  const handleApplyShipping = (value) => {
    dispatch(applyShipping(value));
  };

  const PaymentSchema = Yup.object().shape({
    payment: Yup.string().required('请选择支付方式!'),
    appoint: Yup.date().required('请选择预约日期!'),
  });

  const defaultValues = {
    delivery: shipping,
    payment: '',
    appoint: appointData
  };

  const methods = useForm({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const {billing : {id}} = checkout;
      const {cart} = checkout;
      const orderList = cart.map(item=>item.id);
      const order = {userId:id,amount:total,orderList,appoint:appointData};
      axios.put("/api/order/put",order);
      handleNextStep();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <CheckoutPaymentMethods cardOptions={CARDS_OPTIONS} paymentOptions={PAYMENT_OPTIONS} />
          <Button
            size="small"
            color="inherit"
            onClick={handleBackStep}
            startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
          >
            返回
          </Button>
        </Grid>



        <Grid item xs={12} md={4}>
          <CheckoutBillingInfo onBackStep={handleBackStep} />
          <CheckoutSummary
            enableEdit
            total={total}
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            onEdit={() => handleGotoStep(0)}
          />
          <Card sx={{ mb: 4 }}>
            <CardContent>
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
            </CardContent>
          </Card>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            完成支付
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
