import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ children, inverted, isLoading, ...props }) => (
  <button
    className={`${inverted && "inverted"} custom-button`}
    disabled={isLoading}
    {...props}
  >
    {children}
  </button>
);

export default CustomButton;
