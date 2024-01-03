import React, { useContext, useEffect, useState } from "react";
import RenterLayout from "./RenterLayout";
import axios from "axios";
import { AuthContext } from "../../../context/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Descriptions } from "antd";
import BookNow from "./BookNow";
import { IoReturnDownBackOutline } from "react-icons/io5";
const resCol = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 3,
  xxl: 4,
};
const Cardetail = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [data, setData] = useState([{}]);
  const [open, setOpen] = useState(false);
  const route = useNavigate();
  const { id } = useParams();
  const GetcarByID = async () => {
    try {
      const response = await axios.get(`/carrentals/${id}`);
      if (response.status === 200) {
        console.log("here is the car", response.data);
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetcarByID();
  }, [auth]);

  return (
    <RenterLayout>
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="mt-4">
            <div
              className="w-50 h-50"
              style={{
                borderRadius: "1rem",
              }}
            >
              <img
                src={data.image_url}
                alt=""
                className="w-full h-full object-cover object-center shadow-md rounded-xl"
              />
            </div>
            <Descriptions
              style={{ color: "white" }}
              className="desc mt-2 text-white-700 "
              bordered
              column={resCol}
            >
              <Descriptions.Item label="Model">{data.model}</Descriptions.Item>
              <Descriptions.Item label="Brand">{data.make}</Descriptions.Item>
              <Descriptions.Item label="Year">{data.year}</Descriptions.Item>
              <Descriptions.Item label="Registration No">
                {data.registration_number}
              </Descriptions.Item>
              <Descriptions.Item label="Color">{data.color}</Descriptions.Item>
              <Descriptions.Item label="Rent">
                ${data.daily_rate}/day
              </Descriptions.Item>
            </Descriptions>
            <div className="mt-3 flex gap-2 text-gray-800">
              <BookNow open={open} setOpen={setOpen} />
              <Button
                icon={<IoReturnDownBackOutline />}
                onClick={() => {
                  route("/user");
                }}
              >
                Back to Cars
              </Button>
            </div>
          </div>
        </div>
      </section>
    </RenterLayout>
  );
};

export default Cardetail;
