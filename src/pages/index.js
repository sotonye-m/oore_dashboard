import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import styled from 'styled-components';
import VolunteerPic from '../assets/images/volunteer.png';
import { IoIosArrowForward } from "react-icons/io";
import ButtonContainer from '../components/Categories';
import { FaHeartbeat } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { MdCloudySnowing } from "react-icons/md";
import Projects from '../components/projectsCard';
import ProjectPic from '../assets/images/project.png';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../components/loader';
import DonateModal from '../components/donateModal';

const Container = styled.div`
  @media (max-width: 768px) {
    max-height: 100vh;
    max-width: 100vw;
  }
`;

const Sec = styled.section`
  overflow: auto;
  @media (min-width: 768px) {
    padding-left: 300px;
    flex: 1;
  }
`;

const BlueContainer = styled.div`
  background-color: #0400D4;
  color: white;
  display: flex;
  align-items: center;
  margin: 20px;
  font-family: Montserrat;
  text-align: left;
  border-radius: 0px 16px 0px 16px;
  @media (min-width: 768px) {
    flex-direction: row;
    max-height: 200px;
  }
`;

const ContentContainer = styled.div`
  width: 60%;
  padding-left: 20px;
  @media (min-width: 768px) {
    width: 60%;
    padding-right: 20px;
    text-align: left;
  }
`;

const WriteUp = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0em;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  color: #00A667;
  background-color: white;
  padding: 10px 16px 10px 16px;
  border: none;
  cursor: pointer;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0em;
  border-radius: 32px;
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const ImageContainer = styled.div`
  width: 40%;
  margin: 0;
  @media (min-width: 768px) {
    width: 40%;
    margin: 0;
    height: 200px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0px 16px 0px 0px;
  @media (min-width: 768px) {
    width: 60%;
    height: 100%;
    object-fit: cover;
    float: right;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  align-items: baseline;
`;

const LeftText = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #1E1E1E;
`;

const RightText = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: #008B56;
  cursor: pointer;
`;

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('bearerToken');

      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        toast.success('Projects retrieved successfully');
        const projectsData = response.data.data.data.map((project) => ({
          id: project.id,
          image: project.cover_image,
          header: project.name,
          text: project.description,
          button1: 'View More',
          button2: 'Donate',
          percentage: parseFloat(project.percent_complete.replace('%', '')),
          category_id: project?.category_id,
        }));

        setProjects(projectsData);
      } catch (error) {
        toast.error('Failed to retrieve projects');
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`);
        setCategories(response.data.data);
        toast.success('Categories retrieved successfully');
      } catch (error) {
        toast.error('Failed to retrieve categories');
      }
    };

    fetchProjects();
    fetchCategories();
  }, []);

  const handleCategoryClick = useCallback((categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  }, [selectedCategory]);

  

  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category_id === selectedCategory)
    : projects;

  return (
    <Container>
      <NavBar />
      <main style={{ display: 'flex' }}>
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <Sec>
            <BlueContainer>
              <ContentContainer>
                <WriteUp>
                  Join the volunteer group and become a partner in making a difference.
                </WriteUp>
                <Button><MdAdd /> Join Now</Button>
              </ContentContainer>
              <ImageContainer>
                <Image src={VolunteerPic} alt="Volunteer" />
              </ImageContainer>
            </BlueContainer>
            <FlexContainer>
              <LeftText>Donation categories</LeftText>
              <RightText onClick={() => navigate('/projects')}>View all <IoIosArrowForward /></RightText>
            </FlexContainer>
            <ButtonContainer
              buttons={categories.map((category) => ({
                id: category.id,
                text: category.name,
                backgroundColor: '#F5F5F5',
                textColor: '#00A667',
                onClick: () => handleCategoryClick(category.id),
              }))}
            />
            <div style={{ overflow: 'auto' }}>
              <Projects data={filteredProjects} />
            </div>
          </Sec>
        )}
      </main>
      <Footer />
    </Container>
  );
};

export default Dashboard;
