import React from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const LoginPage = ({ setAccessToken }) => {
  const login = () => {
    // Load the client and auth2 libraries
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();

        // Sign in the user
        authInstance.signIn().then((user) => {
          const accessToken = user.getAuthResponse().access_token;
          setAccessToken(accessToken); // Pass the access token to your parent component or App
        }).catch((err) => {
          console.error('Error signing in:', err);
        });
      }).catch((err) => {
        console.error('Error initializing Google API:', err);
      });
    });
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <div className='rounded-2 shadow bg-white p-5 border border-gray d-flex flex-column align-items-center'>
        <div className='d-flex flex-column align-items-center'>
          <h1 className='fs-3 fw-semi m-0'>See your <span className='fw-bold' style={{ color: 'rgb(255, 0, 0)' }}>YouTube</span> Wrapped now</h1>
          <p className='fs-5 m-0 mb-3'>Your top most watched videos, watchtime all in one place</p>
          <button onClick={login} className='rounded-5 pe-auto border border-gray px-3 py-2 text-white bg-danger'>
            <i className="bi bi-google me-1"></i>Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;