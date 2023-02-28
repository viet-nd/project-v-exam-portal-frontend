import axios from "axios";

const fetchSubClass = async (subClassId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let subClasses = null;
    if (subClassId === null) {
      const { data } = await axios.get("/api/subClass/", config);
      subClasses = data;
    } else {
      const { data } = await axios.get(`/api/subClass/${subClassId}`, config);
      subClasses = data;
    }
    console.log("subClassesServices:fetchSubClass() Success: ", subClasses);
    return subClasses;
  } catch (error) {
    console.error(
      "subClassesServices:fetchSubClass() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};

const fetchSubClassByUserId = async (userId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let subClasses = null;

    const { data } = await axios.get(`/api/subClass/?userId=${userId}`, config);
    subClasses = data;

    console.log(
      "subClassesServices:fetchSubClassByUserId() Success: ",
      subClasses
    );
    return subClasses;
  } catch (error) {
    console.error(
      "subClassesServices:fetchSubClassByUserId() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};

const fetchSubClassBySubId = async (subId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let subClasses = null;
    if (subId === null) {
      const { data } = await axios.get("/api/subClass/", config);
      subClasses = data;
    } else {
      const { data } = await axios.get(
        `/api/subClass/?subjectId=${subId}`,
        config
      );
      subClasses = data;
    }

    console.log(
      "subClassesServices:fetchSubClassBySubId() Success: ",
      subClasses
    );
    return subClasses;
  } catch (error) {
    console.error(
      "subClassesServices:fetchSubClassBySubId() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};

const joinSubClass = async (subClassId, userId, keyActive, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let subClasses = null;

    const { data } = await axios.put(
      `/api/subClass/join/${subClassId}?userId=${userId}&keyActive=${keyActive}`,
      null,
      config
    );
    subClasses = data;

    console.log("subClassesServices:joinSubClass() Success: ", subClasses);
    return subClasses;
  } catch (error) {
    console.error(
      "subClassesServices:joinSubClass() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};

const detachSubClass = async (subClassId, userId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let subClasses = null;

    const { data } = await axios.put(
      `/api/subClass/detach/${subClassId}?userId=${userId}`,
      null,
      config
    );
    subClasses = data;

    console.log("subClassesServices:detachSubClass() Success: ", subClasses);
    return subClasses;
  } catch (error) {
    console.error(
      "subClassesServices:detachSubClass() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};

const addSubClass = async (subClass, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.post("/api/subClass/", subClass, config);
    console.log("subClassesServices:addSubClass() Success: ", data);
    return { data: data, isAdded: true, error: null };
  } catch (error) {
    console.error(
      "subClassesServices:addSubClass() Error: ",
      error.response.statusText
    );
    return { data: null, isAdded: false, error: error.response.statusText };
  }
};

const updateSubClass = async (subClass, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.put(
      `/api/subClass/${subClass.subClassId}`,
      subClass,
      config
    );
    console.log("subClassesServices:updateSubClass()  Success: ", data);
    return {
      data: data,
      isUpdated: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "subClassesServices:updateSubClass()  Error: ",
      error.response.statusText
    );
    return {
      data: null,
      isUpdated: false,
      error: error.response.statusText,
    };
  }
};

const deleteSubClass = async (subClassId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.delete(`/api/subClass/${subClassId}`, config);
    console.log("subClassesServices:deleteSubClass()  Success: ", data);
    return {
      isDeleted: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "subClassesServices:deleteSubClass()  Error: ",
      error.response.statusText
    );
    return {
      isDeleted: false,
      error: error.response.statusText,
    };
  }
};

const subClassessService = {
  fetchSubClass,
  fetchSubClassByUserId,
  fetchSubClassBySubId,
  joinSubClass,
  detachSubClass,
  addSubClass,
  updateSubClass,
  deleteSubClass,
};
export default subClassessService;
