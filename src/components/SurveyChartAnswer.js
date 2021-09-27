import React, { useState, useCallback, useEffect } from 'react'

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SurveyChartAnswer = (props) => {

    const API_URL = "http://212.71.234.97/survey/" + props.surveyId + "/answers_to_question/" + props.questionId

    const [answerData, setAnswerData] = useState([])

    const fetchAnswerData = useCallback(async () => {
        const response = await fetch(API_URL)
        const data = await response.json()
        setAnswerData(data)
    }, [API_URL])

    useEffect(() => {
        fetchAnswerData()
    }, [fetchAnswerData])

    useEffect(() => (
        console.log(answerData)
    ), [answerData])

    const rawChartData = Object.values(answerData).map(h => h.answer_content);
    const chartPossibleValues = rawChartData.filter((item, i, ar) => ar.indexOf(item) === i);  // get unique vals in rawChartData
    const chartData = chartPossibleValues.map( answer => ( { name: answer, y: rawChartData.reduce(
        (n, val) => n + (val === answer), 0 ) } ) );
    const questionText = props.questionText
    const chartOptions = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Survey results - ' + questionText,
        },
        plotOptions: {
            pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
            }
        },
        series: [
            {
            data: chartData
            }
        ]
        };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
}

export default SurveyChartAnswer