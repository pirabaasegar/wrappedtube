import axios from 'axios';

const token = localStorage.getItem('google_token');

axios.get('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Error fetching YouTube data:', error);
});