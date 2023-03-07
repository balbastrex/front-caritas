import {DatePicker} from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import {useEffect, useState} from 'react';
import axios from '../../../../utils/axios';

export const ParishOrdersReportModal = ({ open, handleSelect, handleClose }) => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
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
          Selecciona las fechas para generar el reporte
        </DialogContentText>
        <Box sx={{mt: 2}}>
          <DatePicker
            label="Desde"
            onChange={handleStartDateChange}
            renderInput={(inputProps) => (
              <TextField
                fullWidth
                {...inputProps} />
            )}
            inputFormat="dd/MM/yyyy"
            value={startDate}
          />
        </Box>
        <Box sx={{mt: 2}}>
          <DatePicker
            label="Hasta"
            onChange={handleEndDateChange}
            renderInput={(inputProps) => (
              <TextField
                fullWidth
                {...inputProps} />
            )}
            inputFormat="dd/MM/yyyy"
            value={endDate}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleSelect({startDate, endDate})}
          autoFocus
        >
          Seleccionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
