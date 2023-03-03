import { useEffect, useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { deleteSubClass, fetchSubClass } from "../../../actions/subClassActions";
import Message from "../../../components/Message";
import "./ManagerSubClassesPage.css";
import * as subClassConstants from "../../../constants/subClassConstants";
import { fetchAllUser } from "../../../actions/userActions";
import * as userConstants from "../../../constants/userConstants";
import { fetchSubjects } from "../../../actions/subjectsActions";
import * as subjectsConstants from "../../../constants/subjectsConstants";

function ManagerSubClassPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const [subId, setSubId] = useState(urlParams.get("subId"));
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;

  const subjectsReducer = useSelector((state) => state.subjectsReducer);
  const [subjects, setSubjects] = useState(subjectsReducer.subjects);

  const subClassesReducer = useSelector((state) => state.subClassesReducer);
  const [subClasses, setSubClasses] = useState(subClassesReducer.subClasses);
  const [showSubClasses, setShowSubClasses] = useState();

  const [allUser, setAllUser] = useState(null);

  useEffect(() => {
    fetchAllUser(token).then((data) => {
      if (data.type == userConstants.FETCH_USER_SUCCESS) {
        setAllUser(data.payload);
      }
    });
  }, []);

  const subClassClickHandler = (subId) => {
    navigate(`/managerQuizzes/?subClassId=${subId}`);
  };

  const addNewSubClassHandler = () => {
    navigate("/managerAddSubClass");
  };

  const updateSubClassHandler = (event, subClass) => {
    event.stopPropagation();
    navigate(`/managerUpdateSubClass/${subClass.subClassId}/`);
  };

  const deleteSubClassHandler = (event, subClass) => {
    event.stopPropagation();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this class!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteSubClass(dispatch, subClass.subClassId, token).then((data) => {
          if (data.type === subClassConstants.DELETE_SUB_CLASS_SUCCESS) {
            swal(
              "Class Deleted!",
              `${subClass.name} succesfully deleted`,
              "success"
            );
            setShowSubClasses(
              subClasses.filter((item) => item.subject.subId == subId)
            );
          } else {
            swal("Class Not Deleted!", `${subClass.name} not deleted`, "error");
          }
        });
      } else {
        swal(`${subClass.name} is safe`);
      }
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    if (subId) {
      setShowSubClasses(
        subClasses.filter((item) => item.subject.subId == subId)
      );
    }
  }, [subId]);

  useEffect(() => {
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

  const onSelectSubjectHandler = (e) => {
    setSubId(e.target.value);
  };

  // console.log(subjects);
  // console.log(subClasses);
  // console.log(subId);
  // console.log(showSubClasses);

  return (
    <div className="managerSubClassesPage__container">
      <div className="managerSubClassesPage__content">
        <h2>Classes</h2>
        <div className="managerSubClassesPage__header">
          <Form.Select
            className="choose-class"
            aria-label="Choose Subject"
            id="subject-select"
            onChange={onSelectSubjectHandler}
            value={subId ? subId : "n/a"}
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
          {subId !== null && subId !== "n/a" && showSubClasses ? (
            showSubClasses.length === 0 ? (
              <Message>
                No subjects are present. Try adding some subjects.
              </Message>
            ) : (
              showSubClasses.map((subClass, index) => {
                return (
                  <ListGroup
                    className="managerSubClassesPage__content--subjectsList"
                    key={index}
                  >
                    <ListGroup.Item
                      style={{
                        backgroundColor:
                          user.userId == subClass.createBy
                            ? "var(--gray)"
                            : "transparent",
                      }}
                      className="d-flex"
                      onClick={() => subClassClickHandler(subClass.subClassId)}
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{subClass.name}</div>
                        {subClass.description}
                        <div>
                          {subClass.createBy
                            ? allUser.filter(
                                (item) => item.userId == subClass.createBy
                              )[0].fullName
                            : "No Manager"}
                        </div>
                      </div>

                      {user.userId == subClass.createBy && (
                        <div
                          style={{
                            display: "flex",
                            height: "90%",
                            margin: "auto 2px",
                          }}
                        >
                          <div
                            onClick={(event) =>
                              updateSubClassHandler(event, subClass)
                            }
                            style={{
                              margin: "2px 8px",
                              textAlign: "center",
                              color: "rgb(68 177 49)",
                              fontWeight: "500",
                              cursor: "pointer",
                            }}
                          >{`Update`}</div>

                          <div
                            onClick={(event) =>
                              deleteSubClassHandler(event, subClass)
                            }
                            style={{
                              margin: "2px 8px",
                              textAlign: "center",
                              color: "red",
                              fontWeight: "500",
                              cursor: "pointer",
                            }}
                          >{`Delete`}</div>
                        </div>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                );
              })
            )
          ) : (
            <div></div>
          )}
        </div>

        {/* {subClasses ?  : (
          <Loader />
        )} */}
        <Button
          variant=""
          className="managerSubjectsPage__content--button"
          onClick={addNewSubClassHandler}
        >
          Add Class
        </Button>
      </div>
    </div>
  );
}

export default ManagerSubClassPage;
