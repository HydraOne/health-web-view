import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {useState} from "react";
import {RHFSelect} from "./index";

// ----------------------------------------------------------------------

// RHFSelect.propTypes = {
//   children: PropTypes.node,
//   name: PropTypes.string,
// };
//
// export default function RHFSelect({ name, children, ...other }) {
//   const { control } = useFormContext();
//
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <TextField
//           {...field}
//           select
//           fullWidth
//           SelectProps={{ native: true }}
//           error={!!error}
//           helperText={error?.message}
//
//           {...other}
//         >
//           {children}
//         </TextField>
//       )}
//     />
//   );
// }


RHFSelectNew.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    defaultValue: PropTypes.string,
};

export default function RHFSelectNew({ name,label,options,children, ...other }) {


    return (
        <div>
            <RHFSelect
                fullWidth
                name={name}
                label={label}
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                {...other}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                        sx={{
                            mx: 1,
                            my: 0.5,
                            borderRadius: 0.75,
                            typography: 'body2',
                            textTransform: 'capitalize',
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </RHFSelect>
        </div>
    );
}
