import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const useGoogleAuth = (setAccessToken) => {
  useEffect(() => {
    const extractTokenFromURL = () => {
      const urlParams = new URLSearchParams(window.location.hash);
      const accessToken = urlParams.get('access_token');
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        setAccessToken(accessToken);
        window.history.replaceState({}, document.title, window.location.pathname); // Clear the URL hash
      }
    };

    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();

        // Check for access token in localStorage
        const token = localStorage.getItem('accessToken');
        if (token) {
          setAccessToken(token);
        } else {
          // Check for the token in the URL
          extractTokenFromURL();
        }

        // Listen for sign-in state changes
        authInstance.isSignedIn.listen((isSignedIn) => {
          if (isSignedIn) {
            const newToken = authInstance.currentUser.get().getAuthResponse().access_token;
            localStorage.setItem('accessToken', newToken);
            setAccessToken(newToken);
          } else {
            localStorage.removeItem('accessToken');
            setAccessToken(null);
          }
        });
      }).catch((err) => {
        console.error('Error initializing Google API:', err);
      });
    };

    gapi.load('client:auth2', initClient);
  }, [setAccessToken]);
};

export default useGoogleAuth;