import React from "react";
import { Button } from "antd";

const CustomButton = ({children, className, testId, onClickHandler, type="default", htmlType="", label="Button"}) => {

  return (
    <Button
        className={className}
        data-testid={testId}
        onClick={onClickHandler}
        type={type}
        htmlType={htmlType}
        aria-label={label}
    >
        {children}
    </Button>
  );
};

export default CustomButton;