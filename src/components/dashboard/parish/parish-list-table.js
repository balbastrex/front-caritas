import NextLink from 'next/link';
import { Fragment, useState } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { ChevronDown as ChevronDownIcon } from '../../../icons/chevron-down';
import { ChevronRight as ChevronRightIcon } from '../../../icons/chevron-right';
import { updateMarket } from '../../../slices/market';
import {updateParish} from '../../../slices/parish';
import {useDispatch} from '../../../store';
import { Scrollbar } from '../../scrollbar';

const distributionType = [
  {
    label: 'Dias',
    value: 'dias'
  },
  {
    label: 'Presupuesto',
    value: 'presupuesto'
  }
];

export const ParishListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    parishes,
    parishesCount,
    rowsPerPage,
    ...other
  } = props;
  const dispatch = useDispatch();
  const [openParish, setOpenParish] = useState(null);
  const [editParish, setEditParish] = useState(null);

  const handleOpenParish = (parishId) => {
    setOpenParish((prevValue) => (prevValue === parishId ? null : parishId));
    setEditParish(parishes.find(parish => parish.id === parishId))
  };

  const handleUpdateProduct = async (parish) => {
    setOpenParish(null);

    dispatch(updateParish(editParish));

    toast.success('Parroquia actualizada.');
  };

  const handleCancelEdit = () => {
    setOpenParish(null);
  };

  const handleDeleteProduct = () => {
    toast.error('La parroquia no puede ser eliminada.');
  };

  const onChangeParish = (field, value) => {
    setEditParish({
      ...editParish,
      [field]: value
    });
  }

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
                Ciudad
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
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parishes.map((parish) => {
              const open = parish.id === openParish;

              return (
                <Fragment key={parish.id}>
                  <TableRow
                    hover
                    key={parish.id}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(open && {
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
                      <IconButton onClick={() => handleOpenParish(parish.id)}>
                        {open
                          ? <ChevronDownIcon fontSize="small" />
                          : <><Typography variant="subtitle2">Editar</Typography><ChevronRightIcon fontSize="small" /></>}
                      </IconButton>
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
                            {parish.name}
                          </Typography>
                        </Box>
                      </Box>
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
                    <TableCell align="right">
                      <NextLink
                        href={`/dashboard/parishes/${parish.id}`}
                        passHref
                      >
                        <IconButton component="a">
                          <ArrowRightIcon fontSize="small" />
                        </IconButton>
                      </NextLink>
                    </TableCell>
                  </TableRow>
                  {open && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        sx={{
                          p: 0,
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
                        }}
                      >
                        <CardContent>
                          <Grid
                            container
                            spacing={3}
                          >
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <Typography variant="h6">
                                Aspectos generales
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid
                                container
                                spacing={3}
                              >
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={parish.name}
                                    fullWidth
                                    label="Nombre"
                                    name="name"
                                    onChange={(event) => onChangeParish('name', event.target.value)}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={parish.city}
                                    fullWidth
                                    label="Localidad"
                                    name="city"
                                    onChange={(event) => onChangeParish('city', event.target.value)}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={parish.address}
                                    fullWidth
                                    label="Dirección"
                                    name="address"
                                    onChange={(event) => onChangeParish('address', event.target.value)}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={parish.email}
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    onChange={(event) => onChangeParish('email', event.target.value)}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={parish.phone}
                                    fullWidth
                                    label="Teléfono"
                                    name="phone"
                                    onChange={(event) => onChangeParish('phone', event.target.value)}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={parish.contact}
                                    fullWidth
                                    label="Contacto"
                                    name="contact"
                                    onChange={(event) => onChangeParish('contact', event.target.value)}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            px: 2,
                            py: 1
                          }}
                        >
                          <Button
                            onClick={() => handleUpdateProduct(parish)}
                            sx={{ m: 1 }}
                            type="submit"
                            variant="contained"
                          >
                            Actualizar
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            sx={{ m: 1 }}
                            variant="outlined"
                          >
                            Cancelar
                          </Button>
                          <Button
                            onClick={handleDeleteProduct}
                            color="error"
                            sx={{
                              m: 1,
                              ml: 'auto'
                            }}
                          >
                            Borrar Parroquia
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={parishesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

ParishListTable.propTypes = {
  parishes: PropTypes.array.isRequired,
  parishesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
