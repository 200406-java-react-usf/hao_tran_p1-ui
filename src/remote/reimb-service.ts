import { Reimb } from "../dtos/reimb";
import { Client } from "./client";

export async function getReimbs() {
    return await Client.get('/reimbs/allreimbs');
}

export async function getReimbById(id: number) {
    return await Client.get(`/reimbs/${id}`);
}

export async function getReimbByUniqueKey(key: string, value: string) {
    return await Client.post(`/reimbs/search?${key}=${value}`);
}

export async function updateReimb(updatedReimb: Reimb) {
    return await Client.post('/reimbs', updatedReimb);
}

export async function getNewReimb(updatedReimb: Reimb) {
    return await Client.post('/reimbs/new', updatedReimb);
}

export async function getReimbFilter(query:any) {
    return await Client.post('/reimbs/filter', query);
}

export async function getReimbsByUser(id:number) {
    let query = { id: id};
    return await Client.post('/reimbs/user', query);
}