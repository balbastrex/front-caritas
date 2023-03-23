import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from '@mui/material';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {Trash as TrashIcon} from '../../../icons/trash';
import {orderLineCompare, orderLineCompareDescription} from '../../../utils/sorting';

export const OrderLineListTable = ({ orderLines, handleRemoveLine }) => {
  console.log("-> orderLines", orderLines);

  if (!orderLines || orderLines.length === 0) { return null; }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table sx={{ minWidth: 700}}>
          <TableHead>
            <TableRow>
              <TableCell>
                Producto Id
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
                Cantidad
              </TableCell>
              <TableCell>
                Precio
              </TableCell>
              <TableCell>
                Total
              </TableCell>
              <TableCell>
                Borrar Linea
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...orderLines].sort(orderLineCompareDescription).map((orderLine) => {
              return (
                <TableRow
                  key={orderLine.productId}
                  sx={{backgroundColor: orderLine.units > orderLine.maxUnits ? 'error.light' : 'background.paper', cursor: 'pointer'}}
                  onClick={() => handleRemoveLine(orderLine.productId)}
                >
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      variant="subtitle2"
                    >
                      {orderLine.productId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {orderLine.description}
                  </TableCell>
                  <TableCell>
                    {orderLine.units}
                  </TableCell>
                  <TableCell>
                    {numeral(orderLine.price).format(`0,0.00`)} €
                  </TableCell>
                  <TableCell>
                    {numeral(orderLine.price * orderLine.units).format(`0,0.00`)} €
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleRemoveLine(orderLine.productId)}>
                      <TrashIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

OrderLineListTable.propTypes = {
  orderLines: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number,
      quantity: PropTypes.number,
    })
  ).isRequired,
  handleRemoveLine: PropTypes.func.isRequired
}
