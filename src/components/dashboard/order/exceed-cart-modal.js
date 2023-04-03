import { Avatar, Box, Button, Container, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/WarningOutlined';

export const ExceedCartModal = ({ handleClose, handleCloseCart, stock = false }) => (
<Box
  sx={{
    position: 'absolute',
    minHeight: '100%',
    top: {
      md: '75%',
      lg: '67%'
    },
    height: '100%',
    width: {
      md: '75%',
      lg: '50%',
    },
    p: 3,
    zIndex: 1000
  }}
>
  <Container maxWidth="sm">
    <Paper elevation={12} sx={{ backgroundColor: 'primary.dark' }}>
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
            {
              stock ? 'Stock insuficiente' : 'Cantidad excedida'
            }
          </Typography>
          <Typography
            color="contrastText"
            sx={{ mt: 1 }}
            variant="body2"
          >
            {
              stock ? 'No hay suficiente stock para este producto.' : 'Este producto ya excede la cantidad permitida para este beneficiario.'
            }
           ¿Quieres añadir otra unidad?
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
          Añadir exceso
        </Button>
      </Box>
    </Paper>
  </Container>
</Box>
);
