import React, { useEffect, useState } from "react";
import "./ManagerSubjectsPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import swal from "sweetalert";
import * as subjectsConstants from "../../../constants/subjectsConstants";
import {
  deleteSubject,
  fetchSubjects,
} from "../../../actions/subjectsActions";

const ManagerSubjectsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const subjectsReducer = useSelector((state) => state.subjectsReducer);
  const [subjects, setSubjects] = useState(subjectsReducer.subjects);

  const subjectClickHandler = (subId) => {
    navigate(`/managerSubClasses/?subId=${subId}`);
  };

  const addNewSubjectHandler = () => {
    navigate("/managerAddSubject");
  };

  const updateSubjectHandler = (event, subject) => {
    event.stopPropagation();
    navigate(`/managerUpdateSubject/${subject.subId}/`);
  };

  const deleteSubjectHandler = (event, subject) => {
    event.stopPropagation();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this subject!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteSubject(dispatch, subject.subId, token).then((data) => {
          if (data.type === subjectsConstants.DELETE_SUBJECT_SUCCESS) {
            swal(
              "Subject Deleted!",
              `${subject.title} succesfully deleted`,
              "success"
            );
          } else {
            swal(
              "Subject Not Deleted!",
              `${subject.title} not deleted`,
              "error"
            );
          }
        });
      } else {
        swal(`${subject.title} is safe`);
      }
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    if (subjects.length === 0) {
      fetchSubjects(dispatch, token).then((data) => {
        if (data.type == subjectsConstants.FETCH_SUBJECTS_SUCCESS) {
          setSubjects(data.payload);
        }
      });
    }
  }, []);

  return (
    <div className="managerSubjectsPage__container">
      <div className="managerSubjectsPage__content">
        <h2>Subjects</h2>
        {subjects ? (
          subjects.length === 0 ? (
            <Message>
              No subjects are present. Try adding some subjects.
            </Message>
          ) : (
            subjects.map((sub, index) => {
              return (
                <ListGroup
                  className="managerSubjectsPage__content--subjectsList"
                  key={index}
                >
                  <ListGroup.Item
                    style={{ borderWidth: "0px" }}
                    className="d-flex"
                    onClick={() => subjectClickHandler(sub.subId)}
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{sub.title}</div>
                      {sub.description}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        height: "90%",
                        margin: "auto 2px",
                      }}
                    >
                      <div
                        onClick={(event) => updateSubjectHandler(event, sub)}
                        style={{
                          margin: "2px 8px",
                          textAlign: "center",
                          color: "rgb(68 177 49)",
                          fontWeight: "500",
                          cursor: "pointer",
                        }}
                      >{`Update`}</div>

                      <div
                        onClick={(event) => deleteSubjectHandler(event, sub)}
                        style={{
                          margin: "2px 8px",
                          textAlign: "center",
                          color: "red",
                          fontWeight: "500",
                          cursor: "pointer",
                        }}
                      >{`Delete`}</div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              );
            })
          )
        ) : (
          <Loader />
        )}
        <Button
          variant=""
          className="managerSubjectsPage__content--button"
          onClick={addNewSubjectHandler}
        >
          Add Subject
        </Button>
      </div>
    </div>
  );
};

export default ManagerSubjectsPage;
