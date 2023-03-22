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

const optionsType = [
  {
    id: 'all',
    label: 'Todas las ventas'
  },
  {
    id: 'withDiscount',
    label: 'Con descuento'
  },
  {
    id: 'withoutDiscount',
    label: 'Sin descuento'
  }
];

export const OrdersReportModal = ({ open, handleSelect, handleClose }) => {
  const [optionDate, setOptionDate] = useState('onService');
  const [optionType, setOptionType] = useState('all');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
        Fechas del reporte
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
            value={optionType}
            onChange={(event) => { setOptionType(event.target.value) }}
          >
            {optionsType.map((option) => (
              <MenuItem
                key={option.id}
                value={option.id}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleSelect({startDate, endDate: optionDate === 'onService' ? startDate : endDate, type: optionType})}
          autoFocus
        >
          Seleccionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
