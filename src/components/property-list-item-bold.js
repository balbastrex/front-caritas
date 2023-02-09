import PropTypes from 'prop-types';
import { Box, ListItem, ListItemText, Typography } from '@mui/material';

export const PropertyListItemBold = (props) => {
  const { align, children, disableGutters, value, suffix, label, ...other } = props;

  return (
    <ListItem
      sx={{
        px: disableGutters ? 0 : 3,
        py: 1.5
      }}
      {...other}>
      <ListItemText
        disableTypography
        primary={(
          <Typography
            sx={{ minWidth: align === 'vertical' ? 'inherit' : 180 }}
            variant="h6"
          >
            {label}
          </Typography>
        )}
        secondary={(
          <Box
            sx={{
              flex: 1,
              mt: align === 'vertical' ? 0.5 : 0
            }}
          >
            {children || (
              <Typography
                color={(theme) => theme.palette.mode === 'dark' ? 'white' : 'black'}
                variant="h4"
              >
                {value} {suffix }
              </Typography>
            )}
          </Box>
        )}
        sx={{
          display: 'flex',
          flexDirection: align === 'vertical' ? 'column' : 'row',
          alignItems: 'center',
          my: 0
        }}
      />
    </ListItem>
  );
};

PropertyListItemBold.defaultProps = {
  align: 'vertical'
};

PropertyListItemBold.propTypes = {
  align: PropTypes.oneOf(['horizontal', 'vertical']),
  children: PropTypes.node,
  disableGutters: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.string
};
