import {Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {format} from 'date-fns';
import PropTypes from 'prop-types';

const COL1_WIDTH = 100;
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
  tableCellParish: {
    padding: 2,
    width: `30%`
  },
  tableCellDate: {
    padding: 2,
    width: `20%`
  },
  tableCellName: {
    padding: 2,
    width: `50%`
  },
  tableCellN: {
    padding: 2,
    width: `10%`
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
        wrap
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
              NºBeneficiarios del turno {turn.beneficiariesNumber}
            </Text>
          </View>
        </View>
        <View style={styles.references}>
          <View>
            <Text style={styles.subtitle2}>
              Fecha: {format(Date.now(), 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>
        <View style={styles.items}>
          <View style={styles.table}>
            <View style={styles.tableHeader} fixed>
              <View style={styles.tableRow}>
                <View style={styles.tableCellN}>
                  <Text style={styles.h6}>
                    Carnet
                  </Text>
                </View>
                <View style={styles.tableCellName} >
                  <Text style={styles.h6}>
                    Nombre
                  </Text>
                </View>
                <View style={styles.tableCellParish} >
                  <Text style={styles.h6}>
                    Parroquia
                  </Text>
                </View>
                <View style={styles.tableCellDate} >
                  <Text style={styles.h6}>
                    Última compra
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.tableBody}>
              {(beneficiaries || []).map((beneficiary) => (
                <View
                  style={styles.tableRow}
                  key={beneficiary.license}
                >
                  <View style={styles.tableCellN}>
                    <Text style={[styles.body2, styles.alignRight]}>
                      {beneficiary.license}
                    </Text>
                  </View>
                  <View style={styles.tableCellName}>
                    <Text style={[styles.body2, styles.alignLeft]}>
                      {beneficiary.name}
                    </Text>
                  </View>
                  <View style={styles.tableCellParish}>
                    <Text style={[styles.body2, styles.alignLeft]}>
                      {beneficiary.parishName}
                    </Text>
                  </View>
                  <View style={styles.tableCellDate}>
                    <Text style={[styles.body2, styles.alignCenter]}>
                      {format(new Date(beneficiary.lastDateOrder), 'dd/MM/yyyy')}
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
                    {turn.beneficiariesNumber}
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
  turn: PropTypes.object.isRequired,
  beneficiaries: PropTypes.array
};
