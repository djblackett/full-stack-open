import { useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import styled from "styled-components";

const UserContainer = styled.div`
  text-align: left;
`;
const UserView = () => {
  const id = useParams().id;
  const { data, isLoading } = useUsers();

  if (isLoading || !data) {
    return null;
  }
  const user = data.find((n) => n.id === id);

  return (
    <UserContainer>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul style={{ paddingLeft: "10px" }}>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </UserContainer>
  );
};

export default UserView;
