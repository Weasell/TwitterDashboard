import React from "react";
import ChooseDate from "../components/chooseDate";
import axios from "axios";

function Search() {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  function startDateChangeHandler(date) {
    console.log("startDateChangeHandler");
    setStartDate(date);
    console.log(startDate);
  }

  function endDateChangeHandler(date) {
    console.log("endDateChangeHandler");
    setEndDate(date);
    console.log(endDate);
  }
  const onConfirm1 = async () => {
    console.log(startDate, endDate);
  };

  const onConfirm = async () => {
    const content = {
      keywords: [],
      startTime: startDate,
      endTime: endDate,
      source: 0,
    };
    fetch('http://127.0.0.1:8000/queries/setQuery',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content)
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json);
        });
      }
    }).catch((err) => {
      console.log(err.response);
    });
  };

  return (
    <div>
      <h1>Search</h1>
      <div> start date </div>
      <ChooseDate
        date={startDate}
        onChange={startDateChangeHandler}
        minDate={new Date("04-07-2019")}
        maxDate={new Date("11-01-2021")}
      />
      <div> end date </div>
      <ChooseDate
        date={endDate}
        onChange={endDateChangeHandler}
        minDate={startDate}
        maxDate={new Date("11-01-2021")}
      />
      <button onClick={() => onConfirm1()}>test</button>
      <button onClick={() => onConfirm()}>search</button>

      {/* for debug purpose to render out the date */}
      {/* <div>
          <p id='start_date'>Start Date: {startDate ?  JSON.stringify(startDate) : null}</p>
          <p id='end_date'>End Date: {endDate ?  JSON.stringify(endDate) : null}</p>
    </div> */}
    </div>
  );
}

export default Search;
