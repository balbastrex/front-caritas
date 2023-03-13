import {Box, Button, Card, Container, Dialog, Grid, Typography} from '@mui/material';
import {PDFViewer} from '@react-pdf/renderer';
import Head from 'next/head';
import NextLink from 'next/link';
import {useEffect, useState} from 'react';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {MarketListFilters} from '../../../components/dashboard/market/market-list-filters';
import {OrderPDF} from '../../../components/dashboard/order/order-pdf';
import {TurnBeneficiaryPDF} from '../../../components/dashboard/turn/turn-beneficiary-pdf';
import {TurnListTable} from '../../../components/dashboard/turn/turn-list-table';
import {useAuth} from '../../../hooks/use-auth';
import {ArrowLeft as ArrowLeftIcon} from '../../../icons/arrow-left';
import {Plus as PlusIcon} from '../../../icons/plus';
import {gtm} from '../../../lib/gtm';
import {getBeneficiariesTurn} from '../../../slices/beneficiary';
import {getTurnsForMarket} from '../../../slices/turn';
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

const TurnList = () => {
  const dispatch = useDispatch();
  const { turnList } = useSelector((state) => state.turn);
  const { beneficiariesTurnList } = useSelector((state) => state.beneficiary);
  const [page, setPage] = useState(0);
  const [disableNewButton, setDisableNewButton] = useState(true);
  const { user } = useAuth();
  const [viewBeneficiaryPDF, setViewBeneficiaryPDF] = useState(null);
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
    dispatch(getTurnsForMarket());
  }, [dispatch]);

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

  const handleBeneficiariesReport = (turn) => {
    dispatch(getBeneficiariesTurn(turn.id))
    setViewBeneficiaryPDF(turn);
  }

  // Usually query is done on backend with indexing solutions
  const filteredTurns = applyFilters(turnList, filters);
  const paginatedTurns = applyPagination(filteredTurns, page, rowsPerPage);

  return <>
    <Head>
      <title>
        Listado de Turnos
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
                Turnos
              </Typography>
            </Grid>
            <Grid item>
              <NextLink href="/dashboard/turns/new" passHref legacyBehavior>
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
          <TurnListTable
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={page}
            turns={paginatedTurns}
            turnsCount={filteredTurns.length}
            rowsPerPage={rowsPerPage}
            handleBeneficiariesReport={handleBeneficiariesReport}
          />
        </Card>
      </Container>
    </Box>
    <Dialog
      fullScreen
      open={!!viewBeneficiaryPDF}
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
              onClick={() => setViewBeneficiaryPDF(null)}
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
              Beneficiarios del turno
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
              viewBeneficiaryPDF && beneficiariesTurnList.length > 0 && (
                <TurnBeneficiaryPDF turn={viewBeneficiaryPDF} beneficiaries={beneficiariesTurnList} />
              )
            }
          </PDFViewer>
        </Box>
      </Box>
    </Dialog>
  </>;
};

TurnList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default TurnList;
