import React, { useContext, useEffect, useState } from "react";

import Search from "antd/es/input/Search";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { CgDetailsMore } from "react-icons/cg";
import { MdOutlineNotInterested } from "react-icons/md";
import RenterLayout from "./components/RenterLayout";
import { AuthContext } from "../../context/Auth";

const Renter = () => {
  const [auth] = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([{}]);
  const [filteredData, setFilteredData] = useState([]);
  const route = useNavigate();

  const getAllCar = async () => {
    try {
      const response = await axios.get("/carrentals");
      if (response.status === 200) {
        console.log(auth);
        console.log("here are the cars", response.data);
        setOpen(open);
        setData(response.data);
        setFilteredData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCar();
  }, [auth]);
  const handleSearch = (value) => {
    const searchText = value.toLowerCase();
    const filteredCars = data.filter(
      (car) =>
        car.availability == 1 &&
        (car.model.toLowerCase().includes(searchText) ||
          car.make.toLowerCase().includes(searchText) ||
          car.color.toLowerCase().includes(searchText))
    );
    setFilteredData(filteredCars);
    console.log(filteredCars);
  };

  return (
    <RenterLayout>
      <div className="flex justify-center mb-8">
        <Search
          style={{ width: "500px" }}
          placeholder="Input search text"
          onSearch={handleSearch}
          enterButton
        />
      </div>
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="mt-12">
            <ul className="grid gap-8 lg:grid-cols-2 ">
              {filteredData.map((item, idx) => (
                <li key={idx} className="gap-8 sm:flex">
                  <div
                    className="w-full h-full"
                    style={{
                      borderRadius: "1rem",
                    }}
                  >
                    <img
                      src={item.image_url}
                      alt=""
                      className="w-full h-full object-cover object-center shadow-md rounded-xl bs1"
                    />
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <h4 className="text-lg text-white-700 font-semibold">
                      {item.model}
                    </h4>
                    <p className="text-indigo-600">{item.make}</p>
                    <p className="text-indigo-600">{item.color}</p>
                    <p className="text-white-600 mt-2">
                      ${item.daily_rate} /day
                    </p>
                    <div className="mt-3 flex gap-2 text-gray-400">
                      {item.availability === 1 && (
                        <Button
                          icon={<CgDetailsMore />}
                          onClick={() => {
                            route(`/user/details/${item.id}`);
                          }}
                        >
                          Details
                        </Button>
                      )}
                      {item.availability === 0 && (
                        <Button icon={<MdOutlineNotInterested />} disabled>
                          Rented!!
                        </Button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </RenterLayout>
  );
};
export default Renter;
