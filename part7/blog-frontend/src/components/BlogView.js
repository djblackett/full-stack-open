import { useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";
import { useBlogs } from "../hooks/useBlogs";
import { useMutation, useQueryClient } from "react-query";
import { deleteBlog, updateBlog } from "../requests";
import { useState } from "react";
import { useUserValue } from "./userContext";

const BlogView = ({ getBlogs }) => {
  const id = useParams().id;
  const { data, isLoading } = useBlogs();
  const blog = data?.find((n) => n.id === id);
  const navigate = useNavigate();
  const [isDeleting, setDeleting] = useState(false);
  const user = useUserValue();
  const queryClient = useQueryClient();

  const userIsAuthor = () => {
    return user.id === blog.id || user.id === blog.user?.id;
  };

  const likeBlogMutation = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  if (!blog) {
    return null;
  }
  const handleLikeButton = async () => {
    await likeBlogMutation.mutateAsync({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id ? String(blog.user.id) : String(blog.user),
    });
  };

  const handleDeleteBlog = () => {
    deleteBlogMutation.mutate(blog.id);
    setDeleting(true);
    navigate("/");
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}{" "}
      </h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <span>likes {blog.likes} </span>
      <button onClick={handleLikeButton}>like</button>
      <button
        style={{ display: userIsAuthor() ? "" : "none" }}
        onClick={handleDeleteBlog}
        disabled={isDeleting}
      >
        remove
      </button>
      <p>added by {blog.user.name}</p>
      <h2>Comments</h2>
      <Comments blog={blog} getBlogs={getBlogs} />
    </div>
  );
};

export default BlogView;
