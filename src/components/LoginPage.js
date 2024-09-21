import React from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const LoginPage = ({ setAccessToken }) => {
  const login = () => {
    const authInstance = gapi.auth2.getAuthInstance();

    authInstance.signIn().then((user) => {
      const accessToken = user.getAuthResponse().access_token;
      console.log('Access Token:', accessToken);
      setAccessToken(accessToken);
      // Optionally redirect here or handle in App.js
    }).catch((err) => {
      console.error('Error signing in:', err);
    });
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
    <div className='d-flex flex-column align-items-center'>
        <h1 className='fs-3 fw-semi m-0'>See your <span className='fw-bold' style={{ color: 'rgb(255, 0, 0)' }}>YouTube</span> Wrapped Now!</h1>
        <p className='fs-5 m-0 mb-3 text-center'>Your top most watched videos, watchtime<br />all in one place</p>
        <button onClick={login} className='rounded-5 pe-auto border-0 px-3 py-2 text-white bg-danger'>
            <i className="bi bi-google me-2"></i>Sign in with Google
        </button>
    </div>
</div>
  );
};

export default LoginPage;