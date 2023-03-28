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

export const ParishOrdersReportModal = ({ open, handleSelect, handleClose }) => {
  const dispatch = useDispatch();
  const { parishList } = useSelector((state) => state.parish);
  const [selectedParish, setSelectedParish] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [optionType, setOptionType] = useState('all');

  useEffect(() => {
    dispatch(getParishes());
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
        Informes de Pedidos por Parroquia
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Selecciona las fechas para generar el reporte
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
            label="Parroquia asociada"
            select
            name="parishId"
            onChange={(parishId) => { setSelectedParish(parishId.target.value) }}
          >
            <MenuItem
              key={0}
              value={0}
            >
              Todas
            </MenuItem>
            {parishList.map((parish) => (
              <MenuItem
                key={parish.id}
                value={parish.id}
              >
                {parish.name}
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
        </Box>
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
          onClick={() => handleSelect({startDate, endDate, parishId: selectedParish, type: optionType})}
          autoFocus
        >
          Seleccionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
