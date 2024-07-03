import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MediaContainer = styled.div`
  width: 100%;
  max-width: 340px;

  overflow: hidden;
  border-radius: 8px;
`;

const Media = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;

  video,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MediaComponent = ({ mediaType, mediaSource, altText }) => {
  return (
    <Container>
      <MediaContainer>
        <Media>
          {mediaType === 'image' && <img src={mediaSource} alt={altText} />}
          {mediaType === 'video' && <video src={mediaSource} alt={altText} controls />}
        </Media>
      </MediaContainer>
    </Container>
  );
};

export default MediaComponent