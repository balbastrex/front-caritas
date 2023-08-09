import { Box, Card, CardHeader, Divider, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DotsHorizontal as DotsHorizontalIcon } from '../../../icons/dots-horizontal';
import { Chart } from '../../chart';
import {useEffect, useState} from "react";
import axios from "../../../utils/axios";

const data = {
  series: [
    {
      color: '#169BE0',
      data: 56,
      name: 'Subscriptions'
    },
    {
      color: '#DB9846',
      data: 24,
      name: 'Affiliate'
    },
    {
      color: '#FF5C7C',
      data: 20,
      name: 'Sales'
    }
  ]
};

export const ParishOrdersWeek = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/v1/report/parish-week');
      setResponseData(response.data);
    }
    fetchData();
  }, []);

  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: data.series.map((item) => item.color),
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
    },
    labels: responseData?.map((item) => item.parishName),
    legend: {
      show: false
    },
    stroke: {
      show: false
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  if (!responseData) return null;

  const chartSeries = responseData.map((item) => item.numOrders);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        p: 3
      }}
    >
      <Card>
        <CardHeader
          action={(
            <IconButton>
              <DotsHorizontalIcon fontSize="small" />
            </IconButton>
          )}
          title="Por Parroquia"
        />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Chart
            height={300}
            options={chartOptions}
            series={chartSeries}
            type="donut"
          />
        </Box>
        <Divider />
        <Box sx={{ display: 'flex' }}>
          {responseData.map((item) => (
            <Box
              key={item.name}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                justifyContent: 'center',
                px: 2,
                py: 3,
                textAlign: 'center',
                '&:not(:last-of-type)': {
                  borderRight: 1,
                  borderColor: 'divider'
                }
              }}
            >
              <Typography variant="h4">
                {item.numOrders}
              </Typography>
              <Typography
                color="textSecondary"
                variant="overline"
              >
                {item.parishName}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>
    </Box>
  );
};
