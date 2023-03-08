import Toggleable from "./Toggleable";
import CreateBlog from "./CreateBlog";
import Blog from "./Blog";
import { useRef } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { createBlog } from "../requests";
import { useBlogs } from "../hooks/useBlogs";

const ListContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    min-width: 500px;
  }
`;

const BlogList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useBlogs();
  const newBlogMutation = useMutation(createBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const createFormRef = useRef(null);

  const handleCreate = async (blogObject) => {
    newBlogMutation.mutate(blogObject);
    createFormRef.current.toggleVisibility();
  };

  if (isLoading) {
    return <div>Loading blogs...</div>;
  }

  return (
    <>
      <Toggleable ref={createFormRef} buttonLabel="new blog" id="new-blog">
        <CreateBlog handleCreate={handleCreate} />
      </Toggleable>
      <br />
      <ListContainer>
        {data &&
          data
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => {
              return <Blog key={blog.id} blog={blog} />;
            })}
      </ListContainer>
    </>
  );
};

export default BlogList;
