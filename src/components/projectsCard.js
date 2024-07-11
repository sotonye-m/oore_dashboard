import React, { useState } from 'react';
import styled from 'styled-components';
import ProgressBar from './progressbar';
import DonateModal from './donateModal';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  margin: 15px;
  padding: 15px;
  overflow-y: auto;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.32);
  border-radius: 8px;
  @media (min-width: 768px) {
    display:flex;
    justify-content: space-between;
  }
`;

const ImageContainer = styled.div`
  width: 120px;
  max-width: 300px;
  margin-bottom: 10px;
  margin-right: 20px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const ContentContainer = styled.div`
  text-align: left;
  display: flex;
  align-items: last baseline;
  @media (min-width: 768px) {
    align-items: center;
  }
`;

const TextContainer = styled.div`
  @media (min-width: 768px) {
    padding-right: 10px;
  }
`;
const Text = styled.span`
  margin-bottom: 10px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: left;
  color: #00A264;
  background-color: #E8FFF6;
  padding: 5px;
  border-radius: 8px;
  font-weight: 600;
`;

const Header = styled.p`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0em;
  text-align: left;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  box-sizing: border-box;
  align-items: baseline;

  @media (min-width: 768px) {
    display: block;
  }
`;

const Button = styled.button`
  color: #00A667;
  background-color: white;
  padding: 16px 42px 16px 42px;
  border: 1px #00A667 solid;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0em;
  border-radius: 32px;

  @media (min-width: 768px) {
    margin-right: 15px;
  }
`;
const Button2 = styled.button`
  background-color: #00A667;
  color: white;
  padding: 16px 42px 16px 42px;
  border: 1px #00A667 solid;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0em;
  border-radius: 32px;
`;

const Div = styled.div`
  @media (min-width: 768px) {
    align-items: center;
    display: grid;
    padding: 10px;
    margin-left: 5px;
    border-left: 1px #ddd solid;
  }
`;

const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  text-align: center;
  color: #888;
`;

const Projects = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [donateProjectId, setDonateProjectId] = useState(null);
  const [donateProjectImage, setDonateProjectImage] = useState(null);
  const [donateProjectTitle, setDonateProjectTitle] = useState(null);

  const navigate = useNavigate();

  const handleViewMore = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleDonate = (projectId, projectImage, projectHeader) => {
    setDonateProjectId(projectId);
    setDonateProjectImage(projectImage);
    setDonateProjectTitle(projectHeader);
    setShowModal(true);
  };

  return (
    <>
      {data.length > 0 ? (
        data.slice(0, 3).map((item, index) => (
          <Container key={index}>
            <ContentContainer>
              <ImageContainer>
                <Image src={item.image} alt="Item Image" />
              </ImageContainer>
              <TextContainer>
                <Header>{item.header}</Header>
                <Text>{item.text}</Text>
              </TextContainer>
            </ContentContainer>
            <Div>
              <ProgressBar percentage={item.percentage} />
              <ButtonsContainer>
                <Button onClick={() => handleViewMore(item.id)}>View More</Button>
                <Button2 onClick={() => handleDonate(item.id, item.image, item.header)}>Donate</Button2>
              </ButtonsContainer>
            </Div>
          </Container>
        ))
      ) : (
        <NoDataContainer>
          <p>No ongoing projects available at the moment.</p>
        </NoDataContainer>
      )}
      {showModal && (
        <DonateModal
          isPopOpen={showModal}
          projectID={donateProjectId}
          projectImage={donateProjectImage}
          projectTitle={donateProjectTitle}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Projects;
