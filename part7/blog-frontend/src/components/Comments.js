import styled from "styled-components";
import blogService from "../services/blogs";
import { useState } from "react";
import { addComment } from "../requests";
import { useMutation, useQueryClient } from "react-query";

const CommentList = styled.ul``;

const Comments = ({ blog }) => {
  const [comment, setComment] = useState("");
  const comments = blog.comments;

  const queryClient = useQueryClient();

  const addCommentMutation = useMutation(addComment, {
    //   onSuccess: () => queryClient.invalidateQueries(["blogs"]),
    onSuccess: () => queryClient.refetchQueries(["blogs"]),
  });

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 0) {
      const text = {
        comment: comment,
      };

      setComment("");

      console.log(text);

      const newObject = {
        ...blog,
        user: blog.user.id ? blog.user.id : blog.user,
        comments: blog.comments.concat(comment),
      };

      await addCommentMutation.mutateAsync(newObject);
      queryClient.invalidateQueries(["blogs"]);
      // const response = await blogService.addComment(blog.id, text);
      // console.log(response);
      // getBlogs();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="add comment"
          value={comment}
          onChange={handleCommentChange}
        />
        <button type="submit">add comment</button>
      </form>
      <CommentList>
        {comments &&
          comments.map((comment) => <li key={"id-" + comment}>{comment}</li>)}
      </CommentList>
    </>
  );
};

export default Comments;
