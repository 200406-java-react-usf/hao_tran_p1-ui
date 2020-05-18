import { Reimb } from "../dtos/reimb"
import { AnyAction } from "redux"
import { loginActionTypes } from "../actions/login-action"
import { registerActionTypes } from "../actions/register-action"
import { reimbActionTypes } from "../actions/reimb-action"
import { IReimbState } from "."

const initialState: IReimbState = {
    // @ts-ignore
    reimb: (null as Reimb),
}

export const reimbReducer = (state: IReimbState = initialState, action: AnyAction) => {

    switch (action.type) {
        case registerActionTypes.SUCCESSFUL_REGISTRATION:
            return {
                ...state,
                authUser: action.payload
            }

        case registerActionTypes.BAD_REQUEST:
        case registerActionTypes.INTERNAL_SERVER_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }

        default:
            return state;

    }

}