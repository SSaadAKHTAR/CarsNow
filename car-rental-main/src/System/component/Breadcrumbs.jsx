import { Breadcrumb } from "antd";
import React from "react";
import { IoCreate, IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ from, to, fromPath, fromIcon, toIcon }) => {
  return (
    <Breadcrumb
    items={[
      {
        title: (
          <b className="d-flex align-items-center gap-2 ">
            {fromIcon}
            <Link to={fromPath} className="bread-text">
              {from}
            </Link>
          </b>
        ),
      },
      {
        title: (
          <b className="bread-text-active">
            {toIcon}
            <span >{to}</span>
          </b>
        ),
      },
    ]}
  />
  );
};

export default Breadcrumbs;