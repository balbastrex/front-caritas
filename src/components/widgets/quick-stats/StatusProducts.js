import {Box, Card, Grid, Typography} from '@mui/material';
import {useEffect, useState} from "react";
import {format} from "date-fns";
import axios from "../../../utils/axios";

export const StatusProducts = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/v1/report/week');
      setResponseData(response.data);
    }
    fetchData();
  }, []);

  return (
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
              {responseData?.numberOfOrders}
            </Typography>
            <Typography
              color="textSecondary"
              sx={{mt: 1}}
              variant="overline"
            >
              Ventas realizadas
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
              variant="h6"
            >
              {responseData?.mostSold.product}({responseData?.mostSold.units})
            </Typography>
            <Typography
              color="textSecondary"
              sx={{mt: 1}}
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
              {responseData?.amountBeneficiariesUF}
            </Typography>
            <Typography
              color="textSecondary"
              sx={{mt: 1}}
              variant="overline"
            >
              Núm.Beneficiarios (UF)
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
                {responseData?.totalAmountOrders} €
              </Typography>
            </Box>
            <Typography
              color="textSecondary"
              sx={{mt: 1}}
              variant="overline"
            >
              facturados
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
};
