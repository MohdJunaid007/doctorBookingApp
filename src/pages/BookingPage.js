import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        console.log(res.data.data);
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ============ handle availiblity
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  // =============== booking func
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>

      {/* <h2 style={{ textAlign: "center" }}>Booking Page</h2>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees : {doctors.feesPerCunsaltation}</h4>
            <h4>
              Timings : {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}{" "}
            </h4>
            <h4>
              Phone : {doctors.phone}
            </h4>
            <h4>
              Email : {doctors.email}
            </h4>
            <h4>
              Specialization : {doctors.specialization}
            </h4>
            <h4>
              Website :  {doctors.website} 
            </h4>
            
            <div className="d-flex flex-column w-50">
              <DatePicker
                aria-required={"true"}
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                aria-required={"true"}
                format="HH:mm"
                className="mt-3"
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}
              />

              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>

              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div> */}
      <div style={{ textAlign: "center", backgroundColor: "lightblue", padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>Booking Page</h2>
        <div className="container m-2" style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "left" }}>
          {doctors && (
            <div>
              <h4>
                Dr. {doctors.firstName} {doctors.lastName}
              </h4>
              <h4>Fees: {doctors.feesPerCunsaltation}</h4>
              <h4>
                Timings: {doctors.timings && doctors.timings[0]} -{" "}
                {doctors.timings && doctors.timings[1]}{" "}
              </h4>
              <h4>Phone: {doctors.phone}</h4>
              <h4>Email: {doctors.email}</h4>
              <h4>Specialization: {doctors.specialization}</h4>
              <h4>Website: {doctors.website}</h4>

              <div className="d-flex flex-column w-50">
                <DatePicker
                  className="m-1"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                  }}
                  required
                />
                <TimePicker
                  className="m-1"
                  format="HH:mm"
                  onChange={(value) => {
                    setTime(moment(value).format("HH:mm"));
                  }}
                  required
                />

                <button
                  className="btn btn-primary mt-2"
                  style={{ width: "200px", alignSelf: "center" }}
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>

                <button
                  className="btn btn-dark mt-2"
                  style={{ width: "200px", alignSelf: "center" }}
                  onClick={handleBooking}
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>


    </Layout>
  );
};

export default BookingPage;
