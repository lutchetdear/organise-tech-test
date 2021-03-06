import React from "react";
import moment from "moment";

const SurveyListRow = ({
  surveyData: { id, title, question_count, owner_member_name, created_at },
  doShowAnswers,
}) => {
  const formattedDate = moment(created_at).format("MMM Do YY");

  return (
    <tr
      className="survey_row clickable"
      data-survey-id={id}
      onClick={doShowAnswers}
    >
      <td>{id}</td>
      <td>{title}</td>
      <td>{question_count}</td>
      <td>{owner_member_name}</td>
      <td>{formattedDate}</td>
    </tr>
  );
};

export default SurveyListRow;
