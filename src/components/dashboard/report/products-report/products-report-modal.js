import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Grid, MenuItem,
  TextField,
} from '@mui/material';
import {useEffect, useState} from 'react';
import {getParishes} from '../../../../slices/parish';
import {getProducts} from '../../../../slices/product';
import {useDispatch, useSelector} from '../../../../store';

const optionsDate = [
  {
    id: 'onService',
    label: 'Un servicio determinado'
  },
  {
    id: 'onDate',
    label: 'Entre dos fechas'
  }
];

const optionsProduct = [
  {
    id: 'allProducts',
    label: 'Todos los productos'
  },
  {
    id: 'product',
    label: 'Un Producto específico'
  }
];

export const ProductsReportModal = ({ open, handleSelect, handleClose }) => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);

  const [optionDate, setOptionDate] = useState('onService');
  const [optionProduct, setOptionProduct] = useState(optionsProduct[0].id);
  const [productSelected, setProductSelected] = useState({ productId: 0, productName: '' });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleStartDateChange = (startDate) => {
    setStartDate(startDate);
  };

  const handleEndDateChange = (endDate) => {
    setEndDate(endDate);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Informes de Producto
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Selecciona las opciones para generar el reporte
        </DialogContentText>
        <Grid
          mt={2}
          item
          md={6}
          xs={12}
        >
          <TextField
            defaultValue={0}
            fullWidth
            label="Fecha/s"
            select
            name="parishId"
            value={optionDate}
            onChange={(event) => { setOptionDate(event.target.value) }}
          >
            {optionsDate.map((option) => (
              <MenuItem
                key={option.id}
                value={option.id}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Box sx={{mt: 2}}>
          <DatePicker
            label="Desde"
            inputFormat="dd/MM/yyyy"
            onChange={handleStartDateChange}
            renderInput={(inputProps) => (
              <TextField
                fullWidth
                {...inputProps} />
            )}
            value={startDate}
          />
        </Box>
        {
          optionDate === 'onDate' && (
          <Box sx={{mt: 2}}>
            <DatePicker
              label="Hasta"
              inputFormat="dd/MM/yyyy"
              onChange={handleEndDateChange}
              renderInput={(inputProps) => (
                <TextField
                  fullWidth
                  {...inputProps} />
              )}
              value={endDate}
            />
          </Box>)
        }
        <Grid
          mt={2}
          item
          md={6}
          xs={12}
        >
          <TextField
            defaultValue={0}
            fullWidth
            label="Tipo de Venta"
            select
            name="optionType"
            value={optionProduct}
            onChange={(event) => { setOptionProduct(event.target.value) }}
          >
            {optionsProduct.map((option) => (
              <MenuItem
                key={option.id}
                value={option.id}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {
          optionProduct === 'product' && (
            <Grid
              mt={2}
              item
              md={6}
              xs={12}
            >
              <TextField
                defaultValue={0}
                fullWidth
                label="Producto"
                select
                name="optionType"
                value={productSelected.productId}
                onChange={(event) => {
                  setProductSelected({ productId: event.target.value, productName: productList.find((product) => product.id === event.target.value).name })
                }}
              >
                {productList.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>)
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleSelect({startDate, endDate: optionDate === 'onService' ? startDate : endDate, type: optionProduct, product: productSelected})}
          autoFocus
        >
          Seleccionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
