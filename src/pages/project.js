import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavBar2 from '../components/navbar2';
import Sidebar from '../components/Sidebar';
import { IoShareSocialSharp } from "react-icons/io5";
import MediaComponent from '../components/MediaComponent';
import ProgressBar from '../components/progressbar';
import PrimaryButton from '../components/PrimaryButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/loader'; // Import the Loader component
import Footer from '../components/footer';
import DonateModal from '../components/donateModal';

const Container = styled.div`
  @media (max-width: 768px) {
    max-height: 100vh;
    max-width: 100vw;
  }
`;

const ContentContainer = styled.div`
  @media (min-width: 768px) {
    align-items: left;
    display: flex;
    gap: 40px;
    align-items: end;
    margin-bottom: 40px;
  }
`;

const TextContainer = styled.div`
  font-size: 12px;
  line-height: 22px;
  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

const TextContainer2 = styled.div`
  font-size: 12px;
  line-height: 22px;
  padding: 5px;
  @media (max-width: 378px) {
    max-height: 80px;
    overflow: auto;
    margin-bottom: 10px;
  }
  @media (min-width: 380px) and (max-width: 768px) {
    max-height: 120px;
    overflow: auto;
    margin-bottom: 10px;
  }
`;

const Text = styled.p`
  margin-bottom: 10px;
  font-weight: 500;
  text-align: left;
  overflow-y: auto;
  padding-top: 0px;
  margin-top: 5px;
`;

const Header = styled.p`
  font-weight: 700;
  text-align: left;
  line-height: 22px;
  padding-bottom: 0px;
  margin-bottom: 0px;
  margin-top: 0px;
`;

const BudgetSpan = styled.span`
  font-size: 12px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  color: #00A264;
  border-radius: 4px;
  padding: 2px 5px 2px 5px;
  background-color: #E8FFF6;
  float: left;
  margin-bottom: 10px;
`;

const Sec = styled.section`
  overflow: auto;
  height: calc(100vh - 10%);
  @media (min-width: 768px) {
    padding-left: 300px;
    flex: 1;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  color: #C7C7C7;
  font-weight: 600;
  font-size: 12px;
  line-height: 28px;
`;

const Div = styled.div`
  font-weight: 700;
  line-height: 22px;
  color: #1E1E1E;
  text-align: left;
  @media (min-width: 768px) {
    margin-bottom: 5px;
    margin-top: 10px;
  }
`;

const ButtonCon = styled.div`
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const ButtonCon2 = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Project = () => {
  //const location = useLocation();
  //const projectID = location.state.id;
  const { projectID } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [showModal, setShowModal] = useState(false);
  const [donateProjectId, setDonateProjectId] = useState(null);
  const [donateProjectImage, setDonateProjectImage] = useState(null);
  const [donateProjectTitle, setDonateProjectTitle] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem('bearerToken');

      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/projects/${projectID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const project = response.data.data;

        // Calculate days left
        //const startDate = new Date(project.start_date);
        const endDate = new Date(project.end_date);
        const currentDate = new Date();

        const timeDifference = endDate.getTime() - currentDate.getTime();
        const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days and round up

        // Format data as needed
        const formattedProject = {
          image: project.cover_image,
          header: project.name,
          budget: `Budget: ${project.goal} naira`,
          amountRaised: `# ${project.amount_paid}`,
          description: project.description,
          daysLeft: `${daysLeft} days Left`,
          percentComplete: parseFloat(project.percent_complete.replace('%', '')), // Remove % symbol and convert to float
        };

        setProjectData(formattedProject);
      } catch (error) {
        console.error('Failed to fetch project:', error);
        toast.error('Failed to fetch project');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProject();
  }, [projectID]);

  const data = [
    {
      pageTitle: '',
      pageSpecialFunction: <IoShareSocialSharp style={{ color: '#1C1B1F', fontSize: '18px', cursor: 'pointer' }} onClick={() => alert('Share!')} />,
    }
  ];

  const handleDonate = (projectId, projectImage, projectHeader) => {
    setDonateProjectId(projectId);
    setDonateProjectImage(projectImage);
    setDonateProjectTitle(projectHeader);
    setShowModal(true);
  };

  return (
    <Container>
      <NavBar2 pageInfo={data} />
      <main style={{ display: 'flex', padding: '20px', paddingTop:'2px' }}>
        <Sidebar />
        <Sec>
          {loading ? (
            <Loader />
          ) : (
            <>
              {projectData && (
                <ContentContainer>
                  <MediaComponent mediaType={'image'} mediaSource={projectData.image} />
                  <div>
                    <TextContainer>
                      <Header>{projectData.header}</Header>
                      <BudgetSpan>{projectData.budget}</BudgetSpan>
                    </TextContainer>
                    <div style={{ display: 'inline-block' }}>
                      <Div>{projectData.amountRaised} raised</Div>
                      <ProgressBar percentage={projectData.percentComplete} />
                      <Flex>
                        <div>{projectData.daysLeft}</div>
                        <div>{projectData.percentComplete}%</div>
                      </Flex>
                      <ButtonCon2>
                        <PrimaryButton>
                          Give Donation
                        </PrimaryButton>
                      </ButtonCon2>
                    </div>
                  </div>
                </ContentContainer>
              )}
              <TextContainer2>
                <Header style={{ color: '#656565', fontWeight: '700' }}>About Project</Header>
                <TextContainer>
                  <Text style={{ color: '#838383', fontWeight: '500'}}>{projectData && projectData.description}</Text>
                </TextContainer>
              </TextContainer2>
              <ButtonCon>
                <PrimaryButton onClick={()=> handleDonate(projectData.id, projectData.image, projectData.header)}>
                  Give Donation
                </PrimaryButton>
              </ButtonCon>
            </>
          )}
        </Sec>
      </main>
      <Footer />
      {showModal && (
        <DonateModal isPopOpen={showModal} projectID={donateProjectId} projectImage={donateProjectImage} projectTitle={donateProjectTitle} onClose={() => setShowModal(false)} />
      )}
    </Container>
  );
};

export default Project;
