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
import { getParishByMarketId } from '../../../slices/market';
import { useDispatch, useSelector } from '../../../store';
import { MoreMenu } from '../../more-menu';
import { Scrollbar } from '../../scrollbar';

const applyPagination = (parishes, page, rowsPerPage) => parishes.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

export const MarketParish = ({ market }) => {
  const dispatch = useDispatch();
  const { parishMarket } = useSelector((state) => state.market);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const paginatedParishMarket = applyPagination(parishMarket, page, rowsPerPage);

  useEffect(() => {
    dispatch(getParishByMarketId(market.id));
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
        title={`Parroquias asociadas a ${market.name}`}
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
                City
              </TableCell>
              <TableCell>
                Address
              </TableCell>
              <TableCell>
                Email
              </TableCell>
              <TableCell>
                Phone
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedParishMarket.map((parish) => (
              <TableRow key={parish.id}>
                <TableCell>
                  #
                  {parish.id}
                </TableCell>
                <TableCell>
                  {parish.name}
                </TableCell>
                <TableCell>
                  {parish.city}
                </TableCell>
                <TableCell>
                  {parish.address}
                </TableCell>
                <TableCell>
                  {parish.email}
                </TableCell>
                <TableCell>
                  {parish.phone}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={parishMarket.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
