import PrintIcon from '@mui/icons-material/Print';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Link,
  List,
  ListItem,
  IconButton,
  ListItemText,
  Popover, Grid, Tooltip,
} from '@mui/material';
import {useState} from 'react';
import {updateBeneficiariesPrinted} from '../../slices/beneficiary';
import {useDispatch} from '../../store';
import axios from '../../utils/axios';
import {BeneficiaryLicensePdfDialog} from './beneficiary/beneficiary-license-pdf-dialog';
import {BeneficiaryMultipleLicensePdfDialog} from './beneficiary/beneficiary-multiple-license-pdf-dialog';

export const ContactsPopover = (props) => {
  const dispatch = useDispatch();
  const { anchorEl, beneficiaries, onClose, open, ...other } = props;
  const [viewBeneficiaryLicensePDF, setViewBeneficiaryLicensePDF] = useState(null);
  const [viewBeneficiaryMultipleLicensePDF, setViewBeneficiaryMultipleLicensePDF] = useState(null);

  const printAll = async () => {
    const response = await axios.get(`/api/v1/beneficiary-license/print`);
    setViewBeneficiaryMultipleLicensePDF(response.data);
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={!!open}
      PaperProps={{
        sx: {
          p: 2,
          width: 320
        }
      }}
      transitionDuration={0}
      {...other}>
      <Grid container justifyContent="space-between">
        <Button
          disabled={beneficiaries.length === 0}
          component="a"
          startIcon={<PrintIcon fontSize="small" />}
          variant="contained"
          onClick={printAll}
        >
          Imprimir Todos
        </Button>
        <Tooltip title="Borrar TODAS las notificaciones">
          <IconButton
            onClick={() => dispatch(updateBeneficiariesPrinted())}
            sx={{ mr: 2 }}
          >
            <GroupRemoveIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <List disablePadding>
          {beneficiaries.map((beneficiary) => {

            return (
              <ListItem
                disableGutters
                key={beneficiary.id}
              >
                <Tooltip title="Imprimir carnet">
                  <IconButton
                    onClick={() => setViewBeneficiaryLicensePDF(beneficiary)}
                    sx={{ mr: 2 }}
                  >
                    <PrintIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <ListItemText
                  disableTypography
                  primary={(
                    <Link
                      color="textPrimary"
                      noWrap
                      sx={{ cursor: 'pointer' }}
                      underline="none"
                      variant="subtitle2"
                    >
                      {beneficiary.name}
                    </Link>
                  )}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <BeneficiaryLicensePdfDialog
        viewBeneficiaryLicensePDF={viewBeneficiaryLicensePDF}
        setViewBeneficiaryLicensePDF={setViewBeneficiaryLicensePDF}
      />
      <BeneficiaryMultipleLicensePdfDialog
        viewBeneficiaryMultipleLicensePDF={viewBeneficiaryMultipleLicensePDF}
        setViewBeneficiaryMultipleLicensePDF={setViewBeneficiaryMultipleLicensePDF}
      />
    </Popover>
  );
};

ContactsPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
