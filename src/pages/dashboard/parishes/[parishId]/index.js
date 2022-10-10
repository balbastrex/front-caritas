import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import {MarketBasicDetails} from '../../../../components/dashboard/market/market-basic-details';
import {MarketParish} from '../../../../components/dashboard/market/market-parish';
import {MarketProduct} from '../../../../components/dashboard/market/market-product';
import {ParishBasicDetails} from '../../../../components/dashboard/parish/parish-basic-details';
import {ParishBeneficiaries} from '../../../../components/dashboard/parish/parish-beneficiaries';
import { gtm } from '../../../../lib/gtm';
import {getParishById} from '../../../../slices/parish';
import {useDispatch, useSelector} from '../../../../store';
import { getInitials } from '../../../../utils/get-initials';

const tabs = [
  { label: 'Detalles Parroquia', value: 'details' },
  { label: 'Beneficiarios', value: 'beneficiaries' }
];

const MarketDetails = () => {
  const dispatch = useDispatch();
  const { parish } = useSelector((state) => state.parish);
  const [currentTab, setCurrentTab] = useState('details');
  const router = useRouter()
  const { parishId } = router.query

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    dispatch(getParishById(parishId));
  }, [dispatch]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!parish) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Parroquia: {parish.name}
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
          <div>
            <Box sx={{ mb: 4 }}>
              <NextLink
                href="/dashboard/parishes"
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
                    Parroquias
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden'
                }}
              >
                <Avatar
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64
                  }}
                >
                  {getInitials(parish.name)}
                </Avatar>
                <div>
                  <Typography variant="h4">
                    {parish.name}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="subtitle2">
                      id:
                    </Typography>
                    <Chip
                      label={parish.id}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </div>
              </Grid>
            </Grid>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </div>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'details' && <ParishBasicDetails parish={parish}/>}
            {currentTab === 'beneficiaries' && <ParishBeneficiaries parish={parish} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

MarketDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default MarketDetails;

