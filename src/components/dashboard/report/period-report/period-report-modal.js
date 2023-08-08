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
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useState} from 'react';
import {useDispatch} from '../../../../store';

export const PeriodReportModal = ({ open, handleSelect, handleClose }) => {
  const dispatch = useDispatch();

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
        Memoria Periodo
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Selecciona las opciones para generar el reporte
        </DialogContentText>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleSelect({startDate, endDate })}
          autoFocus
        >
          Seleccionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
