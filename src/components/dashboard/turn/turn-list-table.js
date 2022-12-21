import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Fragment} from 'react';
import {useAuth} from '../../../hooks/use-auth';
import {UserProfiles} from '../../../utils/constants';
import {Scrollbar} from '../../scrollbar';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';

export const TurnListTable = (props) => {
  const { user } = useAuth();
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    turns,
    turnsCount,
    rowsPerPage,
    handleBeneficiariesReport,
    ...other
  } = props;

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
                Descripción
              </TableCell>
              <TableCell>
                Economato
              </TableCell>
              <TableCell>
                Nº de beneficiarios
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {turns.map((turn) => {

              return (
                <Fragment key={turn.id}>
                  <TableRow
                    hover
                    key={turn.id}
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
                            {turn.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {turn.description}
                    </TableCell>
                    <NextLink
                      href={`/dashboard/markets/${turn.marketId}/edit`}
                      passHref
                    >
                      <TableCell sx={{ cursor: 'pointer' }} >
                        {turn.marketName}
                      </TableCell>
                    </NextLink>
                    <TableCell>
                      {turn.beneficiariesNumber}
                    </TableCell>
                    <TableCell align="right">
                      {
                        user?.profileId === UserProfiles.DIRECTOR_ECONOMATO && (
                          <NextLink
                            href={`/dashboard/turns/${turn.id}/edit`}
                            passHref
                          >
                            <IconButton component="a">
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </NextLink>
                        )
                      }
                      <IconButton
                        component="a"
                        onClick={() => handleBeneficiariesReport(turn)}
                      >
                        <PrintIcon fontSize="small" />
                      </IconButton>
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
        count={turnsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

TurnListTable.propTypes = {
  turns: PropTypes.array.isRequired,
  turnsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
