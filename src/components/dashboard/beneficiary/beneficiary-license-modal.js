import { Avatar, Box, Button, Container, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/WarningOutlined';

export const BeneficiaryLicenseModal = ({ handleClose, license }) => (
<Box
  sx={{
    position: 'absolute',
    minHeight: '50%',
    top: {
      md: '35%',
      lg: '35%'
    },
    height: '50%',
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
            Beneficiario creado con éxito.
          </Typography>
          <Typography
            color="contrastText"
            sx={{ mt: 1 }}
            variant="body2"
          >
            Licencia: {license}
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
          variant="contained"
          onClick={handleClose}
        >
          Cerrar
        </Button>
      </Box>
    </Paper>
  </Container>
</Box>
);
