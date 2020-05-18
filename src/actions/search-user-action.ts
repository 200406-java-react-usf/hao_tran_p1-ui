import { Dispatch } from "redux"
import { getUserByUniqueKey } from "../remote/user-service"
import { getReimbByUniqueKey } from "../remote/reimb-service"

export const searchActionTypes = {
    SUCCESSFUL_USER_SEARCH: 'SUCCESSFUL_USER_SEARCH',
    SUCCESSFUL_REIMB_SEARCH: 'SUCCESSFUL_REIMB_SEARCH',
    BAD_REQUEST: 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

export const searchUseAction = (key: string, value: string) => async (dispatch: Dispatch) => {

    try {

        let searchresult = await getUserByUniqueKey(key, value);
        dispatch({
            type: searchActionTypes.SUCCESSFUL_USER_SEARCH,
            payload: searchresult
        });

    } catch (e) {

        let status = e.response.data.statusCode;
        if (status === 400) {
            dispatch({
                type: searchActionTypes.BAD_REQUEST,
            });
        } else {
            dispatch({
                type: searchActionTypes.INTERNAL_SERVER_ERROR,
            });
        }

    }

}
