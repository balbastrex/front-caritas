import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {PDFDownloadLink} from '@react-pdf/renderer';
import {format} from 'date-fns';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {useAuth} from '../../../hooks/use-auth';
import {X as XIcon} from '../../../icons/x';
import {UserProfiles} from '../../../utils/constants';
import {PropertyList} from '../../property-list';
import {PropertyListItem} from '../../property-list-item';
import {PropertyListItemBold} from '../../property-list-item-bold';
import {Scrollbar} from '../../scrollbar';
import {SeverityPill} from '../../severity-pill';
import {severityMap} from './order-list-table';
import {OrderPDF} from './order-pdf';

const renderOpenedOrder = ({onApprove, onReject, order}) => {
  const { user } = useAuth();
  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? 'neutral.800'
          : 'neutral.100',
        borderRadius: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        px: 3,
        py: 2.5
      }}
    >
      <Typography
        color="textSecondary"
        sx={{ mr: 2 }}
        variant="overline"
      >
        Acciones
      </Typography>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          m: -1,
          '& > button': {
            m: 1
          }
        }}
      >
        {
          onApprove && (
            <Button
              onClick={() => onApprove(order.id)}
              size="small"
              variant="contained"
            >
              Pagar Pedido
            </Button>
          )
        }
        <Button
          onClick={onReject}
          size="small"
          variant="outlined"
        >
          Cancelar
        </Button>
        {
          (user?.profileId === UserProfiles.DIRECTOR_ECONOMATO || user?.profileId === UserProfiles.CAJA_PEDIDOS) && (
            <NextLink
              href={`/dashboard/orders/${order.id}/edit`}
              passHref
            >
              <Button
                size="small"
              >
                Editar
              </Button>
            </NextLink>
          )
        }
      </Box>
    </Box>
  )
}

const OrderPreview = (props) => {
  const { lgUp, onApprove, onReject, order } = props;
  const align = lgUp ? 'horizontal' : 'vertical';

  return (
    <>
      { order && order.status === 'Abierto' ? renderOpenedOrder({onApprove, onReject, order}) : null }

      <Typography
        sx={{ my: 3 }}
        variant="h6"
      >
        Detalles de la Venta
      </Typography>
      <PropertyList>
        <PropertyListItem
          align={align}
          disableGutters
          label="NºVenta"
          value={order.id.toString()}
        />
        <PropertyListItem
          align={align}
          disableGutters
          label="Beneficiario"
        >
          <Typography
            color="primary"
            variant="body2"
          >
            {order.beneficiaryName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {/*{order.customer.address1}*/}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {/*{order.customer.city}*/}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {/*{order.customer.country}*/}
          </Typography>
        </PropertyListItem>
        <PropertyListItem
          align={align}
          disableGutters
          label="Fecha"
          value={format(order.createdAt, 'dd/MM/yyyy')}
        />
        <PropertyListItemBold
          align={align}
          disableGutters
          label="Total"
          value={numeral(order.amount).format(`0,0.00`)}
          suffix="€"
        />
        <PropertyListItem
          align={align}
          disableGutters
          label="Estado"
        >
          <SeverityPill sx={{ mr: 4 }} color={severityMap[order.status] || 'warning'}>
            {order.status}
          </SeverityPill>
        </PropertyListItem>
      </PropertyList>
      <Divider sx={{ my: 3 }} />
      <Typography
        sx={{ my: 3 }}
        variant="h6"
      >
        Lineas de Venta
      </Typography>
      <Scrollbar>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                Producto x Cantidad
              </TableCell>
              <TableCell>
                Precio
              </TableCell>
              <TableCell>
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(order.orderLines || []).map((itemLine) => (
              <TableRow key={itemLine.id}>
                <TableCell>
                  {itemLine.description}
                  {' '}
                  x
                  {' '}
                  {itemLine.units}
                </TableCell>
                <TableCell>
                  {numeral(itemLine.price).format(`0,0.00`)} €
                </TableCell>
                <TableCell>
                  {numeral(itemLine.total).format(`0,0.00`)} €
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </>
  );
};

const OrderDrawerDesktop = styled(Drawer)({
  width: 500,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    position: 'relative',
    width: 500
  }
});

const OrderDrawerMobile = styled(Drawer)({
  flexShrink: 0,
  maxWidth: '100%',
  height: 'calc(100% - 64px)',
  width: 500,
  '& .MuiDrawer-paper': {
    height: 'calc(100% - 64px)',
    maxWidth: '100%',
    top: 64,
    width: 500
  }
});

export const OrderDrawer = (props) => {
  const { containerRef, onClose, open, order, onApprove, onPreviewPDF, ...other } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const content = order
    ? (
      <>
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            justifyContent: 'space-between',
            px: 3,
            py: 2
          }}
        >
          <Typography
            color="inherit"
            variant="h6"
          >
            Nº Venta: {order.id}
          </Typography>
          <Button
            onClick={() => onPreviewPDF(order)}
            size="large"
            style={{ backgroundColor: 'black' }}
          >
            Imprimir
          </Button>
          <PDFDownloadLink
            document={<OrderPDF order={order} />}
            fileName={`pedido-${order.id}.pdf`}
            style={{ textDecoration: 'none' }}
          >
            <Button
              size="large"
              style={{ backgroundColor: 'black' }}
            >
              Descargar
            </Button>
          </PDFDownloadLink>

          <IconButton
            color="inherit"
            onClick={onClose}
          >
            <XIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box
          sx={{
            px: 3,
            py: 4
          }}
        >
        <OrderPreview
          onApprove={onApprove}
          onReject={onClose}
          order={order}
          lgUp={lgUp}
        />
        </Box>
      </>
    )
    : null;

  if (lgUp) {
    return (
      <OrderDrawerDesktop
        anchor="right"
        open={open}
        SlideProps={{ container: containerRef?.current }}
        variant="persistent"
        {...other}
      >
        {content}
      </OrderDrawerDesktop>
    );
  }

  return (
    <OrderDrawerMobile
      anchor="right"
      ModalProps={{ container: containerRef?.current }}
      onClose={onClose}
      open={open}
      SlideProps={{ container: containerRef?.current }}
      variant="temporary"
      {...other}
    >
      {content}
    </OrderDrawerMobile>
  );
};

OrderDrawer.propTypes = {
  containerRef: PropTypes.any,
  onClose: PropTypes.func,
  onPreviewPDF: PropTypes.func,
  onDownloadPDF: PropTypes.func,
  onApprove: PropTypes.func,
  open: PropTypes.bool,
  order: PropTypes.object
};
