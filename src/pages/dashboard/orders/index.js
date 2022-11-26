import {Box, Button, Dialog, Divider, Grid, InputAdornment, Tab, Tabs, TextField, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {PDFViewer} from '@react-pdf/renderer';
import Head from 'next/head';
import NextLink from 'next/link';
import {useEffect, useRef, useState} from 'react';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {OrderDrawer} from '../../../components/dashboard/order/order-drawer';
import {OrderListTable} from '../../../components/dashboard/order/order-list-table';
import {OrderPDF} from '../../../components/dashboard/order/order-pdf';
import {ArrowLeft as ArrowLeftIcon} from '../../../icons/arrow-left';
import {Plus as PlusIcon} from '../../../icons/plus';
import {Search as SearchIcon} from '../../../icons/search';
import {ViewList as ViewListIcon} from '../../../icons/view-list';
import {gtm} from '../../../lib/gtm';
import {getOrders, updateStatusOrder} from '../../../slices/order';
import {useDispatch, useSelector} from '../../../store';

const tabs = [
  {
    label: 'Todas',
    value: 'all'
  },
  {
    label: 'Pendientes',
    value: 'Cerrado'
  },
  {
    label: 'Abiertas',
    value: 'Abierto'
  },
  {
    label: 'Pagadas',
    value: 'Pagado'
  },
  {
    label: 'Canceladas',
    value: 'Cancelado'
  }
];

const sortOptions = [
  {
    label: 'Más Nuevas',
    value: 'desc'
  },
  {
    label: 'Más Antiguas',
    value: 'asc'
  }
];

const applyFilters = (orders, filters) => orders.filter((order) => {
  if (filters.query) {
    const containsQuery = (order.id.toString() || '').toLowerCase().includes(filters.query.toLowerCase());
    const containsQueryBeneficiary = (order.beneficiaryName || '').toLowerCase().includes(filters.query.toLowerCase());

    if (!containsQuery && !containsQueryBeneficiary) {
      return false;
    }
  }

  if (typeof filters.status !== 'undefined') {
    const statusMatched = order.status === filters.status;

    if (!statusMatched) {
      return false;
    }
  }

  return true;
});

const applySort = (orders, sortDir) => orders.sort((a, b) => {
  const comparator = a.createdAt > b.createdAt ? -1 : 1;

  return sortDir === 'desc' ? comparator : -comparator;
});

const applyPagination = (orders, page, rowsPerPage) => orders.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

const OrderListInner = styled('div',
  { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    overflow: 'hidden',
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(8),
    zIndex: 1,
    [theme.breakpoints.up('lg')]: {
      marginRight: -500
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      [theme.breakpoints.up('lg')]: {
        marginRight: 0
      },
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }));

const OrderList = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.order);
  const rootRef = useRef(null);
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('all');
  const [sort, setSort] = useState('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewPDF, setViewPDF] = useState(null);
  const [closeCash, setCloseCash] = useState(false);
  const [filters, setFilters] = useState({
    query: '',
    status: undefined
  });
  const [drawer, setDrawer] = useState({
    isOpen: false,
    orderId: undefined
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
    setFilters((prevState) => ({
      ...prevState,
      status: value === 'all' ? undefined : value
    }));
  };

  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value
    }));
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSort(value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleOpenDrawer = (orderId) => {
    setDrawer({
      isOpen: true,
      orderId
    });
  };

  const handleCloseDrawer = () => {
    setDrawer({
      isOpen: false,
      orderId: undefined
    });
  };

  const handleApprove = (orderId) => {
    dispatch(updateStatusOrder(orderId, 'Pagado'));
    setDrawer({
      isOpen: false,
      orderId: undefined
    });
  };

  const onPreviewOrder = (order) => {
    setViewPDF(order);
  }

  const filteredOrders = applyFilters(orderList, filters);
  const sortedOrders = applySort(filteredOrders, sort);
  const paginatedOrders = applyPagination(sortedOrders, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Dashboard: Ventas
        </title>
      </Head>
      <Box
        component="main"
        ref={rootRef}
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          flexGrow: 1,
          overflow: 'hidden'
        }}
      >
        <OrderListInner open={drawer.isOpen}>
          <Box sx={{ px: 3 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  Ventas Diarias
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => setCloseCash(true)}
                  startIcon={<ViewListIcon fontSize="small" />}
                  variant="contained"
                >
                  Cierre de Caja
                </Button>
              </Grid>
              <Grid item>
                <NextLink
                  href={`/dashboard/orders/new`}
                  passHref
                >
                  <Button
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Nueva Venta
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              sx={{ mt: 3 }}
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
          </Box>
          <Divider />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              m: -1.5,
              p: 3
            }}
          >
            <Box
              component="form"
              onSubmit={handleQueryChange}
              sx={{
                flexGrow: 1,
                m: 1.5
              }}
            >
              <TextField
                defaultValue=""
                fullWidth
                inputProps={{ ref: queryRef }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
                placeholder="Buscar por número de Venta"
              />
            </Box>
            <TextField
              label="Ordenar por"
              name="order"
              onChange={handleSortChange}
              select
              SelectProps={{ native: true }}
              sx={{ m: 1.5 }}
              value={sort}
            >
              {sortOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </TextField>
          </Box>
          <Divider />
          <OrderListTable
            onOpenDrawer={handleOpenDrawer}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            orders={paginatedOrders}
            ordersCount={filteredOrders.length}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </OrderListInner>
        <OrderDrawer
          containerRef={rootRef}
          onClose={handleCloseDrawer}
          onPreviewPDF={onPreviewOrder}
          open={drawer.isOpen}
          order={orderList.find((order) => order.id === drawer.orderId)}
          onApprove={handleApprove}
        />
      </Box>
      <Dialog
        fullScreen
        open={!!viewPDF}
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
                onClick={() => setViewPDF(null)}
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
                Hoja de Pedido {viewPDF?.id} - UF{viewPDF?.beneficiaryFamilyUnit}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <PDFViewer
              height="100%"
              style={{ border: 'none' }}
              width="100%"
              showToolbar={false}
            >
              {
                viewPDF && (
                  <OrderPDF order={viewPDF} />
                )
              }
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        fullScreen
        open={closeCash}
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
              p: 2
            }}
          >
            <Button
              startIcon={<ArrowLeftIcon fontSize="small" />}
              onClick={() => setCloseCash(null)}
              variant="contained"
            >
              Volver
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <PDFViewer
              height="100%"
              style={{ border: 'none' }}
              width="100%"
            >
              {
                viewPDF && (
                  <OrderPDF order={viewPDF} />
                )
              }
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

OrderList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default OrderList;
