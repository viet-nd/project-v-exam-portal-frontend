import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./UserQuizzesPage.css";
import {
  fetchQuizzesBySubClassId,
} from "../../actions/quizzesActions";
import { Card, Col, Form, Row } from "react-bootstrap";
import {
  fetchSubClassByUserId,
} from "../../actions/subClassActions";
import * as quizResultConstants from "../../constants/quizResultConstants";
import { fetchQuizResultByUserId } from "../../actions/quizResultActions";

const UserQuizzesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);
  const [subClasses, setSubClasses] = useState(null);
  const [subClassId, setSubClassId] = useState(urlParams.get("subClassId") ? urlParams.get("subClassId") : null);

  const loginReducer = useSelector((state) => state.loginReducer);

  const user = loginReducer.user;

  const [quizResults, setQuizResults] = useState(null);

  useEffect(() => {
    if (quizResults == null)
      fetchQuizResultByUserId(dispatch, user.userId, token).then((data) => {
        if (data.type === quizResultConstants.FETCH_QUIZ_RESULT_SUCCESS) {
          setQuizResults(data.payload);
        }
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    console.log(user.userId);
    fetchSubClassByUserId(user.userId, token).then((data) => {
      setSubClasses(data.payload);
    });
  }, []);

  const onSelectSubClassHandler = (e) => {
    console.log(e.target.value);
    setSubClassId(e.target.value);
  };

  useEffect(() => {
    console.log("ok0");

    if (subClassId !== null) {
      console.log("ok1");

      fetchQuizzesBySubClassId(dispatch, subClassId, token).then((data) => {
        setQuizzes(data.payload);
      });
    }
  }, [subClassId]);

  return (
    <div className="userQuizzesPage__container">
      <div className="userQuizzesPage__header">
        <Form.Select
          className="choose-class"
          aria-label="Choose Subject"
          id="subject-select"
          onChange={onSelectSubClassHandler}
        >
          <option value="n/a">Choose Class</option>
          {subClasses ? (
            subClasses.map((subClass, index) => (
              <option key={index} value={subClass.subClassId}>
                {subClass.name}
              </option>
            ))
          ) : (
            <option value="">Choose one from below</option>
          )}
        </Form.Select>
      </div>

      <div className="userQuizzesPage__content">
        {quizzes && subClassId && quizResults.length !== 0? (
          <Row>
            {quizzes.map((q, index) => {
              if (q.iactive)
                return (
                  <Col
                    key={index}
                    xl={3}
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    style={{}}
                  >
                    <Card
                      text="dark"
                      style={{
                        width: "100%",
                        height: "95%",
                        padding: "5px",
                        margin: "auto",
                        marginTop: "5px",
                        minWidth: "0px",
                        wordWrap: "break-word",
                        backgroundColor: (quizResults.filter((item) => item.quiz.quizId == q.quizId)[0]) ? "var(--gray)" : "var(--pink-glamour)"
                      }}
                      className="mb-2"
                    >
                      <Card.Body>
                        <Card.Title>{q.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {q.subClass.name}
                        </Card.Subtitle>
                        <Card.Text>{q.description}</Card.Text>
                        <div className="userQuizzesPage__content--ButtonsList">
                          <div
                            className="userQuizzesPage__content--Button"
                            onClick={() =>
                              navigate(`/quizManual?quizId=${q.quizId}`)
                            }
                            style={{}}
                          >
                            {`Start`}
                          </div>

                          <div
                            className="userQuizzesPage__content--Button"
                            onClick={() => console.log("View")}
                            style={{ color: "black", backgroundColor: "white" }}
                          >{`20 Minutes`}</div>

                          <div
                            className="userQuizzesPage__content--Button"
                            onClick={() => console.log("View")}
                            style={{ color: "black", backgroundColor: "white" }}
                          >{`${q.numberOfQuestions} Questions`}</div>

                          <div
                            className="userQuizzesPage__content--Button"
                            onClick={() => console.log("View")}
                            style={{ color: "black", backgroundColor: "white" }}
                          >{`Marks : ${q.maxMarks}`}</div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
            })}
          </Row>
        ) : (
          <p>No Quizzes Available</p>
        )}
      </div>
    </div>
  );
};

export default UserQuizzesPage;
