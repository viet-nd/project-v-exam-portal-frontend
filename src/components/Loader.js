import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      // style={{
      //   widht: "100px",
      //   height: "100px",
      //   margin: "auto",
      //   display: "block",
      // }}
    ></Spinner>
  );
};

export default Loader;
