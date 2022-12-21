import {Box, Button, Dialog, Typography} from '@mui/material';
import {PDFViewer} from '@react-pdf/renderer';
import {ArrowLeft as ArrowLeftIcon} from '../../../icons/arrow-left';
import {CloseCartPDF} from './close-cart-pdf';
import {OrderPDF} from './order-pdf';

export const CloseCartPdfDialog = ({ viewCloseCartPDF, setViewCloseCartPDF }) => {
  return (
    <Dialog
      fullScreen
      open={!!viewCloseCartPDF}
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
              onClick={() => setViewCloseCartPDF(null)}
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
              Cierre de Caja
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
              viewCloseCartPDF && (
                <CloseCartPDF orders={viewCloseCartPDF} />
              )
            }
          </PDFViewer>
        </Box>
      </Box>
    </Dialog>
    )
}
