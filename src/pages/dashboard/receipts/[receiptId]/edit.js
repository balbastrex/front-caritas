import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, Container, Link, Typography} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {AuthGuard} from '../../../../components/authentication/auth-guard';
import {DashboardLayout} from '../../../../components/dashboard/dashboard-layout';
import {OrderCreateForm} from '../../../../components/dashboard/order/order-create-form';
import {ReceiptCreateForm} from '../../../../components/dashboard/receipt/receipt-create-form';
import {gtm} from '../../../../lib/gtm';
import {getOrderById} from '../../../../slices/order';
import {getReceiptById} from '../../../../slices/receipt';
import {useDispatch, useSelector} from '../../../../store';

const OrderCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { receiptId } = router.query
  const { receipt } = useSelector((state) => state.receipt);
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    dispatch(getReceiptById(receiptId));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>
          Dashboard: Editar Albarán
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
              href="/dashboard/receipts"
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
                  Albaranes
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <ReceiptCreateForm receipt={receipt} isEdit={true} />
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
