import PropTypes from 'prop-types';
import {Page, View, Text, Image, Document, Font} from '@react-pdf/renderer';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
import { fDate } from '../../../../utils/formatTime';
//
import styles from './InvoiceStyle';

// ----------------------------------------------------------------------

InvoicePDF.propTypes = {
  invoice: PropTypes.object.isRequired,
};


// Create style with font-family
// const styles = StyleSheet.create({
//   page: {
//     fontFamily: "Roboto"
//   },
// });

export default function InvoicePDF({ invoice }) {

  const {userInfo,order,results} = invoice;

  const {
    items,
    taxes,
    status,
    dueDate,
    discount,
    invoiceTo,
    createDate,
    totalPrice,
    invoiceFrom,
    invoiceNumber,
    subTotalPrice,
  } = invoice;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/logo/logo_full.jpg" style={{ height: 32 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>{status}</Text>
            <Text> {invoiceNumber} </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>体检人信息</Text>
            <Text style={styles.body1}>姓名：{userInfo.name}</Text>
            <Text style={styles.body1}>性别：{userInfo.gender}</Text>
            <Text style={styles.body1}>身份证号码：{userInfo.idCard}</Text>
            <Text style={styles.body1}>生日: {fDate(userInfo.birth)}</Text>
            <Text style={styles.body1}>联系方式: {userInfo.contact}</Text>
          </View>


          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>订单信息</Text>
            <Text style={styles.body1}>套餐名：{userInfo.gender}</Text>
            <Text style={styles.body1}>预约日期: {fDate(order.appoint)}</Text>
            <Text style={styles.body1}>创建日期: {fDate(order.createTime)}</Text>
          </View>
        </View>


        <Text style={[styles.overline, styles.mb8]}>Invoice Details</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>检查项目名</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>结果</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>备注</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {results.map((item, index) => (
              <View style={styles.tableRow} key={item.id}>
                <View style={styles.tableCell_1}>
                  <Text>{index + 1}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>{item.name}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>{item.content}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{item.info}</Text>
                </View>


              </View>
            ))}
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text>We appreciate your business. Should you need us to add VAT or extra notes let us know!</Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>support@abcapp.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
