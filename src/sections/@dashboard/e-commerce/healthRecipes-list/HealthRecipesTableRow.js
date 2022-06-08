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
import HealthRecipes from "../../../../pages/dashboard/HealthRecipes";
//

// ----------------------------------------------------------------------

HealthRecipesTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function HealthRecipesTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();

  const { id, pid, userInfo:{name}, details,effectDesc,executeTime,isDone} = row;

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
            {details}
        </TableCell>

        <TableCell>
            {effectDesc}
        </TableCell>

        <TableCell align="center">
            <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={
                    // eslint-disable-next-line no-nested-ternary
                    isDone?'success':"warning"
                }
                sx={{ textTransform: 'capitalize' }}
            >
                {/* eslint-disable-next-line no-nested-ternary */}
                {isDone?'已完成':"未完成"}
            </Label>
        </TableCell>
        <TableCell>
            <Typography variant="subtitle2" noWrap>
                {fDate(executeTime)}
            </Typography>
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
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}