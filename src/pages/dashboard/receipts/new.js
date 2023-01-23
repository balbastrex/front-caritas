import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, Container, Link, Typography} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import {useEffect, useState} from 'react';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {ReceiptCreateForm} from '../../../components/dashboard/receipt/receipt-create-form';
import {ReceiptSummary} from '../../../components/dashboard/receipt/receipt-summary';
import {gtm} from '../../../lib/gtm';

const ReceiptCreate = () => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalReceipt, setTotalReceipt] = useState(0);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

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

  return (
    <>
      <Head>
        <title>
          Dashboard: Nuevo Albarán
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
          <ReceiptCreateForm updateSummary={updateSummary} />
        </Container>
      </Box>
      <ReceiptSummary quantity={quantity} total={total} totalReceipt={totalReceipt} />
    </>
  );
};

ReceiptCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default ReceiptCreate;
