import PropTypes from 'prop-types';
import { Card, CardHeader, Divider, useMediaQuery } from '@mui/material';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';

export const ParishBasicDetails = (props) => {
  const { parish } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  return (
    <Card>
      <CardHeader title="Basic Details" />
      <Divider />
      <PropertyList>
        <PropertyListItem
          align={align}
          divider
          label="Nombre"
          value={parish.name}
        />
        <PropertyListItem
          align={align}
          divider
          label="Dirección"
          value={parish.city}
        />
        <PropertyListItem
          align={align}
          divider
          label="Dirección"
          value={parish.address}
        />
        <PropertyListItem
          align={align}
          divider
          label="Email"
          value={parish.email}
        />
      </PropertyList>
      <PropertyListItem
        align={align}
        divider
        label="Teléfono"
        value={parish.phone}
      />
    </Card>
  );
};

ParishBasicDetails.propTypes = {
  parish: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired
};
