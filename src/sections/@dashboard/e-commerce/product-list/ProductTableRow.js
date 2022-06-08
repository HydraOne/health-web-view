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

ProductTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onClickRow: PropTypes.func
};

export default function ProductTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow ,onClickRow}) {
  const theme = useTheme();

  const { id,name, type,cover, createTime, inventoryType, price ,images} = row;

  const defaultImages = images[0];

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected} >
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          {
              <Image disabledEffect alt={name} src={defaultImages} sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }} />
          }
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

        <TableCell>
            {type}
        </TableCell>

      <TableCell>{fDate(createTime)}</TableCell>

      <TableCell align="center">{fCurrency(price)}</TableCell>

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
              >
                <Iconify icon={'eva:edit-fill'} />
                编辑
              </MenuItem>
                <MenuItem
                    onClick={()=>onClickRow(id)}
                >
                <Iconify icon={'eva:eye-fill'} />
                查看
                </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
