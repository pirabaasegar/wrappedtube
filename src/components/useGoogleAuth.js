import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const useGoogleAuth = () => {
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                scope: SCOPES,
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
            }).catch((err) => {
                console.error('Error initializing Google API:', err);
            });
        };

        gapi.load('client:auth2', initClient);
    }, []);
};

export default useGoogleAuth;