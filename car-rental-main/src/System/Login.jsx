import React, { useContext, useEffect, useState } from "react";
import logo from "../Assests/images/Logo.png";
import { Button, Form, Input, Layout, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/Auth";

const Login = ({ open, setOpen }) => {
  const router = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/login", values);
      console.log(values);
      if (data.error) {
        toast.error(data.error);
        console.log(data.error);
        setLoading(false);
      } else {
        setAuth({ user: data.user, token: data.token });
        console.log([auth.token]);
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Sucessfully logged in");
        setLoading(false);
        router("/user");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    // if (auth && auth?.token) {
    //   router("/");
    // }
  }, [auth, router]);

  return (
    <>
      <Button
        style={{
          margin: "10px",
          borderRadius: "100px",
        }}
        icon=<UserOutlined />
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Log in
      </Button>

      <Modal open={open} footer={null} onCancel={handleCancel}>
        <div
          style={{
            display: "grid",
            justifyContent: "center",
            borderRadius: "20px",
            color: "white",
            justifyItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              paddingTop: "20px",
              justifyContent: "center",
              justifyItems: "center",
              height: "170px",
            }}
          >
            <img className="logo2" src={logo} />
          </div>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="abc@gmail.com"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Login;
