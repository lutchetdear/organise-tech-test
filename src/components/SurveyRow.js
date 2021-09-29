import React from 'react'

const SurveyRow = (props) => {

    const surveyRowClickHandler = props.doShowAnswers

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