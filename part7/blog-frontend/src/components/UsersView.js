import styled from "styled-components";
import UserListItem from "./UserListItem";
import { Link } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

const UserGrid = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.text};
  width: fit-content;
  border-radius: 8px;
  filter: drop-shadow(10px 10px 4px #4444dd);
  list-style: none;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const BlogsCreated = styled.p`
  margin-left: 110px;
  font-size: 20px;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const UsersView = () => {
  const { data, isLoading } = useUsers();

  if (isLoading) {
    return <div>Loading users...</div>;
  }
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Title>Users</Title>
        <BlogsCreated>Blogs created</BlogsCreated>
      </div>
      <UserGrid>
        {data &&
          data.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>
                <UserListItem user={user} />
              </Link>
            </li>
          ))}
      </UserGrid>
    </div>
  );
};
export default UsersView;
