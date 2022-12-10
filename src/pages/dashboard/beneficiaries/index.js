import {Box, Button, Card, Container, Grid, Typography} from '@mui/material';
import Head from 'next/head';
import {useEffect, useState} from 'react';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {BeneficiaryListTable} from '../../../components/dashboard/beneficiary/beneficiary-list-table';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {MarketListFilters} from '../../../components/dashboard/market/market-list-filters';
import {useAuth} from '../../../hooks/use-auth';
import {Plus as PlusIcon} from '../../../icons/plus';
import {gtm} from '../../../lib/gtm';
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
  const [beneficiaries, setBeneficiaries] = useState(beneficiaryList);
  const [openNew, setOpenNew] = useState(false);
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

  useEffect(() => {
    setBeneficiaries(beneficiaryList);
  }, [beneficiaryList]);

  useEffect(() => {
    setDisableNewButton(user?.profileId !== UserProfiles.DIRECTOR_ECONOMATO && user?.profileId !== UserProfiles.GESTOR_PARROQUIA);
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

  const handleNewBeneficiary = () => {
    const newBeneficiary = {
      id: 0,
      license: 0,
      expires: '2030-10-10',
      cif: '',
      name: '',
      lastname1: '',
      lastname2: '',
      nationalityId: 0,
      gender: '',
      birthdate: '',
      sice: '',
      address: '',
      state: '',
      city: '',
      zip: '',
      email: '',
      phone: 666666666,
      free: true,
      homeless: false,
      familyTypeId: 0,
      adults: 0,
      minors: 0,
      childrenUnder18: 0,
      childrenOver18: 0,
      gratuitous: 0,
      citizenTypeId: 0,
      civilStateTypeId: 0,
      employmentTypeId: 0,
      guardianshipTypeId: 0,
      educationTypeId: 0,
      authorizationTypeId: 0,
      parishId: parishList[0].id,
      turnId: turnList[0].id,
    }
    setBeneficiaries([newBeneficiary, ...beneficiaries]);
    setOpenNew(true);
    setDisableNewButton(true);
  }

  const handleCreatedBeneficiary = (isCreated) => {
    setDisableNewButton(false);
    setOpenNew(false);
    if (!isCreated) {
      setBeneficiaries(beneficiaries.filter((beneficiary) => beneficiary.id !== 0));
    }
  }

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
                <Button
                  disabled={disableNewButton}
                  component="a"
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  onClick={handleNewBeneficiary}
                >
                  Nuevo
                </Button>
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
              openNew={openNew}
              onCreatedNew={handleCreatedBeneficiary}
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
