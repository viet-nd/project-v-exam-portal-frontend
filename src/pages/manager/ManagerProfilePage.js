import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/SidebarAdmin";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ManagerProfilePage.css";
import Image from "react-bootstrap/Image";
import { fetchSubject, fetchSubjects } from "~/actions/subjectsActions";

const ManagerProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const user = loginReducer.user;
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    fetchSubjects(dispatch, token);
    //lay subClassReducer, quizResultReducer
  }, [dispatch]);

  // useEffect(() => {
  //   fetchQuizzes(dispatch, token);
  // }, [dispatch]);

  return (
    <div className="adminProfilePage__container">
      {/* <div className="adminProfilePage__sidebar">
        <Sidebar />
      </div>
       */}
      <Sidebar />
      <div className="adminProfilePage__content">
        <Image
          className="adminProfilePage__content--profilePic"
          width="20%"
          height="20%"
          roundedCircle
          src={"http://127.0.0.1:8081/api/file/avatar/" + user.avatar}
        />

        <Table bordered className="adminProfilePage__content--table">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{user.fullName}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{user.phoneNumber}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>{user.roles[0].roleName}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{`${user.active}`}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManagerProfilePage;
