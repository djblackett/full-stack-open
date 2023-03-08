import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlogContainer = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  border: solid;
  border-width: 1px;
  margin-bottom: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background-color: rgba(0, 15, 22, 0.8);
`;

const BlogText = styled.p`
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-style: normal;
  color: cadetblue;

  &:visited {
    text-decoration: none;
    color: initial;
  }
`;

const Blog = ({ blog }) => {
  const blogStyle = {};

  if (!blog) {
    return null;
  }

  return (
    <BlogContainer className="blog-container" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`} style={{ textDecoration: "none" }}>
        <BlogText>
          {blog.title} {blog.author}
        </BlogText>
      </Link>
    </BlogContainer>
  );
};

export default Blog;

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
