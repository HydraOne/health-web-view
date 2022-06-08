import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

AccountTableToolbar.propTypes = {
    filterName: PropTypes.string,
    filterRole: PropTypes.string,
    onFilterName: PropTypes.func,
    onFilterRole: PropTypes.func,
    optionsRole: PropTypes.arrayOf(PropTypes.object),
};

export default function AccountTableToolbar({ filterName, filterRole, onFilterName, onFilterRole, optionsRole }) {
    return (
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
            <TextField
                fullWidth
                select
                label="用户类型"
                value={filterRole}
                onChange={onFilterRole}
                SelectProps={{
                    MenuProps: {
                        sx: { '& .MuiPaper-root': { maxHeight: 260 } },
                    },
                }}
                sx={{
                    maxWidth: { sm: 240 },
                    textTransform: 'capitalize',
                }}
            >
                {optionsRole.map((option) => (
                    <MenuItem
                        key={option.id}
                        value={option.id}
                        sx={{
                            mx: 1,
                            my: 0.5,
                            borderRadius: 0.75,
                            typography: 'body2',
                            textTransform: 'capitalize',
                        }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                fullWidth
                value={filterName}
                onChange={(event) => onFilterName(event.target.value)}
                placeholder="搜索账号"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                        </InputAdornment>
                    ),
                }}
            />
        </Stack>
    );
}
