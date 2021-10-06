import React, { useState } from "react";

import SurveyListRow from "../survey-list-row/survey-list-row.component";
import SurveyAnswers from "../survey-answers/survey-answers.component";
import SurveyChartAnswers from "../survey-chart-answers/survey-chart-answers.component";
import FilterSelector from "../filter-selector/filter-selector.component";
import FilterText from "../filter-text/filter-text.component";

import "./survey-list.styles.scss";

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
    <div className="survey-list">
      <div className="table-responsive survey-list col d-flex justify-content-center">
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
              <SurveyListRow
                key={survey.id}
                id={survey.id}
                surveyData={survey}
                doShowAnswers={doShowAnswers.bind(survey.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {showAnswers ? (
        <div className="data-control-container col d-flex justify-content-center">
          <div className="data-controls card">
            <h3>Data Controls</h3>
            <FilterSelector
              label="Employment Status"
              choices={EMPLOYMENT_STATUSES}
              changeHandler={(newFilter) =>
                setEmploymentStatusFilter(newFilter)
              }
            />
            <FilterText
              label="Workplace"
              changeHandler={(newFilter) => setWorkplaceFilter(newFilter)}
            />
            <div id="hide_answers_button" onClick={hideAnswersClickHandler}>
              Hide Answers
            </div>
            <div
              id="toggle_answer_mode_button"
              onClick={toggleAnswersModeHandler}
            >
              {answersMode === "text"
                ? "Show Answers as Charts"
                : "Show Answers as Text (first 100 only)"}
            </div>
          </div>
        </div>
      ) : null}

      {showAnswers ? (
        <h2>Answers to Survey ID {showAnswersForSurveyId.toString()}:</h2>
      ) : null}
      {showAnswers ? (
        answersMode === "text" ? (
          <div className="table-responsive">
            <SurveyAnswers
              surveyId={showAnswersForSurveyId}
              employmentStatusFilter={employmentStatusFilter}
              workplaceFilter={workplaceFilter}
            />
          </div>
        ) : (
          <SurveyChartAnswers
            surveyId={showAnswersForSurveyId}
            employmentStatusFilter={employmentStatusFilter}
            workplaceFilter={workplaceFilter}
          />
        )
      ) : null}
    </div>
  );
};

export default SurveyList;
