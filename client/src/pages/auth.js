import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie"; // Import useCookies from react-cookie
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [_, setCookie] = useCookies(["access_token"]); // Initialize cookies
    const navigate = useNavigate();
  
    const onSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post("http://localhost:3001/auth/login", {
          username,
          password,
        });
        setCookie("access_token", response.data.token); // Set the cookie's path
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="auth-box">
        <form onSubmit={onSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className="auth-button" type="submit">Login</button>
        </form>
      </div>
    );
};
  

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]); // Initialize cookies
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("User registered! You can now login.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-box">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="auth-button" type="submit">Register</button>
      </form>
    </div>
  );
};

  