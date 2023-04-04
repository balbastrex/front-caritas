import {Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {format} from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';

const COL1_WIDTH = 60;
const COLN_WIDTH = (100 - COL1_WIDTH) / 2;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 24
  },
  title: {
    marginTop: 40,
  },
  h1: {
    fontSize: 24,
    fontWeight: 800,
    lineHeight: 1.235
  },
  h4: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.235
  },
  h5: {
    fontSize: 10,
    fontWeight: 300,
    lineHeight: 1.6
  },
  h6: {
    fontSize: 10,
    fontWeight: 600,
    lineHeight: 1.6
  },
  subtitle2: {
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 1.57
  },
  body2: {
    fontSize: 10,
    lineHeight: 1
  },
  totalSummary: {
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 1
  },
  gutterBottom: {
    marginBottom: 4
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  brand: {
    width: 100
  },
  company: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32
  },
  references: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32
  },
  billing: {
    marginTop: 32
  },
  notes: {
    marginTop: 32
  },
  table: {
    display: 'flex',
    width: 'auto'
  },
  subTable: {
    display: 'flex',
    width: 'auto',
    marginBottom: 40
  },
  summaryTable: {
    marginTop: 5,
    display: 'flex',
    width: '50%'
  },
  tableHeader: {
    backgroundColor: '#EEEEEE',
    borderWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row'
  },
  tableBody: {},
  tableHeaderRow: {
    flexDirection: 'row'
  },
  tableRow: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
    flexDirection: 'row'
  },
  summaryTableRow: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
    flexDirection: 'row'
  },
  summatoryTableRow: {
    borderTopWidth: 2,
    borderColor: '#9a9999',
    backgroundColor: '#EEEEEE',
    borderStyle: 'solid',
    flexDirection: 'row'
  },
  tableCell1: {
    padding: 6,
    // width: `${COL1_WIDTH}%`
  },
  tableCellN: {
    padding: 6,
    // width: `${COLN_WIDTH}%`
  },
  tableCellSmall: {padding: 6, width: '50'},
  tableCellShort: {padding: 6, width: '100'},
  tableCellMid: {padding: 6, width: '170'},
  tableCellLong: {padding: 6, width: '35%'},
  tableSummaryCell: {padding: 6, width: '50%'},
  alignRight: {
    textAlign: 'right'
  },
  alignLeft: {
    textAlign: 'left'
  },
  alignCenter: {
    textAlign: 'center'
  }
});

const getType = (type, productName) => {
  switch (type) {
    case 'allProducts':
      return 'de todos los productos disponibles';
    case 'product':
      return `del producto ${productName}`;
    default:
      return 'allProducts';
  }
}

export const ProductsReportPDF = (props) => {
  const { orders, startDate, endDate, type, productName } = props;

  const formattedStartDate = format(new Date(startDate), 'dd/MM/yyyy');
  const formattedEndDate = format(new Date(endDate), 'dd/MM/yyyy');

  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
        wrap
      >
        <View style={styles.header} fixed>
          <View>
            <Image
              source="/logo.jpg"
              style={styles.brand}
            />
            <Text style={styles.h6}>
              economatosvalencia.com
            </Text>
          </View>
          <View style={styles.alignRight}>
            <Text style={styles.h5}>
              Ventas por producto {formattedEndDate !== formattedStartDate ? 'desde' : 'del'} {formattedStartDate} {formattedEndDate !== formattedStartDate ? `hasta ${formattedEndDate} ` : ''}{getType(type, productName)}.
            </Text>
            <Text style={styles.body2}>
              Fecha Reporte {format(new Date(), 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>

        {
          (orders || []).map((order) => (
            <View>
              <View style={styles.table}>
                <View style={styles.tableHeader} fixed>
                  <View style={styles.tableCellLong}>
                    <Text style={styles.h5}>
                      Fecha
                    </Text>
                  </View>
                  <View style={[styles.tableCellMid, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Cantidad
                    </Text>
                  </View>
                  <View style={[styles.tableCellMid, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Coste
                    </Text>
                  </View>
                  <View style={[styles.tableCellMid, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Venta
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  <View style={styles.tableRow} key={order.id}>
                    <View style={styles.tableCellLong}>
                      <Text style={styles.body2}>
                        {format(new Date(order.date), 'dd/MM/yyyy')}
                      </Text>
                    </View>
                    <View style={[styles.tableCellMid, styles.alignRight]}>
                      <Text style={styles.body2}>
                        {order.totalQuantity}
                      </Text>
                    </View>
                    <View style={[styles.tableCellMid, styles.alignRight]}>
                      <Text style={styles.body2}>
                        {numeral(order.totalCostAmount).format(`0,0.00`)}€
                      </Text>
                    </View>
                    <View style={[styles.tableCellMid, styles.alignRight]}>
                      <Text style={styles.body2}>
                        {numeral(order.totalAmount).format(`0,0.00`)}€
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.subTable}>
                <View style={styles.tableHeader} fixed>
                  <View style={[styles.tableCellSmall, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Id
                    </Text>
                  </View>
                  <View style={styles.tableCellLong}>
                    <Text style={styles.h5}>
                      Producto
                    </Text>
                  </View>
                  <View style={[styles.tableCellShort, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Cantidad
                    </Text>
                  </View>
                  <View style={[styles.tableCellShort, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Coste
                    </Text>
                  </View>
                  <View style={[styles.tableCellShort, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Coste Total
                    </Text>
                  </View>
                  <View style={[styles.tableCellShort, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Venta Total
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  {(order.orderLines || []).map((orderLine) => (
                    <View style={styles.tableRow} key={orderLine.id}>
                      <View style={[styles.tableCellSmall, styles.alignRight]}>
                        <Text style={styles.body2}>
                          {orderLine.productId}
                        </Text>
                      </View>
                      <View style={styles.tableCellLong}>
                        <Text style={styles.body2}>
                          {orderLine.product}
                        </Text>
                      </View>
                      <View style={[styles.tableCellShort, styles.alignRight]}>
                        <Text style={styles.body2}>
                          {orderLine.totalQuantity}
                        </Text>
                      </View>
                      <View style={[styles.tableCellShort, styles.alignRight]}>
                        <Text style={styles.body2}>
                          {orderLine.cost} €
                        </Text>
                      </View>
                      <View style={[styles.tableCellShort, styles.alignRight]}>
                        <Text style={styles.body2}>
                          {orderLine.totalCostAmount} €
                        </Text>
                      </View>
                      <View style={[styles.tableCellShort, styles.alignRight]}>
                        <Text style={styles.body2}>
                          {orderLine.totalAmount} €
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))
        }

      </Page>
    </Document>
  );
};

ProductsReportPDF.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    totalQuantity: PropTypes.string.isRequired,
    totalAmount: PropTypes.number.isRequired,
    orderLines: PropTypes.arrayOf(PropTypes.shape({
      productId: PropTypes.number.isRequired,
      product: PropTypes.string.isRequired,
      totalQuantity: PropTypes.string.isRequired,
      totalAmount: PropTypes.string.isRequired,
    }))
  })).isRequired,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  type: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
};
