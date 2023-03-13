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
import {ArrowRight as ArrowRightIcon} from '../../../icons/arrow-right';
import {getProfileName} from '../../../utils/constants';
import {Scrollbar} from '../../scrollbar';
import {SeverityPill} from '../../severity-pill';

export const UserListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    users,
    usersCount,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell width="15%">
                Rol
              </TableCell>
              <TableCell width="25%">
                Nombre
              </TableCell>
              <TableCell>
                Apellidos
              </TableCell>
              <TableCell>
                Teléfono
              </TableCell>
              <TableCell>
                Email
              </TableCell>
              <TableCell align="center">
                Activo
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {

              return (
                <Fragment key={user.id}>
                  <TableRow
                    hover
                    key={user.id}
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
                      width="15%"
                    >
                      <SeverityPill color='info'>
                        {getProfileName(user.profileId)}
                      </SeverityPill>
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
                            {user.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {user.lastName}
                    </TableCell>
                    <TableCell>
                      {user.phone}
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell align="center">
                      <SeverityPill color={user.isActive ? 'success' : 'warning'}>
                        {user.isActive ? 'Sí' : 'No'}
                      </SeverityPill>
                    </TableCell>
                    <TableCell align="right">
                      <NextLink href={`/dashboard/users/${user.id}/edit`} passHref legacyBehavior>
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
        count={usersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

UserListTable.propTypes = {
  users: PropTypes.array.isRequired,
  usersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
