import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from ".././context/Auth";
import { Button, Input, Modal, Select } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";
import { IoSendOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/images/Logo.png";

const Signup = ({ open, setOpen }) => {
  const route = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
    dateOfBirth: "",
    driverLicenseNumber: "",
    password: "",
    password2: "",
    gender: "",
  });
  const [auth, setAuth] = useContext(AuthContext);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("/signup", formData, auth);

      if (response.status === 200) {
        setAuth(response.data); // Update auth state with the received data
        route("/user");
        toast.success("Account created :)");
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred during signup");
    }
  };

  useEffect(() => {
    // if (auth && auth?.token) {
    //   router("/");
    // }
  }, [auth, route]);

  return (
    <>
      <Button
        style={{
          margin: "10px",
          borderRadius: "100px",
        }}
        icon={<UserAddOutlined />}
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Register now
      </Button>
      <Modal open={open} footer={null} onCancel={handleCancel}>
        <div
          style={{
            margin: "10px",
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
              paddingTop: "5px",
              justifyContent: "center",
              justifyItems: "center",
              height: "100px",
            }}
          >
            <img className="logo2" src={logo} alt="Logo" />
          </div>
          <div style={{ justifyContent: "center" }}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label htmlFor="firstName">First Name</label>
                  <Input
                    type="text"
                    style={{ border: "none" }}
                    placeholder="John"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label htmlFor="lastName">Last Name</label>
                  <Input
                    type="text"
                    style={{ border: "none" }}
                    placeholder="Doe"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="email"
                    style={{ border: "none" }}
                    placeholder="example@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label htmlFor="phoneNo">Phone No</label>
                  <Input
                    type="text"
                    style={{ border: "none" }}
                    placeholder="555-123-4567"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label htmlFor="address">Address</label>
                  <Input
                    type="text"
                    style={{ border: "none" }}
                    placeholder="123 Main St, Cityville"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <Input
                    type="date"
                    style={{ border: "none" }}
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label htmlFor="driverLicenseNumber">
                    Driver's License Number
                  </label>
                  <Input
                    type="text"
                    style={{ border: "none" }}
                    placeholder="DL123456"
                    name="driverLicenseNumber"
                    value={formData.driverLicenseNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    style={{ border: "none" }}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label htmlFor="password2">Confirm Password</label>
                  <Input
                    type="password"
                    style={{ border: "none" }}
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label htmlFor="gender">Gender</label>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select gender"
                    name="gender"
                    value={formData.gender}
                    onChange={(value) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        gender: value,
                      }))
                    }
                  >
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </div>
              </div>
            </div>
            <Button
              className="clicks mt-3"
              onClick={handleSubmit}
              icon={<IoSendOutline />}
            >
              Submit
            </Button>
          </div>{" "}
        </div>
      </Modal>
    </>
  );
};

export default Signup;
