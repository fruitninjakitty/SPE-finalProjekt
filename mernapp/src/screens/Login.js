import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PORT } from '../components/Constants';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await fetch("http://localhost:5000/api/loginuser", {
      const response = await fetch(`http://192.168.58.2:${PORT}/api/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Invalid credentials");
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div className='login-container' style={{ backgroundImage: `url("https://assets.bonappetit.com/photos/628e476015a4f97a23e2b522/16:9/w_2560%2Cc_limit/0525-hr-imperfect-foods-lede.jpg")` }}>
      <div className='form-container'>
        <h1 className='login-title'>Welcome back!</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/createuser" className='btn btn-danger'>I'm a new user</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
