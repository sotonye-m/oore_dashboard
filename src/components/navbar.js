import React from 'react';
import styled from 'styled-components';
import UserPic from '../assets/images/user.png'
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineNotificationsNone } from "react-icons/md";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  background-color: #fff;
  color: white;
  position: sticky;
    top: 0;
    z-index: 10;

  @media (min-width: 768px) {
    /* Add your styles for larger screens here */
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const GreetingContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Greeting = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: #1E1E1E;
`;

const WelcomeMessage = styled.span`
  font-size: 12px;
  color: #8C8C8C;
  font-weight: 500;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.span`
  /* Add your search icon styles or use an actual icon library */
  margin-right: 10px;
  color: #6F6F6F;
  font-size: 24px;
`;

const NotificationIcon = styled.span`
  color: #6F6F6F;
  font-size: 28px; 
`;

const NavBar = () => {
  const userData = localStorage.getItem('user');
  //console.log(userData);

  // Parse user data JSON string to object
  const user = JSON.parse(userData);

  // Access first_name property
  const firstName = user ? user.first_name : '';
  const avatar = user.avatar ? user.avatar : UserPic;
  return (
    <Container>
      <UserInfoContainer>
        <UserImage src={avatar} alt="User" />
        <GreetingContainer>
          <Greeting>Hi, {firstName}</Greeting>
          <WelcomeMessage>Welcome!</WelcomeMessage>
        </GreetingContainer>
      </UserInfoContainer>
      <IconsContainer>
        <SearchIcon><IoSearchSharp /></SearchIcon>
        <NotificationIcon><MdOutlineNotificationsNone /></NotificationIcon>
      </IconsContainer>
    </Container>
  );
};

export default NavBar;
