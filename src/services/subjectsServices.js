import axios from "axios";

const fetchSubjects = async (token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let subjects = null;
    const { data } = await axios.get("/api/subject/", config);
    subjects = data;
    console.log("subjectsServices:fetchSubjects() Success: ", subjects);
    return subjects;
  } catch (error) {
    console.error(
      "subjectsServices:fetchSubjects() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};

const fetchSubject = async (subjectId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let subjects = null;
    const { data } = await axios.get(`/api/subject/${subjectId}`, config);
    subjects = data;

    console.log("subjectsServices:fetchSubject() Success: ", subjects);
    return subjects;
  } catch (error) {
    console.error(
      "subjectsServices:fetchSubject() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};

const addSubject = async (subject, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.post("/api/subject/", subject, config);
    console.log("subjectsServices:addSubject() Success: ", data);
    return { data: data, isAdded: true, error: null };
  } catch (error) {
    console.error(
      "subjectsServices:addSubject() Error: ",
      error.response.statusText
    );
    return { data: null, isAdded: false, error: error.response.statusText };
  }
};

const deleteSubject = async (subId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.delete(`/api/subject/${subId}/`, config);
    console.log("subjectsServices:deleteSubject()  Success: ", data);
    return {
      isDeleted: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "subjectsServices:deleteSubject()  Error: ",
      error.response.statusText
    );
    return {
      isDeleted: false,
      error: error.response.statusText,
    };
  }
};

const updateSubject = async (subject, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.put(
      `/api/subject/${subject.subId}`,
      subject,
      config
    );
    console.log("subjectsServices:updateSubject()  Success: ", data);
    return {
      data: data,
      isUpdated: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "subjectsServices:updateSubject()  Error: ",
      error.response.statusText
    );
    return {
      data: null,
      isUpdated: false,
      error: error.response.statusText,
    };
  }
};

const subjectsService = {
  fetchSubject,
  addSubject,
  deleteSubject,
  updateSubject,
  fetchSubjects,
};
export default subjectsService;
