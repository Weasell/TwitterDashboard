import React from "react";
import { useState, useCallback } from "react";

import QueryForm from "../components/QueryForm";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function Search() {
  const [TabDisabled, setTabDisabled] = React.useState(true);
  const [value, setTab] = React.useState(0);
  // const [ShowData1, setShowData1] = React.useState(true);
  const handleTab = (event, newValue) => {
    setTab(newValue);
  }
  
  function submitForm(content) {
    console.log(content);
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
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
    setTabDisabled(false);
    var show = document.getElementById("displayData");
    show.style.display = "block";
    // setShowData1(true);
  }
  return (
    <div>
      <h1 style={{ "marginTop": 0 }}>Search</h1>
      This search page provide two main function to users: query operation and subquery operation
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleTab} aria-label="basic tabs example">
            <Tab label="Query" {...a11yProps(0)} />
            <Tab label="Subquery" {...a11yProps(1)} disabled={TabDisabled}/>
          </Tabs>
        </Box>
        {/* query */}
        <TabPanel value={value} index={0}>
          <QueryForm handleSearch = {submitForm}/>
          <div id="displayData" style={{"display":"none"}}>
            Display Data
          </div>
        </TabPanel>
        {/**/}

        {/* subquery */}
        <TabPanel value={value} index={1}>
          <QueryForm handleSearch = {submitForm}/>
        </TabPanel>
        {/**/}

      </Box>
    </div>
  );
}

export default Search;
