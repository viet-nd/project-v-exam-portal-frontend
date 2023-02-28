import axios from "axios";

const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/api/file/avatar", formData, config);
    // if (data) {
      console.log("fileService:uploadAvatar() Success: ", data);
      return { data: data, error: null };
    // } else {
    //   console.error("fileService:uploadAvatar() Error: ");
    //   return { data };
    // }
  } catch (error) {
    console.error(
      "fileService:uploadAvatar() Error: ",
      error.response.statusText
    );
    return {data: null, error: error.response.statusText };
  }
};

const uploadQuestion = async (fileList, token) => {
  try {
    const formData = new FormData();
    fileList.forEach((file, i) => {
      formData.append(`files`, file)
    });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/api/file/question", formData, config);
    // if (data) {
    console.log("fileService:uploadQuestion() Success: ", data);
    return { data: data, error: null };

    // } else {
    //   console.error("fileService:uploadQuestion() Error: ");
    //   return { data };
    // }
  } catch (error) {
    console.error(
      "fileService:uploadQuestion() Error: ",
      error.response.statusText
    );
    return {data: null, error: error.response.statusText };
  }
};

const deleteImage = async (fileCode, type, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = await axios.delete(
      `/api/file/${fileCode}?type=${type}`,
      config
    );
    console.log("fileService:deleteImage() Success: ", data);
    return data;
  } catch (error) {
    console.error(
      "fileService:deleteImage() Error: ",
      error.response.statusText
    );
    return null;
  }
};

const fileServices = { uploadAvatar, deleteImage, uploadQuestion };
export default fileServices;
