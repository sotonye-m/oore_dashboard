import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import SuccessImage from '../assets/images/success1.gif';
import ErrorImage from '../assets/images/error.gif';
import NavBar from '../components/navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/footer';

const Container = styled.div`
  @media (max-width: 768px) {
    max-height: 100vh;
    max-width: 100vw;
  }
`;

const SecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 90px);
  background-color: #f6fffc;
  text-align: center;
`;

const Message = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const TransactionRef = styled.div`
  margin-top: 10px;
  font-size: 18px;
  color: #00452bc2;
`;

const ProjectDetails = styled.div`
  margin-top: 20px;
`;

const ProjectImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProjectTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const DonationType = styled.div`
  font-size: 16px;
  color: #888;
`;

export const Sec = styled.section`
  overflow: auto;
  @media (min-width: 768px) {
    padding-left: 300px;
    flex: 1;
  }
`;

const DonateResult = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);

  console.log('Parsed query params:', params);

  const success = 'success' in params;
  const error = 'error' in params;
  const { trxref } = params;

  const userData = localStorage.getItem('user');

  // Parse user data JSON string to object
  const user = JSON.parse(userData);

  // Access first_name property
  const firstName = user ? user.first_name : '';

  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    // Retrieve latest donation details from localStorage
    const latestDonationsArray = JSON.parse(localStorage.getItem('latestDonations'));
    const latestDonations = latestDonationsArray[0];
    console.log(latestDonations);
    if (latestDonations) {
      //const latestDonation = latestDonations.find(donation => donation.projectID === params.projectID);
        setProjectDetails({
          projectImage: latestDonations.projectImage,
          projectTitle: latestDonations.projectTitle,
          donationType: latestDonations.donationType,
        });
    }
  }, [params.projectID]);

  return (
    <Container>
        <NavBar />
        <main style={{ display: 'flex' }}>
            <Sidebar />
            <Sec>
                <SecondContainer>
                    {projectDetails && (
                        <ProjectDetails>
                        <ProjectImage src={projectDetails.projectImage} alt="Project" />
                        <div>
                            <ProjectTitle>{projectDetails.projectTitle}</ProjectTitle>
                            <DonationType>Donation Type: {projectDetails.donationType}</DonationType>
                        </div>
                        </ProjectDetails>
                    )}
                    {success && (
                        <>
                        <center>
                            <img src={SuccessImage} alt="Success" width="150px" />
                        </center>
                        <Message>Donation Successful!</Message>
                        <p>Dear {firstName}, Thank you for your Donation!</p>
                        <TransactionRef>Transaction Reference: {trxref}</TransactionRef>
                        </>
                    )}
                    {error && (
                        <>
                        <center>
                            <img src={ErrorImage} alt="Error" width="150px" />
                        </center>
                        <Message>Donation Failed!</Message>
                        <p>Dear {firstName}, unfortunately your payment was unsuccessful</p>
                        <TransactionRef>Transaction Reference: {trxref}</TransactionRef>
                        </>
                    )}
                </SecondContainer>
            </Sec>
        </main>
        <Footer />
    </Container>
  );
};

export default DonateResult;
