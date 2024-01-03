import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo.png";
import { BsPersonFillGear } from "react-icons/bs";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
import Redirect from "../../../utils/Redirect";
import {  useNavigate } from "react-router-dom";
import SideNavs from "./SideNav";
import { AuthContext } from "../../../context/Auth";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Profile from "../../component/Profile"



const { Header, Content, Sider } = Layout;
const RenterLayout = ({ children }) => {
  const route = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);
  const [openProfile, setOpenProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const items = [
    {
      key: "1",
      label: <span>Profile</span>,
      icon: <BsPersonFillGear className="icon-header" />,
      onClick: () => setOpenProfile(true),
    },
    {
      key: "2",
      label: <span>Logout</span>,
      icon: <IoLogOutOutline className="icon-header" />,
      onClick: () => {
        localStorage.clear();
        setAuth({});
        route("/");
       
      },
    },
  ];
  useEffect(()=>{
    
    if(!auth&&auth.token){
      route("/")
    }

  },[]) 

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <img
          src={Logo}
          style={{ justifySelf: "center", height: "70px", width: "200px" }}
        />
      
        <SideNavs/>
      </Sider>
      <Layout>
        <Header style={{
          display:"flex",
      
          paddingLeft:"100px",
        }}>
 
        <Dropdown menu={{ items }} >
            <Avatar
              role="button"
              style={{
                background: "hsl(26, 97%, 48%)",
                color: "white",
              }}
              
            >   
  
       <FaUser  style={{height:"30px"}} />
            </Avatar>
          </Dropdown>
        </Header>
       <Content
          style={{
            height:"100%",
            margin: "24px 24px ",
            padding:"20px"
          }}
        >
         <div className="content">
            {loading ? <Redirect /> : children}
            </div>
        </Content>
        <Profile open={openProfile} setOpen={setOpenProfile} />
      </Layout>
    </Layout>
  );
};

export default RenterLayout;
