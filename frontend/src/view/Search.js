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
    let response = await axios({
        method: "get",
        url: "http://localhost:5000/inventory",
        // url: "http://localhost:8000/queries/setQuery",
        data: {
          keywords: ["123"],
          startTime: startDate,
          endTime: endDate,
          source: 2,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      }).then((reply) => {
          console.log(reply);
      }).catch((err) => {
          console.log(err.response);
      });
    //wait for axios call
    // const result = await axiosCall();
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
