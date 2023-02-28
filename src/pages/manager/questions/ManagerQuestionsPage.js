import React, { useEffect, useState } from "react";
import "./ManagerQuestionsPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { fetchQuestionsByQuiz } from "../../../actions/questionsActions";
import Question from "../../../components/Question";
import Loader from "../../../components/Loader";

const ManagerQuestionsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("quizId");
  const quizTitle = urlParams.get("quizTitle");

  const questionsReducer = useSelector((state) => state.questionsReducer);
  const [questions, setQuestions] = useState(questionsReducer.questions);

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);

  const [quiz, setQuiz] = useState(quizzes.filter((item) => item.quizId == quizId)[0]);

  // const [questions, setQuestions] = useState();
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  let answers = {};

  const addNewQuestionHandler = () => {
    navigate(`/managerAddQuestion/?quizId=${quizId}`);
  };

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    fetchQuestionsByQuiz(dispatch, quizId, token).then((data) => {
      console.log(data);
      setQuestions(data.payload);
    });

    // fetchQuizzByQuizId(quizId, token).then((data) => {
    //   if (data.type == quizzesConstants.FETCH_QUIZZES_SUCCESS) {
    //     console.log(data.payload);
    //     setQuiz(data.payload);
    //   }
    // });
  }, []);

  console.log(quiz);
  console.log(questions);

  return (
    <div className="managerQuestionsPage__container">
      <div className="managerQuestionsPage__content">
        <h2>{`Questions : ${quizTitle}`}</h2>
        <h2
          style={{ display: (questions !== null && quiz !== null) ? "block" : "none" }}
        >{`Quantities : ${questions.length}/${quiz.numberOfQuestions}`}</h2>

        <Button
          className="managerQuestionsPage__content--button"
          onClick={addNewQuestionHandler}
          style={{ display: (questions.length >= quiz.numberOfQuestions) ? "none" : "block" }}
        >
          Add Question
        </Button>
        {questions ? (
          questions.map((q, index) => {
            return (
              <Question
                key={index}
                number={index + 1}
                answers={answers}
                question={q}
                isManager={true}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ManagerQuestionsPage;
