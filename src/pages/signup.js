import React, { useState } from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrimaryButton from '../components/PrimaryButton';
import Loader from '../components/loader';
import { useNavigate } from 'react-router-dom';
import SignUpImage from '../assets/images/image.svg';

const LoginContainer = styled.div`
    background-color: #fff;
    display: block;

    @media (min-width: 768px) {
        display: flex;
    }
`;

const MainDiv = styled.div`
    width: 50%;
    height: 100vh;
    align-items: center;
    display: flex;
    @media (max-width: 768px) {
        display: none;
    }
`;

const Main = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    @media (min-width: 768px) {
        min-width: 50%;
    }
`;

const Header = styled.h1`
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 700;
    line-height: 24.38px;
    text-align: left;
    color: #1E1E1E;
`;

const LoginForm = styled.form`
    justify-content: center;
    align-items: center;
`;

const InputContainer = styled.div`
    position: relative;
    width: 100%;
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid #8C8C8C;
    padding: 16px 0;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 500;
    line-height: 14.63px;
    text-align: left;
    color: #404040;
    width: 100%;
    &:focus {
        outline: none; /* Remove the default blue outline */
    }
`;

const ToggleIcon = styled.div`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    padding: 10px;
`;

const Signup = () => {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state

    const navigate = useNavigate();

    const handleFirstnameChange = (e) => {
        setFirstname(e.target.value);
    };

    const handleLastnameChange = (e) => {
        setLastname(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleCPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            setLoading(false); // Stop loading on error
            return;
        }

        const userData = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
            country: country,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, userData);
            if (response.status === 200 || response.status === 201) {
                toast.success('Account created successfully!');
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/otp/email`, { email: email });
                if (response.status === 200 || response.status === 201) {
                    toast.success('An OTP has been sent to your email address. Please check your inbox.');
                    navigate('/otp', { state: { email: email } });
                } else {
                    toast.error('An error occurred. Please try again.');
                }
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <LoginContainer>
            <Main>
                {loading ? (
                    <Loader /> // Display Loader when loading
                ) : (
                    <LoginForm onSubmit={handleSubmit}>
                        <Header>Create your account</Header>
                        <div style={{ display: 'grid', gap: '5px', marginBottom: '10px' }}>
                            <Input type="text" placeholder="First name" value={firstname} onChange={handleFirstnameChange} />
                        </div>
                        <div style={{ display: 'grid', gap: '5px', marginBottom: '10px' }}>
                            <Input type="text" placeholder="Last name" value={lastname} onChange={handleLastnameChange} />
                        </div>
                        <div style={{ display: 'grid', gap: '5px', marginBottom: '10px' }}>
                            <Input type="email" placeholder="Email address" value={email} onChange={handleEmailChange} />
                        </div>
                        <InputContainer style={{ display: 'grid', gap: '5px', marginBottom: '10px' }}>
                            <Input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={handlePasswordChange} />
                            <ToggleIcon onClick={togglePasswordVisibility}>
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </ToggleIcon>
                        </InputContainer>
                        <InputContainer style={{ display: 'grid', gap: '5px', marginBottom: '10px' }}>
                            <Input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                            <ToggleIcon onClick={toggleCPasswordVisibility}>
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </ToggleIcon>
                        </InputContainer>
                        <div style={{ display: 'grid', gap: '5px', marginBottom: '10px' }}>
                            <Input type="text" placeholder="Country" value={country} onChange={handleCountryChange} />
                        </div>
                        <PrimaryButton type="submit">Create account</PrimaryButton>
                        <div style={{ margin: '10px' }}>
                            Already have an account? <a style={{ color: '#00A667', textDecoration: 'none' }} href="/login">Login</a>
                        </div>
                    </LoginForm>
                )}
            </Main>
            <MainDiv>
                <div>
                    <img src={SignUpImage} alt="signup cover" />
                </div>
            </MainDiv>
        </LoginContainer>
    );
};

export default Signup;
