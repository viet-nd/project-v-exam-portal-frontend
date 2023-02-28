import classNames from "classnames/bind";
import { Button } from "../Button";
import styles from "./ClassItem.module.scss";

const cx = classNames.bind(styles);

function ClassItem({ title, description, onClick }) {
  return (<div className={cx("wrapper")}>
    <div>

    <h2>{title}</h2>
    <h4>{description}</h4>
    </div>
    <Button onClick={onClick}>Delete Class</Button>
  </div>);
}

export default ClassItem;
