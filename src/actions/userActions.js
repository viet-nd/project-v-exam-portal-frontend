import userServices from "~/services/userServices";
import * as authConstants from "~/constants/authConstants";
import * as userConstants from "~/constants/userConstants";

export const updateUser = async (dispatch, userId, user, token) => {
  const data = await userServices.updateUser(userId, user, token);
  if (data) {
    return {
      type: authConstants.USER_LOGIN_SUCCESS,
      payload: data.data,
    };
  } else {
    return {
      type: authConstants.USER_LOGIN_FAILURE,
      payload: data.data,
    };
  }
};

export const changePassword = async (
  userId,
  oldPassword,
  newPassword,
  token
) => {
  const { data } = await userServices.changePassword(
    userId,
    oldPassword,
    newPassword,
    token
  );
  if (data) {
    return {
      type: authConstants.USER_LOGIN_SUCCESS,
      payload: data,
    };
  } else {
    return {
      type: authConstants.USER_LOGIN_FAILURE,
      payload: data,
    };
  }
};

export const fetchAllUser = async (token) => {
  const data = await userServices.fetchAllUser(token);
  if (data) {
    return {
      type: userConstants.FETCH_USER_SUCCESS,
      payload: data.data,
    };
  } else {
    return {
      type: userConstants.FETCH_USER_FAILURE,
      payload: data.data,
    };
  }
};

export const addAccount = async (user, role, token) => {
  const data = await userServices.addAccount(user, role, token);
  if (data) {
    return {
      type: userConstants.ADD_USER_SUCCESS,
      payload: data.data,
    };
  } else {
    return {
      type: userConstants.ADD_USER_FAILURE,
      payload: data.data,
    };
  }
};

export const searchByKeyword = async (keyword, token) => {
  const data = await userServices.searchByKeyword(keyword, token);
  if (data) {
    return {
      type: userConstants.SEARCH_SUCCESS,
      payload: data.data,
    };
  } else {
    return {
      type: userConstants.SEARCH_FAILURE,
      payload: data.data,
    };
  }
};

export const fetchUserByUserId = async (userId, token) => {
  const data = await userServices.fetchUserByUserId(userId, token);
  if (data) {
    return {
      type: userConstants.FETCH_USER_SUCCESS,
      payload: data.data,
    };
  } else {
    return {
      type: userConstants.FETCH_USER_FAILURE,
      payload: data.data,
    };
  }
};

export const deleteAccount = async (userId, token) => {
  const data = await userServices.deleteAccount(userId, token);
  if (data) {
    return {
      type: userConstants.DISABLE_USER_SUCCESS,
      payload: data.data,
    };
  } else {
    return {
      type: userConstants.DISABLE_USER_FAILURE,
      payload: data.data,
    };
  }
};
