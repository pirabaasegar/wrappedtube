import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = (response) => {
    const { credential } = response;
    localStorage.setItem('google_token', credential);
    navigate('/dashboard');
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <div className='rounded-2 shadow bg-white p-6 border border-gray d-flex flex-column align-items-center'>
        <div className='text-center px-5'>
          <h1>Login with Google</h1>
          <p>Your top most watched videos, watchtime all in one place</p>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            clientId={clientId}
            scope="https://www.googleapis.com/auth/youtube.readonly"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;