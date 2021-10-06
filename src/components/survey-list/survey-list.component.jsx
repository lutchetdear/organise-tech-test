import React, { useState } from "react";

import SurveyRow from "../SurveyRow";
import SurveyAnswers from "../SurveyAnswers";
import SurveyChartAnswers from "../SurveyChartAnswers";
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
      <div className="table-responsive survey-list">
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
      </div>

      {showAnswers ? (
        <div className="data-controls card mx-auto">
          <h3>Data Controls</h3>
          <FilterSelector
            label="Employment Status"
            choices={EMPLOYMENT_STATUSES}
            changeHandler={(newFilter) => setEmploymentStatusFilter(newFilter)}
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