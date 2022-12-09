import {Box, Button, Card, Container, Grid, Typography} from '@mui/material';
import Head from 'next/head';
import {useEffect, useState} from 'react';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {ParishListFilters} from '../../../components/dashboard/parish/parish-list-filters';
import {ParishListTable} from '../../../components/dashboard/parish/parish-list-table';
import {useAuth} from '../../../hooks/use-auth';
import {Plus as PlusIcon} from '../../../icons/plus';
import {gtm} from '../../../lib/gtm';
import {getParishes} from '../../../slices/parish';
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

const ParishList = () => {
  const dispatch = useDispatch();
  const { parishList } = useSelector((state) => state.parish);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [parishes, setParishes] = useState(parishList);
  const [openNew, setOpenNew] = useState(false);
  const [disableNewButton, setDisableNewButton] = useState(true);
  const { user } = useAuth();
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
      dispatch(getParishes());
      }, [dispatch]);

  useEffect(() => {
    setParishes(parishList);
  }, [parishList]);

  useEffect(() => {
    setDisableNewButton(user?.profileId !== UserProfiles.DIRECTOR_ECONOMATO);
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

  const handleNewParish = () => {
    const newParish = {
      id: 0,
      name: '',
      city: '',
      address: '',
      email: '',
      phone: '',
      contact: '',
    }
    setParishes([newParish, ...parishes]);
    setOpenNew(true);
    setDisableNewButton(true);
  }

  const handleCreatedParish = (isCreated) => {
    setDisableNewButton(false);
    setOpenNew(false);
    if (!isCreated) {
      setParishes(parishes.filter((parish) => parish.id !== 0));
    }
  }

  // Usually query is done on backend with indexing solutions
  const filteredParishes = applyFilters(parishes, filters);
  const paginatedParishes = applyPagination(filteredParishes, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Listado Parroquias
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
                  Parroquias
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  disabled={disableNewButton}
                  component="a"
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  onClick={handleNewParish}
                >
                  Nuevo
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <ParishListFilters onChange={handleFiltersChange} />
            <ParishListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              parishes={paginatedParishes}
              parishesCount={filteredParishes.length}
              rowsPerPage={rowsPerPage}
              openNew={openNew}
              onCreatedNew={handleCreatedParish}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

ParishList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default ParishList;
