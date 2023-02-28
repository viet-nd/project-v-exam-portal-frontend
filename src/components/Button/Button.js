import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({ children, className, onClick, ...prevProps }) {
  return (
    <button
      className={cx("btn", { [className]:className })}
      onClick={onClick}
      {...prevProps}
    >
      {children}
    </button>
  );
}

export default Button;
