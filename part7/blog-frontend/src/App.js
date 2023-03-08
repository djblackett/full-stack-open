import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./themes";
import { GlobalStyles } from "./GlobalStyles";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import { NotificationContextProvider } from "./components/NotificationContext";
import { useUserDispatch, useUserValue } from "./components/userContext";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const App = () => {
  const dispatch = useUserDispatch();
  const user = useUserValue();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: "LOGIN", user });
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <NotificationContextProvider>
        <AppContainer>
          {user === null ? <LoginForm /> : <BlogForm />}
        </AppContainer>
      </NotificationContextProvider>
    </ThemeProvider>
  );
};

export default App;
