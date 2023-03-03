import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  changePassword,
  deleteAccount,
  fetchUserByUserId,
  updateUser,
} from "../../actions/userActions";
import "./AdminChangeInfoAccount.css";
import * as authConstants from "../../constants/authConstants";
import { deleteImage, uploadAvatar } from "../../actions/fileActions";
import { Button } from "../../components/Button";
import { Image } from "../../components/Image";
import * as userConstants from "../../constants/userConstants";
import * as urlGlobal from "../../constants/urlConstants";

function AdminChangeInfoAccount() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const [user, setUser] = useState();

  useEffect(() => {
    if (userId) {
      fetchUserByUserId(userId, token).then((data) => {
        setUser(data.payload);
        setFullName(data.payload.fullName);
        setPhoneNumber(data.payload.phoneNumber);
        setUrlAvatarCurrent(
          urlGlobal.URL_GLOBAL + "/api/file/avatar/" + data.payload.avatar
        );
        setUrlAvatar(
          urlGlobal.URL_GLOBAL + "/api/file/avatar/" + data.payload.avatar
        );
      });
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const loginReducer = useSelector((state) => state.loginReducer);

  const inputRef = useRef();
  const [file, setFile] = useState();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState();

  // de show cac button
  const [updateInfor, setUpdateInfor] = useState(false);
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);

  //thay duong dan url
  const [urlAvatarCurrent, setUrlAvatarCurrent] = useState("");
  const [urlAvatar, setUrlAvatar] = useState(urlAvatarCurrent);

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

  const handleChangeNewPassword = (e) => {
    const newPasswordChange = e.target.value;
    console.log(newPasswordChange);

    if (!newPasswordChange.startsWith(" ")) {
      setNewPassword(newPasswordChange);
    }
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const oldPassword = "AdminChangePassword";
    changePassword(user.userId, oldPassword, newPassword, token).then(
      (data) => {
        if (data.type === authConstants.USER_LOGIN_SUCCESS) {
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
        setUpdatePassword(false);
        setNewPassword();
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

    deleteImage(user.avatar, "avatar", token).then((result) => {
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
            swal({
              title: "Delete avatar successful",
              icon: "success",
            });
            setUser(data.payload);
          } else {
            swal({
              title: "Delete avatar not successful",
              icon: "error",
            });
          }
          setUpdateAvatar(false);
        });
      }
    });
  };

  const handleUpdateAvatar = (e) => {
    e.preventDefault();
    if (user.avatar) {
      console.log("chay vao trong avatar con");

      deleteImage(user.avatar, "avatar", token).then((result) => {
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
          swal({
            title: "Update avatar successful",
            icon: "success",
          });
          setUser(data.payload);
        } else {
          swal({
            title: "Update avatar not successful",
            icon: "error",
          });
        }
        setUpdateAvatar(false);
      });
    });
  };

  const handleCancelAvatar = () => {
    setUrlAvatar(urlAvatarCurrent);
    setFile(null);
  };

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
        swal({
          title: "Update information successful",
          icon: "success",
        });
        setUser(data.payload);
      } else {
        swal({
          title: "Update information not successful",
          icon: "error",
        });
      }
      setUpdateInfor(false);
    });
  };

  useEffect(() => {
    if (fullName || phoneNumber) {
      if (fullName === user.fullName && phoneNumber === user.phoneNumber) {
        setUpdateInfor(false);
      } else {
        setUpdateInfor(true);
      }
    }

    //sua lai cho so sanh
    if (urlAvatar === urlAvatarCurrent) {
      setUpdateAvatar(false);
    } else {
      setUpdateAvatar(true);
    }
  }, [fullName, phoneNumber, urlAvatar]);

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();

    deleteAccount(user.userId, token).then((data) => {
      if (data.type == userConstants.DISABLE_USER_SUCCESS) {
        swal({
          title: "Change status account successful",
          icon: "success",
        });
        navigate("/adminManagerAccount");
      } else {
        swal({
          title: "Change status account not successful",
          icon: "error",
        });
        navigate("/adminManagerAccount");
      }
    });
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

  //   console.log(urlAvatar);
  console.log(userId);
  console.log(user);
  //   console.log(phoneNumber);

  return (
    <div className="andminChangeInfoAccount_wrapper">
      <div className="andminChangeInfoAccount_container">
        <div className="andminChangeInfoAccount_function">
          <Image className="andminChangeInfoAccount_avatar" src={urlAvatar} />
          <Button onClick={handleShowAvatarNew} className="andminChangeInfoAccount_btn-function">
            Thay avatar
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Button>
          <Button onClick={handleDeleteAvatar} className="andminChangeInfoAccount_btn-function">
            Xoa avatar
          </Button>
          <Button onClick={handleShowUpdatePassword} className="andminChangeInfoAccount_btn-function">
            Doi mat khau
          </Button>

          <Button onClick={handleDeleteAccount} className="andminChangeInfoAccount_btn-function">
            Change Status
          </Button>
        </div>
        <div className="andminChangeInfoAccount_infor">
          {user ? (
            <div>
              <div>User ID:{` ${user.userId}`}</div>
              <div>Username:{` ${user.username}`}</div>
              <div>Role:{` ${user.roles[0].roleName}`}</div>
              <div>Status:{` ${user.active}`}</div>
              <div style={{ border: "1px solid var(--black)" }}></div>
              <div>
                Full name:{" "}
                <input
                  value={fullName}
                  placeholder={user.fullName}
                  onChange={handleChangeFullName}
                />
              </div>

              <div>
                Phone:{" "}
                <input
                  value={phoneNumber}
                  placeholder={user.phoneNumber}
                  onChange={handleChangePhoneNumber}
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="andminChangeInfoAccount_extend">
        <div className="andminChangeInfoAccount_extend-function">
          <Button
            className="andminChangeInfoAccount_btn_extend-function"
            onClick={handleUpdateInfo}
            style={{ display: updateInfor ? "block" : "none" }}
          >
            Luu thong tin
          </Button>
          <Button
            className="andminChangeInfoAccount_btn_extend-function"
            onClick={handleUpdateAvatar}
            style={{ display: updateAvatar ? "block" : "none" }}
          >
            Luu avatar
          </Button>
          <Button
            className="andminChangeInfoAccount_btn_extend-function"
            onClick={handleCancelAvatar}
            style={{ display: updateAvatar ? "" : "none" }}
          >
            Huy avatar
          </Button>
        </div>
        <div
          className="andminChangeInfoAccount_change-password"
          style={{ display: updatePassword ? "" : "none" }}
        >
          <div>
            New Password:{" "}
            <input
              value={newPassword}
              placeholder={"..."}
              onChange={handleChangeNewPassword}
            />
          </div>
          <Button
            className="andminChangeInfoAccount_btn_extend-function"
            onClick={handleUpdatePassword}
          >
            Luu mat khau
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminChangeInfoAccount;
