import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import * as questionsConstants from "../../../constants/questionsConstants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ManagerUpdateQuestionPage.css";
import {
  updateQuestion,
} from "../../../actions/questionsActions";
import { deleteImage, uploadQuestion } from "~/actions/fileActions";
import * as urlGlobal from "~/constants/urlConstants";


const ManagerUpdateQuestionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const quesId = params.quesId;
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("quizId");

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);

  const [quiz, setQuiz] = useState(
    quizzes.filter((item) => item.quizId == quizId)[0]
  );

  const questionsReducer = useSelector((state) => state.questionsReducer);
  const [oldQuestion, setOldQuestion] = useState(
    questionsReducer.questions.filter((ques) => ques.quesId == quesId)[0]
  );

  const [content, setContent] = useState(
    oldQuestion ? oldQuestion.content : ""
  );
  const [image, setImage] = useState(oldQuestion ? oldQuestion.image : "");
  const [option1, setOption1] = useState(
    oldQuestion ? oldQuestion.option1 : ""
  );
  const [option2, setOption2] = useState(
    oldQuestion ? oldQuestion.option2 : ""
  );
  const [option3, setOption3] = useState(
    oldQuestion ? oldQuestion.option3 : ""
  );
  const [option4, setOption4] = useState(
    oldQuestion ? oldQuestion.option4 : ""
  );
  const [answer, setAnswer] = useState(oldQuestion ? oldQuestion.answer : null);

  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const onSelectAnswerHandler = (e) => {
    setAnswer(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (answer !== null && answer !== "n/a") {
      if (fileList.length !== 0) {
        uploadQuestion(fileList, token).then((data) => {
          const question = {
            quesId: quesId,
            createdDate: oldQuestion.createdDate,
            content: content,
            image: `${image};${data}`,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            answer: answer,
            quiz: {
              quizId: quizId,
            },
          };

          updateQuestion(dispatch, question, token).then((data) => {
            if (data.type === questionsConstants.UPDATE_QUESTION_SUCCESS) {
              swal(
                "Question Updated!",
                `${content} succesfully updated`,
                "success"
              );
            } else {
              swal("Question Not Updated!", `${content} not updated`, "error");
            }
          });
        });
      } else {
        const question = {
          quesId: quesId,
          createdDate: oldQuestion.createdDate,
          content: content,
          image: image,
          option1: option1,
          option2: option2,
          option3: option3,
          option4: option4,
          answer: answer,
          quiz: {
            quizId: quizId,
          },
        };

        updateQuestion(dispatch, question, token).then((data) => {
          if (data.type === questionsConstants.UPDATE_QUESTION_SUCCESS) {
            swal(
              "Question Updated!",
              `${content} succesfully updated`,
              "success"
            );
          } else {
            swal("Question Not Updated!", `${content} not updated`, "error");
          }
        });
      }
      console.log("chay vao day");
      navigate(`/managerQuestions/?quizId=${quizId}&quizTitle=${quiz.title}`);
    } else {
      alert("Select valid answer!");
    }
  };

  const inputRef = useRef();
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
    if (!file) {
      return;
    }
    console.log("thay doi file");

    const objectUrl = URL.createObjectURL(file);
    setUrlsLocal((prev) => [...prev, objectUrl]);

    setFileList((prev) => [...prev, file]);
  }, [file]);

  const deleteUrlGlobalHandler = (fileCodeGlobalUrlImage) => {
    console.log(fileCodeGlobalUrlImage);

    deleteImage(fileCodeGlobalUrlImage, "question", token).then((data) => {
      if (data) {
        setImage((prev) =>
          prev
            .split(";")
            .filter((item) => item !== fileCodeGlobalUrlImage)
            .join(";")
        );
      }
    });
  };

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

  const updateImageHandle = () => {
    inputRef.current?.click();
  };

  console.log(image);
  console.log(file);
  console.log(fileList);
  console.log(urlsLocal);

  return (
    <div className="managerUpdateQuestionPage__container">
      <h2>Update Question</h2>
      <div className="managerUpdateQuestionPage__content">
        <div className="managerAddQuestionPage__content--text">
          Question:{` `}
          <input
            value={content}
            placeholder={"Nhap noi dung cau hoi"}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>

        <div>
          <button
            onClick={updateImageHandle}
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
          <div>
            {image &&
              image.split(";").map((img, index) => {
                return (
                  <div
                    key={index}
                    className="managerAddQuestionPage__content--globalImage"
                  >
                    <img
                      alt="image"
                      className="question__image"
                      src={urlGlobal.URL_GLOBAL + "/api/file/question/" + img}
                    />

                    <button
                      className="managerAddQuestionPage__content--button3"
                      onClick={() => deleteUrlGlobalHandler(img)}
                    >
                      x
                    </button>
                  </div>
                );
              })}
          </div>

          <ul>
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
          </ul>
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
            value={answer}
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

export default ManagerUpdateQuestionPage;
