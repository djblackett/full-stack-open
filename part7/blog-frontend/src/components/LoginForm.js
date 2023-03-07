import React, { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import Notification from "./Notification";
import { useNotificationDispatch } from "./NotificationContext";
import { useUserDispatch } from "./userContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginService.login(username, password);
      const token = res.token;
      userDispatch({ type: "LOGIN", user: res });
      localStorage.setItem("user", JSON.stringify(res));

      setUsername("");
      setPassword("");

      blogService.setToken(token);
    } catch (error) {
      dispatch({ type: "ERROR" });
      setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} isError={true} />
      <form onSubmit={handleLogin}>
        <label>username</label>
        <br />
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsername}
          id="username"
        />
        <br />
        <label>password</label>
        <br />
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePassword}
          id="password"
        />
        <br />
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
