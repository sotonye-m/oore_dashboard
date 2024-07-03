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
    li {
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 20px;
      margin: 40px;
      line-height: 30px;
      a {
        text-decoration: none;
        color: ${(props) => (props.isActive ? '#00D986' : '#6F6F6F')};
        display: flex;
        align-items: center;
        padding: 10px;
      }
      .icon {
        margin-right: 15px;
      }
      border-left: ${(props) => (props.isActive ? '3px solid #00D986' : 'none')};
      &:hover {
        a {
          color: #00D986;
        }
      }
    }
  }
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
          <li isActive={location.pathname === '/dashboard'}>
            <Link to="/dashboard">
              <span className="icon"><BiSolidDashboard /></span>
              <CenteredText>
                Dashboard
              </CenteredText>
            </Link>
          </li>
          <li isActive={location.pathname === '/projects'}>
            <Link to="/projects">
              <span className="icon"><BiDonateHeart /></span>
              Projects
            </Link>
          </li>
          <li isActive={location.pathname === '/history'}>
            <Link to="/history">
              <span className="icon"><MdHistory /></span>
              History
            </Link>
          </li>
          <li isActive={location.pathname === '/account'}>
            <Link to="/account">
              <span className="icon"><IoPersonSharp /></span>
              Account
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={Logout}>
              <span className="icon"><LuLogOut /></span>
              Logout
            </Link>
          </li>
        </ul>
       <Footer>Oore. {new Date().getFullYear()}</Footer>
      </SidebarContent>
    </SidebarStyle>
  );
};

export default Sidebar;
