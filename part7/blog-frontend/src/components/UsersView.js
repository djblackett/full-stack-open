import userService from "../services/users";
import { useEffect, useState } from "react";
import styled from "styled-components";
import UserListItem from "./UserListItem";

const UserGrid = styled.div`
  display: flex;
  flex-direction: column;
  //grid-template-columns: auto auto;
  //grid-auto-rows: auto;
  background-color: ${({ theme }) => theme.text };
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
//  justify-self: flex-end;
  font-size: 20px;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;



const UsersView = () => {

  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await userService.getAll();
    console.log(response);
    // const sorted = sortBlogsByLikes(response);
    setUsers(response);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Title>Users</Title>
        <BlogsCreated>Blogs created</BlogsCreated>
      </div>
      <UserGrid >
        {users.map(user => <li key={user.id}><UserListItem user={user} /></li>)}
      </UserGrid>
    </div>
  );


};
export default UsersView;
