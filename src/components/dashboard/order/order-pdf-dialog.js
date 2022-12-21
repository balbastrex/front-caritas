import {Box, Button, Dialog, Typography} from '@mui/material';
import {PDFViewer} from '@react-pdf/renderer';
import {ArrowLeft as ArrowLeftIcon} from '../../../icons/arrow-left';
import {OrderPDF} from './order-pdf';

export const OrderPdfDialog = ({ viewPDF, setViewPDF }) => {
  return (
    <Dialog
      fullScreen
      open={!!viewPDF}
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
              onClick={() => setViewPDF(null)}
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
              Hoja de Pedido {viewPDF?.id} - UF{viewPDF?.beneficiaryFamilyUnit}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <PDFViewer
            height="100%"
            style={{ border: 'none' }}
            width="100%"
            showToolbar={true}
          >
            {
              viewPDF && (
                <OrderPDF order={viewPDF} />
              )
            }
          </PDFViewer>
        </Box>
      </Box>
    </Dialog>
    )
}
