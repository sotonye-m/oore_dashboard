import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import PrimaryButton from '../components/PrimaryButton';
import NavBar from '../components/navbar';
import Sidebar from '../components/Sidebar';
import { Sec } from './donate';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import Footer from '../components/footer';

const SecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Container = styled.div`
  @media (max-width: 768px) {
    max-height: 100vh;
    max-width: 100vw;
  }
`;

const Label = styled.label`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  color: #404040;
  margin-top: 20px;
  text-align: left;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #8c8c8c;
  padding: 16px 0;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.63px;
  text-align: left;
  color: #404040;
  width: 100%;
  background: aliceblue;
  &:focus {
    outline: none; /* Remove the default blue outline */
  }
`;

const LoginForm = styled.form`
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 700;
  line-height: 24.38px;
  text-align: left;
  color: #1e1e1e;
`;

const AccountPage = () => {
  const userData = localStorage.getItem('user');
  const user = JSON.parse(userData);

  const [userDataState, setUserDataState] = useState({
    firstName: user ? user.first_name : '',
    lastName: user ? user.last_name : '',
    email: user ? user.email : '',
    country: user ? user.country : '',
  });

  useEffect(() => {
    // Fetch user data from API if needed
    // This example assumes local storage is the primary source
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataState({
      ...userDataState,
      [name]: value,
    });
  };

  const handleCountryChange = (country) => {
    setUserDataState({
      ...userDataState,
      country: country,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user`,
        {
          first_name: userDataState.firstName,
          last_name: userDataState.lastName,
          country: userDataState.country,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('bearerToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update the local storage with new user data
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...user,
          first_name: userDataState.firstName,
          last_name: userDataState.lastName,
          country: userDataState.country,
        })
      );

      toast.success('Profile updated successfully.');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <Container>
      <NavBar />
      <main style={{ display: 'flex' }}>
        <Sidebar />
        <Sec>
          <SecondContainer>
            <LoginForm onSubmit={handleSubmit}>
              <Header>Account Information</Header>
              <div style={{ display: 'grid', gap: '5px', marginBottom: '10px' }}>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  placeholder="First name"
                  value={userDataState.firstName}
                  onChange={handleChange}
                  name="firstName"
                />
              </div>
              <div style={{ display: 'grid', gap: '5px', marginBottom: '10px' }}>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  placeholder="Last name"
                  value={userDataState.lastName}
                  onChange={handleChange}
                  name="lastName"
                />
              </div>
              <div style={{ display: 'grid', gap: '5px', marginBottom: '10px' }}>
                <Label htmlFor="email">Email</Label>
                <Input
                  style={{ background: '#ddd', cursor: 'not-allowed' }}
                  type="email"
                  placeholder="Email address"
                  value={userDataState.email}
                  onChange={handleChange}
                  disabled
                  name="email"
                />
              </div>
              <div style={{ display: 'grid', gap: '5px', marginBottom: '10px' }}>
                <Label htmlFor="country">Country</Label>
                <CountryDropdown
                    value={userDataState.country}
                    onChange={handleCountryChange}
                    name="country"
                    className="country-dropdown2"
                    showDefaultOption={true}
                />
              </div>
              <PrimaryButton type="submit">Save Changes</PrimaryButton>
            </LoginForm>
          </SecondContainer>
        </Sec>
      </main>
      <Footer />
    </Container>
  );
};

export default AccountPage;
