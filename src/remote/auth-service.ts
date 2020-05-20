import { Client } from './client';

export async function authenticate(username: string, userpassword: string){
    console.log("UN: "+username+" PW: "+userpassword);
    let response = await Client.post('/auth', {username, userpassword});
    console.log("response: "+response.data);
    return await response.data;
}