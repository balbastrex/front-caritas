import NextLink from 'next/link';
import { Fragment, useState, useEffect } from 'react';
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
import {createMarket, updateMarket} from '../../../slices/market';
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

export const MarketListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    markets,
    marketsCount,
    rowsPerPage,
    openNewMarket,
    onCreatedNewMarket,
    ...other
  } = props;
  const dispatch = useDispatch();
  const [openMarket, setOpenMarket] = useState(null);
  const [editMarket, setEditMarket] = useState(null);

  useEffect(() => {
    if (openNewMarket) {
      handleOpenMarket(0)
    }
  }, [openNewMarket])

  const handleOpenMarket = (marketId) => {
    setOpenMarket((prevValue) => (prevValue === marketId ? null : marketId));
    setEditMarket(markets.find(market => market.id === marketId))
  };

  const handleUpdateProduct = async (market) => {
    setOpenMarket(null);

    if (editMarket.id === 0) {
      dispatch(createMarket(editMarket));
      onCreatedNewMarket(true);
      toast.success('Economato creado.');
      return;
    }

    dispatch(updateMarket(editMarket));

    toast.success('Economato actualizado.');
  };

  const handleCancelEdit = () => {
    setOpenMarket(null);
    onCreatedNewMarket(false);
  };

  const handleDeleteProduct = () => {
    toast.error('Un economato no puede ser borrado.');
  };

  const onChangeMarket = (field, value) => {
    setEditMarket({
      ...editMarket,
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
                1ª Persona
              </TableCell>
              <TableCell>
                Inc.Adulto
              </TableCell>
              <TableCell>
                Inc.Niño
              </TableCell>
              <TableCell>
                % Producto
              </TableCell>
              <TableCell>
                Email
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {markets.map((market) => {
              const open = market.id === openMarket;

              return (
                <Fragment key={market.id}>
                  <TableRow
                    hover
                    key={market.id}
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
                      <IconButton onClick={() => handleOpenMarket(market.id)}>
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
                            {market.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {numeral(market.budgetBase).format(`${market.currency}0,0.00`)} €
                    </TableCell>
                    <TableCell>
                      {numeral(market.budgetAdult).format(`${market.currency}0,0.00`)} €
                    </TableCell>
                    <TableCell>
                      {numeral(market.budgetChild).format(`${market.currency}0,0.00`)} €
                    </TableCell>
                    <TableCell>
                      <LinearProgress
                        value={market.productPercentage}
                        variant="determinate"
                        color={market.productPercentage >= 50 ? 'success' : 'error'}
                        sx={{
                          height: 15,
                          width: 76
                        }}
                      />
                      <Typography
                        color="textSecondary"
                        variant="body2"
                      >
                        {market.productPercentage}
                        {'%'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {market.email}
                    </TableCell>
                    <TableCell align="right">
                      <NextLink href={`/dashboard/markets/${market.id}`} passHref legacyBehavior>
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
                                    defaultValue={market.name}
                                    fullWidth
                                    label="Nombre"
                                    name="name"
                                    onChange={(event) => onChangeMarket('name', event.target.value)}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={market.address}
                                    fullWidth
                                    label="Dirección"
                                    name="address"
                                    onChange={(event) => onChangeMarket('address', event.target.value)}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={market.email}
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    onChange={(event) => onChangeMarket('email', event.target.value)}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={market.phone}
                                    fullWidth
                                    label="Teléfono"
                                    name="phone"
                                    onChange={(event) => onChangeMarket('phone', event.target.value)}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={market.distributionType}
                                    fullWidth
                                    label="Distribución"
                                    select
                                    onChange={(event) => onChangeMarket('distributionType', event.target.value)}
                                  >
                                    {distributionType.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={market.expenses}
                                    fullWidth
                                    label="Gasto mensual"
                                    name="expenses"
                                    onChange={(event) => onChangeMarket('expenses', event.target.value)}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                            >
                              <Typography variant="h6">
                                Aspectos económicos
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid
                                container
                                spacing={3}
                              >
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={market.productPercentage}
                                    fullWidth
                                    label="% Producto"
                                    name="productPercentage"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          {market.currency}
                                        </InputAdornment>
                                      )
                                    }}
                                    type="number"
                                    onChange={(event) => onChangeMarket('productPercentage', event.target.value)}
                                  />
                                </Grid>
                              </Grid>
                              <Grid
                                item
                                md={12}
                                xs={12}
                                mt={2}
                              >
                                <Typography variant="h6">
                                  Incremento presupuesto
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
                                      defaultValue={market.budgetBase}
                                      fullWidth
                                      label="1ª Persona"
                                      name="budgetBase"
                                      onChange={(event) => onChangeMarket('budgetBase', event.target.value)}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={12}
                                    xs={12}
                                  >
                                    <TextField
                                      defaultValue={market.budgetAdult}
                                      fullWidth
                                      label="Adulto"
                                      name="budgetAdult"
                                      onChange={(event) => onChangeMarket('budgetAdult', event.target.value)}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={12}
                                    xs={12}
                                  >
                                    <TextField
                                      defaultValue={market.budgetChild}
                                      fullWidth
                                      label="Niño"
                                      name="budgetChild"
                                      onChange={(event) => onChangeMarket('budgetChild', event.target.value)}
                                    />
                                  </Grid>
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
                            onClick={() => handleUpdateProduct(market)}
                            sx={{ m: 1 }}
                            type="submit"
                            variant="contained"
                          >
                            {
                              market.id === 0 ? 'Crear' : 'Actualizar'
                            }
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            sx={{ m: 1 }}
                            variant="outlined"
                          >
                            Cancelar
                          </Button>
                          {/*<Button
                            onClick={handleDeleteProduct}
                            color="error"
                            sx={{
                              m: 1,
                              ml: 'auto'
                            }}
                          >
                            Borrar Economato
                          </Button>*/}
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={marketsCount}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Scrollbar>
    </div>
  );
};

MarketListTable.propTypes = {
  markets: PropTypes.array.isRequired,
  marketsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  onCreatedNewMarket: PropTypes.func,
  openNewMarket: PropTypes.bool,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
