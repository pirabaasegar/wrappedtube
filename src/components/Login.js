import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    // Check the response structure here
    localStorage.setItem('google_token', response.credential);
    navigate('/dashboard');
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        clientId={process.env.GOOGLE_CLIENT_ID}
      />
    </div>
  );
};

export default Login;