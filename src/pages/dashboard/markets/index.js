import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import {MarketListFilters} from '../../../components/dashboard/market/market-list-filters';
import {useAuth} from '../../../hooks/use-auth';
import { useDispatch, useSelector } from '../../../store/index';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import {MarketListTable} from '../../../components/dashboard/market/market-list-table';
import { Plus as PlusIcon } from '../../../icons/plus';
import { gtm } from '../../../lib/gtm';
import {getMarkets} from '../../../slices/market';

const applyFilters = (products, filters) => products.filter((product) => {
  if (filters.name) {
    const nameMatched = product.name.toLowerCase().includes(filters.name.toLowerCase());

    if (!nameMatched) {
      return false;
    }
  }

  // It is possible to select multiple category options
  if (filters.category?.length > 0) {
    const categoryMatched = filters.category.includes(product.category);

    if (!categoryMatched) {
      return false;
    }
  }

  // It is possible to select multiple status options
  if (filters.status?.length > 0) {
    const statusMatched = filters.status.includes(product.status);

    if (!statusMatched) {
      return false;
    }
  }

  // Present only if filter required
  if (typeof filters.inStock !== 'undefined') {
    const stockMatched = product.inStock === filters.inStock;

    if (!stockMatched) {
      return false;
    }
  }

  return true;
});

const applyPagination = (products, page, rowsPerPage) => products.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

const MarketList = () => {
  const dispatch = useDispatch();
  const { marketList } = useSelector((state) => state.market);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [markets, setMarkets] = useState(marketList);
  const [openNew, setOpenNew] = useState(false);
  const [disableNewButton, setDisableNewButton] = useState(true);
  const { user: { profileId } } = useAuth();
  const [filters, setFilters] = useState({
    name: undefined,
    category: [],
    status: [],
    inStock: undefined
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  });

  useEffect(() => {
    setMarkets(marketList);
  }, [marketList]);

  useEffect(() => {
      dispatch(getMarkets());
      }, [dispatch]);

  useEffect(() => {
    setDisableNewButton(profileId !== 1)
  }, [profileId]);
  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleNewMarket = () => {
    const newMarket = {
      id: 0,
      name: 'Nuevo Economato',
      address: '',
      email: '',
      phone: '',
      distributionType: 'dias',
      expenses: 0,
      productPercentage: 0,
      budgetBase: 0,
      budgetAdult: 0,
      budgetChild: 0,
    }
    setMarkets([newMarket, ...markets]);
    setOpenNew(true);
    setDisableNewButton(true);
  }

  const handleCreatedMarket = (isCreated) => {
    setDisableNewButton(false);
    setOpenNew(false);
    if (!isCreated) {
      setMarkets(markets.filter((market) => market.id !== 0));
    }
  }

  // Usually query is done on backend with indexing solutions
  const filteredMarkets = applyFilters(markets, filters);
  const paginatedMarkets = applyPagination(filteredMarkets, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Listado Economatos
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
                  Economatos
                </Typography>
              </Grid>
              <Grid item>
                {/*<NextLink
                  href="/dashboard/markets/new"
                  passHref
                >*/}
                  <Button
                    disabled={disableNewButton}
                    component="a"
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                    onClick={handleNewMarket}
                  >
                    Nuevo
                  </Button>
                {/*</NextLink>*/}
              </Grid>
            </Grid>
          </Box>
          <Card>
            <MarketListFilters onChange={handleFiltersChange} />
            <MarketListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              markets={paginatedMarkets}
              marketsCount={filteredMarkets.length}
              rowsPerPage={rowsPerPage}
              openNewMarket={openNew}
              onCreatedNewMarket={handleCreatedMarket}

            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

MarketList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default MarketList;
