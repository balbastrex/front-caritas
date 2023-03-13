import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, Container, Link, Typography} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {AuthGuard} from '../../../../components/authentication/auth-guard';
import {DashboardLayout} from '../../../../components/dashboard/dashboard-layout';
import {ReceiptCreateForm} from '../../../../components/dashboard/receipt/receipt-create-form';
import {ReceiptSummary} from '../../../../components/dashboard/receipt/receipt-summary';
import {gtm} from '../../../../lib/gtm';
import {getReceiptById} from '../../../../slices/receipt';
import {useDispatch, useSelector} from '../../../../store';

const OrderCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { receiptId } = router.query
  const { receipt } = useSelector((state) => state.receipt);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalReceipt, setTotalReceipt] = useState(0);
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    dispatch(getReceiptById(receiptId));
  }, [dispatch]);

  useEffect(() => {
    if (receipt) {
      const quantity = receipt.receiptLines.length;
      setQuantity(quantity);

      const total = receipt.receiptLines.reduce((acc, receiptLine) => acc + receiptLine.totalCost, 0);
      setTotal(total);

      setTotalReceipt(receipt.amount);
    }
  }, [receipt]);

  const updateSummary = ({receiptLines, totalReceipt}) => {
    if (receiptLines) {
      const quantity = receiptLines.length;
      setQuantity(quantity);

      const total = receiptLines.reduce((acc, receiptLine) => acc + receiptLine.totalCost, 0);
      setTotal(total);
    }

    if (totalReceipt) {
      setTotalReceipt(totalReceipt);
    }
  }

  return <>
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
          <NextLink href="/dashboard/receipts" passHref legacyBehavior>
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
        <ReceiptCreateForm receipt={receipt} isEdit={true} updateSummary={updateSummary} />
      </Container>
    </Box>
    <ReceiptSummary quantity={quantity} total={total} totalReceipt={totalReceipt} />
  </>;
};

OrderCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default OrderCreate;
