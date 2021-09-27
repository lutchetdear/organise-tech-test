import React, { useState, useEffect, useCallback } from 'react'
import SurveyChartAnswer from './SurveyChartAnswer'

const SurveyChartAnswers = (props) => {

    const API_URL = "http://212.71.234.97/survey/" + props.surveyId

    const [surveyData, setSurveyData] = useState([])

    const fetchSurveyData = useCallback(async () => {
        const response = await fetch(API_URL)
        const data = await response.json()
        setSurveyData([data])
    }, [API_URL])

    useEffect(() => {
        fetchSurveyData()
    }, [fetchSurveyData])

    useEffect(() => {
        // console.log("updated surveyData: ", surveyData)
        console.log("surveyData[0].questions: ", surveyData.length > 0 ? surveyData[0].questions : '')
    }, [surveyData])

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
