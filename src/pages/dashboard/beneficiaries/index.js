import {LoadingButton} from '@mui/lab';
import {Box, Button, Card, Container, Dialog, Grid, Typography} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import {useEffect, useState} from 'react';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {exportBeneficiariesToExcel} from '../../../components/dashboard/beneficiary/beneficiary-export-excel';
import {BeneficiaryLicensePdfDialog} from '../../../components/dashboard/beneficiary/beneficiary-license-pdf-dialog';
import {BeneficiaryListFilters} from '../../../components/dashboard/beneficiary/beneficiary-list-filters';
import {BeneficiaryListTable} from '../../../components/dashboard/beneficiary/beneficiary-list-table';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {useAuth} from '../../../hooks/use-auth';
import {Plus as PlusIcon} from '../../../icons/plus';
import {gtm} from '../../../lib/gtm';
import {getBeneficiaries} from '../../../slices/beneficiary';
import {useDispatch, useSelector} from '../../../store/index';
import axios from '../../../utils/axios';
import {UserProfiles} from '../../../utils/constants';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

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
  const [isExporting, setIsExporting] = useState(false);
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
    setDisableNewButton(user?.profileId !== UserProfiles.GESTOR_PARROQUIA && user?.profileId !== UserProfiles.DIRECTOR_ECONOMATO);
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

  const handleBeneficiaryLicense = (beneficiary) => {
    setViewBeneficiaryLicensePDF(beneficiary);
  }

  const handleExportBeneficiariesToExcel = () => {
    setIsExporting(true)
    axios.get('/api/v1/beneficiary-excel-report')
      .then((response) => {
        exportBeneficiariesToExcel(response.data);
        setIsExporting(false);
      })
  }

  // Usually query is done on backend with indexing solutions
  const filteredBeneficiaries = applyFilters(beneficiaries, filters);
  const paginatedBeneficiaries = applyPagination(filteredBeneficiaries, page, rowsPerPage);

  return <>
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
            <Grid item container justifyContent={'right'} spacing={2}>
              <Grid item>
                <LoadingButton
                  disabled={disableNewButton}
                  startIcon={<FileDownloadOutlinedIcon fontSize="small" />}
                  variant="contained"
                  loading={isExporting}
                  onClick={handleExportBeneficiariesToExcel}
                >
                  Exportar
                </LoadingButton>
              </Grid><Grid item>
              <NextLink href="/dashboard/beneficiaries/new" passHref legacyBehavior>
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
    <BeneficiaryLicensePdfDialog
      viewBeneficiaryLicensePDF={viewBeneficiaryLicensePDF}
      setViewBeneficiaryLicensePDF={setViewBeneficiaryLicensePDF}
    />
  </>;
};

BeneficiariesList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default BeneficiariesList;
