import Toggleable from "./Toggleable";
import CreateBlog from "./CreateBlog";
import Blog from "./Blog";
import blogService from "../services/blogs";
import { useRef } from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    max-width: 33%;
    //filter: drop-shadow(10px 10px 4px #4444dd);
  }
`;
const BlogList = ({
  blogs,
  setBlogs,
  setSuccessMessage,
  user,
  sortBlogsByLikes,
}) => {
  const createFormRef = useRef(null);
  const handleCreate = async (blogObject) => {
    const response = await blogService.createBlog(blogObject);
    // console.log(response);
    if (response) {
      setBlogs(blogs.concat(response));
      createFormRef.current.toggleVisibility();
    }
  };

  const updateBlogFrontend = (id, updatedBlog) => {
    // console.log(id);
    // console.log(updatedBlog);
    const blogIndex = blogs.findIndex((blog) => String(blog.id) === id);
    // console.log(blogIndex);
    const newArr = blogs
      .slice(0, blogIndex)
      .concat(updatedBlog)
      .concat(blogs.slice(blogIndex + 1));
    const sorted = sortBlogsByLikes(newArr);
    setBlogs(sorted);
  };

  const handleLikeButton = async (blog) => {
    console.log(blog);

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id,
      likes: blog.likes + 1,
      user: blog.user.id ? blog.user.id : blog.user,
    };

    const result = await blogService.updateBlog(updatedBlog.id, updatedBlog);
    console.log("result", result);

    if (result) {
      // this compensates for the fact that getAll returns blogs with the full user object as the user field
      // result.user = {
      //   id: blog.user.id,
      //   name: blog.user.name,
      //   username: blog.user.username
      // };
      console.log(result);
      updateBlogFrontend(result.id, result);
    }
  };

  const removeBlogFrontend = (id) => {
    const arr = [...blogs];
    const index = arr.findIndex((blog) => blog.id === id);
    arr.splice(index, 1);
    setBlogs(arr);
  };

  return (
    <>
      <Toggleable ref={createFormRef} buttonLabel="new blog" id="new-blog">
        <CreateBlog
          blogs={blogs}
          setSuccessMessage={setSuccessMessage}
          setBlogs={setBlogs}
          handleCreate={handleCreate}
          user={user}
        />
      </Toggleable>
      <br />
      <ListContainer>
        {blogs.length > 0 &&
          blogs.map((blog) => {
            // console.log(blog);
            return (
              <Blog
                key={blog.id}
                blog={blog}
                handleLikeButton={handleLikeButton}
                updateBlog={updateBlogFrontend}
                user={user}
                removeBlogFrontend={removeBlogFrontend}
              />
            );
          })}
      </ListContainer>
    </>
  );
};

export default BlogList;
