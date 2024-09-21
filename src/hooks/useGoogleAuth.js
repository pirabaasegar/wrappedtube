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

        // Check if the user is already signed in
        if (authInstance.isSignedIn.get()) {
          const token = authInstance.currentUser.get().getAuthResponse().access_token;
          localStorage.setItem('accessToken', token); // Save to localStorage
          setAccessToken(token);
        }

        // Listen for sign-in state changes
        authInstance.isSignedIn.listen((isSignedIn) => {
          if (isSignedIn) {
            const token = authInstance.currentUser.get().getAuthResponse().access_token;
            localStorage.setItem('accessToken', token); // Save to localStorage
            setAccessToken(token);
          } else {
            localStorage.removeItem('accessToken'); // Clear the token on sign out
            setAccessToken(null);
          }
        });
      });
    };

    gapi.load('client:auth2', initClient);
  }, [setAccessToken]);
};

export default useGoogleAuth;