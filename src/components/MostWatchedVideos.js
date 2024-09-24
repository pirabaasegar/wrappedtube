import React, { useState, useEffect } from 'react';
import { getMostWatchedVideos, calculateWatchTime } from '../api/youtube';

const MostWatchedVideos = ({ accessToken }) => {
    const [topVideos, setTopVideos] = useState([]);
    const [watchTime, setWatchTime] = useState(0);

    useEffect(() => {
        if (accessToken) {
            getMostWatchedVideos(accessToken).then((videos) => {
                setTopVideos(videos);
                calculateWatchTime(videos).then((time) => setWatchTime(time));
            });
        }
    }, [accessToken]);

    return (
        <div className="container">
            <h1>Your Watch Time: {watchTime.toFixed(2)} hours</h1>
            <h2>Top 10 Watched Videos</h2>
            <ul>
                {topVideos.map((video) => (
                    <li key={video.id}>
                        <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                        <p>{video.snippet.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MostWatchedVideos;