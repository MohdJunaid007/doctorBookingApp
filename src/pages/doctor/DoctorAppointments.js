import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import '../../styles/DocCard.css'

import axios from "axios";

import moment from "moment";
import { message, Table } from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [userId, setUserId] = useState('');

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        // console.log(res.data.data, "here doc data");
        setAppointments(res.data.data.appointments);
        setUserId(res.data.data.userDetail);


        // if(userId){

        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "_id",
    // },
    {
      title: "name",
      dataIndex: 'user',
      render: (text, record) => <span>{userId.name}</span>,
    },
    {
      title: "email",
      dataIndex: 'email',
      render: (text, record) => <span>{userId.email}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <div className="appointments-container">
        <h1>Appoinmtnets Lists</h1>
        <Table columns={columns} dataSource={appointments} />
      </div>
    </Layout>
  );
};

export default DoctorAppointments;
