import * as subClassConstants from "~/constants/subClassConstants";
import subClassServices from "../services/subClassServices";

export const fetchSubClass = async (dispatch, subClassId = null, token) => {
  dispatch({ type: subClassConstants.FETCH_SUB_CLASSES_REQUEST });
  const data = await subClassServices.fetchSubClass(subClassId, token);
  if (data) {
    return dispatch({
      type: subClassConstants.FETCH_SUB_CLASSES_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: subClassConstants.FETCH_SUB_CLASSES_FAILURE,
      payload: data,
    });
  }
};

export const fetchSubClassBySubId = async (dispatch, subId = null, token) => {
  // dispatch({ type: subClassConstants.FETCH_SUB_CLASSES_REQUEST });
  const data = await subClassServices.fetchSubClassBySubId(subId, token);
  if (data) {
    return {
      type: subClassConstants.FETCH_SUB_CLASSES_SUCCESS,
      payload: data,
    };
  } else {
    return {
      type: subClassConstants.FETCH_SUB_CLASSES_FAILURE,
      payload: data,
    };
  }
};

export const fetchSubClassByUserId = async (userId, token) => {
  const data = await subClassServices.fetchSubClassByUserId(userId, token);
  if (data) {
    return {
      type: subClassConstants.FETCH_SUB_CLASSES_SUCCESS,
      payload: data,
    };
  } else {
    return {
      type: subClassConstants.FETCH_SUB_CLASSES_FAILURE,
      payload: data,
    };
  }
};

export const joinSubClass = async (dispatch, subClassId, userId, keyActive, token) => {
  dispatch({ type: subClassConstants.UPDATE_SUB_CLASS_REQUEST });
  const data = await subClassServices.joinSubClass(subClassId, userId, keyActive, token);
  if (data) {
    return dispatch({
      type: subClassConstants.UPDATE_SUB_CLASS_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: subClassConstants.UPDATE_SUB_CLASS_FAILURE,
      payload: data,
    });
  }
};

export const detachSubClass = async (subClassId, userId, token) => {
  const data = await subClassServices.detachSubClass(subClassId, userId, token);
  if (data) {
    return {
      type: subClassConstants.UPDATE_SUB_CLASS_SUCCESS,
      payload: data,
    };
  } else {
    return {
      type: subClassConstants.UPDATE_SUB_CLASS_FAILURE,
      payload: data,
    };
  }
};

export const addSubClass = async (dispatch, subClass, token) => {
  dispatch({ type: subClassConstants.ADD_SUB_CLASS_REQUEST });
  const { data, isAdded, error } = await subClassServices.addSubClass(
    subClass,
    token
  );
  if (isAdded) {
    return dispatch({
      type: subClassConstants.ADD_SUB_CLASS_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: subClassConstants.ADD_SUB_CLASS_FAILURE,
      payload: error,
    });
  }
};

export const updateSubClass = async (dispatch, subClass, token) => {
  dispatch({ type: subClassConstants.UPDATE_SUB_CLASS_REQUEST });
  const { data, isUpdated, error } = await subClassServices.updateSubClass(
    subClass,
    token
  );
  if (isUpdated) {
    return dispatch({
      type: subClassConstants.UPDATE_SUB_CLASS_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: subClassConstants.UPDATE_SUB_CLASS_FAILURE,
      payload: error,
    });
  }
};

export const deleteSubClass = async (dispatch, subClassId, token) => {
  dispatch({ type: subClassConstants.DELETE_SUB_CLASS_REQUEST });
  const { isDeleted, error } = await subClassServices.deleteSubClass(
    subClassId,
    token
  );
  if (isDeleted) {
    return dispatch({
      type: subClassConstants.DELETE_SUB_CLASS_SUCCESS,
      payload: subClassId,
    });
  } else {
    return dispatch({
      type: subClassConstants.DELETE_SUB_CLASS_FAILURE,
      payload: error,
    });
  }
};
