import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import PrimaryButton from '../components/PrimaryButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/loader';

const LoginContainer = styled.div`
    background-color: #fff;
    display: block;

    @media (min-width: 768px) {
        display: flex;
    }
`;
const MainDiv = styled.div`
    width: 50%;
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
    width: 500px;
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

const Otp = () => {
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    //const email = location.state.email;
    const [email, setEmail] = useState('sotonyemcleod@gmail.com');
    const [timeLeft, setTimeLeft] = useState(60);
    const [disabled, setDisabled] = useState(false);
    const [buttonText2, setButtonText2] = useState('Resend');

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/auth/verify-email`,
                { otp : otp },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            if (response?.status === 401) {
                toast.error('Invalid OTP');
                setLoading(false);
                return;
            }
            if (response.status === 200) {
                toast.success('Email Verification successful!');
                navigate('/login');
                setOtp('');
            }
             else {
                setOtp('');
                toast.error('User data not found');
            }
        } catch (err) {
            if (!err?.response) {
                toast.error('No server response');
            } else if (err.response?.status === 400) {
                toast.error('Missing OTP');
            } else if (err.response?.status === 401) {
                toast.error(err.response?.data?.errors?.message || 'Invalid OTP');
            } else {
                toast.error('OTP verification Failed');
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleResend = async (e) => {
        setButtonText2('Resending O.T.P ...')
        e.preventDefault();
        setLoading(true);

        try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/otp/email`, { email: email });
                if (response.status === 200) {
                    toast.success('An OTP resent. Please check your inbox.');
                    setButtonText2('Resend')
                    handleResetClick()
                } else {
                    toast.error('An error occurred. Please try again.');
                    setButtonText2('Resend')
                }
            } catch (error) {
            toast.error('An error occurred. Please try again.');
            setButtonText2('Resend')
        } finally {
            setLoading(false);
            setButtonText2('Resend')
        }
    };

    useEffect(() => {
        let intervalId;
        if (timeLeft > 0) {
          setDisabled(true);
          intervalId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        } else {
          setDisabled(false);
          clearInterval(intervalId);
        }
        return () => {
          clearInterval(intervalId);
        };
      }, [timeLeft]);
    
    const handleResetClick = () => {
      if (!disabled) {
      setTimeLeft(60);
      }
    };

    return (            
            <Main>
                {loading && <Loader />}
                <LoginForm onSubmit={handleSubmit}>
                    <Header>Verify OTP</Header>
                    <InputContainer style={{ display: 'grid', gap: '5px', marginBottom: '30px' }}>
                        <Input type={showPassword ? 'text' : 'password'} placeholder="Password" value={otp} onChange={handleOtpChange} />
                        <ToggleIcon onClick={togglePasswordVisibility}>
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </ToggleIcon>
                    </InputContainer>
                    <PrimaryButton type='submit'>Verify</PrimaryButton>
                    <div style={{ margin: '10px' }}>Didn't get the mail? {timeLeft > 0 && (<span>Resend O.T.P in <span style={{color: '#00A667'}}>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span></span>)}  <span style={{  color: disabled ? "#aaa" : "#00A667", cursor: disabled ? "not-allowed" : "pointer", marginLeft: "5px" }} onClick={handleResend}>{buttonText2}</span></div>
                </LoginForm>
            </Main>
    );
};

export default Otp;
