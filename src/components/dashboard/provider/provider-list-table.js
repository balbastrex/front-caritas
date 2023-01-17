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
import {Scrollbar} from '../../scrollbar';

export const ProviderListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    providers,
    providersCount,
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
              <TableCell width="25%">
                Nombre
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {providers.map((provider) => {

              return (
                <Fragment key={provider.id}>
                  <TableRow
                    hover
                    key={provider.id}
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
                            {provider.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <NextLink
                        href={`/dashboard/providers/${provider.id}/edit`}
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
        count={providersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

ProviderListTable.propTypes = {
  providers: PropTypes.array.isRequired,
  providersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
