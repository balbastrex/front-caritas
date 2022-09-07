import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardHeader, Divider, useMediaQuery } from '@mui/material';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';

export const MarketBasicDetails = (props) => {
  const { market } = props;
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
          value={market.name}
        />
        <PropertyListItem
          align={align}
          divider
          label="Dirección"
          value={market.address}
        />
        <PropertyListItem
          align={align}
          divider
          label="Email"
          value={market.email}
        />
        <PropertyListItem
          align={align}
          divider
          label="Teléfono"
          value={market.phone}
        />
        <PropertyListItem
          align={align}
          divider
          label="Gasto mensual"
          value={`${market.expenses} €`}
        />
        <PropertyListItem
          align={align}
          divider
          label="% Producto"
          value={`${market.productPercentage} %`}
        />
        <PropertyListItem
          align={align}
          divider
          label="P. Base"
          value={`${market.budgetBase} €`}
        />
      </PropertyList>
      <PropertyListItem
        align={align}
        divider
        label="Inc. Adulto"
        value={`${market.budgetAdult} €`}
      />
      <PropertyListItem
        align={align}
        divider
        label="Inc. Niño"
        value={`${market.budgetChild} €`}
      />
    </Card>
  );
};

MarketBasicDetails.propTypes = {
  market: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    expenses: PropTypes.number,
    productPercentage: PropTypes.number,
    budgetBase: PropTypes.number,
    budgetAdult: PropTypes.number,
    budgetChild: PropTypes.number,
    distributionType: PropTypes.string
  }).isRequired
};
