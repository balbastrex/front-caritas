import {Box, Button, Dialog, Typography} from '@mui/material';
import {PDFViewer} from '@react-pdf/renderer';
import {ArrowLeft as ArrowLeftIcon} from '../../../icons/arrow-left';
import {BeneficiaryMultipleLicensePDF} from './beneficiary-multiple-license-pdf';

export const BeneficiaryMultipleLicensePdfDialog = ({ viewBeneficiaryMultipleLicensePDF, setViewBeneficiaryMultipleLicensePDF }) => {
  return (
    <Dialog
      fullScreen
      open={!!viewBeneficiaryMultipleLicensePDF}
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
              onClick={() => setViewBeneficiaryMultipleLicensePDF(null)}
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
              Carnet {viewBeneficiaryMultipleLicensePDF?.name} {viewBeneficiaryMultipleLicensePDF?.lastname1}
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
              viewBeneficiaryMultipleLicensePDF && (
                <BeneficiaryMultipleLicensePDF beneficiaries={viewBeneficiaryMultipleLicensePDF} />
              )
            }
          </PDFViewer>
        </Box>
      </Box>
    </Dialog>
    )
}
