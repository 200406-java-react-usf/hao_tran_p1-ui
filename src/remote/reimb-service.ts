import { Reimb } from "../dtos/reimb";
import { Client } from "./client";
import { NewReimb } from "../dtos/new-reimb";


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
    return await Client.put('/reimbs', updatedReimb);
}