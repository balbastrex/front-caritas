import {Box, Button, Dialog, Typography} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {PDFViewer} from '@react-pdf/renderer';
import {format} from 'date-fns';
import {useEffect, useState} from 'react';
import {ArrowLeft as ArrowLeftIcon} from '../../../../icons/arrow-left';
import axios from '../../../../utils/axios';
import {PeriodReportPdf} from './period-report-pdf';

export const PeriodReportDialog = ({ open, close, data }) => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (data.startDate !== null && data.endDate !== null) {
        setLoading(true);
        const formattedStartDate = format(data.startDate, "yyyy-MM-dd")
        const formattedEndDate = format(data.endDate, "yyyy-MM-dd")

        const response = await axios.get('/api/v1/report/memory-period', {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
        setResponseData({ data: response.data, startDate: data.startDate, endDate: data.endDate});
        setLoading(false)
      }
    }
    fetchData();
  }, [data]);


  return (
    <Dialog
      fullScreen
      open={open}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.default',
            p: 2,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              left: '20px'
            }}
          >
            <Button
              startIcon={<ArrowLeftIcon fontSize="small" />}
              onClick={close}
              variant="contained"
            >
              Volver
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h4">
              Memoria Periodo
            </Typography>
          </Box>
        </Box>
        {
          loading && (
            <Box sx={{ position: 'absolute', top: '50%', left: '50%' }}>
              <CircularProgress />
            </Box>
          )
        }
        {
          !!responseData && loading === false && (
            <Box sx={{ flexGrow: 1 }}>
              <PDFViewer
                height="100%"
                style={{ border: 'none' }}
                width="100%"
                showToolbar={true}
              >
                <PeriodReportPdf
                  data={responseData.data}
                  startDate={responseData.startDate}
                  endDate={responseData.endDate}
                />
              </PDFViewer>
            </Box>
          )
        }
      </Box>
    </Dialog>
  )
}
