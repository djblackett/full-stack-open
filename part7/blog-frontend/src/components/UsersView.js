import styled from "styled-components";
import UserListItem from "./UserListItem";
import { Link } from "react-router-dom";

const UserGrid = styled.div`
  display: flex;
  flex-direction: column;
  //grid-template-columns: auto auto;
  //grid-auto-rows: auto;
  background-color: ${({ theme }) => theme.text};
  width: fit-content;
  border-radius: 8px;
  filter: drop-shadow(10px 10px 4px #4444dd);
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

const UsersView = ({ users }) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Title>Users</Title>
        <BlogsCreated>Blogs created</BlogsCreated>
      </div>
      <UserGrid>
        {users.map((user) => (
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
