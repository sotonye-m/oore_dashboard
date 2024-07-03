import React from 'react';
import styled, { keyframes } from 'styled-components';
import { RotatingLines } from "react-loader-spinner";

const loadingLineAnimation = keyframes`
  0% {
    width: 0%;
  }
  50% {
    width: 50%;
  }
  100% {
    width: 100%;
  }
`;
const LoadingLine = styled.div`
  position: relative;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #7416a0;
  animation-name: ${loadingLineAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  z-index: 1000;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const Container = styled.div`
  width: 100%;
  height: 5px;
  background-color: #f3f3f3;
  z-index: 1000;
  position: relative;
  left: 0;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #7416a0;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
    return (
    <>
      <SpinnerContainer>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
       />
      </SpinnerContainer>
    </>
    );
  }
export default Loader;