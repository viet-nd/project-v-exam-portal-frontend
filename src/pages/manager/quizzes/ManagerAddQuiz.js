import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./ManagerAddQuiz.css";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import { addQuiz } from "../../../actions/quizzesActions";
import { fetchSubjects } from "~/actions/subjectsActions";
import { fetchSubClass } from "~/actions/subClassActions";

const ManagerAddQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState(0);
  const [maxMarks, setMaxMarks] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedSubClassId, setSelectedSubClassId] = useState(null);

  const subjectsReducer = useSelector((state) => state.subjectsReducer);
  const [subjects, setSubjects] = useState(subjectsReducer.subjects);

  const subClassesReducer = useSelector((state) => state.subClassesReducer);
  const [subClasses, setSubClasses] = useState(subClassesReducer.subClasses);

  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickPublishedHandler = () => {
    setIsActive(!isActive);
  };

  const onSelectSubjectHandler = (e) => {
    setSelectedSubjectId(e.target.value);
  };

  const onSelectSubClassHandler = (e) => {
    setSelectedSubClassId(e.target.value);
  };

  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const submitHandler = (e) => {
    e.preventDefault();
    if (selectedSubjectId !== null && selectedSubjectId !== "n/a" && selectedSubClassId !== null && selectedSubClassId !== "n/a") {
      const quiz = {
        title: title,
        description: description,
        maxMarks: maxMarks,
        numberOfQuestions: numberOfQuestions,
        timer: timer,
        iactive: isActive,
        subClass: subClasses.filter((item) => item.subClassId == selectedSubClassId)[0],
      };
      addQuiz(dispatch, quiz, token).then((data) => {
        if (data.type === quizzesConstants.ADD_QUIZ_SUCCESS)
          swal("Quiz Added!", `${quiz.title} succesfully added`, "success");
        else {
          swal("Quiz Not Added!", `${quiz.title} not added`, "error");
        }
      });
      navigate("/managerQuizzes");
    } else {
      alert("Select valid subject or class!");
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

  return (
    <div className="managerAddQuizPage__container">
      <div className="managerAddQuizPage__content">
        <h2>Add Quiz</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="title">
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

          <Form.Group className="my-3" controlId="description">
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

          <Form.Group className="my-3" controlId="maxMarks">
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

          <Form.Group className="my-3" controlId="numberOfQuestions">
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
            className="my-5 managerAddQuizPage__content--button"
            type="submit"
            variant="primary"
          >
            Add
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ManagerAddQuiz;
