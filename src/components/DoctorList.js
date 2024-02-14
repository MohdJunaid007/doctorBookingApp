import React from "react";
import '../styles/DocCard.css'
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Cunsaltation</b> {doctor.feesPerCunsaltation}
          </p>
          <p>
            <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        </div>
      </div> */}
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <div className="card-header">
          <img src="https://th.bing.com/th?id=OIP.SVGaIiKoBXwegm1B37YbwgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" alt="Doctor Icon" className="doctor-icon" style={{ height: '20px', border: '40px' }} />
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization:</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience:</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Consultation:</b> {doctor.feesPerConsultation}
          </p>
          <p>
            <b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        </div>
      </div>

    </>
  );
};

export default DoctorList;
