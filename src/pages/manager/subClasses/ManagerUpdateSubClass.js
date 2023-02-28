import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { updateSubClass } from "~/actions/subClassActions";
import * as subClassConstants from "~/constants/subClassConstants";
import "./ManagerUpdateSubClass.css";

function ManagerUpdateSubClass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const subClassId = params.subClassId;

  const subjectsReducer = useSelector((state) => state.subjectsReducer);
  const [subjects, setSubjects] = useState(subjectsReducer.subjects);

  const oldSubClass = useSelector((state) =>
    state.subClassesReducer.subClasses.filter(
      (subClass) => subClass.subClassId == subClassId
    )
  )[0];
  const [name, setName] = useState(oldSubClass ? oldSubClass.name : "");
  const [description, setDescription] = useState(
    oldSubClass ? oldSubClass.description : ""
  );
  const [keyActive, setKeyActive] = useState(
    oldSubClass ? oldSubClass.keyActive : ""
  );
  const [subId, setSubId] = useState(
    oldSubClass ? oldSubClass.subject.subId : ""
  );
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const submitHandler = (e) => {
    e.preventDefault();
    const subClass = {
      subClassId: subClassId,
      createdDate: oldSubClass.createdDate,
      createBy: oldSubClass.createBy,
      name: name,
      description: description,
      keyActive: keyActive,
      subject: subjects.filter((item) => item.subId == subId)[0],
    };
    updateSubClass(dispatch, subClass, token).then((data) => {
      if (data.type === subClassConstants.UPDATE_SUB_CLASS_SUCCESS) {
        swal("Class Updated!", `${name} succesfully updated`, "success");
      } else {
        swal("Class Not Updated!", `${name} not updated`, "error");
      }
    });
    navigate("/managerSubClasses");
  };

  const onSelectSubjectHandler = (e) => {
    setSubId(e.target.value);
  };

//   console.log(subjects);
//   console.log(subClassId);
//   console.log(subId);
  //   console.log(subClasses);
  //   console.log(showSubClasses);

  return (
    <div className="managerUpdateSubClassPage__container">
      <div className="managerUpdateSubClassPage__content">
        <h2>Update Class</h2>
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

          <Form.Group controlId="keyActive">
            <Form.Label>Key Active</Form.Label>
            <Form.Control
              style={{ textAlign: "top" }}
              as="textarea"
              rows="5"
              type="text"
              placeholder="Enter Class key Active"
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
              value={subjects.filter((item) => item.subId == subId)[0].subId}
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
            className="managerUpdateSubClassPage__content--button"
            type="submit"
            variant=""
          >
            Update Class
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ManagerUpdateSubClass;
