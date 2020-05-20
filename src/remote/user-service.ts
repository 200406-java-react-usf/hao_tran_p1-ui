import { User } from "../dtos/user";
import { Client } from "./client";
import { NewUser } from "../dtos/new-user";

export async function register(newUser: NewUser) {
    let response = await Client.post('/users', newUser);
    return await response.data;
}

export async function getUsers() {
    return await Client.get('/users');
}

export async function getUserById(id: number) {
    return await Client.get(`/users/${id}`);
}

export async function getUserByUniqueKey(key: string, value: string) {
    return await Client.get(`/users?${key}=${value}`);
}

export async function updateUser(updatedUser: User) {
    return await Client.put('/users', updatedUser);
}

export async function deleteUserById(id: number) {
    return await Client.delete(`/users/${id}`);
}

export async function addNewUser(newUser: User) {
    return await Client.put(`/users/new`, newUser);
}