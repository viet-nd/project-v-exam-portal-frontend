import React, { useState } from "react";
import "./ManagerUpdateSubjectPage.css";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as sunjectConstants from "../../../constants/subjectsConstants"
import { updateSubject } from "../../../actions/subjectsActions";

const ManagerUpdateSubjectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const subId = params.subId;

  const oldSubject = useSelector((state) =>
    state.subjectsReducer.subjects.filter((sub) => sub.subId == subId)
  )[0];
  const [title, setTitle] = useState(oldSubject ? oldSubject.title : "");
  const [description, setDescription] = useState(
    oldSubject ? oldSubject.description : ""
  );
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const submitHandler = (e) => {
    e.preventDefault();
    const subject = { subId: subId, createdDate: oldSubject.createdDate, title: title, description: description };
    updateSubject(dispatch, subject, token).then((data) => {
      if (data.type === sunjectConstants.UPDATE_SUBJECT_SUCCESS) {
        swal("Subject Updated!", `${title} succesfully updated`, "success");
      } else {
        swal("Subject Not Updated!", `${title} not updated`, "error");
      }
    });
    navigate("/managerSubjects");
  };

  return (
    <div className="managerUpdateSubjectPage__container">
      <div className="managerUpdateSubjectPage__content">
          <h2>Update Subject</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Subject Title"
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
                rows="5"
                type="text"
                placeholder="Enter Subject Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Button
              className="my-3 managerUpdateSubjectPage__content--button"
              type="submit"
              variant=""
            >
              Update
            </Button>
          </Form>
      </div>
    </div>
  );
};

export default ManagerUpdateSubjectPage;
