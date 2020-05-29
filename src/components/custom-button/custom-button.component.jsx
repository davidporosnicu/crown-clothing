import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ children, inverted, ...props }) => (
  <button className={`${inverted && "inverted"} custom-button`} {...props}>
    {children}
  </button>
);

export default CustomButton;
