import axios from 'axios';

const API_URL = 'https://www.googleapis.com/youtube/v3';

export const getSubscriptions = async (accessToken) => {
    try {
        const response = await axios.get(`${API_URL}/subscriptions`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                part: 'snippet',
                mine: true,
                maxResults: 10,
            },
        });

        const subscriptions = response.data.items;

        const subscriberPromises = subscriptions.map(async (sub) => {
            const channelResponse = await axios.get(`${API_URL}/channels`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    part: 'statistics',
                    id: sub.snippet.resourceId.channelId,
                },
            });

            const subscriberCount = channelResponse.data.items[0].statistics.subscriberCount;

            return {
                ...sub,
                subscriberCount,
            };
        });

        return await Promise.all(subscriberPromises);
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        return [];
    }
};

export const getMostWatchedVideos = async (accessToken) => {
    try {
        const response = await axios.get(`${API_URL}/videos`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                part: 'snippet,contentDetails,statistics',
                maxResults: 10,
                chart: 'mostPopular',
                mine: true,
            },
        });

        const videosWithViewCount = response.data.items.map(video => ({
            ...video,
            viewCount: video.statistics.viewCount,
        }));

        return videosWithViewCount;
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
};

export const getWatchTime = async (videos) => {
    let totalWatchTime = 0;

    const parseDuration = (duration) => {
        const match = /PT(\d+H)?(\d+M)?(\d+S)?/.exec(duration);
        const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0;
        const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0;
        const seconds = match[3] ? parseInt(match[3].replace('S', '')) : 0;
    
        return hours + minutes / 60 + seconds / 3600;
    };

    videos.forEach((video) => {
        const duration = video.contentDetails.duration;
        const hours = parseDuration(duration);
        totalWatchTime += hours;
    });

    return totalWatchTime;
};

export const getUserProfile = async (accessToken) => {
    const response = await fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return {
        userName: data.items[0].snippet.title,
        userImage: data.items[0].snippet.thumbnails.default.url
    };
};