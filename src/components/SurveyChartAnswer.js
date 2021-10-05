import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SurveyChartAnswer = (props) => {
  const API_URL =
    "http://212.71.234.97/survey/" +
    props.surveyId +
    "/answers_to_question/" +
    props.questionId;

  const [answerData, setAnswerData] = useState([]);

  const fetchAnswerData = () => {
    axios.get(API_URL).then((response) => {
      setAnswerData(response.data);
    });
  };

  useEffect(() => {
    fetchAnswerData();
  }, [API_URL]);

  const filteredAnswers =
    props.filter !== "all"
      ? answerData.filter(
          (answer) => answer.member.employment_status === props.filter
        )
      : answerData;

  let rawChartData = Object.values(filteredAnswers).map(
    (h) => h.answer_content
  );

  const chartPossibleValues = rawChartData.filter((item, i, ar) => {
    return ar.indexOf(item) === i;
  }); // get unique vals in rawChartData

  console.log(chartPossibleValues);

  const chartData = chartPossibleValues.map((answer) => ({
    name: answer,
    y: rawChartData.reduce((n, val) => n + (val === answer), 0),
  }));
  const questionText = props.questionText;
  const chartOptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Survey results - " + questionText,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        data: chartData,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default SurveyChartAnswer;
