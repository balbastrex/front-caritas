import {Box, Grid} from '@mui/material';
import {ReportCard} from './report-card';

const reports = [
  {
    id: 'order-sheet',
    cover: '/static/report/order-sheet.png',
    title: 'Hoja de Pedido por UF',
    options: [
      {
        id: 'q1',
        value: 'UF1'
      },
      {
        id: 'q2',
        value: 'UF2'
      },
      {
        id: 'q3',
        value: 'UF3'
      },
      {
        id: 'q4',
        value: 'UF4'
      },
      {
        id: 'q5',
        value: 'UF5'
      },
      {
        id: 'q6',
        value: 'UF6'
      },
    ]
  },
  {
    id: 'parish-orders-list',
    cover: '/static/report/order-sheet.png',
    title: 'Listado de Pedidos por Parroquia',
  }
];

export const ShowReportsCard = ({ onPrint }) => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      minHeight: '100%',
      p: 3,
    }}
  >
    <Grid
      container
      spacing={3}
    >
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          defaultData={'UF1'}
          onPrint={onPrint}
        />
      ))}
    </Grid>
  </Box>
);
