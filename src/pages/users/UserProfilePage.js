import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UserProfilePage.css";
import * as urlGlobal from "~/constants/urlConstants";

import { Image } from "~/components/Image";
import { Button } from "~/components/Button";
import { deleteImage, uploadAvatar } from "~/actions/fileActions";
import { changePassword, updateUser } from "~/actions/userActions";
import * as authConstants from "../../constants/authConstants";
import swal from "sweetalert";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);

  const user = loginReducer.user;
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const inputRef = useRef();
  const [file, setFile] = useState();
  const [fullName, setFullName] = useState(user.fullName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  const handleChangeFullName = (e) => {
    const fullNameChange = e.target.value;
    console.log(fullNameChange);

    if (!fullNameChange.startsWith(" ")) {
      setFullName(fullNameChange);
    }
  };
  const handleChangePhoneNumber = (e) => {
    const phoneNumberChange = e.target.value;
    console.log(phoneNumberChange);

    if (!phoneNumberChange.startsWith(" ")) {
      setPhoneNumber(phoneNumberChange);
    }
  };

  const handleChangeOldPassword = (e) => {
    const oldPasswordChange = e.target.value;
    console.log(oldPasswordChange);

    if (!oldPasswordChange.startsWith(" ")) {
      setOldPassword(oldPasswordChange);
    }
  };

  const handleChangeNewPassword = (e) => {
    const newPasswordChange = e.target.value;
    console.log(newPasswordChange);

    if (!newPasswordChange.startsWith(" ")) {
      setNewPassword(newPasswordChange);
    }
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    changePassword(user.userId, oldPassword, newPassword, token).then(
      (data) => {
        if (data.type === authConstants.USER_LOGIN_SUCCESS) {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(data.payload));
          swal({
            title: "Change password successful",
            icon: "success",
          });
        } else {
          swal({
            title: "Change password not successful",
            icon: "error",
          });
        }
      }
    );
  };

  const handleShowUpdatePassword = () => {
    if (updatePassword) {
      setUpdatePassword(false);
    } else {
      setUpdatePassword(true);
    }
  };

  const handleDeleteAvatar = (e) => {
    e.preventDefault();

    deleteImage(loginReducer.user.avatar, "avatar", token).then((result) => {
      if (result) {
        const newUser = {
          userId: user.userId,
          createdDate: user.createdDate,
          fullName: user.fullName,
          username: user.username,
          phoneNumber: user.phoneNumber,
          avatar: null,
          roles: user.roles,
        };
        updateUser(dispatch, user.userId, newUser, token).then((data) => {
          if (data.type === authConstants.USER_LOGIN_SUCCESS) {
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(data.payload));
            dispatch({
              type: authConstants.USER_LOGIN_SUCCESS,
              payload: data.payload,
            });
            swal({
              title: "Delete avatar successful",
              icon: "success",
            });
            setUrlAvatar(
              urlGlobal.URL_GLOBAL + 
              "/api/file/avatar/" + data.payload.avatar
            );
          } else {
            dispatch({
              type: authConstants.USER_LOGIN_FAILURE,
              payload: data.payload,
            });
            swal({
              title: "Delete avatar not successful",
              icon: "error",
            });
            setUrlAvatar(urlAvatarCurrent);
          }
        });
      }
    });
  };

  const handleUpdateAvatar = (e) => {
    e.preventDefault();
    if (user.avatar) {
      console.log("chay vao trong avatar con");

      deleteImage(loginReducer.user.avatar, "avatar", token).then((result) => {
        console.log(result);
      });
    }
    uploadAvatar(file).then((fileCode) => {
      console.log(fileCode);
      const newUser = {
        userId: user.userId,
        createdDate: user.createdDate,
        fullName: user.fullName,
        username: user.username,
        phoneNumber: user.phoneNumber,
        avatar: fileCode,
        roles: user.roles,
      };
      updateUser(dispatch, user.userId, newUser, token).then((data) => {
        if (data.type === authConstants.USER_LOGIN_SUCCESS) {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(data.payload));
          dispatch({
            type: authConstants.USER_LOGIN_SUCCESS,
            payload: data.payload,
          });
          swal({
            title: "Update avatar successful",
            icon: "success",
          });
          setUrlAvatar(
            urlGlobal.URL_GLOBAL + 
            "/api/file/avatar/" + data.payload.avatar
          );
        } else {
          dispatch({
            type: authConstants.USER_LOGIN_FAILURE,
            payload: data.payload,
          });
          swal({
            title: "Update avatar not successful",
            icon: "error",
          });
          setUrlAvatar(urlAvatarCurrent);
        }
      });
    });
  };

  const handleCancelAvatar = () => {
    setUrlAvatar(urlAvatarCurrent);
    setFile(null);
  };

  // const [urlAvatarCurrent, setUrlAvatarCurrent] = useState("http://127.0.0.1:8081/api/file/avatar/" + user.avatar);
  const urlAvatarCurrent =
    urlGlobal.URL_GLOBAL + 
    "/api/file/avatar/" + user.avatar;
  const [updateInfor, setUpdateInfor] = useState(false);
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);

  //thay duong dan url
  const [urlAvatar, setUrlAvatar] = useState(urlAvatarCurrent);

  const handleShowAvatarNew = () => {
    inputRef.current?.click();
  };

  const handleUpdateInfo = (e) => {
    e.preventDefault();

    const newUser = {
      userId: user.userId,
      createdDate: user.createdDate,
      fullName: fullName,
      username: user.username,
      phoneNumber: phoneNumber,
      avatar: user.avatar,
      roles: user.roles,
    };
    updateUser(dispatch, user.userId, newUser, token).then((data) => {
      if (data.type === authConstants.USER_LOGIN_SUCCESS) {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data.payload));
        swal({
          title: "Update information successful",
          icon: "success",
        });
      } else {
        swal({
          title: "Update information not successful",
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    if (fullName === user.fullName && phoneNumber === user.phoneNumber) {
      setUpdateInfor(false);
    } else {
      setUpdateInfor(true);
    }

    //sua lai cho so sanh
    if (urlAvatar === urlAvatarCurrent) {
      setUpdateAvatar(false);
    } else {
      setUpdateAvatar(true);
    }
  });

  // useEffect(() => {
  //   if (urlAvatar === urlAvatarCurrent) {
  //     setUpdateAvatar(false);
  //   } else {
  //     setUpdateAvatar(true);
  //   }
  // }, [urlAvatar]);

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setUrlAvatar(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // console.log(urlAvatar);
  // console.log(urlAvatarCurrent);
  // console.log(user);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="function">
          <Image className="avatar" src={urlAvatar} />
          <Button onClick={handleShowAvatarNew} className="btn-function">
            Thay avatar
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Button>
          <Button onClick={handleDeleteAvatar} className="btn-function">
            Xoa avatar
          </Button>
          <Button onClick={handleShowUpdatePassword} className="btn-function">
            Doi mat khau
          </Button>
        </div>
        <div className="infor">
          <div>
            Full name:{" "}
            <input
              value={fullName}
              placeholder={user.fullName}
              onChange={handleChangeFullName}
            />
          </div>
          <div>Username:{` ${user.username}`}</div>
          <div>
            Phone:{" "}
            <input
              value={phoneNumber}
              placeholder={user.phoneNumber}
              onChange={handleChangePhoneNumber}
            />
          </div>
          <div>Role:{` ${user.roles[0].roleName}`}</div>
        </div>
      </div>
      <div className="extend">
        <div className="extend-function">
          <Button
            className="btn_extend-function"
            onClick={handleUpdateInfo}
            style={{ display: updateInfor ? "block" : "none" }}
          >
            Luu thong tin
          </Button>
          <Button
            className="btn_extend-function"
            onClick={handleUpdateAvatar}
            style={{ display: updateAvatar ? "block" : "none" }}
          >
            Luu avatar
          </Button>
          <Button
            className="btn_extend-function"
            onClick={handleCancelAvatar}
            style={{ display: updateAvatar ? "" : "none" }}
          >
            Huy avatar
          </Button>
        </div>
        <div
          className="change-password"
          style={{ display: updatePassword ? "" : "none" }}
        >
          <div>
            Old Password:{" "}
            <input
              value={oldPassword}
              placeholder={"..."}
              onChange={handleChangeOldPassword}
            />
          </div>
          <div>
            New Password:{" "}
            <input
              value={newPassword}
              placeholder={"..."}
              onChange={handleChangeNewPassword}
            />
          </div>
          <Button
            className="btn_extend-function"
            onClick={handleUpdatePassword}
          >
            Luu mat khau
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
