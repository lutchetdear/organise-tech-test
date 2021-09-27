import React, { useState, useEffect, useCallback } from 'react'
import SurveyList from './components/SurveyList'

const App = () => {
  const [surveys, setSurveys] = useState([])
  
  const fetchSurveys = useCallback(async () => {
    const response = await fetch("http://212.71.234.97/surveys/")
    const data = await response.json()
    setSurveys(data)
  }, [])

  useEffect(() => {
    fetchSurveys()
  }, [fetchSurveys])

  return (
    <React.Fragment>
      <h1>Surveys</h1>
      <SurveyList surveys={surveys} />
    </React.Fragment>
  );
}

export default App;
