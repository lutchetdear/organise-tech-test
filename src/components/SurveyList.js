import React from 'react'
import SurveyRow from './SurveyRow'
import SurveyAnswers from './SurveyAnswers'
import SurveyChartAnswers from './SurveyChartAnswers'
import { useSelector, useDispatch } from 'react-redux'

const SurveyList = (props) => {
    const dispatch = useDispatch()
    const hideAnswersClickHandler = () => {
        dispatch({type: 'hideAnswers'})
    }
    const toggleAnswersModeHandler = () => {
        dispatch({type: 'toggleAnswerMode'})
    }
    const answersShown = useSelector(state => state.showAnswers)
    const answersShownSurveyId = useSelector(state => state.showAnswersForSurveyId)
    // add toggle for 'answersMode' - chart or text
    const answersMode = useSelector(state => state.answersMode)
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
                    {props.surveys.map((survey) => <SurveyRow key={survey.id} id={survey.id} surveyData={survey} />)}
                </tbody>
            </table>
            {answersShown ? <div id="hide_answers_button" onClick={hideAnswersClickHandler}>Hide Answers</div> : ''}
            {answersShown ? <div id="toggle_answer_mode_button" onClick={toggleAnswersModeHandler}>{answersMode === 'text' ? 'Show Answers as Charts' : 'Show Answers as Text (first 100 only)'}</div>:''}
            {answersShown ? <h2>Answers to Survey ID {answersShownSurveyId}:</h2> : ''}
            {answersShown ? (answersMode === 'text' ? <SurveyAnswers surveyId={answersShownSurveyId} /> : <SurveyChartAnswers surveyId={answersShownSurveyId} />) : ''}
            {/*{answersShown ? <SurveyAnswers surveyId={answersShownSurveyId} /> : ''} */}
        </React.Fragment>
    );
}

export default SurveyList
