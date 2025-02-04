import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      
      try {
        const response = await axios.get(`http://localhost:3005/api/verify-email?token=${token}`);
        
        // Save Token & User Data
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        navigate('/home');
      } catch (error) {
        alert('Verification failed!');
        navigate('/login');
      }
    };
    
    verifyToken();
  }, []);

  return <div>Verifying your email...</div>;
};

export default VerifyEmail;