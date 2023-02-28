import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./MenuItem.module.scss";

const cx = classNames.bind(styles);

function MenuItem({ to, icon, content }) {
  return (
    <Link to={to}>
      <div className={cx("container")}>
        <div className={cx("icon")}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className={cx("content")}>{content}</div>
      </div>
    </Link>
  );
}

export default MenuItem;
