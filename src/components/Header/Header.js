import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import routesConfig from "../../config/routes";
import styles from "./Header.module.scss";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Image } from "../Image";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import * as urlGlobal from "../../constants/urlConstants";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function Header() {
  const loginReducer = useSelector((state) => state.loginReducer);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(loginReducer.loggedIn);
  const [showHeader, setShowHeader] = useState(false);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/login");
  };

  // console.log(loginReducer.user.avatar);

  // const MENU_ACTION = [
  //   {
  //     icon: faAddressCard,
  //     title: "Profile",
  //     to: routesConfig.home,
  //   },
  //   {
  //     icon: faRightFromBracket,
  //     title: "Logout",
  //     to: routesConfig.home,
  //   },
  // ];

  useEffect(() => {
    setShowHeader(false);
    if (localStorage.getItem("jwtToken")) {
      setShowHeader(true);
      setIsLoggedIn(true);
    }
  }, [navigate]);

  return (
    <div>
      {showHeader && (
        <div className={cx("wrapper")}>
          <Link to={routesConfig.home} className={cx("logo")}>
            <img style={{height: "50px"}} src={images.logo} alt="logo"/>
          </Link>
          <div className={cx("action")}>
            <HeadlessTippy
              interactive
              placement="bottom-end"
              render={(attrs) => (
                <div className={cx("info-user")}>
                  <Link to={routesConfig.home} className={cx("action-profile")}>
                    <FontAwesomeIcon
                      className={cx("left-icon")}
                      icon={faAddressCard}
                    />
                    Profile
                  </Link>
                  <div className={cx("btn-logout")} onClick={logoutHandler}>
                    <FontAwesomeIcon
                      className={cx("left-icon")}
                      icon={faRightFromBracket}
                    />
                    Logout
                  </div>
                </div>
              )}
            >
              <div>
                <Image
                  className={cx("avatar")}
                  src={
                    urlGlobal.URL_GLOBAL + 
                    "/api/file/avatar/" +
                    loginReducer.user.avatar
                  }
                />
              </div>
            </HeadlessTippy>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;