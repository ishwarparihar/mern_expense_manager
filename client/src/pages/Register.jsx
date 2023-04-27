import React, { useState , useEffect} from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // form submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registration Successfull");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      // message.error("Invalid username or password");
      message.error("Something went wrong");
    }
  };

  // prevent for login user 

  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/")
    }    
  }, [navigate])

  return (
    <div>
      <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input type="text" placeholder="Enter Name" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Enter Email" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" placeholder="Enter Passwords" />
          </Form.Item>

          <div className="d-flex justify-content-between">
            <Link to="/login" style={{ textDecoration: "none" }}>
              Already Register ? Click Here to Login
            </Link>
            <button className="btn btn-primary" submit>
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
