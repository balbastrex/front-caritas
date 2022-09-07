import { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import {getParishByMarketId, getProductByMarketId} from '../../../slices/market';
import { useDispatch, useSelector } from '../../../store';
import { MoreMenu } from '../../more-menu';
import { Scrollbar } from '../../scrollbar';
import {SeverityPill} from '../../severity-pill';

const applyPagination = (parishes, page, rowsPerPage) => parishes.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

export const MarketProduct = ({ market }) => {
  const dispatch = useDispatch();
  const { productMarket } = useSelector((state) => state.market);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const paginatedProductMarket = applyPagination(productMarket, page, rowsPerPage);

  useEffect(() => {
    dispatch(getProductByMarketId(market.id));
  }, [dispatch]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Card>
      <CardHeader
        title={`Invetario asociado a ${market.name}`}
      />
      <Divider />
      <Scrollbar>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                Id
              </TableCell>
              <TableCell>
                Name
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
                Stock
              </TableCell>
              <TableCell>
                Free
              </TableCell>
              <TableCell>
                P.C.E
              </TableCell>
              <TableCell>
                P.V.P
              </TableCell>
              <TableCell>
                Available
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProductMarket.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  #
                  {product.id}
                </TableCell>
                <TableCell>
                  {product.name}
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
                <TableCell>
                  {product.stock}
                </TableCell>
                <TableCell>
                  <SeverityPill color={product.free === true ? 'success' : 'error'}>
                    {product.free ? 'Sí' : 'No'}
                  </SeverityPill>
                </TableCell>
                <TableCell>
                  {product.costPrice}
                </TableCell>
                <TableCell>
                  {product.salesPrice}
                </TableCell>
                <TableCell>
                  <SeverityPill color={product.available === true ? 'success' : 'error'}>
                    {product.available ? 'Sí' : 'No'}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={productMarket.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
