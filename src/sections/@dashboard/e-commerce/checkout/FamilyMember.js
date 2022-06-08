import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
// @mui
import {Box, Grid, Card, Button, Typography, Stack} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { onBackStep, onNextStep, createBilling } from '../../../../redux/slices/product';
// _mock_
import { _addressBooks } from '../../../../_mock';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutNewAddressForm from './CheckoutNewAddressForm';
import axios from "../../../../utils/axios";
import {fDate, fTimestamp} from "../../../../utils/formatTime";
import NewFamilyMemberForm from "./NewFamilyMemberForm";

// ----------------------------------------------------------------------

export default function FamilyMember() {
  //
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const { total, discount, subtotal } = checkout;
  //
  const [open, setOpen] = useState(false);

  const [userList,setUserList] = useState([]);

  const [editInfo, setEditInfo] = useState({});

  const [edit,setEdit] = useState(false);

  useEffect(async () => {
      const response = await axios.get('/api/userInfo/get');
      const {usersInfo} = response.data;
      setUserList(usersInfo);
  },[localStorage.accessToken])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleEditRow = async (id) => {
    await axios.get(`/api/userInfo/get/${id}`).then(res => {
        setEditInfo(res.data.userInfo);
        handleClickOpen();
        setEdit(true);
    });
    // navigate(PATH_DASHBOARD.invoice.edit(paramCase(id)));
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleCreateBilling = (value) => {
    dispatch(createBilling(value));
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
        <Stack spacing={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size="small" onClick={handleClickOpen} startIcon={<Iconify icon={'eva:plus-fill'} />}>
                    添加家庭成员
                </Button>
            </Box>
            {userList.map((userInfo, index) => (
                <FamilyMemberItem
                    key={userInfo.id}
                    userInfo={userInfo}
                    onNextStep={handleNextStep}
                    onCreateBilling={handleCreateBilling}
                    onEditRow={handleEditRow}
                />
            ))}
        </Stack>
        </Grid>
      </Grid>
        <NewFamilyMemberForm
            open={open}
            familyMember={editInfo}
            onClose={handleClose}
            isEdit={edit}
            onNextStep={handleNextStep}
            onCreateBilling={handleCreateBilling}
        />
    </>
  );
}

// ----------------------------------------------------------------------

FamilyMemberItem.propTypes = {
  userInfo: PropTypes.object,
  onNextStep: PropTypes.func,
  editFamilyMember: PropTypes.func,
  onEditRow: PropTypes.func,
};

function FamilyMemberItem({ userInfo, editFamilyMember ,onEditRow}) {
  const { id,name, gender, idCard, contact, birth, isDefault } = userInfo;

  return (
    <Card sx={{ p: 3, mb: 3, position: 'relative' }}>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({gender})
        </Typography>
        {isDefault && (
          <Label color="info" sx={{ ml: 1 }}>
            Default
          </Label>
        )}
      </Box>
      <Typography variant="body2" gutterBottom>
        {fDate(birth)}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {contact}
      </Typography>

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          position: { sm: 'absolute' },
          right: { sm: 24 },
          bottom: { sm: 24 },
        }}
      >
          <Button variant="outlined" size="small" color="error">
              删除
          </Button>
        <Box sx={{ mx: 0.5 }} />
        <Button variant="outlined" size="small" color="inherit" onClick={()=>onEditRow(id)}>
          编辑
        </Button>
      </Box>
    </Card>
  );
}