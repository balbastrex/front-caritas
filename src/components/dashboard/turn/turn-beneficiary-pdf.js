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
  h6: {
    fontSize: 12,
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
    lineHeight: 1.43
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
    marginTop: 32
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
    borderBottomWidth: 2,
    borderColor: '#9a9999',
  },
  tableBody: {},
  tableRow: {
    borderBottomWidth: 1,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#EEEEEE',
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
    width: `${COL1_WIDTH}%`
  },
  tableCellN: {
    padding: 6,
    width: `${COLN_WIDTH}%`
  },
  alignRight: {
    textAlign: 'right'
  }
});

export const TurnBeneficiaryPDF = (props) => {
  const { turn, beneficiaries } = props;

  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
      >
        <View style={styles.header}>
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
              Turno: {turn.description}
            </Text>
          </View>
        </View>
        <View style={styles.company}>
          <View>
            <Text style={styles.h4}>
              {turn.marketName}
            </Text>
            <Text style={styles.subtitle2}>
              {turn.beneficiariesNumber}
            </Text>
          </View>
        </View>
        <View style={styles.references}>
          <View>
            <Text style={styles.subtitle2}>
              Fecha: {format(Date.now(), 'dd/MM/yyyy')}
            </Text>
            <Text style={styles.body2}>
              {format(Date.now(), 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>
        <View style={styles.items}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1}>
                  <Text style={styles.h6}>
                    Producto
                  </Text>
                </View>
                <View style={styles.tableCellN} >
                  <Text style={styles.h6}>
                    Cantidad
                  </Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={[styles.h6, styles.alignRight]}>
                    Precio
                  </Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={[styles.h6, styles.alignRight]}>
                    Total
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.tableBody}>
              {(order.orderLines || []).map((item) => (
                <View
                  style={styles.tableRow}
                  key={item.id}
                >
                  <View style={styles.tableCell1}>
                    <Text style={styles.body2}>
                      {item.description}
                    </Text>
                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={[styles.body2, styles.alignRight]}>
                      {item.units}
                    </Text>
                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={[styles.body2, styles.alignRight]}>
                      {numeral(item.price).format(`0,0.00`)}€
                    </Text>
                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={[styles.body2, styles.alignRight]}>
                      {numeral(item.total).format(`0,0.00`)}€
                    </Text>
                  </View>
                </View>
              ))}
              <View style={styles.summatoryTableRow}>
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
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

TurnBeneficiaryPDF.propTypes = {
  turn: PropTypes.object.isRequired
};
