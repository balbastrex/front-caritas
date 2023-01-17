import {DatePicker} from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  Divider,
  FormHelperText,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import {useFormik} from 'formik';
import PropTypes from 'prop-types';
import {useMemo} from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {Trash as TrashIcon} from '../../../icons/trash';
import {createEvent, deleteEvent} from '../../../slices/calendar';
import {createService, deleteService, updateService} from '../../../slices/service';
import {useDispatch} from '../../../store';

export const CalendarEventDialog = (props) => {
  const { event, onAddComplete, onClose, onDeleteComplete, onEditComplete, open, range, turns } = props;
  const dispatch = useDispatch();
  const initialValues = useMemo(() => {
    if (event) {
      return {
        turnId: event.turnId || 0,
        start: event.start ? new Date(event.start) : new Date(),
        description: event.description || '',
        submit: null,
      };
    }

    if (range) {
      return {
        turnId: 0,
        start: new Date(range.start),
        description: 'Selecciona un turno',
        submit: null,
      };
    }

    return {
      turnId: 0,
      start: new Date(),
      description: '',
      submit: null,
    };
  }, [event, range]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      turnId: Yup.number().required('Debes seleccionar un turno'),
      start: Yup.date(),
      description: Yup.string()
    }),
    onSubmit: async (values, helpers) => {
      try {
        const eventToUpdate = {
          id: event?.id || 0,
          turnId: formik.values.turnId,
          date: formik.values.start
        }

        if (event) {
          await dispatch(updateService(eventToUpdate));
          toast.success('Servicio actualizado!');
        } else {
          await dispatch(createService(eventToUpdate));
          toast.success('Event added!');
        }

        if (!event && onAddComplete) {
          onAddComplete();
        }

        if (event && onEditComplete) {
          onEditComplete();
        }
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleStartDateChange = (date) => {
    formik.setFieldValue('start', date);
  };

  const onChangeTurn = (value) => {
    formik.setFieldValue('turnId', value);
    const turn = turns.find(turn => turn.id === value);

    if (turn) formik.setFieldValue('description', turn.description);
  }

  const handleDelete = async () => {
    try {
      if (!event) {
        return;
      }
      await dispatch(deleteService(event.id));
      onDeleteComplete?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={!!open}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ p: 3 }}>
          <Typography
            align="center"
            gutterBottom
            variant="h5"
          >
            {event
              ? 'Editar Servicio'
              : 'Añadir Servicio'}
          </Typography>
        </Box>
        {
          event && (
            <Box sx={{}}>
              <Typography
                align="center"
                gutterBottom
                variant="h6"
              >
                Economato: {event?.marketName}
              </Typography>
            </Box>)
        }
        <Box sx={{ p: 3 }}>
          <TextField
            defaultValue={formik.values.turnId}
            fullWidth
            label="Turno"
            select
            onChange={(event) => onChangeTurn(event.target.value)}
          >
            {turns.map((turn) => (
              <MenuItem
                key={turn.id}
                value={turn.id}
              >
                {turn.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ mt: 2 }}>
            Descripción: {formik.values.description}
          </Box>
          <Box sx={{ mt: 2 }}>
            <DatePicker
              label="Día"
              disabled={!!event}
              onChange={handleStartDateChange}
              renderInput={(inputProps) => (
                <TextField
                  fullWidth
                  {...inputProps} />
              )}
              inputFormat="dd/MM/yyyy"
              value={formik.values.start}
            />
          </Box>
          {Boolean(formik.touched.end && formik.errors.end) && (
            <Box sx={{ mt: 2 }}>
              <FormHelperText error>
                {formik.errors.end}
              </FormHelperText>
            </Box>
          )}
        </Box>
        <Divider />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            p: 2
          }}
        >
          {event && (
            <IconButton onClick={() => handleDelete()}>
              <TrashIcon fontSize="small" />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={onClose}>
            Cancelar
          </Button>
          <Button
            disabled={formik.isSubmitting}
            sx={{ ml: 1 }}
            type="submit"
            variant="contained"
          >
            Confirmar
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

CalendarEventDialog.propTypes = {
  event: PropTypes.object,
  onAddComplete: PropTypes.func,
  onClose: PropTypes.func,
  onDeleteComplete: PropTypes.func,
  onEditComplete: PropTypes.func,
  open: PropTypes.bool,
  range: PropTypes.object
};
