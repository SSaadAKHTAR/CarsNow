import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const [count, setcount] = useState(4);
  const router = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setcount(count - 1);
    }, 1000);
    if (count === 0) {
      router("/");
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [count]);
  return <Spin />;
};

export default Redirect;
