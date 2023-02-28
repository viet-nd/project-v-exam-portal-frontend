import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../../actions/authActions";
import Loader from "../../components/Loader";
import * as authConstants from "../../constants/authConstants";

import { LoginSignupLayout } from "~/layouts/LoginSignupLayout";
import classNames from "classnames/bind";
import styles from "./LoginPage.module.scss";

const cx = classNames.bind(styles);

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    if (temp) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(dispatch, username, password).then((data) => {
      if (data.type === authConstants.USER_LOGIN_SUCCESS) {
        data.payload.roles.map((r) => {
          if (r["roleName"] === "ADMIN") {
            return navigate("/adminProfile");
          } else if (r["roleName"] === "MANAGER") {
            return navigate("/managerProfile");
          } else {
            return navigate("/profile");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (token && user) {
      user.roles.map((r) => {
        if (r["roleName"] === "ADMIN") return navigate("/adminProfile");
        else if (r["roleName"] === "MANAGER") return navigate("/managerProfile");
        else return navigate("/profile");
      });
    }
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <h1>Log In</h1>

        <Form className={cx("form-login")} onSubmit={submitHandler}>
          <Form.Group className={cx("infoLogin")} controlId="username">
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

          <Form.Group className={cx("infoLogin")} controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={`${passwordType}`}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                className={cx("btn-showPassword")}
                onClick={showPasswordHandler}
                variant=""
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button variant="" className={cx("btn-login")} type="submit">
            Login
          </Button>
        </Form>

        {loginReducer.loading ? (
          <Loader />
        ) : (
          <Row>
            <Col>
              New Customer?{" "}
              <Link
                to="/register"
                className={cx("link-register")}
                style={{ color: "rgb(68 177 49)" }}
              >
                Register
              </Link>
            </Col>
          </Row>
        )}
        <p className={cx("footerContent")}>
          Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với điều
          khoản của chúng tôi
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
