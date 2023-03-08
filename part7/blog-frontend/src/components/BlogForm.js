import { Link, Route, Routes } from "react-router-dom";
import UserView from "./UserView";
import UsersView from "./UsersView";
import BlogView from "./BlogView";
import BlogList from "./BlogList";
import Notification from "./Notification";
import { useUserDispatch, useUserValue } from "./userContext";
import styled from "styled-components";

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: space-between;
  background-color: #101010;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
`;

const Button = styled.button`
  width: 80px;
  margin-left: 0;
  display: inline-flex;
`;

const BlogForm = ({ users }) => {
  const userDispatch = useUserDispatch();
  const user = useUserValue();
  const logout = () => {
    console.log("logging out", user);
    userDispatch({ type: "LOGOUT" });
    localStorage.clear();
  };

  return (
    <BlogContainer id="blog-form">
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
      <Button onClick={logout} id="logout-button">
        logout
      </Button>
      <br />
      <Routes>
        <Route path="/users/:id" element={<UserView users={users} />} />
        <Route path="/users" element={<UsersView users={users} />} />
        <Route path={"/blogs/:id"} element={<BlogView user={user} />} />
        <Route path={"/"} element={<BlogList />} />
      </Routes>
    </BlogContainer>
  );
};

export default BlogForm;
