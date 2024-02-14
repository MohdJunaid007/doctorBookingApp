import React,{useEffect} from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const healthAdvice = [
  "Remember to drink plenty of water every day.",
  "Make sure to get at least 7-8 hours of sleep each night.",
  "Regular exercise is essential for maintaining good health.",
  "Eat a balanced diet rich in fruits, vegetables, and whole grains.",
  "Take breaks and stretch if you spend a lot of time sitting.",
  "Practice stress-relief techniques like meditation or deep breathing exercises.",
  "Don't forget to schedule regular check-ups with your healthcare provider.",
  "Limit your intake of processed foods and sugary drinks.",
  "Take time for self-care activities that bring you joy and relaxation.",
  "Stay connected with friends and loved ones for emotional support.",
  "Get outdoors and enjoy some fresh air and sunshine for improved mood and vitamin D.",
  "Maintain good posture to prevent back and neck pain.",
  "Limit screen time before bed to improve sleep quality.",
  "Practice mindful eating by paying attention to hunger and fullness cues.",
  "Engage in hobbies and activities that stimulate your mind and creativity.",
  "Laugh often, as it's good for your mental and physical health.",
  "Take short walks throughout the day to break up long periods of sitting.",
  "Practice gratitude daily to cultivate a positive mindset.",
  "Listen to your body's signals and respond with care and compassion.",
  "Set realistic goals for yourself and celebrate your progress along the way."
];

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function displayRandomHealthAdvice() {
    const randomIndex = Math.floor(Math.random() * healthAdvice.length);
    const adviceElement = document.getElementById('health-advice');
    adviceElement.textContent = healthAdvice[randomIndex];
  }
  useEffect(() => {
    displayRandomHealthAdvice()
  }, []);

  // window.onload = displayRandomHealthAdvice;
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <div className="form-container">
      <div className="header">
        <h2>Welcome to Dr. onCall</h2>
        <p id="health-advice">  </p>
      </div>
      <div className="left-column">
        <img src='https://i.pinimg.com/originals/d0/eb/aa/d0ebaaaa551c675cfd9ee78d26398a6d.png' alt="Your Image" s />
      </div>
      <div className="right-column">
        {/* <div className="form-container "> */}
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register From</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="m-2">
            Already user login here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
      {/* </div> */}
    </div>
    // <>
    //   <div className="form-container ">
    //     <Form
    //       layout="vertical"
    //       onFinish={onfinishHandler}
    //       className="register-form"
    //     >
    //       <h3 className="text-center">Register From</h3>
    //       <Form.Item label="Name" name="name">
    //         <Input type="text" required />
    //       </Form.Item>
    //       <Form.Item label="Email" name="email">
    //         <Input type="email" required />
    //       </Form.Item>
    //       <Form.Item label="Password" name="password">
    //         <Input type="password" required />
    //       </Form.Item>
    //       <Link to="/login" className="m-2">
    //         Already user login here
    //       </Link>
    //       <button className="btn btn-primary" type="submit">
    //         Register
    //       </button>
    //     </Form>
    //   </div>
    // </>
  );
};

export default Register;
