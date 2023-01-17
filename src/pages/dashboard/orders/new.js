import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, CardContent, Container, Grid, Link, Typography} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import {useEffect, useState} from 'react';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {OrderCreateForm} from '../../../components/dashboard/order/order-create-form';
import {OrderSummary} from '../../../components/dashboard/order/order-summary';
import {gtm} from '../../../lib/gtm';
import {baseThemeOptions} from '../../../theme/base-theme-options';

const OrderCreate = () => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [budget, setBudget] = useState(0);
  const [lastDateOrder, setLastDateOrder] = useState(null);
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const updateSummary = ({orderLines, budget, lastDateOrder}) => {
    if (orderLines) {
      const quantity = orderLines.reduce((acc, orderLine) => acc + orderLine.units, 0);
      setQuantity(quantity);

      const total = orderLines.reduce((acc, orderLine) => acc + orderLine.price * orderLine.units, 0);
      setTotal(total);
    }

    if (budget) {
      setBudget(budget);
      setLastDateOrder(lastDateOrder);
    }
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Nueva Venta
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md" sx={{ mx: { md: 0, lg: 8 } }}>
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
          <OrderCreateForm updateSummary={updateSummary} />
        </Container>
        <OrderSummary quantity={quantity} total={total} budget={budget} lastDateOrder={lastDateOrder} />
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
