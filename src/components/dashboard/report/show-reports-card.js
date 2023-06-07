import {Box, Grid} from '@mui/material';
import {useAuth} from '../../../hooks/use-auth';
import {ReportCard} from './report-card';
import {UserProfiles} from '../../../utils/constants';

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
    cover: '/static/report/parish-orders.png',
    title: 'Pedidos por Parroquia',
  },
  {
    id: 'orders-reports',
    cover: '/static/report/orders-report.png',
    title: 'Informes de Ventas',
  },
  {
    id: 'product-reports',
    cover: '/static/report/products-report.png',
    title: 'Ventas por Producto',
  },
  {
    id: 'period-reports',
    cover: '/static/report/products-report.png',
    title: 'Memoria Periodo',
  }
];

const reportPermissions = {
  'order-sheet': [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  'parish-orders-list': [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO, UserProfiles.GESTOR_PARROQUIA],
  'orders-reports': [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  'product-reports': [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
  'period-reports': [UserProfiles.ADMINISTRADOR, UserProfiles.DIRECTOR_ECONOMATO],
}

const hasPermissionReport = (reportId) => {
  const { user } = useAuth();
  return reportPermissions[reportId].includes(user?.profileId);
}

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
        hasPermissionReport(report.id) && (
            <ReportCard
              key={report.id}
              report={report}
              defaultData={'UF1'}
              onPrint={onPrint}
            />)
      ))}
    </Grid>
  </Box>
);
