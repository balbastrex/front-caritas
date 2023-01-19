import CloseIcon from '@mui/icons-material/Close';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import PropTypes from 'prop-types';

export const ShowBeneficiaryNotesModal = ({ notes, handleClose }) => {

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      minWidth: '600px',
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <BootstrapDialog
      sx={ { minWidth: 200 } }
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Notas del beneficiario
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {
          notes.map((note) => (
            <li>
              {note}
            </li>
          ))
        }
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cerrar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
