import React from 'react'

const SurveyAnswer = (props) => {
    return (
        <tr className="survey_row">
            <td>{props.answerData.id}</td>
            <td>{props.answerData.question_id}</td>
            <td>{props.answerData.member.id}</td>
            <td>{props.answerData.member.employment_status}</td>
            <td>{props.answerData.member.workplace ? props.answerData.member.workplace.name : ''}</td>
            <td>{props.answerData.answer_content}</td>
        </tr>
    );
}

export default SurveyAnswer