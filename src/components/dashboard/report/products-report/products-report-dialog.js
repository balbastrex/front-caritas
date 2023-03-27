import {Box, Button, Dialog, Typography} from '@mui/material';
import {PDFViewer} from '@react-pdf/renderer';
import {format} from 'date-fns';
import {useEffect, useState} from 'react';
import {ArrowLeft as ArrowLeftIcon} from '../../../../icons/arrow-left';
import axios from '../../../../utils/axios';
import {ProductsReportPDF} from './products-report-pdf';

export const ProductsReportDialog = ({ open, close, data }) => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (data.startDate !== null && data.endDate !== null) {
        const formattedStartDate = format(data.startDate, "yyyy-MM-dd")
        const formattedEndDate = format(data.endDate, "yyyy-MM-dd")

        const response = await axios.post('/api/v1/product-report', {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          type: data.type,
          productId: data.product.productId
        });
        setResponseData({ orders: response.data, startDate: data.startDate, endDate: data.endDate, type: data.type});
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
              Informe de Ventas por Producto
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
                <ProductsReportPDF
                  orders={responseData.orders}
                  startDate={responseData.startDate}
                  endDate={responseData.endDate}
                  type={responseData.type}
                  productName={data.product.productName}
                />
              </PDFViewer>
            </Box>
          )
        }
      </Box>
    </Dialog>
  )
}
