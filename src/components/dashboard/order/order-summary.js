import {Box, Grid, Typography} from '@mui/material';
import numeral from 'numeral';

export const OrderSummary = ({ quantity, total}) => {

  return(
    /*<Box
      sx={{
        position: 'sticky',
        bottom: 20,
        right: 20,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'right',
        mx: -1,
        mb: -1,
        mt: 3,
        zIndex: 5
      }}
    >*/
      <Grid
        container
        spacing={3}
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
          backgroundColor: 'primary.dark',
          color: 'primary.contrastText',
          borderRadius: 1,
          height: 150,
          width: 200,
          m: 2,
          // mb: 10,
          zIndex: 5
        }}
      >
        <Grid
          // item
          sx={{ textAlign: 'center', pt: 2 }}
        >
          <Typography variant="h4" sx={{ mb: 2, textDecoration: 'underline' }} >
            Total Venta
          </Typography>
        </Grid>
        <Grid
          // item
          sx={{ textAlign: 'left', pt: 2, pl: 2 }}
        >
          <Typography variant="h6">
            NºProductos: {quantity}
          </Typography>
          <Typography variant="h6">
            Importe: {numeral(total).format(`0,0.00`)} €
          </Typography>
        </Grid>
      </Grid>
    // </Box>
  )
}
