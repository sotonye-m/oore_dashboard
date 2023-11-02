import React from 'react';
import styled from 'styled-components';

const SecondaryButtonStyled = styled.button`
  width: 161px;
  min-width: 161px; /* Add a minimum width to prevent text from breaking into two lines */
  height: 44px;
  padding: 12px 51px;
  border-radius: 8px;
  gap: 10px;
  background: #EDEDED;
  color: #002919;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  white-space: nowrap; /* Prevent text from breaking into multiple lines */

  &:hover {
    background: #000;
    color: #fff;
  }
`;

const SecondaryButton = ({ children, onClick }) => {
  return (
    <SecondaryButtonStyled onClick={onClick}>
      {children}
    </SecondaryButtonStyled>
  );
};

export default SecondaryButton;
