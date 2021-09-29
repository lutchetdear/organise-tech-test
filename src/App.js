import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SurveyList from './components/SurveyList'

const App = () => {

  const [surveys, setSurveys] = useState([])

  const fetchSurveys = () => {
    axios.get("http://212.71.234.97/surveys/").then((response) => {
      setSurveys(response.data)
    })
  }

  useEffect(() => {
    fetchSurveys()
  }, [])

  return (
    <React.Fragment>
      <h1>Surveys</h1>
      <SurveyList surveys={surveys} />
    </React.Fragment>
  );
}

export default App;
