import React, { useState, useEffect, useCallback } from 'react'
import SurveyAnswer from './SurveyAnswer'

const SurveyAnswers = (props) => {

    const API_URL = "http://212.71.234.97/survey/" + props.surveyId + "/answers"

    const [answers, setAnswers] = useState([])

    const fetchAnswers = useCallback(async () => {
        const response = await fetch(API_URL)
        const data = await response.json()
        // just get the first 100 rows; otherwise it's too many (thousands)
        // setAnswers(data)
        setAnswers(data.slice(0, 100))
    }, [API_URL])

    useEffect(() => {
        fetchAnswers()
    }, [fetchAnswers])

    return (
        <table>
            <thead>
                <tr>
                    <td>Answer ID</td>
                    <td>Question ID</td>
                    <td>Member ID</td>
                    <td>Employment Status</td>
                    <td>Workplace</td>
                    <td>Answer</td>
                </tr>
            </thead>
            <tbody>
                {answers.map((answer) => <SurveyAnswer key={answer.id} answerData={answer} />)}
            </tbody>
        </table>
    );
}

export default SurveyAnswers
