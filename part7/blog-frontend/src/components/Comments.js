import styled from "styled-components";
import blogService from "../services/blogs";
import { useState } from "react";

const CommentList = styled.ul``;

const Comments = ({ blog, getBlogs }) => {
  const comments = blog.comments;

  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment === "") {
      return;
    }
    const text = {
      comment: comment,
    };

    setComment("");

    console.log(text);
    const response = await blogService.addComment(blog.id, text);
    console.log(response);
    getBlogs();
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
