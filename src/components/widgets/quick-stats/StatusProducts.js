import {Box, Card, Grid, Typography} from '@mui/material';

export const StatusProducts = () => (
<Box
  sx={{
    backgroundColor: 'background.default',
    p: 3
  }}
>
  <Card>
    <Grid
      alignItems="center"
      container
      justifyContent="space-between"
    >
      <Grid
        item
        md={3}
        sm={6}
        xs={12}
        sx={{
          borderRight: (theme) => ({
            md: `1px solid ${theme.palette.divider}`
          }),
          borderBottom: (theme) => ({
            md: 'none',
            xs: `1px solid ${theme.palette.divider}`
          }),
          p: 3,
          textAlign: 'center'
        }}
      >
        <Typography
          color="textPrimary"
          variant="h5"
        >
          x unidades
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ mt: 1 }}
          variant="overline"
        >
          Productos vendidos
        </Typography>
      </Grid>
      <Grid
        item
        md={3}
        sm={6}
        xs={12}
        sx={{
          borderRight: (theme) => ({
            md: `1px solid ${theme.palette.divider}`
          }),
          borderBottom: (theme) => ({
            md: 'none',
            xs: `1px solid ${theme.palette.divider}`
          }),
          p: 3,
          textAlign: 'center'
        }}
      >
        <Typography
          color="textPrimary"
          variant="h5"
        >
          "Producto"
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ mt: 1 }}
          variant="overline"
        >
          el más vendido
        </Typography>
      </Grid>
      <Grid
        item
        md={3}
        sm={6}
        xs={12}
        sx={{
          borderRight: (theme) => ({
            md: `1px solid ${theme.palette.divider}`
          }),
          borderBottom: (theme) => ({
            sm: 'none',
            xs: `1px solid ${theme.palette.divider}`
          }),
          p: 3,
          textAlign: 'center'
        }}
      >
        <Typography
          color="textPrimary"
          variant="h5"
        >
          x beneficiarios
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ mt: 1 }}
          variant="overline"
        >
          Beneficiarios atendidos
        </Typography>
      </Grid>
      <Grid
        item
        md={3}
        sm={6}
        xs={12}
        sx={{
          p: 3,
          textAlign: 'center'
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography
            color="textPrimary"
            component="span"
            variant="h5"
          >
            x €uros
          </Typography>
        </Box>
        <Typography
          color="textSecondary"
          sx={{ mt: 1 }}
          variant="overline"
        >
          facturados
        </Typography>
      </Grid>
    </Grid>
  </Card>
</Box>
);
