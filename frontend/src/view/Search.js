import React from "react";
import ChooseDate from "../components/chooseDate";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Search() {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [keywords, setKeywordState] = React.useState(null);

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

  const onChange = (e) => {
    /*
      used to set state of keywords
    */
    const { name, value } = e.target;
    setKeywordState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const onConfirm1 = async () => {
    console.log(startDate, endDate, keywords);
    navigate("/SubSearch" , {
      state: {
        startDate: startDate, 
        endDate: endDate, 
        keywords: keywords 
      }
    }
    );
  };

  const onConfirm = async () => {
    const content = {
      keywords: keywords,
      startTime: startDate,
      endTime: endDate,
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

    navigate("/subSearch", {
      state: { startDate: startDate, endDate: endDate, keywords: keywords },
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
          onChange={onChange}
        />
      </Form.Group>

      <button onClick={() => onConfirm1()}>test</button>
      <button onClick={() => onConfirm()}>search</button>
    </div>
  );
}

export default Search;
