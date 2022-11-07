import { useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import {BeneficiaryListTable} from '../../../components/dashboard/beneficiary/beneficiary-list-table';
import {MarketListFilters} from '../../../components/dashboard/market/market-list-filters';
import {getAuthorizationTypes} from '../../../slices/authorizationType';
import {getBeneficiaries} from '../../../slices/beneficiary';
import {getCitizenTypes} from '../../../slices/citizenType';
import {getCivilTypes} from '../../../slices/civilStateType';
import {getCountries} from '../../../slices/countries';
import {getEducationTypes} from '../../../slices/educationType';
import {getEmploymentTypes} from '../../../slices/employmentType';
import {getFamilyTypes} from '../../../slices/familyType';
import {getGuardianshipTypes} from '../../../slices/guardianshipType';
import {getParishes} from '../../../slices/parish';
import {getTurns} from '../../../slices/turn';
import { useDispatch, useSelector } from '../../../store/index';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { Plus as PlusIcon } from '../../../icons/plus';
import { gtm } from '../../../lib/gtm';
import { getMarkets } from '../../../slices/market';

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
  const { countryList } = useSelector((state) => state.countries);
  const { familyTypeList } = useSelector((state) => state.familytype);
  const { citizenTypeList } = useSelector((state) => state.citizentype);
  const { civilStateTypeList } = useSelector((state) => state.civilstatetype);
  const { employmentTypeList } = useSelector((state) => state.employmenttype);
  const { guardianshipTypeList } = useSelector((state) => state.guardianshiptype);
  const { educationTypeList } = useSelector((state) => state.educationtype);
  const { authorizationTypeList } = useSelector((state) => state.authorizationtype);
  const { parishList } = useSelector((state) => state.parish);
  const { turnList } = useSelector((state) => state.turn);
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
      dispatch(getCountries());
      dispatch(getFamilyTypes());
      dispatch(getCitizenTypes());
      dispatch(getCivilTypes());
      dispatch(getEmploymentTypes());
      dispatch(getGuardianshipTypes());
      dispatch(getEducationTypes());
      dispatch(getAuthorizationTypes());
      dispatch(getParishes());
      dispatch(getTurns());
      }, [dispatch]);

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
  const filteredBeneficiaries = applyFilters(beneficiaryList, filters);
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
              countries={countryList}
              familyTypes={familyTypeList}
              citizenTypes={ citizenTypeList }
              civilStateTypes={ civilStateTypeList }
              employmentTypes={ employmentTypeList }
              guardianshipTypes={ guardianshipTypeList }
              educationTypes={ educationTypeList }
              authorizationTypes={ authorizationTypeList }
              parishes={ parishList }
              turns={ turnList }
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
