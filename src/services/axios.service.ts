import axios from 'axios';

export const requester = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

export const requesterGoogleUserInfoAccessToken = (accessToken) =>
    axios.create({
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
