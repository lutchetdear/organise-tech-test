import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SurveyAnswer from './SurveyAnswer'

const SurveyAnswers = (props) => {

    useEffect(() => {
        console.log(props.surveyId)
    }, [props.surveyId])

    const API_URL = "http://212.71.234.97/survey/" + props.surveyId.toString() + "/answers"

    const [answers, setAnswers] = useState([])

    const fetchAnswers = () => {
        axios.get(API_URL).then((response) => {
            // just get the first 100 rows; otherwise
            // it's too many (thousands) and the browser hangs
            // as it tries to render all the rows
            setAnswers(response.data.slice(0, 100))
        })
    }

    useEffect(() => {
        fetchAnswers()
    }, [API_URL])

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
