import React, { useState, useEffect } from "react";
import axios from "axios";
import SurveyChartAnswer from "../survey-chart-answer/survey-chart-answer.component";
import { filterData } from "../../utils/data.utils";

const SurveyChartAnswers = (props) => {
  const API_URL = "http://212.71.234.97/survey/" + props.surveyId;

  const [surveyData, setSurveyData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSurveyData = async () => {
    try {
      const response = await axios.get(API_URL);
      setSurveyData([response.data]);
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchSurveyData();
  }, [API_URL]);

  if (loading)
    return <div className="col d-flex justify-content-center">Loading...</div>;

  return error ? (
    <div className="col d-flex justify-content-center">
      There was an error fetching data from our server, try again later!
    </div>
  ) : (
    <div>
      {surveyData.length > 0
        ? surveyData[0].questions.map((question) => (
            <SurveyChartAnswer
              key={question.question_id}
              surveyId={props.surveyId}
              questionId={question.question_id}
              questionText={question.question_text}
              employmentStatusFilter={props.employmentStatusFilter}
              workplaceFilter={props.workplaceFilter}
            />
          ))
        : null}
    </div>
  );
};

export default SurveyChartAnswers;
