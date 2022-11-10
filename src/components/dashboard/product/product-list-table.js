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
import {useAuth} from '../../../hooks/use-auth';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { Scrollbar } from '../../scrollbar';
import {SeverityPill} from '../../severity-pill';

export const ProductListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    products,
    productsCount,
    rowsPerPage,
    ...other
  } = props;
  const { user } = useAuth();
  console.log('==> user ', user)


  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width="25%">
                Nombre
              </TableCell>
              <TableCell>
                UF1
              </TableCell>
              <TableCell>
                UF2
              </TableCell>
              <TableCell>
                UF3
              </TableCell>
              <TableCell>
                UF4
              </TableCell>
              <TableCell>
                UF5
              </TableCell>
              <TableCell>
                UF6
              </TableCell>
              <TableCell>
                Gratuito
              </TableCell>
              <TableCell>
                Stock
              </TableCell>
              <TableCell>
                Disponible
              </TableCell>
              <TableCell>
                P.C.E
              </TableCell>
              <TableCell>
                P.V.P
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {

              return (
                <Fragment key={product.id}>
                  <TableRow
                    hover
                    key={product.id}
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
                    <TableCell width="25%">
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Box sx={{ ml: 0}}>
                          <Typography variant="subtitle1">
                            {product.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {product.q1}
                    </TableCell>
                    <TableCell>
                      {product.q2}
                    </TableCell>
                    <TableCell>
                      {product.q3}
                    </TableCell>
                    <TableCell>
                      {product.q4}
                    </TableCell>
                    <TableCell>
                      {product.q5}
                    </TableCell>
                    <TableCell>
                      {product.q6}
                    </TableCell>
                    <TableCell align="center">
                      <SeverityPill color={product.free ? 'success' : 'warning'}>
                        {product.free ? 'Sí' : 'No'}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      {product.stock}
                    </TableCell>
                    <TableCell align="center">
                      <SeverityPill color={product.available ? 'success' : 'warning'}>
                        {product.available ? 'Sí' : 'No'}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      {product.costPrice} €
                    </TableCell>
                    <TableCell>
                      {product.salesPrice} €
                    </TableCell>
                    <TableCell align="right">
                      <NextLink
                        href={`/dashboard/products/${product.id}/edit`}
                        passHref
                      >
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
        count={productsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

ProductListTable.propTypes = {
  products: PropTypes.array.isRequired,
  productsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
