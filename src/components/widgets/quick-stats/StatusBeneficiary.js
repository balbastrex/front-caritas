import {Box, Card, Grid, LinearProgress, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {getTurnsForMarket} from '../../../slices/turn';
import {useDispatch, useSelector} from '../../../store';

export const StatusBeneficiary = () => {
  const dispatch = useDispatch();
  const { turnList } = useSelector((state) => state.turn);
  const { BeneficiaryNeedsPrintList } = useSelector((state) => state.beneficiary);
  const [activeBeneficiaries, setActiveBeneficiaries] = useState(0);

  const getActiveBeneficiaries = () => {
    if (BeneficiaryNeedsPrintList.expired === 0) return 100;

    const activePercentage = (BeneficiaryNeedsPrintList.total - BeneficiaryNeedsPrintList.expired) * 100 / BeneficiaryNeedsPrintList.total;
    return Math.floor(activePercentage);
  }

  useEffect(() => {
    dispatch(getTurnsForMarket());
  }, [dispatch]);

  useEffect(() => {
    setActiveBeneficiaries(getActiveBeneficiaries());
  }, [BeneficiaryNeedsPrintList]);

  return (
    <Box
    sx={{
      backgroundColor: 'background.default',
      p: 3,
    }}
  >
    <Grid
      container
      spacing={3}
    >
      {
        turnList.length > 0 && turnList.map((marketTurn) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
          >
            <Card
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                p: 3,
              }}
            >
              <Box sx={{flexGrow: 1}}>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="overline"
                >
                  {marketTurn.description}
                </Typography>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography
                    sx={{mr: 1}}
                    variant="h5"
                  >
                    {marketTurn.beneficiariesNumber}
                  </Typography>
                </Box>
              </Box>
            </Card>
        </Grid>
        ))
      }
      <Grid
        item
        xs={12}
        md={6}
        lg={3}
      >
        <Card sx={{p: 3}}>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Beneficiarios Activos
          </Typography>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <Typography
              sx={{mr: 1}}
              variant="h5"
            >
              {activeBeneficiaries}%
            </Typography>
            <Box sx={{flexGrow: 1}}>
              <LinearProgress
                color="primary"
                value={activeBeneficiaries}
                variant="determinate"
              />
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  </Box>)
};
