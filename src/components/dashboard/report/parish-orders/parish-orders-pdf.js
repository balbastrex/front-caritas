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

export const ParishOrdersPDF = (props) => {
  const { parishOrders } = props;

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
              Ventas por Parroquia
            </Text>
            <Text style={styles.body2}>
              Fecha {format(new Date(), 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>

        {
          (parishOrders || []).map((parishOrder) => (
            <View>
              <View style={styles.table}>
                <View style={styles.tableHeader} fixed>
                  <View style={styles.tableCellLong}>
                    <Text style={styles.h5}>
                      Parroquia
                    </Text>
                  </View>
                  <View style={[styles.tableCellMid, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Total Parroquia
                    </Text>
                  </View>
                  <View style={[styles.tableCellMid, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Total Beneficiarios
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  <View style={styles.tableRow} key={parishOrder.id}>
                    <View style={styles.tableCellLong}>
                      <Text style={styles.body2}>
                        {parishOrder.parishName}
                      </Text>
                    </View>
                    <View style={[styles.tableCellMid, styles.alignRight]}>
                      <Text style={styles.body2}>
                        {numeral(parishOrder.totalParishAmount).format(`0,0.00`)}€
                      </Text>
                    </View>
                    <View style={[styles.tableCellMid, styles.alignRight]}>
                      <Text style={styles.body2}>
                        {numeral(parishOrder.totalBeneficiaryAmount).format(`0,0.00`)}€
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.subTable}>
                <View style={styles.tableHeader} fixed>
                  <View style={[styles.tableCellSmall, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Nº
                    </Text>
                  </View>
                  <View style={styles.tableCellLong}>
                    <Text style={styles.h5}>
                      Beneficiario
                    </Text>
                  </View>
                  <View style={[styles.tableCellShort, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Fecha
                    </Text>
                  </View>
                  <View style={[styles.tableCellShort, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Importe
                    </Text>
                  </View>
                  <View style={[styles.tableCellShort, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Gratuidad
                    </Text>
                  </View>
                  <View style={[styles.tableCellShort, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Imp.Parr.
                    </Text>
                  </View>
                  <View style={[styles.tableCellShort, styles.alignRight]}>
                    <Text style={styles.h5}>
                      Imp.Ben.
                    </Text>
                  </View>
                </View>
                <View style={styles.tableBody}>
                  {(parishOrder.orders || []).map((order) => (
                    <View style={styles.tableRow} key={order.id}>
                      <View style={[styles.tableCellSmall, styles.alignRight]}>
                        <Text style={styles.body2}>
                          {order.beneficiaryLicense}
                        </Text>
                      </View>
                      <View style={styles.tableCellLong}>
                        <Text style={styles.body2}>
                          {order.beneficiaryName}
                        </Text>
                      </View>
                      <View style={[styles.tableCellShort, styles.alignRight]}>
                        <Text style={styles.body2}>
                          {format(order.createdAt, 'dd/MM/yyyy')}
                        </Text>
                      </View>
                      <View style={[styles.tableCellShort, styles.alignRight]}>
                        <Text style={styles.body2}>
                          {numeral(order.amount).format(`0,0.00`)}€
                        </Text>
                      </View>
                      <View style={[styles.tableCellShort, styles.alignRight]}>
                        <Text style={styles.body2}>
                          {order.gratuitous}%
                        </Text>
                      </View>
                      <View style={[styles.tableCellShort, styles.alignRight]}>
                        <Text style={styles.body2}>
                          {numeral(order.parishAmount).format(`0,0.00`)}€
                        </Text>
                      </View>
                      <View style={[styles.tableCellShort, styles.alignRight]}>
                        <Text style={styles.body2}>
                          {numeral(order.beneficiaryAmount).format(`0,0.00`)}€
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

ParishOrdersPDF.propTypes = {
  parishOrders: PropTypes.arrayOf(PropTypes.shape({
    parishId: PropTypes.number.isRequired,
    parishName: PropTypes.string.isRequired,
    totalParishAmount: PropTypes.number.isRequired,
    totalBeneficiaryAmount: PropTypes.number.isRequired,
    orders: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      gratuitous: PropTypes.number.isRequired,
      beneficiaryLicense: PropTypes.number.isRequired,
      beneficiaryName: PropTypes.string.isRequired,
      beneficiaryFamilyUnit: PropTypes.number.isRequired,
      createdAt: PropTypes.number.isRequired,
      budget: PropTypes.number,
      parishAmount: PropTypes.string.isRequired,
      beneficiaryAmount: PropTypes.string.isRequired,
    }))
  })).isRequired,
};
