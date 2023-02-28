import fileServices from "../services/fileServices";

export const uploadAvatar = async (file) => {
//   dispatch({ type: authConstants.USER_REGISTER_REQUEST });
  const { data } = await fileServices.uploadAvatar(file);
  return data;
};

export const uploadQuestion = async (fileList, token) => {
  //   dispatch({ type: authConstants.USER_REGISTER_REQUEST });
    const { data } = await fileServices.uploadQuestion(fileList, token);
    return data;
  };

export const deleteImage = async (fileCode, type, token) => {
  //   dispatch({ type: authConstants.USER_REGISTER_REQUEST });
    const { data } = await fileServices.deleteImage(fileCode, type, token);
    return data;
  };