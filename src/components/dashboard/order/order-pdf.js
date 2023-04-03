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
  title: {
    fontSize: 11,
    fontWeight: 800,
    lineHeight: 1.235,
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
    marginTop: 15
  },
  references: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  items: {
    marginTop: 15
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
    padding: 3,
    width: `${COL1_WIDTH}%`
  },
  tableCellN: {
    padding: 3,
    width: `${COLN_WIDTH}%`
  },
  tableCellSummary: {
    padding: 3,
    width: `40%`
  },
  alignRight: {
    textAlign: 'right'
  }
});

export const OrderPDF = (props) => {
  const { order } = props;

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
              {order.status}
            </Text>
            <Text style={styles.subtitle2}>
              Hoja de Pedido # {order.id} - UF{order.beneficiaryFamilyUnit}
            </Text>
          </View>
        </View>
        <View style={styles.header}>
          <View style={styles.company}>
            <View>
              <Text style={styles.h4}>
                {order.marketName}
              </Text>
              <Text style={styles.body2}>
                Parroquia: {order.parishName}
              </Text>
              <Text style={styles.body2}>
                Nº de Beneficiario: {order.beneficiaryLicense}
              </Text>
              <Text style={styles.body2}>
                Nombre: <Text style={styles.title}>{order.beneficiaryName}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.references}>
            <View>
              <Text style={styles.subtitle2}>
                Fecha de Pedido:
              </Text>
              <Text style={styles.h6}>
                {format(order.createdAt, 'dd/MM/yyyy')}
              </Text>
            </View>
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
              <View style={styles.tableRow}>
                <View style={styles.tableCell1} />
                <View style={styles.tableCell1} />
                <View style={styles.tableCellSummary}>
                  <Text style={[styles.h6, styles.alignRight]}>
                    Total
                  </Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={[styles.h6, styles.alignRight]}>
                    {numeral(order.amount).format(`0,0.00`)}€
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1} />
                <View style={styles.tableCell1} />
                <View style={styles.tableCellSummary}>
                  <Text style={[styles.h6, styles.alignRight]}>
                    Total Parroquia
                  </Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={[styles.h6, styles.alignRight]}>
                    {numeral(order.parishAmount).format(`0,0.00`)}€
                  </Text>
                </View>
              </View>
              <View style={styles.summatoryTableRow}>
                <View style={styles.tableCell1} />
                <View style={styles.tableCell1} />
                <View style={styles.tableCellSummary}>
                  <Text style={[styles.h6, styles.alignRight]}>
                    Total Beneficiario
                  </Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={[styles.h6, styles.alignRight]}>
                    {numeral(order.beneficiaryAmount).format(`0,0.00`)}€
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

OrderPDF.propTypes = {
  order: PropTypes.object.isRequired
};
