import React from "react";
import ChooseDate from "../components/chooseDate";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Search() {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [keywords, setKeywordState] = React.useState([]);

  function startDateChangeHandler(date) {
    console.log("startDateChangeHandler");
    if(date == null)
      setStartDate("");
    else
      setStartDate(date);
    console.log("set start date to", startDate);
  }

  function endDateChangeHandler(date) {
    console.log("endDateChangeHandler");
    if(date == null)
      setEndDate("");
    else
      setEndDate(date);
    console.log("set end date to", endDate);
  }

  const keywordsHandler = (e) => {
    /*
      used to set state of keywords
    */
    const { name, value } = e.target;
    setKeywordState(value.split(" "));
  };

  const navigate = useNavigate();
  const testing = async () => {
    const content = {
      keywords: keywords,
      startTime: startDate,
      endTime: endDate,
      source: 0,
    };
    console.log(JSON.stringify(content));
  };

  const onConfirm = async () => {
    const content = {
      keywords: keywords,
      startTime: startDate,
      endTime: endDate,
      source: 0,
    };
    console.log(JSON.stringify(content));
    fetch("http://127.0.0.1:8000/queries/setQuery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((setQueryResult) => {
            console.log(setQueryResult);
            navigate("/subSearch", {
              state: { startDate: startDate, endDate: endDate, keywords: keywords, setQueryResult: setQueryResult},
            });
          });
        }
      })
      .catch((err) => {
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

      <div> Key Word </div>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="input key word"
          name="keywords"
          onChange={keywordsHandler}
        />
      </Form.Group>

      <button onClick={() => testing()}>test</button>
      <button onClick={() => onConfirm()}>search</button>
    </div>
  );
}

export default Search;
