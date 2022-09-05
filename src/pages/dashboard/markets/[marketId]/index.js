import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Button,
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
import { CustomerLogs } from '../../../../components/dashboard/customer/customer-logs';
import {MarketBasicDetails} from '../../../../components/dashboard/market/market-basic-details';
import {MarketParish} from '../../../../components/dashboard/market/market-parish';
import {MarketProduct} from '../../../../components/dashboard/market/market-product';
import { ChevronDown as ChevronDownIcon } from '../../../../icons/chevron-down';
import { PencilAlt as PencilAltIcon } from '../../../../icons/pencil-alt';
import { gtm } from '../../../../lib/gtm';
import { getMarketById } from '../../../../slices/market';
import {useDispatch, useSelector} from '../../../../store';
import { getInitials } from '../../../../utils/get-initials';

const tabs = [
  { label: 'Detalles Economato', value: 'details' },
  { label: 'Parroquias', value: 'parish' },
  { label: 'Inventario', value: 'inventory' }
];

const MarketDetails = () => {
  const dispatch = useDispatch();
  const { market } = useSelector((state) => state.market);
  const [currentTab, setCurrentTab] = useState('details');
  const router = useRouter()
  const { marketId } = router.query

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    dispatch(getMarketById(marketId));
  }, [dispatch]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!market) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Economato xxx
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
                href="/dashboard/markets"
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
                    Economatos
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
                  {getInitials(market.name)}
                </Avatar>
                <div>
                  <Typography variant="h4">
                    {market.name}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="subtitle2">
                      market_id:
                    </Typography>
                    <Chip
                      label={market.id}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </div>
              </Grid>
              <Grid
                item
                sx={{ m: -1 }}
              >
                <NextLink
                  href="/dashboard/customers/1/edit"
                  passHref
                >
                  <Button
                    component="a"
                    endIcon={(
                      <PencilAltIcon fontSize="small" />
                    )}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </NextLink>
                <Button
                  endIcon={(
                    <ChevronDownIcon fontSize="small" />
                  )}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Actions
                </Button>
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
            {currentTab === 'details' && <MarketBasicDetails market={market}/>}
            {currentTab === 'parish' && <MarketParish market={market} />}
            {currentTab === 'inventory' && <MarketProduct market={market} />}
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

