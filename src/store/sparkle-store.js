import { createStore } from 'redux'

const initialState = {showAnswers: false, showAnswersForSurveyId: null, answersMode: 'text'}

const sparkleReducer = (state = initialState, action) => {
    if (action.type === 'showAnswers') {
        return ({
            showAnswers: true,
            showAnswersForSurveyId: action.value,
            answersMode: state.answersMode
        })
    }
    if (action.type === 'hideAnswers') {
        return ({
            showAnswers: false,
            showAnswersForSurveyId: null,
            answersMode: state.answersMode
        })
    }
    if (action.type === 'toggleAnswerMode') {
        return ({
            showAnswers: state.showAnswers,
            showAnswersForSurveyId: state.showAnswersForSurveyId,
            answersMode: state.answersMode === 'text' ? 'chart' : 'text'
        })
    }
    return state;
}

const store = createStore(sparkleReducer);

export default store;