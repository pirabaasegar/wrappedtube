import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const useGoogleAuth = (setAccessToken) => {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        
        // Listen for sign-in state changes
        authInstance.isSignedIn.listen((isSignedIn) => {
          if (isSignedIn) {
            const token = authInstance.currentUser.get().getAuthResponse().access_token;
            setAccessToken(token);
          } else {
            setAccessToken(null); // Clear token if signed out
          }
        });
        
        // Do NOT call signIn() here
      }).catch((err) => {
        console.error('Error initializing Google API:', err);
      });
    };

    gapi.load('client:auth2', initClient);
  }, [setAccessToken]);
};

export default useGoogleAuth;