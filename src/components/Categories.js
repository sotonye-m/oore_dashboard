import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px;
  padding-left: 0px;
  margin-left: 20px;
  margin-right: 20px;
`;

const Button = styled.button`
  width: fit-content;
  height: fit-content;
  padding: 16px 16px;
  border-radius: 16px;
  gap: 8px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || '#F5F5F5'};
  color: ${(props) => props.textColor || '#1E1E1E'};
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;

  &:not(:last-child) {
    margin-right: 8px;
  }

  &:hover {
    background-color: #E0FFF3;
  }
`;

const Icon = styled.span`
  font-size: 20px;
  color: ${(props) => props.iconColor || '#1e1e1e'};
`;

const ButtonContainer = ({ buttons }) => {
  return (
    <Container>
      {buttons.map((button) => (
        <Button
          key={button.id}
          backgroundColor={button.backgroundColor}
          textColor={button.textColor}
          onClick={button.onClick}
        >
          {button.icon && <Icon iconColor={button.iconColor}>{button.icon}</Icon>}
          {button.text}
        </Button>
      ))}
    </Container>
  );
};

export default ButtonContainer;
