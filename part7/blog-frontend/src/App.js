import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import { ThemeProvider } from "styled-components";
import userService from "./services/users";
import { darkTheme } from "./themes";
import { GlobalStyles } from "./GlobalStyles";
import { useQuery } from "react-query";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import { getAllBlogs, getAllUsers, setToken } from "./requests";
import { NotificationContextProvider } from "./components/NotificationContext";
import { useUserDispatch, useUserValue } from "./components/userContext";

const App = () => {
  // const [user, setUser] = useState(null);
  const dispatch = useUserDispatch();
  const user = useUserValue();
  const [isLoggedIn, setLoggedIn] = useState(false);

  // console.log(user);
  // const sortBlogsByLikes = (blogs) => {
  //   const arr = [...blogs];
  //   arr.sort((a, b) => b.likes - a.likes);
  //   return arr;
  // };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: "LOGIN", user });
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
    }
  }, [user]);

  // console.log(user);
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <NotificationContextProvider>
        {user === null ? <LoginForm /> : <BlogForm />}
      </NotificationContextProvider>
    </ThemeProvider>
  );
};

export default App;
