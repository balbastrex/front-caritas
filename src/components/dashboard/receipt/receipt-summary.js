import {Box, Grid, Typography} from '@mui/material';
import numeral from 'numeral';

export const ReceiptSummary = ({ quantity, total, totalReceipt}) => {

  const getRest = () => {
    return `${numeral(totalReceipt - total).format('0, 0.00')}€`;
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
        height: 500,
        width: 160,
        m: 2,
        zIndex: 5
      }}
    >
      <Grid
        container
        display="flex"
        flexDirection="column"
        sx={{
          backgroundColor: total > totalReceipt ? 'error.light' : 'primary.dark',
          color: 'primary.contrastText',
          borderRadius: 1,
          height: 170,
          width: 150,
          m: 2,
        }}
      >
        <Grid
          sx={{ textAlign: 'center', pt: 1, borderBottom: 2, borderColor: 'primary.contrastText' }}
        >
          <Typography variant="h4" sx={{ mb: 1 }} >
            Albarán
          </Typography>
        </Grid>
        <Grid
          sx={{ textAlign: 'left', pt: 2, pl: 2 }}
        >
          <Typography variant="h6">
            Lineas: {quantity}
          </Typography>
          <Typography variant="h6">
            T: {numeral(total).format(`0,0.00`)}€
          </Typography>
          <Typography variant="h6">
            R: {getRest()}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
