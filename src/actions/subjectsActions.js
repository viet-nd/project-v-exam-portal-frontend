import * as subjectsConstants from "../constants/subjectsConstants";
import subjectsServices from "../services/subjectsServices";

export const fetchSubjects = async (dispatch, token) => {
  dispatch({ type: subjectsConstants.FETCH_SUBJECTS_REQUEST });
  const data = await subjectsServices.fetchSubjects(token);
  if (data) {
    return dispatch({
      type: subjectsConstants.FETCH_SUBJECTS_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: subjectsConstants.FETCH_SUBJECTS_FAILURE,
      payload: data,
    });
  }
};

export const fetchSubject = async (dispatch, subjectId, token) => {
  // dispatch({ type: subjectsConstants.FETCH_SUBJECTS_REQUEST });
  const data = await subjectsServices.fetchSubject(subjectId, token);
  if (data) {
    return {
      type: subjectsConstants.FETCH_SUBJECTS_SUCCESS,
      payload: data,
    };
  } else {
    return {
      type: subjectsConstants.FETCH_SUBJECTS_FAILURE,
      payload: data,
    };
  }
};

export const addSubject = async (dispatch, subject, token) => {
  dispatch({ type: subjectsConstants.ADD_SUBJECT_REQUEST });
  const { data, isAdded, error } = await subjectsServices.addSubject(
    subject,
    token
  );
  if (isAdded) {
    return dispatch({
      type: subjectsConstants.ADD_SUBJECT_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: subjectsConstants.ADD_SUBJECT_FAILURE,
      payload: error,
    });
  }
};

export const deleteSubject = async (dispatch, subId, token) => {
  dispatch({ type: subjectsConstants.DELETE_SUBJECT_REQUEST });
  const { isDeleted, error } = await subjectsServices.deleteSubject(
    subId,
    token
  );
  if (isDeleted) {
    return dispatch({
      type: subjectsConstants.DELETE_SUBJECT_SUCCESS,
      payload: subId,
    });
  } else {
    return dispatch({
      type: subjectsConstants.DELETE_SUBJECT_FAILURE,
      payload: error,
    });
  }
};

export const updateSubject = async (dispatch, subject, token) => {
  dispatch({ type: subjectsConstants.UPDATE_SUBJECT_REQUEST });
  const { data, isUpdated, error } = await subjectsServices.updateSubject(
    subject,
    token
  );
  if (isUpdated) {
    return dispatch({
      type: subjectsConstants.UPDATE_SUBJECT_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: subjectsConstants.UPDATE_SUBJECT_FAILURE,
      payload: error,
    });
  }
};