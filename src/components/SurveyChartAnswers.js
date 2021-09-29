import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SurveyChartAnswer from './SurveyChartAnswer'

const SurveyChartAnswers = (props) => {

    const API_URL = "http://212.71.234.97/survey/" + props.surveyId

    const [surveyData, setSurveyData] = useState([])

    const fetchSurveyData = () => {
        axios.get(API_URL).then((response) => {
            setSurveyData([response.data])
        })
    }

    useEffect(() => {
        fetchSurveyData()
    }, [API_URL])

    return (
        <div>
            {
                surveyData.length > 0 ? surveyData[0].questions.map((question) => (
                    <SurveyChartAnswer
                        key={question.question_id}
                        surveyId={props.surveyId}
                        questionId={question.question_id}
                        questionText={question.question_text} />
                )) : ''
            }
        </div>
    );
    
}

export default SurveyChartAnswers
