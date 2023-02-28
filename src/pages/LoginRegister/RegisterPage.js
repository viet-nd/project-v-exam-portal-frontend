/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as authConstants from "../../constants/authConstants";
import { Link } from "react-router-dom";

import { LoginSignupLayout } from "~/layouts/LoginSignupLayout";
import classNames from "classnames/bind";
import styles from "./RegisterPage.module.scss";
import { uploadAvatar } from "../../actions/fileActions";

const cx = classNames.bind(styles);

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerReducer = useSelector((state) => state.registerReducer);

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
    // const user = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   username: username,
    //   password: password,
    //   phoneNumber: phoneNumber,
    // };
    // register(dispatch, user).then((data) => {
    //   if (data.type === authConstants.USER_REGISTER_SUCCESS) {
    //     navigate("/login");
    //   }
    // });

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
        register(dispatch, user).then((data) => {
          if (data.type === authConstants.USER_REGISTER_SUCCESS) {
            navigate("/login");
          }
        });
      });
    }
    else {
      const user = {
        fullName: fullName,
        username: username,
        password: password,
        phoneNumber: phoneNumber,
      };
      console.log("khong them anh");
      console.log(user);
      register(dispatch, user).then((data) => {
        if (data.type === authConstants.USER_REGISTER_SUCCESS) {
          navigate("/login");
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
    <LoginSignupLayout>
      <h1>Register</h1>
      <Form className={cx("wrapper")} onSubmit={submitHandler}>
        <Form.Group className={cx("infoUser")} controlId="fname">
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

        <Form.Group className={cx("infoUser")} controlId="username">
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

        <Form.Group className={cx("infoUser")} controlId="password">
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
              className={cx("btn-showPassword")}
              onClick={showPasswordHandler}
              variant=""
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className={cx("infoUser")} controlId="confirmPassword">
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
              className={cx("btn-showPassword")}
              onClick={showConfirmPasswordHandler}
              variant=""
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className={cx("infoUser")} controlId="phoneNumber">
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

        <Button variant="" className={cx("btn-register")} type="submit">
          Register
        </Button>
      </Form>

      {registerReducer.loading ? (
        <Loader />
      ) : (
        <Row>
          <Col>
            Have an Account?{" "}
            <Link to="/" className={cx("link-login")}>
              Login
            </Link>
          </Col>
        </Row>
      )}
    </LoginSignupLayout>
  );
};

export default RegisterPage;
