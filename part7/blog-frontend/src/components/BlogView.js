import { useParams } from "react-router-dom";

// todo move like button logic in here - tho i will be changing it...
const BlogView = ({ blogs }) => {
  const id = useParams().id;
  const blog = blogs.find((n) => n.id === id);

  if (!blog) {
    return null;
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
      <button>like</button>
      <p>added by {blog.user.name}</p>
    </div>
  );
};

export default BlogView;
