import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { BrowseLayout } from '../../../components/browse-layout';
import { MainLayout } from '../../../components/main-layout';
import { WidgetPreviewer } from '../../../components/widget-previewer';
import { QuickStats1 } from '../../../components/widgets/quick-stats/quick-stats-1';
import { StatusBeneficiary } from '../../../components/widgets/quick-stats/StatusBeneficiary';
import { QuickStats3 } from '../../../components/widgets/quick-stats/quick-stats-3';
import { QuickStats4 } from '../../../components/widgets/quick-stats/quick-stats-4';
import { QuickStats5 } from '../../../components/widgets/quick-stats/quick-stats-5';
import { QuickStats6 } from '../../../components/widgets/quick-stats/quick-stats-6';
import { QuickStats7 } from '../../../components/widgets/quick-stats/quick-stats-7';
import { QuickStats8 } from '../../../components/widgets/quick-stats/quick-stats-8';
import {StatusProducts} from '../../../components/widgets/quick-stats/StatusProducts';
import { gtm } from '../../../lib/gtm';
import {ParishOrdersWeek} from "../../../components/widgets/quick-stats/ParishOrdersWeek";

const BrowseQuickStats = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard: Cáritas
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.paper',
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <WidgetPreviewer
            element={<StatusBeneficiary />}
            name="Beneficiarios"
          />
          <WidgetPreviewer
            element={<StatusProducts />}
            name="Estado de la semana en curso"
          />
          <WidgetPreviewer
            element={<ParishOrdersWeek />}
            name="Ventas de la semana"
          />
          {/*<WidgetPreviewer
            element={<QuickStats3 />}
            name="Economia"
          />
          <WidgetPreviewer
            element={<QuickStats4 />}
            name="Stat card with multiple sections and chips"
          />
          <WidgetPreviewer
            element={<QuickStats5 />}
            name="Stat card with area charts"
          />
          <WidgetPreviewer
            element={<QuickStats6 />}
            name="Stat card with circular charts"
          />
          <WidgetPreviewer
            element={<QuickStats7 />}
            name="Progress bar card"
          />
          <WidgetPreviewer
            element={<QuickStats8 />}
            name="Card with line chart"
          />*/}
        </Container>
      </Box>
    </>
  );
};

BrowseQuickStats.getLayout = (page) => (
  <MainLayout>
    <BrowseLayout>
      {page}
    </BrowseLayout>
  </MainLayout>
);

export default BrowseQuickStats;
