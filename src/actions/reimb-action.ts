import { NewUser } from "../dtos/new-user"
import { Dispatch } from "redux"
import { register } from "../remote/user-service"
import { loginActionTypes } from "./login-action"

export const reimbActionTypes = {
    SUCCESSFUL_SUBMIT: 'SUCCESSFUL_SUBMIT',
    BAD_REQUEST: 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

export const reimbAction = (newUser: NewUser) => async (dispatch: Dispatch) => {

    try {

        let registeredUser = await register(newUser);
        dispatch({
            type: reimbActionTypes.SUCCESSFUL_SUBMIT,
            payload: registeredUser
        });
        

    } catch (e) {

        let status = e.response.data.statusCode;
        if (status === 400) {
            dispatch({
                type: reimbActionTypes.BAD_REQUEST,
                payload: e.response.data.message
            });
        } else {
            dispatch({
                type: reimbActionTypes.INTERNAL_SERVER_ERROR,
                payload: e.response.data.message || 'Uh oh! We could not reach the server!'
            });
        }

    }

}