
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useSelector } from "react-redux";
import axios from 'axios';
// import { sendMessageToOpenAI } from "./openai";
import { sendMessageToOpenAI } from './openai';
import openai from 'openai';

import { Input, Form } from 'antd';

const Profile2 = () => {
  const { user } = useSelector((state) => state.user);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  ///
  const [specialization, setSpecialization] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState('');
  //


  const sendQuestion = async () => {
    try {
      const res = await axios.post('/apiGPT', { question });
      setResponse(res.data.data);
      // console.log(res.data.data, "chatgpt output")
      setSpecialization(response.content);
      // console.log(response);
    } catch (error) {
      console.error(error);
      setResponse('Error occurred');
    }
  };

  const handleSearch = async () => {
    try {
      console.log(specialization, "speciality");
      const response = await axios.post('/api/v1/doctor/findBySpecialization', { specialization });
      console.log(response.data.data, "find doctor");
      setDoctors(response.data.data[0]);
      console.log(doctors, "here doctor find");
      //  setMessage(message);
    } catch (error) {
      console.error(error);
      setMessage('Error occurred');
    }
  };

  // useEffect(() => {
  //   handleSearch();
  // }, [specialization]);



  // const handleCLick = async (e) => {
  //   e.preventDefault();
  //   setResponse(input);
  // }

  return (
    <Layout>

      <h3 className='m-4' style={{ textAlign: "center" }}>Profile Page</h3>
      <div class="container m-1">
        <p> Name - {user?.name} </p>
        <p> Email - {user?.email} </p>
        <p> {(user?.isDoctor) ? "Doctor" : "Patient"} </p>
        <Form>

          <Form.Item
            label="Find best doctor"
            name="findDoc"
            required
            rules={[{ required: true }]}
          >
            <Input type="text" value={question} onChange={e => setQuestion(e.target.value)} placeholder="Describe your problem..." />
          </Form.Item>
          <button className="btn btn-primary" onClick={sendQuestion} type="submit">
            Submit
          </button>
          {/* <h2>Response:</h2> */}
          <p className='m-2' style={{ textAlign: "left", fontFamily: "inherit", fontSize: "20px" }}>{response ? "You should book an appontment for a " + response.content : ''}</p>
        </Form>
        <div>
          {/* <ul>
            {doctors && doctors.map((doctor, index) => (
              <li key={index}>
                <p>{`Doctor Name: ${doctor.firstName} ${doctor.lastName}`}</p>
                <p>{`Fees: ${doctor.feesPerCunsaltation}`}</p>
                <p>{`Phone: ${doctor.phone}`}</p>
                <p>{`Email: ${doctor.email}`}</p>
                 <p>{`Specialization: ${doctor.specialization}`}</p>
              </li>
            ))}
          </ul> */}

        </div>

      </div>
    </Layout>
  )
}

export default Profile2