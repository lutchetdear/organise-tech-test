import React, { useState, useEffect } from "react";
import axios from "axios";

import SurveyAnswer from "../survey-answer/survey-answer.component";
import { filterData } from "../../utils/data.utils";

const SurveyAnswers = (props) => {
  const API_URL =
    "http://212.71.234.97/survey/" + props.surveyId.toString() + "/answers";

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAnswers = () => {
    try {
      axios.get(API_URL).then((response) => {
        // just get the first 100 rows; otherwise
        // it's too many (thousands) and the browser hangs
        // as it tries to render all the rows
        setAnswers(response.data.slice(0, 100));
      });
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAnswers();
  }, [API_URL]);

  const filteredAnswers = filterData(
    props.workplaceFilter,
    props.employmentStatusFilter,
    answers
  );

  if (loading)
    return <div className="col d-flex justify-content-center">Loading...</div>;

  if (filteredAnswers.length === 0)
    return (
      <div className="col d-flex justify-content-center">No results found!</div>
    );

  return (
    <div className="survey-answers col d-flex justify-content-center">
      {error ? (
        <div>
          There was an error fetching data from our server, try again later!
        </div>
      ) : (
        <div className="answer-table">
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
