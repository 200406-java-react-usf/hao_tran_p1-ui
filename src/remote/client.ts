import axios from 'axios';

export const Client = axios.create({
    baseURL: 'http://haotranp1-env.eba-c3uvcxtp.us-east-2.elasticbeanstalk.com',
    headers: {
        'Content-Type': 'application/json'
    }
});