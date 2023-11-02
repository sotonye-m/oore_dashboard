import React from 'react';
import styled from 'styled-components';
import { FaCog } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { BiSolidDashboard } from 'react-icons/bi';
import { IoChatboxEllipsesOutline, IoPersonSharp } from 'react-icons/io5';

const SidebarStyle = styled.aside`
  background: #F6FFFC;
  height: 100vh;
  width: 277px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
          <li isActive={location.pathname === '/contact'}>
            <Link to="/contact">
              <span className="icon"><IoChatboxEllipsesOutline /></span>
              Contact
            </Link>
          </li>
          <li isActive={location.pathname === '/setting'}>
            <Link to="/setting">
              <span className="icon"><FaCog /></span>
              Setting
            </Link>
          </li>
          <li isActive={location.pathname === '/account'}>
            <Link to="/account">
              <span className="icon"><IoPersonSharp /></span>
              Account
            </Link>
          </li>
        </ul>
       <Footer>Oore. {new Date().getFullYear()}</Footer>
      </SidebarContent>
    </SidebarStyle>
  );
};

export default Sidebar;
