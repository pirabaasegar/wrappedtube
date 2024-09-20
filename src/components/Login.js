import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const login = useGoogleLogin({
    onSuccess: (response) => {
      const { credential } = response;
      localStorage.setItem('google_token', credential);
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
    clientId,
    scope: "https://www.googleapis.com/auth/youtube.readonly",
  });

  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <div className='rounded-2 shadow bg-white p-5 border border-gray d-flex flex-column align-items-center'>
        <div className='d-flex flex-column align-items-center'>
          <h1 className='fs-3 fw-semi m-0'>See your <span className='fw-bold' style={{ color: 'rgb(255, 0, 0)' }}>YouTube</span> Wrapped now</h1>
          <p className='fs-5 m-0 mb-3'>Your top most watched videos, watchtime all in one place</p>
          <button onClick={login} className='bg-white rounded-5 pe-auto border border-gray px-3 py-2 text-white' style={{ color: 'rgb(255, 0, 0)' }}>
          <i class="bi bi-google me-1"></i>Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;