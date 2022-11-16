import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function SelectDate(props) {
  function onChangeHandler(date) {
    props.handleChange(date);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={props.text}
        value={props.curDate}
        selected={props.curDate}
        minDate={props.minDate}
        maxDate={props.maxDate}
        onChange={onChangeHandler}
        renderInput={(params) => <TextField {...params} />}
        fromMonth = {props.minDate}
        disabledDays = {{after : props.maxDate}}
      />
    </LocalizationProvider>
  );
}

