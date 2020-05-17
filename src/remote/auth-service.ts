import { Client } from './client';

export async function authenticate(username: string, password: string){
    console.log("UN: "+username+" PW: "+password);
    let response = await Client.post('/auth', {username, password});
    console.log("response: "+response.data);
    return await response.data;
}