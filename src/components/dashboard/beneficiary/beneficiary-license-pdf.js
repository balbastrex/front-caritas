import {Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {format} from 'date-fns';
import PropTypes from 'prop-types';

const COL1_WIDTH = 100;
const COLN_WIDTH = (100 - COL1_WIDTH) / 2;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    margin: 1,
    border: 1,
    borderColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'flex-start',
  },
  data: {
    flexDirection: 'column',
    justifyContent: 'left',
  },
  rowData: {
    flexDirection: 'row',
    justifyContent: 'left',
    marginTop: 5,
    marginLeft: 5,
  },
  brand: {
    width: 65
  },
  normalText: {
    fontSize: 10,
    lineHeight: 1
  },
  leftMargin: {
    marginLeft: 5,
  },
  titleText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
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

export const BeneficiaryLicensePDF = (props) => {
  const { beneficiary } = props;

  return (
    <Document>
      <Page
        size={{ width: 240.98, height: 155.83 }}
        style={styles.page}
        wrap
      >
        <View style={styles.header}>
          <View>
            <Image
              source="/simple-logo.jpg"
              style={styles.brand}
            />
          </View>
          <View>
            <Text style={styles.titleText}>
              { beneficiary.marketName }
            </Text>
          </View>
        </View>
        <View style={styles.data}>
          <View style={styles.rowData}>
            <Text style={styles.normalText}>Carnet: { beneficiary.license }</Text>
          </View>
          <View style={styles.rowData}>
            <Text style={styles.normalText}>Nombre: { beneficiary.name } { beneficiary.lastname1 } { beneficiary.lastname2 }</Text>
          </View>
          <View style={styles.rowData}>
            <Text style={styles.normalText}>DNI: { beneficiary.cif }</Text>
            <Text style={[styles.normalText, styles.leftMargin]}>Válido hasta: { format(new Date(beneficiary.expires), 'dd/MM/yyyy') }</Text>
          </View>
          <View style={styles.rowData}>
            <Text style={styles.normalText}>UF: { beneficiary.familyUnit }</Text>
            <Text style={[styles.normalText, styles.leftMargin]}>Parroquia: { beneficiary.parishName }</Text>
          </View>
          <View style={styles.rowData}>
            <Text style={styles.normalText}>Importe ayuda: { beneficiary.budget }</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

BeneficiaryLicensePDF.propTypes = {
  beneficiary: PropTypes.object
};
