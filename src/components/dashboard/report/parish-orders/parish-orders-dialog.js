import {Box, Button, Dialog, Typography} from '@mui/material';
import {PDFViewer} from '@react-pdf/renderer';
import {format} from 'date-fns';
import {useEffect, useState} from 'react';
import {ArrowLeft as ArrowLeftIcon} from '../../../../icons/arrow-left';
import axios from '../../../../utils/axios';
import {ParishOrdersPDF} from './parish-orders-pdf';

export const ParishOrdersDialog = ({ open, close, data }) => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (data.startDate !== null && data.endDate !== null) {
        const formattedStartDate = format(data.startDate, "yyyy-MM-dd")
        const formattedEndDate = format(data.endDate, "yyyy-MM-dd")

        const response = await axios.post('/api/v1/receipt/parish-report', {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          parishId: data.parishId
        });
        setResponseData(response.data);
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
              Pedidos por parroquia
            </Typography>
          </Box>
        </Box>
        {
          !!responseData && (
            <Box sx={{ flexGrow: 1 }}>
              <PDFViewer
                height="100%"
                style={{ border: 'none' }}
                width="100%"
                showToolbar={true}
              >
                <ParishOrdersPDF parishOrders={responseData} />
              </PDFViewer>
            </Box>
          )
        }
      </Box>
    </Dialog>
  )
}
