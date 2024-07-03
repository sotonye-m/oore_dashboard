import React, {useState} from 'react'
import styled from "styled-components";
import axios from 'axios';
import { toast } from 'react-toastify';
import PrimaryButton from './PrimaryButton';

    export const Icon = styled.img`
    padding: 20px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 20px;
    height: auto;
`

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
   /* Mobile styles (up to 767px) */
   @media screen and (max-width: 767px) {
    }

    /* Tablet styles (768px - 1023px) */
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      display: flex;
      justify-content: center;
    }

    /* Desktop styles (1024px and above) */
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
   /* Mobile styles (up to 767px) */
   @media screen and (max-width: 767px) {
    width: 100%;
    }

    /* Tablet styles (768px - 1023px) */
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      width: 40%;
      margin: 20px;
      border-radius: 10px;
    }

    /* Desktop styles (1024px and above) */
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
    margin: 30px
`

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

const DonateModal = ({isPopOpen, onClose, projectID}) => {
    const [amount, setAmount] = useState('');
    const [donationType, setDonationType] = useState('once'); 

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const handleSubmitDonation = async (e) => {
        e.preventDefault();
        if (!amount || isNaN(Number(amount))) {
          alert('Please enter a valid donation amount.');
          return;
        }
    
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/projects/${projectID}/donate`,
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
          toast('Donation successful!');
          // Handle success scenario as needed
        } catch (error) {
          console.error('Failed to donate:', error);
          toast.error('Failed to donate. Please try again.');
        }
      };

    const handleClose = onClose || (() => {});
  return isPopOpen && (
    <Background>
        <PopupCard>
            <CloseButton onClick={onClose}>&times;</CloseButton>
                <DivPop>
                    <form onSubmit={handleSubmitDonation}>
                        <h2>Donate</h2>
                        <div style={{ display: 'grid', gap: '5px', marginBottom: '15px' }}>
                            <Input type="text" placeholder="Amount (Digit only)" value={amount} onChange={handleAmountChange} />
                        </div>
                        <div style={{ display: 'grid', gap: '5px', marginBottom: '25px' }}>
                            <SelectInput type="text" placeholder="Amount (Digit only)"  value={donationType} onChange={(e) => setDonationType(e.target.value)}>
                                <option value="once">One-time</option>
                                <option value="recurring">Recurring</option>
                            </SelectInput>
                        </div>
                        <PrimaryButton type='submit'>Donate</PrimaryButton>
                    </form>
                </DivPop>
        </PopupCard>
    </Background>
  )
}

export default DonateModal