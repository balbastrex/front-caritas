import {Box, Container, Grid, Typography} from '@mui/material';
import Head from 'next/head';
import {useEffect, useState} from 'react';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {OrderSheetDialog} from '../../../components/dashboard/report/order-sheet/order-sheet-dialog';
import {ParishOrdersDialog} from '../../../components/dashboard/report/parish-orders/parish-orders-dialog';
import {ParishOrdersReportModal} from '../../../components/dashboard/report/parish-orders/parish-orders-report-modal';
import {ShowReportsCard} from '../../../components/dashboard/report/show-reports-card';
import {gtm} from '../../../lib/gtm';

const Overview = () => {
  const [orderSheetReportOpen, setOrderSheetReportOpen] = useState(false);
  const [orderSheetReportData, setOrderSheetReportData] = useState('UF1');
  const [parishOrdersListReportOpen, setParishOrdersListReportOpen] = useState(false);
  const [parishOrdersListModalOpen, setParishOrdersListModalOpen] = useState(false);
  const [parishOrdersListReportData, setParishOrdersListReportData] = useState({ startDate: null, endDate: null, parishId: null });

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
      default:
        break;
    }
  }

  const handleParishOrdersListReport = ({ startDate, endDate, parishId }) => {
    setParishOrdersListReportData({ startDate, endDate, parishId });
    setParishOrdersListModalOpen(false);
    setParishOrdersListReportOpen(true);

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
