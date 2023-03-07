import { useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

const UserView = () => {
  const id = useParams().id;
  const { data, isLoading } = useUsers();

  if (isLoading || !data) {
    return null;
  }
  const user = data.find((n) => n.id === id);

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
