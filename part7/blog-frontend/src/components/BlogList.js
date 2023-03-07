import Toggleable from "./Toggleable";
import CreateBlog from "./CreateBlog";
import Blog from "./Blog";
import blogService from "../services/blogs";
import { useRef } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createBlog, getAllBlogs, updateBlog } from "../requests";
import { useBlogs } from "../hooks/useBlogs";
import { useUserValue } from "./userContext";

const ListContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    max-width: 33%;
    //filter: drop-shadow(10px 10px 4px #4444dd);
  }
`;
const BlogList = ({
  setBlogs,
  setSuccessMessage,
  sortBlogsByLikes,
  isLoading,
}) => {
  const queryClient = useQueryClient();
  const { data } = useBlogs();
  const user = useUserValue();
  const newBlogMutation = useMutation(createBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  console.log("BlogList data:", data);
  // console.log("BlogList user:", user);
  const createFormRef = useRef(null);
  const handleCreate = async (blogObject) => {
    // const response = await blogService.createBlog(blogObject);
    // if (response) {
    // setBlogs(blogs.concat(response));
    newBlogMutation.mutate(blogObject);
    createFormRef.current.toggleVisibility();
    // }
  };

  if (isLoading) {
    return <div>Loading blogs...</div>;
  }

  return (
    <>
      <Toggleable ref={createFormRef} buttonLabel="new blog" id="new-blog">
        <CreateBlog
          blogs={data}
          setSuccessMessage={setSuccessMessage}
          setBlogs={setBlogs}
          handleCreate={handleCreate}
        />
      </Toggleable>
      <br />
      <ListContainer>
        {data &&
          data.map((blog) => {
            return <Blog key={blog.id} blog={blog} />;
          })}
      </ListContainer>
    </>
  );
};

export default BlogList;
