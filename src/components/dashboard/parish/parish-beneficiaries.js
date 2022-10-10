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
import {getBeneficiariesByParish} from '../../../slices/parish';
import { useDispatch, useSelector } from '../../../store';
import { Scrollbar } from '../../scrollbar';

const applyPagination = (parishes, page, rowsPerPage) => parishes.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

export const ParishBeneficiaries = ({ parish }) => {
  const dispatch = useDispatch();
  const { beneficiariesParish } = useSelector((state) => state.parish);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const paginatedBeneficiaryParish = applyPagination(beneficiariesParish, page, rowsPerPage);

  useEffect(() => {
    dispatch(getBeneficiariesByParish(parish.id));
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
        title={`Beneficiarios asociados a ${parish.name}`}
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
                Nombre
              </TableCell>
              <TableCell>
                Localidad
              </TableCell>
              <TableCell>
                Dirección
              </TableCell>
              <TableCell>
                Email
              </TableCell>
              <TableCell>
                Teléfono
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBeneficiaryParish.map((parish) => (
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
        count={beneficiariesParish.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
