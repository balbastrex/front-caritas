import { Avatar, Box, Button, Container, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/WarningOutlined';

export const CloseCartModal = ({ handleClose, handleCloseCart }) => (
<Box
  sx={{
    backgroundColor: 'background.default',
    minHeight: '100%',
    p: 3
  }}
>
  <Container maxWidth="sm">
    <Paper elevation={12}>
      <Box
        sx={{
          display: 'flex',
          pb: 2,
          pt: 3,
          px: 3
        }}
      >
        <Avatar
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
            color: 'error.main',
            mr: 2
          }}
        >
          <WarningIcon fontSize="small" />
        </Avatar>
        <div>
          <Typography variant="h5">
            Cierre de Caja
          </Typography>
          <Typography
            color="textSecondary"
            sx={{ mt: 1 }}
            variant="body2"
          >
           ¿Está seguro que desea cerrar la caja?
           Esto implica que no se podrán realizar más ventas, además se cerrarán las ventas Abiertas.
           Se generará un reporte de cierre de caja.
          </Typography>
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          px: 3,
          py: 1.5
        }}
      >
        <Button
          sx={{ mr: 2 }}
          variant="outlined"
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button
          sx={{
            backgroundColor: 'error.main',
            '&:hover': {
              backgroundColor: 'error.dark'
            }
          }}
          variant="contained"
          onClick={handleCloseCart}
        >
          Cerrar Caja
        </Button>
      </Box>
    </Paper>
  </Container>
</Box>
);
