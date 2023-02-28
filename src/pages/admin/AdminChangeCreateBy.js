import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSubClass, updateSubClass } from "~/actions/subClassActions";
import { fetchSubjects } from "~/actions/subjectsActions";
import { fetchAllUser } from "~/actions/userActions";
import "./AdminChangeCreateBy.css";
import * as subClassConstants from "~/constants/subClassConstants";
import * as userConstants from "~/constants/userConstants";
import * as subjectsConstants from "~/constants/subjectsConstants";
import { Button } from "~/components/Button";
import swal from "sweetalert";

function AdminChangeCreateBy() {
  const urlParams = new URLSearchParams(window.location.search);
  const subClassId = urlParams.get("subClassId");
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subjectsReducer = useSelector((state) => state.subjectsReducer);
  const [subjects, setSubjects] = useState(subjectsReducer.subjects);

  const subClassesReducer = useSelector((state) => state.subClassesReducer);
  const [subClasses, setSubClasses] = useState(subClassesReducer.subClasses);
  const [allUser, setAllUser] = useState(null);
  const [subClassCurrent, setSubClassCurrent] = useState(
    subClasses.filter((item) => item.subClassId == subClassId)[0]
  );
  const [userIdSelected, setUserIdSelected] = useState("");
  const [userSelected, setUserSelected] = useState(null);

  useEffect(() => {
    if (subClasses.length == 0) {
      fetchSubClass(dispatch, null, token).then((data) => {
        if (data.type == subClassConstants.FETCH_SUB_CLASSES_SUCCESS) {
          setSubClasses(data.payload);
          setSubClassCurrent(
            data.payload.filter((item) => item.subClassId == subClassId)[0]
          );
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
    fetchAllUser(token).then((data) => {
      if (data.type == userConstants.FETCH_USER_SUCCESS) {
        setAllUser(data.payload);
      }
    });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    if (userIdSelected !== "") {
      setUserSelected(
        allUser.filter(
          (item) =>
            item.userId == userIdSelected &&
            item.roles[0].roleName == "MANAGER" &&
            item.userId !== subClassCurrent.createBy
        )[0]
      );
    }
  }, [userIdSelected]);

  const handleUserIdSelected = (e) => {
    const userIdChange = e.target.value;
    if (!userIdChange.startsWith(" ")) {
      setUserIdSelected(userIdChange);
    }
    if (userIdChange == "") {
      setUserSelected(null);
    }
  };

  const handleSaveChangeCreateBy = (e) => {
    e.preventDefault();

    if (userSelected) {
      const subClass = {
        subClassId: subClassId,
        createdDate: subClassCurrent.createdDate,
        createBy: userIdSelected,
        name: subClassCurrent.name,
        description: subClassCurrent.description,
        keyActive: subClassCurrent.keyActive,
        subject: subClassCurrent.subject,
      };
      updateSubClass(dispatch, subClass, token).then((data) => {
        if (data.type === subClassConstants.UPDATE_SUB_CLASS_SUCCESS) {
          swal(
            "Class Updated!",
            `${subClassCurrent.name} succesfully updated`,
            "success"
          );
        } else {
          swal(
            "Class Not Updated!",
            `${subClassCurrent.name} not updated`,
            "error"
          );
        }
      });
      navigate("/adminManagerSubClass");
    }
  };

  return (
    <div className="wrapper">
      <div className="top">
        {subClassCurrent && allUser && (
          <div>
            <div>{`Class Id: ${subClassCurrent.subClassId}`}</div>
            <div>{`Create By User Id: ${subClassCurrent.createBy}`}</div>
            <div>{`Manager Name: ${
              subClassCurrent.createBy
                ? allUser.filter(
                    (item) => item.userId == subClassCurrent.createBy
                  )[0].fullName
                : "No Manager"
            }`}</div>
            <div>{`Name: ${subClassCurrent.name}`}</div>
            <div>{`Description: ${subClassCurrent.description}`}</div>
            <div>{`Subject: ${subClassCurrent.subject.title}`}</div>
            <div>{`Key active: ${subClassCurrent.keyActive}`}</div>
          </div>
        )}
      </div>
      {/* <div style={{ border: "1px solid var(--black)" }}></div> */}
      <div>
        <div className="title_bottom">
          {`Transfer class management by user id: `}
          <input
            type="number"
            placeholder="Enter userId"
            value={userIdSelected}
            onChange={handleUserIdSelected}
          />
          <Button className="btn-title_bottom" onClick={handleSaveChangeCreateBy}>Save change</Button>
        </div>

        <div className="content_bottom">
          {userSelected ? (
            <div>
              <div>{`User id: ${userSelected.userId}`}</div>
              <div>{`User name: ${userSelected.username}`}</div>
              <div>{`Full Name: ${userSelected.fullName}`}</div>
              <div>{`Phone Number: ${userSelected.phoneNumber}`}</div>
            </div>
          ) : (<div>{`Choose user id`}</div>)}
        </div>
      </div>
    </div>
  );
}

export default AdminChangeCreateBy;
