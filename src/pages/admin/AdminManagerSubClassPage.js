import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSubClass } from "~/actions/subClassActions";
import { fetchSubjects } from "~/actions/subjectsActions";
import Message from "~/components/Message";
import * as subClassConstants from "~/constants/subClassConstants";
import * as userConstants from "~/constants/userConstants";
import * as subjectsConstants from "~/constants/subjectsConstants";
import { fetchAllUser } from "~/actions/userActions";
import "./AdminManagerSubClassPage.css";

function AdminManagerSubClassesPage() {
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const subjectsReducer = useSelector((state) => state.subjectsReducer);
  const [subjects, setSubjects] = useState(null);

  //   const subClassesReducer = useSelector((state) => state.subClassesReducer);
  const [subClasses, setSubClasses] = useState(null);
  const [allUser, setAllUser] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    fetchSubClass(dispatch, null, token).then((data) => {
      if (data.type == subClassConstants.FETCH_SUB_CLASSES_SUCCESS) {
        setSubClasses(data.payload);
      }
    });
    fetchSubjects(dispatch, token).then((data) => {
      if (data.type == subjectsConstants.FETCH_SUBJECTS_SUCCESS) {
        setSubjects(data.payload);
      }
    });
    fetchAllUser(token).then((data) => {
      if (data.type == userConstants.FETCH_USER_SUCCESS) {
        setAllUser(data.payload);
      }
    });
  }, []);

  const handleSelectedSubClass = (subClass) => {
    navigate(`/adminChangeCreateBy/?subClassId=${subClass.subClassId}`);
  };

  return (
    <div className="adminManagerSubClass_wrapper">
      <h1>Transfer class management</h1>
      <div className="adminManagerSubClass_content">
        {subClasses !== null && subjects !== null && allUser !== null ? (
          <Table bordered className="adminManagerSubClass_content--table">
            <thead>
              <tr>
                <th>Class Id</th>
                <th>Create By</th>
                <th>Name</th>
                <th>Description</th>
                <th>Subject</th>
                <th>Key active</th>
              </tr>
            </thead>
            {subClasses.map((subClass, index) => {
              return (
                <tbody
                  key={index}
                  onClick={() => handleSelectedSubClass(subClass)}
                >
                  <tr className="adminManagerAccountPage--row">
                    <td>{subClass.subClassId}</td>
                    <td>
                      {subClass.createBy
                        ? allUser.filter(
                            (item) => item.userId == subClass.createBy
                          )[0].fullName
                        : "No Manager"}
                    </td>
                    <td>{subClass.name}</td>
                    <td>{subClass.description}</td>
                    <td>{subClass.subject.title}</td>
                    <td>{subClass.keyActive}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        ) : (
          <Message>No results to display.</Message>
        )}
      </div>
    </div>
  );
}

export default AdminManagerSubClassesPage;
