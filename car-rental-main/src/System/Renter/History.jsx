import React, { useContext, useEffect, useState } from "react";
import RenterLayout from "./components/RenterLayout";
import { AuthContext } from "../../context/Auth";
import { Table, Spin } from "antd";
import axios from "axios";

const History = () => {
  const [auth] = useContext(AuthContext);
  const [recordDetails, setRecordDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("subul@gmail.com");

  const fetchRecordDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/my-records", { email });
      console.log(response.data);

      if (
        response.data.message &&
        Array.isArray(response.data.message) &&
        response.data.message.length > 0
      ) {
        const filteredRecords = response.data.message.filter(
          (record) => record.color !== null
        );
        setRecordDetails(filteredRecords);
      } else {
        setRecordDetails([]);
      }
    } catch (error) {
      console.error("Error fetching record details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecordDetails();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "id", // Assuming your API response has an 'id' field
      key: "id",
      render: (text, record, index) => ++index,
    },
    {
      title: "Car ID",
      dataIndex: "car_ID", // Matching with the key in API response
      key: "car_ID",
    },
    {
      title: "Car Model",
      dataIndex: "car_model",
      key: "car_model",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (text, record) => <span style={{ color: text }}>{text}</span>,
    },
    {
      title: "Make",
      dataIndex: "maker",
      key: "maker",
    },
    {
      title: "Registration No",
      dataIndex: "registration_no",
      key: "registration_no",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${text}`, // Assuming "text" contains the numeric value of the price
    },
    {
      title: "Start Date",
      dataIndex: "Start_date",
      key: "Start_date",
      render: (text) => new Date(text).toISOString().slice(0, 10),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (text) => new Date(text).toISOString().slice(0, 10),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const endDate = record.end_date
          ? new Date(record.end_date).toISOString().slice(0, 10)
          : null;

        if (currentDate >= endDate) {
          // Rent is over
          return <span style={{ color: "red" }}>Rent Over</span>;
        } else {
          // Car is still rented
          return <span style={{ color: "blue" }}>Rented</span>;
        }
      },
    },
  ];

  return (
    <RenterLayout>
      <div className="table-responsive ">
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            dataSource={recordDetails}
            columns={columns}
            rowKey={(record) => record.id}
          />
        )}
      </div>
    </RenterLayout>
  );
};

export default History;
