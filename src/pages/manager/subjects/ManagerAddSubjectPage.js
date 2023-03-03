import React, { useState } from "react";
import "./ManagerAddSubjectPage.css";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { addSubject } from "../../../actions/subjectsActions";
import * as subjectsConstants from "../../../constants/subjectsConstants";

const ManagerAddSubjectPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const subject = { title: title, description: description };
    addSubject(dispatch, subject, token).then((data) => {
      if (data.type === subjectsConstants.ADD_SUBJECT_SUCCESS) {
        swal("Subject Added!", `${title} succesfully added`, "success");
      } else {
        swal("Subject Not Added!", `${title} not added`, "error");
      }
      navigate("/managerSubjects");
    });
  };

  return (
    <div className="managerAddSubjectPage__container">
      <div className="managerAddSubjectPage__content">
          <h2>Add Subject</h2>
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
              className="my-3 managerAddSubjectPage__content--button"
              type="submit"
              variant=""
            >
              Add
            </Button>
          </Form>
      </div>
    </div>
  );
};

export default ManagerAddSubjectPage;
