# sparkle-frontend

**sparkle-frontend** is a small toy application that shows survey results.

It retrieves the data from a separate application, which serves as a backend. The backend lives at http://212.71.234.97.

The API endpoints for the backend are documented separately.

This application can show a selection of survey results as text.

It can also show pie charts that visualize the answers to survey questions.

It has six components in addition to the 'main' (App) component:

* SurveyList
* SurveyRow
* SurveyAnswers
* SurveyAnswer
* SurveyChartAnswers
* SurveyChartAnswer

The components work roughly like this:

## App shows SurveyList

**App** also manages most of the state in the application.

There are four state variables in **App**:

* surveys
* showAnswers
* showAnswersForSurveyId
* answersMode

These are passed as props to **SurveyList**.

Also passed as props to **SurveyList** are three event handler functions:

* hideAnswersClickHandler
* toggleAnswersModeHandler
* doShowAnswers

**hideAnswersClickHandler** is called when the user clicks the 'Hide Answers' button, which appears in **SurveyList** when survey answers (in text or chart form) are being shown.

**toggleAnswersModeHandler** is called when the user clicks the 'Show Answers as Charts' or 'Show Answers as Text' buttons, one of which should appear when survey answers are being shown. If answers are currently being shown as text, the 'Show Answers as Charts' button should be shown. If answers are being shown as charts, the 'Show Answers as Text' button should be shown.

**doShowAnswers** is called when the user clicks one of the **SurveyRow**s.

It's extremely possible that some or all of these functions would have been better placed somewhere else (such as in **SurveyList**).

## SurveyList shows SurveyRow rows and SurveyAnswers

**SurveyList** shows a table whose rows are rendered **SurveyRow** components.

If answers are being shown, **SurveyList** also shows the survey answers.

If the answers are being shown in text mode (i.e., if **answersMode** is 'text'), these are shown by **SurveyAnswers**.

If the answers are being shown as charts, these are shown by **SurveyChartAnswers**.

**SurveyList** has some state which is passed down from **SurveyList**.

## A SurveyRow includes 'high level' information about a single survey

A **SurveyRow** includes 'high level' information about a single survey (the ID of the survey, the title of the survey, how many questions are in it, who made it, and when it was made), but no questions or answers.

## SurveyAnswers shows a table whose rows are SurveyAnswer rows

**SurveyAnswers** is shown when answers are shown in text mode.

**SurveyAnswers** only shows 100 answers, because showing the tens of thousands of answers for a survey causes the browser to hang.

## SurveyChartAnswers shows one SurveyChartAnswer (which is a single pie chart) for each question in the survey

**SurveyChartAnswers** is shown when answers are shown in text mode.

## SurveyChartAnswer renders a single pie chart that visualizes the answers to a single question

**SurveyChartAnswer** uses the highcharts-react-official library to render a pie chart from survey answers.