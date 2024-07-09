// Footer.js
import React from 'react';
import styled from 'styled-components';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsPerson } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { MdHistory } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  text-align: center;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  @media (min-width: 768px) {
    /* Switch to sidebar layout for tablet and larger screens */
    display: none;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  color: #BDBDBD;


      ${'' /* display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 20px;
      margin: 40px;
      line-height: 30px; */}
      a {
        text-decoration: none;
        color: ${(props) => (props.isActive ? '#00D986' : '#6F6F6F')};
        ${'' /* display: flex;
        align-items: center;
        padding: 10px; */}
      }
    

  &:hover{
    color: #00A667;
    cursor: pointer;
  }
`;

const Icon = styled.span`
  font-size: 24px;
`;

const Text = styled.span`
  font-size: 12px;
  margin-top: 5px;
  font-weight: 500;

  @media (min-width: 768px) {
    /* Adjust styles for larger screens if needed */
    margin-top: 0;
    margin-left: 10px;
    white-space: nowrap;
  }
`;

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <Container>
      <IconContainer isActive={location.pathname === '/dashboard'}>
          <Link to="/dashboard">
            <Icon><BiSolidDashboard /></Icon>
            <Text>Home</Text>
          </Link>
      </IconContainer>
      <IconContainer isActive={location.pathname === '/projects'}>
          <Link to="/projects">
            <Icon><BiDonateHeart /></Icon>
            <Text>Projects</Text>
        </Link>
      </IconContainer>
      <IconContainer isActive={location.pathname === '/history'}>
        <Link to="/history">
          <Icon><MdHistory /></Icon>
          <Text>History</Text>
        </Link>
      </IconContainer>
      <IconContainer isActive={location.pathname === '/account'}>
        <Link to="/account">
          <Icon><BsPerson /></Icon>
          <Text>You</Text>
        </Link>
      </IconContainer>
      <IconContainer onClick={Logout}>
        <Link to="/logout">
          <Icon style={{color:'#FF2679'}}><LuLogOut /></Icon>
          <Text style={{color:'#FF2679'}}>Logout</Text>
        </Link>
      </IconContainer>
    </Container>
  );
};

export default Footer;
