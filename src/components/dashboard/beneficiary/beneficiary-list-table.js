import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow, Tooltip,
  Typography,
} from '@mui/material';
import {format} from 'date-fns';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {Fragment} from 'react';
import {Scrollbar} from '../../scrollbar';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

export const BeneficiaryListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    beneficiaries,
    beneficiariesCount,
    rowsPerPage,
    handleBeneficiaryLicense,
    ...other
  } = props;
  const router = useRouter();

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                Carnet
              </TableCell>
              <TableCell width="25%">
                Nombre
              </TableCell>
              <TableCell>
                Parroquia
              </TableCell>
              <TableCell>
                Caducidad
              </TableCell>
              <TableCell>
                Presupuesto
              </TableCell>
              <TableCell>
                U.F.
              </TableCell>
              <TableCell>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beneficiaries.map((beneficiary) => {
              return (
                <Fragment key={beneficiary.id}>
                  <TableRow
                    hover
                    key={beneficiary.id}
                  >
                    <TableCell
                      padding="checkbox"
                      width="25%"
                    >
                    </TableCell>
                    <TableCell>
                      {beneficiary.license}
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
                            {`${beneficiary.name} ${beneficiary.lastname1} ${beneficiary.lastname2}`}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {beneficiary.parishName}
                    </TableCell>
                    <TableCell>
                      {format(new Date(beneficiary.expires), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      {beneficiary.budget}
                    </TableCell>
                    <TableCell>
                      {beneficiary.familyUnit}
                    </TableCell>
                    <TableCell align="right">
                      <NextLink
                        href={`/dashboard/beneficiaries/${beneficiary.id}/edit`}
                        passHref
                      >
                        <Tooltip title="Editar">
                          <IconButton component="a">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </NextLink>
                      <Tooltip title="Imprimir carnet">
                        <IconButton
                          component="a"
                          onClick={() => handleBeneficiaryLicense(beneficiary)}
                        >
                          <PrintIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Mostrar ventas">
                        <IconButton
                          component="a"
                          onClick={() => router.push(`/dashboard/invoices/beneficiary/${beneficiary.id}`) }
                        >
                          <ListAltOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
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
        count={beneficiariesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

BeneficiaryListTable.propTypes = {
  beneficiaries: PropTypes.array.isRequired,
  beneficiariesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
