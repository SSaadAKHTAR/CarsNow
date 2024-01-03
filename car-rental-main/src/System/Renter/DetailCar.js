import React, { useContext, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Image } from "react-bootstrap";
import { IoReturnDownBackOutline } from "react-icons/io5";

import { AuthContext } from "../../context/Auth";
import BookNow from "./components/BookNow";
import RenterLayout from "./components/RenterLayout";
import { Button } from "antd";

const resCol = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 3,
  xxl: 4,
};

const DetailCar = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const route = useNavigate();
  const controls = useAnimation();
  const { id } = useParams();

  const GetcarByID = async () => {
    try {
      const response = await axios.get(`/carrentals/${id}`);
      if (response.status === 200) {
        console.log("here is the car", response.data);
        setData(response.data);
        controls.start({ opacity: 1 });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetcarByID();
  }, [auth]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      <RenterLayout>
        <div className="py-4">
          <div
            className="container"
            style={{
              borderRadius: "20px",
              background: "rgb(87, 85, 85)",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="col-md-6" style={{ justifySelf: "center" }}>
              <Image
                src={data.image_url}
                alt=""
                fluid
                style={{
                  borderRadius: "20px",
                  background: "rgb(87, 85, 85)",
                  display: "flex",
                  justifySelf: "start",
                }}
              />
            </div>
            <div
              className="col-md-6"
              style={{ background: "rgb(87, 85, 85)", padding: "15px" }}
            >
              <h2 className="mb-4" style={{ fontSize: "50px", color: "White" }}>
                {data.make} {data.model}
              </h2>{" "}
              <ul className="list-group" style={{ color: "white" }}>
                <li className="list-group-item">
                  <strong>Year:</strong> {data.year}
                </li>
                <li className="list-group-item">
                  <strong>Registration No:</strong> {data.registration_number}
                </li>
                <li className="list-group-item">
                  <strong>Year:</strong> {data.year}
                </li>
                <li className="list-group-item">
                  <strong>Color:</strong> {data.color}
                </li>
                <li className="list-group-item">
                  <strong>Daily Rate:</strong> ${data.daily_rate}
                </li>
                <li className="list-group-item">
                  <strong>Availability:</strong>{" "}
                  {data.availability ? "Available" : "Not Available"}
                </li>
              </ul>
              <div className="mt-2" style={{ display: "flex" }}>
                <BookNow open={open} setOpen={setOpen} />
                <Button
                  icon={<IoReturnDownBackOutline />}
                  onClick={() => {
                    route("/user");
                  }}
                  style={{
                    backgroundColor: "hsl(26, 97%, 48%) ",
                    color: "white",
                    marginLeft: "5px",
                    border: "none",
                  }}
                >
                  Back to Cars
                </Button>
              </div>
            </div>
          </div>
        </div>
      </RenterLayout>
    </motion.div>
  );
};

export default DetailCar;
