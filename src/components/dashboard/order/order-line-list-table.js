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

export const OrderLineListTable = ({ orderLines, handleRemoveLine }) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table sx={{ minWidth: 700}}>
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
                    Producto Id
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Producto
              </TableCell>
              <TableCell>
                Cantidad
              </TableCell>
              <TableCell>
                Precio
              </TableCell>
              <TableCell>
                Borrar Linea
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderLines.map((orderLine) => {
              return (
                <TableRow
                  key={orderLine.productId}
                  sx={{backgroundColor: orderLine.units > orderLine.maxUnits ? 'error.light' : 'background.paper'}}
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
