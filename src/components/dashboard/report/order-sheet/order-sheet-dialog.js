import {Box, Button, Dialog, Typography} from '@mui/material';
import {PDFViewer} from '@react-pdf/renderer';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ArrowLeft as ArrowLeftIcon} from '../../../../icons/arrow-left';
import {getProducts} from '../../../../slices/product';
import {OrderSheetPDF} from './order-sheet-pdf';

export const OrderSheetDialog = ({ open, close, UF }) => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    open && dispatch(getProducts());
  }, [open]);

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
              Hoja de pedido
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
            <OrderSheetPDF products={productList} UF={UF} />
          </PDFViewer>
        </Box>
      </Box>
    </Dialog>
  )
}
