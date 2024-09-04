import React from "react";
import {DatePicker as MuiDatePicker} from '@mui/x-date-pickers/DatePicker';
import CalendarIcon from "../../assets/calendar.svg?react";
import {Controller, RegisterOptions} from 'react-hook-form';

type TProps = {
  name: string;
  control: any;
  rules: RegisterOptions;
}

export const DatePicker: React.FC<TProps> = ({name, control, rules}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({field, fieldState: {error}}) => (
      <MuiDatePicker
        {...field}
        value={field.value || null}
        views={['day', 'month', 'year']}
        format='DD.MM.YYYY'
        slotProps={{textField: {placeholder: '_ _._ _._ _ _ _'}}}
        sx={{
          width: '100%',
          '.MuiInputBase-root': {
            border: '1px solid var(--c-str-medium)',
            borderColor: error ? 'var(--c-er-red)' : 'var(--c-str-medium)',
            borderRadius: '4px',
            '&.Mui-focused': {
              outline: '1px solid var(--c-str-medium)',
            },
          },
          input: {padding: '12.5px', fontSize: '14px'},
          '.MuiFormLabel-root': {display: 'none'},
          '.MuiOutlinedInput-notchedOutline': {display: 'none'},
        }}
        slots={{openPickerIcon: () => <CalendarIcon/>}}
      />
    )}
  />
);
