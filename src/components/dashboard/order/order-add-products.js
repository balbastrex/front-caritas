import {Box, Divider, InputAdornment, Tab, Tabs, TextField} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import {AuthGuard} from '../../authentication/auth-guard';
import {DashboardLayout} from '../dashboard-layout';
import {Search as SearchIcon} from '../../../icons/search';
import {gtm} from '../../../lib/gtm';
import {getProducts} from '../../../slices/product';
import {useDispatch, useSelector} from '../../../store';
import {ExceedCartModal} from './exceed-cart-modal';
import {OrderProductListTable} from './order-product-list-table';

const tabs = [
  {
    label: 'Todos',
    value: 'all'
  },
  {
    label: 'Con Stock',
    value: 'stock'
  },
  {
    label: 'Gratuitos',
    value: 'free'
  }
];

const sortOptions = [
  {
    label: 'Nombre ascendente',
    value: 'asc'
  },
  {
    label: 'Nombre descendente',
    value: 'desc'
  }
];

const applyFilters = (products, filters) => products.filter((product) => {
  if (filters.query) {
    const containsQuery = (product.id.toString() || '').toLowerCase().includes(filters.query.toLowerCase());
    const containsQueryBeneficiary = (product.name || '').toLowerCase().includes(filters.query.toLowerCase());

    if (!containsQuery && !containsQueryBeneficiary) {
      return false;
    }
  }

  if (typeof filters.free !== 'undefined') {
    const statusMatched = product.free === filters.free;

    if (!statusMatched) {
      return false;
    }
  }

  if (typeof filters.stock !== 'undefined') {
    const statusMatched = product.stock > 0;

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

const OrderAddProducts = ({ handleAddProduct, beneficiaryUF }) => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('all');
  const [sort, setSort] = useState('desc');
  const [filters, setFilters] = useState({
    query: '',
    free: undefined,
    stock: undefined
  });
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
    setFilters((prevState) => ({
      ...prevState,
      free: value === 'all' || value === 'stock' ? undefined : true,
      stock: value === 'all' || value === 'free' ? undefined : true
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

  const filteredProducts = applyFilters(productList, filters);
  const sortedProducts = applySort(filteredProducts, sort);

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          overflow: 'hidden'
        }}
      >
        <Box sx={{ px: 3 }}>
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
            sx={{
              flexGrow: 1,
              m: 1.5
            }}
          >
            <TextField
              defaultValue=""
              fullWidth
              onChange={handleQueryChange}
              inputProps={{ ref: queryRef }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              placeholder="Buscar por nombre de Producto"
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
        <OrderProductListTable products={sortedProducts} handleAddProduct={handleAddProduct} beneficiaryUF={beneficiaryUF} />
      </Box>
    </>
  );
};

OrderAddProducts.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default OrderAddProducts;
