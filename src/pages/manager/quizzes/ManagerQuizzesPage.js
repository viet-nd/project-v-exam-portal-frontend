import React, { useEffect, useState } from "react";
import "./ManagerQuizzesPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, ListGroup } from "react-bootstrap";
import Message from "../../../components/Message";
import { deleteQuiz, fetchQuizzes } from "../../../actions/quizzesActions";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import swal from "sweetalert";
import { fetchSubClass } from "../../../actions/subClassActions";
import { fetchSubjects } from "../../../actions/subjectsActions";
import * as subClassConstants from "../../../constants/subClassConstants";
import * as subjectsConstants from "../../../constants/subjectsConstants";

const ManagerQuizzesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const [subClassId, setSubClassId] = useState(urlParams.get("subClassId"));
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);

  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;

  const subjectsReducer = useSelector((state) => state.subjectsReducer);
  const [subjects, setSubjects] = useState(subjectsReducer.subjects);

  const subClassesReducer = useSelector((state) => state.subClassesReducer);
  const [subClasses, setSubClasses] = useState(subClassesReducer.subClasses);
  const [selectedSubId, setSelectedSubId] = useState(
    subClassId
      ? subClasses.filter((item) => item.subClassId == subClassId)[0].subject
          .subId
      : null
  );
  const [selectedSubClassId, setSelectedSubClassId] = useState(
    subClassId ? subClassId : null
  );

  const addNewQuizHandler = () => {
    navigate("/managerAddQuiz");
  };
  const deleteQuizHandler = (quiz) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this quiz!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteQuiz(dispatch, quiz.quizId, token).then((data) => {
          if (data.type === quizzesConstants.DELETE_QUIZ_SUCCESS) {
            swal(
              "Quiz Deleted!",
              `${quiz.title} succesfully deleted`,
              "success"
            );
          } else {
            swal("Quiz Not Deleted!", `${quiz.title} not deleted`, "error");
          }
        });
      } else {
        swal(`${quiz.title} is safe`);
      }
    });
  };
  const updateQuizHandler = (quizTitle, quizId) => {
    navigate(`/managerUpdateQuiz/${quizId}`);
  };

  const questionsHandler = (quizTitle, quizId) => {
    navigate(`/managerQuestions/?quizId=${quizId}&quizTitle=${quizTitle}`);
  };

  useEffect(() => {
    if (quizzes.length === 0) {
      fetchQuizzes(dispatch, token).then((data) => {
        if (data.type == quizzesConstants.FETCH_QUIZZES_SUCCESS) {
          setQuizzes(data.payload);
        }
      });
    }
    if (subClasses.length === 0) {
      fetchSubClass(dispatch, null, token).then((data) => {
        if (data.type == subClassConstants.FETCH_SUB_CLASSES_SUCCESS) {
          setSubClasses(data.payload);
        }
      });
    }
    if (subjects.length == 0) {
      fetchSubjects(dispatch, token).then((data) => {
        if (data.type == subjectsConstants.FETCH_SUBJECTS_SUCCESS) {
          setSubjects(data.payload);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  const onSelectSubjectHandler = (e) => {
    setSelectedSubId(e.target.value);
  };

  const onSelectSubClassHandler = (e) => {
    setSelectedSubClassId(e.target.value);
  };

  // useEffect(() => {
  //   if (selectedSubId !== null && selectedSubId !== "n/a") {
  //     setSubClasses(
  //       subClasses.filter((item) => item.subject.subId == selectedSubId)
  //     );
  //   }
  // }, [selectedSubId]);

  // console.log(selectedSubId);
  // console.log(selectedSubClassId);
  // console.log(quizzes);
  // console.log(showSubClasses);quizClickHandler

  return (
    <div className="managerQuizzesPage__container">
      <h2>Quizzes</h2>
      <div className="managerQuizzesPage__header">
        <Form.Select
          className="choose-class"
          aria-label="Choose Subject"
          id="subject-select"
          onChange={onSelectSubjectHandler}
          value={selectedSubId ? selectedSubId : "n/a"}
        >
          <option value="n/a">Choose Subject</option>
          {subjects.length !== 0 ? (
            subjects.map((sub, index) => (
              <option key={index} value={sub.subId}>
                {sub.title}
              </option>
            ))
          ) : (
            <option value="">Choose one from below</option>
          )}
        </Form.Select>

        <Form.Select
          className="choose-class"
          aria-label="Choose Class"
          id="subject-class"
          onChange={onSelectSubClassHandler}
          value={selectedSubClassId ? selectedSubClassId : "n/a"}
        >
          <option value="n/a">Choose Class</option>
          {subClasses.length !== 0 ? (
            subClasses.map((subClass, index) => {
              if (subClass.subject.subId == selectedSubId) {
                return (
                  <option key={index} value={subClass.subClassId}>
                    {subClass.name}
                  </option>
                );
              }
            })
          ) : (
            <option value="">Choose one from below</option>
          )}
        </Form.Select>
      </div>
      <div className="managerQuizzesPage__content">
        {quizzes &&
        selectedSubClassId !== "n/a" &&
        selectedSubClassId !== null ? (
          quizzes.length === 0 ? (
            <Message>No quizzes are present. Try adding some quizzes.</Message>
          ) : (
            quizzes.map((quiz, index) => {
              if (quiz.subClass.subClassId == selectedSubClassId)
                return (
                  <ListGroup
                    className="managerQuizzesPage__content--quizzesList"
                    key={index}
                  >
                    <ListGroup.Item className="align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{`Class: ${quiz.subClass.name}`}</div>
                        <div className="fw-bold">{`Title: ${quiz.title}`}</div>
                        <p className="my-3">{`Description: ${quiz.description}`}</p>
                        <h4
                          className="my-3"
                          style={{
                            color: quiz.iactive
                              ? "var(--primary)"
                              : "var(--black)",
                          }}
                        >
                          {quiz.iactive ? "Public" : "Private"}
                        </h4>
                        <div className="managerQuizzesPage__content--ButtonsList">
                          <div
                            className="managerQuizzesPage__content--Button"
                            onClick={() =>
                              navigate(
                                `/managerQuizManual?quizId=${quiz.quizId}`
                              )
                            }
                            style={{}}
                          >
                            {`Start`}
                          </div>
                          <div
                            style={{
                              border: "1px solid grey",
                              // width: "100px",
                              padding: "1px",
                              textAlign: "center",
                              borderRadius: "5px",
                              height: "35px",
                              margin: "0px 4px",
                            }}
                          >{`Marks : ${quiz.maxMarks}`}</div>
                          <div
                            style={{
                              border: "1px solid grey",
                              // width: "100px",
                              padding: "1px",
                              textAlign: "center",
                              borderRadius: "5px",
                              height: "35px",
                              margin: "0px 4px",
                            }}
                          >{`${quiz.numberOfQuestions} Questions`}</div>

                          <div
                            style={{
                              display:
                                user.userId == quiz.subClass.createBy
                                  ? "flex"
                                  : "none",
                            }}
                          >
                            <div
                              onClick={() =>
                                questionsHandler(quiz.title, quiz.quizId)
                              }
                              style={{
                                border: "1px solid grey",
                                // width: "100px",
                                height: "35px",
                                padding: "1px",
                                textAlign: "center",
                                borderRadius: "5px",
                                color: "white",
                                backgroundColor: "rgb(68 177 49)",
                                margin: "0px 4px",
                              }}
                            >{`Questions`}</div>
                            <div
                              onClick={() =>
                                updateQuizHandler(quiz.title, quiz.quizId)
                              }
                              style={{
                                border: "1px solid grey",
                                color: "white",
                                backgroundColor: "rgb(68 177 49)",
                                // width: "100px",
                                padding: "1px",
                                textAlign: "center",
                                borderRadius: "5px",
                                height: "35px",
                                margin: "0px 4px",
                              }}
                            >{`Update`}</div>
                            <div
                              onClick={() => deleteQuizHandler(quiz)}
                              style={{
                                border: "1px solid grey",
                                color: "white",
                                backgroundColor: "#ff0b0bdb",
                                // width: "100px",
                                padding: "2px",
                                textAlign: "center",
                                borderRadius: "5px",
                                height: "35px",
                                margin: "0px 4px",
                              }}
                            >{`Delete`}</div>
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                );
            })
          )
        ) : (
          <div></div>
        )}
        <Button
          variant=""
          className="managerQuizzesPage__content--button"
          onClick={addNewQuizHandler}
        >
          Add Quiz
        </Button>
      </div>
    </div>
  );
};

export default ManagerQuizzesPage;
