import axios from 'axios';

export const Client = axios.create({
    baseURL: 'http://haotranp1-env.eba-c3uvcxtp.us-east-2.elasticbeanstalk.com',
    //baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json'
    }
});