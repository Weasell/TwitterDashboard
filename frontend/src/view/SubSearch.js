import React from "react";
import { useLocation } from "react-router-dom";
import ChooseDate from "../components/chooseDate";
import { Form } from "react-bootstrap";

function SubSearch(props) {
  const location = useLocation();
  const queryKeywords = location?.state?.keywords;
  const querystartDatae = location?.state?.startDate;
  const queryendDatae = location?.state?.endDate;

  const [sub_startDate, setSubStartDate] = React.useState(null);
  const [sub_endDate, setSubEndDate] = React.useState(null);
  const [sub_keywords, setSubKeywordState] = React.useState(null);

  function startDateChangeHandler(date) {
    console.log("startDateChangeHandler");
    setSubStartDate(date);
    console.log(sub_startDate);
  }

  function endDateChangeHandler(date) {
    console.log("endDateChangeHandler");
    setSubEndDate(date);
    console.log(sub_endDate);
  }

  const onChange = (e) => {
    /*
          used to set state of sub_keywords
        */
    const { name, value } = e.target;
    setSubKeywordState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onConfirm = async () => {
    const content = {
      keywords: sub_keywords,
      startTime: sub_startDate,
      endTime: sub_endDate,
      source: 0,
    };
    fetch("http://127.0.0.1:8000/queries/setQuery", {
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

  const onConfirm1 = async () => {
    console.log(
        " fuck1 " +
        JSON.stringify(queryKeywords) + "\n" +
        " fuck2" +
        querystartDatae + "\n" +
        " fuck3 " +
        queryendDatae +  "\n" +
        " fuck4 " +
        JSON.stringify(sub_keywords) + "\n" +
        " fuck5 " +
        sub_startDate + "\n" +
        " fuck6 " + 
        sub_endDate 
    );
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
          onChange={onChange}
        />
      </Form.Group>
      <button onClick={() => onConfirm1()}>test</button>
      <button onClick={() => onConfirm()}>search</button>
    </div>
  );
}

export default SubSearch;
