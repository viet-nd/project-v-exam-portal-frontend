/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { uploadAvatar } from "../../actions/fileActions";
import "./AdminAddAccountPage.js";
import { addAccount } from "../../actions/userActions";
import * as userConstants from "../../constants/userConstants";
import swal from "sweetalert";


function AdminAddAccountPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [roleSelected, setRoleSelected] = useState("");

  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const roles = ["MANAGER", "USER"];

  const onSelectRoleHandler = (e) => {
    setRoleSelected(e.target.value);
  };

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    if (temp) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const showConfirmPasswordHandler = () => {
    const temp = !showConfirmPassword;
    setShowConfirmPassword(temp);
    if (temp) {
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordType("password");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (selectedFile) {
      uploadAvatar(selectedFile).then((avatar) => {
        console.log(`Chay ra den giao dien ${avatar}`);
        const user = {
          fullName: fullName,
          username: username,
          password: password,
          phoneNumber: phoneNumber,
          avatar: avatar,
        };
        console.log("Sau khi co anh");
        console.log(user);
        addAccount(user, roleSelected, token).then((data) => {
          if (data.type === userConstants.ADD_USER_SUCCESS) {
            swal("Account Added!", `succesfully added`, "success");
          } else {
            swal("Account Not Added!", `not added`, "error");
          }
        });
      });
    } else {
      const user = {
        fullName: fullName,
        username: username,
        password: password,
        phoneNumber: phoneNumber,
      };
      console.log("khong them anh");
      console.log(user);
      addAccount(user, roleSelected, token).then((data) => {
        if (data.type === userConstants.ADD_USER_SUCCESS) {
            swal("Account Added!", `succesfully added`, "success");
          } else {
            swal("Account Not Added!", `not added`, "error");
          }
      });
    }
  };

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <h1>Add Account</h1>
      <Form className="wrapper" onSubmit={submitHandler}>
        <Form.Group className="infoUser" controlId="fname">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="infoUser" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="infoUser" controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={`${passwordType}`}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
            <Button
              className="btn-showPassword"
              onClick={showPasswordHandler}
              variant=""
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="infoUser" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={`${confirmPasswordType}`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></Form.Control>
            <Button
              className="btn-showPassword"
              onClick={showConfirmPasswordHandler}
              variant=""
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="infoUser" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <div>
          <input type="file" onChange={onSelectFile} />
          {selectedFile && <img src={preview} />}
        </div>

        <div>
          <label htmlFor="role-select">Choose a Role:</label>
          <Form.Select
            aria-label="Choose Role"
            id="role-select"
            onChange={onSelectRoleHandler}
          >
            <option value="n/a">Choose Role</option>
            {roles ? (
              roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))
            ) : (
              <option value="">Choose one from below</option>
            )}
          </Form.Select>
        </div>

        <Button variant="" className="btn-register" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default AdminAddAccountPage;
