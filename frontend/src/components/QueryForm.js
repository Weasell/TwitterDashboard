import * as React from 'react';
import SelectDate from './SelectDate';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function QueryForm(props) {
  const {handleSearch} = props;
  const [startDate, setStartDate] = React.useState(new Date("04-07-2019"));
  const [endDate, setEndDate] = React.useState(new Date("11-01-2021"));
  const [keywords, setKeyword] = React.useState(null);
  const [type, setType] = React.useState(1);
  const handleStartDate = (date) => {
    setStartDate(date);
  }
  const handleEndDate = (date) => {
    setEndDate(date);
  }
  // const handleKeyword = useCallback((e) => {
  //   setKeyword(e.target.value)}, console.log(keywords))

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  function submit(){
    const content = {
      startTime: startDate,
      endTime: endDate,
      keywords: keywords,
      source: type,
    };
    handleSearch(content);
  }
  return (
    <Stack spacing={2} direction="row">
      <SelectDate type="Start Time" defaultDate={startDate} handleChange={handleStartDate} />
      <SelectDate type="End Time" defaultDate={endDate} handleChange={handleEndDate} />
      <TextField id="Keyword" label="Keyword" variant="outlined" onChange={(e) => handleKeyword(e)} />
      <FormControl sx={{ width: '15ch' }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleTypeChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={submit}>Search</Button>
    </Stack>
  );
}