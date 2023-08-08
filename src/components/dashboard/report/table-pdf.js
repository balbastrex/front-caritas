import {StyleSheet, Text, View} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    display: 'flex',
    width: 'auto'
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
  tableRowFirst: {
    borderTopWidth: 1,
  },
})

export const TablePdf = ({ titleStyles = null, colStyles, data }) => {
  return (
    <>
      {
        data?.title && (
          <View style={titleStyles.style}>
            <Text style={titleStyles.textStyle}>
              {data.title}
            </Text>
          </View>
        )
      }
      <View style={styles.table}>
        <View style={styles.tableBody}>
          {
            data.rows.map((row, rowIndex) => {
              const addStyle = rowIndex === 0 ? styles.tableRowFirst : null
              return (
                <View style={[styles.tableRow, addStyle]} key={rowIndex}>
                  {
                    colStyles.map((colStyle, colIndex) => (
                      <View style={colStyle.styles} key={colIndex}>
                        <Text style={colStyle.cell.styles}>
                          {row[colIndex]}
                        </Text>
                      </View>
                    ))
                  }
                </View>
              )
            })
          }
        </View>
      </View>
    </>
  )
}
