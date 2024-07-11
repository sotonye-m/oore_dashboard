import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import PrimaryButton from './PrimaryButton';

const Icon = styled.img`
  padding: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20px;
  height: auto;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  z-index: 1000;
  @media screen and (max-width: 767px) {
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    display: flex;
    justify-content: center;
  }
  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: center;
  }
`;

const PopupCard = styled.div`
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  overflow: auto;
  bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 40%;
    margin: 20px;
    border-radius: 10px;
  }
  @media screen and (min-width: 1024px) {
    width: 30%;
    margin: 20px;
    border-radius: 10px;
  }
`;

const CloseButton = styled.button`
  top: 0;
  right: 0;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  border: none;
  background: transparent;
  float: right;
  &:hover {
    color: red;
  }
`;

const DivPop = styled.div`
  margin: 30px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const NairaSymbol = styled.span`
  position: absolute;
  left: 10px;
  font-size: 16px;
  color: #404040;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #8C8C8C;
  padding: 16px 0;
  padding-left: 30px;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.63px;
  text-align: left;
  color: #404040;
  width: 100%;
  &:focus {
    outline: none; 
  }
`;

const SelectInput = styled.select`
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
  background: none;
  &:focus {
    outline: none; /* Remove the default blue outline */
  }
`;

const DonateModal = ({ isPopOpen, onClose, projectID, projectImage, projectTitle }) => {
  const [amount, setAmount] = useState('');
  const [donationType, setDonationType] = useState('once');
  const amountInputRef = useRef(null);
  const proID = projectID;

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAmountBlur = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) < 500) {
      toast.info('Please enter a donation amount of at least 500 Naira.');
      setTimeout(() => {
        amountInputRef.current.focus();
      }, 0);
    }
  };

  const handleSubmitDonation = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) < 500) {
      toast.info('Please enter a donation amount of at least 500 Naira.');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/projects/${proID}/donate`,
        {
          amount: Number(amount),
          type: donationType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('bearerToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response) {
        // Store the latest donation in localStorage
        const latestDonation = {
          projectID,
          projectImage,
          projectTitle,
          amount: Number(amount),
          donationType,
        };
        const storedDonations = localStorage.getItem('latestDonations');
        let donations = storedDonations ? JSON.parse(storedDonations) : [];
        donations = donations.filter((donation) => donation.projectID !== projectID);
        donations.push(latestDonation);
        localStorage.setItem('latestDonations', JSON.stringify(donations));

        // Attempt to open payment link in a new tab
        const newWindow = window.open(response.data.data.payment_url, '_blank');
        if (newWindow) {
          // Browser allowed the new window/tab
          newWindow.focus();
          onClose();
          toast.loading('Payment Loading...', {
            autoClose: 5000, // Close the toast after 5 seconds (adjust as needed)
          });
        } else {
          // Browser blocked the new window/tab, notify user
          toast.info('Please allow pop-ups for this site to complete the donation.');
          window.open(response.data.data.payment_url, '_self'); 
        }
      }
    } catch (error) {
      console.error('Failed to donate:', error);
      toast.error('Failed to donate. Please try again.');
    }
  };


  const handleClose = onClose || (() => {});

  return (
    isPopOpen && (
      <Background>
        <PopupCard>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <DivPop>
            <form onSubmit={handleSubmitDonation}>
              <h2>Donate</h2>
              <div style={{ display: 'grid', gap: '5px', marginBottom: '15px' }}>
                <InputWrapper>
                  <NairaSymbol>₦</NairaSymbol>
                  <Input
                    type="text"
                    placeholder="Amount (Digit only)"
                    value={amount}
                    onChange={handleAmountChange}
                    onBlur={handleAmountBlur}
                    ref={amountInputRef}
                  />
                </InputWrapper>
              </div>
              <div style={{ display: 'grid', gap: '5px', marginBottom: '25px' }}>
                <SelectInput
                  type="text"
                  placeholder="Amount (Digit only)"
                  value={donationType}
                  onChange={(e) => setDonationType(e.target.value)}
                >
                  <option value="once">One-time</option>
                  <option value="recurring">Recurring</option>
                </SelectInput>
              </div>
              <PrimaryButton type="submit">Donate</PrimaryButton>
            </form>
          </DivPop>
        </PopupCard>
      </Background>
    )
  );
};

export default DonateModal;
