import React, { useState , useEffect} from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
// import login from "../Images/login.png"
import { Card } from 'antd';

const Login = () => {
    
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // form submit
  const submitHandler = async (values) => {
    // console.log(values);
    try {
      setLoading(true);
      const { data } = await axios.post('/users/login', values);
      setLoading(false);
      message.success("login Successfully");
      localStorage.setItem('user',
      JSON.stringify({ ...data.user, password:"" }));
      navigate('/');
    } catch (error) {
      setLoading(false);
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
    <div className="">
    <Card>
    <div className="register-page">
    {loading && <Spinner />}
    <Form layout="vertical" onFinish={submitHandler} >
  {/*style={{background: "#ececec", padding: "30px"}}*/}
    {/*<div className="log_in">
    <img src={login} alt="" />
    </div>
  */}
    <h1 className="text-center mb-2">Login Form</h1>
    <Form.Item label="Email" name="email">
    <Input type="email" placeholder="Enter Email" />
    </Form.Item>
    
    <Form.Item label="Password" name="password">
    <Input type="password" placeholder="Enter Passwords" />
    </Form.Item>
    
    <div className="d-flex justify-content-between">
    <Link to="/register" style={{ textDecoration: "none" }} className="">
    Not a user ? Click Here to register
    </Link>
    <button className="btn btn-success">
    Login
    </button>
    </div>
    </Form>
    </div>
    </Card>
    </div>
  );
};

export default Login;
