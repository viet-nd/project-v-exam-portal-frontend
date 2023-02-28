import React, { useEffect, useState } from "react";
import "./UserQuizManualPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import { fetchQuizzes } from "../../actions/quizzesActions";
import * as quizzesConstants from "../../constants/quizzesConstants";

const UserQuizManualPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("quizId");

  const quizzesReducer = useSelector((state) => {
    console.log(state);
    return state.quizzesReducer;
  });
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);
  const [quiz, setQuiz] = useState(
    quizzes.filter((q) => q.quizId == quizId)[0]
  );
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const startQuizHandler = (quizTitle, quizId) => {
    navigate(`/questions/?quizId=${quizId}&quizTitle=${quizTitle}`);
  };

  // useEffect(() => {
  //   fetchQuestionsByQuiz(dispatch, quizId, token).then((data) => {
  //     // console.log(data);
  //     // setQuestions(data.payload);
  //     // setTimeRemaining(data.payload.timer * 1 * 60);
  //   });
  // }, []);

  useEffect(() => {
    if (quizzes.length == 0) {
      fetchQuizzes(dispatch, token).then((data) => {
        if (data.type === quizzesConstants.FETCH_QUIZZES_SUCCESS) {
          setQuiz(data.payload.filter((q) => q.quizId == quizId)[0]);
        }
      });
      // fetchQuizzes(dispatch, token).then((data) => {
      //   const temp = data.payload;
      //   setQuizzes(temp);
      //   setQuiz(temp.filter((q) => q.quizId == quizId)[0]);
      // });
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  return (
    <div className="quizManualPage__container">
      {quiz ? (
        <div className="quizManualPage__content">
          <div className="quizManualPage__content--section">
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
          </div>

          <hr />

          <div>
            <h3>Important Instructions</h3>
            <ul>
              <li>
                You have to submit quiz within{" "}
                <strong>{quiz.timer} minutes</strong>.
              </li>
              <li>You can attempt the quiz any number of time.</li>
              <li>
                There are <strong>{quiz.numberOfQuestions} questions</strong> in
                this quiz.
              </li>
              <li>
                Total Marks for this quiz is <strong>{quiz.maxMarks}.</strong>
              </li>
            </ul>
          </div>

          <hr />

          <div>
            <h3>Attempting Quiz</h3>
            <ul>
              <li>
                Click <strong>Start Quiz</strong> button to start the quiz.
              </li>
              <li>
                The timer will start the moment, you will click on the Start
                Quiz button.
              </li>
              <li>
                You can not resume this quiz if interrupted due to any reason.
              </li>
              <li>
                Click on <strong>Submit Quiz</strong> button on completion of
                the quiz.
              </li>
            </ul>
          </div>

          <Button
            className="quizManualPage__content--button"
            onClick={() => startQuizHandler(quiz.title, quiz.quizId)}
            variant="primary"
          >
            Start Quiz
          </Button>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UserQuizManualPage;
