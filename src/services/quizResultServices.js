import axios from "axios";

const submitQuiz = async (userId, quizId, answers, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.post(
      `/api/quizResult/submit/?userId=${userId}&quizId=${quizId}`,
      answers,
      config
    );
    console.log("quizResultServices:submitQuiz() Success: ", data);
    return { data: data, isAdded: true, error: null };
  } catch (error) {
    console.error(
      "quizResultServices:submitQuiz() Error: ",
      error.response.statusText
    );
    return { data: null, isAdded: false, error: error.response.statusText };
  }
};

const fetchQuizResultByUserId = async (userId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get(
      `/api/quizResult/?userId=${userId}`,
      config
    );
    console.log("quizResultServices:fetchQuizResult() Success: ", data);
    return data;
  } catch (error) {
    console.error(
      "quizResultServices:fetchQuizResult() Error: ",
      error.response.statusText
    );
    return null;
  }
};

const fetchQuizResult = async (token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get(
      `/api/quizResult/`,
      config
    );
    console.log("quizResultServices:fetchQuizResult() Success: ", data);
    return data;
  } catch (error) {
    console.error(
      "quizResultServices:fetchQuizResult() Error: ",
      error.response.statusText
    );
    return null;
  }
};

const quizResultServices = { submitQuiz, fetchQuizResultByUserId, fetchQuizResult };

export default quizResultServices;
