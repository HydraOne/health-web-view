import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {Box, Tab, Card, Grid, Divider, Container, Typography, Skeleton, Stack} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProduct, addCart, onGotoStep } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Markdown from '../../components/Markdown';
import { SkeletonProduct } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  ProductDetailsSummary,
  ProductDetailsReview,
  ProductDetailsCarousel,
} from '../../sections/@dashboard/e-commerce/product-details';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import ProductDetailsSummaryNew from "../../sections/@dashboard/e-commerce/product-details/ProductDetailsSummaryNew";
import {getTypes} from "../../redux/slices/type";
import ProductDetailsContainInfo from "../../sections/@dashboard/e-commerce/product-details/ProductDetailsContainInfo";
import axios from "../../utils/axios";
import EcommerceYearlySales from "../../sections/@dashboard/general/e-commerce/EcommerceYearlySales";

// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'ic:round-verified',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'ic:round-verified-user',
  },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------

export default function TotalTrendProductDetails() {

  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const { id = '' } = useParams();
  const { product ,error, checkout } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const handleAddCart = (product) => {
    dispatch(addCart(product));
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };


  return (
    <Page title="Ecommerce: Product Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="检查项目详情"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            {
              name: 'Shop',
              href: PATH_DASHBOARD.eCommerce.shop,
            },
            { id: sentenceCase(id) },
          ]}
        />

        <CartWidget />

        {product && (
          <>

            <Card>
              <Stack spacing={3}>
                <EcommerceYearlySales id={id}/>
                <TabContext value={value}>
                  <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                    <TabList onChange={(e, value) => setValue(value)}>
                      <Tab disableRipple value="1" label="详情" />
                      <Tab
                          disableRipple
                          value="2"
                          label="评论"
                          sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                      />
                      <Tab
                          disableRipple
                          value="3"
                          label="检查项目"
                      />
                    </TabList>
                  </Box>

                  <Divider />

                  <TabPanel value="1">
                    <Box sx={{ p: 3 }}>
                      <Markdown children={product.description} />
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">
                    <ProductDetailsReview product={product} />
                  </TabPanel>
                  <TabPanel value="3">
                    <ProductDetailsContainInfo  product={product} />
                  </TabPanel>
                </TabContext>
              </Stack>
            </Card>
          </>
        )}

        {!product && <SkeletonProduct />}

        {error && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
    </Page>
  );
}