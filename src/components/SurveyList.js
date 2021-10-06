import React, { useState } from "react";

import SurveyRow from "./SurveyRow";
import SurveyAnswers from "./SurveyAnswers";
import SurveyChartAnswers from "./SurveyChartAnswers";
import FilterSelector from "./filter-selector/filter-selector.component";
import FilterText from "./filter-text/filter-text.component";

const SurveyList = (props) => {
  const {
    showAnswers,
    hideAnswersClickHandler,
    showAnswersForSurveyId,
    answersMode,
    toggleAnswersModeHandler,
    surveys,
    doShowAnswers,
  } = props;

  const EMPLOYMENT_STATUSES = ["employed", "self_employed", "other", "retired"];

  const [employmentStatusFilter, setEmploymentStatusFilter] = useState("all");
  const [workplaceFilter, setWorkplaceFilter] = useState("");

  return (
    <React.Fragment>
      <table id="survey_list">
        <thead>
          <tr>
            <td>Survey ID</td>
            <td>Survey Title</td>
            <td># of Questions</td>
            <td>Created By</td>
            <td>Created At</td>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (
            <SurveyRow
              key={survey.id}
              id={survey.id}
              surveyData={survey}
              doShowAnswers={doShowAnswers.bind(survey.id)}
            />
          ))}
        </tbody>
      </table>
      <FilterSelector
        label="Employment Status"
        choices={EMPLOYMENT_STATUSES}
        changeHandler={(newFilter) => setEmploymentStatusFilter(newFilter)}
      />
      <FilterText
        label="Workplace"
        changeHandler={(newFilter) => setWorkplaceFilter(newFilter)}
      />
      {showAnswers ? (
        <div id="hide_answers_button" onClick={hideAnswersClickHandler}>
          Hide Answers
        </div>
      ) : null}
      {showAnswers ? (
        <div id="toggle_answer_mode_button" onClick={toggleAnswersModeHandler}>
          {answersMode === "text"
            ? "Show Answers as Charts"
            : "Show Answers as Text (first 100 only)"}
        </div>
      ) : null}
      {showAnswers ? (
        <h2>Answers to Survey ID {showAnswersForSurveyId.toString()}:</h2>
      ) : null}
      {showAnswers ? (
        answersMode === "text" ? (
          <SurveyAnswers
            surveyId={showAnswersForSurveyId}
            employmentStatusFilter={employmentStatusFilter}
            workplaceFilter={workplaceFilter}
          />
        ) : (
          <SurveyChartAnswers
            surveyId={showAnswersForSurveyId}
            employmentStatusFilter={employmentStatusFilter}
            workplaceFilter={workplaceFilter}
          />
        )
      ) : null}
    </React.Fragment>
  );
};

export default SurveyList;
