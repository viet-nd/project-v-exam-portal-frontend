//sidebar admin
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//sidebar user
import { useSelector } from "react-redux";

//custome
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { MenuItem } from "./MenuItem";
// import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBook,
  faDoorOpen,
  faFileLines,
  faSquarePollVertical,
  faUser,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";


const cx = classNames.bind(styles);

function Sidebar() {
  var sidebarRole = useSelector((state) => {
    console.log(state);
    // console.log(state.loginReducer.user.authorities[0].authority);
    if (state.loginReducer.user) {

      return state.loginReducer.user.authorities[0].authority;
    }
    return null;
  });

  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setShowSidebar(false);
    if (localStorage.getItem("jwtToken")) {
      setShowSidebar(true);
      // sidebarRole = localStorage.getItem("user").role;
    }
  }, [navigate]);

  //sidebar admin
  const menuItemAdmin = [
    {
      path: "/adminProfile",
      name: "Profile",
      icon: faUser,
    },
    {
      path: "/adminAddAccount",
      name: "Add",
      icon: faUserPlus,
    },
    {
      path: "/adminManagerAccount",
      name: "Users",
      icon: faUserGear,
    },
    {
      path: "/adminManagerSubClass",
      name: "Classes",
      icon: faDoorOpen,
    },
    
  ];

  //sidebar manager
  const menuItemManager = [
    {
      path: "/managerProfile",
      name: "Profile",
      icon: faUser,
    },
    {
      path: "/managerSubjects",
      name: "Subjects",
      icon: faBook,
    },
    {
      path: "/managerSubClasses",
      name: "Classes",
      icon: faDoorOpen,
    },
    {
      path: "/managerQuizzes",
      name: "Quizzes",
      icon: faFileLines,
    },
    {
      path: "/managerQuizResults",
      name: "ResultQuiz",
      icon: faSquarePollVertical,
    },
  ];

  const menuItemUser = [
    {
      path: "/profile",
      name: "Profile",
      icon: faUser,
    },
    {
      path: "/classes",
      name: "Join Classes",
      icon: faDoorOpen,
    },
    {
      path: "/quizzes",
      name: "Quizzes",
      icon: faFileLines,
    },
    {
      path: "/quizResults/",
      name: "ResultQuiz",
      icon: faSquarePollVertical,
    },
  ];

  return (
    <div>
      {showSidebar && (
        <div className={cx("container")}>
          <div className={cx("sidebar")}>
            {(() => {
              switch (sidebarRole) {
                case "ADMIN":
                  return menuItemAdmin.map((item, index) => (
                    <MenuItem
                      key={index}
                      to={item.path}
                      icon={item.icon}
                      content={item.name}
                    />
                  ));
                case "MANAGER":
                  return menuItemManager.map((item, index) => (
                    <MenuItem
                      key={index}
                      to={item.path}
                      icon={item.icon}
                      content={item.name}
                    />
                    
                  ));

                default:
                  return menuItemUser.map((item, index) => (
                    <MenuItem
                      key={index}
                      to={item.path}
                      icon={item.icon}
                      content={item.name}
                    />
                  ));
              }
            })()}
            
          </div>
        </div>
      )}
    </div>

    
  );
}

export default Sidebar;
