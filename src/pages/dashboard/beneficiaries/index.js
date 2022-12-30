import {Box, Button, Card, Container, Grid, Typography} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import {useEffect, useState} from 'react';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {BeneficiaryListTable} from '../../../components/dashboard/beneficiary/beneficiary-list-table';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {MarketListFilters} from '../../../components/dashboard/market/market-list-filters';
import {useAuth} from '../../../hooks/use-auth';
import {Plus as PlusIcon} from '../../../icons/plus';
import {gtm} from '../../../lib/gtm';
import {getBeneficiaries} from '../../../slices/beneficiary';
import {useDispatch, useSelector} from '../../../store/index';
import {UserProfiles} from '../../../utils/constants';

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

const BeneficiariesList = () => {
  const dispatch = useDispatch();
  const { beneficiaryList } = useSelector((state) => state.beneficiary);
  const [beneficiaries, setBeneficiaries] = useState(beneficiaryList);
  const [disableNewButton, setDisableNewButton] = useState(true);
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
      dispatch(getBeneficiaries());
      }, [dispatch]);

  useEffect(() => {
    setBeneficiaries(beneficiaryList);
  }, [beneficiaryList]);

  useEffect(() => {
    setDisableNewButton(user?.profileId !== UserProfiles.GESTOR_PARROQUIA);
  }, [user]);

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredBeneficiaries = applyFilters(beneficiaries, filters);
  const paginatedBeneficiaries = applyPagination(filteredBeneficiaries, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Listado Beneficiarios
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
                  Beneficiarios
                </Typography>
              </Grid>
              <Grid item>
                <NextLink
                  href="/dashboard/beneficiaries/new"
                  passHref
                >
                  <Button
                    disabled={disableNewButton}
                    component="a"
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Nuevo
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <MarketListFilters onChange={handleFiltersChange} />
            <BeneficiaryListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              beneficiaries={paginatedBeneficiaries}
              beneficiariesCount={filteredBeneficiaries.length}
              rowsPerPage={rowsPerPage}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

BeneficiariesList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default BeneficiariesList;
