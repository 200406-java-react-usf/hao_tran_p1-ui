  
import { User } from "../dtos/user";
import { Reimb } from "../dtos/reimb";

import { combineReducers } from "redux";
import { loginReducer } from "./login-reducer";
import { registerReducer } from "./register-reducer";
import { searchUserReducer } from "./search-reducer";
import { reimbReducer } from "./reimb-reducer";


export interface ILoginState {
    authUser: User;
    errorMessage: string;
}

export interface IRegisterState {
    errorMessage: string;
}

export interface ISearchUserState {
    searchUser: User;
}
export interface IReimbState {
    currentReimb: Reimb;
}

export interface IState {
    login: ILoginState;
    register: IRegisterState;
    searchUser: ISearchUserState;
    reimb: IReimbState;
}

export const state = combineReducers<IState>({
    login: loginReducer,
    register: registerReducer,
    searchUser: searchUserReducer,
    reimb: reimbReducer
});