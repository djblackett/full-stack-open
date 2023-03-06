import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import UsersView from "./components/UsersView";
import { useTheme } from "styled-components";
import { Link, Route, Routes } from "react-router-dom";
import UserView from "./components/UserView";
import userService from "./services/users";
import BlogView from "./components/BlogView";
import BlogList from "./components/BlogList";

// remove button only appears after refresh
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const theme = useTheme();
  const styles = {
    backgroundColor: theme.background,
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getBlogs();
    }
  }, [user]);

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
      setUser(res);
      localStorage.setItem("user", JSON.stringify(res));

      setUsername("");
      setPassword("");

      blogService.setToken(token);
    } catch (error) {
      console.log(error);
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const sortBlogsByLikes = (blogs) => {
    const arr = [...blogs];
    arr.sort((a, b) => b.likes - a.likes);
    return arr;
  };

  const getBlogs = async () => {
    const response = await blogService.getAll();
    // console.log(response);
    const sorted = sortBlogsByLikes(response);
    setBlogs(sorted);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await userService.getAll();
    console.log(response);
    // const sorted = sortBlogsByLikes(response);
    setUsers(response);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const loginForm = () => {
    return (
      <div style={styles}>
        <h2>Log in to application</h2>
        <ErrorMessage message={errorMessage} />
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

  const blogForm = () => {
    return (
      <div id="blog-form" style={styles}>
        <h2>blogs</h2>
        <SuccessMessage message={successMessage} />
        <br />

        <nav style={{ color: "white" }}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              justifyContent: "space-between",
              width: "75px",
            }}
          >
            <li>
              <Link to={"/"}>blogs</Link>
            </li>
            <li>
              {" "}
              <Link to={"/users"}>users</Link>
            </li>
          </ul>
        </nav>
        <span>{user.name} logged in</span>
        <button onClick={logout} id="logout-button">
          logout
        </button>
        <br />
        <Routes>
          <Route path="/users/:id" element={<UserView users={users} />} />
          <Route
            path="/users"
            element={<UsersView style={styles} users={users} />}
          />
          <Route
            path={"/blogs/:id"}
            element={<BlogView getBlogs={getBlogs} blogs={blogs} />}
          />
          <Route
            path={"/"}
            element={
              <BlogList
                setSuccessMessage={setSuccessMessage}
                sortBlogsByLikes={sortBlogsByLikes}
                user={user}
                blogs={blogs}
                setBlogs={setBlogs}
              />
            }
          />
        </Routes>
        {/*{!isCreateVisible && <button onClick={toggleCreate}>new note</button>}*/}
      </div>
    );
  };

  return user === null ? loginForm() : blogForm();
};

export default App;

const SuccessMessage = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <p
      style={{
        fontSize: 16,
        color: "green",
        padding: "5px",
        border: "3px solid green",
      }}
      id="login-success"
    >
      {message}
    </p>
  );
};

const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <p
      style={{
        fontSize: 16,
        color: "red",
        padding: "5px",
        border: "3px solid red",
        background: "white",
      }}
      id="login-error"
    >
      {message}
    </p>
  );
};
