import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import {
  Box, Paper,
  Table,
  TableBody,
  TableCell, TableContainer, TableHead,
  TablePagination,
  TableRow, TableSortLabel, Tooltip,
  Typography,
} from '@mui/material';
import {useState} from 'react';
import {orderLineCompare, orderLineCompareName} from '../../../utils/sorting';
import {Scrollbar} from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';
import {ExceedCartModal} from './exceed-cart-modal';

export const severityMap = {
  true: 'success',
  false: 'warning',
};

const calculateColumn = (uf) => {
  switch (uf) {
    case 1: return 'q1';
    case 2: return 'q2';
    case 3: return 'q3';
    case 4: return 'q4';
    case 5: return 'q5';
    case 6: return 'q6';
    default: return 'q1';
  }
}

export const OrderProductListTable = ({ products, handleAddProduct, beneficiaryUF = 1, orderLines }) => {

  const getQuantity = (productId) => {
    return orderLines.find((orderLine) => orderLine.productId === productId)?.units || 0;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table sx={{ minWidth: 700}} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                Id
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Producto
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Stock
              </TableCell>
              <TableCell>
                Añadidos
              </TableCell>
              <TableCell>
                Precio
              </TableCell>
              <TableCell>
                Max.
              </TableCell>
              <TableCell>
                Gratuidad
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.sort(orderLineCompareName).map((product) => (
              <TableRow
                hover
                key={product.id}
                sx={{ cursor: 'pointer' }}
                disabled={true}
                onClick={() => handleAddProduct({ productId: product.id, description: product.name, price: product.free ? 0 : product.salesPrice, cost: product.costPrice, units: 1, maxUnits: product[calculateColumn(beneficiaryUF)] })}
              >
                <TableCell>
                  <Typography
                    color="textPrimary"
                    variant="subtitle2"
                  >
                    {product.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  {product.name}
                </TableCell>
                <TableCell align="right">
                  {product.stock}
                </TableCell>
                <TableCell align="center">
                  <SeverityPill color={getQuantity(product.id) === 0 ? 'warning' : 'success'}>
                    {getQuantity(product.id)}
                  </SeverityPill>
                </TableCell>
                <TableCell align="right">
                  {numeral(product.salesPrice).format(`0,0.00`)} €
                </TableCell>
                <TableCell align="right">
                  {product[calculateColumn(beneficiaryUF)]}
                </TableCell>
                <TableCell>
                  <SeverityPill color={severityMap[product.free]}>
                    Gratuidad: {product.free ? 'Si' : 'No'}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

OrderProductListTable.propTypes = {
  products: PropTypes.array.isRequired,
  handleAddProduct: PropTypes.func.isRequired
};
