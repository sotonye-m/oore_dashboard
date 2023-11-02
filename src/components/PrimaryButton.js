import React from 'react';
import styled from 'styled-components';

const PrimaryButtonStyled = styled.button`
  width: 161px;
  height: 44px;
  padding: 12px 51px;
  border-radius: 8px;
  gap: 10px;
  background: #00D986; 
  color: #002919; 
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;

  &:hover {
    background: #04603D; 
    color: #fff;
  }
`;

const PrimaryButton = ({ children, onClick }) => {
  return (
    <PrimaryButtonStyled onClick={onClick}>
      {children}
    </PrimaryButtonStyled>
  );
};

export default PrimaryButton;
