import styled from "styled-components";

const UserContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.altText};
  background-color: ${({ theme }) => theme.item};
  border-radius: 8px;
  padding: 5px;
  margin: 5px;
  width: 260px;
  filter: drop-shadow(5px 5px 4px ${({ theme }) => theme.background});
`;

const Name = styled.p`
  margin: 0;
  width: 150px;
`;

const Blogs = styled.p`
  margin: 0;
`;

const UserListItem = ({ user }) => {
  return (
    <UserContainer>
      <Name>{user.name}</Name>
      <Blogs>{user.blogs.length}</Blogs>
    </UserContainer>
  );
};

export default UserListItem;
