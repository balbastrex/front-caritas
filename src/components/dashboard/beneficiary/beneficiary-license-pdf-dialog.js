import {Box, Button, Dialog, Typography} from '@mui/material';
import {PDFViewer} from '@react-pdf/renderer';
import {ArrowLeft as ArrowLeftIcon} from '../../../icons/arrow-left';
import {BeneficiaryLicensePDF} from './beneficiary-license-pdf';

export const BeneficiaryLicensePdfDialog = ({ viewBeneficiaryLicensePDF, setViewBeneficiaryLicensePDF }) => {
  return (
    <Dialog
      fullScreen
      open={!!viewBeneficiaryLicensePDF}
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
              onClick={() => setViewBeneficiaryLicensePDF(null)}
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
              Carnet {viewBeneficiaryLicensePDF?.name} {viewBeneficiaryLicensePDF?.lastname1}
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
              viewBeneficiaryLicensePDF && (
                <BeneficiaryLicensePDF beneficiary={viewBeneficiaryLicensePDF} />
              )
            }
          </PDFViewer>
        </Box>
      </Box>
    </Dialog>
    )
}
