import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, Container, Link, Typography} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {AuthGuard} from '../../../../components/authentication/auth-guard';
import {DashboardLayout} from '../../../../components/dashboard/dashboard-layout';
import {OrderCreateForm} from '../../../../components/dashboard/order/order-create-form';
import {gtm} from '../../../../lib/gtm';
import {getOrderById} from '../../../../slices/order';
import {useDispatch, useSelector} from '../../../../store';

const OrderCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { orderId } = router.query
  const { order } = useSelector((state) => state.order);
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>
          Dashboard: Editar Venta
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink
              href="/dashboard/orders"
              passHref
            >
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <ArrowBackIcon
                  fontSize="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="subtitle2">
                  Ventas
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <OrderCreateForm order={order} isEdit={true} />
        </Container>
      </Box>
    </>
  );
};

OrderCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default OrderCreate;
