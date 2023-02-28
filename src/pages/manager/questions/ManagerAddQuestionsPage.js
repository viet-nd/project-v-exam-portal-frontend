import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import swal from "sweetalert";
import { addQuestion } from "../../../actions/questionsActions";
import * as questionsConstants from "../../../constants/questionsConstants";
import "./ManagerAddQuestionsPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "~/components/Button";
import { uploadQuestion } from "~/actions/fileActions";

const ManagerAddQuestionsPage = () => {
  const [content, setContent] = useState("");
  // const [image, setImage] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("quizId");
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);

  const [quiz, setQuiz] = useState(
    quizzes.filter((item) => item.quizId == quizId)[0]
  );

  const onSelectAnswerHandler = (e) => {
    setAnswer(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (answer !== null && answer !== "n/a") {
      if (fileList.length !== 0) {
        // let image = null;
        uploadQuestion(fileList, token).then((data) => {
          console.log(data);
          if (data) {
            const question = {
              content: content,
              image: data,
              option1: option1,
              option2: option2,
              option3: option3,
              option4: option4,
              answer: answer,
              quiz: {
                quizId: quizId,
              },
            };

            addQuestion(dispatch, question, token).then((data) => {
              if (data.type === questionsConstants.ADD_QUESTION_SUCCESS)
                swal(
                  "Question Added!",
                  `${content} succesfully added`,
                  "success"
                );
              else {
                swal("Question Not Added!", `${content} not added`, "error");
              }
            });
          }
        });
      } else {
        const question = {
          content: content,
          image: null,
          option1: option1,
          option2: option2,
          option3: option3,
          option4: option4,
          answer: answer,
          quiz: {
            quizId: quizId,
          },
        };

        addQuestion(dispatch, question, token).then((data) => {
          if (data.type === questionsConstants.ADD_QUESTION_SUCCESS)
            swal("Question Added!", `${content} succesfully added`, "success");
          else {
            swal("Question Not Added!", `${content} not added`, "error");
          }
        });
      }
      navigate(`/managerQuestions/?quizId=${quizId}&quizTitle=${quiz.title}`);
    } else {
      alert("Select valid answer!");
    }
  };

  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState();
  const [urlsLocal, setUrlsLocal] = useState([]);

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      console.log("thay doi file");

      setFileList((prev) => [...prev, file]);
    }
  }, [file]);

  const deleteUrlLocalHandler = (urlLocal) => {
    URL.revokeObjectURL(urlLocal);
    const checkIndex = urlsLocal.findIndex((url) => url === urlLocal);

    setUrlsLocal((prev) => {
      if (prev.includes(urlLocal)) {
        return prev.filter((url) => url !== urlLocal);
      }
    });

    if (checkIndex !== null) {
      setFileList((prev) => prev.splice(checkIndex + 1, 1));
    }
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setUrlsLocal((prev) => [...prev, objectUrl]);
  }, [file]);

  const inputRef = useRef();

  const addImageHandle = () => {
    inputRef.current?.click();
  };

  console.log(file);
  console.log(fileList);
  console.log(urlsLocal);

  return (
    <div className="managerAddQuestionPage__container">
      <h2>Add Question</h2>
      <div className="managerAddQuestionPage__content">
        <div>
          Question:{" "}
          <input
            className="managerAddQuestionPage__content--text"
            value={content}
            placeholder={"Nhap noi dung cau hoi"}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>

        <div>
          <button
            onClick={addImageHandle}
            className="managerAddQuestionPage__content--button"
          >
            Them anh
            <input
              ref={inputRef}
              style={{ display: "none" }}
              type="file"
              onChange={handleFileChange}
            />
          </button>

          {/* <ul> */}
          {!!urlsLocal.length &&
            urlsLocal.map((urlLocal, index) => (
              <div key={index}>
                <img
                  className="managerAddQuestionPage__content--image"
                  alt="imageQuestion"
                  src={urlLocal}
                />
                <button
                  className="managerAddQuestionPage__content--button3"
                  onClick={() => deleteUrlLocalHandler(urlLocal)}
                >
                  x
                </button>
              </div>
            ))}
          {/* </ul> */}
        </div>

        <div>
          Option 1:{" "}
          <input
            className="managerAddQuestionPage__content--text"
            value={option1}
            placeholder={"Nhap noi dung dap an 1"}
            onChange={(e) => {
              setOption1(e.target.value);
            }}
          />
        </div>

        <div>
          Option 2:{" "}
          <input
            className="managerAddQuestionPage__content--text"
            value={option2}
            placeholder={"Nhap noi dung dap an 2"}
            onChange={(e) => {
              setOption2(e.target.value);
            }}
          />
        </div>

        <div>
          Option 3:{" "}
          <input
            className="managerAddQuestionPage__content--text"
            value={option3}
            placeholder={"Nhap noi dung dap an 3"}
            onChange={(e) => {
              setOption3(e.target.value);
            }}
          />
        </div>

        <div>
          Option 4:{" "}
          <input
            className="managerAddQuestionPage__content--text"
            value={option4}
            placeholder={"Nhap noi dung dap an 4"}
            onChange={(e) => {
              setOption4(e.target.value);
            }}
          />
        </div>

        <div className="my-3">
          <label htmlFor="answer-select">Choose Correct Option:</label>
          <Form.Select
            aria-label="Choose Correct Option"
            id="answer-select"
            onChange={onSelectAnswerHandler}
          >
            <option value="n/a">Choose Option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </Form.Select>
        </div>

        <Button
          className="managerAddQuestionPage__content--button2"
          onClick={submitHandler}
        >
          Add question
        </Button>
      </div>
    </div>
  );
};

export default ManagerAddQuestionsPage;
