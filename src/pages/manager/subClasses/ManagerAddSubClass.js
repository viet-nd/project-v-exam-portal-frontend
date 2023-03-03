import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { addSubClass } from "../../../actions/subClassActions";
import * as subClassConstants from "../../../constants/subClassConstants";

function ManagerAddSubClass() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [keyActive, setKeyActive] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  const subjectsReducer = useSelector((state) => state.subjectsReducer);
  const [subjects, setSubjects] = useState(subjectsReducer.subjects);

  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;

  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSelectSubjectHandler = (e) => {
    setSelectedSubjectId(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const subClass = {
      createBy: user.userId,
      name: name,
      description: description,
      keyActive: keyActive,
      subject: subjects.filter((item) => item.subId == selectedSubjectId)[0],
    };
    addSubClass(dispatch, subClass, token).then((data) => {
      if (data.type === subClassConstants.ADD_SUB_CLASS_SUCCESS) {
        swal("Class Added!", `${name} succesfully added`, "success");
      } else {
        swal("Class Not Added!", `${name} not added`, "error");
      }
      navigate("/managerSubClasses");
    });
    // addSubject(dispatch, subject, token).then((data) => {
    //   if (data.type === subjectsConstants.ADD_SUBJECT_SUCCESS) {
    //     swal("Subject Added!", `${title} succesfully added`, "success");
    //   } else {
    //     swal("Subject Not Added!", `${title} not added`, "error");
    //   }
    //   navigate("/managerSubjects");
    // });
  };

  return (
    <div className="managerAddSubjectPage__container">
      <div className="managerAddSubjectPage__content">
        <h2>Add Class</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Class Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              style={{ textAlign: "top" }}
              as="textarea"
              rows="5"
              type="text"
              placeholder="Enter Class Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Key Active</Form.Label>
            <Form.Control
              style={{ textAlign: "top" }}
              as="textarea"
              rows="5"
              type="text"
              placeholder="Enter Class Key Active"
              value={keyActive}
              onChange={(e) => {
                setKeyActive(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <div>
            <label htmlFor="subject-select">Choose a Subject:</label>
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

          <Button
            className="managerAddSubjectPage__content--button"
            type="submit"
            variant=""
          >
            Add Class
          </Button>
        </Form>
      </div>
    </div>

    // <div>AddSubClass</div>
  );
}

export default ManagerAddSubClass;
