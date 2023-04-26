import {Box, Table, TableBody, TableCell, TablePagination, TableRow, Typography} from '@mui/material';
import {format} from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {SeverityPill} from '../../severity-pill';

export const severityMap = {
  Pagado: 'success',
  Cerrado: 'info',
  Abierto: 'warning',
  Cancelado: 'error'
};

export const OrderListTable = (props) => {
  const {
    onOpenDrawer,
    onPageChange,
    onRowsPerPageChange,
    orders,
    ordersCount,
    page,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Table>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              hover
              key={order.id}
              onClick={() => onOpenDrawer?.(order.id)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <Box
                  sx={{
                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                      ? 'neutral.800'
                      : 'neutral.200',
                    borderRadius: 2,
                    maxWidth: 'fit-content',
                    ml: 3,
                    p: 1
                  }}
                >
                  <Typography
                    align="center"
                    variant="subtitle2"
                  >
                    {format(order.createdAt, 'LLL').toUpperCase()}
                  </Typography>
                  <Typography
                    align="center"
                    variant="h6"
                  >
                    {format(order.createdAt, 'd')}
                  </Typography>
                </Box>
                <Box sx={{ ml: 6 }}>
                  <Typography variant="body2" color="textSecondary">
                    NºVenta: {order.id}
                  </Typography>
                  <Typography
                    color="white"
                    variant="subtitle2"
                  >
                    Total
                    {' '}
                    {numeral(order.amount).format(`${order.currency}0,0.00`)} €
                  </Typography>
                </Box>
                <Box sx={{ ml: 6 }}>
                  <Typography variant="subtitle2">
                    Usuario:
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    {order.userName}
                  </Typography>
                </Box>
                <Box sx={{ ml: 6 }}>
                  {`Carnet: `}
                  <SeverityPill sx={{ mr: 4 }} color='success'>
                    {order.beneficiaryLicense}
                  </SeverityPill>
                </Box>
                <Box sx={{ ml: 6 }}>
                  <Typography variant="subtitle2">
                    Beneficiario:
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    {order.beneficiaryName}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <SeverityPill sx={{ mr: 4 }} color={severityMap[order.status] || 'warning'}>
                  {order.status}
                </SeverityPill>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={ordersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

OrderListTable.propTypes = {
  onOpenDrawer: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
