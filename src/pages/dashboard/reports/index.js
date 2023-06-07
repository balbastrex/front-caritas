import {Box, Container, Grid, Typography} from '@mui/material';
import Head from 'next/head';
import {useEffect, useState} from 'react';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {
  PeriodReportDialog
} from '../../../components/dashboard/report/period-report/period-report-dialog';
import {
  PeriodReportModal
} from '../../../components/dashboard/report/period-report/period-report-modal';
import {OrdersReportDialog} from '../../../components/dashboard/report/order-reports/orders-report-dialog';
import {OrdersReportModal} from '../../../components/dashboard/report/order-reports/orders-report-modal';
import {OrderSheetDialog} from '../../../components/dashboard/report/order-sheet/order-sheet-dialog';
import {ParishOrdersDialog} from '../../../components/dashboard/report/parish-orders/parish-orders-dialog';
import {ParishOrdersReportModal} from '../../../components/dashboard/report/parish-orders/parish-orders-report-modal';
import {ProductsReportDialog} from '../../../components/dashboard/report/products-report/products-report-dialog';
import {ProductsReportModal} from '../../../components/dashboard/report/products-report/products-report-modal';
import {ShowReportsCard} from '../../../components/dashboard/report/show-reports-card';
import {gtm} from '../../../lib/gtm';

const Overview = () => {
  const [orderSheetReportOpen, setOrderSheetReportOpen] = useState(false);
  const [orderSheetReportData, setOrderSheetReportData] = useState('UF1');
  const [parishOrdersListReportOpen, setParishOrdersListReportOpen] = useState(false);
  const [parishOrdersListModalOpen, setParishOrdersListModalOpen] = useState(false);
  const [parishOrdersListReportData, setParishOrdersListReportData] = useState({ startDate: null, endDate: null, parishId: null });
  const [ordersReportModalOpen, setOrdersReportModalOpen] = useState(false);
  const [ordersReportData, setOrdersReportData] = useState({ startDate: null, endDate: null, type: 'all' });
  const [ordersReportOpen, setOrdersReportOpen] = useState(false);
  const [productsReportModalOpen, setProductsReportModalOpen] = useState(false);
  const [productsReportData, setProductsReportData] = useState({ startDate: null, endDate: null, type: 'all' });
  const [productsReportOpen, setProductsReportOpen] = useState(false);
  const [periodReportModalOpen, setPeriodReportModalOpen] = useState(false);
  const [periodReportData, setperiodReportData] = useState({ startDate: null, endDate: null });
  const [periodReportOpen, setPeriodReportOpen] = useState(false);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleOnPrint = (reportId, data) => {

    switch (reportId) {
      case 'order-sheet':
        setOrderSheetReportData(data);
        setOrderSheetReportOpen(true);
        break;
    case 'parish-orders-list':
      setParishOrdersListModalOpen(true);
      break;
    case 'orders-reports':
      setOrdersReportModalOpen(true);
      break;
    case 'product-reports':
      setProductsReportModalOpen(true);
      break;
    case 'period-reports':
      setPeriodReportModalOpen(true);
      break;
    default:
      break;
    }
  }

  const handleParishOrdersListReport = ({ startDate, endDate, parishId, type }) => {
    setParishOrdersListReportData({ startDate, endDate, parishId, type });
    setParishOrdersListModalOpen(false);
    setParishOrdersListReportOpen(true);
  }

  const handleOrdersReport = ({ startDate, endDate, type }) => {
    setOrdersReportData({ startDate, endDate, type });
    setOrdersReportModalOpen(false);
    setOrdersReportOpen(true);
  }

  const handleProductsReport = ({ startDate, endDate, type, product }) => {
    setProductsReportData({ startDate, endDate, type, product });
    setProductsReportModalOpen(false);
    setProductsReportOpen(true);
  }

  const handlePeriodReport = ({ startDate, endDate }) => {
    setperiodReportData({ startDate, endDate });
    setPeriodReportModalOpen(false);
    setPeriodReportOpen(true);
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Informes
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  Informes
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid
            container
            spacing={4}
          >
            <ShowReportsCard onPrint={handleOnPrint} />
          </Grid>
        </Container>
      </Box>

      <OrderSheetDialog open={orderSheetReportOpen} close={() => setOrderSheetReportOpen(false)} UF={orderSheetReportData} />

      <ParishOrdersReportModal
        handleSelect={handleParishOrdersListReport}
        open={parishOrdersListModalOpen}
        handleClose={() => setParishOrdersListModalOpen(false)}
      />
      <ParishOrdersDialog open={parishOrdersListReportOpen} close={() => setParishOrdersListReportOpen(false)} data={parishOrdersListReportData} />

      <OrdersReportModal
        handleSelect={handleOrdersReport}
        open={ordersReportModalOpen}
        handleClose={() => setOrdersReportModalOpen(false)}
      />
      <OrdersReportDialog open={ordersReportOpen} close={() => setOrdersReportOpen(false)} data={ordersReportData} />

      <ProductsReportModal
        handleSelect={handleProductsReport}
        open={productsReportModalOpen}
        handleClose={() => setProductsReportModalOpen(false)}
      />
      <ProductsReportDialog open={productsReportOpen} close={() => setProductsReportOpen(false)} data={productsReportData} />

      <PeriodReportModal
        handleSelect={handlePeriodReport}
        open={periodReportModalOpen}
        handleClose={() => setPeriodReportModalOpen(false)}
      />
      <PeriodReportDialog open={periodReportOpen} close={() => setPeriodReportOpen(false)} data={periodReportData} />
    </>
  );
};

Overview.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Overview;
