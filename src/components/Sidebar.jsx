import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { BiSolidDashboard } from 'react-icons/bi';
import { IoPersonSharp } from 'react-icons/io5';
import { MdHistory } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";

const SidebarStyle = styled.aside`
  background: #F6FFFC;
  height: 100vh;
  width: 277px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarContent = styled.div`
  ul {
    list-style: none;
    padding: 0;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
  margin: 40px;
  line-height: 30px;
  border-left: ${(props) => (props.isActive ? '3px solid #00D986' : 'none')};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.isActive ? '#00D986' : '#6F6F6F')};
  display: flex;
  align-items: center;
  padding: 10px;
  
  &:hover {
    color: #00D986;
  }
`;

const Icon = styled.span`
  margin-right: 15px;
`;

const Footer = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  color: #00452BC2;
  margin-top: 30vh;
  margin-left: -30px;
`;

const CenteredText = styled.div`
  display: flex;
  align-items: center;
`;

const Sidebar = () => {
  const location = useLocation();

  const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return (
    <SidebarStyle>
      <SidebarContent>
        <ul>
          <ListItem isActive={location.pathname === '/dashboard'}>
            <StyledLink to="/dashboard" isActive={location.pathname === '/dashboard'}>
              <Icon><BiSolidDashboard /></Icon>
              <CenteredText>
                Dashboard
              </CenteredText>
            </StyledLink>
          </ListItem>
          <ListItem isActive={location.pathname === '/projects'}>
            <StyledLink to="/projects" isActive={location.pathname === '/projects'}>
              <Icon><BiDonateHeart /></Icon>
              Projects
            </StyledLink>
          </ListItem>
          <ListItem isActive={location.pathname === '/history'}>
            <StyledLink to="/history" isActive={location.pathname === '/history'}>
              <Icon><MdHistory /></Icon>
              History
            </StyledLink>
          </ListItem>
          <ListItem isActive={location.pathname === '/account'}>
            <StyledLink to="/account" isActive={location.pathname === '/account'}>
              <Icon><IoPersonSharp /></Icon>
              Account
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/login" onClick={Logout}>
              <Icon><LuLogOut /></Icon>
              Logout
            </StyledLink>
          </ListItem>
        </ul>
        <Footer>Oore. {new Date().getFullYear()}</Footer>
      </SidebarContent>
    </SidebarStyle>
  );
};

export default Sidebar;
