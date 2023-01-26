import {Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {format} from 'date-fns';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

const COL1_WIDTH = 100;
const COLN_WIDTH = (100 - COL1_WIDTH) / 2;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 5,
  },
  pageStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    width: '40%',
  },
  right: {
    width: '60%',
  },
  h1: {
    fontSize: 18,
    fontWeight: 900,
    lineHeight: 1.235
  },
  h4: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.235
  },
  h5: {
    fontSize: 12,
    fontWeight: 900,
    lineHeight: 1.6
  },
  h6: {
    fontSize: 9,
    fontWeight: 900,
    lineHeight: 1.6
  },
  subtitle2: {
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 1.57
  },
  body2: {
    fontSize: 7,
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
    marginTop: 2
  },
  block: {
    flexDirection: 'column',
    borderColor: '#000000',
    borderWidth: 1,
    padding: 6,
    marginTop: 15,
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
  tableCellId: {
    padding: 2,
    width: `10%`
  },
  tableCellN: {
    padding: 2,
    width: `20%`
  },
  alignRight: {
    textAlign: 'right'
  }
});

const getQ = (UF) => {
  switch (UF) {
    case 'UF1':
      return 'q1';
    case 'UF2':
      return 'q2';
    case 'UF3':
      return 'q3';
    case 'UF4':
      return 'q4';
    case 'UF5':
      return 'q5';
    case 'UF6':
      return 'q6';
    default:
      return 'q1';
  }
}

export const OrderSheetPDF = (props) => {
  const { products, UF } = props;
  const [qData, setQData] = useState('q1');

  useEffect(() => {
    setQData(getQ(UF))
  }, [UF])

  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
        wrap
      >
        <View style={styles.pageStyle}>
          <View style={styles.left}>
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
            </View>
            <View style={styles.company}>
              <View>
                <Text style={styles.h4}>
                  Economato:
                </Text>
              </View>
            </View>
            <View style={styles.company}>
              <View>
                <Text style={styles.h4}>
                  HOJA DE PEDIDO
                </Text>
              </View>
            </View>
            <View style={styles.references}>
              <View>
                <Text style={styles.h1}>
                  {UF}
                </Text>
              </View>
            </View>
            <View style={styles.block}>
              <View>
                <Text style={styles.h4}>
                  FECHA:
                </Text>
              </View>
              <View>
                <Text style={[styles.h2, styles.alignRight]}>
                  {`     /        / ${format(new Date(), 'yyyy')}`}
                </Text>
              </View>
            </View>
            <View style={styles.block}>
              <View>
                <Text style={styles.h4}>
                  Nº DE BENEFICIARIO:
                </Text>
              </View>
              <View>
                <Text style={[styles.h2, styles.alignRight]}>
                  {` `}
                </Text>
              </View>
            </View>
            <View style={styles.block}>
              <View>
                <Text style={styles.h4}>
                  NOMBRE:
                </Text>
              </View>
              <View>
                <Text style={[styles.h2, styles.alignRight]}>
                  {` 
                  
                  
                  `}
                </Text>
              </View>
            </View>
            <View style={styles.block}>
              <View>
                <Text style={styles.h4}>
                  LÍMITE DE GASTOS:
                </Text>
              </View>
              <View>
                <Text style={[styles.h2, styles.alignRight]}>
                  {` €`}
                </Text>
              </View>
            </View>
            <View style={styles.notes}>
              <View>
                <Text style={styles.h6}>
                  PRODUCTOS GRATUITOS INCLUIDOS:
                </Text>
              </View>
            </View>
            <View style={styles.references}>
              <View>
                <Text style={styles.h5}>
                  SI / NO
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.right}>
            <View style={styles.table}>
              <View style={styles.tableHeader} fixed>
                <View style={styles.tableRow}>
                  <View style={styles.tableCellId}>
                    <Text style={[styles.h6, styles.alignRight]}>
                      id
                    </Text>
                  </View>
                  <View style={styles.tableCellName} >
                    <Text style={[styles.h6, styles.alignLeft]}>
                      Producto
                    </Text>
                  </View>
                  <View style={styles.tableCellN} >
                    <Text style={[styles.h6, styles.alignRight]}>
                      Max
                    </Text>
                  </View>
                  <View style={styles.tableCellN} >
                    <Text style={[styles.h6, styles.alignRight]}>
                      Cantidad
                    </Text>
                  </View>
                  <View style={styles.tableCellN} >
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
                {(products || []).map((product) => (
                  <View
                    style={styles.tableRow}
                    key={product.id}
                  >
                    <View style={styles.tableCellId}>
                      <Text style={[styles.body2, styles.alignRight]}>
                        {product.id}
                      </Text>
                    </View>
                    <View style={styles.tableCellName}>
                      <Text style={[styles.body2, styles.alignLeft]}>
                        {product.name}
                      </Text>
                    </View>
                    <View style={styles.tableCellN}>
                      <Text style={[styles.body2, styles.alignRight]}>
                        {product[qData]}
                      </Text>
                    </View>
                    <View style={styles.tableCellN}>
                      <Text style={[styles.body2, styles.alignRight]}>

                      </Text>
                    </View>
                    <View style={styles.tableCellN}>
                      <Text style={[styles.body2, styles.alignRight]}>
                        {product.salesPrice}
                      </Text>
                    </View>
                    <View style={styles.tableCellN}>
                      <Text style={[styles.body2, styles.alignRight]}>

                      </Text>
                    </View>
                  </View>
                ))}
                <View style={styles.summatoryTableRow}>
                  <View style={styles.tableCellName}>
                    <Text style={[styles.h6, styles.alignRight]}>
                      Nº de Productos
                    </Text>
                  </View>
                  <View style={styles.tableCellN}>

                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={[styles.h6, styles.alignRight]}>

                    </Text>
                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={[styles.h6, styles.alignRight]}>
                      Total
                    </Text>
                  </View>
                  <View style={styles.tableCellN}>
                    <Text style={[styles.h6, styles.alignRight]}>

                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
};

OrderSheetPDF.propTypes = {
  UF: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
