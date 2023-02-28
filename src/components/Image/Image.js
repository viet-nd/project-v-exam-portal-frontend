import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "./Image.module.scss";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function Image({ src, alt, ...props }) {
  const [fallback, setFallback] = useState(src);

  const handleError = () => {
    setFallback(images.noImage);
  };

  useEffect(() => {
    setFallback(src);
  }, [src]);

  return (
    <img
      className={cx("image")}
      src={fallback}
      alt={"Image" || alt}
      {...props}
      onError={handleError}
    />
  );
}

export default Image;
