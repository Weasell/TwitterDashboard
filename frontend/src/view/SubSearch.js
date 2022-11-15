import React from "react";
import ChooseDate from "../components/chooseDate";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function SubSearch(props) {
  const location = useLocation();
  const queryKeywords = location?.state?.keywords;
  const querystartDatae = location?.state?.startDate;
  const queryendDatae = location?.state?.endDate;
  const setQueryResult = location?.state?.setQueryResult;

  const [sub_startDate, setSubStartDate] = React.useState("");
  const [sub_endDate, setSubEndDate] = React.useState("");
  const [sub_keywords, setSubKeywordState] = React.useState([]);

  function startDateChangeHandler(date) {
    console.log("startDateChangeHandler");
    if(date == null)
      setSubStartDate("");
    else
      setSubStartDate(date);
    console.log(sub_startDate);
  }

  function endDateChangeHandler(date) {
    console.log("endDateChangeHandler");
    if(date == null)
      setSubEndDate("");
    else
      setSubEndDate(date);
    console.log(sub_endDate);
  }

  const testing = async () => {
    console.log(setQueryResult);
    const content = {
      keywords: sub_keywords,
      startTime: sub_startDate,
      endTime: sub_endDate,
      source: 0,
    };
    console.log(JSON.stringify(content));
  };

  const keywordsHandler = (e) => {
    /*
          used to set state of sub_keywords
        */
    const { name, value } = e.target;
    setSubKeywordState(value.split(" "));
  };

  const onConfirm = async () => {
    const content = {
      keywords: sub_keywords,
      startTime: sub_startDate,
      endTime: sub_endDate,
      source: 0,
    };
    console.log(JSON.stringify(content));
    fetch("http://127.0.0.1:8000/queries/subsetQuery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log(json);
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div>
      <h1>Sub Query Page</h1>
      <div> start date </div>
      <ChooseDate
        date={sub_startDate}
        onChange={startDateChangeHandler}
        minDate={querystartDatae}
        maxDate={queryendDatae}
      />
      <div> end date </div>
      <ChooseDate
        date={sub_endDate}
        onChange={endDateChangeHandler}
        minDate={sub_startDate}
        maxDate={queryendDatae}
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

export default SubSearch;
