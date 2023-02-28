import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  detachSubClass,
  fetchSubClass,
  fetchSubClassByUserId,
  joinSubClass,
} from "~/actions/subClassActions";
import "./UserJoinClassesPage.css";

import * as subClassConstants from "../../constants/subClassConstants";
import * as subjectsConstants from "~/constants/subjectsConstants";
import swal from "sweetalert";
import { fetchSubjects } from "~/actions/subjectsActions";

function UserJoinClassesPage() {
  // const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const subjectsReducer = useSelector((state) => state.subjectsReducer);
  const subClassesReducer = useSelector((state) => state.subClassesReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const [subjects, setSubjects] = useState(subjectsReducer.subjects);
  const [subClasses, setSubClasses] = useState(subClassesReducer.subClasses);
  const [selectorSubjectId, setSelectorSubjectId] = useState();
  const [selectorSubClassId, setSelectorSubClassId] = useState();
  const [subClassOfUser, setSubClassOfUser] = useState(null);
  const [loadSubClassOfUser, setLoadSubClassOfUser] = useState(false);
  const [keyActive, setKeyActive] = useState("");

  const loginReducer = useSelector((state) => state.loginReducer);

  const user = loginReducer.user;

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    if (subjects.length == 0) {
      fetchSubjects(dispatch, token).then((data) => {
        if (data.type === subjectsConstants.FETCH_SUBJECTS_SUCCESS) {
          setSubjects(data.payload);
        }
      });
    }

    if (subClasses.length == 0) {
      fetchSubClass(dispatch, null, token).then((data) => {
        if (data.type === subClassConstants.FETCH_SUB_CLASSES_SUCCESS) {
          setSubClasses(data.payload);
        }
      });
    }
  }, []);

  const onSelectSubjectHandler = (e) => {
    setSelectorSubjectId(e.target.value);
  };

  const onSelectSubClassHandler = (e) => {
    setSelectorSubClassId(e.target.value);
  };

  useEffect(() => {
    fetchSubClassByUserId(user.userId, token).then((data) => {
      setSubClassOfUser(data.payload);
    });
  }, [loadSubClassOfUser]);

  const joinClassHandler = (e) => {
    e.preventDefault();

    joinSubClass(
      dispatch,
      selectorSubClassId,
      user.userId,
      keyActive,
      token
    ).then((data) => {
      if (data.type === subClassConstants.UPDATE_SUB_CLASS_SUCCESS) {
        swal("Join Class", `Join class succesfully`, "success");
        setLoadSubClassOfUser(!loadSubClassOfUser);
      } else {
        swal("Join Class", `Join class fail`, "error");
      }
    });
  };

  const handleChangeKeyActive = (e) => {
    const keyActiveChange = e.target.value;

    if (!keyActiveChange.startsWith(" ")) {
      setKeyActive(keyActiveChange);
    }
  };

  const detachClassHandle = (subClass) => {
    detachSubClass(subClass.subClassId, user.userId, token).then((data) => {
      if (data.type === subClassConstants.UPDATE_SUB_CLASS_SUCCESS) {
        swal("Detach Class", `Detach class succesfully`, "success");
        setLoadSubClassOfUser(!loadSubClassOfUser);
      } else {
        swal("Detach Class", `Detach class fail`, "error");
      }
    });
  };

  // console.log(subjects);
  // console.log(subClasses);
  // console.log(selectorSubjectId);
  // console.log(selectorSubClassId);
  // console.log(subjects);

  return (
    <div className="wrapper">
      <div className="header">
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
          id="class-select"
          onChange={onSelectSubClassHandler}
        >
          <option value="n/a">Choose Class</option>
          {subClasses ? (
            subClasses.map((subClass, index) => {
              if (subClass.subject.subId == selectorSubjectId) {
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
          <input
            style={{ border: "1px solid var(--black)", marginRight: "20px" }}
            value={keyActive}
            onChange={handleChangeKeyActive}
          />
        </div>

        <Button onClick={joinClassHandler}>Join Class</Button>
      </div>
      <div className="body">
        {subClassOfUser ? (
          subClassOfUser.map((subClass, index) => {
            return (
              <div
                className="classItem"
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(``)}
              >
                <h2>{subClass.name}</h2>
                <p>{subClass.description}</p>
                <Button onClick={() => detachClassHandle(subClass)}>
                  Detach Class
                </Button>
              </div>
            );
          })
        ) : (
          <div>No class</div>
        )}
      </div>
    </div>
  );
}

export default UserJoinClassesPage;
