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
import {Scrollbar} from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';

export const severityMap = {
  true: 'success',
  false: 'warning',
};

export const OrderProductListTable = ({ products, handleAddProduct }) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table sx={{ minWidth: 700}} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Prducto Id
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Producto
              </TableCell>
              <TableCell>
                Stock
              </TableCell>
              <TableCell>
                Coste
              </TableCell>
              <TableCell>
                Precio
              </TableCell>
              <TableCell>
                Gratuidad
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                hover
                key={product.id}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleAddProduct({ productId: product.id, description: product.name, price: product.salesPrice, cost: product.costPrice, units: 1 })}
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
                <TableCell>
                  {product.stock}
                </TableCell>
                <TableCell>
                  {numeral(product.costPrice).format(`0,0.00`)} €
                </TableCell>
                <TableCell>
                  {numeral(product.salesPrice).format(`0,0.00`)} €
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
