import React from 'react';
import styled from 'styled-components';

const ProgressBarWrapper = styled.div`
  width: 553px;
  height: 12px;
  background: #E6E6E6;
  border-radius: 100px;
  @media (max-width: 768px) {
    max-width: 100vw;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 320px;
  }
`;

const ProgressBarFill = styled.div`
  width: ${(props) => props.percentage}%;
  height: 100%;
  border-radius: 100px;
  background: ${(props) => props.barColor};
`;

const ProgressBar = ({ percentage }) => {
  let barColor = '#1FE89B';

  if (percentage <= 20) {
    barColor = '#FF000F';
  } else if (percentage <= 49) {
    barColor = '#E8B500';
  } else if (percentage >= 100) {
    barColor = '#00D986';
  } else {
    console.error('Invalid percentage');
  }

  return (
    <ProgressBarWrapper>
      <ProgressBarFill percentage={percentage} barColor={barColor} />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
