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
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export const ReceiptLineListTable = ({ receiptLines, handleRemoveLine, handleRemoveProduct }) => {
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
                Precio (Sin IVA)
              </TableCell>
              <TableCell>
                Total (IVA incluido)
              </TableCell>
              <TableCell align="center">
                Borrar Linea
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receiptLines.map((receiptLine) => (
              <TableRow
                hover
                key={receiptLine.productId}
              >
                <TableCell>
                  <Typography
                    color="textPrimary"
                    variant="subtitle2"
                  >
                    {receiptLine.productId}
                  </Typography>
                </TableCell>
                <TableCell>
                  {receiptLine.description}
                </TableCell>
                <TableCell align="center">
                  {receiptLine.units}
                </TableCell>
                <TableCell align="right">
                  {numeral(receiptLine.cost).format(`0,0.00`)} €
                </TableCell>
                <TableCell align="right">
                  {numeral(receiptLine.totalCost).format(`0,0.00`)} €
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleRemoveLine(receiptLine.productId)} >
                    <RemoveCircleIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveProduct(receiptLine.productId)} >
                    <TrashIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

ReceiptLineListTable.propTypes = {
  receiptLines: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      units: PropTypes.number,
      cost: PropTypes.number,
    })
  ).isRequired,
  handleRemoveLine: PropTypes.func.isRequired
}
