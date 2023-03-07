import { Link, Route, Routes } from "react-router-dom";
import UserView from "./UserView";
import UsersView from "./UsersView";
import BlogView from "./BlogView";
import BlogList from "./BlogList";
import React, { useState } from "react";
import Notification from "./Notification";
import { useNotificationDispatch } from "./NotificationContext";
import { useUserDispatch, useUserValue } from "./userContext";

const BlogForm = ({ users, setBlogs, sortBlogsByLikes }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const userDispatch = useUserDispatch();
  const user = useUserValue();
  const logout = () => {
    console.log("logging out", user);
    userDispatch({ type: "LOGOUT" });
    localStorage.clear();
  };

  return (
    <div id="blog-form">
      <h2>blogs</h2>
      <Notification isError={false} />
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
        <Route path="/users" element={<UsersView users={users} />} />
        <Route path={"/blogs/:id"} element={<BlogView user={user} />} />
        <Route
          path={"/"}
          element={
            <BlogList
              setSuccessMessage={setSuccessMessage}
              sortBlogsByLikes={sortBlogsByLikes}
              user={user}
              setBlogs={setBlogs}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default BlogForm;
