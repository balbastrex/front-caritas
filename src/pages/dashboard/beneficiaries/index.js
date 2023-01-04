import {Box, Button, Card, Container, Dialog, Grid, Typography} from '@mui/material';
import {PDFViewer} from '@react-pdf/renderer';
import Head from 'next/head';
import NextLink from 'next/link';
import {useEffect, useState} from 'react';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {BeneficiaryLicensePDF} from '../../../components/dashboard/beneficiary/beneficiary-license-pdf';
import {BeneficiaryListFilters} from '../../../components/dashboard/beneficiary/beneficiary-list-filters';
import {BeneficiaryListTable} from '../../../components/dashboard/beneficiary/beneficiary-list-table';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {MarketListFilters} from '../../../components/dashboard/market/market-list-filters';
import {TurnBeneficiaryPDF} from '../../../components/dashboard/turn/turn-beneficiary-pdf';
import {useAuth} from '../../../hooks/use-auth';
import {ArrowLeft as ArrowLeftIcon} from '../../../icons/arrow-left';
import {Plus as PlusIcon} from '../../../icons/plus';
import {gtm} from '../../../lib/gtm';
import {getBeneficiaries} from '../../../slices/beneficiary';
import {useDispatch, useSelector} from '../../../store/index';
import {UserProfiles} from '../../../utils/constants';

const applyFilters = (beneficiaries, filters) => beneficiaries.filter((beneficiary) => {
  if (filters.name) {
    const nameMatched = beneficiary.name.toLowerCase().includes(filters.name.toLowerCase())
      || beneficiary.lastname1?.toLowerCase().includes(filters.name.toLowerCase())
      || beneficiary.lastname2?.toLowerCase().includes(filters.name.toLowerCase())
      || beneficiary.license === parseInt(filters.name)

    if (!nameMatched) {
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
  const [viewBeneficiaryLicensePDF, setViewBeneficiaryLicensePDF] = useState(null);
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
    console.log('==> filters ', filters)
    setFilters(filters);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleBeneficiaryLicense = (beneficiary) => {
    setViewBeneficiaryLicensePDF(beneficiary);
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
            <BeneficiaryListFilters onChange={handleFiltersChange} />
            <BeneficiaryListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              beneficiaries={paginatedBeneficiaries}
              beneficiariesCount={filteredBeneficiaries.length}
              rowsPerPage={rowsPerPage}
              handleBeneficiaryLicense={handleBeneficiaryLicense}
            />
          </Card>
        </Container>
      </Box>
      <Dialog
        fullScreen
        open={!!viewBeneficiaryLicensePDF}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <Box
            sx={{
              backgroundColor: 'background.default',
              p: 2,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '20px',
                left: '20px'
              }}
            >
              <Button
                startIcon={<ArrowLeftIcon fontSize="small" />}
                onClick={() => setViewBeneficiaryLicensePDF(null)}
                variant="contained"
              >
                Volver
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4">
                Carnet {viewBeneficiaryLicensePDF?.name} {viewBeneficiaryLicensePDF?.lastname1}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <PDFViewer
              height="100%"
              style={{ border: 'none' }}
              width="100%"
              showToolbar={true}
            >
              {
                viewBeneficiaryLicensePDF && (
                  <BeneficiaryLicensePDF beneficiary={viewBeneficiaryLicensePDF} />
                )
              }
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
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
