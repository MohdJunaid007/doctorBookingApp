import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table } from "antd";
import '../styles/DocCard.css'
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const [doc, setDoc] = useState('');
  // const [fdata, setfData] = useState([]);
  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        console.log(res.data.data);
        setDoc(res.data.data[0].doctorId)
        // console.log(doc, "hereee")
        // setfData(appointments:res.data.data);
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const getUserData = async () => {
    try {
      console.log("docc--", doc);
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: doc },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
        // console.log(doctors)
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getUserData();
  }, [doc]);

  // useEffect(() => {
  //   setfData([...appointments, ...doctors]);
  // }, [appointments, doctors]);





  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "_id",
    // },
    {
      title: "Name",
      dataIndex: "text",
      render: (text, record) => (
        <span>
          {doctors.firstName} {doctors.lastName}
          {/* // {doc? doc:"not"} */}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{doctors.phone}</span>,
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
  ];

  return (
    <Layout>
      <div className="appointments-container">
        <h1>Appoinmtnets Lists</h1>
        <Table className="appointment-table" columns={columns} dataSource={appointments} />
      </div>
    </Layout>
  );
};

export default Appointments;
