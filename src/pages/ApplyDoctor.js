import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";
import '../styles/DocCard.css'
const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
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
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  return (
    <Layout>
      {/* <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Personal Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="your email address" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="your website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your clinic address" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Cunsaltation"
              name="feesPerCunsaltation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form> */}
      <div className="apply-doctor-form">
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <div className="personal-details">
          <h4>Personal Details:</h4>
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input placeholder="Your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input placeholder="Your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input placeholder="Your contact number" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true, type: 'email', message: 'Please input a valid email address!' }]}
              >
                <Input placeholder="Your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input placeholder="Your website" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true, message: 'Please input your clinic address!' }]}
              >
                <Input placeholder="Your clinic address" />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="professional-details">
          <h4>Professional Details:</h4>
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true, message: 'Please input your specialization!' }]}
              >
                <Input placeholder="Your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true, message: 'Please input your experience!' }]}
              >
                <Input placeholder="Your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item
                label="Fees Per Consultation"
                name="feesPerConsultation"
                required
                rules={[{ required: true, message: 'Please input your fees per consultation!' }]}
              >
                <Input placeholder="Fees per consultation" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item label="Timings" name="timings" required>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}></Col>
            <Col xs={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Submit
              </button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
    </Layout>
  );
};

export default ApplyDoctor;
