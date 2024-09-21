import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly profile email';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];

const useGoogleAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          const GoogleAuth = gapi.auth2.getAuthInstance();
          const user = GoogleAuth.currentUser.get();

          // Check if the user is already signed in
          if (user.isSignedIn()) {
            const token = user.getAuthResponse().access_token;
            const expiresAt = user.getAuthResponse().expires_at;
            setAccessToken(token);
            setIsSignedIn(true);

            // Store access token and expiry in localStorage
            localStorage.setItem('access_token', token);
            localStorage.setItem('token_expiry', expiresAt);
          }

          GoogleAuth.isSignedIn.listen(setIsSignedIn); // Listen for sign-in status changes
        })
        .catch((err) => {
          console.error('Error initializing Google API:', err);
        });
    };

    // Load the client:auth2 libraries
    gapi.load('client:auth2', initClient);
  }, []);

  useEffect(() => {
    // Check if token exists and is still valid on component mount (page reload)
    const storedToken = localStorage.getItem('access_token');
    const tokenExpiry = localStorage.getItem('token_expiry');
    const currentTime = new Date().getTime();

    if (storedToken && currentTime < tokenExpiry) {
      setAccessToken(storedToken);
      setIsSignedIn(true);
    }
  }, []);

  const signIn = () => {
    const GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signIn().then((user) => {
      const token = user.getAuthResponse().access_token;
      const expiresAt = user.getAuthResponse().expires_at;

      // Store token and expiry in state and localStorage
      setAccessToken(token);
      localStorage.setItem('access_token', token);
      localStorage.setItem('token_expiry', expiresAt);
      setIsSignedIn(true);
    });
  };

  const signOut = () => {
    const GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signOut().then(() => {
      setIsSignedIn(false);
      setAccessToken(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('token_expiry');
    });
  };

  return { isSignedIn, accessToken, signIn, signOut };
};

export default useGoogleAuth;