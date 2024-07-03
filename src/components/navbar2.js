import React from 'react';
import styled from 'styled-components';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  padding-bottom: 10px;
  padding-top: 30px;
  background-color: #fff;
  color: #1C1B1F;
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
  color: #1C1B1F;
  font-weight: 600;
  font-size: 18px;
  gap: 15px;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NotificationIcon = styled.span`
  color: #6F6F6F;
  font-size: 28px; 
`;

const NavBar2 = ({pageInfo}) => {
    const navigate = useNavigate();
  return (
    <Container>
      <UserInfoContainer>
        <IoMdArrowRoundBack onClick={() => navigate(-1)} style={{cursor:'pointer'}} />
        {pageInfo[0].pageTitle}
      </UserInfoContainer>
      <IconsContainer>
        <NotificationIcon>{pageInfo[0].pageSpecialFunction}</NotificationIcon>
      </IconsContainer>
    </Container>
  );
};

export default NavBar2;
