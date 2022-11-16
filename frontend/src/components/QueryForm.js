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
  // const minDate = new Date("04-07-2019");
  // const maxDate = new Date("11-01-2021");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [keywords, setKeyword] = React.useState([]);
  const [source, setSource] = React.useState(0);

  const handleStartDate = (date) => {
    if(date === null)
      setStartDate("")
    else
      setStartDate(date.toString());
    // console.log("handle Start Date", startDate);
  }

  const handleEndDate = (date) => {
    if(date === null)
      setEndDate("")
    else
      setEndDate(date.toString());
      // console.log("handle End Date", endDate);
  }

  const handleKeyword = (e) => {
    setKeyword(e.target.value.split(" "));
  };

  const handleSourceChange = (event) => {
    setSource(event.target.value);
  };

  function submit(){
    const content = {
      startTime: startDate,
      endTime: endDate,
      keywords: keywords,
      source: source,
    };
    handleSearch(content);
  }
  return (
    <Stack spacing={2} direction="row">
      <SelectDate 
        text="Start Time" 
        curDate={startDate} 
        handleChange={handleStartDate} 
        minDate={new Date("04-07-2019")} 
        maxDate={new Date("11-01-2021")}
      />
      <SelectDate 
        text="End Time" 
        curDate={endDate} 
        handleChange={handleEndDate} 
        minDate={new Date("04-07-2019")} 
        maxDate={new Date("11-01-2021")}
      />
      <TextField 
        id="Keyword" 
        label="Keyword" 
        variant="outlined" 
        onChange={(e) => handleKeyword(e)} 
      />
      <FormControl sx={{ width: '15ch' }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={source}
          label="Source"
          onChange={handleSourceChange}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={1}>Avengers Endgame</MenuItem>
          <MenuItem value={2}>Game of Thrones S8</MenuItem>
          <MenuItem value={3}>Squid Game</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={submit}>Search</Button>
    </Stack>
  );
}