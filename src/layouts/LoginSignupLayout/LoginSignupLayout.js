import classNames from "classnames/bind";
import styles from "./LoginSignupLayout.module.scss";

const cx = classNames.bind(styles);

const LoginSignupLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("content")}>
          {children}
          <p className={cx("footerContent")}>
            Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
            điều khoản của chúng tôi
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupLayout;
