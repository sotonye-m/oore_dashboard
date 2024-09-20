import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FiEye, FiEyeOff } from "react-icons/fi";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import LoginImage from "../assets/images/login.svg";
import AuthContext from "../context/AuthProvider";

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
  color: #1e1e1e;
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
  border-bottom: 1px solid #8c8c8c;
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/auth/signin`,
            JSON.stringify({ email, password }),
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        if (response?.status === 401) {
            toast.error("Invalid email or password");
            setLoading(false); // Stop loading
            return;
        }

        const token = response?.data?.data?.token;

        if (token) {
            // Set token in local storage
            localStorage.setItem("bearerToken", token);
            localStorage.setItem("email", email);

            // Fetch user data using the token
            const userResponse = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/auth/user`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const responseData = userResponse.data.data;
            localStorage.setItem("user", JSON.stringify(responseData));

            // Update auth state in context
            setAuth({ token, email, ...responseData });

            // Clear email and password state
            setEmail("");
            setPassword("");

            // Display success message and navigate to dashboard
            toast.success("Login successful!");
            navigate("/dashboard");
        } else {
            toast.error("User data not found");
        }
    } catch (err) {
        setLoading(false); // Stop loading
        if (!err?.response) {
            toast.error("No server response");
        } else if (err.response?.status === 400) {
            toast.error("Missing Email or Password");
        } else if (err.response?.status === 401) {
            const { message, errors } = err.response.data;

            // Display the main message
            toast.error(message);

            // Check for specific errors and display them
            if (errors) {
                Object.entries(errors).forEach(([key, value]) => {
                    value.forEach((errorMsg) => {
                        toast.error(`${key}: ${errorMsg}`);
                    });
                });
            }
        } else {
            toast.error("Login Failed");
        }
    } finally {
        setLoading(false); // Stop loading
    }
};


  return (
    <LoginContainer>
      {loading && <Loader />}
      <Main>
        <LoginForm onSubmit={handleSubmit}>
          <Header>Login your account</Header>
          <div style={{ display: "grid", gap: "5px", marginBottom: "10px" }}>
            <Input
              type="text"
              placeholder="Email address"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <InputContainer
            style={{ display: "grid", gap: "5px", marginBottom: "10px" }}
          >
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <ToggleIcon onClick={togglePasswordVisibility}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </ToggleIcon>
          </InputContainer>
          <div style={{ marginBottom: "10px" }}>
            <a
              style={{
                color: "#00A667",
                fontFamily: "Montserrat",
                fontSize: "12px",
                fontWeight: "600",
                lineHeight: "14.63px",
                textAlign: "center",
                margin: "10px",
                textDecoration: "none",
              }}
              href="/forgot-password"
            >
              Forgot password?
            </a>
          </div>
          <PrimaryButton type="submit">Login</PrimaryButton>
          <div style={{ margin: "10px" }}>
            Don't have an account?{" "}
            <a
              style={{ color: "#00A667", textDecoration: "none" }}
              href="/signup"
            >
              Sign up
            </a>
          </div>
        </LoginForm>
      </Main>
      <MainDiv>
        <img style={{ maxHeight: "100%" }} src={LoginImage} alt="login" />
      </MainDiv>
    </LoginContainer>
  );
};

export default Login;
