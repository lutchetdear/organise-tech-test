import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SurveyList from './components/SurveyList'

const App = () => {

  const [surveys, setSurveys] = useState([])

  const [showAnswers, setShowAnswers] = useState(false)
  const hideAnswersClickHandler = () => {
    setShowAnswers(false)
  }

  const [showAnswersForSurveyId, setShowAnswersForSurveyId] = useState(null)

  const [answersMode, setAnswersMode] = useState('text')
  const toggleAnswersModeHandler = () => {
    setAnswersMode(answersMode === 'text' ? 'chart' : 'text')
  }

  const fetchSurveys = () => {
    axios.get("http://212.71.234.97/surveys/").then((response) => {
      setSurveys(response.data)
    })
  }

  const doShowAnswers = (event) => {
    const trElem = event.target.parentNode
    const surveyId = trElem.getAttribute("survey_id")
    setShowAnswers(true)
    setShowAnswersForSurveyId(surveyId)
  }

  useEffect(() => {
    fetchSurveys()
  }, [])

  return (
    <React.Fragment>
      <h1>Surveys</h1>
      <SurveyList
        surveys={surveys} 
        showAnswers={showAnswers} 
        hideAnswersClickHandler={hideAnswersClickHandler}
        showAnswersForSurveyId={showAnswersForSurveyId} 
        answersMode={answersMode} 
        toggleAnswersModeHandler={toggleAnswersModeHandler} 
        doShowAnswers={doShowAnswers} />
    </React.Fragment>
  );
}

export default App;
