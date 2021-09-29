import React from 'react'
import SurveyRow from './SurveyRow'
import SurveyAnswers from './SurveyAnswers'
import SurveyChartAnswers from './SurveyChartAnswers'

const SurveyList = (props) => {

    const answersShown = props.showAnswers
    const hideAnswersClickHandler = props.hideAnswersClickHandler

    const answersShownSurveyId = props.showAnswersForSurveyId

    const answersMode = props.answersMode
    const toggleAnswersModeHandler = props.toggleAnswersModeHandler

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
                    {props.surveys.map((survey) => <SurveyRow key={survey.id} id={survey.id} surveyData={survey} doShowAnswers={props.doShowAnswers.bind(survey.id)} />)}
                </tbody>
            </table>
            {answersShown ? <div id="hide_answers_button" onClick={hideAnswersClickHandler}>Hide Answers</div> : ''}
            {answersShown ? <div id="toggle_answer_mode_button" onClick={toggleAnswersModeHandler}>{answersMode === 'text' ? 'Show Answers as Charts' : 'Show Answers as Text (first 100 only)'}</div>:''}
            {answersShown ? <h2>Answers to Survey ID {answersShownSurveyId.toString()}:</h2> : ''}
            {answersShown ? (answersMode === 'text' ? <SurveyAnswers surveyId={answersShownSurveyId} /> : <SurveyChartAnswers surveyId={answersShownSurveyId} />) : ''}
        </React.Fragment>
    );
}

export default SurveyList
