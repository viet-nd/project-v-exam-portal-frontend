import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./ManagerUpdateQuiz.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import { fetchQuizzes, updateQuiz } from "../../../actions/quizzesActions";
import { fetchSubjects } from "../../../actions/subjectsActions";
import { fetchSubClass } from "../../../actions/subClassActions";

const ManagerUpdateQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const quizId = params.quizId;

  const oldQuiz = useSelector((state) =>
    state.quizzesReducer.quizzes.filter((quiz) => quiz.quizId == quizId)
  )[0];

  const [title, setTitle] = useState(oldQuiz.title);
  const [description, setDescription] = useState(oldQuiz.description);
  const [timer, setTimer] = useState(oldQuiz.timer ? oldQuiz.timer : 0);
  const [maxMarks, setMaxMarks] = useState(oldQuiz.maxMarks);
  const [numberOfQuestions, setNumberOfQuestions] = useState(
    oldQuiz.numberOfQuestions
  );
  const [isActive, setIsActive] = useState(oldQuiz.iactive);

  const [selectedSubjectId, setSelectedSubjectId] = useState(oldQuiz.subClass.subject.subId);
  const [selectedSubClassId, setSelectedSubClassId] = useState(oldQuiz.subClass.subClassId);
  
  const subjectsReducer = useSelector((state) => state.subjectsReducer);
  const [subjects, setSubjects] = useState(subjectsReducer.subjects);

  const subClassesReducer = useSelector((state) => state.subClassesReducer);
  const [subClasses, setSubClasses] = useState(subClassesReducer.subClasses);

  const onClickPublishedHandler = () => {
    setIsActive(!isActive);
  };

  const onSelectSubjectHandler = (e) => {
    setSelectedSubjectId(e.target.value);
  };

  const onSelectSubClassHandler = (e) => {
    setSelectedSubClassId(e.target.value);
  };

  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;

  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const submitHandler = (e) => {
    e.preventDefault();
    if (selectedSubjectId !== null && selectedSubjectId !== "n/a" && selectedSubClassId !== null && selectedSubClassId !== "n/a") {
      const quiz = {
        quizId: oldQuiz.quizId,
        createdDate: oldQuiz.createdDate,
        title: title,
        description: description,
        maxMarks: maxMarks,
        numberOfQuestions: numberOfQuestions,
        timer: timer,
        iactive: isActive,
        subClass: subClasses.filter((item) => item.subClassId == selectedSubClassId)[0],
      };
      updateQuiz(dispatch, quiz, token).then((data) => {
        if (data.type === quizzesConstants.UPDATE_QUIZ_SUCCESS) {
          swal("Quiz Updated!", `${quiz.title} succesfully updated`, "success");
          fetchQuizzes(dispatch, token);
        } else {
          swal("Quiz Not Updated!", `${quiz.title} not updated`, "error");
        }
        navigate("/managerQuizzes");
      });
    } else {
      alert("Select valid category!");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    if (subjects.length === 0) {
      fetchSubjects(dispatch, token).then((data) => {
        setSubjects(data.payload);
      });
    }

    if (subClasses.length === 0) {
      fetchSubClass(dispatch, null, token).then((data) => {
        setSubClasses(data.payload);
      });
    }
  }, []);

  console.log(selectedSubjectId);
  console.log(selectedSubClassId);
  console.log(subjects);
  console.log(subClasses);

  return (
    <div className="managerUpdateQuizPage__container">
      <div className="managerUpdateQuizPage__content">
        <h2>Update Quiz</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Quiz Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              style={{ textAlign: "top" }}
              as="textarea"
              rows="3"
              type="text"
              placeholder="Enter Quiz Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="maxMarks">
            <Form.Label>Maximum Marks</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Maximum Marks"
              value={maxMarks}
              onChange={(e) => {
                setMaxMarks(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="numberOfQuestions">
            <Form.Label>Number of Questions</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Number of Questions"
              value={numberOfQuestions}
              onChange={(e) => {
                setNumberOfQuestions(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="timer">
            <Form.Label>Timer</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Timer of Questions"
              value={timer}
              onChange={(e) => {
                setTimer(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Check
            style={{ borderColor: "rgb(68 177 49)" }}
            className="my-3"
            type="switch"
            id="publish-switch"
            label="Publish Quiz"
            onChange={onClickPublishedHandler}
            checked={isActive}
          />

          <div>
            <label htmlFor="subjects-select">Choose a Subject:</label>
            <Form.Select
              aria-label="Choose Subject"
              id="subject-select"
              onChange={onSelectSubjectHandler}
              value={oldQuiz.subClass.subject.subId}
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
          </div>

          <div>
            <label htmlFor="classes-select">Choose a Class:</label>
            <Form.Select
              aria-label="Choose Class"
              id="class-select"
              onChange={onSelectSubClassHandler}
              value={oldQuiz.subClass.subClassId}
            >
              <option value="n/a">Choose Class</option>
              {subClasses &&
              selectedSubjectId !== null &&
              selectedSubjectId !== "n/a" ? (
                subClasses.map((subClass, index) => {
                  if (
                    subClass.subject.subId == selectedSubjectId &&
                    user.userId == subClass.createBy
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
          </div>
          <Button
            className="managerUpdateQuizPage__content--button"
            type="submit"
            variant="primary"
          >
            Update Quiz
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ManagerUpdateQuiz;
