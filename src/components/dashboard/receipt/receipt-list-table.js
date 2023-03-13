import NextLink from 'next/link';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { Scrollbar } from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';

export const ReceiptListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    receipts,
    receiptsCount,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width="15%">
                Albarán
              </TableCell>
              <TableCell>
                Proveedor
              </TableCell>
              <TableCell>
                Usuario
              </TableCell>
              <TableCell>
                Economáto
              </TableCell>
              <TableCell>
                Nº de Productos
              </TableCell>
              <TableCell>
                T.Base Imponible
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipts.map((receipt) => {

              return (
                <Fragment key={receipt.id}>
                  <TableRow
                    hover
                    key={receipt.id}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...({
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)'
                          }
                        })
                      }}
                      width="25%"
                    >
                    </TableCell>
                    <TableCell width="15%">
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Box sx={{ ml: 0}}>
                          <Typography variant="subtitle1">
                            {receipt.albaran}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {receipt.providerName}
                    </TableCell>
                    <TableCell>
                      {receipt.userName}
                    </TableCell>
                    <TableCell>
                      {receipt.marketName}
                    </TableCell>
                    <TableCell>
                      {receipt.receiptLines.length}
                    </TableCell>
                    <TableCell>
                      {receipt.amount}
                    </TableCell>
                    <TableCell align="right">
                      <NextLink href={`/dashboard/receipts/${receipt.id}/edit`} passHref legacyBehavior>
                        <IconButton component="a">
                          <ArrowRightIcon fontSize="small" />
                        </IconButton>
                      </NextLink>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={receiptsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

ReceiptListTable.propTypes = {
  receipts: PropTypes.array.isRequired,
  receiptsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
