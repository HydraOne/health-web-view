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
import {HealthInfoTableRow, HealthInfoTableToolbar} from "../../sections/@dashboard/e-commerce/healthinfo-list";
import CheckoutNewAddressForm from "../../sections/@dashboard/e-commerce/checkout/CheckoutNewAddressForm";
import {NewHealthInfoForm} from "../../sections/@dashboard/e-commerce/checkout";
import {
    HealthProgramTableRow,
    HealthProgramTableToolbar
} from "../../sections/@dashboard/e-commerce/healthProgram-list";
import NewHealthProgramForm from "../../sections/@dashboard/e-commerce/checkout/NewHealthProgramForm";
import NewHealthNewsForm from "../../sections/@dashboard/e-commerce/checkout/NewHealthNewsForm";
import {HealthNewsTableRow, HealthNewsTableToolbar} from "../../sections/@dashboard/e-commerce/healthNews-list";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'title', label: '标题', alignRight: false },
    { id: '' },
];


// ----------------------------------------------------------------------

export default function HealthNews() {
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


    const [open,setOpen] = useState(false);

    const openEditForm = ()=>{
        setOpen(true);
    }

    const closeEditForm = ()=>{
        setOpen(false);
    }

    const { themeStretch } = useSettings();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { products, isLoading } = useSelector((state) => state.product);

    const [tableData, setTableData] = useState([]);

    const [editInfo, setEditInfo] = useState({});

    const [edit,setEdit] = useState(false);

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
        const response = await axios.get("/api/healthNews/list", params);
        const {list} = response.data;
        // // setUsersInfo(response.data.usersInfo);
        // setTableData(healthInfos);
        setTableData(list);
    }, [localStorage.getItem("currentUserId")]);


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

    const handleEditRow = async (id) => {
        await axios.get(`/api/healthNews/get/${id}`).then(res => {
            setEditInfo(res.data.healthNews);
            openEditForm();
            setEdit(true);
        });
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
                    heading="健康计划"
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
                            onClick={openEditForm}
                        >
                            新增健康新闻
                        </Button>
                    }
                />

                <Card>
                    <HealthNewsTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                                                <HealthNewsTableRow
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
                    <NewHealthNewsForm
                        open={open}
                        onClose={closeEditForm}
                        healthProgram={editInfo}
                        isEdit={edit}
                    />
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
