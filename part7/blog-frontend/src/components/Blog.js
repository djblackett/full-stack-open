import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useUserValue } from "./userContext";

const Blog = ({ blog }) => {
  const [userId, setUserId] = useState("");
  const user = useUserValue();
  const [userIsAuthor, setUserIsAuthor] = useState(
    String(blog.user.id) === String(user.id)
  );

  useEffect(() => {
    if (typeof blog.user === "string") {
      setUserId(blog.user);
    } else {
      setUserId(blog.user.id);
    }
  }, [blog.user]);

  useEffect(() => {
    setUserIsAuthor(userId === String(user.id));
  }, [userId, user.id]);

  const blogStyle = {
    paddingTop: "10px",
    paddingLeft: "2px",
    border: "solid",
    borderWidth: "1px",
    marginBottom: "5px",
    borderRadius: "8px",
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog-container" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        <span>{blog.title}</span> {blog.author}
      </Link>
    </div>
  );
};

export default Blog;

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
