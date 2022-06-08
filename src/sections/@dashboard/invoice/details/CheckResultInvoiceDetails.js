import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Scrollbar from '../../../../components/Scrollbar';
//
import InvoiceToolbar from './InvoiceToolbar';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

CheckResultInvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function CheckResultInvoiceDetails({ invoice }) {
  const theme = useTheme();

  const {userInfo,order,results} = invoice;

  if (!invoice) {
    return null;
  }

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
    <>
      <InvoiceToolbar invoice={invoice} />

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
            <Image disabledEffect visibleByDefault alt="logo" src="/logo/logo_full.svg" sx={{ maxWidth: 120 }} />
          </Grid>


          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              体检人信息
            </Typography>
            <Typography variant="body2">姓名：{userInfo.name}</Typography>
            <Typography variant="body2">性别：{userInfo.gender}</Typography>
            <Typography variant="body2">身份证号码：{userInfo.idCard}</Typography>
            <Typography variant="body2">生日: {fDate(userInfo.birth)}</Typography>
            <Typography variant="body2">联系方式: {userInfo.contact}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              订单信息
            </Typography>
            <Typography variant="body2">支付金额：¥{order.amount}</Typography>
            <Typography variant="body2">套餐名：{userInfo.gender}</Typography>
            <Typography variant="body2">预约日期: {fDate(order.appoint)}</Typography>
            <Typography variant="body2">创建日期: {fDate(order.createTime)}</Typography>
          </Grid>
        </Grid>


        <Divider sx={{ mt: 5 }} />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 960 }}>
            <Table>
              <TableHead
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    '& th': { backgroundColor: 'transparent' },
                  }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>
                  <TableCell align="left">检查项目名</TableCell>
                  <TableCell align="left">结果</TableCell>
                  <TableCell align="right">备注</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {results.map((row, index) => (
                    <TableRow
                        key={index}
                        sx={{
                          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                        }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left">
                        <Box sx={{ maxWidth: 560 }}>
                          <Typography variant="subtitle2">{row.title}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            {row.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">{row.content}</TableCell>
                      <TableCell align="right">{row.info}</TableCell>
                    </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </>
  );
}
