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
        gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
          if (isSignedIn) {
            const token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
            setAccessToken(token);
          }
        });
        gapi.auth2.getAuthInstance().signIn();
      });
    };
    
    gapi.load('client:auth2', initClient);
  }, [setAccessToken]);
};

export default useGoogleAuth;