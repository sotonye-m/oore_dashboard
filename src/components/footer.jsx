// Footer.js
import React from 'react';
import styled from 'styled-components';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsPerson } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";

const Container = styled.div`
  position: sticky;
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
  margin: 20px;
  color: #BDBDBD;

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
  return (
    <Container>
      <IconContainer>
        <Icon><BiSolidDashboard /></Icon>
        <Text>Home</Text>
      </IconContainer>
      <IconContainer>
        <Icon><BiDonateHeart /></Icon>
        <Text>Donations</Text>
      </IconContainer>
      <IconContainer>
        <Icon><MdHistory /></Icon>
        <Text>History</Text>
      </IconContainer>
      <IconContainer>
        <Icon><BsPerson /></Icon>
        <Text>You</Text>
      </IconContainer>
    </Container>
  );
};

export default Footer;
