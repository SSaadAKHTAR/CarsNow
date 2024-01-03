import { Button, Dropdown, Flex, Layout } from "antd";
import logo from "../Assests/images/Logo.png";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mainPage from "../Assests/images/Homepg.png";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import Login from "./Login";
import Signp from "./Signp";

const boxStyle = {
  width: "85%",
};
const justifyOptions = ["flex-end"];
const alignOptions = [" flex-end"];

const Home = () => {
  const [open, setopen] = useState(false);
  const [open2, setopen2] = useState(false);
  const router = useNavigate();
  const [justify, setJustify] = useState(justifyOptions[0]);
  const [alignItems, setAlignItems] = useState(alignOptions[0]);
  const [Word, setWord] = useState("hello");

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          breakpoint="lg"
          className="nav"
          style={{
            position: "sticky",
            top: 0,
            color: "White",
            fontSize: "bold",
            width: "100%",
            background: "black",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img className="logo" src={logo} />
          <Flex style={boxStyle} justify={justify} align={alignItems}>
            <Flex justify="end" gap="small" align="center" wrap="wrap">
              {/* <Button
               */}
              <Login setOpen={setopen} open={open} />
              <Signp setOpen={setopen2} open={open2} />
            </Flex>
          </Flex>
        </Header>
        <Content
          style={{
            background: "black",
            padding: "0 60px",
            height: "90vh",
            color: "white",
            display: "grid",
            width: "100vw",
            justifySelf: "center",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              display: "grid",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: "20px",
                color: "#ef6a04",
                justifySelf: "center",
              }}
            >
              BOOK YOUR CAR NOW
            </p>
            <p
              style={{
                padding: "0",
                margin: "0",
                fontSize: "50px",
                justifySelf: "center",
                color: "White",
                alignItem: "center",
              }}
            >
              {" "}
              FAST & AFFORDABLE
            </p>
          </div>
          <img
            src={mainPage}
            style={{
              height: "300px",
            }}
          />
        </Content>
      </Layout>
    </>
  );
};

export default Home;
