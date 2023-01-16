import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import {useEffect} from 'react';

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
  tableCellShort: {padding: 6, width: '70'},
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

export const CloseCartPDF = (props) => {
  const { orders } = props;

  const totalOrders = orders.reduce((acc, order) => {
    return acc + order.amount;
  }, 0);

  const totalQuantity = orders.length;
  const totalBeneficiary = orders.reduce((acc, order) => {
    return acc + parseFloat(order.beneficiaryAmount);
  }, 0);
  const totalParish = orders.reduce((acc, order) => {
    return acc + parseFloat(order.parishAmount);
  }, 0);

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
              {orders[0]?.marketName}
            </Text>
            <Text style={styles.body2}>
              Fecha {format(orders[0]?.createdAt, 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader} fixed>
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
          <View style={styles.tableBody}>
            {(orders || []).map((order) => (
              <View style={styles.tableRow} key={order.id}>
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
          </View>
        </View>

        <View style={styles.title}>
          <Text style={styles.h1}>RESUMEN</Text>
        </View>

        <View style={styles.summaryTable}>
          <View style={styles.tableBody}>
            <View style={styles.summaryTableRow} key={1}>
              <View style={styles.tableSummaryCell}>
                <Text style={[styles.body2, styles.alignRight]}>
                  Total Nº. de Ventas:
                </Text>
              </View>
              <View style={styles.tableSummaryCell}>
                <Text style={[styles.body2, styles.alignRight]}>
                  {totalQuantity}
                </Text>
              </View>
            </View>

            <View style={styles.summaryTableRow} key={2}>
              <View style={styles.tableSummaryCell}>
                <Text style={[styles.body2, styles.alignRight]}>
                  Total abonado beneficiarios:
                </Text>
              </View>
              <View style={styles.tableSummaryCell}>
                <Text style={[styles.body2, styles.alignRight]}>
                  {numeral(totalBeneficiary).format(`0,0.00`)}€
                </Text>
              </View>
            </View>

            <View style={styles.summaryTableRow} key={3}>
              <View style={styles.tableSummaryCell}>
                <Text style={[styles.body2, styles.alignRight]}>
                  Total abonado parroquias:
                </Text>
              </View>
              <View style={styles.tableSummaryCell}>
                <Text style={[styles.body2, styles.alignRight]}>
                  {numeral(totalParish).format(`0,0.00`)}€
                </Text>
              </View>
            </View>

            <View style={styles.summaryTableRow} key={4}>
              <View style={styles.tableSummaryCell}>
                <Text style={[styles.body2, styles.alignRight]}>
                  Total gastos:
                </Text>
              </View>
              <View style={styles.tableSummaryCell}>
                <Text style={[styles.body2, styles.alignRight]}>
                  {numeral(totalOrders).format(`0,0.00`)}€
                </Text>
              </View>
            </View>

            <View style={styles.tableHeader}>
              <View style={styles.tableSummaryCell}>
                <Text style={[styles.totalSummary, styles.alignRight]}>
                  Total Recaudado:
                </Text>
              </View>
              <View style={styles.tableSummaryCell}>
                <Text style={[styles.totalSummary, styles.alignRight]}>
                  {numeral(totalBeneficiary).format(`0,0.00`)}€
                </Text>
              </View>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
};

CloseCartPDF.propTypes = {
  data: PropTypes.object.isRequired
};
