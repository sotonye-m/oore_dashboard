import React from 'react';
import styled from 'styled-components';

const PrimaryButtonStyled = styled.button`
  width: 100%;
  max-width: 340px;
  height: 49px;
  padding: 16px 104px 16px 104px;
  border-radius: 24px;
  gap: 3px;
  background: #00A667; 
  color: #fff; 
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  display: inline;

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
