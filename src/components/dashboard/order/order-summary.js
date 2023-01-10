import {Box, Button, Container, Grid, Typography} from '@mui/material';
import {format} from 'date-fns';
import numeral from 'numeral';

export const OrderSummary = ({ quantity, total, budget, lastDateOrder}) => {

  const getRest = () => {
    return `${numeral(budget - total).format('0, 0.00')} €`;
  }

  return(
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        position: 'sticky',
        bottom: '10%',
        left: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'right',
        alignContent: 'right',
        borderRadius: 1,
        height: 600,
        width: 210,
        m: 2,
        zIndex: 5
      }}
    >
      <Grid
        container
        display="flex"
        flexDirection="column"
        sx={{
          backgroundColor: 'primary.dark',
          color: 'primary.contrastText',
          borderRadius: 1,
          height: 150,
          width: 200,
          m: 2,
        }}
      >
        <Grid
          sx={{ textAlign: 'center', pt: 1, borderBottom: 2, borderColor: 'primary.contrastText' }}
        >
          <Typography variant="h4" sx={{ mb: 1, }} >
            Notas
          </Typography>
        </Grid>
        <Grid
          sx={{ textAlign: 'center', pt: 2, pl: 2 }}
        >
          <Button
            // onClick={() => onApprove(order.id)}
            size="large"
            style={{ backgroundColor: 'black' }}
          >
            Ver Notas
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        display="flex"
        flexDirection="column"
        sx={{
          backgroundColor: 'primary.dark',
          color: 'primary.contrastText',
          borderRadius: 1,
          height: 150,
          width: 200,
          m: 2,
        }}
      >
        <Grid
          sx={{ textAlign: 'center', pt: 1, borderBottom: 2, borderColor: 'primary.contrastText' }}
        >
          <Typography variant="h4" sx={{ mb: 1, }} >
            Beneficiario
          </Typography>
        </Grid>
        <Grid
          sx={{ textAlign: 'left', pt: 2, pl: 2 }}
        >
          <Typography variant="h6">
            Ayuda: {budget} €
          </Typography>
          <Typography variant="h6">
            Últ.Vta:{format(new Date(lastDateOrder), 'dd/MM/yyyy')}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        display="flex"
        flexDirection="column"
        sx={{
          backgroundColor: total > budget ? 'error.light' : 'primary.dark',
          color: 'primary.contrastText',
          borderRadius: 1,
          height: 170,
          width: 200,
          m: 2,
        }}
      >
        <Grid
          sx={{ textAlign: 'center', pt: 1, borderBottom: 2, borderColor: 'primary.contrastText' }}
        >
          <Typography variant="h4" sx={{ mb: 1 }} >
            Total Venta
          </Typography>
        </Grid>
        <Grid
          sx={{ textAlign: 'left', pt: 2, pl: 2 }}
        >
          <Typography variant="h6">
            NºProductos: {quantity}
          </Typography>
          <Typography variant="h6">
            Importe: {numeral(total).format(`0,0.00`)} €
          </Typography>
          <Typography variant="h6">
            Resta: {getRest()}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
