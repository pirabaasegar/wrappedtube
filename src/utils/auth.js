import axios from 'axios';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const handleAuthClick = () => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&redirect_uri=YOUR_REDIRECT_URI&response_type=code&client_id=YOUR_CLIENT_ID`;
  window.location.href = authUrl;
};

export const getAccessToken = async (code) => {
  const response = await axios.post('https://oauth2.googleapis.com/token', {
    code: code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: 'https://wrappedtube.vercel.app',
    grant_type: '4',
  });

  const { access_token } = response.data;
  localStorage.setItem('google_token', access_token);
  return access_token;
};