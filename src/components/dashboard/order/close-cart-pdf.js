import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const COL1_WIDTH = 60;
const COLN_WIDTH = (100 - COL1_WIDTH) / 2;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 24
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
  items: {
    // marginTop: 32
  },
  notes: {
    marginTop: 32
  },
  table: {
    display: 'flex',
    width: 'auto'
  },
  tableHeader: {
    backgroundColor: '#EEEEEE',
    borderWidth: 1,
    // borderColor: '#9a9999',
    borderColor: '#000000',
  },
  tableBody: {},
  tableHeaderRow: {
    flexDirection: 'row'
  },
  tableRow: {
    borderBottomWidth: 1,
    // borderWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    // borderColor: '#EEEEEE',
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
  tableCellShort: {padding: 6, width: '70'},
  tableCellLong: {padding: 6, width: '35%'},
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

export const CloseCartPDF = (props) => {
  const { orders } = props;

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
          <View>
            <Text style={styles.h4}>
              CIERRE DE CAJA
            </Text>
            <Text style={styles.h4}>
              {orders[0].marketName}
            </Text>
            <Text style={styles.body2}>
              Fecha {format(orders[0].createdAt, 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>

        <View style={styles.items}>
          <View style={styles.table}>
            <View style={styles.tableHeader} fixed>
              <View style={styles.tableHeaderRow}>
                <View style={styles.tableCellShort}>
                  <Text style={styles.h5}>
                    Pedido
                  </Text>
                </View>
                <View style={styles.tableCellLong}>
                  <Text style={styles.h5}>
                    Nombre
                  </Text>
                </View>
                <View style={styles.tableCellShort}>
                  <Text style={[styles.h5, styles.alignRight]}>
                    Carnet
                  </Text>
                </View>
                <View style={styles.tableCellLong}>
                  <Text style={[styles.h5, styles.alignLeft]}>
                    Parroquia
                  </Text>
                </View>
                <View style={styles.tableCellShort}>
                  <Text style={[styles.h5, styles.alignRight]}>
                    Max.
                  </Text>
                </View>
                <View style={styles.tableCellShort}>
                  <Text style={[styles.h5, styles.alignRight]}>
                    Ben.
                  </Text>
                </View>
                <View style={styles.tableCellShort}>
                  <Text style={[styles.h5, styles.alignRight]}>
                    Par.
                  </Text>
                </View>
                <View style={styles.tableCellShort}>
                  <Text style={[styles.h5, styles.alignRight]}>
                    TOTAL
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.tableBody}>
              {(orders || []).map((order) => (
                <View
                  style={styles.tableRow}
                  key={order.id}
                >
                  <View style={styles.tableCellShort}>
                    <Text style={styles.body2}>
                      {order.id}
                    </Text>
                  </View>
                  <View style={styles.tableCellLong}>
                    <Text style={[styles.body2, styles.alignLeft]}>
                      {order.beneficiaryName.substring(0, 18)}
                    </Text>
                  </View>
                  <View style={styles.tableCellShort}>
                    <Text style={[styles.body2, styles.alignRight]}>
                      {order.beneficiaryLicense}
                    </Text>
                  </View>
                  <View style={styles.tableCellLong}>
                    <Text style={[styles.body2, styles.alignLeft]}>
                      {order.parishName.substring(0, 20)}
                    </Text>
                  </View>
                  <View style={styles.tableCellShort}>
                    <Text style={[styles.body2, styles.alignRight]}>
                      {numeral(order.budget).format(`0,0.00`)}€
                    </Text>
                  </View>
                  <View style={styles.tableCellShort}>
                    <Text style={[styles.body2, styles.alignRight]}>
                      {numeral(order.beneficiaryAmount).format(`0,0.00`)}€
                    </Text>
                  </View>
                  <View style={styles.tableCellShort}>
                    <Text style={[styles.body2, styles.alignRight]}>
                      {numeral(order.parishAmount).format(`0,0.00`)}€
                    </Text>
                  </View>
                  <View style={styles.tableCellShort}>
                    <Text style={[styles.body2, styles.alignRight]}>
                      {numeral(order.amount).format(`0,0.00`)}€
                    </Text>
                  </View>
                </View>
              ))}
              {/*<View style={styles.summatoryTableRow}>
                <View style={styles.tableCell1} />
                <View style={styles.tableCell1} />
                <View style={styles.tableCellN}>
                  <Text style={[styles.h6]}>
                    Total
                  </Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={[styles.h6, styles.alignRight]}>
                    {numeral(order.amount).format(`0,0.00`)}€
                  </Text>
                </View>
              </View>*/}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

CloseCartPDF.propTypes = {
  orders: PropTypes.array.isRequired
};
