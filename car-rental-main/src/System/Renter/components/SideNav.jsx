import { Menu } from "antd";
import React from "react";
import {
  MdOutlineCategory,
  MdOutlineCreate,
  MdOutlineDashboard,
} from "react-icons/md";
import { PiUsersLight } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";

const SideNavs = () => {
  const router = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <Menu
      theme="dark"
      style={{
        height: "100%",
        color: "white",
      }}
      defaultSelectedKeys={["1"]}
      mode="inline"
    >
    
      <Menu.Item
        onClick={() => router("/user")}
        className={`${
          pathname === "/admin" ? "ant-menu-item-selected" : "sidebar-navs"
        }`}
        icon={<MdOutlineDashboard />}
      >
        Dashboard
      </Menu.Item>
      
      <Menu.Item
        onClick={() => router("/user/history")}
        className={`${
          pathname === "/user/history" ? "ant-menu-item-selected" : "sidebar-navs"
        }`}
        icon={<MdOutlineCreate />}
      >
        Record
      </Menu.Item>
     
    </Menu>
  );
};

export default SideNavs;