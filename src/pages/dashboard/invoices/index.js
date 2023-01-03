import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {Box, Button, Divider, Grid, InputAdornment, Tab, Tabs, TextField, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import Head from 'next/head';
import NextLink from 'next/link';
import {useEffect, useRef, useState} from 'react';
import {AuthGuard} from '../../../components/authentication/auth-guard';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {CloseCartModal} from '../../../components/dashboard/order/close-cart-modal';
import {CloseCartPdfDialog} from '../../../components/dashboard/order/close-cart-pdf-dialog';
import {OrderDrawer} from '../../../components/dashboard/order/order-drawer';
import {orderHistoryListTable, OrderListTable} from '../../../components/dashboard/order/order-list-table';
import {OrderPdfDialog} from '../../../components/dashboard/order/order-pdf-dialog';
import {useAuth} from '../../../hooks/use-auth';
import {Plus as PlusIcon} from '../../../icons/plus';
import {Search as SearchIcon} from '../../../icons/search';
import {gtm} from '../../../lib/gtm';
import {getHistoryOrders, getOrders, updateStatusOrder} from '../../../slices/order';
import {useDispatch, useSelector} from '../../../store';
import {UserProfiles} from '../../../utils/constants';

const tabs = [
  {
    label: 'Todas',
    value: 'all'
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

const InvoiceListInner = styled('div',
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

const InvoiceList = () => {
  const dispatch = useDispatch();
  const { orderHistoryList } = useSelector((state) => state.order);
  const { user } = useAuth();
  const rootRef = useRef(null);
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('all');
  const [sort, setSort] = useState('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewPDF, setViewPDF] = useState(null);
  const [viewCloseCartPDF, setViewCloseCartPDF] = useState(null);
  const [openCloseCart, setOpenCloseCart] = useState(false);
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
    dispatch(getHistoryOrders());
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

  const onPreviewOrder = (order) => {
    setViewPDF(order);
  }

  const filteredOrders = applyFilters(orderHistoryList, filters);
  const sortedOrders = applySort(filteredOrders, sort);
  const paginatedOrders = applyPagination(sortedOrders, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Dashboard: Histórico Ventas
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
        <InvoiceListInner open={drawer.isOpen}>
          <Box sx={{ px: 3 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  Histórico de Ventas
                </Typography>
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
        </InvoiceListInner>
        <OrderDrawer
          containerRef={rootRef}
          onClose={handleCloseDrawer}
          onPreviewPDF={onPreviewOrder}
          open={drawer.isOpen}
          order={orderHistoryList.find((order) => order.id === drawer.orderId)}
        />
      </Box>
      <OrderPdfDialog
        viewPDF={viewPDF}
        setViewPDF={setViewPDF}
      />
    </>
  );
};

InvoiceList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default InvoiceList;
