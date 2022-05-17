import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {deepOrange} from "@mui/material/colors";
import {
    TableRow,
    Checkbox,
    TableCell,
    Typography,
    MenuItem,
    ListItemAvatar,
    ImageListItem,
    Avatar
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
//

// ----------------------------------------------------------------------

OrderTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function OrderTableRow({ row, selected, onEditRow, onViewRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();

  const { id, appoint, amount,name,status} = row;


  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

        <TableCell>
            <Typography variant="subtitle2" noWrap>
                {name}
            </Typography>
        </TableCell>


        <TableCell>
            {fDate(appoint)}
        </TableCell>

      <TableCell align="center">{fCurrency(amount)}</TableCell>

      <TableCell align="center">
        <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={
                // eslint-disable-next-line no-nested-ternary
                status==='isAppoint'?'warning':(status==='isCheck'?'secondary':'success')
            }
            sx={{ textTransform: 'capitalize' }}
        >
            {/* eslint-disable-next-line no-nested-ternary */}
            {status==='isAppoint'?'已预约':(status==='isCheck'?'已检查':'已完成')}
        </Label>
      </TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                删除
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'primary.main' }}
              >
                <Iconify icon={'eva:edit-fill'} />
                编辑
              </MenuItem>
              {
                  status==='isRecord'&&
                  <MenuItem
                  onClick={() => {
                      onViewRow();
                      handleCloseMenu();
                  }}
              >
                  <Iconify icon={'eva:eye-fill'} />
                  查看
              </MenuItem>
              }
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
