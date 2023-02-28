import * as quizResultConstants from "../constants/quizResultConstants";
import quizResultServices from "../services/quizResultServices";

export const submitQuiz = async (dispatch, userId, quizId, answers, token) => {
  dispatch({ type: quizResultConstants.ADD_QUIZ_RESULT_REQUEST });
  const { data, isAdded, error } = await quizResultServices.submitQuiz(
    userId,
    quizId,
    answers,
    token
  );
  if (isAdded) {
    return dispatch({
      type: quizResultConstants.ADD_QUIZ_RESULT_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: quizResultConstants.ADD_QUIZ_RESULT_FAILURE,
      payload: error,
    });
  }
};

export const fetchQuizResultByUserId = async (dispatch, userId, token) => {
  dispatch({ type: quizResultConstants.FETCH_QUIZ_RESULT_REQUEST });
  const data = await quizResultServices.fetchQuizResultByUserId(userId, token);
  if (data) {
    return dispatch({
      type: quizResultConstants.FETCH_QUIZ_RESULT_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: quizResultConstants.FETCH_QUIZ_RESULT_FAILURE,
      payload: data,
    });
  }
};

export const fetchQuizResult = async (dispatch, token) => {
  dispatch({ type: quizResultConstants.FETCH_QUIZ_RESULT_REQUEST });
  const data = await quizResultServices.fetchQuizResult(token);
  if (data) {
    return dispatch({
      type: quizResultConstants.FETCH_QUIZ_RESULT_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: quizResultConstants.FETCH_QUIZ_RESULT_FAILURE,
      payload: data,
    });
  }
};
