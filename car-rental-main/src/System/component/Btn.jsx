import { Button } from "antd";
import React from "react";

const Btn = ({ children, className, onClick, icon, loading }) => {
  return (
    <Button
      loading={loading}
      icon={icon}
      className={`btn  ${className}`}
      onClick={onClick}
      type="dashed"
      size="small"
    >
      {children}
    </Button>
  );
};

export default Btn;