import React, { useState, useEffect } from "react";
import axios from "axios";
import SurveyAnswer from "./SurveyAnswer";
import FilterSelector from "./FilterSelector";

const SurveyAnswers = (props) => {
  const API_URL =
    "http://212.71.234.97/survey/" + props.surveyId.toString() + "/answers";
  const EMPLOYMENT_STATUSES = ["employed", "self_employed", "other", "retired"];

  const [answers, setAnswers] = useState([]);
  const [filteredAnswers, setFilteredAnswers] = useState([]);
  const [answerFilter, setAnswerFilter] = useState("");
  const [error, setError] = useState(false);

  const fetchAnswers = async () => {
    try {
      let answers = await axios.get(API_URL);
      answers = answers.data.slice(0, 100);
      setAnswers(answers);
      if (answerFilter)
        answers = answers.filter(
          (answer) => answer.member.employment_status !== answerFilter
        );
      setFilteredAnswers(answers);
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };

  const handleEmploymentFilterChange = (newFilter) => {
    if (newFilter === "all") {
      setFilteredAnswers(answers);
      return;
    }

    setAnswerFilter(newFilter);
    setFilteredAnswers(
      answers.filter((answer) => answer.member.employment_status === newFilter)
    );
    console.log(filteredAnswers);
  };

  useEffect(async () => {
    await fetchAnswers();
  }, [API_URL]);

  return (
    <div className="survey-answers">
      {error ? (
        <div>
          There was an error fetching data from our server, try again later!
        </div>
      ) : (
        <div className="answer-table">
          <FilterSelector
            choices={EMPLOYMENT_STATUSES}
            changeHandler={handleEmploymentFilterChange}
          />
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
              {filteredAnswers.map((answer) => (
                <SurveyAnswer key={answer.id} answerData={answer} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SurveyAnswers;
