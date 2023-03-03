import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllUser, searchByKeyword } from "../../actions/userActions";
import Message from "../../components/Message";
import "./AdminManagerAccountPage.css";
import * as userConstants from "../../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";

function AdminManagerAccountPage() {
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [allUser, setAllUser] = useState(null);
  const [usersFilter, setUsersFilter] = useState(null);
  const [keywords, setKeywords] = useState("");

  const loginReducer = useSelector((state) => state.loginReducer);

  const userCurrent = loginReducer.user;

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    fetchAllUser(token).then((data) => {
      if (data.type == userConstants.FETCH_USER_SUCCESS) {
        setAllUser(data.payload);
      }
    });
  }, []);

  const searchHandle = (e) => {
    e.preventDefault();

    searchByKeyword(keywords, token).then((data) => {
      if (data.type == userConstants.SEARCH_SUCCESS) {
        setUsersFilter(data.payload);
      } else {
        setUsersFilter(null);
      }
    });
  };

  const handleChangeKeywords = (e) => {
    const keywordsChange = e.target.value;
    if (!keywordsChange.startsWith(" ")) {
      setKeywords(keywordsChange);
    }

    if (keywordsChange == "") {
      setUsersFilter(null);
    }
  };

  const handleSelectedUser = (user) => {
    navigate(`/adminChangeInfoAccount/?userId=${user.userId}`);
  };

  return (
    <div className="adminManagerAccount_wrapper">
      <h1>Manager Account</h1>
      <div className="adminManagerAccount_header">
        <input
          className="adminManagerAccount_header_input"
          placeholder="Enter keywords"
          value={keywords}
          onChange={handleChangeKeywords}
        />
        <Button onClick={searchHandle}>Search</Button>
      </div>
      <div className="adminManagerAccount_content">
        {usersFilter ? (
          <Table
            bordered
            className="managerQuizResultPage__content--table"
          >
            <thead>
              <tr>
                <th>User Id</th>
                <th>User Name</th>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Active</th>
              </tr>
            </thead>
            {usersFilter.map((user, index) => {
              if (user.userId !== userCurrent.userId) {
                return (
                  <tbody key={index} onClick={() => handleSelectedUser(user)}>
                    <tr>
                      <td>{user.userId}</td>
                      <td>{user.username}</td>
                      <td>{user.fullName}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.active ? "Active" : "No active"}</td>
                    </tr>
                  </tbody>
                );
              }
            })}
          </Table>
        ) : allUser && allUser.length !== 0 ? (
          <Table
            bordered
            className="managerQuizResultPage__content--table"
          >
            <thead>
              <tr>
                <th>User Id</th>
                <th>User Name</th>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Active</th>
              </tr>
            </thead>
            {allUser.map((user, index) => {
              if (user.userId !== userCurrent.userId) {
                return (
                  <tbody key={index} onClick={() => handleSelectedUser(user)}>
                    <tr className="adminManagerAccountPage--row">
                      <td>{user.userId}</td>
                      <td>{user.username}</td>
                      <td>{user.fullName}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.active ? "Active" : "No active"}</td>
                    </tr>
                  </tbody>
                );
              }
            })}
          </Table>
        ) : (
          <Message>No results to display.</Message>
        )}
      </div>
    </div>
  );
}

export default AdminManagerAccountPage;
