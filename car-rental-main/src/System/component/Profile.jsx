import { Button, Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/Auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = ({ open, setOpen }) => {


  return (
    <>
      <Modal
        style={{
          color: "white",
        }}
        icon={<FaUser />}
        title="User Profile"
        centered
        open={open}
        onCancel={()=>{setOpen(false)}}
        footer={null}
      >
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label className="font-medium">Name</label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Confirm Password</label>
            <input
              type="confirmpassword"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
        </form>
        <Button
          style={{ justifySelf: "end", marginTop: "20px" }}
          onClick={() => {
            setOpen(false);
          }}
        >
          Update profile
        </Button>
      </Modal>
    </>
  );
};

export default Profile;
