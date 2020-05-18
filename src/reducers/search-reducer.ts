import { User } from "../dtos/user"
import { AnyAction } from "redux"
import { searchActionTypes } from "../actions/search-user-action"
import { ISearchUserState } from "."
import { Reimb } from "../dtos/reimb"

const initialState: ISearchUserState = {
    // @ts-ignore
    searchUser: (null as User)
}

export const searchUserReducer = (state: ISearchUserState = initialState, action: AnyAction) => {

    switch (action.type) {
        case searchActionTypes.SUCCESSFUL_USER_SEARCH:

            return {
                ...state,
                searchUser: action.payload
            }
        case searchActionTypes.BAD_REQUEST:
        case searchActionTypes.INTERNAL_SERVER_ERROR:
            return {
                ...state
            }

        default:
            return state;

    }

}


