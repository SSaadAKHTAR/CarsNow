  import React, { useContext, useEffect, useState } from "react";
  import { IoCarSportSharp } from "react-icons/io5";
  import { Button, Cascader, Modal } from "antd";
  import { useNavigate, useParams } from "react-router-dom";
  import { AuthContext } from "../../../context/Auth";
  import axios from "axios";
  import moment from "moment";
  import toast from "react-hot-toast";
  import Transcript from "./Transcript";

  const residences = [
    {
      label: "Askari ",
      value: "Askari ",
    },

    {
      label: "Bahria Town ",
      value: "Bahria Town ",
    },
    {
      label: "BufferZone",
      value: "BufferZone",
    },
    {
      label: "Cantonment",
      value: "Cantonment",
    },
    {
      label: "Clifton ",
      value: "Clifton ",
    },
    {
      label: "DHA ",
      value: "DHA ",
    },

    {
      label: "F.B Area ",
      value: "F.B Area ",
    },

    {
      label: "F.C Area ",
      value: "F.C Area ",
    },
    {
      label: "Garden ",
      value: "Garden ",
    },

    {
      label: "Soldier Bazaar",
      value: "Soldier Bazaar",
    },
    {
      label: "Gulistan-e-Johar",
      value: "Gulistan-e-Johar",
    },

    {
      label: "Gulshan-e-Iqbal ",
      value: "Gulshan-e-Iqbal ",
    },

    {
      label: "Korangi",
      value: "Korangi",
    },

    {
      label: "Landhi ",
      value: "Landhi ",
    },

    {
      label: "Liaquatabad",
      value: "Liaquatabad",
    },

    {
      label: "Malir",
      value: "Malir",
    },

    {
      label: "Nazimabad",
      value: "Nazimabad",
    },

    {
      label: "North Karachi",
      value: "North Karachi",
    },

    {
      label: "North Nazimabad ",
      value: "North Nazimabad ",
    },

    {
      label: "Rizvia Society",
      value: "Rizvia Society",
    },
    {
      label: "Saddar",
      value: "Saddar",
    },

    {
      label: "P.E.C.H.S",
      value: "P.E.C.H.S",
    },
  ];

  const BookNow = ({ open, setOpen }) => {
    const [auth] = useContext(AuthContext);
    const [days, setDays] = useState(0);
    const { id } = useParams();
    const route = useNavigate();

    const [formData, setFormData] = useState({
      car_id: Number(id),
      email: "",
      cnic: "",
      licenseNumber: "",
      startDate: "",
      endDate: "",
      address: "",
      total_days: days,
    });

    // State to store booking details
    const [bookingDetails, setBookingDetails] = useState(null);

    const handleInputChange = (e) => {
      const { name, value } = e.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const startDate = moment(formData.startDate);
      const endDate = moment(formData.endDate);

      if (startDate.isValid() && endDate.isValid()) {
        const days = endDate.diff(startDate, "days");
        setDays(days);

        try {
          console.log(formData);
          const data = await axios.post("/rentcar", {
            car_ID: formData.car_id,
            email: formData.email,
            end_date: moment(formData.endDate).format("YYYY-MM-DD"),
            Start_date: moment(formData.startDate).format("YYYY-MM-DD"),
            address: formData.address,
            Cnic: formData.cnic,
            LicenseNO: formData.licenseNumber,
            total_days: days,
          });

          if (data.status === 200) {
            console.log(data);
            // Update the state with booking details
            setBookingDetails({
              car_ID: formData.car_id,
              email: formData.email,
              end_date: moment(formData.endDate).format("YYYY-MM-DD"),
              Start_date: moment(formData.startDate).format("YYYY-MM-DD"),
              address: formData.address,
              Cnic: formData.cnic,
              LicenseNO: formData.licenseNumber,
              total_days: days,
            });
            route(`/user/booking-transcript/${id}`);
          }
        } catch (err) {
          console.log(err);
          toast.error("An error occurred while submitting the form.");
        }
      } else {
        toast.error("Invalid date range. Please check your dates.");
      }
    };

    const handleCancel = () => {
      setOpen(false);
      console.log(days);
    };

    return (
      <>
        <Button
          icon={<IoCarSportSharp />}
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Book Now
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
            <form
              onSubmit={handleSubmit}
              style={{
                display: "grid",
                gridRowGap: "10px",
              }}
            >
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    color: "black",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Pickup Date:</label>
                <input
                  type="date"
                  name="startDate"
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    color: "black",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  value={formData.startDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                  required
                />
              </div>
              <div>
                <label>Dropoff Date:</label>
                <input
                  type="date"
                  name="endDate"
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    color: "black",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  value={formData.endDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                  required
                />
              </div>

              <div>
                <label>CNIC:</label>
                <input
                  type="text"
                  name="cnic"
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    color: "black",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  value={formData.cnic}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>License Number:</label>
                <input
                  type="text"
                  name="licenseNumber"
                  style={{
                    padding: "8px",
                    color: "black",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label>Address:</label>
                <Cascader
                  options={residences}
                  style={{
                    width: "100%",
                    padding: "8px",
                    background: "white",
                  }}
                  placeholder="Select Address"
                  onChange={(value) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      address: value,
                    }));
                  }}
                />
              </div>
              <button
                className="ant-btn"
                style={{ width: "100px", height: "35px", borderRadius: "5px" }}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </Modal>
        {/* <Transcript id={formData.car_id} /> */}
      </>
    );
  };
  export default BookNow;
