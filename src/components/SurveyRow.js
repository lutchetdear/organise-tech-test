import React from 'react'
import { useDispatch } from 'react-redux'

const SurveyRow = (props) => {

    const dispatch = useDispatch()

    const surveyRowClickHandler = () => {
        dispatch({type: 'showAnswers', value: props.id})
    }

    return (
        <tr className="survey_row clickable" survey_id={props.surveyData.id} onClick={surveyRowClickHandler}>
            <td>{props.surveyData.id}</td>
            <td>{props.surveyData.title}</td>
            <td>{props.surveyData.question_count}</td>
            <td>{props.surveyData.owner_member_name}</td>
            <td>{props.surveyData.created_at}</td>
        </tr>
    );
}

export default SurveyRow