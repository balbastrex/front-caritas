import {Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {format} from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {TablePdf, tablePdf} from "../table-pdf";

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 24
  },
  title: {
    marginTop: 40,
  },
  h4: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.235,
    marginBottom: 4,
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
  body2: {
    fontSize: 10,
    lineHeight: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  brand: {
    width: 100
  },
  notes: {
    marginTop: 32
  },
  tableCellShort: {padding: 6, width: '20%'},
  tableCellLong: {padding: 6, width: '80%'},
  alignRight: {
    textAlign: 'right',
    marginRight: 4
  },
  amount: {
    fontWeight: 800,
    fontStyle: 'bold',
    fontSize: 12
  }
});

const titleStyles = {
  textStyle: [styles.h4],
  style: [styles.notes]
}

const colStyles = [
    {
      cell: {
        styles: [styles.body2]
      },
      styles: [styles.tableCellLong]
    },
    {
      cell: {
        styles: [styles.body2, styles.amount]
      },
      styles: [styles.tableCellShort, styles.alignRight]
    }
  ]

export const PeriodReportPdf = (props) => {
  const { data, startDate, endDate } = props;

  const formattedStartDate = format(new Date(startDate), 'dd/MM/yyyy');
  const formattedEndDate = format(new Date(endDate), 'dd/MM/yyyy');

  const rowTableData1 = {
    title: 'PERSONAS BENEFICIARIAS DEL PROYECTO',
    rows: [
      ['Número de familias (carnets) que se han beneficiado del Economato en el periodo', data.numberOfLicense],
      ['Número total de beneficiarios (todos los miembros de la unidad familiar', data.totalBeneficiaries],
      ['De los beneficiarios cuantos son menores de edad', data.numberOfMinors],
      ['¿Cuantas familias han venido por primera vez este periodo?', data.firstTimeLicense]
    ]
  }

  const rowTableData2 = {
    title: 'De las familias que se han beneficiado del economato',
    rows: [
      ['¿Cuantos eran extranjeros?', data.numberOfForeigners],
      ['¿Cuantos eran españoles?', data.numberOfNationals],
      [`A fecha ${formattedEndDate} cuantas familias estáis atendiendo, están recibiendo ayuda del economato`, data.numberOfActiveLicense],
    ]
  }

  const rowTableData3 = {
    title: 'RECURSOS ECONÓMICOS OBTENIDOS - INGRESOS',
    rows: [
      ['Aportaciones de los beneficiarios', `${data.amountBeneficiaries} €`],
      ['Aportaciones de la parroquia o parroquias', `${data.amountParish} €`],
    ]
  }

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
              Memoria Periodo {formattedEndDate !== formattedStartDate ? 'desde' : 'del'} {formattedStartDate} {formattedEndDate !== formattedStartDate ? `hasta ${formattedEndDate} ` : ''}.
            </Text>
            <Text style={styles.body2}>
              Fecha Reporte {format(new Date(), 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>

        <TablePdf
          colStyles={colStyles}
          data={rowTableData1}
          titleStyles={titleStyles}
        />

        <TablePdf
          colStyles={colStyles}
          data={rowTableData2}
          titleStyles={titleStyles}
        />

        <TablePdf
          colStyles={colStyles}
          data={rowTableData3}
          titleStyles={titleStyles}
        />

      </Page>
    </Document>
  );
};

PeriodReportPdf.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    numberOfLicense: PropTypes.number.isRequired,
    totalBeneficiaries: PropTypes.number.isRequired,
    numberOfMinors: PropTypes.number.isRequired,
    firstTimeLicense: PropTypes.number.isRequired,
    numberOfForeigners: PropTypes.number.isRequired,
    numberOfNationals: PropTypes.number.isRequired,
    numberOfActiveLicense: PropTypes.number.isRequired,
    amountBeneficiaries: PropTypes.number.isRequired,
    amountParish: PropTypes.number.isRequired,
  })).isRequired,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
};
