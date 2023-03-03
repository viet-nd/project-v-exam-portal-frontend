import React, { useEffect, useState } from "react";
import "./ManagerQuizResultPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchQuizResult,
} from "../../../actions/quizResultActions";
import * as quizResultConstants from "../../../constants/quizResultConstants";
import Message from "../../../components/Message";
import { Link } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import { fetchSubjects } from "../../../actions/subjectsActions";
import { fetchSubClass } from "../../../actions/subClassActions";
import * as subjectsConstants from "../../../constants/subjectsConstants";
import * as subClassConstants from "../../../constants/subClassConstants";
import { fetchAllUser } from "../../../actions/userActions";
import * as userConstants from "../../../constants/userConstants";

const ManagerQuizResultPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizResultReducer = useSelector((state) => state.quizResultReducer);

  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;
  const userId = user ? user.userId : null;

  const subjectsReducer = useSelector((state) => state.subjectsReducer);
  const [subjects, setSubjects] = useState(subjectsReducer.subjects);

  const subClassesReducer = useSelector((state) => state.subClassesReducer);
  const [subClasses, setSubClasses] = useState(subClassesReducer.subClasses);

  const [selectedSubId, setSelectedSubId] = useState("n/a");
  const [selectedSubClassId, setSelectedSubClassId] = useState("n/a");

  const [quizResults, setQuizResults] = useState(null);
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const [inputUserId, setInputUserId] = useState("");

  const [userList, setUserList] = useState();

  useEffect(() => {
    if (quizResults == null)
      fetchQuizResult(dispatch, token).then((data) => {
        if (data.type === quizResultConstants.FETCH_QUIZ_RESULT_SUCCESS) {
          setQuizResults(data.payload);
        }
      });

    if (subjects.length == 0) {
      fetchSubjects(dispatch, token).then((data) => {
        if (data.type == subjectsConstants.FETCH_SUBJECTS_SUCCESS) {
          setSubjects(data.payload);
        }
      });
    }

    if (subClasses.length == 0) {
      fetchSubClass(dispatch, null, token).then((data) => {
        if (data.type == subClassConstants.FETCH_SUB_CLASSES_SUCCESS) {
          setSubClasses(data.payload);
        }
      });
    }

    fetchAllUser(token).then((data) => {
      if (data.type == userConstants.FETCH_USER_SUCCESS) {
        setUserList(data.payload);
      }
    });
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

  const handleChangeInputUserId = (e) => {
    const inputUserIdChange = e.target.value;

    if (!inputUserIdChange.startsWith(" ")) {
      setInputUserId(inputUserIdChange);
    }
  };

  // console.log(inputUserId);
  // console.log(typeof inputUserId);
  // console.log(selectedSubId);
  // console.log(selectedSubClassId);

  return (
    <div className="managerQuizResultPage__container">
      <div className="managerQuizResultPage__header">
        <Form.Select
          className="choose-class"
          aria-label="Choose Subject"
          id="subject-select"
          onChange={onSelectSubjectHandler}
        >
          <option value="n/a">Choose Subject</option>
          {subjects ? (
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
        >
          <option value="n/a">Choose Class</option>
          {subClasses ? (
            subClasses.map((subClass, index) => {
              if (
                subClass.createBy == userId &&
                subClass.subject.subId == selectedSubId
              ) {
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

        <div>
          {`UserId: `}
          <input
            style={{ border: "1px solid var(--black)", borderRadius: "5px" }}
            type={"number"}
            value={inputUserId}
            placeholder={"user id"}
            onChange={handleChangeInputUserId}
          />
        </div>
      </div>
      <div className="managerQuizResultPage__content">
        {quizResults && quizResults.length !== 0 ? (
          <Table bordered className="managerQuizResultPage__content--table">
            <thead>
              <tr>
                <th>User Id</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Quiz Id</th>
                <th>Quiz Name</th>
                <th>Class Name</th>
                <th>Subject Name</th>
                <th>Obtained Marks</th>
                <th>Total Marks</th>
                <th>Date</th>
              </tr>
            </thead>
            {quizResults.map((r, index) => {
              if (selectedSubId !== "n/a") {
                if (selectedSubClassId !== "n/a") {
                  if (inputUserId !== "") {
                    if (
                      r.quiz.subClass.subClassId == selectedSubClassId &&
                      r.userId == inputUserId
                    ) {
                      return (
                        <tbody key={index}>
                          <tr>
                            <td>
                              {userList
                                ? userList.filter(
                                    (item) => item.userId == r.userId
                                  )[0].userId
                                : "null"}
                            </td>
                            <td>
                              {userList
                                ? userList.filter(
                                    (item) => item.userId == r.userId
                                  )[0].fullName
                                : "null"}
                            </td>
                            <td>
                              {userList
                                ? userList.filter(
                                    (item) => item.userId == r.userId
                                  )[0].phoneNumber
                                : "null"}
                            </td>
                            <td>{r.quiz.quizId}</td>
                            <td>{r.quiz.title}</td>
                            <td>{r.quiz.subClass.name}</td>
                            <td>{r.quiz.subClass.subject.title}</td>
                            <td>{r.totalObtainedMarks}</td>
                            <td>{r.quiz.maxMarks}</td>
                            <td>{r.attemptDatetime}</td>
                          </tr>
                        </tbody>
                      );
                    }
                  } else {
                    if (r.quiz.subClass.subClassId == selectedSubClassId) {
                      return (
                        <tbody key={index}>
                          <tr>
                            <td>
                              {userList
                                ? userList.filter(
                                    (item) => item.userId == r.userId
                                  )[0].userId
                                : "null"}
                            </td>
                            <td>
                              {userList
                                ? userList.filter(
                                    (item) => item.userId == r.userId
                                  )[0].fullName
                                : "null"}
                            </td>
                            <td>
                              {userList
                                ? userList.filter(
                                    (item) => item.userId == r.userId
                                  )[0].phoneNumber
                                : "null"}
                            </td>
                            <td>{r.quiz.quizId}</td>
                            <td>{r.quiz.title}</td>
                            <td>{r.quiz.subClass.name}</td>
                            <td>{r.quiz.subClass.subject.title}</td>
                            <td>{r.totalObtainedMarks}</td>
                            <td>{r.quiz.maxMarks}</td>
                            <td>{r.attemptDatetime}</td>
                          </tr>
                        </tbody>
                      );
                    }
                  }
                } else {
                  if (inputUserId !== "") {
                    if (
                      r.quiz.subClass.subject.subId == selectedSubId &&
                      r.userId == inputUserId
                    ) {
                      return (
                        <tbody key={index}>
                          <tr>
                            <td>
                              {userList
                                ? userList.filter(
                                    (item) => item.userId == r.userId
                                  )[0].userId
                                : "null"}
                            </td>
                            <td>
                              {userList
                                ? userList.filter(
                                    (item) => item.userId == r.userId
                                  )[0].fullName
                                : "null"}
                            </td>
                            <td>
                              {userList
                                ? userList.filter(
                                    (item) => item.userId == r.userId
                                  )[0].phoneNumber
                                : "null"}
                            </td>
                            <td>{r.quiz.quizId}</td>
                            <td>{r.quiz.title}</td>
                            <td>{r.quiz.subClass.name}</td>
                            <td>{r.quiz.subClass.subject.title}</td>
                            <td>{r.totalObtainedMarks}</td>
                            <td>{r.quiz.maxMarks}</td>
                            <td>{r.attemptDatetime}</td>
                          </tr>
                        </tbody>
                      );
                    }
                  } else {
                    if (r.quiz.subClass.subject.subId == selectedSubId) {
                      return (
                        <tbody key={index}>
                          <tr>
                            <td>
                              {userList
                                ? userList.filter(
                                    (item) => item.userId == r.userId
                                  )[0].userId
                                : "null"}
                            </td>
                            <td>
                              {userList
                                ? userList.filter(
                                    (item) => item.userId == r.userId
                                  )[0].fullName
                                : "null"}
                            </td>
                            <td>
                              {userList
                                ? userList.filter(
                                    (item) => item.userId == r.userId
                                  )[0].phoneNumber
                                : "null"}
                            </td>
                            <td>{r.quiz.quizId}</td>
                            <td>{r.quiz.title}</td>
                            <td>{r.quiz.subClass.name}</td>
                            <td>{r.quiz.subClass.subject.title}</td>
                            <td>{r.totalObtainedMarks}</td>
                            <td>{r.quiz.maxMarks}</td>
                            <td>{r.attemptDatetime}</td>
                          </tr>
                        </tbody>
                      );
                    }
                  }
                }
              } else {
                if (inputUserId !== "") {
                  if (r.userId == inputUserId) {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>
                            {userList
                              ? userList.filter(
                                  (item) => item.userId == r.userId
                                )[0].userId
                              : "null"}
                          </td>
                          <td>
                            {userList
                              ? userList.filter(
                                  (item) => item.userId == r.userId
                                )[0].fullName
                              : "null"}
                          </td>
                          <td>
                            {userList
                              ? userList.filter(
                                  (item) => item.userId == r.userId
                                )[0].phoneNumber
                              : "null"}
                          </td>
                          <td>{r.quiz.quizId}</td>
                          <td>{r.quiz.title}</td>
                          <td>{r.quiz.subClass.name}</td>
                          <td>{r.quiz.subClass.subject.title}</td>
                          <td>{r.totalObtainedMarks}</td>
                          <td>{r.quiz.maxMarks}</td>
                          <td>{r.attemptDatetime}</td>
                        </tr>
                      </tbody>
                    );
                  }
                } else {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>
                          {userList
                            ? userList.filter(
                                (item) => item.userId == r.userId
                              )[0].userId
                            : "null"}
                        </td>
                        <td>
                          {userList
                            ? userList.filter(
                                (item) => item.userId == r.userId
                              )[0].fullName
                            : "null"}
                        </td>
                        <td>
                          {userList
                            ? userList.filter(
                                (item) => item.userId == r.userId
                              )[0].phoneNumber
                            : "null"}
                        </td>
                        <td>{r.quiz.quizId}</td>
                        <td>{r.quiz.title}</td>
                        <td>{r.quiz.subClass.name}</td>
                        <td>{r.quiz.subClass.subject.title}</td>
                        <td>{r.totalObtainedMarks}</td>
                        <td>{r.quiz.maxMarks}</td>
                        <td>{r.attemptDatetime}</td>
                      </tr>
                    </tbody>
                  );
                }
              }
            })}
          </Table>
        ) : (
          <Message>
            No results to display. Attemp any <Link to="/quizzes">Quiz.</Link>
          </Message>
        )}
      </div>
    </div>
  );
};

export default ManagerQuizResultPage;
