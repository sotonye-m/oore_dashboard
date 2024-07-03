import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavBar2 from '../components/navbar2';
import Sidebar from '../components/Sidebar';
import ButtonContainer from '../components/Categories';
import Projects2 from '../components/projectsCard2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from '../components/loader'; // Import the Loader component
import Footer from '../components/footer';

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

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // To filter projects
  const [loading, setLoading] = useState(true); // Add loading state

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
        console.log(response.data.data.data);
        toast.success('Projects retrieved successfully');
        const projectsData = response.data.data.data.map((project) => ({
          id: project.id,
          image: project.cover_image,
          header: project.name,
          text: project.description,
          button1: 'View More',
          button2: 'Donate',
          percentage: parseFloat(project.percent_complete.replace('%', '')),
          category_id: project.category_id, // Add category ID to each project
        }));

        setProjects(projectsData);
      } catch (error) {
        toast.error('Failed to retrieve projects');
      } finally {
        setLoading(false); // Stop loading
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

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId); // Toggle category filter
  };

  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category_id === selectedCategory)
    : projects;

  const data = [
    {
      pageTitle: 'Projects',
      pageSpecialFunction: '',
    },
  ];

  return (
    <Container>
      <NavBar2 pageInfo={data} />
      <main style={{ display: 'flex' }}>
        <Sidebar />
        <Sec>
          {loading ? (
            <Loader /> // Display Loader when loading
          ) : (
            <>
              <ButtonContainer
                buttons={categories.map((category) => ({
                  id: category.id,
                  text: category.name,
                  backgroundColor: '#F5F5F5', // Default button styling
                  textColor: '#00A667',
                  onClick: () => handleCategoryClick(category.id),
                }))}
              />
              <Projects2 data={filteredProjects} />
            </>
          )}
        </Sec>
      </main>
      <Footer />
    </Container>
  );
};

export default ProjectsPage;
