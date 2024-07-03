import React, { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  margin: 15px;
  padding: 15px;
  overflow-y: auto;
  border-bottom: 1px #E3E3E3 solid;
  display:flex;
`;

const ImageContainer = styled.div`
  width: 120px;
  max-width: 300px;
  margin-bottom: 10px;
  margin-right: 20px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const ContentContainer = styled.div`
  text-align: left;
  display: flex;
  width: 90%;
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

const Text = styled.p`
  margin-bottom: 10px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: left;
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
    columns: 2;
  }
`;

const Button = styled.button`
  color: #00A667;
  background-color: white;
  padding: 16px 42px;
  border: 1px #00A667 solid;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0em;
  border-radius: 32px;

  @media (min-width: 768px) {
  }
`;

const Button2 = styled.button`
  background-color: #00A667;
  color: white;
  padding: 16px 42px;
  border: 1px #00A667 solid;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0em;
  border-radius: 32px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: 768px) {
    align-items: center;
    display: grid;
    padding: 10px;
    margin-left: 5px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  color: #00A667;
  background-color: white;
  padding: 10px 20px;
  border: 1px #00A667 solid;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0em;
  border-radius: 32px;
  margin: 0 5px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Projects2 = ({ data }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentPageData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {currentPageData.map((item, index) => (
        <Container key={index} onClick={() => navigate(`/project/${item.id}`)}>
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
            <MdOutlineMoreHoriz />
          </Div>
        </Container>
      ))}
      <PaginationContainer>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>
        {[...Array(totalPages).keys()].map((page) => (
          <PaginationButton
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            disabled={currentPage === page + 1}
          >
            {page + 1}
          </PaginationButton>
        ))}
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    </>
  );
};

export default Projects2;
