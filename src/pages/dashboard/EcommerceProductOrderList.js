import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Switch,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../components/table';
// sections
import { ProductTableRow, ProductTableToolbar } from '../../sections/@dashboard/e-commerce/product-list';
import {OrderTableRow,OrderTableToolbar} from "../../sections/@dashboard/e-commerce/order-list";
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: '体检人姓名', alignRight: false },
  { id: 'appoint', label: '预约体检时间', alignRight: false },
  { id: 'amount', label: '支付金额', align: 'center' },
  { id: 'status', label: '订单状态', align: 'center'},
  { id: '' },
];

const orderResult = {
  "msg": "操作成功",
  "code": 200,
  "page": {
    "records": [
      {
        "id": "1206ad40979b19b71f6c562e5574711b",
        "userId": "da6b30674ed426f3eeb7833cfaaa62c7",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "108",
        "createTime": "2022-05-04T17:40:16.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T17:40:16.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": null,
        "orderList": null,
        "name": "宋子异"
      },
      {
        "id": "214f30ca33a17ed222ba4c17b4757c8f",
        "userId": "c68d7148da0732c73230882f5c2f10a9",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T17:41:38.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T17:41:38.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": null,
        "orderList": null,
        "name": "彭岚"
      },
      {
        "id": "2db69d900f6cf3390ffea005c30736a2",
        "userId": "739157afa14e12b88481c5c9b02b49f4",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-05T04:36:42.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-05T04:36:42.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": "2022-05-05T04:36:35.000+00:00",
        "orderList": null,
        "name": "杨晓明"
      },
      {
        "id": "2f81f00b2e561dd237be614a5442106a",
        "userId": "c25c6ef7906d5208cb5872d3bf7bc24a",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T16:37:24.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T16:37:24.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": null,
        "orderList": null,
        "name": "龚致远"
      },
      {
        "id": "45ac3cc8be46ff1b6e91f9d8e015fe9f",
        "userId": "c25c6ef7906d5208cb5872d3bf7bc24a",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "0",
        "createTime": "2022-05-04T16:58:45.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T16:58:45.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": null,
        "orderList": null,
        "name": "龚致远"
      },
      {
        "id": "4671aa9e9e5805ef931e21b6c14b1525",
        "userId": "c25c6ef7906d5208cb5872d3bf7bc24a",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T17:42:36.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T17:42:36.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": null,
        "orderList": null,
        "name": "龚致远"
      },
      {
        "id": "4a2f816cfd346b33190fedaee8dba4d9",
        "userId": "739157afa14e12b88481c5c9b02b49f4",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T17:51:31.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T17:51:31.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": "2022-05-04T17:51:24.000+00:00",
        "orderList": null,
        "name": "杨晓明"
      },
      {
        "id": "5e8824ff69725ac6687995b6c25a2222",
        "userId": "c25c6ef7906d5208cb5872d3bf7bc24a",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "157",
        "createTime": "2022-05-04T16:46:55.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T16:46:55.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": null,
        "orderList": null,
        "name": "龚致远"
      },
      {
        "id": "7acbc2d1661e569905364df373513e1f",
        "userId": "739157afa14e12b88481c5c9b02b49f4",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T17:51:00.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T17:51:00.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": null,
        "orderList": null,
        "name": "杨晓明"
      },
      {
        "id": "847ce6ec33c8ef96f01914bddb0f5b93",
        "userId": "c25c6ef7906d5208cb5872d3bf7bc24a",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T17:44:22.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T17:44:22.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": null,
        "orderList": null,
        "name": "龚致远"
      },
      {
        "id": "8d93560cdc8376f36f099899837afe72",
        "userId": "739157afa14e12b88481c5c9b02b49f4",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T17:44:39.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T17:44:39.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": null,
        "orderList": null,
        "name": "杨晓明"
      },
      {
        "id": "8feaf6e64b43b64f4e2aedbc5aa70a1b",
        "userId": "c25c6ef7906d5208cb5872d3bf7bc24a",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T17:41:58.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T17:41:58.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": null,
        "orderList": null,
        "name": "龚致远"
      },
      {
        "id": "91c4045426ca0b52def2aa1cafd5bc31",
        "userId": "739157afa14e12b88481c5c9b02b49f4",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T17:52:15.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T17:52:15.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": "2022-05-04T17:52:12.000+00:00",
        "orderList": null,
        "name": "杨晓明"
      },
      {
        "id": "92f5a7e7ecfb828a1018a36ac244b556",
        "userId": "c25c6ef7906d5208cb5872d3bf7bc24a",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T17:12:44.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T17:12:44.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": null,
        "orderList": null,
        "name": "龚致远"
      },
      {
        "id": "95ee9c8343eb8447ef65fdb582789e69",
        "userId": "c25c6ef7906d5208cb5872d3bf7bc24a",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-05T05:54:27.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-05T05:54:27.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": "2022-05-05T05:54:24.000+00:00",
        "orderList": null,
        "name": "龚致远"
      },
      {
        "id": "9e5d03a0ed0edaba9c8d43ddfde3c0c2",
        "userId": "739157afa14e12b88481c5c9b02b49f4",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T16:51:13.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T16:51:13.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": null,
        "orderList": null,
        "name": "杨晓明"
      },
      {
        "id": "a38657195a19853a0a5d24fd109f02dc",
        "userId": "739157afa14e12b88481c5c9b02b49f4",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T17:53:10.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T17:53:10.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": "2022-05-04T17:53:05.000+00:00",
        "orderList": null,
        "name": "杨晓明"
      },
      {
        "id": "a9fe00abd17fb4020f0c1c4ba57914ff",
        "userId": "c25c6ef7906d5208cb5872d3bf7bc24a",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "49",
        "createTime": "2022-05-05T06:25:46.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-05T06:25:46.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": "2022-05-05T06:25:44.000+00:00",
        "orderList": null,
        "name": "龚致远"
      },
      {
        "id": "bd6afbcf3f95c82ed990a80b25872756",
        "userId": "739157afa14e12b88481c5c9b02b49f4",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T17:48:47.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T17:48:47.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": "2022-05-04T17:48:30.000+00:00",
        "orderList": null,
        "name": "杨晓明"
      },
      {
        "id": "e58ffdc55bec202fc23f6b6a3f8cace0",
        "userId": "739157afa14e12b88481c5c9b02b49f4",
        "createBy": "0151ea00a414e445bd7130c27b284df8",
        "tradeId": null,
        "amount": "54",
        "createTime": "2022-05-04T17:45:05.000+00:00",
        "updateBy": "0151ea00a414e445bd7130c27b284df8",
        "updateTime": "2022-05-04T17:45:05.000+00:00",
        "status": null,
        "param1": null,
        "param2": null,
        "param3": null,
        "param4": null,
        "appoint": null,
        "orderList": null,
        "name": "杨晓明"
      }
    ],
    "total": 21,
    "size": 20,
    "current": 1,
    "orders": [],
    "optimizeCountSql": true,
    "searchCount": true,
    "countId": null,
    "maxLimit": null,
    "pages": 2
  }
}

// ----------------------------------------------------------------------

export default function EcommerceProductOrderList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'createdAt',
  });


  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { products, isLoading } = useSelector((state) => state.product);

  const [tableData, setTableData] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);

  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(async () => {
    const params = {
      "pageNum": 1,
      "pageSize": 20
      // conditions: {
      //   inField: {
      //     id: userIds
      //   }
      // }
    };
    const response = await axios.post("/api/order/page", params);
    const {page: {records}} = response.data;
    // setUsersInfo(response.data.usersInfo);
    setTableData(records);
  }, [products]);


  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.edit(paramCase(id)));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

  return (
    <Page title="Ecommerce: Product List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Product List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'Order' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.eCommerce.new}
            >
              New Product
            </Button>
          }
        />

        <Card>
          <OrderTableToolbar filterName={filterName} onFilterName={handleFilterName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>


                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) =>
                          row ? (
                              <OrderTableRow
                                  key={row.id}
                                  row={row}
                                  selected={selected.includes(row.id)}
                                  onSelectRow={() => onSelectRow(row.id)}
                                  onDeleteRow={() => handleDeleteRow(row.id)}
                                  onEditRow={() => handleEditRow(row.id)}
                              />
                          ) : (
                              !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                          )
                      )}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName}) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  return tableData;
}
