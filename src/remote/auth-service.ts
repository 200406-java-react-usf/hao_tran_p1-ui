import { Client } from './client';

export async function authenticate(username: string, userpassword: string){
    let response = await Client.post('/auth', {username, userpassword});
    return await response.data;
}

export async function logout(){
    let response = await Client.get('/auth');
    return await response.data;
}