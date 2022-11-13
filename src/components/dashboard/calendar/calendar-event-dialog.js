import {Label} from '@mui/icons-material';
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
import {format} from 'date-fns';
import {useFormik} from 'formik';
import PropTypes from 'prop-types';
import {useMemo} from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {Trash as TrashIcon} from '../../../icons/trash';
import {createEvent, deleteEvent, updateEvent} from '../../../slices/calendar';
import {useDispatch} from '../../../store';

export const CalendarEventDialog = (props) => {
  const { event, onAddComplete, onClose, onDeleteComplete, onEditComplete, open, range, turns } = props;
  const dispatch = useDispatch();
  const initialValues = useMemo(() => {
    if (event) {
      return {
        allDay: event.allDay || false,
        color: event.color || '',
        description: event.description || '',
        start: event.start ? new Date(event.start) : new Date(),
        marketName: event.marketName || '',
        submit: null,
        turnId: event.turnId || 0,
      };
    }

    if (range) {
      return {
        allDay: false,
        color: '',
        description: '',
        start: new Date(range.start),
        marketName: '',
        submit: null,
        turnId: 0,
      };
    }

    return {
      allDay: false,
      color: '',
      description: '',
      start: new Date(),
      marketName: '',
      submit: null,
      turnId: 0,
    };
  }, [event, range]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      allDay: Yup.bool(),
      description: Yup.string().max(5000),
      marketName: Yup.string().max(5000),
      start: Yup.date(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const data = {
          allDay: values.allDay,
          description: values.description,
          end: values.end.getTime(),
          start: values.start.getTime(),
          title: values.title
        };

        if (event) {
          await dispatch(updateEvent(event.id, data));
          toast.success('Event updated!');
        } else {
          await dispatch(createEvent(data));
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

  const handleDelete = async () => {
    try {
      if (!event) {
        return;
      }

      await dispatch(deleteEvent(event.id));
      onDeleteComplete?.();
    } catch (err) {
      console.error(err);
    }
  };
  console.log(event?.description)
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
              ? 'Edit Event'
              : 'Add Event'}
          </Typography>
        </Box>
        <Box sx={{  }}>
          <Typography
            align="center"
            gutterBottom
            variant="h6"
          >
            Economato: {event?.marketName}
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <TextField
            defaultValue={formik.values.turnId}
            fullWidth
            label="Turno"
            select
            onChange={formik.handleChange}
            // onChange={(event) => onChangeBeneficiary('gender', event.target.value)}
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
            Descripción: {event?.description}
          </Box>
          <Box sx={{ mt: 2 }}>
            {/*Fecha: {event ? format(new Date(event?.start), 'dd/MM/yyyy') : ''}*/}
            <DatePicker
              label="Día"
              disabled
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
